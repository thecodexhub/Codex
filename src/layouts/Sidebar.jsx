import React from 'react';
import {
  LayoutDashboard,
  Code2,
  Target,
  Briefcase,
  Trophy,
  MessageSquare,
  CreditCard,
  ChevronRight,
  LogOut,
  X
} from 'lucide-react';

const Sidebar = ({ activeTab, setActiveTab, isOpen, onClose }) => {
  const menuItems = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'dsa', label: 'DSA', icon: Code2 },
    { id: 'specialization', label: 'Specialization Path', icon: Target },
    { id: 'placement', label: 'Placement Prep', icon: Briefcase },
    { id: 'leaderboard', label: 'Leaderboard', icon: Trophy },
    { id: 'feedback', label: 'Feedback', icon: MessageSquare },
    { id: 'pricing', label: 'Pricing', icon: CreditCard },
  ];

  const handleItemClick = (itemId) => {
    setActiveTab(itemId);
    onClose(); // Close sidebar on mobile after selection
  };

  return (
    <div className={`
      fixed lg:static inset-y-0 left-0 z-50 w-72 bg-gray-900 border-r border-gray-800 flex flex-col
      transform transition-transform duration-300 ease-in-out lg:transform-none
      ${isOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
    `}>
      {/* Logo Section */}
      <div className="px-6 py-4 border-b border-gray-800">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <h1 className="text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-blue-400">
              CODEX
            </h1>
          </div>
          {/* Close button for mobile */}
          <button
            onClick={onClose}
            className="lg:hidden p-2 text-gray-400 hover:text-gray-200 hover:bg-gray-800 rounded-lg transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-4 space-y-2 overflow-y-auto">
        {menuItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeTab === item.id;
          
          return (
            <button
              key={item.id}
              onClick={() => handleItemClick(item.id)}
              className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors ${
                isActive
                  ? 'bg-purple-600 text-white shadow-lg'
                  : 'text-gray-300 hover:bg-gray-800 hover:text-white'
              }`}
            >
              <Icon className="w-5 h-5 flex-shrink-0" />
              <span className="font-medium truncate flex-1 text-left">{item.label}</span>
              {isActive && <ChevronRight className="w-4 h-4 flex-shrink-0" />}
            </button>
          );
        })}
      </nav>

      {/* User Profile Section */}
      <div className="p-4 border-t border-gray-800 space-y-3">
        <div className="flex items-center space-x-3 p-3 rounded-lg bg-gray-800">
          <div className="w-8 h-8 bg-purple-600 rounded-full flex items-center justify-center">
            <Code2 className="w-4 h-4 text-white" />
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-white text-sm font-medium truncate">User</p>
            <p className="text-gray-400 text-xs truncate">Premium Member</p>
          </div>
        </div>

        {/* Logout Button */}
        <button className="w-full flex items-center space-x-3 px-4 py-3 rounded-lg text-red-400 hover:bg-red-900/20 hover:text-red-300 transition-colors">
          <LogOut className="w-5 h-5 flex-shrink-0" />
          <span className="font-medium truncate">Logout</span>
        </button>
      </div>
    </div>
  );
};

export default Sidebar;