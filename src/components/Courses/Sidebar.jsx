"use client"

import React from "react"
import { CheckCircle, Circle, BookOpen, ChevronDown, ChevronRight, X } from "lucide-react"

const Sidebar = ({
  chapters,
  currentChapter,
  currentSubtopic,
  onChapterSelect,
  onSubtopicSelect,
  completedSections,
  onClose,
}) => {
  const [expandedChapters, setExpandedChapters] = React.useState(new Set([currentChapter]))

  const toggleChapter = (chapterIndex) => {
    const newExpanded = new Set(expandedChapters)
    if (newExpanded.has(chapterIndex)) {
      newExpanded.delete(chapterIndex)
    } else {
      newExpanded.add(chapterIndex)
    }
    setExpandedChapters(newExpanded)
  }

  const handleChapterClick = (chapterIndex) => {
    toggleChapter(chapterIndex)
    // Don't navigate immediately, let user select subtopic
  }

  const handleSubtopicClick = (chapterIndex, subtopicIndex) => {
    const targetChapter = chapters[chapterIndex]
    if (targetChapter) {
      // Use navigate directly to ensure proper chapter and subtopic selection
      const navigate = window.location.pathname.includes("/documentation")
        ? (path) => window.history.pushState({}, "", path)
        : null

      // Call the parent handlers to update state
      onChapterSelect(chapterIndex)
      onSubtopicSelect(chapterIndex, subtopicIndex) // Updated to include chapterIndex
    }
    if (onClose) onClose() // Close mobile sidebar when item is selected
  }

  const isCompleted = (chapterIndex, subtopicIndex) => {
    return completedSections.has(`${chapterIndex}-${subtopicIndex}`)
  }

  return (
    <div className="h-full w-80 bg-gray-900 border-r border-gray-800 overflow-y-auto flex flex-col">
      {/* Mobile Close Button */}
      <div className="lg:hidden flex items-center justify-between p-4 border-b border-gray-800">
        <h2 className="text-lg font-semibold text-white">Navigation</h2>
        <button
          onClick={onClose}
          className="p-2 text-gray-400 hover:text-white hover:bg-gray-800 rounded-lg transition-colors"
        >
          <X className="w-5 h-5" />
        </button>
      </div>

      <div className="p-4 flex-1">
        {/* Header - Hidden on mobile since we have the mobile header above */}
        <div className="hidden lg:flex items-center gap-3 mb-6">
          <div className="w-10 h-10 bg-gradient-to-r from-purple-500 to-purple-600 rounded-lg flex items-center justify-center">
            <BookOpen className="w-5 h-5 text-white" />
          </div>
          <div>
            <h2 className="text-lg font-semibold text-white">C Programming</h2>
            <p className="text-gray-400 text-sm">Course Navigation</p>
          </div>
        </div>

        <div className="space-y-2">
          {chapters.map((chapter, chapterIndex) => (
            <div key={chapter.id} className="border border-gray-800 rounded-lg overflow-hidden">
              <button
                onClick={() => handleChapterClick(chapterIndex)}
                className={`w-full p-3 text-left flex items-center justify-between transition-colors ${
                  currentChapter === chapterIndex
                    ? "bg-purple-900 text-white"
                    : "bg-gray-800 hover:bg-gray-700 text-gray-300"
                }`}
              >
                <div className="flex items-center gap-3 min-w-0 flex-1">
                  <div
                    className={`w-6 h-6 sm:w-8 sm:h-8 rounded-lg flex items-center justify-center text-xs font-bold flex-shrink-0 ${
                      currentChapter === chapterIndex ? "bg-purple-600 text-white" : "bg-gray-700 text-gray-300"
                    }`}
                  >
                    {chapterIndex + 1}
                  </div>
                  <span className="font-medium text-sm sm:text-base truncate">{chapter.name}</span>
                </div>
                {expandedChapters.has(chapterIndex) ? (
                  <ChevronDown className="w-4 h-4 flex-shrink-0" />
                ) : (
                  <ChevronRight className="w-4 h-4 flex-shrink-0" />
                )}
              </button>

              {expandedChapters.has(chapterIndex) && (
                <div className="bg-gray-850">
                  {chapter.subtopics.map((subtopic, subtopicIndex) => (
                    <button
                      key={subtopic.id}
                      onClick={() => handleSubtopicClick(chapterIndex, subtopicIndex)}
                      className={`w-full p-3 text-left flex items-center gap-3 transition-colors border-t border-gray-800 ${
                        currentChapter === chapterIndex && currentSubtopic === subtopicIndex
                          ? "bg-purple-800 text-white"
                          : "hover:bg-gray-700 text-gray-300"
                      }`}
                    >
                      {isCompleted(chapterIndex, subtopicIndex) ? (
                        <CheckCircle className="w-4 h-4 text-green-400 flex-shrink-0" />
                      ) : (
                        <Circle className="w-4 h-4 text-gray-500 flex-shrink-0" />
                      )}
                      <div className="flex-1 min-w-0">
                        <div className="font-medium truncate text-sm sm:text-base">{subtopic.name}</div>
                        <div className="text-xs text-gray-400 mt-1">Section {subtopicIndex + 1}</div>
                      </div>
                    </button>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default Sidebar
