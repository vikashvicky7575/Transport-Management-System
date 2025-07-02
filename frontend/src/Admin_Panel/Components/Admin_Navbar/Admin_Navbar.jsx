import React from "react";
import { NavLink, Link } from "react-router-dom";
import styles from "./Admin_Navbar.module.css";
import { useSelector } from "react-redux";

const Admin_Navbar = () => {
  const { authUser } = useSelector((state) => state.authStore);

  return (
    <div className={styles.container}>
      {/* Top Navbar */}
      <nav
        className={`navbar navbar-expand-lg navbar-dark bg-dark fixed-top ${styles.navbar}`}
      >
        <div className="container-fluid">
          <Link className="navbar-brand text-light px-3" to="/">
            Admin Panel Transport
          </Link>

          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#driverNavbar"
            aria-controls="driverNavbar"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>

          <div className="collapse navbar-collapse" id="driverNavbar">
            <ul className="navbar-nav ms-auto">
              <li className="nav-item dropdown">
                <button
                  className="btn nav-link dropdown-toggle d-flex align-items-center"
                  id="profileDropdown"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                  type="button"
                >
                  <i className="fas fa-user-circle me-2"></i>
                  {authUser?.name ? `Welcome, ${authUser.name}` : "Profile"}
                </button>
                <ul
                  className="dropdown-menu dropdown-menu-end"
                  aria-labelledby="profileDropdown"
                >
                  <li>
                    <Link
                      className="dropdown-item"
                      to="/admin/viewProfile"
                    >
                      View Profile
                    </Link>
                  </li>
                  <li>
                    <Link
                      className="dropdown-item"
                      to="/admin/change-password"
                    >
                      Change Password
                    </Link>
                  </li>
                  <li>
                    <hr className="dropdown-divider" />
                  </li>
                  <li>
                    <Link className="dropdown-item text-danger" to="/login">
                      Logout
                    </Link>
                  </li>
                </ul>
              </li>
            </ul>
          </div>
        </div>
      </nav>

      {/* Sidebar */}
      <div className={`d-flex flex-column bg-dark ${styles.sidebar}`}>
        
        <NavLink
          to="/admin/dashboard"
          className={({ isActive }) =>
            isActive ? `${styles.navLink} ${styles.active}` : styles.navLink
          }
        >
          <i className="fas fa-chart-line mx-2"></i> Dashboard
        </NavLink>

        <div className="dropdown">
          <button
            className={`btn dropdown-toggle w-100 text-start ${styles.navLink}`}
            data-bs-toggle="dropdown"
          >
            <i className="fas fa-truck mx-2"></i> Vehicle Management
          </button>
          <ul className="dropdown-menu">
            <li>
              <NavLink className="dropdown-item" to="/admin/addvehicle">
                Add Vehicle
              </NavLink>
            </li>
            <li>
              <NavLink className="dropdown-item" to="/admin/viewvehicles">
                View Vehicles
              </NavLink>
            </li>
          </ul>
        </div>

        <div className="dropdown">
          <button
            className={` btn dropdown-toggle w-100 text-start ${styles.navLink}`}
            data-bs-toggle="dropdown"
          >
            <i className="fas fa-id-card-alt mx-2"></i> Driver Management
          </button>
          <ul className="dropdown-menu">
            <li>
              <NavLink className="dropdown-item" to="/admin/addDriver">
                Add Driver Details
              </NavLink>
            </li>
            <li>
              <NavLink className="dropdown-item" to="/admin/viewDriver">
                View Driver Details
              </NavLink>
            </li>
          </ul>
        </div>

        <div className="dropdown">
          <button
            className={`btn dropdown-toggle w-100 text-start ${styles.navLink}`}
            data-bs-toggle="dropdown"
          >
            <i className="fas fa-users-cog mx-2"></i> User Management
          </button>
          <ul className="dropdown-menu">
            <li>
              <NavLink className="dropdown-item" to="/admin/register">
                Register User
              </NavLink>
            </li>
            <li>
              <NavLink className="dropdown-item" to="/admin/authProfile">
                Check All Profiles
              </NavLink>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Admin_Navbar;
