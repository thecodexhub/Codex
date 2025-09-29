import React, { useState, useRef, useCallback } from 'react';
import {
    Play,
    Send,
    Clock,
    Users,
    Trophy,
    CheckCircle2,
    XCircle,
    ArrowLeft,
    Settings,
    Maximize2,
    Copy,
    RotateCcw,
    ChevronLeft,
    ChevronRight,
    GripVertical
} from 'lucide-react';

const ProblemDisplay = () => {
    const [code, setCode] = useState(`def solution(nums, target):
    # Write your solution here
    pass

# Test case
nums = [2, 7, 11, 15]
target = 9
print(solution(nums, target))`);

    const [language, setLanguage] = useState('python');
    const [isRunning, setIsRunning] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [terminalOutput, setTerminalOutput] = useState('');
    const [activeTab, setActiveTab] = useState('description');
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [leftWidth, setLeftWidth] = useState(50); // Percentage of elft
    const [terminalHeight, setTerminalHeight] = useState(30); // Percentage of right panel

    const isDragging = useRef(false);
    const isResizingTerminal = useRef(false);

    // Sample questions array
    const questions = [
        {
            id: 1,
            title: "Two Sum",
            difficulty: "Easy",
            tags: ["Array", "Hash Table"],
            status: "solved", // solved, attempted, unsolved
            description: `Given an array of integers nums and an integer target, return indices of the two numbers such that they add up to target.

You may assume that each input would have exactly one solution, and you may not use the same element twice.

You can return the answer in any order.`,
            examples: [
                {
                    input: "nums = [2,7,11,15], target = 9",
                    output: "[0,1]",
                    explanation: "Because nums[0] + nums[1] == 9, we return [0, 1]."
                },
                {
                    input: "nums = [3,2,4], target = 6",
                    output: "[1,2]",
                    explanation: "Because nums[1] + nums[2] == 6, we return [1, 2]."
                }
            ],
            constraints: [
                "2 ≤ nums.length ≤ 10⁴",
                "-10⁹ ≤ nums[i] ≤ 10⁹",
                "-10⁹ ≤ target ≤ 10⁹",
                "Only one valid answer exists."
            ]
        },
        {
            id: 2,
            title: "Add Two Numbers",
            difficulty: "Medium",
            tags: ["Linked List", "Math", "Recursion"],
            status: "attempted",
            description: `You are given two non-empty linked lists representing two non-negative integers. The digits are stored in reverse order, and each of their nodes contains a single digit. Add the two numbers and return the sum as a linked list.

You may assume the two numbers do not contain any leading zero, except the number 0 itself.`,
            examples: [
                {
                    input: "l1 = [2,4,3], l2 = [5,6,4]",
                    output: "[7,0,8]",
                    explanation: "342 + 465 = 807."
                }
            ],
            constraints: [
                "The number of nodes in each linked list is in the range [1, 100].",
                "0 ≤ Node.val ≤ 9",
                "It is guaranteed that the list represents a number that does not have leading zeros."
            ]
        },
        {
            id: 3,
            title: "Longest Substring Without Repeating Characters",
            difficulty: "Medium",
            tags: ["Hash Table", "String", "Sliding Window"],
            status: "unsolved",
            description: `Given a string s, find the length of the longest substring without repeating characters.`,
            examples: [
                {
                    input: 's = "abcabcbb"',
                    output: "3",
                    explanation: 'The answer is "abc", with the length of 3.'
                },
                {
                    input: 's = "bbbbb"',
                    output: "1",
                    explanation: 'The answer is "b", with the length of 1.'
                }
            ],
            constraints: [
                "0 ≤ s.length ≤ 5 * 10⁴",
                "s consists of English letters, digits, symbols and spaces."
            ]
        },
        {
            id: 4,
            title: "Median of Two Sorted Arrays",
            difficulty: "Hard",
            tags: ["Array", "Binary Search", "Divide and Conquer"],
            status: "unsolved",
            description: `Given two sorted arrays nums1 and nums2 of size m and n respectively, return the median of the two sorted arrays.

The overall run time complexity should be O(log (m+n)).`,
            examples: [
                {
                    input: "nums1 = [1,3], nums2 = [2]",
                    output: "2.00000",
                    explanation: "merged array = [1,2,3] and median is 2."
                }
            ],
            constraints: [
                "nums1.length == m",
                "nums2.length == n",
                "0 ≤ m ≤ 1000",
                "0 ≤ n ≤ 1000",
                "1 ≤ m + n ≤ 2000"
            ]
        }
    ];

    const currentQuestion = questions[currentQuestionIndex];

    const handleRun = () => {
        setIsRunning(true);
        setTerminalOutput('Running code...\n');

        setTimeout(() => {
            setTerminalOutput(prev => prev + '[2, 7]\nExecution completed in 0.1s\n');
            setIsRunning(false);
        }, 1500);
    };

    const handleSubmit = () => {
        setIsSubmitting(true);
        setTerminalOutput('Submitting solution...\n');

        setTimeout(() => {
            setTerminalOutput(prev => prev + 'Test case 1: ✓ Passed\nTest case 2: ✓ Passed\nTest case 3: ✓ Passed\n\nAll test cases passed! Solution accepted.\n');
            setIsSubmitting(false);
        }, 2000);
    };

    const handlePreviousQuestion = () => {
        if (currentQuestionIndex > 0) {
            setCurrentQuestionIndex(currentQuestionIndex - 1);
            setTerminalOutput('');
        }
    };

    const handleNextQuestion = () => {
        if (currentQuestionIndex < questions.length - 1) {
            setCurrentQuestionIndex(currentQuestionIndex + 1);
            setTerminalOutput('');
        }
    };

    // Handle horizontal resize
    const handleMouseDown = useCallback((e) => {
        isDragging.current = true;
        document.addEventListener('mousemove', handleMouseMove);
        document.addEventListener('mouseup', handleMouseUp);
        e.preventDefault();
    }, []);

    const handleMouseMove = useCallback((e) => {
        if (!isDragging.current && !isResizingTerminal.current) return;

        if (isDragging.current) {
            const containerWidth = window.innerWidth;
            const newLeftWidth = (e.clientX / containerWidth) * 100;
            setLeftWidth(Math.min(Math.max(newLeftWidth, 20), 80));
        }

        if (isResizingTerminal.current) {
            const rightPanel = document.querySelector('.right-panel');
            if (rightPanel) {
                const rect = rightPanel.getBoundingClientRect();
                const relativeY = e.clientY - rect.top;
                const newTerminalHeight = ((rect.height - relativeY) / rect.height) * 100;
                setTerminalHeight(Math.min(Math.max(newTerminalHeight, 20), 70));
            }
        }
    }, []);

    const handleMouseUp = useCallback(() => {
        isDragging.current = false;
        isResizingTerminal.current = false;
        document.removeEventListener('mousemove', handleMouseMove);
        document.removeEventListener('mouseup', handleMouseUp);
    }, [handleMouseMove]);

    // Handle terminal resize
    const handleTerminalMouseDown = useCallback((e) => {
        isResizingTerminal.current = true;
        document.addEventListener('mousemove', handleMouseMove);
        document.addEventListener('mouseup', handleMouseUp);
        e.preventDefault();
    }, [handleMouseMove, handleMouseUp]);

    const getStatusColor = (status) => {
        switch (status) {
            case 'solved': return 'text-green-400';
            case 'attempted': return 'text-yellow-400';
            default: return 'text-gray-400';
        }
    };

    const getStatusIcon = (status) => {
        switch (status) {
            case 'solved': return <CheckCircle2 className="w-4 h-4" />;
            case 'attempted': return <XCircle className="w-4 h-4" />;
            default: return <div className="w-4 h-4 border border-gray-500 rounded-full" />;
        }
    };

    return (
        <div className="w-full h-screen bg-gray-950 flex flex-col">
            {/* Header */}
            <div className="bg-gray-900 border-b border-gray-800 px-6 py-4 flex items-center justify-between flex-shrink-0">
                <div className="flex items-center gap-4">
                    <button
                        onClick={() => console.log('Navigate to contests')}
                        className="flex items-center gap-2 text-gray-400 hover:text-gray-200 transition-colors"
                    >
                        <ArrowLeft className="w-4 h-4" />
                        Back to Contests
                    </button>
                </div>

                <div className="flex items-center gap-3">
                    <div className="flex items-center gap-2 text-gray-400 text-sm">
                        <Clock className="w-4 h-4" />
                        00:00:00
                    </div>
                    <div className="flex items-center gap-2 text-gray-400 text-sm">
                        <Users className="w-4 h-4" />
                        0 solved
                    </div>
                </div>
            </div>

            {/* Main Content */}
            <div className="flex-1 flex min-h-0 overflow-hidden">
                {/* Left Panel - Problem Description */}
                <div
                    className="bg-gray-900 border-r border-gray-800 flex flex-col min-h-0"
                    style={{ width: `${leftWidth}%` }}
                >
                    {/* Question Navigation*/}
                    <div className="flex items-center gap-3 p-4 border-b border-gray-800 flex-shrink-0">
                        <button
                            onClick={handlePreviousQuestion}
                            disabled={currentQuestionIndex === 0}
                            className="p-1 text-gray-400 hover:text-gray-200 disabled:text-gray-600 disabled:cursor-not-allowed transition-colors"
                        >
                            <ChevronLeft className="w-4 h-4" />
                        </button>

                        <div className="flex items-center gap-2">
                            <span className={`${getStatusColor(currentQuestion.status)}`}>
                                {getStatusIcon(currentQuestion.status)}
                            </span>
                            <h1 className="text-lg font-semibold text-gray-100">
                                {currentQuestionIndex + 1}. {currentQuestion.title}
                            </h1>
                            <span className={`px-2 py-1 rounded-full text-xs font-medium ${currentQuestion.difficulty === 'Easy' ? 'bg-green-800/30 text-green-400' :
                                currentQuestion.difficulty === 'Medium' ? 'bg-yellow-800/30 text-yellow-400' :
                                    'bg-red-800/30 text-red-400'
                                }`}>
                                {currentQuestion.difficulty}
                            </span>
                        </div>

                        <button
                            onClick={handleNextQuestion}
                            disabled={currentQuestionIndex === questions.length - 1}
                            className="p-1 text-gray-400 hover:text-gray-200 disabled:text-gray-600 disabled:cursor-not-allowed transition-colors"
                        >
                            <ChevronRight className="w-4 h-4" />
                        </button>

                        <span className="text-gray-500 text-sm">
                            ({currentQuestionIndex + 1} of {questions.length})
                        </span>
                    </div>

                    {/* Tabs*/}
                    <div className="border-b border-gray-800 flex-shrink-0 px-4">
                        <div className="flex gap-6">
                            <button
                                onClick={() => setActiveTab('description')}
                                className={`py-3 text-sm font-medium border-b-2 transition-colors ${activeTab === 'description'
                                    ? 'border-purple-600 text-purple-400'
                                    : 'border-transparent text-gray-400 hover:text-gray-200'
                                    }`}
                            >
                                Description
                            </button>
                            <button
                                onClick={() => setActiveTab('submissions')}
                                className={`py-3 text-sm font-medium border-b-2 transition-colors ${activeTab === 'submissions'
                                    ? 'border-purple-600 text-purple-400'
                                    : 'border-transparent text-gray-400 hover:text-gray-200'
                                    }`}
                            >
                                Submissions
                            </button>
                        </div>
                    </div>

                    {/* Problem Content*/}
                    <div className="flex-1 overflow-y-auto p-4 min-h-0">
                        {activeTab === 'description' && (
                            <div className="space-y-6">
                                <div className="flex flex-wrap gap-2">
                                    {currentQuestion.tags.map((tag) => (
                                        <span key={tag} className="px-2 py-1 bg-gray-800 text-gray-300 rounded text-xs">
                                            {tag}
                                        </span>
                                    ))}
                                </div>

                                {/* Description */}
                                <div>
                                    <p className="text-gray-300 leading-relaxed whitespace-pre-line">
                                        {currentQuestion.description}
                                    </p>
                                </div>

                                {/* Examples */}
                                <div className="space-y-4">
                                    {currentQuestion.examples.map((example, index) => (
                                        <div key={index} className="bg-gray-800 border border-gray-700 rounded-lg p-4">
                                            <h4 className="text-gray-100 font-semibold mb-3">Example {index + 1}:</h4>
                                            <div className="space-y-2 text-sm">
                                                <div>
                                                    <span className="text-gray-400">Input: </span>
                                                    <code className="text-gray-200 bg-gray-700 px-2 py-1 rounded">{example.input}</code>
                                                </div>
                                                <div>
                                                    <span className="text-gray-400">Output: </span>
                                                    <code className="text-gray-200 bg-gray-700 px-2 py-1 rounded">{example.output}</code>
                                                </div>
                                                <div>
                                                    <span className="text-gray-400">Explanation: </span>
                                                    <span className="text-gray-300">{example.explanation}</span>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>

                                {/* Constraints */}
                                <div className="bg-gray-800 border border-gray-700 rounded-lg p-4">
                                    <h4 className="text-gray-100 font-semibold mb-3">Constraints:</h4>
                                    <ul className="space-y-1 text-sm text-gray-300">
                                        {currentQuestion.constraints.map((constraint, index) => (
                                            <li key={index} className="flex items-start gap-2">
                                                <span className="text-gray-500 mt-1">•</span>
                                                <code className="text-gray-200">{constraint}</code>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            </div>
                        )}

                        {activeTab === 'editorial' && (
                            <div className="text-center py-12">
                                <Trophy className="w-12 h-12 text-gray-600 mx-auto mb-4" />
                                <p className="text-gray-400">Editorial will be available after the contest ends</p>
                            </div>
                        )}

                        {activeTab === 'submissions' && (
                            <div className="space-y-3">
                                <div className="flex items-center justify-between bg-gray-800 border border-gray-700 rounded-lg p-4">
                                    <div className="flex items-center gap-3">
                                        <CheckCircle2 className="w-5 h-5 text-green-400" />
                                        <div>
                                            <div className="text-gray-200 font-medium">Accepted</div>
                                            <div className="text-xs text-gray-400">2 minutes ago</div>
                                        </div>
                                    </div>
                                    <div className="text-right">
                                        <div className="text-gray-200">Runtime: 68ms</div>
                                        <div className="text-xs text-gray-400">Memory: 16.2MB</div>
                                    </div>
                                </div>

                                <div className="flex items-center justify-between bg-gray-800 border border-gray-700 rounded-lg p-4">
                                    <div className="flex items-center gap-3">
                                        <XCircle className="w-5 h-5 text-red-400" />
                                        <div>
                                            <div className="text-gray-200 font-medium">Wrong Answer</div>
                                            <div className="text-xs text-gray-400">5 minutes ago</div>
                                        </div>
                                    </div>
                                    <div className="text-right">
                                        <div className="text-gray-200">Test case 3/10</div>
                                        <div className="text-xs text-gray-400">Time Limit Exceeded</div>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                </div>

                <div
                    className="w-1 bg-gray-800 hover:bg-gray-700 cursor-col-resize flex items-center justify-center group"
                    onMouseDown={handleMouseDown}
                >
                    <GripVertical className="w-3 h-3 text-gray-600 group-hover:text-gray-400" />
                </div>

                {/* Right Panel - Code Editor */}
                <div
                    className="bg-gray-900 flex flex-col min-h-0 right-panel"
                    style={{ width: `${100 - leftWidth}%` }}
                >
                    {/* Editor Header */}
                    <div className="bg-gray-800 border-b border-gray-700 px-4 py-3 flex items-center justify-between flex-shrink-0">
                        <div className="flex items-center gap-4">
                            <select
                                value={language}
                                onChange={(e) => setLanguage(e.target.value)}
                                className="bg-gray-700 border border-gray-600 text-gray-200 rounded px-3 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-purple-500"
                            >
                                <option value="python">Python</option>
                                <option value="javascript">JavaScript</option>
                                <option value="java">Java</option>
                                <option value="cpp">C++</option>
                            </select>

                            <button className="flex items-center gap-2 text-gray-400 hover:text-gray-200 text-sm transition-colors">
                                <Settings className="w-4 h-4" />
                                Settings
                            </button>
                        </div>

                        <div className="flex items-center gap-2">
                            <button
                                onClick={() => setCode('')}
                                className="flex items-center gap-2 text-gray-400 hover:text-gray-200 text-sm transition-colors"
                            >
                                <RotateCcw className="w-4 h-4" />
                                Reset
                            </button>

                            <button className="flex items-center gap-2 text-gray-400 hover:text-gray-200 text-sm transition-colors">
                                <Maximize2 className="w-4 h-4" />
                            </button>
                        </div>
                    </div>

                    <div className="bg-gray-800 border-b border-gray-700 px-4 py-2 flex items-center justify-between flex-shrink-0">
                        <div className="flex gap-3">
                            <button
                                onClick={handleRun}
                                disabled={isRunning}
                                className="flex items-center gap-2 px-4 py-2 bg-green-700 hover:bg-green-600 disabled:bg-green-800 text-white rounded-lg text-sm font-medium transition-colors"
                            >
                                <Play className="w-4 h-4" />
                                {isRunning ? 'Running...' : 'Run Code'}
                            </button>

                            <button
                                onClick={handleSubmit}
                                disabled={isSubmitting}
                                className="flex items-center gap-2 px-4 py-2 bg-purple-700 hover:bg-purple-600 disabled:bg-purple-800 text-white rounded-lg text-sm font-medium transition-colors"
                            >
                                <Send className="w-4 h-4" />
                                {isSubmitting ? 'Submitting...' : 'Submit'}
                            </button>
                        </div>
                    </div>

                    {/* Code Editor*/}
                    <div
                        className="flex-1 min-h-0"
                        style={{ height: `${100 - terminalHeight}%` }}
                    >
                        <textarea
                            value={code}
                            onChange={(e) => setCode(e.target.value)}
                            className="w-full h-full bg-gray-900 text-gray-100 font-mono text-sm p-4 resize-none focus:outline-none border-none overflow-auto"
                            style={{
                                lineHeight: '1.5',
                                tabSize: '4'
                            }}
                            placeholder="Write your solution here..."
                            spellCheck={false}
                        />
                    </div>

                    {/* Terminal Resize */}
                    <div
                        className="h-1 bg-gray-800 hover:bg-gray-700 cursor-row-resize flex items-center justify-center group"
                        onMouseDown={handleTerminalMouseDown}
                    >
                        <div className="w-8 h-0.5 bg-gray-600 group-hover:bg-gray-400 rounded"></div>
                    </div>

                    {/* Terminal*/}
                    <div
                        className="bg-gray-950 border-t border-gray-700 flex flex-col min-h-0"
                        style={{ height: `${terminalHeight}%` }}
                    >
                        <div className="bg-gray-800 px-4 py-2 border-b border-gray-700 flex-shrink-0">
                            <div className="flex items-center justify-between">
                                <h3 className="text-sm font-medium text-gray-200">Console</h3>
                                <button
                                    onClick={() => setTerminalOutput('')}
                                    className="text-gray-400 hover:text-gray-200 text-sm"
                                >
                                    Clear
                                </button>
                            </div>
                        </div>
                        <div className="flex-1 p-4 overflow-y-auto min-h-0">
                            <pre className="text-gray-300 font-mono text-sm whitespace-pre-wrap">
                                {terminalOutput || 'Click "Run Code" to see output here...'}
                            </pre>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProblemDisplay;