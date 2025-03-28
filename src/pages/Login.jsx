import React, { useState, useEffect ***REMOVED*** from 'react';
import { useNavigate, useLocation ***REMOVED*** from 'react-router-dom';
import { supabase, checkAndVerifyAdminRole, createUserProfile ***REMOVED*** from '../lib/supabase';
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
        // Use the dedicated helper function to check admin role
        // This will not create profiles automatically
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
            setError('Your account is missing a profile. Please contact an administrator or use the Admin Utilities below to create one.');
            setLoading(false);
            return;
          ***REMOVED***
          
          // If we can't get the role, log the error but still navigate to dashboard
          // This prevents 500 errors from blocking the UI
          navigate('/user/dashboard');
          return;
        ***REMOVED***

        // Navigate based on role (this is a backup in case the helper function didn't work)
        if (userData && userData.role) {
          console.log('User role found:', userData.role);
          console.log('Role type:', typeof userData.role);
          console.log('Role length:', userData.role.length);
          // More robust comparison - trim whitespace and ensure case-insensitive
          const normalizedRole = userData.role.toString().trim().toLowerCase();
          console.log('Normalized role:', normalizedRole);
          console.log('Comparison result:', normalizedRole === 'admin');
          
          if (normalizedRole === 'admin') {
            console.log('Admin user detected, redirecting to admin dashboard');
            navigate('/admin');
          ***REMOVED*** else {
            // For all other roles, go to user dashboard
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
      
      {/* Admin utilities section - always visible for now during development */***REMOVED***
      <div className="mt-8 bg-gray-100 rounded-lg shadow-lg p-6">
        <h2 className="text-lg font-bold text-gray-900 mb-4">Admin Role Utilities</h2>
        <div className="space-y-4">
          <AdminRoleDebugger />
        </div>
      </div>
    </div>
  );
***REMOVED***

// Admin role debugging component
function AdminRoleDebugger() {
  const navigate = useNavigate();
  const [userId, setUserId] = useState('');
  const [status, setStatus] = useState({ message: '', type: '' ***REMOVED***);
  const [loading, setLoading] = useState(false);
  const [sqlCommand, setSqlCommand] = useState('');
  const [userData, setUserData] = useState(null);

  async function getCurrentUser() {
    try {
      const { data ***REMOVED*** = await supabase.auth.getUser();
      if (data?.user) {
        setUserId(data.user.id);
        setUserData(data.user);
        setStatus({ message: `Current user: ${data.user.email***REMOVED***`, type: 'info' ***REMOVED***);
      ***REMOVED*** else {
        setStatus({ message: 'No logged in user found', type: 'error' ***REMOVED***);
      ***REMOVED***
    ***REMOVED*** catch (error) {
      console.error('Error getting current user:', error);
      setStatus({ message: 'Error fetching user', type: 'error' ***REMOVED***);
    ***REMOVED***
  ***REMOVED***

  async function createProfile() {
    if (!userId) {
      setStatus({ message: 'Please get or enter a user ID first', type: 'error' ***REMOVED***);
      return;
    ***REMOVED***
    
    setLoading(true);
    try {
      // Check if profile already exists
      const { data: existingProfile, error: checkError ***REMOVED*** = await supabase
        .from('profiles')
        .select('id')
        .eq('id', userId)
        .maybeSingle();
        
      if (existingProfile) {
        setStatus({ message: 'Profile already exists for this user', type: 'info' ***REMOVED***);
        setLoading(false);
        return;
      ***REMOVED***
    
      // Get user details for better profile creation
      const userEmail = userData?.email || 'user@example.com';
      const userName = userData?.user_metadata?.full_name || 
                      userData?.email?.split('@')[0] || 
                      'User';
      
      // Create a new profile
      const { data: newProfile, error: createError ***REMOVED*** = await createUserProfile(
        userId,
        userName,
        userEmail,
        'user' // Default role is 'user'
      );
      
      if (createError) {
        throw createError;
      ***REMOVED***
      
      setStatus({ 
        message: `Profile created successfully with role 'user'. Use 'Set Admin' button to make this user an admin.`,
        type: 'success'
      ***REMOVED***);
      
      // Refresh profile data - wait a moment for the database to update
      setTimeout(checkRole, 1000);
      
    ***REMOVED*** catch (error) {
      console.error('Error creating profile:', error);
      setStatus({ message: `Error: ${error.message***REMOVED***`, type: 'error' ***REMOVED***);
    ***REMOVED*** finally {
      setLoading(false);
    ***REMOVED***
  ***REMOVED***

  async function checkRole() {
    if (!userId) {
      setStatus({ message: 'Please get or enter a user ID first', type: 'error' ***REMOVED***);
      return;
    ***REMOVED***
    
    setLoading(true);
    try {
      const { data, error ***REMOVED*** = await supabase
        .from('profiles')
        .select('*')  // Get all fields for inspection
        .eq('id', userId)
        .single();
      
      if (error) throw error;
      
      // Show the full user data for debugging
      console.log('Full user profile data:', data);
      
      setStatus({ 
        message: `User data: Role=${data?.role || 'None'***REMOVED***, 
                 ID=${data?.id || 'None'***REMOVED***, 
                 Name=${data?.name || 'None'***REMOVED***
                 Full data in console.`,
        type: 'info'
      ***REMOVED***);
    ***REMOVED*** catch (error) {
      console.error('Error checking role:', error);
      setStatus({ message: `Error: ${error.message***REMOVED***`, type: 'error' ***REMOVED***);
    ***REMOVED*** finally {
      setLoading(false);
    ***REMOVED***
  ***REMOVED***

  async function setAdmin() {
    if (!userId) {
      setStatus({ message: 'Please get or enter a user ID first', type: 'error' ***REMOVED***);
      return;
    ***REMOVED***
    
    setLoading(true);
    try {
      // First try with direct update
      const { error ***REMOVED*** = await supabase
        .from('profiles')
        .update({ role: 'admin' ***REMOVED***)
        .eq('id', userId);
      
      if (error) throw error;
      
      setStatus({ message: `User ${userId***REMOVED*** successfully set as admin`, type: 'success' ***REMOVED***);
    ***REMOVED*** catch (error) {
      console.error('Error setting admin:', error);
      setStatus({ message: `Error: ${error.message***REMOVED***`, type: 'error' ***REMOVED***);
    ***REMOVED*** finally {
      setLoading(false);
    ***REMOVED***
  ***REMOVED***

  async function setAdminAndNavigate() {
    if (!userId) {
      setStatus({ message: 'Please get or enter a user ID first', type: 'error' ***REMOVED***);
      return;
    ***REMOVED***
    
    setLoading(true);
    try {
      // Update the role to admin
      const { error ***REMOVED*** = await supabase
        .from('profiles')
        .update({ role: 'admin' ***REMOVED***)
        .eq('id', userId);
      
      if (error) throw error;
      
      setStatus({ 
        message: `User ${userId***REMOVED*** set as admin. Redirecting to admin dashboard...`,
        type: 'success'
      ***REMOVED***);
      
      // Short delay for UI feedback
      setTimeout(() => {
        navigate('/admin');
      ***REMOVED***, 1000);
      
    ***REMOVED*** catch (error) {
      console.error('Error setting admin:', error);
      setStatus({ message: `Error: ${error.message***REMOVED***`, type: 'error' ***REMOVED***);
      setLoading(false);
    ***REMOVED***
  ***REMOVED***

  async function fixRoleWhitespace() {
    if (!userId) {
      setStatus({ message: 'Please get or enter a user ID first', type: 'error' ***REMOVED***);
      return;
    ***REMOVED***
    
    setLoading(true);
    try {
      // First get the current role value
      const { data: userData, error: fetchError ***REMOVED*** = await supabase
        .from('profiles')
        .select('role')
        .eq('id', userId)
        .single();
      
      if (fetchError) throw fetchError;
      
      if (!userData || !userData.role) {
        setStatus({ message: 'No role found for this user', type: 'error' ***REMOVED***);
        setLoading(false);
        return;
      ***REMOVED***
      
      // Trim the role value to remove any whitespace
      const trimmedRole = userData.role.toString().trim();
      console.log(`Current role: "${userData.role***REMOVED***" (${userData.role.length***REMOVED*** chars)`);
      console.log(`Trimmed role: "${trimmedRole***REMOVED***" (${trimmedRole.length***REMOVED*** chars)`);
      
      // Update with the trimmed value
      const { error: updateError ***REMOVED*** = await supabase
        .from('profiles')
        .update({ role: trimmedRole ***REMOVED***)
        .eq('id', userId);
      
      if (updateError) throw updateError;
      
      setStatus({ 
        message: `Role value cleaned: "${userData.role***REMOVED***" → "${trimmedRole***REMOVED***"`,
        type: 'success'
      ***REMOVED***);
    ***REMOVED*** catch (error) {
      console.error('Error fixing role whitespace:', error);
      setStatus({ message: `Error: ${error.message***REMOVED***`, type: 'error' ***REMOVED***);
    ***REMOVED*** finally {
      setLoading(false);
    ***REMOVED***
  ***REMOVED***

  // Generate SQL command for manual execution
  function generateSqlCommand() {
    if (!userId) {
      setStatus({ message: 'Please get or enter a user ID first', type: 'error' ***REMOVED***);
      return;
    ***REMOVED***

    const sql = `-- Run this SQL in your Supabase SQL Editor
-- 1. First check if the profile exists:
SELECT * FROM public.profiles WHERE id = '${userId***REMOVED***';

-- 2. If the profile doesn't exist, insert it:
INSERT INTO public.profiles (id, name, email, role, created_at, updated_at)
VALUES ('${userId***REMOVED***', 'Admin User', 'admin@example.com', 'admin', NOW(), NOW())
ON CONFLICT (id) DO NOTHING;

-- 3. If the profile exists, update the role to admin:
UPDATE public.profiles 
SET role = 'admin', updated_at = NOW()
WHERE id = '${userId***REMOVED***';`;

    setSqlCommand(sql);
    setStatus({ 
      message: 'SQL command generated. You can copy and execute this in Supabase SQL Editor.',
      type: 'info'
    ***REMOVED***);
  ***REMOVED***

  return (
    <div className="bg-white p-4 rounded-md border border-gray-200">
      <div className="flex flex-col space-y-3">
        <div className="flex space-x-2">
          <input
            type="text"
            value={userId***REMOVED***
            onChange={(e) => setUserId(e.target.value)***REMOVED***
            placeholder="User ID"
            className="flex-1 border border-gray-300 px-3 py-2 rounded"
          />
          <button 
            onClick={getCurrentUser***REMOVED***
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
            disabled={loading***REMOVED***
          >
            Get Current User
          </button>
        </div>
        
        <div className="flex space-x-2">
          <button 
            onClick={checkRole***REMOVED***
            className="flex-1 bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600"
            disabled={loading***REMOVED***
          >
            Check Role
          </button>
          <button 
            onClick={createProfile***REMOVED***
            className="flex-1 bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
            disabled={loading***REMOVED***
          >
            Create Profile
          </button>
        </div>
        
        <div className="flex space-x-2">
          <button 
            onClick={setAdmin***REMOVED***
            className="flex-1 bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
            disabled={loading***REMOVED***
          >
            Set as Admin
          </button>
          <button 
            onClick={setAdminAndNavigate***REMOVED***
            className="flex-1 bg-purple-600 text-white px-4 py-2 rounded hover:bg-purple-700"
            disabled={loading***REMOVED***
          >
            Set Admin & Navigate
          </button>
        </div>
        
        <div className="flex space-x-2">
          <button 
            onClick={fixRoleWhitespace***REMOVED***
            className="flex-1 bg-yellow-500 text-white px-4 py-2 rounded hover:bg-yellow-600"
            disabled={loading***REMOVED***
          >
            Clean Role Whitespace
          </button>
          <button 
            onClick={generateSqlCommand***REMOVED***
            className="flex-1 bg-blue-700 text-white px-4 py-2 rounded hover:bg-blue-800"
            disabled={loading***REMOVED***
          >
            Generate SQL Fix
          </button>
        </div>
        
        {sqlCommand && (
          <div className="mt-4">
            <div className="flex justify-between items-center mb-2">
              <h3 className="font-medium">SQL Command for Database Admin</h3>
              <button
                onClick={() => {
                  navigator.clipboard.writeText(sqlCommand);
                  setStatus({ message: 'SQL command copied to clipboard', type: 'success' ***REMOVED***);
                ***REMOVED******REMOVED***
                className="text-xs bg-gray-200 px-2 py-1 rounded hover:bg-gray-300"
              >
                Copy to Clipboard
              </button>
            </div>
            <pre className="bg-gray-100 p-3 rounded text-xs overflow-auto max-h-40">{sqlCommand***REMOVED***</pre>
          </div>
        )***REMOVED***
        
        {status.message && (
          <div className={`p-3 rounded ${
            status.type === 'error' ? 'bg-red-100 text-red-700' : 
            status.type === 'success' ? 'bg-green-100 text-green-700' : 
            'bg-blue-100 text-blue-700'
          ***REMOVED***`***REMOVED***>
            {status.message***REMOVED***
          </div>
        )***REMOVED***
      </div>
    </div>
  );
***REMOVED***

export default Login;