import React from 'react';
import { Link } from 'react-router-dom';

import './Logo.css';

const Logo = () => {
  return (
    <Link to="/home" className="sg-logo" alt="sg-logo" />
  );
};

export default Logo;
