"use client"

import { useCallback, useEffect, useMemo, useRef, useState } from "react"
import {
  Play,
  RotateCcw,
  Copy,
  Check,
  Code2,
  Zap,
  Trophy,
  Star,
  ChevronDown,
  ChevronUp,
  Target,
  CheckCircle,
  XCircle,
} from "lucide-react"

function normalizeText(s) {
  if (!s) return ""
  return s
    .replace(/\r\n/g, "\n")
    .split("\n")
    .map((l) => l.trimEnd())
    .join("\n")
    .trim()
}

export default function CodeSandboxRunner({
  initialHTML = "<h1>Hello</h1>\n<p>Welcome!</p>",
  initialCSS = "/* Add CSS here */",
  initialJS = "// Add JS here",
  title = "Playground",
  expectedOutput,
  practiceQuestion,
  onComplete,
}) {
  const [html, setHtml] = useState(initialHTML)
  const [css, setCss] = useState(initialCSS)
  const [js, setJs] = useState(initialJS)

  const [activeTab, setActiveTab] = useState("HTML")
  const [isExpanded, setIsExpanded] = useState(true)
  const [copied, setCopied] = useState(false)
  const [attempts, setAttempts] = useState(0)
  const [hasRun, setHasRun] = useState(false)
  const [isRunning, setIsRunning] = useState(false)
  const [isOutputCorrect, setIsOutputCorrect] = useState(null)

  const [srcDoc, setSrcDoc] = useState("")
  const iframeRef = useRef(null)

  const validationStatus = useMemo(
    () => (isOutputCorrect === true ? "correct" : isOutputCorrect === false ? "incorrect" : "pending"),
    [isOutputCorrect],
  )

  const validationStyles = useMemo(() => {
    const styles = {
      correct: {
        container: "bg-green-900/20 border-green-500/50",
        header: "bg-green-600",
        text: "text-green-200",
        subtext: "text-green-100",
        border: "border-green-600/30",
        badge: "bg-green-900 text-green-300",
      },
      incorrect: {
        container: "bg-red-900/20 border-red-500/50",
        header: "bg-red-600",
        text: "text-red-200",
        subtext: "text-red-100",
        border: "border-red-600/30",
        badge: "bg-red-900 text-red-300",
      },
      pending: {
        container: "bg-blue-900/20 border-blue-500/50",
        header: "bg-blue-600",
        text: "text-blue-200",
        subtext: "text-blue-100",
        border: "border-gray-600",
        badge: "",
      },
    }
    return styles[validationStatus]
  }, [validationStatus])

  const outputBorderClass = useMemo(() => {
    if (validationStatus === "correct") return "border-2 border-green-500/70"
    if (validationStatus === "incorrect") return "border-2 border-red-500/70"
    return "border border-gray-700"
  }, [validationStatus])

  const copyCurrent = useCallback(() => {
    const text = activeTab === "HTML" ? html : activeTab === "CSS" ? css : js
    navigator.clipboard.writeText(text)
    setCopied(true)
    setTimeout(() => setCopied(false), 1600)
  }, [activeTab, html, css, js])

  const run = useCallback(() => {
    setIsRunning(true)
    setAttempts((n) => n + 1)
    const doc = `<!DOCTYPE html>
<html lang="en"><head><meta charset="UTF-8"/><meta name="viewport" content="width=device-width,initial-scale=1"/>
<style>${css}</style></head><body>
${html}
<script>
${js}
window.onerror = function(){};
</script>
</body></html>`
    setSrcDoc(doc)
  }, [html, css, js])

  const reset = useCallback(() => {
    setHtml(initialHTML)
    setCss(initialCSS)
    setJs(initialJS)
    setSrcDoc("")
    setHasRun(false)
    setIsOutputCorrect(null)
  }, [initialHTML, initialCSS, initialJS])

  useEffect(() => {
    const iframe = iframeRef.current
    if (!iframe) return
    function onLoad() {
      try {
        const doc = iframe.contentDocument || iframe.contentWindow?.document
        if (doc && (practiceQuestion?.expectedOutput || expectedOutput)) {
          const actual = normalizeText(doc.body ? doc.body.innerText || doc.body.textContent : "")
          const expected = normalizeText(practiceQuestion?.expectedOutput || expectedOutput || "")
          setIsOutputCorrect(actual === expected)
        }
      } catch {
        // ignore
      } finally {
        setIsRunning(false)
        setHasRun(true)
        onComplete?.()
      }
    }
    iframe.addEventListener("load", onLoad)
    return () => iframe.removeEventListener("load", onLoad)
  }, [expectedOutput, practiceQuestion, onComplete])

  return (
    <div className="space-y-4">
      

      <div className="bg-gradient-to-r from-green-900/50 to-emerald-900/50 rounded-xl p-3 sm:p-4 border border-green-700/30">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center space-x-2 sm:space-x-3 min-w-0 flex-1">
            <div className="w-8 h-8 sm:w-10 sm:h-10 bg-gradient-to-r from-green-500 to-emerald-500 rounded-lg flex items-center justify-center flex-shrink-0">
              <Code2 className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
            </div>
            <div className="min-w-0 flex-1">
              <h3 className="text-base sm:text-lg font-bold text-white truncate">Hands-On Practice</h3>
              <p className="text-xs sm:text-sm text-green-200">Apply what you've learned</p>
            </div>
          </div>

          <div className="flex items-center space-x-1 sm:space-x-2 flex-shrink-0">
            {hasRun && (
              <div className="bg-green-900/50 px-2 py-1 sm:px-3 sm:py-1 rounded-full border border-green-700/50 flex items-center space-x-1">
                <Trophy className="w-3 h-3 text-yellow-400" />
                <span className="text-xs text-green-200">+15 XP</span>
              </div>
            )}
            <div className="bg-gray-800 px-2 py-1 sm:px-3 sm:py-1 rounded-full">
              <span className="text-xs text-gray-300">{attempts}</span>
            </div>
            <button
              onClick={() => setIsExpanded(!isExpanded)}
              className="p-1 hover:bg-green-700/50 rounded-lg transition-colors"
              aria-label={isExpanded ? "Collapse editor" : "Expand editor"}
            >
              {isExpanded ? (
                <ChevronUp className="w-4 h-4 text-green-300" />
              ) : (
                <ChevronDown className="w-4 h-4 text-green-300" />
              )}
            </button>
          </div>
        </div>

        

        <div className="bg-green-900/30 border border-green-700/30 rounded-lg p-3">
          <div className="flex items-center space-x-2 mb-2">
            <Zap className="w-4 h-4 text-green-400" />
            <span className="text-xs sm:text-sm font-semibold text-green-200">HTML/CSS/JS Playground</span>
          </div>
          <p className="text-xs sm:text-sm text-green-100 mb-2">
            Edit HTML, CSS and JS below, then run to see a live preview.
          </p>
          <div className="flex flex-wrap gap-2 text-xs text-green-200">
            <span>• Experiment with markup</span>
            <span>• Style with CSS</span>
            <span>• Add interactivity</span>
          </div>
        </div>
      </div>

      {practiceQuestion && (
        <div className={`rounded-xl p-4 border-2 transition-colors ${validationStyles.container}`}>
          <div className="flex items-start space-x-3 mb-3">
            <div
              className={`w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 ${validationStyles.header}`}
            >
              {validationStatus === "correct" ? (
                <CheckCircle className="w-4 h-4 text-white" />
              ) : validationStatus === "incorrect" ? (
                <XCircle className="w-4 h-4 text-white" />
              ) : (
                <Target className="w-4 h-4 text-white" />
              )}
            </div>
            <div className="flex-1">
              <h3 className={`text-lg font-bold mb-2 ${validationStyles.text}`}>Practice Challenge</h3>
              <p className={`text-sm mb-3 ${validationStyles.subtext}`}>{practiceQuestion.question}</p>
              <div className={`bg-gray-800 rounded-lg p-3 border ${validationStyles.border}`}>
                <div className="flex items-center space-x-2 mb-2">
                  <span className="text-xs font-semibold text-gray-400">Expected Output:</span>
                  {validationStatus === "correct" && (
                    <span className={`text-xs px-2 py-1 rounded ${validationStyles.badge}`}>✓ Match!</span>
                  )}
                  {validationStatus === "incorrect" && (
                    <span className={`text-xs px-2 py-1 rounded ${validationStyles.badge}`}>✗ Try Again</span>
                  )}
                </div>
                <pre className="text-xs text-gray-300 font-mono whitespace-pre-wrap">
                  {practiceQuestion.expectedOutput}
                </pre>
              </div>
            </div>
          </div>
        </div>
      )}

      {isExpanded && (
        <div className="bg-gray-900 rounded-xl border border-gray-800 overflow-hidden shadow-2xl">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between bg-gray-800 px-3 sm:px-4 py-3 border-b border-gray-700 gap-3 sm:gap-0">
            <div className="flex items-center space-x-2">
              <Code2 className="w-4 h-4 text-purple-400" />
              <span className="text-sm font-medium text-gray-300">{title}</span>
              <span className="text-xs bg-purple-900 text-purple-300 px-2 py-1 rounded">HTML/CSS/JS</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="flex bg-gray-700 rounded-lg overflow-hidden">
                {["HTML", "CSS", "JS"].map((tab) => (
                  <button
                    key={tab}
                    onClick={() => setActiveTab(tab)}
                    className={`px-2 py-1 text-xs sm:px-3 sm:py-1 transition-colors ${activeTab === tab ? "bg-gray-600 text-white" : "text-gray-300 hover:bg-gray-600/60"}`}
                    aria-pressed={activeTab === tab}
                  >
                    {tab}
                  </button>
                ))}
              </div>
              <button
                onClick={copyCurrent}
                className="flex items-center space-x-1 px-2 py-1 sm:px-3 sm:py-1 bg-gray-700 hover:bg-gray-600 rounded-lg text-xs sm:text-sm text-gray-300 transition-colors"
                aria-label="Copy current pane"
              >
                {copied ? <Check className="w-3 h-3" /> : <Copy className="w-3 h-3" />}
                <span className="hidden sm:inline">{copied ? "Copied!" : "Copy"}</span>
              </button>
              <button
                onClick={reset}
                className="flex items-center space-x-1 px-2 py-1 sm:px-3 sm:py-1 bg-gray-700 hover:bg-gray-600 rounded-lg text-xs sm:text-sm text-gray-300 transition-colors"
                aria-label="Reset panes"
              >
                <RotateCcw className="w-3 h-3" />
                <span className="hidden sm:inline">Reset</span>
              </button>
              <button
                onClick={run}
                disabled={isRunning}
                className="flex items-center space-x-1 px-3 py-1 sm:px-4 sm:py-1 bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 disabled:opacity-50 rounded-lg text-xs sm:text-sm text-white transition-colors shadow-lg"
                aria-label={isRunning ? "Running..." : "Run"}
              >
                <Play className="w-3 h-3" />
                <span>{isRunning ? "Running..." : "Run"}</span>
              </button>
            </div>
          </div>

          <div className="flex flex-col lg:grid lg:grid-cols-2" style={{ minHeight: "300px", maxHeight: "400px" }}>
            <div className="border-b lg:border-b-0 lg:border-r border-gray-700 flex flex-col">
              <div className="p-2 bg-gray-800 border-b border-gray-700 flex items-center justify-between flex-shrink-0">
                <span className="text-xs text-gray-400">{activeTab} Editor</span>
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                  <span className="text-xs text-gray-400">Ready</span>
                </div>
              </div>
              <div className="flex-1 overflow-hidden" style={{ minHeight: "200px" }}>
                {activeTab === "HTML" && (
                  <textarea
                    value={html}
                    onChange={(e) => setHtml(e.target.value)}
                    className="w-full h-full p-3 sm:p-4 bg-gray-900 text-gray-300 font-mono text-xs sm:text-sm resize-none focus:outline-none focus:ring-2 focus:ring-purple-500/50 scrollbar-thin scrollbar-thumb-gray-600 scrollbar-track-gray-800 hover:scrollbar-thumb-gray-500"
                    placeholder="Write HTML here..."
                    aria-label="HTML editor textarea"
                  />
                )}
                {activeTab === "CSS" && (
                  <textarea
                    value={css}
                    onChange={(e) => setCss(e.target.value)}
                    className="w-full h-full p-3 sm:p-4 bg-gray-900 text-gray-300 font-mono text-xs sm:text-sm resize-none focus:outline-none focus:ring-2 focus:ring-purple-500/50 scrollbar-thin scrollbar-thumb-gray-600 scrollbar-track-gray-800 hover:scrollbar-thumb-gray-500"
                    placeholder="Write CSS here..."
                    aria-label="CSS editor textarea"
                  />
                )}
                {activeTab === "JS" && (
                  <textarea
                    value={js}
                    onChange={(e) => setJs(e.target.value)}
                    className="w-full h-full p-3 sm:p-4 bg-gray-900 text-gray-300 font-mono text-xs sm:text-sm resize-none focus:outline-none focus:ring-2 focus:ring-purple-500/50 scrollbar-thin scrollbar-thumb-gray-600 scrollbar-track-gray-800 hover:scrollbar-thumb-gray-500"
                    placeholder="Write JavaScript here..."
                    aria-label="JavaScript editor textarea"
                  />
                )}
              </div>
            </div>

            <div className="bg-gray-950 flex flex-col">
              <div className="p-2 bg-gray-800 border-b border-gray-700 flex items-center justify-between flex-shrink-0">
                <span className="text-xs text-gray-400">Live Preview</span>
                <div className="flex items-center space-x-2">
                  <div className={`w-2 h-2 rounded-full ${hasRun ? "bg-green-400" : "bg-gray-600"}`}></div>
                  <span className="text-xs text-gray-400">{hasRun ? "Rendered" : "Waiting"}</span>
                </div>
              </div>
              <div
                className={`flex-1 p-0 overflow-hidden ${outputBorderClass}`}
                style={{ minHeight: "200px" }}
                aria-live="polite"
              >
                <iframe
                  ref={iframeRef}
                  title="sandbox-preview"
                  className="w-full h-full bg-white"
                  sandbox="allow-scripts allow-forms allow-modals"
                  srcDoc={srcDoc}
                />
              </div>
            </div>
          </div>
        </div>
      )}

      {hasRun && (
        <div
          className={`rounded-lg p-3 sm:p-4 animate-pulse border ${
            validationStatus === "correct"
              ? "bg-gradient-to-r from-green-900/30 to-emerald-900/30 border-green-700/30"
              : validationStatus === "incorrect"
                ? "bg-gradient-to-r from-red-900/30 to-pink-900/30 border-red-700/30"
                : "bg-gradient-to-r from-yellow-900/30 to-orange-900/30 border-yellow-700/30"
          }`}
        >
          <div className="flex items-center space-x-2 mb-2">
            {validationStatus === "correct" ? (
              <CheckCircle className="w-4 h-4 text-green-400" />
            ) : validationStatus === "incorrect" ? (
              <XCircle className="w-4 h-4 text-red-400" />
            ) : (
              <Star className="w-4 h-4 text-yellow-400" />
            )}
            <span
              className={`text-xs sm:text-sm font-semibold ${
                validationStatus === "correct"
                  ? "text-green-200"
                  : validationStatus === "incorrect"
                    ? "text-red-200"
                    : "text-yellow-200"
              }`}
            >
              {validationStatus === "correct"
                ? "Perfect! Challenge Completed!"
                : validationStatus === "incorrect"
                  ? "Keep Trying! Almost There!"
                  : "Achievement Unlocked!"}
            </span>
          </div>
          <p
            className={`text-xs sm:text-sm ${validationStatus === "correct" ? "text-green-100" : validationStatus === "incorrect" ? "text-red-100" : "text-yellow-100"}`}
          >
            {validationStatus === "correct"
              ? "Excellent work! Your result matches the expected output."
              : validationStatus === "incorrect"
                ? "Your preview doesn't match yet. Adjust your HTML/CSS/JS and try again!"
                : "Great job! You've rendered your first preview in this section."}
          </p>
        </div>
      )}

      <div className="bg-gray-800 rounded-lg p-3 sm:p-4">
        <h4 className="text-xs sm:text-sm font-semibold text-purple-300 mb-2">🚀 Level Up Your Skills</h4>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-3 text-xs sm:text-sm text-gray-300">
          <div>
            <span className="text-purple-400">•</span> Try changing the markup
          </div>
          <div>
            <span className="text-purple-400">•</span> Add your styles
          </div>
          <div>
            <span className="text-purple-400">•</span> Manipulate the DOM with JS
          </div>
          <div>
            <span className="text-purple-400">•</span> Test different scenarios
          </div>
        </div>
      </div>
    </div>
  )
}
