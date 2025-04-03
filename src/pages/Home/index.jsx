import React, { useEffect, useState ***REMOVED*** from 'react';
import { useAuth ***REMOVED*** from '../../hooks/useAuth';
import { useJobs ***REMOVED*** from '../../hooks/useJobs';
import SearchSection from './SearchSection';
import JobList from './JobList';
import StatusMessage from '../../components/ui/StatusMessage';

function Home() {
  const [searchTerm, setSearchTerm] = useState('');
  const { user ***REMOVED*** = useAuth();
  const { jobs, loading, error, fetchJobs ***REMOVED*** = useJobs();

  useEffect(() => {
    fetchJobs();
  ***REMOVED***, [user, fetchJobs]); // Refetch when user changes

  const filteredJobs = jobs.filter(job =>
    job.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    job.company?.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    job.location.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="max-w-6xl mx-auto">
      <SearchSection 
        searchTerm={searchTerm***REMOVED*** 
        setSearchTerm={setSearchTerm***REMOVED*** 
      />
      
      {error && (
        <div className="mb-6">
          <StatusMessage 
            type="error" 
            message={`Error loading jobs: ${error***REMOVED***`***REMOVED*** 
          />
        </div>
      )***REMOVED***
      
      <JobList 
        jobs={filteredJobs***REMOVED*** 
        loading={loading***REMOVED*** 
      />
    </div>
  );
***REMOVED***

export default Home; 