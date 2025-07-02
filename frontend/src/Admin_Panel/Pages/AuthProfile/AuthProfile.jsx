import React from "react";
import { Link } from "react-router-dom";
import styles from "./AuthProfile.module.css";

const AuthProfile = () => {
  return (
    <div className={`container ${styles.container}`}>
      <div className="row text-center vh-100 align-items-center">
        {/* Admin Profile */}
        <div className="col-md-4 mb-4">
          <Link to="/admin/userlist/admin" className="text-decoration-none">
            <div className={`card shadow ${styles.profileCard}`}>
              <div className="card-body">
                <div className={styles.iconCircle}>
                  <i className="fas fa-user-shield fa-2x"></i>
                </div>
                <h5 className="card-title mt-3">Admin Profile</h5>
                <p className="card-subtitle text-muted mb-3">
                  Manage admin roles and accounts.
                </p>
                <p className="card-text">
                  View and manage registered administrators.
                </p>
              </div>
            </div>
          </Link>
        </div>

        {/* Dispatcher Profile */}
        <div className="col-md-4 mb-4">
          <Link to="/admin/userlist/dispatcher" className="text-decoration-none">
            <div className={`card shadow ${styles.profileCard}`}>
              <div className="card-body">
                <div className={styles.iconCircle}>
                  <i className="fas fa-user-tie fa-2x"></i>
                </div>
                <h5 className="card-title mt-3">Dispatcher Profile</h5>
                <p className="card-subtitle text-muted mb-3">
                  Monitor and manage dispatchers.
                </p>
                <p className="card-text">
                  View all dispatcher details and access control.
                </p>
              </div>
            </div>
          </Link>
        </div>

        {/* Driver Profile */}
        <div className="col-md-4 mb-4">
          <Link to="/admin/userlist/driver" className="text-decoration-none">
            <div className={`card shadow ${styles.profileCard}`}>
              <div className="card-body">
                <div className={styles.iconCircle}>
                  <i className="fas fa-id-card fa-2x"></i>
                </div>
                <h5 className="card-title mt-3">Driver Profile</h5>
                <p className="card-subtitle text-muted mb-3">
                  Registered driver list.
                </p>
                <p className="card-text">
                  See driver details and active vehicle assignments.
                </p>
              </div>
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default AuthProfile;


