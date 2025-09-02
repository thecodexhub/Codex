import { BookOpen } from "lucide-react"

export default function renderTheoryContent(theory) {
  if (!Array.isArray(theory)) return null

  return theory.map((item, index) => {
    if (item.heading) {
      return (
        <h2 key={index} className="text-xl sm:text-2xl font-bold text-white mb-4 flex items-center gap-2">
          <BookOpen className="w-5 h-5 sm:w-6 sm:h-6 text-purple-400" />
          {item.heading}
        </h2>
      )
    }

    if (item.subHeading) {
      return (
        <h3 key={index} className="text-lg sm:text-xl font-semibold text-purple-300 mb-3 mt-6">
          {item.subHeading}
        </h3>
      )
    }

    if (item.paragraph) {
      return (
        <p key={index} className="text-gray-300 mb-4 leading-relaxed text-sm sm:text-base">
          {item.paragraph}
        </p>
      )
    }

    if (item.bulletPoints) {
      return (
        <ul key={index} className="list-none space-y-2 mb-4">
          {item.bulletPoints.map((point, pointIndex) => (
            <li key={pointIndex} className="flex items-start gap-3 text-gray-300 text-sm sm:text-base">
              <div className="w-2 h-2 bg-purple-400 rounded-full mt-2 flex-shrink-0"></div>
              <span>{point}</span>
            </li>
          ))}
        </ul>
      )
    }

    if (item.code) {
      return (
        <div key={index} className="bg-gray-900 border border-gray-700 rounded-lg p-3 sm:p-4 mb-4 overflow-x-auto">
          <pre className="text-green-400 font-mono text-xs sm:text-sm">
            <code>{item.code}</code>
          </pre>
          {item.output && (
            <div className="mt-3 pt-3 border-t border-gray-700">
              <div className="text-xs text-gray-400 mb-2">Expected Output:</div>
              <pre className="text-blue-400 font-mono text-xs sm:text-sm">
                <code>{item.output}</code>
              </pre>
            </div>
          )}
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
