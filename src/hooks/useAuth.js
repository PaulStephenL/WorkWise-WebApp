import { useState, useEffect, useRef, useCallback ***REMOVED*** from 'react';
import { useNavigate ***REMOVED*** from 'react-router-dom';
import { supabase ***REMOVED*** from '../lib/supabase';

export function useAuth() {
  const [user, setUser] = useState(null);
  const [userRole, setUserRole] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const isMounted = useRef(true);

  // Effect for authentication state management
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
      console.log('Cleaning up auth hook');
      isMounted.current = false;
      clearTimeout(safetyTimer);
      if (authListener) {
        console.log('Unsubscribing from auth listener');
        authListener.unsubscribe();
      ***REMOVED***
    ***REMOVED***;
  ***REMOVED***, []);

  // Logout handler
  const logout = useCallback(async () => {
    try {
      console.log('Logout function called');
      
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

  return {
    user,
    userRole,
    loading,
    logout,
    isAuthenticated: !!user,
    isAdmin: userRole === 'admin'
  ***REMOVED***;
***REMOVED*** 