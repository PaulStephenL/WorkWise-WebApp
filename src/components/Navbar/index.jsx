import React, { useEffect, useState ***REMOVED*** from 'react';
import { Link ***REMOVED*** from 'react-router-dom';
import { Briefcase ***REMOVED*** from 'lucide-react';
import { supabase ***REMOVED*** from '../../lib/supabase';
import UserMenu from './UserMenu';
import AuthButtons from './AuthButtons';
import NavLinks from './NavLinks';
import { useAuth ***REMOVED*** from '../../hooks/useAuth';

function Navbar() {
  const { user, userRole, loading, logout ***REMOVED*** = useAuth();
  const [showUserMenu, setShowUserMenu] = useState(false);

  // Simple loading view
  if (loading) {
    return (
      <nav className="bg-[#101d42] text-white">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            <Link to="/" className="flex items-center space-x-2">
              <Briefcase className="h-8 w-8" />
              <span className="text-xl font-bold">WorkWise</span>
            </Link>
          </div>
        </div>
      </nav>
    );
  ***REMOVED***

  return (
    <nav className="bg-[#101d42] text-white">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <Link to="/" className="flex items-center space-x-2">
            <Briefcase className="h-8 w-8" />
            <span className="text-xl font-bold">WorkWise</span>
          </Link>
          
          <NavLinks />

          <div className="flex items-center space-x-4">
            {user ? (
              <UserMenu 
                userRole={userRole***REMOVED*** 
                showUserMenu={showUserMenu***REMOVED*** 
                setShowUserMenu={setShowUserMenu***REMOVED*** 
                handleLogout={logout***REMOVED*** 
              />
            ) : (
              <AuthButtons />
            )***REMOVED***
          </div>
        </div>
      </div>
    </nav>
  );
***REMOVED***

export default Navbar; 