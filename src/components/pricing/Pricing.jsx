"use client"

import AuroraBackground from "../utils/BlueBackground"
import { GraduationCap, Clock, Code, LayoutDashboard, Briefcase, Trophy, CalendarDays } from "lucide-react"
import { useAuth } from "../../context/AuthContext"
import { useNavigate } from "react-router-dom"
import { useState, useEffect } from "react"

const Pricing = () => {
  const navigate = useNavigate()
  const { paymentStatus } = useAuth()

  const [timeRemaining, setTimeRemaining] = useState(null)
  const [isOfferActive, setIsOfferActive] = useState(false)

  // Only show Active Plan view for VERIFIED status
  const isSubscribedUser = paymentStatus === "VERIFIED" || paymentStatus === "DONE"

  const features = [
    {
      icon: GraduationCap,
      title: "Expert Curriculum",
      description: "Industry-focused, job-ready skills",
    },
    {
      icon: Clock,
      title: "Semester Access",
      description: "Valid for one academic term",
    },
    {
      icon: Code,
      title: "DSA Practice",
      description: "Topic-wise coding problems",
    },
    {
      icon: LayoutDashboard,
      title: "Career Tracks",
      description: "Guided specialization learning paths",
    },
    {
      icon: Briefcase,
      title: "Placement Help",
      description: "Real interview tips shared",
    },
    {
      icon: Trophy,
      title: "Gamified Learning",
      description: "Leaderboard boosts your progress",
    },
  ]

  useEffect(() => {
    const calculateTimeRemaining = () => {
      // Offer: Oct 19, 2025 5:00 PM to Oct 21, 2025 5:00 PM
      const offerStart = new Date("2025-10-19T14:00:00").getTime()
      const offerEnd = new Date("2025-10-23T14:00:00").getTime()
      const now = new Date().getTime()

      if (now < offerStart) {
        // Offer hasn't started yet
        setIsOfferActive(false)
        setTimeRemaining(null)
      } else if (now >= offerStart && now < offerEnd) {
        // Offer is active
        setIsOfferActive(true)
        const remaining = offerEnd - now

        const days = Math.floor(remaining / (1000 * 60 * 60 * 24));

        let hours;
        if(days > 0) {
          hours = days * (Math.floor((remaining % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)));
        }
        else {
          hours = Math.floor((remaining % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        }
        const minutes = Math.floor((remaining % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((remaining % (1000 * 60)) / 1000);

        setTimeRemaining({ hours, minutes, seconds })
      } else {
        // Offer has expired
        setIsOfferActive(false)
        setTimeRemaining(null)
      }
    }

    calculateTimeRemaining()
    const interval = setInterval(calculateTimeRemaining, 1000)

    return () => clearInterval(interval)
  }, [])

  const handleBuyNow = () => {
    navigate("/make-payment")
  }

  // Show payment under review banner for IN_VERIFICATION status
  const PaymentUnderReviewBanner = () => (
    <div className="bg-yellow-900/30 border border-yellow-500/30 rounded-xl p-6 mb-6">
      <div className="flex items-center space-x-4">
        <div className="w-12 h-12 rounded-full bg-yellow-500/20 border border-yellow-500/50 flex items-center justify-center">
          <Clock className="w-6 h-6 text-yellow-400" />
        </div>
        <div>
          <h3 className="text-xl font-semibold text-yellow-100">Payment Under Review</h3>
          <p className="text-yellow-200/80">
            Your payment screenshot has been submitted and is being verified by our team.
          </p>
          <p className="text-yellow-300/70 text-sm mt-1">Expected verification time: 2-3 business days</p>
        </div>
      </div>
    </div>
  )

  const DiwaliOfferBanner = () => (
    <div className="bg-gradient-to-r from-orange-900/40 to-red-900/40 border border-orange-500/50 rounded-lg p-4 mb-6 flex items-center justify-between">
      <div className="flex items-center space-x-3">
        <span className="text-2xl">🪔</span>
        <div>
          <div className="text-orange-300 font-semibold text-lg">Diwali Special Offer!</div>
          <div className="text-orange-200/80 text-sm">20% OFF - Limited Time Only</div>
        </div>
      </div>
      {timeRemaining && (
        <div className="text-right">
  <div className="text-orange-300 font-mono font-bold text-lg">
    {timeRemaining.hours} Hours : {timeRemaining.minutes} Min : {timeRemaining.seconds} Sec
  </div>
  <div className="text-orange-200/70 text-xs">Limited Time Diwali Offer</div>
</div>

      )}
    </div>
  )

  return (
    <div className="relative h-fit text-white overflow-hidden">
      {isSubscribedUser ? (
        <div className="relative max-w-6xl mx-auto space-y-9">
          <div className="relative border-2 border-[#343434] rounded-2xl p-6 sm:p-8 text-white overflow-hidden">
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
              <AuroraBackground className="w-[120%] h-[120%] opacity-40 blur-3xl" />
              <div className="absolute inset-0 bg-gradient-radial from-transparent via-black/30 to-black" />
            </div>
            <div className="relative z-10 flex items-center justify-between ">
              <div>
                <h1 className="text-2xl sm:text-4xl font-bold mb-1">Active Plan</h1>
                <p className="text-purple-100 text-base sm:text-lg">Your learning journey continues</p>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 gap-6">
            <div className="lg:col-span-2 space-y-6">
              <h2 className="text-xl font-semibold">Your Plan Includes</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {features.map((feature, index) => {
                  const Icon = feature.icon
                  return (
                    <div
                      key={index}
                      className="bg-gray-900/60 rounded-xl p-6 border border-gray-800/50 backdrop-blur-md flex items-start space-x-4"
                    >
                      <div className="w-12 h-12 rounded-lg bg-purple-900/30 border border-purple-500/20 flex items-center justify-center flex-shrink-0">
                        <Icon className="w-6 h-6 text-purple-300" />
                      </div>
                      <div>
                        <h3 className="text-white font-semibold mb-1">{feature.title}</h3>
                        <p className="text-gray-400 text-sm">{feature.description}</p>
                      </div>
                    </div>
                  )
                })}
              </div>
            </div>

            <div className="space-y-6">
              <div className="bg-gray-900/60 rounded-xl p-6 border border-gray-800/50 backdrop-blur-md">
                <div className="text-lg font-semibold mb-4">Plan Details</div>
                <div className="flex flex-col sm:flex-row sm:justify-between gap-10">
                  <div className="grid grid-cols-2 sm:flex sm:flex-row sm:gap-32">
                    <div className="flex items-start space-x-3">
                      <Trophy className="w-5 h-5 text-purple-300 mt-1" />
                      <div>
                        <div className="text-sm text-gray-400">Current Plan</div>
                        <div className="font-medium">Semester </div>
                      </div>
                    </div>
                    <div className="flex items-start space-x-3">
                      <CalendarDays className="w-5 h-5 text-purple-300 mt-1" />
                      <div>
                        <div className="text-sm text-gray-400">Expires</div>
                        <div className="font-medium">After Current Semester</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="relative max-w-6xl mx-auto space-y-9">
          <div className="bg-gradient-to-r from-purple-800 to-purple-900 rounded-2xl p-4 sm:px-6 sm:py-4 text-white">
            <h1 className="text-2xl sm:text-3xl font-bold mb-2">Pricing</h1>
            <p className="text-purple-100 text-base sm:text-lg">Make the best investment</p>
          </div>

          {/* Show payment under review banner if status is IN_VERIFICATION */}
          {paymentStatus === "IN_VERIFICATION" && <PaymentUnderReviewBanner />}

          {isOfferActive && <DiwaliOfferBanner />}

          <div className="relative bg-gray-900/60 rounded-xl p-8 border border-gray-800/50 flex flex-col lg:flex-row backdrop-blur-md overflow-hidden">
            <div className="lg:block absolute inset-0 flex items-center justify-center pointer-events-none">
              <AuroraBackground className="w-[120%] h-[120%] opacity-40 blur-3xl" />
            </div>

            <div className="flex-1 grid grid-cols-1 md:grid-cols-2 gap-6 pr-0 lg:pr-8 pb-12 lg:pb-0 border-b border-gray-800/50 lg:border-r lg:border-gray-800/50 lg:border-b-0 relative z-10">
              {features.map((feature, index) => {
                const Icon = feature.icon
                return (
                  <div key={index} className="flex items-start space-x-4">
                    <div className="w-12 h-12 rounded-full border border-gray-600/70 flex items-center justify-center flex-shrink-0">
                      <Icon className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h3 className="text-white font-semibold mb-1">{feature.title}</h3>
                      <p className="text-gray-400 text-sm">{feature.description}</p>
                    </div>
                  </div>
                )
              })}
            </div>

            <div className="flex-1 flex flex-col items-center justify-center text-center mt-12 lg:mt-0 lg:pl-8 relative z-10">
              {isOfferActive ? (
                <>
                  <div className="flex items-center justify-center gap-3 mb-2">
                    <div className="text-3xl font-bold text-white line-through opacity-60">₹499</div>
                    <div className="text-2xl font-bold text-orange-400 bg-orange-900/30 px-3 py-1 rounded">20% OFF</div>
                  </div>
                  <div className="text-5xl font-bold text-white mb-2">₹399</div>
                </>
              ) : (
                <div className="text-5xl font-bold text-white mb-2">₹499</div>
              )}
              <div className="text-gray-400 text-lg mb-8">Purchase Price</div>

              {/* Disable buy button if payment is under verification */}
              <button
                onClick={handleBuyNow}
                disabled={paymentStatus === "IN_VERIFICATION"}
                className={`w-full font-semibold py-4 px-8 rounded-lg text-lg uppercase tracking-wide transition-all duration-200 mb-4 ${
                  paymentStatus === "IN_VERIFICATION"
                    ? "bg-gray-600 text-gray-400 cursor-not-allowed opacity-50"
                    : "bg-gradient-to-r from-blue-500 to-purple-600 text-white hover:opacity-90"
                }`}
              >
                {paymentStatus === "IN_VERIFICATION" ? "Payment Under Review" : "Buy Now"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default Pricing
