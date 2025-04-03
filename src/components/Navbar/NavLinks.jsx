import React from 'react';
import { Link ***REMOVED*** from 'react-router-dom';

function NavLinks() {
  return (
    <div className="hidden md:flex space-x-8 text-lg">
      <Link to="/Home" className="hover:text-[#ffdde2]">Jobs</Link>
      <Link to="/about" className="hover:text-[#ffdde2]">About</Link>
      <Link to="/contact" className="hover:text-[#ffdde2]">Contact</Link>
    </div>
  );
***REMOVED***

export default NavLinks; 