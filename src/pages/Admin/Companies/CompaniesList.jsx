import React, { useState, useEffect ***REMOVED*** from 'react';
import { supabase ***REMOVED*** from '../../../lib/supabase';
import { MapPin ***REMOVED*** from 'lucide-react';
import { Link, useNavigate ***REMOVED*** from 'react-router-dom';
import { toast ***REMOVED*** from 'react-hot-toast';

const CompaniesList = () => {
  const [companies, setCompanies] = useState([]);

  useEffect(() => {
    // TODO: Fetch companies from API
  ***REMOVED***, []);

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">Companies</h1>
      <Link to="/admin/companies/new" className="bg-blue-500 text-white px-4 py-2 rounded mb-4 inline-block">
        Add Company
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