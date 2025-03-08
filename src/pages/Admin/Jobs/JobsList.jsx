import React, { useState, useEffect ***REMOVED*** from 'react';
import { Link ***REMOVED*** from 'react-router-dom';
import { supabase ***REMOVED*** from '../../../lib/supabase';

const JobsList = () => {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchJobs();
  ***REMOVED***, []);

  async function fetchJobs() {
    try {
      const { data, error ***REMOVED*** = await supabase
        .from('jobs')
        .select(`
          *,
          company:companies(*)
        `)
        .order('created_at', { ascending: false ***REMOVED***);

      if (error) throw error;
      setJobs(data || []);
    ***REMOVED*** catch (error) {
      console.error('Error fetching jobs:', error);
    ***REMOVED*** finally {
      setLoading(false);
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
    return <div>Loading...</div>;
  ***REMOVED***

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">Jobs</h2>
        <Link to="/admin/jobs/new" className="bg-[#101d42] text-white px-4 py-2 rounded hover:bg-opacity-90">
          Add New Job
        </Link>
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead>
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Title
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Company
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Location
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Type
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {jobs.map((job) => (
              <tr key={job.id***REMOVED***>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm font-medium text-gray-900">{job.title***REMOVED***</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-500">{job.company?.name***REMOVED***</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-500">{job.location***REMOVED***</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-500">{job.type***REMOVED***</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  <Link to={`/admin/jobs/${job.id***REMOVED***`***REMOVED*** className="text-indigo-600 hover:text-indigo-900 mr-4">Edit</Link>
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
    </div>
  );
***REMOVED***;

export default JobsList;