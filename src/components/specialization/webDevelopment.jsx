"use client"

import { useEffect, useMemo, useState } from "react"
import { specalization_data } from "./data/specalization_data"
import { BookOpen, Code, Terminal, Settings } from "lucide-react"
import TopicItem from "./TopicItem"
import { useAuth } from "../../context/AuthContext"
import { BASE_URL, DOCUMENTATION } from "../../config"

const API_BASE = BASE_URL + DOCUMENTATION
const MODULE_ID = "S1"

const WebDevelopment = () => {
  const [expandedTopic, setExpandedTopic] = useState(null)
  const [completedByChapter, setCompletedByChapter] = useState({})

  const { mongodbId } = useAuth()
  const USER_ID = mongodbId

  const toggleTopic = (topicId) => {
    setExpandedTopic(expandedTopic === topicId ? null : topicId)
  }

  const iconMap = {
    BookOpen,
    Code,
    Terminal,
    Settings,
  }

  const { module } = specalization_data
  const baseTopics = useMemo(() => {
    const gradients = [
      "bg-gradient-to-r from-blue-500 to-cyan-500",
      "bg-gradient-to-r from-green-500 to-lime-500",
      "bg-gradient-to-r from-yellow-500 to-orange-500",
      "bg-gradient-to-r from-pink-500 to-rose-500",
    ]

    return module.chapters.map((ch, idx) => {
      const IconComp = iconMap[ch.icon] || BookOpen
      return {
        id: ch.chapter_id,
        name: ch.chapter_name,
        description: ch.chapter_description,
        icon: IconComp,
        color: gradients[idx % gradients.length],
        subtopics: ch.subtopics.map((sub) => {
          const problemsCount = sub.theory?.practise_problems?.length || 0
          const firstBullet = (sub.theory?.bulletpoints && sub.theory.bulletpoints[0]) || ""
          const desc = firstBullet || sub.theory?.heading || "Learn and practice this concept."
          return {
            id: sub.topic_id,
            name: sub.topic_name,
            description: desc,
            difficulty: sub.show_compiler ? "Compiler" : "Read",
            problems: problemsCount,
            status: sub.isCompleted ? "completed" : "not-started",
            _raw: sub,
          }
        }),
        _moduleId: module.module_id,
      }
    })
  }, [module])

  useEffect(() => {
    let cancelled = false
    async function fetchAll() {
      const results = await Promise.all(
        baseTopics.map((topic) =>
          fetch(
            `${API_BASE}/chapter?user_id=${encodeURIComponent(USER_ID)}&module_id=${encodeURIComponent(
              MODULE_ID,
            )}&chapter_id=${encodeURIComponent(topic.id)}`,
          )
            .then((r) => r.json())
            .catch(() => ({ success: false })),
        ),
      )
      if (cancelled) return
      const map = {}
      baseTopics.forEach((topic, i) => {
        const json = results[i]
        map[topic.id] = new Set(
          json && json.success && Array.isArray(json.topics)
            ? json.topics.filter((t) => t.isComplete).map((t) => t.topicId)
            : [],
        )
      })
      setCompletedByChapter(map)
    }
    if (baseTopics.length) fetchAll()
    return () => {
      cancelled = true
    }
  }, [baseTopics])

  const derivedTopics = useMemo(() => {
    return baseTopics.map((topic) => {
      const completedSet = completedByChapter[topic.id] || new Set()
      const subtopics = topic.subtopics.map((sub) => ({
        ...sub,
        status: completedSet.has(sub.id) ? "completed" : "not-started",
      }))
      return { ...topic, subtopics }
    })
  }, [baseTopics, completedByChapter])

  const midpoint = Math.ceil(derivedTopics.length / 2)

  return (
    <div className="min-h-screen bg-gray-950 py-6 px-4 sm:px-6">
      <div className="max-w-7xl mx-auto space-y-6">
        <div className="bg-gradient-to-r from-purple-800 to-purple-900 rounded-2xl p-4 sm:p-6 text-white">
          <h1 className="text-2xl sm:text-3xl font-bold mb-2">C Programming Language</h1>
          <p className="text-purple-100 text-base sm:text-lg">
            Begin your journey to master the C language with structured learning and practice.
          </p>
        </div>

        {derivedTopics.length === 0 ? (
          <p className="text-gray-400 text-center mt-10">No topics available.</p>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
            {/* Left Column */}
            <div className="space-y-4 sm:space-y-6">
              {derivedTopics.slice(0, midpoint).map((topic) => (
                <TopicItem
                  key={topic.id}
                  topic={topic}
                  moduleId={topic._moduleId}
                  isExpanded={expandedTopic === topic.id}
                  onToggle={() => toggleTopic(topic.id)}
                />
              ))}
            </div>

            {/* Right Column */}
            <div className="space-y-4 sm:space-y-6">
              {derivedTopics.slice(midpoint).map((topic) => (
                <TopicItem
                  key={topic.id}
                  topic={topic}
                  moduleId={topic._moduleId}
                  isExpanded={expandedTopic === topic.id}
                  onToggle={() => toggleTopic(topic.id)}
                />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default WebDevelopment
