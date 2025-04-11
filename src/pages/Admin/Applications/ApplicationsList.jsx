import React, { useState, useEffect ***REMOVED*** from 'react';
import { Link ***REMOVED*** from 'react-router-dom';
import { supabase ***REMOVED*** from '../../../lib/supabase';
import { toast ***REMOVED*** from 'react-hot-toast';

const ApplicationsList = () => {
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [updatingStatuses, setUpdatingStatuses] = useState({***REMOVED***);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchApplications();
  ***REMOVED***, []);

  const fetchApplications = async () => {
    try {
      setLoading(true);
      setError(null);
      console.log('Fetching applications from Supabase...');
      
      // First, let's check if we can access the applications table at all
      const { count, error: countError ***REMOVED*** = await supabase
        .from('applications')
        .select('*', { count: 'exact', head: true ***REMOVED***);
      
      if (countError) {
        console.error('Error checking applications count:', countError);
        setError(`Database access error: ${countError.message***REMOVED***`);
        toast.error(`Database access error: ${countError.message***REMOVED***`);
        return;
      ***REMOVED***
      
      console.log(`Found ${count***REMOVED*** applications in the database`);
      
      // Now fetch the full application data with a simpler query first
      const { data, error ***REMOVED*** = await supabase
        .from('applications')
        .select('id, status, created_at, user_id, job_id')
        .order('created_at', { ascending: false ***REMOVED***);

      if (error) {
        console.error('Error fetching applications:', error);
        setError(`Error fetching applications: ${error.message***REMOVED***`);
        toast.error(`Failed to load applications: ${error.message***REMOVED***`);
        throw error;
      ***REMOVED***
      
      console.log('Applications data:', data);
      
      if (!data || data.length === 0) {
        console.log('No applications found in the response');
        toast.error('No applications found in the database');
        setApplications([]);
        return;
      ***REMOVED***
      
      console.log(`Successfully loaded ${data.length***REMOVED*** applications`);
      
      // Now fetch the related data for each application
      const enrichedApplications = await Promise.all(
        data.map(async (application) => {
          // Fetch job details
          let jobDetails = null;
          if (application.job_id) {
            const { data: jobData, error: jobError ***REMOVED*** = await supabase
              .from('jobs')
              .select('id, title, company_id')
              .eq('id', application.job_id)
              .single();
            
            if (!jobError && jobData) {
              jobDetails = jobData;
              
              // Fetch company details if we have a company_id
              if (jobData.company_id) {
                const { data: companyData, error: companyError ***REMOVED*** = await supabase
                  .from('companies')
                  .select('id, name')
                  .eq('id', jobData.company_id)
                  .single();
                
                if (!companyError && companyData) {
                  jobDetails.companies = companyData;
                ***REMOVED***
              ***REMOVED***
            ***REMOVED***
          ***REMOVED***
          
          // Fetch user profile details
          let profileDetails = null;
          if (application.user_id) {
            const { data: profileData, error: profileError ***REMOVED*** = await supabase
              .from('profiles')
              .select('*')  // Select all fields to ensure we get everything we need
              .eq('id', application.user_id)
              .single();
            
            if (!profileError && profileData) {
              console.log('Profile data loaded:', profileData);
              profileDetails = profileData;
            ***REMOVED*** else {
              console.error('Error loading profile:', profileError);
            ***REMOVED***
          ***REMOVED***
          
          // Return enriched application data
          return {
            ...application,
            jobs: jobDetails,
            profiles: profileDetails
          ***REMOVED***;
        ***REMOVED***)
      );
      
      setApplications(enrichedApplications);
    ***REMOVED*** catch (error) {
      console.error('Error in fetchApplications:', error);
      setError(`Unexpected error: ${error.message***REMOVED***`);
    ***REMOVED*** finally {
      setLoading(false);
    ***REMOVED***
  ***REMOVED***;

  const handleStatusChange = async (applicationId, newStatus) => {
    if (!applicationId) {
      toast.error('Application ID is missing');
      return;
    ***REMOVED***

    try {
      setUpdatingStatuses(prev => ({ ...prev, [applicationId]: true ***REMOVED***));
      
      const { error ***REMOVED*** = await supabase
        .from('applications')
        .update({ status: newStatus ***REMOVED***)
        .eq('id', applicationId);
      
      if (error) {
        console.error('Error updating status:', error);
        throw error;
      ***REMOVED***
      
      setApplications(prevApplications => 
        prevApplications.map(app => 
          app.id === applicationId ? { ...app, status: newStatus ***REMOVED*** : app
        )
      );
      
      toast.success(`Status updated to ${newStatus***REMOVED***`);
    ***REMOVED*** catch (error) {
      console.error('Failed to update status:', error);
      toast.error(error.message || 'Failed to update status');
    ***REMOVED*** finally {
      setUpdatingStatuses(prev => ({ ...prev, [applicationId]: false ***REMOVED***));
    ***REMOVED***
  ***REMOVED***;

  const getStatusBadgeClass = (status) => {
    const statusColors = {
      pending: "bg-yellow-100 text-yellow-800",
      reviewing: "bg-blue-100 text-blue-800",
      accepted: "bg-green-100 text-green-800",
      rejected: "bg-red-100 text-red-800"
    ***REMOVED***;
    
    return `inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
      statusColors[status] || "bg-gray-100 text-gray-800"
    ***REMOVED***`;
  ***REMOVED***;

  if (loading) {
    return (
      <div className="flex justify-center p-12">
        <p className="text-gray-500">Loading applications...</p>
      </div>
    );
  ***REMOVED***

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Applications</h1>
        <button 
          onClick={() => {
            toast.success('Refreshing applications...');
            fetchApplications();
          ***REMOVED******REMOVED***
          className="bg-gray-100 hover:bg-gray-200 text-gray-800 px-4 py-2 rounded"
        >
          Refresh
        </button>
      </div>

      {error && (
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded mb-4">
          <p className="font-medium">Error loading applications</p>
          <p className="text-sm">{error***REMOVED***</p>
        </div>
      )***REMOVED***

      {applications.length === 0 ? (
        <div className="bg-white p-8 rounded shadow text-center">
          <p className="text-gray-500">No applications found.</p>
          <div className="mt-4">
            <button 
              onClick={fetchApplications***REMOVED***
              className="text-blue-600 hover:text-blue-800 underline"
            >
              Try again
            </button>
          </div>
        </div>
      ) : (
        <div className="bg-white rounded-lg shadow overflow-hidden">
          <table className="min-w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Job Title</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Applicant</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {applications.map(application => (
                <tr key={application.id***REMOVED*** className="hover:bg-gray-50">
                  <td className="px-6 py-4">
                    {application.jobs?.title || 'Unknown Job'***REMOVED***
                    {application.jobs?.companies && (
                      <div className="text-sm text-gray-500">
                        {application.jobs.companies.name***REMOVED***
                      </div>
                    )***REMOVED***
                  </td>
                  <td className="px-6 py-4">
                    {application.profiles?.name || 'Unknown User'***REMOVED***
                    {application.profiles?.email && (
                      <div className="text-sm text-gray-500">
                        {application.profiles.email***REMOVED***
                      </div>
                    )***REMOVED***
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex flex-col space-y-2">
                      <span className={getStatusBadgeClass(application.status)***REMOVED***>
                        {application.status?.charAt(0).toUpperCase() + application.status?.slice(1) || 'Unknown'***REMOVED***
                      </span>
                      <select
                        value={application.status || ''***REMOVED***
                        onChange={(e) => {
                          const newStatus = e.target.value;
                          handleStatusChange(application.id, newStatus);
                        ***REMOVED******REMOVED***
                        className={`mt-1 p-2 text-sm border rounded w-full ${updatingStatuses[application.id] ? 'opacity-50 cursor-not-allowed' : ''***REMOVED***`***REMOVED***
                        disabled={updatingStatuses[application.id]***REMOVED***
                      >
                        <option value="pending">Pending</option>
                        <option value="reviewing">Reviewing</option>
                        <option value="accepted">Accepted</option>
                        <option value="rejected">Rejected</option>
                      </select>
                      {updatingStatuses[application.id] && (
                        <div className="mt-1 text-xs text-gray-500">Updating...</div>
                      )***REMOVED***
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <Link 
                      to={`/admin/applications/${application.id***REMOVED***`***REMOVED***
                      className="text-indigo-600 hover:text-indigo-900 bg-indigo-50 hover:bg-indigo-100 px-3 py-1 rounded"
                    >
                      View Details
                    </Link>
                  </td>
                </tr>
              ))***REMOVED***
            </tbody>
          </table>
        </div>
      )***REMOVED***
    </div>
  );
***REMOVED***;

export default ApplicationsList; 