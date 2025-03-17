import React, { useState, useEffect ***REMOVED*** from 'react';
import { useParams, useNavigate ***REMOVED*** from 'react-router-dom';
import { supabase ***REMOVED*** from '../../../lib/supabase';
import { toast ***REMOVED*** from 'react-hot-toast';

const CompanyDetails = () => {
  const { id ***REMOVED*** = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [company, setCompany] = useState({
    name: '',
    description: '',
    location: '',
    logo_url: ''
  ***REMOVED***);
  const [errors, setErrors] = useState({***REMOVED***);
  const isEditMode = !!id;

  useEffect(() => {
    if (isEditMode) {
      fetchCompanyDetails();
    ***REMOVED***
  ***REMOVED***, [id]);

  const fetchCompanyDetails = async () => {
    try {
      setLoading(true);
      const { data, error ***REMOVED*** = await supabase
        .from('companies')
        .select('*')
        .eq('id', id)
        .single();

      if (error) throw error;
      
      if (data) {
        setCompany(data);
      ***REMOVED***
    ***REMOVED*** catch (error) {
      console.error('Error fetching company details:', error);
      toast.error('Failed to load company details');
    ***REMOVED*** finally {
      setLoading(false);
    ***REMOVED***
  ***REMOVED***;

  const validateForm = () => {
    const newErrors = {***REMOVED***;
    if (!company.name) newErrors.name = 'Company name is required';
    if (!company.location) newErrors.location = 'Location is required';
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  ***REMOVED***;

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) return;
    
    try {
      setLoading(true);
      
      let result;
      
      if (isEditMode) {
        // Update existing company
        result = await supabase
          .from('companies')
          .update({
            name: company.name,
            description: company.description,
            location: company.location,
            logo_url: company.logo_url
          ***REMOVED***)
          .eq('id', id);
          
        if (result.error) throw result.error;
        toast.success('Company updated successfully');
      ***REMOVED*** else {
        // Create new company
        result = await supabase
          .from('companies')
          .insert([{
            name: company.name,
            description: company.description,
            location: company.location,
            logo_url: company.logo_url
          ***REMOVED***]);
          
        if (result.error) throw result.error;
        toast.success('Company created successfully');
      ***REMOVED***
      
      // Navigate back to companies list
      navigate('/admin/companies');
    ***REMOVED*** catch (error) {
      console.error('Error saving company:', error);
      toast.error(error.message || 'Failed to save company');
    ***REMOVED*** finally {
      setLoading(false);
    ***REMOVED***
  ***REMOVED***;

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">{isEditMode ? 'Edit' : 'Add'***REMOVED*** Company</h1>
      <form onSubmit={handleSubmit***REMOVED***>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-1">Name*</label>
          <input
            type="text"
            value={company.name***REMOVED***
            onChange={(e) => setCompany({...company, name: e.target.value***REMOVED***)***REMOVED***
            className={`w-full p-2 border rounded ${errors.name ? 'border-red-500' : 'border-gray-300'***REMOVED***`***REMOVED***
          />
          {errors.name && <p className="mt-1 text-sm text-red-500">{errors.name***REMOVED***</p>***REMOVED***
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
          <textarea
            value={company.description***REMOVED***
            onChange={(e) => setCompany({...company, description: e.target.value***REMOVED***)***REMOVED***
            className="w-full p-2 border border-gray-300 rounded"
            rows="4"
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-1">Location*</label>
          <input
            type="text"
            value={company.location***REMOVED***
            onChange={(e) => setCompany({...company, location: e.target.value***REMOVED***)***REMOVED***
            className={`w-full p-2 border rounded ${errors.location ? 'border-red-500' : 'border-gray-300'***REMOVED***`***REMOVED***
          />
          {errors.location && <p className="mt-1 text-sm text-red-500">{errors.location***REMOVED***</p>***REMOVED***
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-1">Logo URL</label>
          <input
            type="text"
            value={company.logo_url***REMOVED***
            onChange={(e) => setCompany({...company, logo_url: e.target.value***REMOVED***)***REMOVED***
            className="w-full p-2 border border-gray-300 rounded"
          />
        </div>
        <div className="flex gap-3">
          <button 
            type="submit" 
            className="bg-[#101d42] text-white px-4 py-2 rounded hover:bg-opacity-90"
            disabled={loading***REMOVED***
          >
            {loading ? 'Saving...' : 'Save Company'***REMOVED***
          </button>
          <button 
            type="button" 
            className="border border-gray-300 text-gray-700 px-4 py-2 rounded hover:bg-gray-50"
            onClick={() => navigate('/admin/companies')***REMOVED***
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
***REMOVED***;

export default CompanyDetails; 