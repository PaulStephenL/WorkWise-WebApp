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
      <table className="min-w-full bg-white">
        <thead>
          <tr>
            <th className="px-6 py-3">Name</th>
            <th className="px-6 py-3">Location</th>
            <th className="px-6 py-3">Actions</th>
          </tr>
        </thead>
        <tbody>
          {companies.map(company => (
            <tr key={company.id***REMOVED***>
              <td className="px-6 py-4">{company.name***REMOVED***</td>
              <td className="px-6 py-4">{company.location***REMOVED***</td>
              <td className="px-6 py-4">
                <Link to={`/admin/companies/${company.id***REMOVED***`***REMOVED***>Edit</Link>
              </td>
            </tr>
          ))***REMOVED***
        </tbody>
      </table>
    </div>
  );
***REMOVED***;

export default CompaniesList; 