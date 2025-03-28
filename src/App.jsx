import React, { useEffect, useState ***REMOVED*** from 'react';
import { BrowserRouter as Router, Routes, Route, useNavigate ***REMOVED*** from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import JobDetails from './pages/JobDetails';
import Login from './pages/Login';
import SignUp from './pages/SignUp';
import About from './pages/About';
import Contact from './pages/Contact';
import AdminDashboard from './pages/Admin/Dashboard/AdminDashboard';
import { LandingPage ***REMOVED*** from './pages/LandingPage';
import { supabase, createUserProfile ***REMOVED*** from './lib/supabase';
import Dashboard from './pages/User/Dashboard';

// Auth callback component
function AuthCallback() {
  const navigate = useNavigate();
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    // Handle the email confirmation
    const handleEmailConfirmation = async () => {
      try {
        // Get the error description from URL if it exists
        const params = new URLSearchParams(window.location.hash.substring(1));
        const errorDescription = params.get('error_description');
        
        if (errorDescription) {
          setError(errorDescription);
          setLoading(false);
          return;
        ***REMOVED***

        // Refresh the session
        const { error: refreshError ***REMOVED*** = await supabase.auth.refreshSession();
        if (refreshError) {
          console.error('Error refreshing session:', refreshError);
          setError('Failed to verify email. Please try again.');
          setLoading(false);
          return;
        ***REMOVED***

        // Get the current user
        const { data: { user ***REMOVED*** ***REMOVED*** = await supabase.auth.getUser();
        
        if (!user) {
          setError('No user found. Please try signing up again.');
          setLoading(false);
          return;
        ***REMOVED***

        // Check if user already exists in the users table
        const { data: existingUser, error: checkError ***REMOVED*** = await supabase
          .from('profiles')
          .select('id')
          .eq('id', user.id)
          .maybeSingle();

        if (checkError) {
          console.error('Error checking user existence:', checkError);
        ***REMOVED***

        // If user doesn't exist in the profile table, create it
        if (!existingUser) {
          console.log('Creating new user profile for:', user.id);
          
          try {
            // Use the helper function to create a profile
            const { data, error ***REMOVED*** = await createUserProfile(
              user.id, 
              user.user_metadata?.full_name || 'User',
              user.email
            );

            if (error) {
              console.error('Error creating user profile:', error);
              
              // Try a different approach if we get a permission error
              if (error.code === '42501' || error.message?.includes('permission') || error.status === 403) {
                console.log('Trying alternative approach to create profile...');
                
                // Try to get stored credentials from signup
                const storedEmail = sessionStorage.getItem('temp_signup_email');
                const storedPassword = sessionStorage.getItem('temp_signup_password');
                
                // Use stored credentials or prompt for password
                let password;
                if (storedEmail === user.email && storedPassword) {
                  password = storedPassword;
                  // Clear the stored credentials
                  sessionStorage.removeItem('temp_signup_email');
                  sessionStorage.removeItem('temp_signup_password');
                ***REMOVED*** else {
                  password = window.prompt('Please enter your password to complete account setup:');
                ***REMOVED***
                
                if (!password) {
                  setError('Your email was verified, but we had trouble setting up your account. Please try logging in directly.');
                  setLoading(false);
                  return;
                ***REMOVED***
                
                // Try to sign in the user first to get a valid session
                const { error: signInError ***REMOVED*** = await supabase.auth.signInWithPassword({
                  email: user.email,
                  password: password
                ***REMOVED***);
                
                if (signInError) {
                  console.error('Error signing in:', signInError);
                  setError('Your email was verified, but we had trouble setting up your account. Please try logging in directly.');
                  setLoading(false);
                  return;
                ***REMOVED***
                
                // Try again after signing in
                const { error: retryError ***REMOVED*** = await createUserProfile(
                  user.id, 
                  user.user_metadata?.full_name || 'User',
                  user.email
                );
                
                if (retryError) {
                  console.error('Error in retry create profile:', retryError);
                  setError('Your email was verified, but we had trouble setting up your account. Please try logging in directly.');
                  setLoading(false);
                  return;
                ***REMOVED***
              ***REMOVED*** else {
                setError('Your email was verified, but we had trouble setting up your account. Please try logging in directly.');
                setLoading(false);
                return;
              ***REMOVED***
            ***REMOVED*** else {
              console.log('Successfully created user profile for:', user.id);
            ***REMOVED***
          ***REMOVED*** catch (profileError) {
            console.error('Error in profile creation:', profileError);
            setError('Your email was verified, but we had trouble setting up your account. Please try logging in directly.');
            setLoading(false);
            return;
          ***REMOVED***
        ***REMOVED*** else {
          console.log('User profile already exists for:', user.id);
        ***REMOVED***

        // Redirect to login page
        navigate('/login', { 
          state: { message: 'Email verified successfully! You can now log in.' ***REMOVED***
        ***REMOVED***);
      ***REMOVED*** catch (error) {
        console.error('Error in email confirmation:', error);
        setError('An error occurred during email verification.');
        setLoading(false);
      ***REMOVED***
    ***REMOVED***;

    handleEmailConfirmation();
  ***REMOVED***, [navigate]);

  return (
    <div className="text-center py-8">
      {error ? (
        <div className="bg-red-50 p-4 rounded-md">
          <p className="text-red-700">{error***REMOVED***</p>
          <button
            onClick={() => navigate('/signup')***REMOVED***
            className="mt-4 text-red-600 hover:text-red-800 underline"
          >
            Back to Sign Up
          </button>
        </div>
      ) : (
        <div className="flex flex-col items-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-white mb-4"></div>
          <p className="text-white">Verifying your email...</p>
        </div>
      )***REMOVED***
    </div>
  );
***REMOVED***

function App() {
  return (
    <Router>
      <div className="min-h-screen flex flex-col bg-[#4d6a6d]">
        <Navbar />
        <main className="flex-grow container mx-auto px-4 py-8">
          <Routes>
            <Route path="/" element={<LandingPage />***REMOVED*** />
            <Route path="/home" element={<Home />***REMOVED*** />
            <Route path="/jobs/:id" element={<JobDetails />***REMOVED*** />
            <Route path="/login" element={<Login />***REMOVED*** />
            <Route path="/signup" element={<SignUp />***REMOVED*** />
            <Route path="/about" element={<About />***REMOVED*** />
            <Route path="/contact" element={<Contact />***REMOVED*** />
            <Route path="/admin/*" element={<AdminDashboard />***REMOVED*** />
            <Route path="/user/dashboard" element={<Dashboard />***REMOVED*** />
            <Route path="/auth/callback" element={<AuthCallback />***REMOVED*** />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
***REMOVED***

export default App;