"use client"

import { BookOpen, Play, Pause } from "lucide-react"
import { useState } from "react"

export default function renderTheoryContent(theory) {
  if (!Array.isArray(theory)) return null

  return theory.map((item, index) => {
    if (item.type === "heading" || item.heading) {
      const content = item.content || item.heading
      return (
        <h2 key={index} className="text-xl sm:text-2xl font-bold text-white mb-4 flex items-center gap-2">
          <BookOpen className="w-5 h-5 sm:w-6 sm:h-6 text-purple-400" />
          {content}
        </h2>
      )
    }

    if (item.type === "subheading" || item.subHeading) {
      const content = item.content || item.subHeading
      return (
        <h3 key={index} className="text-lg sm:text-xl font-semibold text-purple-300 mb-3 mt-6">
          {content}
        </h3>
      )
    }

    if (item.type === "paragraph" || item.paragraph) {
      const content = item.content || item.paragraph
      return (
        <p key={index} className="text-gray-300 mb-4 leading-relaxed text-sm sm:text-base">
          {content}
        </p>
      )
    }

    if (item.type === "bulletpoints" || item.bulletPoints) {
      const points = item.content || item.bulletPoints
      return (
        <ul key={index} className="list-none space-y-2 mb-4">
          {points.map((point, pointIndex) => (
            <li key={pointIndex} className="flex items-start gap-3 text-gray-300 text-sm sm:text-base">
              <div className="w-2 h-2 bg-purple-400 rounded-full mt-2 flex-shrink-0"></div>
              <span>{point}</span>
            </li>
          ))}
        </ul>
      )
    }

    if (item.type === "image") {
      const { src, alt, caption } = item.content
      return (
        <div key={index} className="mb-6">
          <div className="bg-gray-800 border border-gray-700 rounded-lg overflow-hidden">
            <img src={src || "/placeholder.svg"} alt={alt} className="w-full h-auto object-cover" loading="lazy" />
            {caption && (
              <div className="p-3 bg-gray-900">
                <p className="text-gray-400 text-sm text-center italic">{caption}</p>
              </div>
            )}
          </div>
        </div>
      )
    }

    if (item.type === "video") {
      const { src, poster, caption } = item.content
      return <VideoPlayer key={index} src={src} poster={poster} caption={caption} />
    }

    if (item.type === "example_code" || item.code) {
      const code = item.content || item.code
      const output = item.output
      return (
        <div key={index} className="bg-gray-900 border border-gray-700 rounded-lg p-3 sm:p-4 mb-4 overflow-x-auto">
          <pre className="text-green-400 font-mono text-xs sm:text-sm">
            <code>{code}</code>
          </pre>
          {output && (
            <div className="mt-3 pt-3 border-t border-gray-700">
              <div className="text-xs text-gray-400 mb-2">Expected Output:</div>
              <pre className="text-blue-400 font-mono text-xs sm:text-sm">
                <code>{output}</code>
              </pre>
            </div>
          )}
        </div>
      )
    }

    if (item.type === "output") {
      const output = item.content
      return (
        <div key={index} className="bg-gray-900 border border-gray-700 rounded-lg p-3 sm:p-4 mb-4">
          <div className="text-xs text-gray-400 mb-2">Output:</div>
          <pre className="text-blue-400 font-mono text-xs sm:text-sm">
            <code>{output}</code>
          </pre>
        </div>
      )
    }

    if (item.practice) {
      return (
        <div key={index} className="bg-gray-900 border border-gray-800 rounded-lg p-3 sm:p-4 mb-4">
          <div className="flex items-center gap-2 mb-3">
            <div className="w-6 h-6 rounded bg-purple-700/40 flex items-center justify-center">
              <BookOpen className="w-3.5 h-3.5 text-purple-300" />
            </div>
            <h4 className="text-white font-semibold text-sm sm:text-base">Practice</h4>
          </div>
          <ul className="space-y-3">
            {item.practice.map((p, i) => (
              <li key={i} className="text-sm sm:text-base">
                <p className="text-gray-200">
                  Q{i + 1}. {p.question}
                </p>
                {p.expected_output && (
                  <div className="mt-2">
                    <div className="text-xs text-gray-400 mb-1">Expected Output:</div>
                    <pre className="bg-gray-950 border border-gray-800 rounded p-2 text-blue-400 font-mono text-xs sm:text-sm overflow-x-auto">
                      <code>{p.expected_output}</code>
                    </pre>
                  </div>
                )}
              </li>
            ))}
          </ul>
        </div>
      )
    }

    return null
  })
}

function VideoPlayer({ src, poster, caption }) {
  const [isPlaying, setIsPlaying] = useState(false)
  const [videoRef, setVideoRef] = useState(null)

  const togglePlay = () => {
    if (videoRef) {
      if (isPlaying) {
        videoRef.pause()
      } else {
        videoRef.play()
      }
      setIsPlaying(!isPlaying)
    }
  }

  return (
    <div className="mb-6">
      <div className="bg-gray-800 border border-gray-700 rounded-lg overflow-hidden">
        <div className="relative">
          <video
            ref={setVideoRef}
            src={src}
            poster={poster}
            className="w-full h-auto"
            onPlay={() => setIsPlaying(true)}
            onPause={() => setIsPlaying(false)}
            controls
          />
          <button
            onClick={togglePlay}
            className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-30 hover:bg-opacity-50 transition-opacity"
          >
            {isPlaying ? <Pause className="w-12 h-12 text-white" /> : <Play className="w-12 h-12 text-white" />}
          </button>
        </div>
        {caption && (
          <div className="p-3 bg-gray-900">
            <p className="text-gray-400 text-sm text-center italic">{caption}</p>
          </div>
        )}
      </div>
    </div>
  )
}
