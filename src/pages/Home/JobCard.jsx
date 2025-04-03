import React from 'react';
import { Link ***REMOVED*** from 'react-router-dom';
import { MapPin, Briefcase ***REMOVED*** from 'lucide-react';

function JobCard({ job ***REMOVED***) {
  return (
    <div className="bg-white rounded-lg p-6 shadow-lg hover:shadow-xl transition-shadow">
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
  );
***REMOVED***

export default JobCard; 