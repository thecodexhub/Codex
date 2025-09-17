"use client"

import { ChevronRight, Layers, Star, Lock, Crown, X, CreditCard, CheckCircle, Clock } from "lucide-react"
import { useNavigate } from "react-router-dom"
import { useState } from "react"
import { useAuth } from "../../context/AuthContext"

const Courses = () => {
  const navigate = useNavigate()
  const [showPremiumModal, setShowPremiumModal] = useState(false)
  const [showComingSoonModal, setShowComingSoonModal] = useState(false)
  const { paymentStatus } = useAuth()
  console.log("Payment status in Courses:", paymentStatus)

  const cardData = [
    {
      title: "C Programming Language",
      description: "Master the basics of C programming from scratch",
      onClick: () => navigate("/courses/c-programming"),
      comingSoon: false, // ✅ available
    },
    {
      title: "Python Programming Language",
      description: "Master the basics of Python programming from scratch",
      onClick: () => navigate("/courses/python-programming"),
      comingSoon: true, // 🚀 Coming soon
    },
    {
      title: "C++ Programming Language",
      description: "Master the basics of C++ programming from scratch",
      onClick: () => navigate("/courses/cpp-programming"),
      comingSoon: true,
    },
    {
      title: "Java Programming Language",
      description: "Master the basics of Java programming from scratch",
      onClick: () => navigate("/courses/java-programming"),
      comingSoon: true,
    },
    {
      title: "JavaScript Programming Language",
      description: "Master the basics of JavaScript programming from scratch",
      onClick: () => navigate("/courses/javascript-programming"),
      comingSoon: true,
    },
    {
      title: "C# Programming Language",
      description: "Master the basics of C# programming from scratch",
      onClick: () => navigate("/courses/csharp-programming"),
      comingSoon: true,
    },
  ]

  // ✅ Handle clicks
  const handleCardClick = (card) => {
    if (paymentStatus === "DONE") {
      if (card.comingSoon) {
        setShowComingSoonModal(true) // 🚀 Show coming soon
      } else {
        card.onClick()
      }
    } else {
      setShowPremiumModal(true)
    }
  }

  // ✅ Coming Soon Modal
  const ComingSoonModal = () => (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50">
      <div className="bg-gray-900 rounded-2xl p-6 max-w-md w-full border border-gray-700">
        <div className="flex justify-between items-center mb-4">
          <div className="flex items-center gap-2">
            <Clock className="w-6 h-6 text-yellow-500" />
            <h2 className="text-lg sm:text-xl font-bold text-white">Coming Soon</h2>
          </div>
          <button
            onClick={() => setShowComingSoonModal(false)}
            className="text-gray-400 hover:text-white transition-colors"
          >
            <X className="w-6 h-6" />
          </button>
        </div>
        <p className="text-gray-300 text-sm sm:text-base">
          This course is under development and will be available soon. Stay tuned! 🚀
        </p>
        <div className="flex justify-end mt-6">
          <button
            onClick={() => setShowComingSoonModal(false)}
            className="px-3 py-2 sm:px-4 sm:py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
          >
            Okay, Got it!
          </button>
        </div>
      </div>
    </div>
  )

  // ✅ Premium Modal (unchanged)
  const PremiumModal = () => {
    const isVerified = paymentStatus === "VERIFIED"
    return (
      <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50">
        <div className="bg-gray-900 rounded-2xl p-6 max-w-md w-full border border-gray-700">
          {/* ... keep your existing Premium Modal code here ... */}
        </div>
      </div>
    )
  }

  return (
    <>
      <div className="space-y-6">
        {/* Welcome Section */}
        <div className="bg-gradient-to-r from-purple-800 to-purple-900 rounded-2xl p-4 sm:px-6 text-white">
          <h1 className="text-2xl sm:text-3xl font-bold mb-2">Your Learning Journey Starts Here</h1>
          <p className="text-purple-100 text-base sm:text-lg">Pick a course and unlock your coding potential.</p>
        </div>

        {/* Course Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {cardData.map((card, index) => {
            const isLocked = paymentStatus !== "DONE"
            return (
              <div
                key={index}
                onClick={() => handleCardClick(card)}
                className="bg-gray-900 rounded-xl p-4 sm:p-5 shadow-sm border border-gray-800 transition hover:bg-gray-800 cursor-pointer"
              >
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h3 className="text-lg font-semibold text-gray-100 flex items-center gap-2">
                      {index === 0 ? (
                        <Layers className="w-5 h-5 text-purple-500" />
                      ) : (
                        <Star className="w-5 h-5 text-purple-500" />
                      )}
                      {card.title}
                    </h3>
                    <p className="text-sm text-gray-300 mt-1">Progress</p>
                  </div>
                  {isLocked ? (
                    <Lock className="w-5 h-5 text-gray-400" />
                  ) : card.comingSoon ? (
                    <Clock className="w-5 h-5 text-yellow-500" />
                  ) : (
                    <ChevronRight className="w-5 h-5 text-gray-400" />
                  )}
                </div>
                <div className="mt-3 text-sm text-purple-300">
                  Description: <span className="font-semibold text-gray-300">{card.description}</span>
                </div>
              </div>
            )
          })}
        </div>
      </div>

      {/* Modals */}
      {showPremiumModal && <PremiumModal />}
      {showComingSoonModal && <ComingSoonModal />}
    </>
  )
}

export default Courses
