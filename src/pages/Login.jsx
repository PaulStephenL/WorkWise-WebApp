import React, { useState, useEffect ***REMOVED*** from 'react';
import { useNavigate, useLocation ***REMOVED*** from 'react-router-dom';
import { supabase ***REMOVED*** from '../lib/supabase';
import { Mail, Lock, AlertCircle, CheckCircle ***REMOVED*** from 'lucide-react';

function Login() {
  const navigate = useNavigate();
  const location = useLocation();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
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

  async function handleLogin(e) {
    e.preventDefault();
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
        // Then fetch the user's role
        const { data: userData, error: userError ***REMOVED*** = await supabase
          .from('users')
          .select('role')
          .eq('id', data.user.id)
          .single();

        if (userError) {
          console.error('Error fetching user role:', userError);
          // If we can't get the role, log the error but still navigate to dashboard
          // This prevents 500 errors from blocking the UI
          navigate('/user/dashboard');
          return;
        ***REMOVED***

        // Navigate based on role
        if (userData && userData.role) {
          navigate(userData.role === 'admin' ? '/admin' : '/user/dashboard');
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
        
        {error && (
          <div className="mb-4 p-4 bg-red-50 border-l-4 border-red-400 text-red-700 flex items-center">
            <AlertCircle className="h-5 w-5 mr-2" />
            <p>{error***REMOVED***</p>
          </div>
        )***REMOVED***

        {success && (
          <div className="mb-4 p-4 bg-green-50 border-l-4 border-green-400 text-green-700 flex items-center">
            <CheckCircle className="h-5 w-5 mr-2" />
            <p>{success***REMOVED***</p>
          </div>
        )***REMOVED***

        <form onSubmit={handleLogin***REMOVED*** className="space-y-6">
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">
              Email Address
            </label>
            <div className="mt-1 relative">
              <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
              <input
                id="email"
                type="email"
                required
                className="pl-10 block w-full rounded-md border-gray-300 shadow-sm focus:border-[#101d42] focus:ring focus:ring-[#101d42] focus:ring-opacity-50"
                value={email***REMOVED***
                onChange={(e) => setEmail(e.target.value)***REMOVED***
              />
            </div>
          </div>

          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700">
              Password
            </label>
            <div className="mt-1 relative">
              <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
              <input
                id="password"
                type="password"
                required
                className="pl-10 block w-full rounded-md border-gray-300 shadow-sm focus:border-[#101d42] focus:ring focus:ring-[#101d42] focus:ring-opacity-50"
                value={password***REMOVED***
                onChange={(e) => setPassword(e.target.value)***REMOVED***
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading***REMOVED***
            className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-[#101d42] hover:bg-opacity-90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#101d42] disabled:opacity-50"
          >
            {loading ? 'Logging in...' : 'Login'***REMOVED***
          </button>

          <div className="text-center">
            <button
              type="button"
              onClick={() => navigate('/signup')***REMOVED***
              className="text-sm text-[#101d42] hover:text-opacity-90"
            >
              Don't have an account? Sign up
            </button>
          </div>
        </form>
      </div>
    </div>
  );
***REMOVED***

export default Login;