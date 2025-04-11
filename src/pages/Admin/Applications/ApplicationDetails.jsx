import React, { useState, useEffect ***REMOVED*** from 'react';
import { useParams, Link ***REMOVED*** from 'react-router-dom';
import { supabase ***REMOVED*** from '../../../lib/supabase';
import { toast ***REMOVED*** from 'react-hot-toast';

const ApplicationDetails = () => {
  const { id ***REMOVED*** = useParams();
  const [application, setApplication] = useState(null);
  const [loading, setLoading] = useState(true);
  const [updatingStatus, setUpdatingStatus] = useState(false);
  const [error, setError] = useState(null);

  // Status badge colors
  const statusColors = {
    pending: "bg-yellow-100 text-yellow-800",
    reviewing: "bg-blue-100 text-blue-800",
    accepted: "bg-green-100 text-green-800",
    rejected: "bg-red-100 text-red-800"
  ***REMOVED***;

  useEffect(() => {
    if (id) {
      fetchApplicationDetails();
    ***REMOVED***
  ***REMOVED***, [id]);

  const fetchApplicationDetails = async () => {
    try {
      setLoading(true);
      setError(null);
      console.log(`Fetching details for application ID: ${id***REMOVED***`);
      
      // First, fetch the basic application data
      const { data, error ***REMOVED*** = await supabase
        .from('applications')
        .select('id, status, resume_url, cover_letter, created_at, user_id, job_id')
        .eq('id', id)
        .single();

      if (error) {
        console.error('Error fetching application:', error);
        setError(`Error fetching application: ${error.message***REMOVED***`);
        toast.error('Failed to load application details');
        throw error;
      ***REMOVED***
      
      if (!data) {
        console.error('Application not found');
        setError('Application not found');
        setLoading(false);
        return;
      ***REMOVED***
      
      console.log('Basic application data loaded:', data);
      
      // Now fetch the related job details
      let jobDetails = null;
      if (data.job_id) {
        console.log('Fetching job details for job_id:', data.job_id);
        const { data: jobData, error: jobError ***REMOVED*** = await supabase
          .from('jobs')
          .select('id, title, company_id')  // Simplified to match ApplicationsList
          .eq('id', data.job_id)
          .single();
        
        if (jobError) {
          console.error('Error fetching job details:', jobError);
          toast.error('Failed to load job details');
        ***REMOVED*** else if (jobData) {
          console.log('Job details loaded:', jobData);
          jobDetails = jobData;
          
          // Fetch company details if we have a company_id
          if (jobData.company_id) {
            console.log('Fetching company details for company_id:', jobData.company_id);
            const { data: companyData, error: companyError ***REMOVED*** = await supabase
              .from('companies')
              .select('id, name')  // Simplified to match ApplicationsList
              .eq('id', jobData.company_id)
              .single();
            
            if (companyError) {
              console.error('Error fetching company details:', companyError);
              toast.error('Failed to load company details');
            ***REMOVED*** else if (companyData) {
              console.log('Company details loaded:', companyData);
              jobDetails.companies = companyData;
            ***REMOVED***
          ***REMOVED***
        ***REMOVED***
      ***REMOVED*** else {
        console.log('No job_id found in application data');
      ***REMOVED***
      
      // Fetch user profile details
      let profileDetails = null;
      if (data.user_id) {
        console.log('Fetching profile details for user_id:', data.user_id);
        const { data: profileData, error: profileError ***REMOVED*** = await supabase
          .from('profiles')
          .select('id, name, email, default_resume_url, default_cover_letter')
          .eq('id', data.user_id)
          .single();
        
        if (profileError) {
          console.error('Error fetching profile details:', profileError);
          toast.error('Failed to load profile details');
        ***REMOVED*** else if (profileData) {
          console.log('Profile details loaded:', profileData);
          profileDetails = profileData;
        ***REMOVED***
      ***REMOVED*** else {
        console.log('No user_id found in application data');
      ***REMOVED***
      
      // Combine all the data
      const enrichedApplication = {
        ...data,
        jobs: jobDetails,
        profiles: profileDetails
      ***REMOVED***;
      
      console.log('Final enriched application data:', enrichedApplication);
      if (!jobDetails) {
        console.warn('No job details were loaded');
      ***REMOVED***
      if (!profileDetails) {
        console.warn('No profile details were loaded');
      ***REMOVED***
      setApplication(enrichedApplication);
    ***REMOVED*** catch (error) {
      console.error('Error:', error);
      setError(`Unexpected error: ${error.message***REMOVED***`);
    ***REMOVED*** finally {
      setLoading(false);
    ***REMOVED***
  ***REMOVED***;

  const handleStatusChange = async (newStatus) => {
    if (!id) {
      toast.error('Application ID is missing');
      return;
    ***REMOVED***

    try {
      setUpdatingStatus(true);
      console.log(`Updating application ${id***REMOVED*** status to: ${newStatus***REMOVED***`);
      
      const { error ***REMOVED*** = await supabase
        .from('applications')
        .update({ status: newStatus ***REMOVED***)
        .eq('id', id);
      
      if (error) {
        console.error('Error updating status:', error);
        throw error;
      ***REMOVED***
      
      // Update local state
      setApplication(prev => prev ? { ...prev, status: newStatus ***REMOVED*** : null);
      toast.success(`Status updated to ${newStatus***REMOVED***`);
    ***REMOVED*** catch (error) {
      console.error('Failed to update status:', error);
      toast.error(error.message || 'Failed to update status');
    ***REMOVED*** finally {
      setUpdatingStatus(false);
    ***REMOVED***
  ***REMOVED***;

  const formatDate = (dateString) => {
    if (!dateString) return 'Unknown date';
    const date = new Date(dateString);
    return date.toLocaleDateString() + ' at ' + date.toLocaleTimeString();
  ***REMOVED***;

  if (loading) {
    return (
      <div className="p-6 flex justify-center items-center min-h-screen bg-gray-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading application details...</p>
        </div>
      </div>
    );
  ***REMOVED***

  if (error) {
    return (
      <div className="p-6 flex justify-center items-center min-h-screen bg-gray-50">
        <div className="bg-white p-8 rounded-lg shadow-md max-w-md w-full text-center">
          <svg className="w-16 h-16 text-red-500 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
          </svg>
          <h1 className="text-xl font-bold text-gray-800 mb-4">Error Loading Application</h1>
          <p className="text-gray-600 mb-6">{error***REMOVED***</p>
          <Link to="/admin/applications" className="inline-block bg-blue-500 hover:bg-blue-600 text-white font-medium py-2 px-4 rounded">
            Back to Applications
          </Link>
        </div>
      </div>
    );
  ***REMOVED***

  if (!application) {
    return (
      <div className="p-6 flex justify-center items-center min-h-screen bg-gray-50">
        <div className="bg-white p-8 rounded-lg shadow-md max-w-md w-full text-center">
          <svg className="w-16 h-16 text-red-500 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
          </svg>
          <h1 className="text-xl font-bold text-gray-800 mb-4">Application Not Found</h1>
          <p className="text-gray-600 mb-6">The application you're looking for doesn't exist or you may not have permission to view it.</p>
          <Link to="/admin/applications" className="inline-block bg-blue-500 hover:bg-blue-600 text-white font-medium py-2 px-4 rounded">
            Back to Applications
          </Link>
        </div>
      </div>
    );
  ***REMOVED***

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <div className="max-w-6xl mx-auto">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold text-gray-800">Application Details</h1>
          <Link to="/admin/applications" className="bg-gray-100 hover:bg-gray-200 text-gray-800 px-4 py-2 rounded flex items-center">
            <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18"></path>
            </svg>
            Back to Applications
          </Link>
        </div>

        <div className="bg-white rounded-lg shadow-md overflow-hidden mb-6">
          <div className="p-6 border-b">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-semibold text-gray-800">
                {application.jobs?.title || 'Unknown Position'***REMOVED*** 
                {application.jobs?.companies?.name && <span className="text-gray-600"> at {application.jobs.companies.name***REMOVED***</span>***REMOVED***
              </h2>
              <div className="flex space-x-2">
                <span className={`${statusColors[application.status] || 'bg-gray-100'***REMOVED*** px-3 py-1 rounded-full text-sm font-medium`***REMOVED***>
                  {application.status?.charAt(0)?.toUpperCase() + application.status?.slice(1) || 'Unknown'***REMOVED***
                </span>
              </div>
            </div>
            <p className="text-sm text-gray-500 mt-1">
              Applied on {formatDate(application.created_at)***REMOVED***
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 p-6">
            <div className="md:col-span-2">
              <div className="bg-gray-50 p-4 rounded-lg mb-6">
                <h3 className="font-medium text-gray-800 mb-3">Status Management</h3>
                <div className="flex flex-col space-y-3">
                  <div className="flex items-center space-x-3">
                    <span className="text-sm text-gray-600">Current Status:</span>
                    <span className={`${statusColors[application.status] || 'bg-gray-100'***REMOVED*** px-2 py-1 rounded text-sm font-medium`***REMOVED***>
                      {application.status?.charAt(0)?.toUpperCase() + application.status?.slice(1) || 'Unknown'***REMOVED***
                    </span>
                  </div>
                  
                  <div className="flex items-center space-x-3">
                    <label htmlFor="status" className="text-sm text-gray-600">Update Status:</label>
                    <select 
                      id="status"
                      value={application.status || ''***REMOVED***
                      onChange={(e) => handleStatusChange(e.target.value)***REMOVED***
                      className={`p-2 text-sm border rounded ${updatingStatus ? 'opacity-50 cursor-not-allowed' : ''***REMOVED***`***REMOVED***
                      disabled={updatingStatus***REMOVED***
                    >
                      <option value="pending">Pending</option>
                      <option value="reviewing">Reviewing</option>
                      <option value="accepted">Accepted</option>
                      <option value="rejected">Rejected</option>
                    </select>
                    
                    {updatingStatus && (
                      <span className="text-sm text-gray-500">Updating...</span>
                    )***REMOVED***
                  </div>
                </div>
              </div>
              
              <div className="mb-6">
                <h3 className="font-medium text-gray-800 mb-3">Job Details</h3>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h4 className="font-medium">{application.jobs?.title || 'Unknown Position'***REMOVED***</h4>
                  {application.jobs?.companies?.name && (
                    <p className="text-sm text-gray-600 mt-1">Company: {application.jobs.companies.name***REMOVED***</p>
                  )***REMOVED***
                </div>
              </div>
            </div>
            
            <div>
              <div className="bg-gray-50 p-4 rounded-lg mb-6">
                <h3 className="font-medium text-gray-800 mb-3">Applicant Information</h3>
                <div className="space-y-2">
                  <p className="text-sm">
                    <span className="font-medium text-gray-700">Name:</span> {application.profiles?.name || 'Unknown'***REMOVED***
                  </p>
                  {application.profiles?.email && (
                    <p className="text-sm">
                      <span className="font-medium text-gray-700">Email:</span> {application.profiles.email***REMOVED***
                    </p>
                  )***REMOVED***
                </div>
              </div>
              
              <div className="bg-gray-50 p-4 rounded-lg">
                <h3 className="font-medium text-gray-800 mb-3">Documents</h3>
                <div className="space-y-3">
                  {/* Application specific resume */***REMOVED***
                  {application.resume_url ? (
                    <a 
                      href={application.resume_url***REMOVED*** 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="flex items-center text-blue-600 hover:text-blue-800"
                    >
                      <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path>
                      </svg>
                      View Application Resume
                    </a>
                  ) : application.profiles?.default_resume_url ? (
                    <a 
                      href={application.profiles.default_resume_url***REMOVED*** 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="flex items-center text-blue-600 hover:text-blue-800"
                    >
                      <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path>
                      </svg>
                      View Resume
                    </a>
                  ) : (
                    <p className="text-sm text-gray-500">No resume provided</p>
                  )***REMOVED***
                  
                  {/* Application specific cover letter */***REMOVED***
                  {application.cover_letter ? (
                    <a 
                      href={application.cover_letter***REMOVED*** 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="flex items-center text-blue-600 hover:text-blue-800"
                    >
                      <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path>
                      </svg>
                      View Application Cover Letter
                    </a>
                  ) : application.profiles?.default_cover_letter ? (
                    <a 
                      href={application.profiles.default_cover_letter***REMOVED*** 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="flex items-center text-blue-600 hover:text-blue-800"
                    >
                      <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path>
                      </svg>
                      View Cover Letter
                    </a>
                  ) : (
                    <p className="text-sm text-gray-500">No cover letter provided</p>
                  )***REMOVED***
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
***REMOVED***;

export default ApplicationDetails; 