import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchAvailableStart } from '../../../../Redux/Slice/tripSlice'
import styles from './AvailableDrivers.module.css'

const AvailableDrivers = () => {
  const dispatch = useDispatch();
  const { drivers, loading, error } = useSelector((state) => state.tripStore);

  useEffect(() => {
    dispatch(fetchAvailableStart());
  }, [dispatch]);

  return (
    <div className={styles.container}>
      <h2 className={styles.heading}>Available Drivers</h2>

      {loading && <p className={styles.loading}>Loading Drivers...</p>}
      {error && <p className={styles.error}>Error: {error}</p>}
      {!loading && drivers.length === 0 && (
        <p className={styles.noData}>No Driver Available</p>
      )}

      <ul className={styles.driverList}>
        {drivers.map((driver) => (
          <li key={driver._id} className={styles.driverCard}>
            <img
              src={`http://localhost:5000/uploads/${driver.photo}`} // update path if needed
              alt={driver.driverName}
              className={styles.driverImage}
              onError={(e) => (e.target.src = '/default-driver.jpg')} // fallback image
            />
            <div className={styles.driverInfo}>
              <strong>Name: {driver.driverName}</strong>
              <strong>Mobile: {driver.mobileNumber}</strong>
              <strong>Gender: {driver.gender}</strong>
              {/* <strong>Employee ID: {driver.employeeId}</strong> */}
              <p className="fw-bold mb-2">
                Employee ID: <span className="badge bg-primary p-2">{driver.employeeId}</span>
              </p>
              <strong>Experience: {driver.experience} </strong>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default AvailableDrivers;
