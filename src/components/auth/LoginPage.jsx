import { useState } from "react"
import { useNavigate } from "react-router-dom";
import Aurora from "../utils/Background"

// Attention Icon Component
const AttentionIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className="h-5 w-5 text-violet-300"
    viewBox="0 0 20 20"
    fill="currentColor"
  >
    <path
      fillRule="evenodd"
      d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
      clipRule="evenodd"
    />
  </svg>
)

export default function LoginPage() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (email === "s@gmail.com" && password === "s@123") {
      localStorage.setItem("Auth", "true");
      navigate("/dashboard"); 
    } else {
      alert("Invalid email or password.");
    }
    console.log("Login attempt with:", { email, password });
  }

  return (
    <div className="min-h-screen bg-black relative flex flex-col items-center justify-center antialiased overflow-hidden">
      {/* Aurora Background */}
      <div className="absolute inset-0 z-0">
        <Aurora />
      </div>

      {/* Login Modal */}
      <div className="relative z-10 w-full max-w-2xl mx-auto p-4">
        <div className="bg-black/50 backdrop-blur-md rounded-2xl border border-neutral-800/50 shadow-2xl p-8">
          <h1 className="text-5xl md:text-6xl font-bold text-center bg-clip-text text-transparent bg-gradient-to-b from-white to-neutral-400 mb-2">
            Welcome Back
          </h1>
          <p className="text-neutral-300 text-center text-lg mb-8">
            Enter your credentials to access your account
          </p>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="email" className="text-white text-base font-medium mb-2 block">
                Email
              </label>
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                className="w-full bg-neutral-800/70 backdrop-blur-sm border border-neutral-700 text-white rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-purple-400 focus:border-transparent transition-all opacity-50"
              // disabled
              />
            </div>
            <div>
              <label htmlFor="password" className="text-white text-base font-medium mb-2 block">
                Password
              </label>
              <input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter your password"
                className="w-full bg-neutral-800/70 backdrop-blur-sm border border-neutral-700 text-white rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-purple-400 focus:border-transparent transition-all opacity-50"
              // disabled
              />
            </div>
            <button
              type="submit"
              className="w-full bg-gradient-to-r from-violet-600 to-purple-700 text-white font-semibold text-lg py-3 px-4 rounded-lg transition-all duration-300 hover:shadow-[0_0_15px_rgba(147,51,234,0.3)] transform hover:scale-[1.02] active:scale-[0.98] opacity-50"
            // disabled
            >
              Sign In
            </button>

            <div className="mt-6 p-4 bg-purple-900/30 border border-purple-800/40 rounded-lg flex items-start gap-3">
              <div className="mt-0.5">
                <AttentionIcon />
              </div>
              <p className="text-violet-200 text-sm">
                <span className="font-semibold">Note:</span> Your login credentials will be sent to your registered email address after successful registration. Please check your email for the login details.
              </p>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}