import React, { useState } from 'react';
import { ChevronRight, ChevronDown, FileText } from 'lucide-react';
import { useNavigate, Link } from 'react-router-dom';
import { INSTAGRAM_LINK, WHATSAPP_LINK } from '../../config';

const FAQ = () => {
    const [expandedId, setExpandedId] = useState(0);
    const navigate = useNavigate();

    const faqData = [
        {
            id: 0,
            question: "How does Codex help me learn coding step by step?",
            answer:
                "Codex follows a structured approach:\n\nFirst, you learn the fundamentals of programming.\n\nThen, you solve small practice problems to apply those concepts.\n\nAfter that, you gradually move into Data Structures and Algorithms (DSA).\n\nThis way, you never feel lost, and every concept is backed by practice."
        },
        {
            id: 1,
            question: "What is DSA and why is it important?",
            answer:
                "DSA stands for Data Structures and Algorithms. In simple words, it’s about how data is stored and how problems are solved efficiently. It’s important because almost every company tests these skills in coding interviews. More than that, it improves your logical thinking and problem-solving ability, which is useful in academics, projects, and your career."
        },
        {
            id: 2,
            question: "Do I need prior coding knowledge to join?",
            answer:
                "Not at all. Codex is built for beginners. Even if you've never coded before, the platform starts with the basics like variables, loops, and arrays, and slowly takes you toward advanced topics. You just need curiosity and consistency."
        },
        {
            id: 3,
            question: "Why does Codex focus only on C programming right now?",
            answer:
                "C programming is part of your academic syllabus. By learning C with Codex, you not only understand programming fundamentals but also strengthen your concepts for exams. Once you’re confident in C, you’ll be ready to explore other languages and Data Structures."
        },
        {
            id: 4,
            question: "Will Codex help me in academics as well as placements?",
            answer:
                "Yes. Right now, Codex focuses on C programming to strengthen your academics and help you score better in exams. Later, we’ll also guide you in DSA and interview-style questions to prepare for placements."
        },
        {
            id: 5,
            question: "Are the problems similar to real coding interviews?",
            answer:
                "In the beginning, problems are designed to match your academics. Later, Codex gradually introduces interview-style problems inspired by real placements."
        },
        {
            id: 6,
            question: "Can I compete with my peers on Codex?",
            answer:
                "Yes! Codex lets you join coding contests and compare your progress with other students in your college. Since your real competition in placements is your classmates, Codex helps you prepare and improve together."
        },
        {
            id: 7,
            question: "Does Codex have a community for learners?",
            answer:
                "Absolutely. Codex is building a strong student community where you can share knowledge, learn together, and support each other. The idea is to grow as a team while still pushing yourself to do better than your peers."
        }
    ];


    const toggleItem = (id) => {
        setExpandedId((prev) => (prev === id ? null : id));
    };

    return (

        <div className=" bg-black text-white space-y-6">
            <div className="bg-gradient-to-r from-purple-800 to-purple-900 rounded-2xl p-4 sm:px-6 text-white flex items-start justify-between">
                {/* Left side: Title + Subtitle */}
                <div>
                    <h1 className="text-2xl sm:text-3xl font-bold mb-2">Frequently Asked Questions</h1>
                    <p className="text-purple-100 text-base sm:text-lg">Get your all doubts cleared</p>
                </div>

                {/* Right side: Terms & Conditions link */}
                <Link
                    to="/faq/terms"
                    className="text-purple-200 hover:text-white text-sm sm:text-base font-medium transition-colors flex items-center gap-1"
                ><FileText className="w-5 h-5" />
                    Terms & Conditions
                </Link>
            </div>

            <>


                {/* FAQ Items */}
                <div className="space-y-0">
                    {faqData.map((item, index) => (
                        <div key={item.id} className="border-b border-gray-700">
                            <button
                                onClick={() => toggleItem(item.id)}
                                className="w-full rounded-sm py-5 px-3 text-left flex items-center justify-between hover:bg-gray-900 transition-colors duration-200"
                            >
                                <span className="text-base md:text-lg font-medium">{item.question}</span>
                                <span className="text-xl ml-4">
                                    {expandedId === item.id ? <ChevronDown className="w-5 h-5" /> : <ChevronRight className="w-5 h-5" />}
                                </span>

                            </button>

                            {expandedId === item.id && (
                                <div className="pb-6">
                                    <div className="border-b border-gray-700 mb-4"></div>
                                    <p className="text-base md:text-lg text-gray-300 leading-relaxed px-3">
                                        {item.answer}
                                    </p>
                                </div>
                            )}
                        </div>
                    ))}
                </div>
                {/* Call-to-Action Cards */}
                <div className="flex flex-col sm:flex-row gap-6 justify-center items-center mt-10">
                    {/* WhatsApp Community */}
                    <a
                        href={WHATSAPP_LINK} 
                        target="_blank"
                        rel="noopener noreferrer"
                        className="relative rounded-xl p-6 text-center transition-all duration-300 overflow-hidden group flex-shrink-0 w-64 h-40"
                    >
                        {/* Gradient border */}
                        <div className="absolute inset-0 rounded-xl border-2 border-transparent bg-clip-padding transition-colors duration-300 group-hover:border-transparent z-10" />
                        <div className="absolute inset-0 bg-gradient-to-r from-green-400 via-green-500 to-green-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-xl z-0" />
                        <div className="absolute inset-0.5 bg-neutral-900 rounded-lg z-10" />

                        {/* Content */}
                        <div className="relative z-20 h-full flex flex-col justify-center">
                            <h3 className="font-semibold text-white text-xl mb-2">Join Our Community</h3>
                            <p className="text-neutral-400 text-sm mb-4">Connect with peers on WhatsApp</p>
                            <span className="text-green-400 font-medium">Join Now →</span>
                        </div>
                    </a>

                    {/* Instagram Handle */}
                    <a
                        href={INSTAGRAM_LINK}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="relative rounded-xl p-6 text-center transition-all duration-300 overflow-hidden group flex-shrink-0 w-64 h-40"
                    >
                        {/* Gradient border */}
                        <div className="absolute inset-0 rounded-xl border-2 border-transparent bg-clip-padding transition-colors duration-300 group-hover:border-transparent z-10" />
                        <div className="absolute inset-0 bg-gradient-to-r from-pink-500 via-purple-500 to-yellow-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-xl z-0" />
                        <div className="absolute inset-0.5 bg-neutral-900 rounded-lg z-10" />

                        {/* Content */}
                        <div className="relative z-20 h-full flex flex-col justify-center">
                            <h3 className="font-semibold text-white text-xl mb-2">Follow Us</h3>
                            <p className="text-neutral-400 text-sm mb-4">Stay updated on Instagram</p>
                            <span className="text-pink-400 font-medium">Follow →</span>
                        </div>
                    </a>
                </div>

            </>
        </div>
    );
};

export default FAQ;
