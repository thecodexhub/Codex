/**
 * CodeEditor Component
 * Interactive code editor with real backend execution, validation, and gamified feedback
 */
"use client"

import { useState, useCallback, useMemo } from "react"
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

/**
 * CodeEditor Component - Interactive coding practice environment
 * Features:
 * - Real-time code editing
 * - Backend compilation/execution (C)
 * - Practice question validation
 * - Visual feedback system
 * - Mobile-responsive design
 *
 * @param {Object} props - Component props
 * @param {string} props.initialCode - Starting code for the editor
 * @param {string} props.language - Programming language (default: "c")
 * @param {string} props.title - Editor title
 * @param {string} props.expectedOutput - Expected program output (fallback when no backend)
 * @param {Object} props.practiceQuestion - Practice question with fields: question, expectedOutput, stdin
 * @param {Function} props.onComplete - Callback when code execution completes
 */
const CodeEditor = ({
  initialCode = `#include <stdio.h>\n\nint main() {\n    printf("Hello, World!\\n");\n    return 0;\n}`,
  language = "c",
  title = "Code Editor",
  expectedOutput,
  practiceQuestion,
  onComplete,
}) => {
  // Component state
  const [code, setCode] = useState(initialCode)
  const [output, setOutput] = useState("")
  const [isRunning, setIsRunning] = useState(false)
  const [copied, setCopied] = useState(false)
  const [hasRun, setHasRun] = useState(false)
  const [attempts, setAttempts] = useState(0)
  const [isExpanded, setIsExpanded] = useState(true)
  const [isOutputCorrect, setIsOutputCorrect] = useState(null)

  /**
   * Extract actual program output from formatted console
   */
  const extractActualOutput = useCallback((simulatedOutput) => {
    const outputMatch = simulatedOutput.match(/📤 Output:\n([\s\S]*?)\n\n/)
    return outputMatch ? outputMatch[1].trim() : ""
  }, [])

  /** Normalize text for robust output comparison */
  const normalizeText = useCallback((s) => {
    if (!s) return ""
    return s
      .replace(/\r\n/g, "\n")
      .split("\n")
      .map((line) => line.trimEnd())
      .join("\n")
      .trim()
  }, [])

  /**
   * Run code via backend API (C only)
   * Endpoint: https://backend-compiler-jhtg.onrender.com/run
   */
  const runCode = useCallback(async () => {
    setIsRunning(true)
    setAttempts((prev) => prev + 1)

    try {
      // For now we support C only; keep prop for labels
      const resp = await fetch("https://backend-compiler-jhtg.onrender.com/run", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          language: "c",
          sourceCode: code,
          stdin: practiceQuestion?.stdin || "",
        }),
      })

      // Defensive: non-2xx still may return JSON
      let result
      try {
        result = await resp.json()
      } catch {
        throw new Error(`Server error (${resp.status})`)
      }

      let consoleOut = ""

      // Mirror your original, stylized console
      consoleOut += `🚀 Compiling C code...\n` 
      consoleOut += `gcc -o program program.c\n`
      consoleOut += result.exitCode === 0 && !result.compile_error ? `✅ Compilation successful!\n\n` : `❌ Compilation failed!\n\n`

      // Running section
      if (result.exitCode === 0) {
        consoleOut += `🏃‍♂️ Running program...\n./program\n\n`
      }

      consoleOut += `📤 Output:\n`

      if (result.exitCode === 0) {
        consoleOut += `${result.stdout || ""}\n\n`
        consoleOut += `🎉 Program executed successfully!\n`
        consoleOut += `Exit code: 0`
      } else {
        const err = result.compile_error || result.stderr || "Unknown error"
        consoleOut += `❌ Compilation/Execution failed!\n\n${err}\n\n`
        consoleOut += `Exit code: ${typeof result.exitCode === "number" ? result.exitCode : 1}`
      }

      setOutput(consoleOut)

      // Validate against expected output when present
      if (practiceQuestion?.expectedOutput) {
        const actual = extractActualOutput(consoleOut)
        const isCorrect = normalizeText(actual) === normalizeText(practiceQuestion.expectedOutput)
        setIsOutputCorrect(isCorrect)
      }
    } catch (e) {
      setOutput(`❌ Error: ${e.message}`)
    } finally {
      setIsRunning(false)
      setHasRun(true)
      if (onComplete) onComplete()
    }
  }, [code, practiceQuestion, extractActualOutput, normalizeText, onComplete])

  /** Reset editor to initial state */
  const resetCode = useCallback(() => {
    setCode(initialCode)
    setOutput("")
    setHasRun(false)
    setIsOutputCorrect(null)
  }, [initialCode])

  /** Copy code to clipboard with user feedback */
  const copyCode = useCallback(() => {
    navigator.clipboard.writeText(code)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }, [code])

  // Validation status + styles
  const validationStatus = useMemo(() => {
    if (isOutputCorrect === true) return "correct"
    if (isOutputCorrect === false) return "incorrect"
    return "pending"
  }, [isOutputCorrect])

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

  return (
    <div className="space-y-4">
      
      {/* Practice Header with Gamification */}
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
            <span className="text-xs sm:text-sm font-semibold text-green-200">Coding Challenge</span>
          </div>
          <p className="text-xs sm:text-sm text-green-100 mb-2">
            {practiceQuestion
              ? "Complete the challenge above, then modify and run the code below."
              : "Modify and run the code below to practice the concepts you just learned."}
          </p>
          <div className="flex flex-wrap gap-2 text-xs text-green-200">
            <span>• Experiment with values</span>
            <span>• Add your logic</span>
            <span>• Test cases</span>
          </div>
        </div>
      </div>

      {/* Practice Question Section */}
      {practiceQuestion && (
        <div className={`rounded-xl p-4 border-2 transition-colors ${validationStyles.container}`}>
          <div className="flex items-start space-x-3 mb-3">
            <div className={`w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 ${validationStyles.header}`}>
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


      {/* Code Editor - Always visible when expanded */}
      {isExpanded && (
        <div className="bg-gray-900 rounded-xl border border-gray-800 overflow-hidden shadow-2xl">
          {/* Editor toolbar */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between bg-gray-800 px-3 sm:px-4 py-3 border-b border-gray-700 gap-3 sm:gap-0">
            <div className="flex items-center space-x-2">
              <Code2 className="w-4 h-4 text-purple-400" />
              <span className="text-sm font-medium text-gray-300">{title}</span>
              <span className="text-xs bg-purple-900 text-purple-300 px-2 py-1 rounded">{language.toUpperCase()}</span>
            </div>

            {/* Action buttons */}
            <div className="flex items-center space-x-2">
              <button
                onClick={copyCode}
                className="flex items-center space-x-1 px-2 py-1 sm:px-3 sm:py-1 bg-gray-700 hover:bg-gray-600 rounded-lg text-xs sm:text-sm text-gray-300 transition-colors"
                aria-label="Copy code to clipboard"
              >
                {copied ? <Check className="w-3 h-3" /> : <Copy className="w-3 h-3" />}
                <span className="hidden sm:inline">{copied ? "Copied!" : "Copy"}</span>
              </button>

              <button
                onClick={resetCode}
                className="flex items-center space-x-1 px-2 py-1 sm:px-3 sm:py-1 bg-gray-700 hover:bg-gray-600 rounded-lg text-xs sm:text-sm text-gray-300 transition-colors"
                aria-label="Reset code to initial state"
              >
                <RotateCcw className="w-3 h-3" />
                <span className="hidden sm:inline">Reset</span>
              </button>

              <button
                onClick={runCode}
                disabled={isRunning}
                className="flex items-center space-x-1 px-3 py-1 sm:px-4 sm:py-1 bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 disabled:opacity-50 rounded-lg text-xs sm:text-sm text-white transition-colors shadow-lg"
                aria-label={isRunning ? "Running code..." : "Run code"}
              >
                <Play className="w-3 h-3" />
                <span>{isRunning ? "Running..." : "Run"}</span>
              </button>
            </div>
          </div>

          {/* Layout */}
          <div className="flex flex-col lg:grid lg:grid-cols-2" style={{ minHeight: "300px", maxHeight: "400px" }}>
            {/* Code input */}
            <div className="border-b lg:border-b-0 lg:border-r border-gray-700 flex flex-col">
              <div className="p-2 bg-gray-800 border-b border-gray-700 flex items-center justify-between flex-shrink-0">
                <span className="text-xs text-gray-400">Code Editor</span>
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                  <span className="text-xs text-gray-400">Ready</span>
                </div>
              </div>
              <div className="flex-1 overflow-hidden" style={{ minHeight: "200px" }}>
                <textarea
                  value={code}
                  onChange={(e) => setCode(e.target.value)}
                  className="w-full h-full p-3 sm:p-4 bg-gray-900 text-gray-300 font-mono text-xs sm:text-sm resize-none focus:outline-none focus:ring-2 focus:ring-purple-500/50 scrollbar-thin scrollbar-thumb-gray-600 scrollbar-track-gray-800 hover:scrollbar-thumb-gray-500"
                  placeholder="Write your code here..."
                  aria-label="Code editor textarea"
                />
              </div>
            </div>

            {/* Output area */}
            <div className="bg-gray-950 flex flex-col">
              <div className="p-2 bg-gray-800 border-b border-gray-700 flex items-center justify-between flex-shrink-0">
                <span className="text-xs text-gray-400">Console Output</span>
                <div className="flex items-center space-x-2">
                  <div className={`w-2 h-2 rounded-full ${hasRun ? "bg-green-400" : "bg-gray-600"}`}></div>
                  <span className="text-xs text-gray-400">{hasRun ? "Success" : "Waiting"}</span>
                </div>
              </div>
              <div
                className={`flex-1 p-3 sm:p-4 overflow-y-auto overflow-x-hidden scrollbar-thin scrollbar-thumb-gray-600 scrollbar-track-gray-800 hover:scrollbar-thumb-gray-500 ${outputBorderClass}`}
                style={{ minHeight: "200px" }}
                aria-live="polite"
              >
                <pre className="text-xs sm:text-sm text-green-400 font-mono whitespace-pre-wrap">
                  {output ||
                    '🎯 Click "Run" to see the magic happen!\n\n💡 Tips:\n• Modify the code above\n• Try different inputs\n• Experiment and learn!'}
                </pre>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Achievement feedback */}
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
            className={`text-xs sm:text-sm ${
              validationStatus === "correct"
                ? "text-green-100"
                : validationStatus === "incorrect"
                ? "text-red-100"
                : "text-yellow-100"
            }`}
          >
            {validationStatus === "correct"
              ? "Excellent work! Your output matches the expected result perfectly."
              : validationStatus === "incorrect"
              ? "Your output doesn't match yet. Check the expected output and try again!"
              : "Great job! You've successfully run your first code in this section."}
          </p>
        </div>
      )}

      {/* Learning tips */}
      <div className="bg-gray-800 rounded-lg p-3 sm:p-4">
        <h4 className="text-xs sm:text-sm font-semibold text-purple-300 mb-2">🚀 Level Up Your Skills</h4>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-3 text-xs sm:text-sm text-gray-300">
          <div>
            <span className="text-purple-400">•</span> Try modifying variables
          </div>
          <div>
            <span className="text-purple-400">•</span> Add your functions
          </div>
          <div>
            <span className="text-purple-400">•</span> Test different inputs
          </div>
          <div>
            <span className="text-purple-400">•</span> Optimize performance
          </div>
        </div>
      </div>
    </div>
  )
}

export default CodeEditor
