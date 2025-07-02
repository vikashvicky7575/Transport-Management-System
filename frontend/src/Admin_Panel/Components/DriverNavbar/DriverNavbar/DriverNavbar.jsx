import React from 'react';
import { Link } from 'react-router-dom';
import styles from './DriverNavbar.module.css';

const DriverNavbar = () => {
    return (
        <div className={styles.container}>
            {/* Top Navbar */}
            <nav className={`navbar navbar-expand-lg navbar-dark ${styles.topNavbar}`}>
                <div className="container-fluid">
                    <Link className="navbar-brand" to="/">Driver Panel</Link>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#driverNavbar" aria-controls="driverNavbar" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="driverNavbar">
                        <ul className="navbar-nav ms-auto">
                            <li className="nav-item">
                                <Link className="nav-link" to="/">Logout</Link>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>

            {/* Sidebar */}
            <div className={styles.sidebar}>
                <ul className="nav flex-column">
                    <li className="nav-item">
                        <Link className={`nav-link ${styles.navLink}`} to="/driver/dashboard">Dashboard</Link>
                    </li>
                    <li className="nav-item">
                        <Link className={`nav-link ${styles.navLink}`} to="/driver/trips">My Trips</Link>
                    </li>
                    <li className="nav-item">
                        <Link className={`nav-link ${styles.navLink}`} to="/driver/profile">Profile</Link>
                    </li>
                </ul>
            </div>
        </div>
    );
};

export default DriverNavbar;
