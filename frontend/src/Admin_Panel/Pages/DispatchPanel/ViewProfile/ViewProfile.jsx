import React from 'react';
import { useSelector } from 'react-redux';
import styles from './ViewProfile.module.css';

const ViewProfile = () => {
  const { authUser } = useSelector((state) => state.authStore);

  return (
    <div className={`container mt-4 ${styles.profileContainer}`}>
      <h2 className="text-center mb-4">Dispatcher Profile</h2>

      <div className={`card p-4 shadow ${styles.card}`}>
        <div className="mb-3">
          <label className="form-label fw-semibold">Name:</label>
          <div className="form-control">{authUser?.name || "N/A"}</div>
        </div>

        <div className="mb-3">
          <label className="form-label fw-semibold">Email:</label>
          <div className="form-control">{authUser?.email || "N/A"}</div>
        </div>
      </div>
    </div>
  );
};

export default ViewProfile;

