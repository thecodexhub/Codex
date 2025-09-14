"use client"

import { ChevronRight, Layers, Star, Lock, Crown, X, CreditCard, CheckCircle } from "lucide-react"
import { useNavigate } from "react-router-dom"
import { useState } from "react"
import { useAuth } from "../../context/AuthContext"

const Courses = () => {
  const navigate = useNavigate()
  const [showPremiumModal, setShowPremiumModal] = useState(false)
  const { paymentStatus } = useAuth()
  console.log("Payment status in Courses:", paymentStatus)

  const cardData = [
    {
      title: "C Programming Language",
      description: "Master the basics of C programming from scratch",
      onClick: () => navigate("/courses/c-programming"),
    },
    {
      title: "Python Programming Language",
      description: "Master the basics of Python programming from scratch",
      onClick: () => navigate("/courses/python-programming"),
    },
    {
      title: "C++ Programming Language",
      description: "Master the basics of C++ programming from scratch",
      onClick: () => navigate("/courses/cpp-programming"),
    },
    {
      title: "Java Programming Language",
      description: "Master the basics of Java programming from scratch",
      onClick: () => navigate("/courses/java-programming"),
    },
    {
      title: "JavaScript Programming Language",
      description: "Master the basics of JavaScript programming from scratch",
      onClick: () => navigate("/courses/javascript-programming"),
    },
    {
      title: "C# Programming Language",
      description: "Master the basics of C# programming from scratch",
      onClick: () => navigate("/courses/csharp-programming"),
    },
  ]

  // ✅ Moved outside of JSX
  const handleCardClick = (card) => {
    if (paymentStatus === "DONE") {
      // user has active subscription, allow navigation
      card.onClick()
    } else {
      // for NOT_DONE or VERIFIED, show modal
      setShowPremiumModal(true)
    }
  }

  // ✅ Modal defined as a child component
  const PremiumModal = () => {
    const isVerified = paymentStatus === "VERIFIED"

    return (
      <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50">
        <div className="bg-gray-900 rounded-2xl p-6 max-w-md w-full border border-gray-700">
          <div className="flex justify-between items-center mb-4">
            <div className="flex items-center gap-2">
              {isVerified ? (
                <CheckCircle className="w-6 h-6 text-green-500" /> // ✅ Green tick for verified
              ) : (
                <Crown className="w-6 h-6 text-yellow-500" /> // 👑 Crown for premium upgrade
              )}
              <h2 className="text-lg sm:text-xl font-bold text-white">
                {isVerified ? "Subscription Verified" : "Premium Content"}
              </h2>
            </div>
            <button
              onClick={() => setShowPremiumModal(false)}
              className="text-gray-400 hover:text-white transition-colors"
            >
              <X className="w-6 h-6" />
            </button>
          </div>

          {isVerified ? (
            // ✅ Verified state
            <div className="space-y-4">
              <p className="text-gray-300 text-sm sm:text-base">
                Your subscription has been <span className="font-semibold text-green-400">verified</span>! 🎉
              </p>
              <p className="text-gray-300 text-sm sm:text-base">
                Your learning journey will be starting soon. We are truly excited and happy for you!
              </p>

              <div className="flex justify-end mt-6">
                <button
                  onClick={() => setShowPremiumModal(false)}
                  className="px-3 py-2 sm:px-4 sm:py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
                >
                  I am excited too !
                </button>
              </div>
            </div>
          ) : (
            // ❌ Not verified (default premium upsell)
            <div className="space-y-4">
              <p className="text-gray-300 text-sm sm:text-base">
                This course is part of our premium collection. Upgrade now to access:
              </p>

              <ul className="space-y-2 text-xs sm:text-sm text-gray-300">
                <li className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 bg-purple-500 rounded-full"></div>
                  Unlimited access to all premium courses
                </li>
                <li className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 bg-purple-500 rounded-full"></div>
                  Advanced coding exercises and projects
                </li>
                <li className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 bg-purple-500 rounded-full"></div>
                  Certificate of completion
                </li>
                <li className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 bg-purple-500 rounded-full"></div>
                  Priority support and mentorship
                </li>
              </ul>

              <div className="flex gap-3 mt-6">
                <button
                  onClick={() => {
                    setShowPremiumModal(false)
                    navigate("/pricing")
                  }}
                  className="flex-1 bg-gradient-to-r from-purple-600 to-purple-700 text-white px-3 py-2 sm:px-4 sm:py-3 rounded-lg font-semibold hover:from-purple-700 hover:to-purple-800 transition-all flex items-center justify-center gap-2"
                >
                  <CreditCard className="w-4 h-4" />
                  Upgrade Now
                </button>
                <button
                  onClick={() => setShowPremiumModal(false)}
                  className="px-3 py-2 sm:px-4 sm:py-3 border border-gray-600 text-gray-300 rounded-lg hover:bg-gray-800 transition-colors"
                >
                  Maybe Later
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    )
  }

  // ✅ Final return
  return (
    <>
      <div className="space-y-6">
        {/* Welcome Section */}
        <div className="bg-gradient-to-r from-purple-800 to-purple-900 rounded-2xl p-4 sm:px-6 text-white">
          <h1 className="text-2xl sm:text-3xl font-bold mb-2">Your Learning Journey Starts Here</h1>
          <p className="text-purple-100 text-base sm:text-lg">Pick a course and unlock your coding potential.</p>
        </div>

        {/* Progress Overview Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {cardData.map((card, index) => {
            const isLocked = paymentStatus !== "DONE"

            return (
              <div
                key={index}
                onClick={() => handleCardClick(card)}
                className="bg-gray-900 rounded-xl p-4 sm:p-5 shadow-sm border border-gray-800 transition hover:bg-gray-800 cursor-pointer"
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
                  {isLocked ? (
                    <Lock className="w-5 h-5 text-gray-400" />
                  ) : (
                    <ChevronRight className="w-5 h-5 text-gray-400" />
                  )}
                </div>

                {/* Description */}
                <div className="mt-3 text-sm text-purple-300">
                  Description: <span className="font-semibold text-gray-300">{card.description}</span>
                </div>
              </div>
            )
          })}
        </div>
      </div>

      {/* Premium Modal */}
      {showPremiumModal && <PremiumModal />}
    </>
  )
}

export default Courses
