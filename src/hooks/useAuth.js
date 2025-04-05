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
          if (event === 'SIGNED_IN' && newSession) {
            setUser(newSession.user);
            await fetchUserRole(newSession.user.id);
          ***REMOVED*** 
          else if (event === 'SIGNED_OUT' || event === 'USER_DELETED') {
            setUser(null);
            setUserRole(null);
          ***REMOVED***
        ***REMOVED***);
        
        authListener = data.subscription;
        
        // Handle initial session
        if (session?.user) {
          setUser(session.user);
          await fetchUserRole(session.user.id);
        ***REMOVED*** else {
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
        const { data: profileData, error: profileError ***REMOVED*** = await supabase
          .from('profiles')
          .select('role')
          .eq('id', userId)
          .single();
        
        if (profileError) {
          console.error('Error fetching user role:', profileError);
          if (isMounted.current) setUserRole('user'); // Default to user role on error
        ***REMOVED*** else if (profileData) {
          if (isMounted.current) setUserRole(profileData.role || 'user');
        ***REMOVED*** else {
          if (isMounted.current) setUserRole('user');
        ***REMOVED***
      ***REMOVED*** catch (error) {
        console.error('Error fetching role:', error);
        if (isMounted.current) setUserRole('user');
      ***REMOVED***
    ***REMOVED***
    
    // Initialize auth
    initializeAuth();
    
    // Cleanup function
    return () => {
      console.log('Cleaning up auth hook');
      isMounted.current = false;
      if (authListener) {
        authListener.unsubscribe();
      ***REMOVED***
    ***REMOVED***;
  ***REMOVED***, []);

  // Logout handler
  const logout = useCallback(async () => {
    try {
      // Clear local storage
      localStorage.clear();
      sessionStorage.clear();
      
      // Clear states immediately for UI feedback
      setUser(null);
      setUserRole(null);
      
      
      // Sign out from Supabase
      const { error ***REMOVED*** = await supabase.auth.signOut();
      
      if (error) throw error;
      
      navigate('/');
    ***REMOVED*** catch (error) {
      console.error('Error during logout:', error);
      setUser(null);
      setUserRole(null);
      navigate('/');
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