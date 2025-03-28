import React, { useState, useEffect ***REMOVED*** from 'react';
import { Link ***REMOVED*** from 'react-router-dom';

const JobsList = () => {
  const [jobs, setJobs] = useState([]);

  useEffect(() => {
    // TODO: Fetch jobs from API
  ***REMOVED***, []);

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">Jobs</h1>
      <Link to="/admin/jobs/new" className="bg-blue-500 text-white px-4 py-2 rounded mb-4 inline-block">
        Add Job
      </Link>
      <table className="min-w-full bg-white">
        <thead>
          <tr>
            <th className="px-6 py-3">Title</th>
            <th className="px-6 py-3">Company</th>
            <th className="px-6 py-3">Type</th>
            <th className="px-6 py-3">Deadline</th>
            <th className="px-6 py-3">Actions</th>
          </tr>
        </thead>
        <tbody>
          {jobs.map(job => (
            <tr key={job.id***REMOVED***>
              <td className="px-6 py-4">{job.title***REMOVED***</td>
              <td className="px-6 py-4">{job.company_id***REMOVED***</td>
              <td className="px-6 py-4">{job.type***REMOVED***</td>
              <td className="px-6 py-4">{job.deadline***REMOVED***</td>
              <td className="px-6 py-4">
                <Link to={`/admin/jobs/${job.id***REMOVED***`***REMOVED***>Edit</Link>
              </td>
            </tr>
          ))***REMOVED***
        </tbody>
      </table>
    </div>
  );
***REMOVED***;

export default JobsList; 