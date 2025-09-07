import React from 'react';
import { Link, NavLink } from 'react-router-dom'; // Import NavLink
import Dropdown from './Dropdown';

const Navbar = () => {
  const sanctuariesItems = [
    { title: 'The Hair Sanctuary', path: '/hair-sanctuary' },
    { title: 'The Skin & Soul Studio', path: '/skin-and-soul' },
  ];

  const academyItems = [
    { title: 'Our Courses', path: '/courses' },
  ];

  return (
    <nav className="navbar">
      <Link to="/" className="navbar-brand">
        MONERI SPA & ACADEMY
      </Link>
      <ul className="navbar-links">
        <li>
          <NavLink to="/">Home</NavLink>
        </li>
        <li className="nav-item">
          <span>Our Sanctuaries</span>
          <Dropdown items={sanctuariesItems} />
        </li>
        <li className="nav-item">
          <span>The Academy</span>
          <Dropdown items={academyItems} />
        </li>
        <li>
          <NavLink to="/gallery">Gallery</NavLink>
        </li>
        <li>
          <NavLink to="/beauty-journal">Beauty Journal</NavLink>
        </li>
        <li>
          <NavLink to="/our-story">Our Story</NavLink>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;