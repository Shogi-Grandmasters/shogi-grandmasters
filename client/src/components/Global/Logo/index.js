import React from 'react';
import { Link } from 'react-router-dom';

import logo from './logo.svg';
import './Logo.css';

const Logo = () => {
  return (
    <Link to="/home" className="sg-logo" alt="sg-logo" />
  );
};

export default Logo;


// <Link to="/home">
//       <img  
//         className="sg-logo"
//         alt="sg-logo"
//         src="https://i.imgur.com/IwJcebw.png"
//       />
// </Link>