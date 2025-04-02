import React, { useEffect, useState ***REMOVED*** from 'react';
import { useParams, useNavigate ***REMOVED*** from 'react-router-dom';
import { MapPin, Briefcase, Calendar, DollarSign, CheckCircle ***REMOVED*** from 'lucide-react';
import { supabase ***REMOVED*** from '../lib/supabase';

function JobDetails() {
  const { id ***REMOVED*** = useParams();
  const navigate = useNavigate();
  const [job, setJob] = useState(null);
  const [loading, setLoading] = useState(true);
  const [applying, setApplying] = useState(false);
  const [error, setError] = useState('');
  const [user, setUser] = useState(null);
  const [userRole, setUserRole] = useState(null);
  const [hasApplied, setHasApplied] = useState(false);

  useEffect(() => {
    fetchJob();
    fetchUserAndRole();
  ***REMOVED***, [id]);

  useEffect(() => {
    // Check application only after we have user info
    if (user && id) {
      checkApplication();
    ***REMOVED***
  ***REMOVED***, [user, id]);

  async function fetchUserAndRole() {
    try {
      const { data: { user: currentUser ***REMOVED***, error: userError ***REMOVED*** = await supabase.auth.getUser();
      
      if (userError) {
        console.error('Error getting current user:', userError);
        return;
      ***REMOVED***
      
      if (currentUser) {
        setUser(currentUser);
        
        // Fetch user role from profiles
        const { data: profileData, error: profileError ***REMOVED*** = await supabase
          .from('profiles')
          .select('role')
          .eq('id', currentUser.id)
          .single();
        
        if (profileError) {
          console.error('Error fetching user role:', profileError);
        ***REMOVED*** else if (profileData) {
          setUserRole(profileData.role || 'user');
        ***REMOVED***
      ***REMOVED***
    ***REMOVED*** catch (error) {
      console.error('Error fetching user and role:', error);
    ***REMOVED***
  ***REMOVED***

  async function fetchJob() {
    try {
      if (!id) return;

      const { data, error ***REMOVED*** = await supabase
        .from('jobs')
        .select(`
          *,
          company:companies(*)
        `)
        .eq('id', id)
        .single();

      if (error) throw error;
      setJob(data);
    ***REMOVED*** catch (error) {
      console.error('Error fetching job:', error);
    ***REMOVED*** finally {
      setLoading(false);
    ***REMOVED***
  ***REMOVED***

  async function checkApplication() {
    try {
      if (!user || !id) return;

      const { data, error ***REMOVED*** = await supabase
        .from('applications')
        .select('id')
        .eq('job_id', id)
        .eq('user_id', user.id)
        .single();

      if (error && error.code !== 'PGRST116') throw error;
      setHasApplied(!!data);
    ***REMOVED*** catch (error) {
      console.error('Error checking application:', error);
    ***REMOVED***
  ***REMOVED***

  async function handleApply() {
    try {
      if (!user) {
        navigate('/login');
        return;
      ***REMOVED***
      
      // Prevent admin users from applying
      if (userRole === 'admin') {
        setError("Admin users cannot apply for jobs");
        return;
      ***REMOVED***

      setApplying(true);
      const { error ***REMOVED*** = await supabase
        .from('applications')
        .insert({
          job_id: id,
          user_id: user.id,
          status: 'pending'
        ***REMOVED***);

      if (error) throw error;
      setHasApplied(true);
    ***REMOVED*** catch (error) {
      setError(error instanceof Error ? error.message : 'Failed to apply');
    ***REMOVED*** finally {
      setApplying(false);
    ***REMOVED***
  ***REMOVED***

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[400px]">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#ffdde2]"></div>
      </div>
    );
  ***REMOVED***

  if (!job) {
    return (
      <div className="text-center py-8 text-white">
        <p>Job not found</p>
      </div>
    );
  ***REMOVED***

  return (
    <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-lg overflow-hidden">
      <div className="p-8">
        <div className="flex items-start justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">{job.title***REMOVED***</h1>
            <div className="flex items-center space-x-4 text-gray-600 mb-6">
              <span className="flex items-center">
                <Briefcase className="h-5 w-5 mr-1" />
                {job.company?.name***REMOVED***
              </span>
              <span className="flex items-center">
                <MapPin className="h-5 w-5 mr-1" />
                {job.location***REMOVED***
              </span>
              <span className="flex items-center">
                <Calendar className="h-5 w-5 mr-1" />
                {new Date(job.deadline).toLocaleDateString()***REMOVED***
              </span>
            </div>
          </div>
          
          {job.salary_range && (
            <div className="flex items-center text-[#798478] font-semibold">
              <DollarSign className="h-5 w-5 mr-1" />
              {job.salary_range***REMOVED***
            </div>
          )***REMOVED***
        </div>

        <div className="prose max-w-none mb-8">
          <h2 className="text-xl font-semibold mb-4">Job Description</h2>
          <p className="whitespace-pre-wrap">{job.description***REMOVED***</p>

          <h2 className="text-xl font-semibold mt-8 mb-4">Qualifications</h2>
          <ul className="space-y-2">
            {job.qualifications.map((qualification, index) => (
              <li key={index***REMOVED*** className="flex items-start">
                <CheckCircle className="h-5 w-5 mr-2 text-green-500 flex-shrink-0 mt-1" />
                <span>{qualification***REMOVED***</span>
              </li>
            ))***REMOVED***
          </ul>
        </div>

        {error && (
          <div className="mb-4 p-4 bg-red-50 text-red-700 rounded-md">
            {error***REMOVED***
          </div>
        )***REMOVED***

        {userRole === 'admin' ? (
          <div className="w-full py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-gray-400 text-center">
            Admin users cannot apply for jobs
          </div>
        ) : (
          <button
            onClick={handleApply***REMOVED***
            disabled={hasApplied || applying***REMOVED***
            className="w-full py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-[#101d42] hover:bg-opacity-90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#101d42] disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {hasApplied ? 'Application Submitted' : applying ? 'Applying...' : 'Apply Now'***REMOVED***
          </button>
        )***REMOVED***
      </div>
    </div>
  );
***REMOVED***

export default JobDetails;