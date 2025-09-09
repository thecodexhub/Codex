/**
 * Documentation Component
 * Displays interactive learning content with theory, practice, and navigation
 */
"use client"

import { useState, useEffect, useCallback, useMemo } from "react"
import { useParams, useNavigate } from "react-router-dom"
import { ChevronLeft, ChevronRight, Trophy, Target, Zap, Menu } from "lucide-react"
import { cModule } from "./data/c-module"
import CodeEditor from "../CodeEditor/CodeEditor"
import Sidebar from "./Sidebar"
import renderTheoryContent from "./renderTheoryContent" // Declare the variable before using it
import ConfirmDialog from "../CodeEditor/ConfirmDialog"
import { BASE_URL,DOCUMENTATION } from "../../config"
import { useAuth } from "../../context/AuthContext"  



// Constants for API
const API_BASE = BASE_URL+DOCUMENTATION;
const MODULE_ID = "P1"

/**
 * Documentation Component - Main learning interface
 * Features:
 * - Interactive theory content
 * - Code practice with compiler
 * - Progress tracking
 * - Mobile-responsive sidebar
 * - Chapter navigation
 */
const Documentation = () => {
  // URL parameters and navigation
  const { moduleId, chapterId } = useParams()
  const navigate = useNavigate()
  const { mongodbId } = useAuth()
  const USER_ID = mongodbId

  // Component state
  const [currentChapter, setCurrentChapter] = useState(0)
  const [currentSubtopic, setCurrentSubtopic] = useState(0)
  // Track completed topic ids per chapter and index-based set for Sidebar compatibility
  const [completedByChapter, setCompletedByChapter] = useState({}) // { [chapterId]: Set<topicId> }
  const [completedSections, setCompletedSections] = useState(new Set()) // Set(`${chapterIndex}-${subIndex}`)
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false)
    const [isConfirmOpen, setIsConfirmOpen] = useState(false)
      const [isSubmitting, setIsSubmitting] = useState(false)


  const moduleData = cModule.module

  const derivedChapters = useMemo(() => {
    const chapters = moduleData?.chapters || []
    return chapters.map((ch) => ({
      id: ch.chapter_id,
      name: ch.chapter_name,
      // keep fields if needed elsewhere
      description: ch.chapter_description,
      icon: ch.icon,
      subtopics: (ch.subtopics || []).map((sub) => {
        const theory = sub.theory || {}
        const items = []
        if (thoryHeadingExists(theory)) items.push({ heading: theory.heading })
        if (theory.paragraph) items.push({ paragraph: theory.paragraph })
        if (Array.isArray(theory.bulletpoints) && theory.bulletpoints.length > 0) {
          items.push({ bulletPoints: theory.bulletpoints })
        }
        if (theory.example_code || theory.output) {
          items.push({ code: theory.example_code || "", output: theory.output || "" })
        }

        const firstPractice =
          Array.isArray(theory.practise_problems) && theory.practise_problems.length > 0
            ? theory.practise_problems[0]
            : undefined

        return {
          id: sub.topic_id,
          name: sub.topic_name,
          // fields expected elsewhere
          showCompiler: !!(sub.show_compiler || firstPractice), // auto-enable compiler if a practice exists
          theory: items,
          code: theory.example_code || "",
          output: theory.output || "",
          practiceQuestion: firstPractice
            ? { question: firstPractice.question, expectedOutput: firstPractice.expected_output }
            : undefined,
          practiceExpected: firstPractice?.expected_output,
        }
      }),
    }))
  }, [moduleData])

  // Helper: guard for heading existence
  function thoryHeadingExists(theory) {
    return typeof theory.heading === "string" && theory.heading.length > 0
  }

  // Current chapter and subtopic data
  const chapterCount = derivedChapters.length

  useEffect(() => {
    if (chapterId && chapterCount > 0) {
      const idx = derivedChapters.findIndex((ch) => ch.id === chapterId)
      setCurrentChapter(idx !== -1 ? idx : 0)
    } else {
      setCurrentChapter(0)
    }
    setCurrentSubtopic(0)
  }, [chapterId, chapterCount, derivedChapters])

  const chapter = derivedChapters[currentChapter]
  const subtopic = chapter?.subtopics[currentSubtopic]
  const topicName = chapter?.name || ""

  /**
   * Effect: Close mobile sidebar when navigation occurs
   */
  useEffect(() => {
    setIsMobileSidebarOpen(false)
  }, [currentChapter, currentSubtopic])

  /**
   * Effect: Scroll to top when content changes
   */
  useEffect(() => {
    const mainContent = document.querySelector(".main-content")
    if (mainContent) {
      mainContent.scrollTo({ top: 0, behavior: "smooth" })
    }
  }, [currentChapter, currentSubtopic])

  // Effect: Fetch completion for all chapters for sidebar + progress
  useEffect(() => {
    let cancelled = false
    async function fetchAllChaptersCompletion() {
      if (!derivedChapters.length) return
      try {
        const results = await Promise.all(
          derivedChapters.map((ch) =>
            fetch(
              `${API_BASE}/chapter?user_id=${encodeURIComponent(
                USER_ID,
              )}&module_id=${encodeURIComponent(MODULE_ID)}&chapter_id=${encodeURIComponent(ch.id)}`,
            )
              .then((r) => r.json())
              .catch(() => ({ success: false })),
          ),
        )

        const map = {}
        derivedChapters.forEach((ch, idx) => {
          const json = results[idx]
          const set = new Set(
            json && json.success && Array.isArray(json.topics)
              ? json.topics.filter((t) => t.isComplete).map((t) => t.topicId)
              : [],
          )
          map[ch.id] = set
        })

        if (!cancelled) {
          setCompletedByChapter(map)
          // build index-based set for Sidebar
          const indexSet = new Set()
          derivedChapters.forEach((ch, chIdx) => {
            const set = map[ch.id] || new Set()
            ch.subtopics.forEach((sub, subIdx) => {
              if (set.has(sub.id)) {
                indexSet.add(`${chIdx}-${subIdx}`)
              }
            })
          })
          setCompletedSections(indexSet)
        }
      } catch (e) {
        // Fail silently; keep UI responsive
      }
    }
    fetchAllChaptersCompletion()
    return () => {
      cancelled = true
    }
  }, [derivedChapters])

  /**
   * Navigate to next subtopic or chapter (new schema)
   */
  const handleNext = useCallback(() => {
    if (!chapter) return
    if (currentSubtopic < chapter.subtopics.length - 1) {
      setCurrentSubtopic((s) => s + 1)
      return
    }
    // move to next chapter if available
    if (currentChapter < derivedChapters.length - 1) {
      const nextChapter = derivedChapters[currentChapter + 1]
      navigate(`/documentation/${MODULE_ID}/${nextChapter.id}`)
    }
  }, [chapter, currentSubtopic, currentChapter, derivedChapters, navigate])

  /**
   * Navigate to previous subtopic or chapter (new schema)
   */
  const handlePrevious = useCallback(() => {
    if (!chapter) return
    if (currentSubtopic > 0) {
      setCurrentSubtopic((s) => s - 1)
      return
    }
    // move to previous chapter if available
    if (currentChapter > 0) {
      const prevChapter = derivedChapters[currentChapter - 1]
      navigate(`/documentation/${MODULE_ID}/${prevChapter.id}`)
    }
  }, [chapter, currentSubtopic, currentChapter, derivedChapters, navigate])

  /**
   * Mark current section as completed (POST to backend)
   */
  const markAsCompleted = useCallback(async () => {
  if (!chapter || !subtopic) return
  try {
    const res = await fetch(API_BASE, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        user_id: USER_ID,
        module_id: MODULE_ID,
        chapter_id: chapter.id,
        topic_id: subtopic.id,
        isComplete: true,
      }),
    })
    const json = await res.json()
    if (json && json.success) {
      // Update local completion maps
      setCompletedByChapter((prev) => {
        const next = { ...prev }
        const set = new Set(next[chapter.id] || [])
        set.add(subtopic.id)
        next[chapter.id] = set
        return next
      })
      // Also update index-based set used by Sidebar
      setCompletedSections((prev) => {
        const next = new Set(prev)
        next.add(`${currentChapter}-${currentSubtopic}`)
        return next
      })
    }
  } catch (e) {
    // Optionally show a toast; for now, fail silently to keep UX smooth
  }
}, [chapter, subtopic, currentChapter, currentSubtopic])

  const handleMarkCompleteClick = useCallback(() => {
    setIsConfirmOpen(true)
  }, [])

  const handleConfirmMarkComplete = useCallback(async () => {
    setIsSubmitting(true)
    try {
      await markAsCompleted()
    } finally {
      setIsSubmitting(false)
      setIsConfirmOpen(false)
    }
  }, [markAsCompleted])

  // Calculate progress percentage from backend completions: completed/total * 100
  const progressPercent = useMemo(() => {
    if (!chapter) return 0
    const set = completedByChapter[chapter.id]
    const completedCount = set ? set.size : 0
    const total = chapter.subtopics.length || 1
    return (completedCount / total) * 100
  }, [chapter, completedByChapter])

  // Derive current topic completion to disable the button and change its label
  const isCurrentComplete = useMemo(() => {
    if (!chapter || !subtopic) return false
    const set = completedByChapter[chapter.id]
    return !!(set && set.has(subtopic.id))
  }, [chapter, subtopic, completedByChapter])

  // Navigation state flags
  const isLastSubtopic = currentSubtopic === (chapter?.subtopics.length || 1) - 1
  const isLastChapter = currentChapter === (derivedChapters.length || 1) - 1
  const isFirstSubtopic = currentSubtopic === 0
  const isFirstChapter = currentChapter === 0

  // Loading state
  if (!chapter || !subtopic) {
    return (
      <div className="min-h-screen bg-gray-950 flex items-center justify-center">
        <div className="text-white text-xl">Loading...</div>
      </div>
    )
  }

  return (
    <div className="h-screen bg-gray-950 flex relative overflow-hidden">
      {/* Mobile Sidebar Overlay */}
      {isMobileSidebarOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
          onClick={() => setIsMobileSidebarOpen(false)}
        />
      )}

      {/* Sidebar - Fixed height with independent scroll */}
      <div
        className={`
        fixed lg:static inset-y-0 left-0 z-50 lg:z-auto
        transform ${isMobileSidebarOpen ? "translate-x-0" : "-translate-x-full"} lg:translate-x-0
        transition-transform duration-300 ease-in-out
        w-80 lg:w-80 h-full
      `}
      >
        <Sidebar
          chapters={derivedChapters}
          currentChapter={currentChapter}
          currentSubtopic={currentSubtopic}
          onChapterSelect={(chapterIndex) => {
            const target = derivedChapters[chapterIndex]
            if (target) {
              navigate(`/documentation/${MODULE_ID}/${target.id}`)
            }
          }}
          onSubtopicSelect={setCurrentSubtopic}
          completedSections={completedSections}
          onClose={() => setIsMobileSidebarOpen(false)}
        />
      </div>

      {/* Main Content - Independent scroll container */}
      <div className="flex-1 lg:ml-0 min-w-0 h-full overflow-y-auto main-content">
        {/* Header Section */}
        <div className="bg-gradient-to-r from-purple-800 to-purple-900 p-4 sm:p-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3 min-w-0 flex-1">
              {/* Mobile Hamburger Menu */}
              <button
                onClick={() => setIsMobileSidebarOpen(true)}
                className="lg:hidden p-2 text-purple-200 hover:text-white hover:bg-purple-700 rounded-lg transition-colors"
                aria-label="Open sidebar menu"
              >
                <Menu className="w-5 h-5" />
              </button>

              <div className="min-w-0 flex-1">
                {/* Back to topics button */}
                <button
                  onClick={() => navigate("/courses/c-programming")}
                  className="flex items-center gap-2 text-purple-200 hover:text-white mb-2 transition-colors text-sm sm:text-base"
                >
                  <ChevronLeft className="w-4 h-4" />
                  <span className="hidden sm:inline">Back to Topics</span>
                  <span className="sm:hidden">Back</span>
                </button>

                {/* Topic and subtopic titles */}
                <h1 className="text-lg sm:text-2xl font-bold text-white truncate">{topicName}</h1>
                <p className="text-purple-200 text-sm sm:text-base truncate">{subtopic.name}</p>
              </div>
            </div>

            {/* Progress indicator */}
            <div className="flex items-center gap-2 sm:gap-4 flex-shrink-0">
              <div className="flex items-center gap-2 text-purple-200">
                <Trophy className="w-4 h-4 sm:w-5 sm:h-5" />
                <span className="text-xs sm:text-sm">{Math.round(progressPercent)}%</span>
              </div>
              <div className="w-16 sm:w-32 bg-purple-900 rounded-full h-2">
                <div
                  className="bg-gradient-to-r from-purple-400 to-purple-500 h-2 rounded-full transition-all duration-300"
                  style={{ width: `${progressPercent}%` }}
                ></div>
              </div>
            </div>
          </div>
        </div>

        {/* Content Area */}
        <div className="p-4 sm:p-6 w-full mx-auto">
          {/* Theory Section */}
          <div className="bg-gray-900 rounded-xl border border-gray-800 p-4 sm:p-6 mb-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-6 gap-4">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 sm:w-10 sm:h-10 bg-gradient-to-r from-purple-500 to-purple-600 rounded-lg flex items-center justify-center">
                  <Target className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
                </div>
                <div>
                  <h2 className="text-lg sm:text-xl font-semibold text-white">Theory</h2>
                  <p className="text-gray-400 text-xs sm:text-sm">Learn the concepts</p>
                </div>
              </div>

              {/* Mark as complete button */}
              <button
                onClick={handleMarkCompleteClick}
                disabled={isCurrentComplete}
                className="px-3 py-2 sm:px-4 sm:py-2 bg-green-600 hover:bg-green-700 disabled:bg-gray-700 disabled:text-gray-400 text-white rounded-lg transition-colors flex items-center gap-2 text-sm sm:text-base self-start sm:self-auto"
              >
                <Trophy className="w-3 h-3 sm:w-4 sm:h-4" />
                <span className="hidden sm:inline">{isCurrentComplete ? "Completed" : "Mark Complete"}</span>
                <span className="sm:hidden">{isCurrentComplete ? "Completed" : "Complete"}</span>
              </button>
            </div>

            {/* Theory content */}
            <div className="prose prose-invert max-w-none">{renderTheoryContent(subtopic.theory)}</div>
          </div>

          {/* Practice Section - Only show if compiler is enabled for this subtopic */}
          {subtopic.showCompiler && (
            <div className="bg-gray-900 rounded-xl border border-gray-800 p-4 sm:p-6 mb-6">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-8 h-8 sm:w-10 sm:h-10 bg-gradient-to-r from-green-500 to-green-600 rounded-lg flex items-center justify-center">
                  <Zap className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
                </div>
                <div>
                  <h2 className="text-lg sm:text-xl font-semibold text-white">Practice</h2>
                  <p className="text-gray-400 text-xs sm:text-sm">Try it yourself</p>
                </div>
              </div>

              {/* Code Editor Component */}
              <CodeEditor
                initialCode={
                  subtopic.code ||
                  '#include <stdio.h>\\n\\nint main() {\\n    printf("Hello, World!\\\\n");\\n    return 0;\\n}'
                }
                expectedOutput={subtopic.practiceExpected || subtopic.output}
                practiceQuestion={subtopic.practiceQuestion}
              />
            </div>
          )}

          {/* Navigation Controls */}
          <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
            {/* Previous button */}
            <button
              onClick={handlePrevious}
              disabled={isFirstChapter && isFirstSubtopic}
              className="w-full sm:w-auto flex items-center justify-center gap-2 px-4 py-3 bg-gray-800 hover:bg-gray-700 disabled:bg-gray-900 disabled:text-gray-600 text-white rounded-lg transition-colors text-sm sm:text-base"
            >
              <ChevronLeft className="w-4 h-4" />
              Previous
            </button>

            {/* Progress indicator */}
            <div className="text-center order-first sm:order-none">
              <p className="text-gray-400 text-xs sm:text-sm">
                Section {currentSubtopic + 1} of {chapter.subtopics.length}
              </p>
            </div>

            {/* Next button */}
            <button
              onClick={handleNext}
              disabled={isLastChapter && isLastSubtopic}
              className="w-full sm:w-auto flex items-center justify-center gap-2 px-4 py-3 bg-purple-600 hover:bg-purple-700 disabled:bg-gray-900 disabled:text-gray-600 text-white rounded-lg transition-colors text-sm sm:text-base"
            >
              {isLastSubtopic && !isLastChapter ? "Next Topic" : "Next"}
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      <ConfirmDialog
              open={isConfirmOpen}
              title="Mark topic as complete?"
              description="This will mark the current topic as completed. You can revisit anytime."
              confirmText={isSubmitting ? "Submitting..." : "Yes, mark complete"}
              cancelText="Cancel"
              onConfirm={handleConfirmMarkComplete}
              onCancel={() => setIsConfirmOpen(false)}
              loading={isSubmitting}
            />
      
    </div>
  )
}

export default Documentation
