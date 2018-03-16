import React from 'react';
import { Link } from 'react-router-dom';

import logo from './logo.svg';

const Logo = () => {
  return (
    <Link to="/home">
      <img  
        className="sg-logo"
        alt="sg-logo"
        src={logo}
      />
    </Link>
  );
};

export default Logo;
