import React from 'react';
import { Link } from 'react-router-dom';

import logo from './logo.svg';

const Logo = () => {
  return (
    <Link to="/home">
      <img 
        alt="SG logo"
        src={logo}
      />
    </Link>
  );
};

export default Logo;
