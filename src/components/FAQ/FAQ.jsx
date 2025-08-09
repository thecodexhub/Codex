import React, { useState } from 'react';
import { ChevronRight, ChevronDown } from 'lucide-react';

const FAQ = () => {
    const [expandedItems, setExpandedItems] = useState(new Set([0])); // Start with first item expanded

    const faqData = [
        {
            id: 0,
            question: "How do I create an account on Codex?",
            answer: "Creating an account on Codex is simple. Click on the Sign Up button on the homepage, fill in your basic details like name, email, and password, and you’re ready to explore courses, track your progress, and participate in the leaderboard."
        },
        {
            id: 1,
            question: "Can I access the courses after purchase indefinitely?",
            answer: "Yes, once you purchase a course on Codex, you get lifetime access to its content. You can revisit lessons, revise concepts, and practice DSA problems anytime, at your own pace."
        },
        {
            id: 2,
            question: "How is the Leaderboard calculated?",
            answer: "The Leaderboard ranks users based on their activity on the platform — including course progress, quiz performance, DSA problem solving, and daily learning streaks. It encourages healthy competition and motivates consistent learning."
        },
        {
            id: 3,
            question: "What is your refund policy?",
            answer: "We offer a 30-day money-back guarantee. If you're not satisfied with our service within the first 30 days, we'll provide a full refund, no questions asked."
        }
    ];

    const toggleItem = (id) => {
        const newExpandedItems = new Set(expandedItems);
        if (newExpandedItems.has(id)) {
            newExpandedItems.delete(id);
        } else {
            newExpandedItems.add(id);
        }
        setExpandedItems(newExpandedItems);
    };

    return (

        <div className=" bg-black text-white space-y-6">
            {/* Header Section */}
            <div className="bg-gradient-to-r from-purple-800 to-purple-900 rounded-2xl p-4 sm:px-6 text-white">
                <h1 className="text-2xl sm:text-3xl font-bold mb-2">Frequently Asked Questions</h1>
                <p className="text-purple-100 text-base sm:text-lg">Get your all doubts cleared</p>
            </div>
            <div className="max-w-4xl mx-auto">
                

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
                                    {expandedItems.has(item.id) ? <ChevronDown className="w-5 h-5" /> : <ChevronRight className="w-5 h-5" />}
                                </span>

                            </button>

                            {expandedItems.has(item.id) && (
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
            </div>
        </div>
    );
};

export default FAQ;
