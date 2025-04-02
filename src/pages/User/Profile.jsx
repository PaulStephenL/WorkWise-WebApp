import React, { useState, useEffect ***REMOVED*** from 'react';
import { useNavigate ***REMOVED*** from 'react-router-dom';
import { supabase ***REMOVED*** from '../../lib/supabase';

export default function Profile() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [updating, setUpdating] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState('');
  const [profile, setProfile] = useState({
    name: '',
    email: '',
    default_resume_url: '',
    default_cover_letter: '',
  ***REMOVED***);
  const [resumeFile, setResumeFile] = useState(null);

  // Force loading state to complete after timeout
  useEffect(() => {
    const timer = setTimeout(() => {
      if (loading) {
        console.log('Forcing profile loading state to complete after timeout');
        setLoading(false);
        setError('Loading timed out. Please refresh the page or try logging in again.');
      ***REMOVED***
    ***REMOVED***, 10000); // 10 second timeout
    
    return () => clearTimeout(timer);
  ***REMOVED***, [loading]);

  useEffect(() => {
    checkUser();
    
    // Add cleanup for unmounting
    return () => {
      console.log('Profile component unmounting');
    ***REMOVED***;
  ***REMOVED***, []);

  async function checkUser() {
    try {
      setLoading(true);
      setError(null);

      console.log('Checking user session...');
      // Get the current session
      const { data: { session ***REMOVED***, error: sessionError ***REMOVED*** = await supabase.auth.getSession();
      
      if (sessionError) {
        console.error('Session error:', sessionError);
        setError('Authentication error. Please log in again.');
        navigate('/login');
        return;
      ***REMOVED***

      if (!session?.user) {
        console.log('No active session found');
        setError('No active session. Please log in.');
        navigate('/login');
        return;
      ***REMOVED***

      console.log('Session found:', session.user.id);

      // Verify user role and fetch profile in one query
      const { data: profileData, error: profileError ***REMOVED*** = await supabase
        .from('profiles')
        .select('*')
        .eq('id', session.user.id)
        .single();

      if (profileError) {
        console.error('Error fetching profile:', profileError);
        setError('Error loading profile. Please try again.');
        navigate('/login');
        return;
      ***REMOVED***

      if (!profileData) {
        console.error('No profile data found');
        setError('Profile not found. Please contact support.');
        navigate('/login');
        return;
      ***REMOVED***

      // Check role
      if (profileData.role !== 'user') {
        console.log('User is not a regular user:', profileData.role);
        setError('Access denied. This page is only for regular users.');
        navigate('/');
        return;
      ***REMOVED***

      console.log('Profile data loaded successfully:', profileData);
      
      // Update profile state with all data
      setProfile({
        name: profileData.name || '',
        email: profileData.email || '',
        default_resume_url: profileData.default_resume_url || '',
        default_cover_letter: profileData.default_cover_letter || '',
      ***REMOVED***);
      setError(null);
      setLoading(false);

      // Set up auth state listener
      const { data: { subscription ***REMOVED*** ***REMOVED*** = supabase.auth.onAuthStateChange(async (event, session) => {
        console.log('Auth state changed in Profile:', event);
        if (event === 'SIGNED_OUT' || !session) {
          console.log('Session ended, redirecting to login');
          navigate('/login');
        ***REMOVED*** else if (event === 'SIGNED_IN') {
          // Refresh profile data on sign in
          console.log('User signed in, refreshing profile');
          await fetchProfile(session.user.id);
        ***REMOVED***
      ***REMOVED***);

      // Return cleanup function
      return () => {
        console.log('Cleaning up auth listener in Profile');
        if (subscription) subscription.unsubscribe();
      ***REMOVED***;

    ***REMOVED*** catch (error) {
      console.error('Session check error:', error);
      setError('Failed to load profile: ' + (error.message || 'Unknown error'));
      setLoading(false);
    ***REMOVED***
  ***REMOVED***

  async function fetchProfile(userId) {
    try {
      console.log('Fetching profile for user:', userId);
      setError(null);

      const { data, error ***REMOVED*** = await supabase
        .from('profiles')
        .select('*')
        .eq('id', userId)
        .single();

      if (error) {
        console.error('Profile fetch error:', error);
        throw error;
      ***REMOVED***

      if (data) {
        console.log('Profile data received:', data);
        setProfile({
          name: data.name || '',
          email: data.email || '',
          default_resume_url: data.default_resume_url || '',
          default_cover_letter: data.default_cover_letter || '',
        ***REMOVED***);
      ***REMOVED*** else {
        console.error('No profile data received');
        throw new Error('Profile not found');
      ***REMOVED***
    ***REMOVED*** catch (error) {
      console.error('Error in fetchProfile:', error);
      setError('Failed to load profile: ' + (error.message || 'Unknown error'));
    ***REMOVED***
  ***REMOVED***

  async function handleSubmit(e) {
    e.preventDefault();
    setUpdating(true);
    setError(null);
    setSuccess('');

    try {
      // Get current session
      const { data: { session ***REMOVED***, error: sessionError ***REMOVED*** = await supabase.auth.getSession();
      
      if (sessionError) {
        console.error('Session error:', sessionError);
        throw new Error('Authentication error. Please try logging in again.');
      ***REMOVED***
      
      if (!session) {
        throw new Error('No active session. Please log in.');
      ***REMOVED***

      // Prepare update data
      const updateData = {
        name: profile.name,
        default_cover_letter: profile.default_cover_letter,
        updated_at: new Date().toISOString()
      ***REMOVED***;

      // Handle resume file upload if present
      if (resumeFile) {
        try {
          console.log('Starting resume upload process...');
          
          // Validate file size (max 5MB)
          if (resumeFile.size > 5 * 1024 * 1024) {
            throw new Error('Resume file must be smaller than 5MB');
          ***REMOVED***

          // Validate file type
          const fileExt = resumeFile.name.split('.').pop().toLowerCase();
          if (!['pdf', 'doc', 'docx'].includes(fileExt)) {
            throw new Error('Only PDF, DOC, and DOCX files are allowed');
          ***REMOVED***

          // Try to directly access the bucket first
          const { data: bucketData, error: bucketError ***REMOVED*** = await supabase.storage
            .from('resumes')
            .list('', {
              limit: 1
            ***REMOVED***);

          if (bucketError) {
            console.error('Bucket access error:', bucketError);
            // Try to get more detailed error information
            const { data: buckets, error: bucketsError ***REMOVED*** = await supabase
              .storage
              .listBuckets();

            if (bucketsError) {
              console.error('Error listing buckets:', bucketsError);
              throw new Error(`Storage access error: ${bucketsError.message***REMOVED***`);
            ***REMOVED***

            const resumesBucket = buckets.find(b => b.name === 'resumes');
            if (!resumesBucket) {
              throw new Error('Resumes bucket not found. Please ensure it is created in Supabase.');
            ***REMOVED*** else {
              throw new Error(`Bucket exists but not accessible: ${bucketError.message***REMOVED***`);
            ***REMOVED***
          ***REMOVED***

          const fileName = `${session.user.id***REMOVED***-${Math.random().toString(36).substring(7)***REMOVED***.${fileExt***REMOVED***`;

          // Upload the file
          const { error: uploadError, data: uploadData ***REMOVED*** = await supabase.storage
            .from('resumes')
            .upload(fileName, resumeFile, {
              cacheControl: '3600',
              upsert: true,
              contentType: resumeFile.type // Explicitly set the content type
            ***REMOVED***);

          if (uploadError) {
            console.error('Resume upload error:', uploadError);
            throw new Error(`Upload failed: ${uploadError.message***REMOVED***`);
          ***REMOVED***

          console.log('Upload successful:', uploadData);

          // Get the public URL
          const { data: { publicUrl ***REMOVED*** ***REMOVED*** = supabase.storage
            .from('resumes')
            .getPublicUrl(fileName);

          console.log('Generated public URL:', publicUrl);
          updateData.default_resume_url = publicUrl;

        ***REMOVED*** catch (uploadError) {
          console.error('Resume upload error:', uploadError);
          throw new Error(uploadError.message || 'Failed to upload resume');
        ***REMOVED***
      ***REMOVED***

      // Update the profile
      const { data, error: updateError ***REMOVED*** = await supabase
        .from('profiles')
        .update(updateData)
        .eq('id', session.user.id)
        .select()
        .single();

      if (updateError) {
        console.error('Profile update error:', updateError);
        throw new Error('Failed to update profile: ' + updateError.message);
      ***REMOVED***

      // Update local state with the returned data
      if (data) {
        setProfile(prev => ({
          ...prev,
          ...data
        ***REMOVED***));
        setSuccess('Profile updated successfully!');
        // Reset the file input
        const fileInput = document.getElementById('resume');
        if (fileInput) fileInput.value = '';
        setResumeFile(null);
      ***REMOVED***
    ***REMOVED*** catch (error) {
      console.error('Profile update error:', error);
      setError(error.message || 'An unexpected error occurred');
      // Reset the file input on error
      const fileInput = document.getElementById('resume');
      if (fileInput) fileInput.value = '';
      setResumeFile(null);
    ***REMOVED*** finally {
      setUpdating(false);
    ***REMOVED***
  ***REMOVED***

  if (loading) {
    return (
      <div className="container mx-auto p-4 max-w-2xl">
        <div className="animate-pulse">
          <div className="h-8 bg-gray-200 rounded w-1/3 mb-6"></div>
          <div className="space-y-4">
            <div className="h-12 bg-gray-200 rounded"></div>
            <div className="h-12 bg-gray-200 rounded"></div>
            <div className="h-12 bg-gray-200 rounded"></div>
          </div>
        </div>
      </div>
    );
  ***REMOVED***

  return (
    <div className="container mx-auto p-4 max-w-2xl">
      <h1 className="text-2xl font-bold mb-6">Profile Settings</h1>
      
      {error && (
        <div className="bg-red-50 text-red-600 p-4 rounded-md mb-4">
          {error***REMOVED***
        </div>
      )***REMOVED***
      
      {success && (
        <div className="bg-green-50 text-green-600 p-4 rounded-md mb-4">
          {success***REMOVED***
        </div>
      )***REMOVED***

      <form onSubmit={handleSubmit***REMOVED*** className="space-y-6">
        <div>
          <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
            Full Name
          </label>
          <input
            type="text"
            id="name"
            value={profile.name || ''***REMOVED***
            onChange={(e) => setProfile({ ...profile, name: e.target.value ***REMOVED***)***REMOVED***
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>

        <div>
          <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
            Email
          </label>
          <input
            type="email"
            id="email"
            value={profile.email || ''***REMOVED***
            disabled
            className="w-full px-3 py-2 border border-gray-200 rounded-md bg-gray-50 text-gray-500"
          />
          <p className="mt-1 text-sm text-gray-500">
            Email cannot be changed. Contact support if you need to update it.
          </p>
        </div>

        <div>
          <label htmlFor="default_cover_letter" className="block text-sm font-medium text-gray-700 mb-1">
            Default Cover Letter
          </label>
          <textarea
            id="default_cover_letter"
            value={profile.default_cover_letter || ''***REMOVED***
            onChange={(e) => setProfile({ ...profile, default_cover_letter: e.target.value ***REMOVED***)***REMOVED***
            rows={6***REMOVED***
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Write your default cover letter here. You can customize it when applying for specific jobs."
          />
        </div>

        <div>
          <label htmlFor="resume" className="block text-sm font-medium text-gray-700 mb-1">
            Default Resume
          </label>
          {profile.default_resume_url && (
            <div className="mb-2">
              <a
                href={profile.default_resume_url***REMOVED***
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 hover:text-blue-800 text-sm flex items-center"
              >
                <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2***REMOVED*** d="M15 13l-3 3m0 0l-3-3m3 3V8m0 13a9 9 0 110-18 9 9 0 010 18z" />
                </svg>
                View Current Resume
              </a>
            </div>
          )***REMOVED***
          <input
            type="file"
            id="resume"
            accept=".pdf,.doc,.docx"
            onChange={(e) => setResumeFile(e.target.files?.[0])***REMOVED***
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <p className="mt-1 text-sm text-gray-500">
            Accepted formats: PDF, DOC, DOCX
          </p>
        </div>

        <button
          type="submit"
          disabled={updating***REMOVED***
          className="w-full px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:bg-blue-300"
        >
          {updating ? 'Updating...' : 'Save Changes'***REMOVED***
        </button>
      </form>
    </div>
  );
***REMOVED*** 