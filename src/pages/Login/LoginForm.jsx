import React, { useState ***REMOVED*** from 'react';
import { Mail, Lock ***REMOVED*** from 'lucide-react';

function LoginForm({ handleLogin, loading, navigate ***REMOVED***) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const onSubmit = (e) => {
    e.preventDefault();
    handleLogin(email, password);
  ***REMOVED***;

  return (
    <form onSubmit={onSubmit***REMOVED*** className="space-y-6">
      <div>
        <label htmlFor="email" className="block text-sm font-medium text-gray-700">
          Email Address
        </label>
        <div className="mt-1 relative">
          <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
          <input
            id="email"
            type="email"
            required
            className="pl-10 block w-full rounded-md border-gray-300 shadow-sm focus:border-[#101d42] focus:ring focus:ring-[#101d42] focus:ring-opacity-50"
            value={email***REMOVED***
            onChange={(e) => setEmail(e.target.value)***REMOVED***
          />
        </div>
      </div>

      <div>
        <label htmlFor="password" className="block text-sm font-medium text-gray-700">
          Password
        </label>
        <div className="mt-1 relative">
          <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
          <input
            id="password"
            type="password"
            required
            className="pl-10 block w-full rounded-md border-gray-300 shadow-sm focus:border-[#101d42] focus:ring focus:ring-[#101d42] focus:ring-opacity-50"
            value={password***REMOVED***
            onChange={(e) => setPassword(e.target.value)***REMOVED***
          />
        </div>
      </div>

      <button
        type="submit"
        disabled={loading***REMOVED***
        className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-[#101d42] hover:bg-opacity-90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#101d42] disabled:opacity-50"
      >
        {loading ? 'Logging in...' : 'Login'***REMOVED***
      </button>

      <div className="text-center">
        <button
          type="button"
          onClick={() => navigate('/signup')***REMOVED***
          className="text-sm text-[#101d42] hover:text-opacity-90"
        >
          Don't have an account? Sign up
        </button>
      </div>
    </form>
  );
***REMOVED***

export default LoginForm; 