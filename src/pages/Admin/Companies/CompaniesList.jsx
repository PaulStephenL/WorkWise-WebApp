import React, { useState, useEffect ***REMOVED*** from 'react';
import { supabase ***REMOVED*** from '../../../lib/supabase';
import { MapPin ***REMOVED*** from 'lucide-react';
import { Link, useNavigate ***REMOVED*** from 'react-router-dom';
import { toast ***REMOVED*** from 'react-hot-toast';

function CompaniesList() {
  const [companies, setCompanies] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    fetchCompanies();
  ***REMOVED***, []);

  async function fetchCompanies() {
    try {
      setLoading(true);
      const { data, error ***REMOVED*** = await supabase
        .from('companies')
        .select('*')
        .order('name');

      if (error) throw error;
      setCompanies(data || []);
    ***REMOVED*** catch (error) {
      console.error('Error fetching companies:', error);
      toast.error('Failed to load companies');
    ***REMOVED*** finally {
      setLoading(false);
    ***REMOVED***
  ***REMOVED***

  async function handleDelete(id, companyName) {
    if (!confirm(`Are you sure you want to delete ${companyName***REMOVED***?`)) return;
    
    try {
      setLoading(true);
      
      // First check if the company has any associated jobs
      const { data: jobs, error: jobsError ***REMOVED*** = await supabase
        .from('jobs')
        .select('id')
        .eq('company_id', id);
        
      if (jobsError) throw jobsError;
      
      if (jobs && jobs.length > 0) {
        toast.error(`Cannot delete company that has ${jobs.length***REMOVED*** job listings. Remove the job listings first.`);
        return;
      ***REMOVED***
      
      // Now delete the company
      const { error ***REMOVED*** = await supabase
        .from('companies')
        .delete()
        .eq('id', id);
      
      if (error) throw error;
      
      toast.success('Company deleted successfully');
      // Refresh the company list
      fetchCompanies();
    ***REMOVED*** catch (error) {
      console.error('Error deleting company:', error);
      toast.error(error.message || 'Error deleting company');
    ***REMOVED*** finally {
      setLoading(false);
    ***REMOVED***
  ***REMOVED***

  if (loading && companies.length === 0) {
    return (
      <div className="flex justify-center items-center min-h-[200px]">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#ffdde2]"></div>
      </div>
    );
  ***REMOVED***

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">Companies</h2>
        <Link to="/admin/companies/new" className="bg-[#101d42] text-white px-4 py-2 rounded hover:bg-opacity-90">
          Add New Company
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {companies.length === 0 ? (
          <p className="text-gray-500 col-span-3 text-center py-8">No companies found. Add your first company!</p>
        ) : (
          companies.map((company) => (
            <div key={company.id***REMOVED*** className="bg-white rounded-lg shadow p-6">
              <div className="flex items-center mb-4">
                {company.logo_url && (
                  <img
                    src={company.logo_url***REMOVED***
                    alt={company.name***REMOVED***
                    className="w-12 h-12 rounded object-cover mr-4"
                  />
                )***REMOVED***
                <h3 className="text-lg font-semibold">{company.name***REMOVED***</h3>
              </div>
              <p className="text-gray-600 text-sm mb-4 line-clamp-3">{company.description***REMOVED***</p>
              <div className="flex items-center text-sm text-gray-500 mb-4">
                <MapPin className="h-4 w-4 mr-1" />
                {company.location***REMOVED***
              </div>
              <div className="mt-4 flex justify-end space-x-2">
                <button 
                  onClick={() => navigate(`/admin/companies/${company.id***REMOVED***`)***REMOVED***
                  className="text-indigo-600 hover:text-indigo-900"
                >
                  Edit
                </button>
                <button 
                  onClick={() => handleDelete(company.id, company.name)***REMOVED***
                  className="text-red-600 hover:text-red-900"
                >
                  Delete
                </button>
              </div>
            </div>
          ))
        )***REMOVED***
      </div>
    </div>
  );
***REMOVED***

export default CompaniesList;