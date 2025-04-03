import React from 'react';
import { AlertCircle, CheckCircle, Info ***REMOVED*** from 'lucide-react';

function StatusMessage({ type, message ***REMOVED***) {
  if (!message) return null;

  const config = {
    error: {
      bgColor: 'bg-red-50',
      borderColor: 'border-red-400',
      textColor: 'text-red-700',
      Icon: AlertCircle
    ***REMOVED***,
    success: {
      bgColor: 'bg-green-50',
      borderColor: 'border-green-400',
      textColor: 'text-green-700',
      Icon: CheckCircle
    ***REMOVED***,
    info: {
      bgColor: 'bg-blue-50',
      borderColor: 'border-blue-400',
      textColor: 'text-blue-700',
      Icon: Info
    ***REMOVED***,
    warning: {
      bgColor: 'bg-yellow-50',
      borderColor: 'border-yellow-400',
      textColor: 'text-yellow-700',
      Icon: AlertCircle
    ***REMOVED***
  ***REMOVED***;

  const { bgColor, borderColor, textColor, Icon ***REMOVED*** = config[type] || config.info;

  return (
    <div className={`mb-4 p-4 ${bgColor***REMOVED*** border-l-4 ${borderColor***REMOVED*** ${textColor***REMOVED*** flex items-center`***REMOVED***>
      <Icon className="h-5 w-5 mr-2" />
      <p>{message***REMOVED***</p>
    </div>
  );
***REMOVED***

export default StatusMessage; 