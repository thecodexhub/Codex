"use client"
import { ChevronRight, Layers, Star } from "lucide-react"
import { useNavigate } from "react-router-dom"

const Specialization = () => {
  const navigate = useNavigate()

  const cardData = [
    {
      title: "HTML",
      description: "Master the basics of HTML from scratch",
      onClick: () => navigate("/specialization/html"),
    },
    {
      title: "CSS",
      description: "Master the basics of CSS from scratch",
      onClick: () => navigate("/specialization/css"),
    },
  ]

  return (
    <div className="min-h-screen bg-gray-950 py-6 px-4 sm:px-6">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Welcome Section */}
        <div className="bg-gradient-to-r from-purple-800 to-purple-900 rounded-2xl p-4 sm:p-6 text-white">
          <h1 className="text-2xl sm:text-3xl font-bold mb-2">Your Learning Journey Starts Here</h1>
          <p className="text-purple-100 text-base sm:text-lg">Pick a course and unlock your coding potential.</p>
        </div>

        {/* Progress Overview Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 cursor-pointer">
          {cardData.map((card, index) => (
            <div
              key={index}
              onClick={card.onClick}
              className="bg-gray-900 rounded-xl p-4 sm:p-5 shadow-sm border border-gray-800 transition hover:bg-gray-800"
              role="region"
              aria-labelledby={`progress-title-${index}`}
            >
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h3
                    id={`progress-title-${index}`}
                    className="text-lg font-semibold text-gray-100 flex items-center gap-2"
                  >
                    {index === 0 ? (
                      <Layers className="w-5 h-5 text-purple-500" />
                    ) : (
                      <Star className="w-5 h-5 text-purple-500" />
                    )}
                    {card.title}
                  </h3>
                  <p className="text-sm text-gray-300 mt-1">Progress</p>
                </div>
                <ChevronRight className="w-5 h-5 text-gray-400" />
              </div>

              {/* Description */}
              <div className="mt-3 text-sm text-purple-300">
                Description: <span className="font-semibold text-gray-300">{card.description}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default Specialization
