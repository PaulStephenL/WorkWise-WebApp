import React, { useState, useEffect ***REMOVED*** from 'react';

const ApplicationsList = () => {
  const [applications, setApplications] = useState([]);

  useEffect(() => {
    // TODO: Fetch applications from API
  ***REMOVED***, []);

  const handleStatusChange = (applicationId, newStatus) => {
    // TODO: Update application status
  ***REMOVED***;

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">Applications</h1>
      <table className="min-w-full bg-white">
        <thead>
          <tr>
            <th className="px-6 py-3">Job Title</th>
            <th className="px-6 py-3">Applicant</th>
            <th className="px-6 py-3">Status</th>
            <th className="px-6 py-3">Documents</th>
            <th className="px-6 py-3">Actions</th>
          </tr>
        </thead>
        <tbody>
          {applications.map(application => (
            <tr key={application.id***REMOVED***>
              <td className="px-6 py-4">{application.job_id***REMOVED***</td>
              <td className="px-6 py-4">{application.user_id***REMOVED***</td>
              <td className="px-6 py-4">
                <select
                  value={application.status***REMOVED***
                  onChange={(e) => handleStatusChange(application.id, e.target.value)***REMOVED***
                  className="p-2 border rounded"
                >
                  <option value="pending">Pending</option>
                  <option value="reviewing">Reviewing</option>
                  <option value="accepted">Accepted</option>
                  <option value="rejected">Rejected</option>
                </select>
              </td>
              <td className="px-6 py-4">
                <a href={application.resume_url***REMOVED*** target="_blank" rel="noopener noreferrer">Resume</a>
                {application.cover_letter && (
                  <a href={application.cover_letter***REMOVED*** target="_blank" rel="noopener noreferrer" className="ml-2">Cover Letter</a>
                )***REMOVED***
              </td>
              <td className="px-6 py-4">
                <button className="text-blue-500">View Details</button>
              </td>
            </tr>
          ))***REMOVED***
        </tbody>
      </table>
    </div>
  );
***REMOVED***;

export default ApplicationsList; 