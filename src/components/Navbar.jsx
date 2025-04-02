import React, { useEffect, useState ***REMOVED*** from 'react';
import { Link, useNavigate ***REMOVED*** from 'react-router-dom';
import { Briefcase, User ***REMOVED*** from 'lucide-react';
import { supabase ***REMOVED*** from '../lib/supabase';

function Navbar() {
  const [user, setUser] = useState(null);
  const [userRole, setUserRole] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showUserMenu, setShowUserMenu] = useState(false);
  const navigate = useNavigate();
  const isMounted = React.useRef(true);

  // Single useEffect for auth management
  useEffect(() => {
    let authListener = null;
    isMounted.current = true;
    
    async function initializeAuth() {
      try {
        console.log('Initializing auth...');
        setLoading(true);
        
        // Get current session
        const { data: { session ***REMOVED***, error: sessionError ***REMOVED*** = await supabase.auth.getSession();
        
        if (sessionError) {
          console.error('Session error:', sessionError);
          setUser(null);
          setUserRole(null);
          setLoading(false);
          return;
        ***REMOVED***
        
        // Set up auth listener first
        const { data ***REMOVED*** = supabase.auth.onAuthStateChange(async (event, newSession) => {
          console.log('Auth state changed:', event);
          
          if (event === 'SIGNED_IN' && newSession) {
            console.log('User signed in:', newSession.user.id);
            setUser(newSession.user);
            await fetchUserRole(newSession.user.id);
          ***REMOVED*** 
          else if (event === 'SIGNED_OUT' || event === 'USER_DELETED') {
            console.log('User signed out');
            setUser(null);
            setUserRole(null);
            setShowUserMenu(false);
          ***REMOVED***
        ***REMOVED***);
        
        authListener = data.subscription;
        
        // Handle initial session
        if (session?.user) {
          console.log('Existing session found:', session.user.id);
          setUser(session.user);
          await fetchUserRole(session.user.id);
        ***REMOVED*** else {
          console.log('No active session');
          setUser(null);
          setUserRole(null);
        ***REMOVED***
      ***REMOVED*** catch (error) {
        console.error('Error in auth initialization:', error);
        setUser(null);
        setUserRole(null);
      ***REMOVED*** finally {
        if (isMounted.current) {
          setLoading(false);
        ***REMOVED***
      ***REMOVED***
    ***REMOVED***
    
    // Separate function to fetch user role
    async function fetchUserRole(userId) {
      try {
        console.log('Fetching role for user:', userId);
        
        const { data: profileData, error: profileError ***REMOVED*** = await supabase
          .from('profiles')
          .select('role')
          .eq('id', userId)
          .single();
        
        if (profileError) {
          console.error('Error fetching user role:', profileError);
          if (isMounted.current) setUserRole('user'); // Default to user role on error
        ***REMOVED*** else if (profileData) {
          console.log('User role retrieved:', profileData.role);
          if (isMounted.current) setUserRole(profileData.role || 'user');
        ***REMOVED*** else {
          console.log('No profile data found, defaulting to user role');
          if (isMounted.current) setUserRole('user');
        ***REMOVED***
      ***REMOVED*** catch (error) {
        console.error('Error fetching role:', error);
        if (isMounted.current) setUserRole('user');
      ***REMOVED***
    ***REMOVED***
    
    // Initialize auth
    initializeAuth();
    
    // Safety timeout to prevent infinite loading
    const safetyTimer = setTimeout(() => {
      if (loading && isMounted.current) {
        console.log('Safety timeout: forcing loading state to complete');
        setLoading(false);
      ***REMOVED***
    ***REMOVED***, 3000);
    
    // Cleanup function
    return () => {
      console.log('Cleaning up Navbar component');
      isMounted.current = false;
      clearTimeout(safetyTimer);
      if (authListener) {
        console.log('Unsubscribing from auth listener');
        authListener.unsubscribe();
      ***REMOVED***
    ***REMOVED***;
  ***REMOVED***, []);

  // Memoize the logout handler to ensure consistent reference
  const handleLogout = React.useCallback(async () => {
    try {
      console.log('Logout button clicked');
      setShowUserMenu(false);
      
      // Disable any links/buttons
      const buttons = document.querySelectorAll('button');
      buttons.forEach(button => button.disabled = true);
      
      console.log('Starting logout process...');
      
      // Clear local storage first
      localStorage.clear();
      sessionStorage.clear();
      
      console.log('Local storage cleared');
      
      // Clear states immediately for immediate UI feedback
      setUser(null);
      setUserRole(null);
      
      // Sign out from Supabase with global scope
      const { error ***REMOVED*** = await supabase.auth.signOut({ scope: 'global' ***REMOVED***);
      
      if (error) {
        console.error('Error signing out:', error);
        throw error;
      ***REMOVED***

      console.log('Supabase signout successful');
      
      // Small delay to ensure signout is processed
      setTimeout(() => {
        console.log('Redirecting to home page...');
        window.location.href = '/';
      ***REMOVED***, 100);
    ***REMOVED*** catch (error) {
      console.error('Error during logout:', error);
      
      // Force manual cleanup in case of error
      console.log('Forcing manual cleanup');
      setUser(null);
      setUserRole(null);
      setShowUserMenu(false);
      
      // Try alternative logout approach
      try {
        // Invalidate local session data
        sessionStorage.removeItem('supabase.auth.token');
        localStorage.removeItem('supabase.auth.token');
        
        // Direct redirect after timeout
        setTimeout(() => {
          window.location.href = '/';
        ***REMOVED***, 500);
      ***REMOVED*** catch (fallbackError) {
        console.error('Fallback logout failed:', fallbackError);
        navigate('/');
      ***REMOVED***
    ***REMOVED***
  ***REMOVED***, [navigate]);

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
          
          <div className="hidden md:flex space-x-8 text-lg">
            <Link to="/Home" className="hover:text-[#ffdde2]">Jobs</Link>
            <Link to="/about" className="hover:text-[#ffdde2]">About</Link>
            <Link to="/contact" className="hover:text-[#ffdde2]">Contact</Link>
          </div>

          <div className="flex items-center space-x-4">
            {user ? (
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