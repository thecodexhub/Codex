import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Aurora from "../utils/Background";
import { signUp, signInWithGoogle, sendVerificationEmail } from "../../config/firebase";
import axios from "axios";

const GoogleIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 24 24">
    <path
      fill="#4285F4"
      d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
    />
    <path
      fill="#34A853"
      d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
    />
    <path
      fill="#FBBC05"
      d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
    />
    <path
      fill="#EA4335"
      d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
    />
  </svg>
);

export default function SignupPage() {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
  });
  const [isSubmitLoading, setSubmitIsLoading] = useState(false);
  const [isGoogleLoading, setGoogleIsLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const [userEmail, setUserEmail] = useState("");

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async () => {
    const { firstName, lastName, email, password } = formData;
    if (!firstName || !lastName || !email || !password) {
      setError("Please fill in all fields.");
      return;
    }

    setSubmitIsLoading(true);
    setError("");
    setMessage("");

    try {

      const result = await signUp(email, password, `${firstName} ${lastName}`);
      setUserEmail(result.user.email);
      console.log('email user: ', result.user.email)

      setMessage(result.message);
      // navigate("/login");
    } catch (err) {
      console.error("Signup error:", err.message);
      setError(err.message);
    } finally {
      setSubmitIsLoading(false);
    }
  };

  const handleGoogleSignup = async () => {
    setGoogleIsLoading(true);
    setError("");
    try {
      const result = await signInWithGoogle("signup");
      const user = result.user;
      console.log("Google signup success:", result);
      setUserEmail(result.email);
      setMessage(result.message);

    } catch (err) {
      console.error("Google signup error:", err.message);
      setError(err.message);
    } finally {
      setGoogleIsLoading(false);
    }
  };

  const handleLoginNavigation = () => {
    navigate("/login");
  };
  const onResendEmail = async () => {
    alert('Resend email clicked');
  };
  return (
    <div className="min-h-screen bg-black relative flex flex-col items-center justify-center antialiased overflow-hidden">
      <div className="absolute inset-0 z-0">
        <Aurora />
      </div>

      <div className="relative z-10 w-full max-w-2xl mx-auto p-4">
        {message ? (
          // <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm">
          <div className="bg-black/50 backdrop-blur-md rounded-2xl border border-neutral-800/50 shadow-2xl p-8">
            <div className="text-center">
              <div className="mx-auto flex items-center justify-center h-16 w-16 rounded-full bg-green-900/30 border border-green-800/40 mb-6">
                <svg
                  className="h-8 w-8 text-green-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M5 13l4 4L19 7"
                  />
                </svg>
              </div>

              <h3 className="text-2xl font-bold text-white mb-4">
                Account Created Successfully!
              </h3>

              {message === "signupgoogle" ? (
                <p className="text-neutral-300 mb-6 leading-relaxed">
                  Welcome aboard! Your Google account{" "}
                  <span className="text-purple-400 font-medium">{userEmail}</span>{" "}
                  has been successfully linked to CodeX.
                  <br />
                  You're now ready to dive into learning and coding  with CodeX!
                </p>
              ) : (
                <div>
                  <p className="text-neutral-300 mb-6 leading-relaxed">
                    We've sent a verification email to{" "}
                    <span className="text-purple-400 font-medium">{userEmail}</span>.
                    <br />
                    Please check your inbox and click the verification link to activate your account.
                  </p>

                  <div className="bg-yellow-900/20 border border-yellow-800/40 rounded-lg p-4 mb-6">
                    <p className="text-yellow-200 text-sm">
                      <strong>Can't find the email?</strong> Check your spam folder or promotions tab.
                    </p>
                  </div>
                </div>)}

              <div className="space-y-3">

                {message === "signupsuccess" && (
                  <button
                    onClick={onResendEmail}
                    className="w-full bg-gradient-to-r from-violet-600 to-purple-700 text-white font-semibold py-3 rounded-lg transition-all duration-300 hover:shadow-[0_0_15px_rgba(147,51,234,0.3)] hover:scale-[1.02] active:scale-[0.98]"
                  >
                    Resend Verification Email
                  </button>
                )}
                <button
                  onClick={handleLoginNavigation}
                  className="w-full bg-neutral-800/70 border border-neutral-700 text-white font-semibold py-3 rounded-lg transition-all duration-300 hover:bg-neutral-700/70"
                >
                  Go to Login Page
                </button>
              </div>
            </div>
          </div>
          // </div>
        )
          : (
            <div className="bg-black/50 backdrop-blur-md rounded-2xl border border-neutral-800/50 shadow-2xl p-8">
              <h1 className="text-4xl md:text-5xl font-bold text-center bg-clip-text text-transparent bg-gradient-to-b from-white to-neutral-400 mb-2">
                Create Account
              </h1>
              <p className="text-neutral-300 text-center text-lg mb-8">
                Join us and start your journey today
              </p>
              {error && (
                <div className="mb-6 p-4 bg-red-900/30 border border-red-800/40 rounded-lg">
                  <p className="text-red-200 text-sm">{error}</p>
                </div>
              )}

              <form className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label
                      htmlFor="firstName"
                      className="text-white text-base font-medium mb-2 block"
                    >
                      First Name
                    </label>
                    <input
                      id="firstName"
                      name="firstName"
                      type="text"
                      value={formData.firstName}
                      onChange={handleInputChange}
                      placeholder="Enter your first name"
                      required
                      className="w-full bg-neutral-800/70 border border-neutral-700 text-white rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-purple-400 focus:border-transparent transition-all"
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="lastName"
                      className="text-white text-base font-medium mb-2 block"
                    >
                      Last Name
                    </label>
                    <input
                      id="lastName"
                      name="lastName"
                      type="text"
                      value={formData.lastName}
                      onChange={handleInputChange}
                      placeholder="Enter your last name"
                      required
                      className="w-full bg-neutral-800/70 border border-neutral-700 text-white rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-purple-400 focus:border-transparent transition-all"
                    />
                  </div>
                </div>

                <div>
                  <label
                    htmlFor="email"
                    className="text-white text-base font-medium mb-2 block"
                  >
                    Email
                  </label>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    placeholder="Enter your email"
                    required
                    autoComplete="email"
                    className="w-full bg-neutral-800/70 border border-neutral-700 text-white rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-purple-400 focus:border-transparent transition-all"
                  />
                </div>

                <div>
                  <label
                    htmlFor="password"
                    className="text-white text-base font-medium mb-2 block"
                  >
                    Password
                  </label>
                  <input
                    id="password"
                    name="password"
                    type="password"
                    value={formData.password}
                    onChange={handleInputChange}
                    placeholder="Create a strong password"
                    required
                    autoComplete="new-password"
                    className="w-full bg-neutral-800/70 border border-neutral-700 text-white rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-purple-400 focus:border-transparent transition-all"
                  />
                </div>

                <button
                  type="button"
                  onClick={handleSubmit}
                  disabled={isSubmitLoading}
                  className="w-full bg-gradient-to-r from-violet-600 to-purple-700 text-white font-semibold text-lg py-3 rounded-lg transition-all duration-300 hover:shadow-[0_0_15px_rgba(147,51,234,0.3)] hover:scale-[1.02] active:scale-[0.98] disabled:opacity-50"
                >
                  {isSubmitLoading ? "Creating Account..." : "Create Account"}
                </button>

                <div className="relative">
                  <div className="absolute inset-0 flex items-center">
                    <div className="w-full border-t border-neutral-700"></div>
                  </div>
                  <div className="relative flex justify-center text-sm">
                    <span className="px-2 bg-black text-neutral-400">
                      Or continue with
                    </span>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={handleGoogleSignup}
                  disabled={isGoogleLoading}
                  className="w-full bg-white text-gray-900 font-semibold text-lg py-3 rounded-lg transition-all duration-300 hover:bg-gray-100 flex items-center justify-center gap-3 disabled:opacity-50"
                >
                  <GoogleIcon />
                  {isGoogleLoading ? "Signing up..." : "Sign up with Google"}
                </button>

                <div className="text-center">
                  <p className="text-neutral-400 text-sm">
                    Already have an account?{" "}
                    <button
                      type="button"
                      className="text-purple-400 hover:text-purple-300 font-medium transition-colors"
                      onClick={handleLoginNavigation}
                    >
                      Sign in here
                    </button>
                  </p>
                </div>
              </form>
            </div>
          )}
      </div>

    </div>
  );
}
