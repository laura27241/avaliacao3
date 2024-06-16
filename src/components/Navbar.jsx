import React from 'react';
import './Navbar.css';

function Navbar() {
  return (
    <nav className="navbar">
      <h1>My App</h1>
      <ul>
        <li><a href="/">Home</a></li>
        <li><a href="/products">Products</a></li>
      </ul>
    </nav>
  );
}

export default Navbar;
