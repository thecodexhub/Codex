"use client"

import { ChevronRight, Layers, Star, Lock, Crown, X, CreditCard, CheckCircle, Clock } from "lucide-react"
import { useNavigate } from "react-router-dom"
import { useState } from "react"
import { useAuth } from "../../context/AuthContext"

const Specialization = () => {
  const navigate = useNavigate()
  const [showPremiumModal, setShowPremiumModal] = useState(false)
  const [showComingSoonModal, setShowComingSoonModal] = useState(false) // 🚀 New state
  const { paymentStatus } = useAuth()
  console.log("Payment status in Specialization:", paymentStatus)

  const cardData = [
    {
      title: "Web Development",
      description: "Master the basics of Web Development from scratch",
      onClick: () => navigate("/specialization/web-development"),
      comingSoon: false, // ✅ Available
    },
    {
      title: "App Development",
      description: "Master the basics of App Development from scratch",
      onClick: () => navigate("/specialization/app-development"),
      comingSoon: true, // 🚀 Coming Soon
    },
    {
      title: "Data Science and Machine Learning",
      description: "Master the basics of Data Science and Machine Learning from scratch",
      onClick: () => navigate("/specialization/data-science"),
      comingSoon: true, // 🚀 Coming Soon
    },
  ]

  // ✅ Handle clicks
  const handleCardClick = (card) => {
    if (paymentStatus === "DONE") {
      if (card.comingSoon) {
        setShowComingSoonModal(true) // 🚀 Show coming soon modal
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
          This specialization is under development and will be available soon. Stay tuned! 🚀
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

  // ✅ Premium Modal with payment status messages
  const PremiumModal = () => {
    const isVerified = paymentStatus === "VERIFIED" || paymentStatus === "DONE"
    const isInVerification = paymentStatus === "IN_VERIFICATION"
    const [isOpen, setIsOpen] = useState(!isVerified)

    if (!isOpen || isVerified) return null // don't render if closed or verified

    return (
      <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50">
        <div className="relative bg-gray-900 rounded-2xl p-6 max-w-md w-full border border-gray-700 text-center">
          {/* Close button */}
          <button
            onClick={() => setIsOpen(false)}
            className="absolute top-3 right-3 text-gray-400 hover:text-white"
          >
            <X size={20} />
          </button>

          {isInVerification ? (
            <>
              <div className="flex items-center justify-center mb-4">
                <Clock className="w-12 h-12 text-yellow-500" />
              </div>
              <h2 className="text-xl font-semibold text-white mb-3">
                Payment Under Verification
              </h2>
              <p className="text-gray-300 mb-6">
                Your payment is currently being verified. You can access the content once payment is verified.
              </p>
              <button
                onClick={() => setIsOpen(false)}
                className="px-6 py-2 rounded-xl bg-yellow-600 hover:bg-yellow-700 text-white font-medium transition"
              >
                Okay, Got it!
              </button>
            </>
          ) : (
            <>
              <div className="flex items-center justify-center mb-4">
                <CheckCircle className="w-12 h-12 text-green-500" />
              </div>
              <h2 className="text-xl font-semibold text-white mb-3">
                Payment Verified!
              </h2>
              <p className="text-gray-300 mb-6">
                Payment verified! Hold tight, we will be starting soon.
              </p>
              <button
                onClick={() => setIsOpen(false)}
                className="px-6 py-2 rounded-xl bg-green-600 hover:bg-green-700 text-white font-medium transition"
              >
                Excited to Start!
              </button>
            </>
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
          <p className="text-purple-100 text-base sm:text-lg">Pick a specialization and unlock your coding potential.</p>
        </div>

        {/* Specialization Cards */}
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
                    <Clock className="w-5 h-5 text-yellow-500" /> // ⏰ Coming Soon icon
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

      {/* Modals */}
      {showPremiumModal && <PremiumModal />}
      {showComingSoonModal && <ComingSoonModal />}
    </>
  )
}

export default Specialization
