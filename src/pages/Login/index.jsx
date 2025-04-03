import React, { useState, useEffect ***REMOVED*** from 'react';
import { useNavigate, useLocation ***REMOVED*** from 'react-router-dom';
import { supabase, checkAndVerifyAdminRole ***REMOVED*** from '../../lib/supabase';
import LoginForm from './LoginForm';
import StatusMessage from '../../components/ui/StatusMessage';

function Login() {
  const navigate = useNavigate();
  const location = useLocation();
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // Check for success message from email verification
    if (location.state?.message) {
      setSuccess(location.state.message);
      // Clear the message from location state
      window.history.replaceState({***REMOVED***, document.title);
    ***REMOVED***
  ***REMOVED***, [location]);

  async function handleLogin(email, password) {
    setLoading(true);
    setError('');
    setSuccess('');

    try {
      // First attempt to sign in
      const { data, error: signInError ***REMOVED*** = await supabase.auth.signInWithPassword({
        email,
        password,
      ***REMOVED***);

      if (signInError) throw signInError;
      if (!data.user) throw new Error('No user returned from login');

      try {
        // Use the dedicated helper function to check admin role
        const isAdmin = await checkAndVerifyAdminRole(data.user.id);
        console.log('Is admin check result:', isAdmin);
        
        if (isAdmin) {
          console.log('Admin user confirmed, redirecting to admin dashboard');
          navigate('/admin');
          return;
        ***REMOVED***
        
        // If not admin, fetch user data to check role as a backup
        const { data: userData, error: userError ***REMOVED*** = await supabase
          .from('profiles')
          .select('role')
          .eq('id', data.user.id)
          .single();

        console.log('User ID:', data.user.id);
        console.log('User data from profiles table:', userData);
        
        if (userError) {
          console.error('Error fetching user role:', userError);
          
          // Check if this is a "no rows" error, meaning profile doesn't exist
          if (userError.code === 'PGRST116' || userError.message?.includes('no rows')) {
            console.log('Profile does not exist for this user');
            setError('Your account is missing a profile. Please contact an administrator.');
            setLoading(false);
            return;
          ***REMOVED***
          
          // If we can't get the role, still navigate to dashboard
          navigate('/user/dashboard');
          return;
        ***REMOVED***

        // Navigate based on role
        if (userData && userData.role) {
          console.log('User role found:', userData.role);
          const normalizedRole = userData.role.toString().trim().toLowerCase();
          
          if (normalizedRole === 'admin') {
            console.log('Admin user detected, redirecting to admin dashboard');
            navigate('/admin');
          ***REMOVED*** else {
            console.log('Non-admin role detected:', normalizedRole);
            navigate('/user/dashboard');
          ***REMOVED***
        ***REMOVED*** else {
          console.warn('User role not found, defaulting to user dashboard');
          navigate('/user/dashboard');
        ***REMOVED***
      ***REMOVED*** catch (roleError) {
        console.error('Error checking user role:', roleError);
        // If role check fails, default to regular user access
        navigate('/user/dashboard');
      ***REMOVED***
    ***REMOVED*** catch (error) {
      console.error('Login error:', error);
      if (error instanceof Error) {
        if (error.message.includes('Invalid login credentials')) {
          setError('Invalid email or password');
        ***REMOVED*** else if (error.message.includes('Email not confirmed')) {
          setError('Please check your email to confirm your account');
        ***REMOVED*** else {
          setError(error.message);
        ***REMOVED***
      ***REMOVED*** else {
        setError('Failed to login');
      ***REMOVED***
    ***REMOVED*** finally {
      setLoading(false);
    ***REMOVED***
  ***REMOVED***

  return (
    <div className="max-w-md mx-auto">
      <div className="bg-white rounded-lg shadow-lg p-8">
        <h1 className="text-2xl font-bold text-gray-900 mb-6 text-center">Login</h1>
        
        {error && <StatusMessage type="error" message={error***REMOVED*** />***REMOVED***
        {success && <StatusMessage type="success" message={success***REMOVED*** />***REMOVED***

        <LoginForm 
          handleLogin={handleLogin***REMOVED*** 
          loading={loading***REMOVED*** 
          navigate={navigate***REMOVED***
        />
      </div>
    </div>
  );
***REMOVED***

export default Login; 