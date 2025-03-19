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
import AdminDashboard from './pages/AdminDashboard';
import { LandingPage ***REMOVED*** from './pages/LandingPage';
import { supabase ***REMOVED*** from './lib/supabase';
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
          .from('users')
          .select('id')
          .eq('id', user.id)
          .maybeSingle();

        if (checkError) {
          console.error('Error checking user existence:', checkError);
        ***REMOVED***

        // If user doesn't exist in the profile table, create it
        if (!existingUser) {
          // Create user profile
          const { error: insertError ***REMOVED*** = await supabase
            .from('users')
            .insert({
              id: user.id,
              name: user.user_metadata.full_name || 'User',
              email: user.email,
              role: 'user'
            ***REMOVED***);

          if (insertError) {
            console.error('Error creating user profile:', insertError);
            // Continue anyway, as we've confirmed the email
          ***REMOVED***
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