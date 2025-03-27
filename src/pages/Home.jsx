import React, { useEffect, useState ***REMOVED*** from 'react';
import { Link ***REMOVED*** from 'react-router-dom';
import { Search, MapPin, Briefcase ***REMOVED*** from 'lucide-react';
import { supabase ***REMOVED*** from '../lib/supabase';

function Home() {
  const [jobs, setJobs] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null);

  useEffect(() => {
    // Get initial session
    supabase.auth.getSession().then(({ data: { session ***REMOVED*** ***REMOVED***) => {
      setUser(session?.user ?? null);
    ***REMOVED***);

    // Listen for auth changes
    const { data: { subscription ***REMOVED*** ***REMOVED*** = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
    ***REMOVED***);

    return () => subscription.unsubscribe();
  ***REMOVED***, []);

  useEffect(() => {
    fetchJobs();
  ***REMOVED***, [user]); // Refetch when user changes

  async function fetchJobs() {
    try {
      setLoading(true);
      console.log('Fetching jobs...');
      
      // Use a simpler query without joins
      const { data, error ***REMOVED*** = await supabase
        .from('jobs')
        .select(`
          id,
          title,
          description,
          location,
          type,
          salary_range,
          deadline,
          created_at,
          company_id,
          companies (
            id,
            name,
            logo_url
          )
        `)
        .order('created_at', { ascending: false ***REMOVED***);

      if (error) {
        console.error('Error fetching jobs:', error);
        throw error;
      ***REMOVED***

      console.log('Fetched jobs:', data);
      
      if (!data || data.length === 0) {
        console.log('No jobs found in the database');
        setJobs([]);
      ***REMOVED*** else {
        // Transform the data to match the expected format
        const transformedJobs = data.map(job => ({
          ...job,
          company: job.companies
        ***REMOVED***));
        setJobs(transformedJobs);
      ***REMOVED***
    ***REMOVED*** catch (error) {
      console.error('Error in fetchJobs function:', error);
      setJobs([]);
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
          <div className="text-center py-8 text-gray-700">
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