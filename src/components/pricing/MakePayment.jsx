import React, { useState } from 'react';
import { ArrowLeft, Upload, CheckCircle, QrCode, Smartphone, CreditCard, User, IndianRupee, X, Clock, Shield } from 'lucide-react';
import qrImage from '../../assets/payment.png';
import { useAuth } from '../../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { BASE_URL, CLOUDINARY_URL } from '../../config';
import axios from 'axios';
const AuroraBackground = ({ className }) => (
    <div className={`${className} bg-gradient-to-br from-purple-600/30 via-blue-500/20 to-purple-800/30 animate-pulse`} />
);

// Success Modal Component
const SuccessModal = ({ isOpen, onClose }) => {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
            <div className="relative bg-gray-900 border border-gray-700 rounded-2xl p-8 max-w-md w-full mx-4 shadow-2xl">
                {/* Close button */}
                <button
                    onClick={onClose}
                    className="absolute top-4 right-4 p-2 rounded-full hover:bg-gray-800 transition-colors"
                >
                    <X className="w-5 h-5 text-gray-400" />
                </button>

                {/* Success content */}
                <div className="text-center space-y-6">
                    {/* Success icon with animation */}
                    <div className="w-20 h-20 rounded-full bg-green-500/20 border-2 border-green-500 flex items-center justify-center mx-auto animate-pulse">
                        <CheckCircle className="w-10 h-10 text-green-400" />
                    </div>

                    {/* Title */}
                    <div>
                        <h3 className="text-2xl font-bold text-white mb-2">Payment Submitted Successfully!</h3>
                        <p className="text-gray-400">Your payment verification has been received</p>
                    </div>

                    {/* Details */}
                    <div className="bg-gray-800/50 rounded-xl p-4 space-y-3 text-left">
                        <div className="flex items-center space-x-3">
                            <Clock className="w-5 h-5 text-blue-400 flex-shrink-0" />
                            <div>
                                <div className="text-sm font-medium text-white">Verification Time</div>
                                <div className="text-xs text-gray-400">2-3 business days</div>
                            </div>
                        </div>

                        <div className="flex items-center space-x-3">
                            <Shield className="w-5 h-5 text-purple-400 flex-shrink-0" />
                            <div>
                                <div className="text-sm font-medium text-white">Plan Activation</div>
                                <div className="text-xs text-gray-400">Automatic after verification</div>
                            </div>
                        </div>
                    </div>

                    {/* Additional info */}
                    <div className="bg-blue-900/20 border border-blue-500/30 rounded-lg p-4">
                        <p className="text-blue-300 text-sm">
                            <strong>What's next?</strong> Our team will verify your payment and activate your semester access.
                            You'll receive a confirmation email once your plan is active.
                        </p>
                    </div>

                    {/* Action button */}
                    <button
                        onClick={onClose}
                        className="w-full bg-gradient-to-r from-blue-500 to-purple-600 text-white font-semibold py-3 px-6 rounded-lg hover:opacity-90 transition-opacity"
                    >
                        Continue
                    </button>
                </div>
            </div>
        </div>
    );
};

