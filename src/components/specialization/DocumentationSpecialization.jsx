/* eslint-disable react-hooks/exhaustive-deps */
"use client"

import { useState, useEffect, useCallback, useMemo } from "react"
import { useParams, useNavigate } from "react-router-dom"
import { ChevronLeft, ChevronRight, Trophy, Target, Zap, Menu } from "lucide-react"
import specalization_data from "./data/specalization_data"
import CodeSandboxRunner from "../CodeEditor/CodeSandboxRunner"
import Sidebar from "./Sidebar"
import renderTheoryContent from "./renderTheoryContent"
import { useAuth } from "../../context/AuthContext"

// Constants for API (same backend as C, but module_id is dynamic for specialization)
const API_BASE = "https://codex-test-server.onrender.com/api/documentation"

export default function DocumentationSpecialization() {
  // URL params: module is "html" or "css"; chapterId optional
  const { module, chapterId } = useParams()
  const navigate = useNavigate()
  const { mongodbId } = useAuth()
  const USER_ID = mongodbId

  const normalizeModule = (m) => {
    const mk = (m || "html").toLowerCase()
    if (mk === "s1") return "html"
    if (mk === "s2") return "css"
    return mk
  }
  const moduleKey = normalizeModule(module)
  const currentModuleId = moduleKey === "css" ? "S2" : "S1"

  // Resolve module to dataset (HTML=M1, CSS=M2)
  const moduleData = useMemo(() => {
    return specalization_data.modules.find((m) => m.module_id === currentModuleId)?.chapters || []
  }, [currentModuleId])

  // Build derived chapters in the same shape used by Documentation.jsx + Sidebar
  const derivedChapters = useMemo(() => {
    return (moduleData || []).map((ch) => ({
      id: ch.chapter_id,
      name: ch.chapter_name,
      description: ch.chapter_description,
      icon: ch.icon,
      subtopics: (ch.subtopics || []).map((sub) => {
        const theory = sub.theory || {}
        const items = []
        if (typeof theory.heading === "string" && theory.heading.length > 0) {
          items.push({ heading: theory.heading })
        }
        if (theory.paragraph) items.push({ paragraph: theory.paragraph })
        if (Array.isArray(theory.bulletpoints) && theory.bulletpoints.length > 0) {
          items.push({ bulletPoints: theory.bulletpoints })
        }
        if (theory.example_code || theory.output) {
          items.push({ code: theory.example_code || "", output: theory.output || "" })
        }

        const firstPractice =
          Array.isArray(sub.practise_problems) && sub.practise_problems.length > 0
            ? sub.practise_problems[0]
            : undefined

        return {
          id: sub.topic_id,
          name: sub.topic_name,
          showCompiler: !!(sub.show_compiler || firstPractice),
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

  // State mirrors Documentation.jsx to keep UI/behavior identical
  const [currentChapter, setCurrentChapter] = useState(0)
  const [currentSubtopic, setCurrentSubtopic] = useState(0)
  const [completedByChapter, setCompletedByChapter] = useState({}) // { [chapterId]: Set<topicId> }
  const [completedSections, setCompletedSections] = useState(new Set()) // Set(`${chapterIndex}-${subIndex}`)
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false)

  const chapterCount = derivedChapters.length

  // When route chapterId changes, set the currentChapter and reset subtopic index
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

  // Close mobile sidebar when navigating internally
  useEffect(() => {
    setIsMobileSidebarOpen(false)
  }, [currentChapter, currentSubtopic])

  // Scroll to top of main content when changing section
  useEffect(() => {
    const mainContent = document.querySelector(".main-content")
    if (mainContent) {
      mainContent.scrollTo({ top: 0, behavior: "smooth" })
    }
  }, [currentChapter, currentSubtopic])

  // Fetch completion for ALL chapters (for sidebar ticks + progress)
  useEffect(() => {
    let cancelled = false
    async function fetchAllChaptersCompletion() {
      if (!derivedChapters.length) return
      try {
        const results = await Promise.all(
          derivedChapters.map((ch) =>
            fetch(
              `${API_BASE}/chapter?user_id=${encodeURIComponent(USER_ID)}&module_id=${encodeURIComponent(
                currentModuleId,
              )}&chapter_id=${encodeURIComponent(ch.id)}`,
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
          // Build index-based set for Sidebar
          const indexSet = new Set()
          derivedChapters.forEach((ch, chIdx) => {
            const set = map[ch.id] || new Set()
            ch.subtopics.forEach((sub, subIdx) => {
              if (set.has(sub.id)) indexSet.add(`${chIdx}-${subIdx}`)
            })
          })
          setCompletedSections(indexSet)
        }
      } catch {
        if (!cancelled) {
          setCompletedByChapter({})
          setCompletedSections(new Set())
        }
      }
    }
    fetchAllChaptersCompletion()
    return () => {
      cancelled = true
    }
  }, [derivedChapters, currentModuleId])

  // Navigation handlers (identical logic, but specialization routes)
  const handleNext = useCallback(() => {
    if (!chapter) return
    if (currentSubtopic < chapter.subtopics.length - 1) {
      setCurrentSubtopic((s) => s + 1)
      return
    }
    if (currentChapter < derivedChapters.length - 1) {
      const nextChapter = derivedChapters[currentChapter + 1]
      navigate(`/documentation-specialization/${moduleKey}/${nextChapter.id}`)
    }
  }, [chapter, currentSubtopic, currentChapter, derivedChapters, navigate, moduleKey])

  const handlePrevious = useCallback(() => {
    if (!chapter) return
    if (currentSubtopic > 0) {
      setCurrentSubtopic((s) => s - 1)
      return
    }
    if (currentChapter > 0) {
      const prevChapter = derivedChapters[currentChapter - 1]
      navigate(`/documentation-specialization/${moduleKey}/${prevChapter.id}`)
    }
  }, [chapter, currentSubtopic, currentChapter, derivedChapters, navigate, moduleKey])

  // POST mark as complete (always enabled for specialization)
  const markAsCompleted = useCallback(async () => {
    if (!chapter || !subtopic) return

    const proceed =
      typeof window !== "undefined" ? window.confirm("Are you sure you want to mark this topic as complete?") : true
    if (!proceed) return

    try {
      const res = await fetch(API_BASE, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          user_id: USER_ID,
          module_id: currentModuleId,
          chapter_id: chapter.id,
          topic_id: subtopic.id,
          isComplete: true,
        }),
      })
      const json = await res.json()
      if (json && json.success) {
        // Update per-chapter completion map
        setCompletedByChapter((prev) => {
          const next = { ...prev }
          const set = new Set(next[chapter.id] || [])
          set.add(subtopic.id)
          next[chapter.id] = set
          return next
        })
        // Update index-based set used by Sidebar
        setCompletedSections((prev) => {
          const next = new Set(prev)
          next.add(`${currentChapter}-${currentSubtopic}`)
          return next
        })
      }
    } catch {
      // no-op; keep UI responsive
    }
  }, [chapter, subtopic, currentChapter, currentSubtopic, currentModuleId])

  // Progress calculation (completed/total * 100)
  const progressPercent = useMemo(() => {
    if (!chapter) return 0
    const set = completedByChapter[chapter.id]
    const completedCount = set ? set.size : 0
    const total = chapter.subtopics.length || 1
    return (completedCount / total) * 100
  }, [chapter, completedByChapter])

  // Current topic completion for disabling the button
  const isCurrentComplete = useMemo(() => {
    if (!chapter || !subtopic) return false
    const set = completedByChapter[chapter.id]
    return !!(set && set.has(subtopic.id))
  }, [chapter, subtopic, completedByChapter])

  // Navigation flags
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
        className={`fixed lg:static inset-y-0 left-0 z-50 lg:z-auto transform ${isMobileSidebarOpen ? "translate-x-0" : "-translate-x-full"} lg:translate-x-0 transition-transform duration-300 ease-in-out w-80 lg:w-80 h-full`}
      >
        <Sidebar
          chapters={derivedChapters}
          currentChapter={currentChapter}
          currentSubtopic={currentSubtopic}
          onChapterSelect={(chapterIndex) => {
            const target = derivedChapters[chapterIndex]
            if (target) {
              navigate(`/documentation-specialization/${moduleKey}/${target.id}`)
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
                  onClick={() => navigate(`/specialization/${moduleKey}`)}
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
                />
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
                onClick={markAsCompleted}
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

          {/* Practice Section (only if enabled) */}
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

              <CodeSandboxRunner
                initialHTML={
                  subtopic.code || "<h1>Hello, World!</h1>\n<p>Edit the HTML, CSS, and JS to see changes.</p>"
                }
                initialCSS={"/* Add styles here */"}
                initialJS={"// Add interactivity here"}
                expectedOutput={subtopic.practiceExpected || subtopic.output}
                practiceQuestion={subtopic.practiceQuestion}
              />
            </div>
          )}

          {/* Navigation Controls */}
          <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
            {/* Previous */}
            <button
              onClick={handlePrevious}
              disabled={isFirstChapter && isFirstSubtopic}
              className="w-full sm:w-auto flex items-center justify-center gap-2 px-4 py-3 bg-gray-800 hover:bg-gray-700 disabled:bg-gray-900 disabled:text-gray-600 text-white rounded-lg transition-colors text-sm sm:text-base"
            >
              <ChevronLeft className="w-4 h-4" />
              Previous
            </button>

            {/* Section indicator */}
            <div className="text-center order-first sm:order-none">
              <p className="text-gray-400 text-xs sm:text-sm">
                Section {currentSubtopic + 1} of {chapter.subtopics.length}
              </p>
            </div>

            {/* Next */}
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
    </div>
  )
}
