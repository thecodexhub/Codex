import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, Bell, User, Settings, LogOut, Flame, Menu } from 'lucide-react';
<<<<<<< HEAD
import { logout } from '../config';
=======
import { logout } from '../config/firebase';
>>>>>>> main
const Navbar = ({ onMenuClick }) => {
  const [showNotifications, setShowNotifications] = useState(false);
  const [showProfile, setShowProfile] = useState(false);
  const navigate = useNavigate();
  const notifications = [
    { id: 1, message: 'New DSA problem added to Arrays section', time: '2 hours ago', unread: true },
    { id: 2, message: 'Your weekly progress report is ready', time: '1 day ago', unread: true },
    { id: 3, message: 'Congratulations! You solved 50 problems', time: '3 days ago', unread: false },
    { id: 4, message: 'New specialization path available', time: '1 week ago', unread: false },
  ];

  const unreadCount = notifications.filter(n => n.unread).length;
  
  const handleLogout = async() => {
    // localStorage.removeItem("Auth");
    await logout();
    navigate("/login");
  };

  // Close modals when clicking outside
  React.useEffect(() => {
    const handleClickOutside = (event) => {
      if (!event.target.closest('.notification-modal') && !event.target.closest('.notification-button')) {
        setShowNotifications(false);
      }
      if (!event.target.closest('.profile-modal') && !event.target.closest('.profile-button')) {
        setShowProfile(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div className="bg-gray-900 border-b border-gray-800 px-4 sm:px-6 py-4">
      <div className="flex items-center justify-between">
        {/* Mobile Menu Button */}
        <button
          onClick={onMenuClick}
          className="lg:hidden p-2 text-gray-400 hover:text-gray-200 hover:bg-gray-800 rounded-lg transition-colors"
        >
          <Menu className="w-5 h-5" />
        </button>

        {/* Search Bar */}
        <div className="flex-1 max-w-md mx-4 lg:mx-0">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <input
              type="text"
              placeholder="Search problems, topics..."
              className="w-full pl-10 pr-4 py-2 bg-gray-800 text-gray-200 rounded-lg border border-gray-700 focus:border-purple-500 focus:outline-none text-sm sm:text-base"
            />
          </div>
        </div>

        {/* Right Side - Notifications and Profile */}
        <div className="flex items-center space-x-2 sm:space-x-4">
          {/* Streak */}
          <div className="hidden sm:flex items-center space-x-2 px-3 py-2 bg-gray-800 rounded-lg">
            <Flame className="w-4 h-4 text-orange-500" />
            <span className="text-white text-sm font-medium">12</span>
          </div>

          {/* Mobile Streak */}
          <div className="sm:hidden flex items-center space-x-1 px-2 py-1 bg-gray-800 rounded-lg">
            <Flame className="w-4 h-4 text-orange-500" />
            <span className="text-white text-xs font-medium">12</span>
          </div>

          {/* Notifications */}
          <div className="relative">
            <button
              className="notification-button relative p-2 text-gray-400 hover:text-gray-200 hover:bg-gray-800 rounded-lg transition-colors"
              onClick={() => setShowNotifications(!showNotifications)}
            >
              <Bell className="w-5 h-5" />
              {unreadCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                  {unreadCount}
                </span>
              )}
            </button>

            {/* Notifications Modal */}
            {showNotifications && (
              <div className="notification-modal absolute right-0 top-12 w-72 sm:w-80 bg-gray-900 border border-gray-700 rounded-lg shadow-lg z-50">
                <div className="p-4 border-b border-gray-700">
                  <h3 className="text-gray-200 font-semibold">Notifications</h3>
                </div>
                <div className="max-h-64 overflow-y-auto">
                  {notifications.map((notification) => (
                    <div
                      key={notification.id}
                      className={`p-4 border-b border-gray-700 hover:bg-gray-800 ${notification.unread ? 'bg-gray-800' : ''
                        }`}
                    >
                      <p className="text-gray-200 text-sm">{notification.message}</p>
                      <p className="text-gray-400 text-xs mt-1">{notification.time}</p>
                      {notification.unread && (
                        <div className="w-2 h-2 bg-purple-800 rounded-full mt-2"></div>
                      )}
                    </div>
                  ))}
                </div>
                <div className="p-3 border-t border-gray-700">
                  <button className="text-purple-700 text-sm hover:text-purple-300">
                    Mark all as read
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Profile */}
          <div className="relative">
            <button
              className="profile-button flex items-center space-x-1 sm:space-x-2 p-2 text-gray-400 hover:text-gray-200 hover:bg-gray-800 rounded-lg transition-colors"
              onClick={() => setShowProfile(!showProfile)}
            >
              <div className="w-8 h-8 bg-purple-800 rounded-full flex items-center justify-center">
                <User className="w-4 h-4 text-white" />
              </div>
              {/* <span className="hidden sm:block text-gray-200 text-sm">Sobiya</span> */}
            </button>

            {/* Profile Modal */}
            {showProfile && (
              <div className="profile-modal absolute right-0 top-12 w-48 bg-gray-900 border border-gray-700 rounded-lg shadow-lg z-50">
                <div className="p-2">
                  <button className="w-full flex items-center space-x-2 p-2 text-gray-200 hover:bg-gray-800 rounded-lg">
                    <Settings className="w-4 h-4" />
                    <span>Settings</span>
                  </button>
                  <button className="w-full flex items-center space-x-2 p-2 text-gray-200 hover:bg-gray-800 rounded-lg">
                    <User className="w-4 h-4" />
                    <span>Profile</span>
                  </button>
                  <hr className="my-2 border-gray-700" />
                  <button className="w-full flex items-center space-x-2 p-2 text-red-400 hover:bg-gray-800 rounded-lg">
                    <LogOut
                      className="w-4 h-4"
                       />
                    <span onClick={handleLogout}>Logout</span>
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;