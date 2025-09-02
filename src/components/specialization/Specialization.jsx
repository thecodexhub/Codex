"use client"
import { ChevronRight, Layers, Star, Lock, Crown, X, CreditCard } from "lucide-react"
import { useNavigate } from "react-router-dom"
import { useState } from "react"
import { useAuth } from "../../context/AuthContext"
const Specialization = () => {
  const navigate = useNavigate()
  const [showPremiumModal, setShowPremiumModal] = useState(false)
  
  // Mock payment status - replace with your actual payment status logic
  // const paymentStatus = "NOT_PROCESSED" // or "PROCESSED" or "DONE"
  const {paymentStatus} = useAuth();

  const cardData = [
    {
      title: "Web Development",
      description: "Master the basics of Web Development from scratch",
      onClick: () => navigate("/specialization/web-development"),
    },
    {
      title: "App Development",
      description: "Master the basics of App Development from scratch",
      onClick: () => navigate("/specialization/app-development"),
    },
    {
      title: "Data Science and Machine Learning",
      description: "Master the basics of Data Science and Machine Learning from scratch",
      onClick: () => navigate("/specialization/data-science"),
    },
  ]

  const handleCardClick = (card) => {
    if (paymentStatus === "NOT_PROCESSED") {
      setShowPremiumModal(true)
    } else {
      card.onClick()
    }
  }

  const PremiumModal = () => (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50">
      <div className="bg-gray-900 rounded-2xl p-6 max-w-md w-full border border-gray-700">
        <div className="flex justify-between items-center mb-4">
          <div className="flex items-center gap-2">
            <Crown className="w-6 h-6 text-yellow-500" />
            <h2 className="text-xl font-bold text-white">Premium Content</h2>
          </div>
          <button 
            onClick={() => setShowPremiumModal(false)}
            className="text-gray-400 hover:text-white transition-colors"
          >
            <X className="w-6 h-6" />
          </button>
        </div>
        
        <div className="space-y-4">
          <p className="text-gray-300">
            This specialization is part of our premium collection. Upgrade now to access:
          </p>
          
          <ul className="space-y-2 text-sm text-gray-300">
            <li className="flex items-center gap-2">
              <div className="w-1.5 h-1.5 bg-purple-500 rounded-full"></div>
              Unlimited access to all premium specializations
            </li>
            <li className="flex items-center gap-2">
              <div className="w-1.5 h-1.5 bg-purple-500 rounded-full"></div>
              Advanced projects and real-world applications
            </li>
            <li className="flex items-center gap-2">
              <div className="w-1.5 h-1.5 bg-purple-500 rounded-full"></div>
              Professional certification and portfolio guidance
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
                // Add your upgrade navigation logic here
                navigate("/upgrade")
              }}
              className="flex-1 bg-gradient-to-r from-purple-600 to-purple-700 text-white px-4 py-3 rounded-lg font-semibold hover:from-purple-700 hover:to-purple-800 transition-all flex items-center justify-center gap-2"
            >
              <CreditCard className="w-4 h-4" />
              Upgrade Now
            </button>
            <button 
              onClick={() => setShowPremiumModal(false)}
              className="px-4 py-3 border border-gray-600 text-gray-300 rounded-lg hover:bg-gray-800 transition-colors"
            >
              Maybe Later
            </button>
          </div>
        </div>
      </div>
    </div>
  )

  return (
    <>
        <div className="space-y-6">
          {/* Welcome Section */}
          <div className="bg-gradient-to-r from-purple-800 to-purple-900 rounded-2xl p-4 sm:px-6 text-white">
            <h1 className="text-2xl sm:text-3xl font-bold mb-2">Your Learning Journey Starts Here</h1>
            <p className="text-purple-100 text-base sm:text-lg">Pick a specialization and unlock your coding potential.</p>
          </div>

          {/* Progress Overview Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {cardData.map((card, index) => {
              const isLocked = paymentStatus === "NOT_PROCESSED"
              
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

export default Specialization