import React from 'react';
import { Link ***REMOVED*** from 'react-router-dom';
import { User ***REMOVED*** from 'lucide-react';

function UserMenu({ userRole, showUserMenu, setShowUserMenu, handleLogout ***REMOVED***) {
  return (
    <div className="relative">
      <button
        onClick={() => setShowUserMenu(!showUserMenu)***REMOVED***
        className="flex items-center space-x-2 px-4 py-2 rounded bg-[#798478] hover:bg-[#a0a083] transition-colors"
      >
        <User className="h-5 w-5" />
        <span>Account</span>
      </button>
      
      {showUserMenu && (
        <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-10">
          <Link
            to={userRole === 'admin' ? "/admin" : "/user/dashboard"***REMOVED***
            className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
            onClick={() => setShowUserMenu(false)***REMOVED***
          >
            Dashboard
          </Link>
          {userRole === 'user' && (
            <Link
              to="/user/profile"
              className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
              onClick={() => setShowUserMenu(false)***REMOVED***
            >
              Profile Settings
            </Link>
          )***REMOVED***
          <button
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              console.log('Logout button clicked');
              handleLogout();
            ***REMOVED******REMOVED***
            className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
          >
            Logout
          </button>
        </div>
      )***REMOVED***
    </div>
  );
***REMOVED***

export default UserMenu; 