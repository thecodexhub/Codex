import React from 'react';
import { ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const TermsAndConditions = () => {
    const navigate = useNavigate();

    return (
        <div className="bg-black text-white min-h-screen p-4 sm:p-6">
            {/* Header Section */}
            <div className="bg-gradient-to-r from-purple-800 to-purple-900 rounded-2xl p-4 sm:px-6 text-white mb-6">
                <div className="flex items-center gap-4">
                    <button
                        onClick={() => navigate('/faq')}
                        className="p-2 hover:bg-purple-700 rounded-lg transition-colors duration-200"
                    >
                        <ArrowLeft className="w-6 h-6" />
                    </button>
                    <div>
                        <h1 className="text-2xl sm:text-3xl font-bold mb-2">Terms & Conditions</h1>
                        <p className="text-purple-100 text-base sm:text-lg">Important information about using codeX</p>
                    </div>
                </div>
            </div>

            {/* Content Sections */}
            <div className="space-y-6 max-w-4xl mx-auto">
                {/* Shipping Policy */}
                <div className="bg-gray-900 rounded-xl p-6 border border-gray-700">
                    <h2 className="text-xl font-bold text-purple-400 mb-4">Shipping Policy</h2>
                    <p className="text-gray-300 leading-relaxed mb-4">
                        Since codeX provides digital services (DSA contests, coding practice, and resources), 
                        no physical products are shipped. After successful payment, access to the selected 
                        services will be provided instantly via the user's registered account.
                    </p>
                    <p className="text-gray-300 leading-relaxed">
                        For any issues with access, please contact our support team at{' '}
                        <a href="mailto:codex33@gmail.com" className="text-purple-400 hover:text-purple-300 underline">
                            codex33@gmail.com
                        </a>.
                    </p>
                </div>

                {/* Terms and Conditions */}
                <div className="bg-gray-900 rounded-xl p-6 border border-gray-700">
                    <h2 className="text-xl font-bold text-purple-400 mb-4">Terms and Conditions</h2>
                    <p className="text-gray-300 leading-relaxed mb-4">
                        Welcome to codeX! By accessing our platform, you agree to the following:
                    </p>
                    <ol className="list-decimal list-inside space-y-2 text-gray-300">
                        <li>Payments are required to access certain contests, courses, or features.</li>
                        <li>Users must provide accurate registration details.</li>
                        <li>Unauthorized use, copying, or distribution of platform content is prohibited.</li>
                        <li>codeX is not liable for losses due to incorrect information provided by the user.</li>
                        <li>All disputes will be subject to the jurisdiction of [Your City, India].</li>
                    </ol>
                    <p className="text-gray-300 leading-relaxed mt-4">
                        For further details, contact us at{' '}
                        <a href="mailto:codex33@gmail.com" className="text-purple-400 hover:text-purple-300 underline">
                            codex33@gmail.com
                        </a>.
                    </p>
                </div>

                {/* Cancellations and Refunds */}
                <div className="bg-gray-900 rounded-xl p-6 border border-gray-700">
                    <h2 className="text-xl font-bold text-purple-400 mb-4">Cancellations and Refunds</h2>
                    <p className="text-gray-300 leading-relaxed mb-4">
                        At codeX, we strive to provide the best learning experience.
                    </p>
                    <ul className="list-disc list-inside space-y-2 text-gray-300">
                        <li>Once a contest or course is purchased, it cannot be canceled.</li>
                        <li>Refunds will be processed only if a payment has been deducted but access was not granted.</li>
                        <li>Refund requests must be made within 7 days by contacting{' '}
                            <a href="mailto:codex33@gmail.com" className="text-purple-400 hover:text-purple-300 underline">
                                codex33@gmail.com
                            </a>.
                        </li>
                        <li>Refunds, if applicable, will be credited within 5–7 business days.</li>
                    </ul>
                </div>

                {/* Privacy Policy */}
                <div className="bg-gray-900 rounded-xl p-6 border border-gray-700">
                    <h2 className="text-xl font-bold text-purple-400 mb-4">Privacy Policy</h2>
                    <p className="text-gray-300 leading-relaxed mb-4">
                        codeX respects your privacy.
                    </p>
                    <ul className="list-disc list-inside space-y-2 text-gray-300">
                        <li>We collect personal details such as name, email, and payment details solely for 
                            account access, communication, and payment processing.</li>
                        <li>We do not sell or share your data with third parties, except for payment gateways 
                            like Razorpay to securely process your payments.</li>
                        <li>All transactions are encrypted and secure.</li>
                        <li>Users can request data deletion by contacting{' '}
                            <a href="mailto:codex33@gmail.com" className="text-purple-400 hover:text-purple-300 underline">
                                codex33@gmail.com
                            </a>.
                        </li>
                    </ul>
                    <p className="text-gray-300 leading-relaxed mt-4">
                        For more information, reach out to us at{' '}
                        <a href="mailto:codex33@gmail.com" className="text-purple-400 hover:text-purple-300 underline">
                            codex33@gmail.com
                        </a>.
                    </p>
                </div>
            </div>
        </div>
    );
};

export default TermsAndConditions;
