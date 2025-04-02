import React, { useState, useEffect ***REMOVED*** from 'react';
import { Link ***REMOVED*** from 'react-router-dom';
import { supabase ***REMOVED*** from '../../../lib/supabase';

const JobsList = () => {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [companies, setCompanies] = useState({***REMOVED***);

  useEffect(() => {
    fetchJobs();
    fetchCompanies();
  ***REMOVED***, []);

  async function fetchJobs() {
    setLoading(true);
    try {
      const { data, error ***REMOVED*** = await supabase
        .from('jobs')
        .select('*')
        .order('created_at', { ascending: false ***REMOVED***);
      
      if (error) throw error;
      setJobs(data || []);
    ***REMOVED*** catch (error) {
      console.error('Error fetching jobs:', error);
    ***REMOVED*** finally {
      setLoading(false);
    ***REMOVED***
  ***REMOVED***

  async function fetchCompanies() {
    try {
      const { data, error ***REMOVED*** = await supabase
        .from('companies')
        .select('id, name');
      
      if (error) throw error;
      
      // Convert array to object for easier lookup
      const companiesObj = {***REMOVED***;
      data.forEach(company => {
        companiesObj[company.id] = company.name;
      ***REMOVED***);
      
      setCompanies(companiesObj);
    ***REMOVED*** catch (error) {
      console.error('Error fetching companies:', error);
    ***REMOVED***
  ***REMOVED***

  async function handleDelete(id) {
    if (!confirm('Are you sure you want to delete this job?')) return;
    
    try {
      setLoading(true);
      const { error ***REMOVED*** = await supabase
        .from('jobs')
        .delete()
        .eq('id', id);
      
      if (error) throw error;
      
      // Refresh the job list after deletion
      fetchJobs();
    ***REMOVED*** catch (error) {
      console.error('Error deleting job:', error);
      alert('Error deleting job. Please try again.');
    ***REMOVED*** finally {
      setLoading(false);
    ***REMOVED***
  ***REMOVED***

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[400px]">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#101d42]"></div>
      </div>
    );
  ***REMOVED***

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Jobs</h1>
        <Link to="/admin/jobs/new" className="bg-[#101d42] text-white px-4 py-2 rounded hover:bg-opacity-90">
          Add Job
        </Link>
      </div>

      {jobs.length === 0 ? (
        <div className="bg-white p-6 rounded shadow text-center">
          <p className="text-gray-500">No jobs found. Create your first job!</p>
        </div>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white rounded-lg shadow divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Title</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Company</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Type</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Deadline</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {jobs.map(job => (
                <tr key={job.id***REMOVED*** className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900">{job.title***REMOVED***</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-500">{companies[job.company_id] || job.company_id***REMOVED***</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-500">{job.type***REMOVED***</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-500">
                      {job.deadline ? new Date(job.deadline).toLocaleDateString() : 'N/A'***REMOVED***
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm">
                    <Link 
                      to={`/admin/jobs/${job.id***REMOVED***`***REMOVED*** 
                      className="text-indigo-600 hover:text-indigo-900 mr-4"
                    >
                      Edit
                    </Link>
                    <button 
                      onClick={() => handleDelete(job.id)***REMOVED*** 
                      className="text-red-600 hover:text-red-900"
                    >
                      Delete
                    </button>
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

export default JobsList; 