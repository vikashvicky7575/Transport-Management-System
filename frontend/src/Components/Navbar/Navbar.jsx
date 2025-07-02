import React from 'react';
import styles from './Navbar.module.css';
import { Link } from 'react-router-dom'

const Navbar = () => {
  return (
    <nav className={`navbar navbar-expand-lg navbar-dark position-fixed z-1 w-100 bg-dark ${styles.navbar}`}>
      <div className="container-fluid">
        <a className={`navbar-brand ${styles['navbar__logo']}`} href="/">Vikash Logistics</a>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav ms-auto">
            <li className={`nav-item ${styles['navbar__item']}`}>
              <a className="nav-link" href="/">Dashboard</a>
            </li>
            <li className={`nav-item ${styles['navbar__item']}`}>
              <a className="nav-link" href="/vehicles">Vehicles</a>
            </li>
            <li className={`nav-item ${styles['navbar__item']}`}>
              <a className="nav-link" href="/deliveries">Deliveries</a>
            </li>
            <li className={`nav-item ${styles['navbar__item']}`}>
              <a className="nav-link" href="/tracking">Tracking</a>
            </li>
            <li className={`nav-item ${styles['navbar__item']}`}>
              <Link to='/login' className='btn btn-warning'>Admin Panel</Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