const MakePayment = () => {
    const { user, mongodbId, paymentStatus, refreshPaymentStatus } = useAuth();
    const [uploadedImage, setUploadedImage] = useState(null);
    const [isUploading, setIsUploading] = useState(false);
    const [uploadSuccess, setUploadSuccess] = useState(false);
    const [imageUrl, setImageUrl] = useState("");
    const [showSuccessModal, setShowSuccessModal] = useState(false);
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false); 
    const navigate = useNavigate();

    const handleImageUpload = async (e) => {
        const file = e.target.files[0];
        if (!file) return;

        setUploadedImage(file);
        setIsUploading(true);
        const formData = new FormData();
        formData.append("file", file);
        formData.append("upload_preset", "image_upload");
        formData.append("cloud_name", "drkhfntxp");

        try {
            const res = await fetch(
                `${CLOUDINARY_URL}`,
                {
                    method: "POST",
                    body: formData,
                }
            );

            const data = await res.json();
            if (data.secure_url) {
                setImageUrl(data.secure_url);
                setUploadSuccess(true);
            }
        } catch (err) {
            console.error("Error uploading image:", err);
        } finally {
            setIsUploading(false);
        }
    };

    const handleGoBack = () => {
        window.history.back();
    };

    const handleSubmit = async () => {
        if (uploadedImage && imageUrl) {
            setIsSubmitting(true);
            const paymentData = {
                user_id: mongodbId,
                firstName: user.displayName.split(' ')[0],
                lastName: user.displayName.split(' ')[1] || '',
                amount: 499,
                screenshotUrl: imageUrl
            };
            try {
                const res = await axios.post(
                    `${BASE_URL}${PAYMENT}`,
                    paymentData,
                    {
                        headers: { 'Content-Type': 'application/json' },
                    }
                );

                const paymentStatusUpdate = await axios.patch(
                    `${BASE_URL}${PAYMENT}/${mongodbId}/${res.data.paymentId}`,
                    { paymentStatus: "IN_VERIFICATION" },
                    { headers: { "Content-Type": "application/json" } }
                );

                await refreshPaymentStatus();
                setIsSubmitted(true);
                setShowSuccessModal(true);
            } catch (err) {
                alert('Error submitting payment. Please try again.');
                console.error('Payment API error:', err);
            } finally {
                setIsSubmitting(false);
            }
        } else {
            alert('Please upload payment screenshot first.');
        }
    };

    const handleCloseModal = () => {
        setShowSuccessModal(false);

        // Clear the form after closing modal
        setUploadedImage(null);
        setUploadSuccess(false);
        setImageUrl("");
        setIsSubmitted(false);
        navigate('/pricing')
    };

    // Debug: Log paymentStatus whenever it changes
    React.useEffect(() => {
        console.log('Current paymentStatus:', paymentStatus);
    }, [paymentStatus]);

    // Handle IN_VERIFICATION status - show payment under review
    if (paymentStatus === 'IN_VERIFICATION') {
        return (
            <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm">
                <div className="bg-gray-900 border border-gray-700 rounded-2xl p-10 max-w-lg w-full mx-4 shadow-2xl text-center flex flex-col items-center">
                    <Clock className="w-16 h-16 text-yellow-400 mx-auto mb-6 animate-pulse" />
                    <h2 className="text-3xl font-bold mb-4 text-white">Payment Under Review</h2>
                    <p className="text-gray-300 text-lg mb-2">Thank you for submitting your payment screenshot.</p>
                    <p className="text-gray-400 text-base mb-6">Our team is reviewing your payment. You will receive an email once your plan is activated.</p>

                    <button
                        onClick={() => navigate('/pricing')}
                        className="mt-4 bg-gradient-to-r from-blue-500 to-purple-600 text-white font-semibold py-3 px-6 rounded-lg hover:opacity-90 transition-opacity"
                    >
                        Okay!
                    </button>
                </div>
            </div>
        );
    }

    // Handle VERIFIED status - redirect to pricing page showing active plan
    if (paymentStatus === 'VERIFIED') {
        return (
            <div className="flex flex-col items-center justify-center min-h-screen bg-gray-950 text-white">
                <div className="bg-gray-900 border border-gray-700 rounded-2xl p-8 max-w-md w-full mx-4 shadow-2xl text-center">
                    <CheckCircle className="w-16 h-16 text-green-400 mx-auto mb-4 animate-pulse" />
                    <h2 className="text-2xl font-bold mb-2">Payment Verified!</h2>
                    <p className="text-gray-300 mb-4">Your semester access is now active. Welcome to the learning journey!</p>

                    <button
                        onClick={() => navigate('/pricing')}
                        className="w-full bg-gradient-to-r from-blue-500 to-purple-600 text-white font-semibold py-3 px-6 rounded-lg hover:opacity-90 transition-opacity"
                    >
                        View Active Plan
                    </button>
                </div>
            </div>
        );
    }

    // Default case: NOT_PROCESSED or null - show payment form
    return (
        <div className="relative h-fit text-white overflow-hidden min-h-screen">
            <div className="relative max-w-6xl mx-auto space-y-9">
                {/* Header Section */}
                <div className="relative border-2 border-[#343434] rounded-2xl p-6 sm:p-8 text-white overflow-hidden">
                    <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                        <AuroraBackground className="w-[120%] h-[120%] opacity-40 blur-3xl" />
                        <div className="absolute inset-0 bg-gradient-radial from-transparent via-black/30 to-black" />
                    </div>
                    <div className="relative z-10 flex items-center justify-between">
                        <div className="flex items-center">
                            <button
                                onClick={handleGoBack}
                                className="mr-6 p-3 rounded-xl bg-gray-800/50 hover:bg-gray-700/50 transition-colors border border-gray-600/50"
                            >
                                <ArrowLeft className="w-6 h-6" />
                            </button>
                            <div>
                                <h1 className="text-2xl sm:text-4xl font-bold mb-1">Complete Payment</h1>
                                <div className="flex items-center space-x-3">
                                    <p className="text-purple-100 text-base sm:text-lg">Secure your semester access</p>
                                    {isSubmitted && (
                                        <span className="text-xs bg-orange-500/20 text-orange-300 px-2 py-1 rounded-full border border-orange-500/30">
                                            Payment in Progress
                                        </span>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Main Content */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    {/* Left Column - Payment Details */}
                    <div className="space-y-2">
                        {/* Order Summary */}
                        <div className="relative bg-gray-900/60 rounded-xl p-6 sm:p-8 border border-gray-800/50 backdrop-blur-md overflow-hidden">
                            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                                <AuroraBackground className="w-[120%] h-[120%] opacity-20 blur-3xl" />
                            </div>
                            <div className="relative z-10">
                                <h2 className="text-xl font-semibold mb-6">Order Summary</h2>

                                <div className="space-y-6">
                                    <div className="flex items-start space-x-4">
                                        <div className="w-12 h-12 rounded-full border border-gray-600/70 flex items-center justify-center flex-shrink-0">
                                            <User className="w-6 h-6 text-purple-300" />
                                        </div>
                                        <div>
                                            <div className="text-sm text-gray-400 mb-1">Customer Name</div>
                                            <div className="font-semibold text-white">{user.displayName}</div>
                                        </div>
                                    </div>

                                    <div className="flex items-start space-x-4">
                                        <div className="w-12 h-12 rounded-full border border-gray-600/70 flex items-center justify-center flex-shrink-0">
                                            <CreditCard className="w-6 h-6 text-purple-300" />
                                        </div>
                                        <div>
                                            <div className="text-sm text-gray-400 mb-1">Plan</div>
                                            <div className="font-semibold text-white">Semester Access</div>
                                        </div>
                                    </div>

                                    <div className="border-t border-gray-800/50 pt-6">
                                        <div className="flex justify-between items-center">
                                            <span className="text-lg font-semibold">Total Amount</span>
                                            <div className="flex items-center text-2xl font-bold">
                                                <IndianRupee className="w-6 h-6" />
                                                <span>499</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Upload Screenshot */}
                        <div className="bg-gray-900/60 rounded-xl p-5 sm:p-5 border border-gray-800/50 backdrop-blur-md">
                            <h2 className="text-xl font-semibold mb-3">Upload Payment Screenshot</h2>

                            <div className="space-y-4">
                                <div className="border-2 border-dashed border-gray-600/50 rounded-xl p-4 text-center bg-gray-800/20">
                                    {!uploadedImage ? (
                                        <div>
                                            <div className="w-10 h-10 rounded-full border border-gray-600/70 flex items-center justify-center mx-auto mb-3">
                                                <Upload className="w-6 h-6 text-gray-400" />
                                            </div>
                                            <label className="inline-block bg-gradient-to-r from-blue-500 to-purple-600 text-white font-semibold py-2 px-6 rounded-lg cursor-pointer hover:opacity-90 transition-opacity">
                                                Choose File
                                                <input
                                                    type="file"
                                                    accept="image/*"
                                                    onChange={handleImageUpload}
                                                    className="hidden"
                                                />
                                            </label>
                                        </div>
                                    ) : (
                                        <div className="text-center">
                                            <div className="w-12 h-12 rounded-full border border-green-500/70 flex items-center justify-center mx-auto mb-3 bg-green-900/30">
                                                <CheckCircle className="w-6 h-6 text-green-400" />
                                            </div>
                                            <p className="text-green-400 font-semibold mb-1">{uploadedImage.name}</p>
                                            <p className="text-gray-400 text-sm">Screenshot uploaded successfully</p>
                                        </div>
                                    )}
                                </div>

                                {isUploading && (
                                    <div className="bg-blue-900/30 border border-blue-500/30 rounded-lg p-4">
                                        <div className="flex items-center space-x-3">
                                            <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-blue-400"></div>
                                            <span className="text-blue-300">Uploading screenshot...</span>
                                        </div>
                                    </div>
                                )}

                                {uploadSuccess && (
                                    <div className="bg-green-900/30 border border-green-500/30 rounded-lg p-4">
                                        <div className="flex items-center space-x-3">
                                            <CheckCircle className="w-5 h-5 text-green-400" />
                                            <span className="text-green-300">Screenshot uploaded successfully!</span>
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>

                    {/* Right Column - QR Code Section */}
                    <div className="lg:sticky lg:top-8 h-fit space-y-6">
                        <div className="relative bg-gray-900/60 rounded-xl p-6 sm:p-8 border border-gray-800/50 backdrop-blur-md overflow-hidden">
                            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                                <AuroraBackground className="w-[120%] h-[120%] opacity-20 blur-3xl" />
                            </div>

                            <div className="relative z-10 text-center space-y-6">
                                {/* Title with Icon in one line */}
                                <div className="flex items-center justify-center space-x-3">
                                    <div className="w-12 h-12 rounded-full border border-gray-600/70 flex items-center justify-center">
                                        <QrCode className="w-6 h-6 text-purple-300" />
                                    </div>
                                    <h2 className="text-2xl font-bold">Scan & Pay</h2>
                                </div>

                                {/* QR Code */}
                                <div className="bg-white rounded-xl mx-auto max-w-[200px]">
                                    <div className="aspect-square bg-black rounded-lg flex items-center justify-center">
                                        <img
                                            src={qrImage}
                                            alt="QR Code"
                                            className="w-full h-full object-contain"
                                        />
                                    </div>
                                </div>

                                {/* UPI + Amount */}
                                <div className="space-y-4">
                                    <div className="bg-gray-800/50 rounded-xl p-4 border border-gray-700/30">
                                        <div className="text-sm text-gray-400">Amount to Pay</div>
                                        <div className="text-3xl font-bold flex items-center justify-center">
                                            <IndianRupee className="w-6 h-6" />
                                            <span>499</span>
                                        </div>
                                    </div>
                                </div>

                                {/* Compact Instructions inside same div */}
                                <div className="text-xs text-gray-400 leading-relaxed mt-6">
                                    1. Scan the QR code with any UPI app. <br />
                                    2. Pay ₹499 and take a screenshot. <br />
                                    3. Upload the screenshot above - your plan activates within 2-3 days.
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Submit Button - Now separated and below all divs */}
                    <div className="lg:col-span-2 flex justify-center mt-1 py-2">
                        <button
                            onClick={handleSubmit}
                            disabled={!uploadedImage || !imageUrl || isUploading || isSubmitting}
                            className={`w-full lg:w-auto font-semibold py-4 px-8 rounded-lg text-lg uppercase tracking-wide transition-all duration-200 
                                ${(!uploadedImage || !imageUrl || isUploading || isSubmitting)
                                    ? 'bg-gradient-to-r from-blue-500 to-purple-600 text-white cursor-not-allowed opacity-50'
                                    : 'bg-gradient-to-r from-blue-500 to-purple-600 text-white hover:opacity-90'
                                }`}
                        >
                            {isSubmitting ? (
                                <div className="flex items-center justify-center space-x-2">
                                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                                    <span>Submitting...</span>
                                </div>
                            ) : isUploading ? (
                                'Uploading Image...'
                            ) : (!uploadedImage || !imageUrl) ? (
                                'Upload Screenshot'
                            ) : (
                                'Submit Payment Verification'
                            )}
                        </button>
                    </div>
                </div>
            </div>

            {/* Success Modal */}
            <SuccessModal
                isOpen={showSuccessModal}
                onClose={handleCloseModal}
            />
        </div>
    );
};

export default MakePayment;