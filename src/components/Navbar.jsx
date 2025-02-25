import React, { useEffect, useState ***REMOVED*** from 'react';
import { Link ***REMOVED*** from 'react-router-dom';
import { Briefcase ***REMOVED*** from 'lucide-react';
import { supabase ***REMOVED*** from '../lib/supabase';

function Navbar() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const fetchUser = async () => {
      const { data: { user ***REMOVED*** ***REMOVED*** = await supabase.auth.getUser();
      setUser(user);
    ***REMOVED***;

    fetchUser();
  ***REMOVED***, []);

  const handleLogout = async () => {
    try {
      const { error ***REMOVED*** = await supabase.auth.signOut();
      if (error) throw error;
      setUser(null);
      console.log('User logged out successfully');
    ***REMOVED*** catch (error) {
      console.error('Error logging out:', error);
    ***REMOVED***
  ***REMOVED***;

  return (
    <nav className="bg-[#101d42] text-white">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <Link to="/" className="flex items-center space-x-2">
            <Briefcase className="h-8 w-8" />
            <span className="text-xl font-bold">WorkWise</span>
          </Link>
          
          <div className="hidden md:flex space-x-8 text-lg">
            <Link to="/Home" className="hover:text-[#ffdde2]">Jobs</Link>
            <Link to="/about" className="hover:text-[#ffdde2]">About</Link>
            <Link to="/contact" className="hover:text-[#ffdde2]">Contact</Link>
          </div>

          <div className="flex items-center space-x-4">
            {user ? (
              <>
                <Link
                  to="/user/dashboard"
                  className="px-4 py-2 rounded bg-[#798478] hover:bg-[#a0a083] transition-colors"
                >
                  Dashboard
                </Link>
                <button
                  onClick={handleLogout***REMOVED***
                  className="px-4 py-2 rounded bg-[#ffdde2] text-[#101d42] hover:bg-opacity-90 transition-colors"
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link
                  to="/login"
                  className="px-4 py-2 rounded bg-[#798478] hover:bg-[#a0a083] transition-colors"
                >
                  Login
                </Link>
                <Link
                  to="/signup"
                  className="px-4 py-2 rounded bg-[#ffdde2] text-[#101d42] hover:bg-opacity-90 transition-colors"
                >
                  Sign Up
                </Link>
              </>
            )***REMOVED***
          </div>
        </div>
      </div>
    </nav>
  );
***REMOVED***

export default Navbar;