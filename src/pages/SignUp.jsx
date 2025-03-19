import React, { useState ***REMOVED*** from 'react';
import { useNavigate ***REMOVED*** from 'react-router-dom';
import { supabase ***REMOVED*** from '../lib/supabase';
import { Mail, Lock, User, AlertCircle ***REMOVED*** from 'lucide-react';

function SignUp() {
  const navigate = useNavigate();
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  async function handleSignUp(e) {
    e.preventDefault();
    setLoading(true);
    setError('');
    setSuccess(false);

    if (password !== confirmPassword) {
      setError('Passwords do not match');
      setLoading(false);
      return;
    ***REMOVED***

    try {
      // Sign up the user with Supabase Auth
      const { data: { user ***REMOVED***, error: signUpError ***REMOVED*** = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            full_name: fullName,
          ***REMOVED***,
          emailRedirectTo: `${window.location.origin***REMOVED***/auth/callback`
        ***REMOVED***
      ***REMOVED***);

      if (signUpError) throw signUpError;
      if (!user) throw new Error('No user data returned');

      // Create the user profile - this might fail if the user isn't fully created yet,
      // but that's okay because we'll try again in the AuthCallback
      try {
        const { error: profileError ***REMOVED*** = await supabase
          .from('users')
          .insert({
            id: user.id,
            name: fullName,
            email: email,
            role: 'user'
          ***REMOVED***);

        if (profileError) {
          console.error('Error creating user profile:', profileError);
          // Don't throw here - the user can still be created successfully
        ***REMOVED***
      ***REMOVED*** catch (profileError) {
        console.error('Error in profile creation:', profileError);
        // Don't throw here either
      ***REMOVED***

      // Show success message
      setSuccess(true);
      // Clear form
      setFullName('');
      setEmail('');
      setPassword('');
      setConfirmPassword('');
      
    ***REMOVED*** catch (error) {
      console.error('Signup error:', error);
      if (error instanceof Error) {
        setError(error.message);
      ***REMOVED*** else {
        setError('An error occurred during signup');
      ***REMOVED***
    ***REMOVED*** finally {
      setLoading(false);
    ***REMOVED***
  ***REMOVED***

  return (
    <div className="max-w-md mx-auto">
      <div className="bg-white rounded-lg shadow-lg p-8">
        <h1 className="text-2xl font-bold text-gray-900 mb-6 text-center">Create an Account</h1>
        
        {error && (
          <div className="mb-4 p-4 bg-red-50 border-l-4 border-red-400 text-red-700 flex items-center">
            <AlertCircle className="h-5 w-5 mr-2" />
            <p>{error***REMOVED***</p>
          </div>
        )***REMOVED***

        {success && (
          <div className="mb-4 p-4 bg-green-50 border-l-4 border-green-400 text-green-700">
            <p>Registration successful! Please check your email to confirm your account.</p>
            <p className="mt-2">After confirming your email, you can <button onClick={() => navigate('/login')***REMOVED*** className="text-green-800 underline">login here</button>.</p>
          </div>
        )***REMOVED***

        <form onSubmit={handleSignUp***REMOVED*** className="space-y-6">
          <div>
            <label htmlFor="fullName" className="block text-sm font-medium text-gray-700">
              Full Name
            </label>
            <div className="mt-1 relative">
              <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
              <input
                id="fullName"
                type="text"
                required
                className="pl-10 block w-full rounded-md border-gray-300 shadow-sm focus:border-[#101d42] focus:ring focus:ring-[#101d42] focus:ring-opacity-50"
                value={fullName***REMOVED***
                onChange={(e) => setFullName(e.target.value)***REMOVED***
              />
            </div>
          </div>

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
                minLength={6***REMOVED***
                className="pl-10 block w-full rounded-md border-gray-300 shadow-sm focus:border-[#101d42] focus:ring focus:ring-[#101d42] focus:ring-opacity-50"
                value={password***REMOVED***
                onChange={(e) => setPassword(e.target.value)***REMOVED***
              />
            </div>
            <p className="mt-1 text-sm text-gray-500">Password must be at least 6 characters long</p>
          </div>

          <div>
            <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700">
              Confirm Password
            </label>
            <div className="mt-1 relative">
              <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
              <input
                id="confirmPassword"
                type="password"
                required
                minLength={6***REMOVED***
                className="pl-10 block w-full rounded-md border-gray-300 shadow-sm focus:border-[#101d42] focus:ring focus:ring-[#101d42] focus:ring-opacity-50"
                value={confirmPassword***REMOVED***
                onChange={(e) => setConfirmPassword(e.target.value)***REMOVED***
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading || success***REMOVED***
            className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-[#101d42] hover:bg-opacity-90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#101d42] disabled:opacity-50"
          >
            {loading ? 'Creating account...' : 'Create Account'***REMOVED***
          </button>
        </form>
      </div>
    </div>
  );
***REMOVED***

export default SignUp;