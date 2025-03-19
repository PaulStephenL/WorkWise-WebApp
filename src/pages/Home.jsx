import React, { useEffect, useState ***REMOVED*** from 'react';
import { Link ***REMOVED*** from 'react-router-dom';
import { Search, MapPin, Briefcase ***REMOVED*** from 'lucide-react';
import { supabase ***REMOVED*** from '../lib/supabase';

function Home() {
  const [jobs, setJobs] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
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

      if (error) {
        console.error('Error fetching jobs:', error);
        throw error;
      ***REMOVED***
      console.log('Fetched jobs:', data);
      setJobs(data || []);
    ***REMOVED*** catch (error) {
      console.error('Error in fetchJobs function:', error);
    ***REMOVED*** finally {
      setLoading(false);
    ***REMOVED***
  ***REMOVED***

  const filteredJobs = jobs.filter(job =>
    job.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    job.company?.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    job.location.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="max-w-6xl mx-auto">
      {/* Hero Section */***REMOVED***
      <div className="bg-[#101d42] rounded-lg p-8 mb-8 text-white">
        <h1 className="text-4xl font-bold mb-4">
          Find Your Dream Job Today
        </h1>
        <p className="text-lg mb-6">
          Browse through thousands of job opportunities and take the next step in your career.
        </p>
        
        {/* Search Bar */***REMOVED***
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            placeholder="Search jobs, companies, or locations..."
            className="w-full pl-10 pr-4 py-3 rounded-lg bg-white text-gray-900"
            value={searchTerm***REMOVED***
            onChange={(e) => setSearchTerm(e.target.value)***REMOVED***
          />
        </div>
      </div>

      {/* Job Listings */***REMOVED***
      <div className="space-y-6">
        {loading ? (
          <div className="text-center py-8">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#ffdde2] mx-auto"></div>
          </div>
        ) : filteredJobs.length === 0 ? (
          <div className="text-center py-8 text-white">
            <p>No jobs found matching your search criteria.</p>
          </div>
        ) : (
          filteredJobs.map(job => (
            <div
              key={job.id***REMOVED***
              className="bg-white rounded-lg p-6 shadow-lg hover:shadow-xl transition-shadow"
            >
              <div className="flex items-start justify-between">
                <div className="flex items-start space-x-4">
                  {job.company?.logo_url && (
                    <img
                      src={job.company.logo_url***REMOVED***
                      alt={job.company.name***REMOVED***
                      className="w-16 h-16 rounded object-cover"
                    />
                  )***REMOVED***
                  <div>
                    <h2 className="text-xl font-semibold text-gray-900">
                      {job.title***REMOVED***
                    </h2>
                    <p className="text-[#798478] mb-2">
                      {job.company?.name***REMOVED***
                    </p>
                    <div className="flex items-center space-x-4 text-sm text-gray-600">
                      <span className="flex items-center">
                        <MapPin className="h-4 w-4 mr-1" />
                        {job.location***REMOVED***
                      </span>
                      <span className="flex items-center">
                        <Briefcase className="h-4 w-4 mr-1" />
                        {job.type***REMOVED***
                      </span>
                    </div>
                  </div>
                </div>
                <Link
                  to={`/jobs/${job.id***REMOVED***`***REMOVED***
                  className="px-4 py-2 bg-[#101d42] text-white rounded hover:bg-opacity-90 transition-colors"
                >
                  View Details
                </Link>
              </div>
            </div>
          ))
        )***REMOVED***
      </div>
    </div>
  );
***REMOVED***

export default Home;