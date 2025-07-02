import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchAvailableStart } from '../../../../Redux/Slice/tripSlice'
import styles from './AvailableVehicles.module.css'

const Availablevehicles = () => {
  const dispatch = useDispatch();
  const { vehicles, loading, error } = useSelector((state) => state.tripStore);

  useEffect(() => {
    dispatch(fetchAvailableStart());
  }, [dispatch]);

  return (
    <div className={styles.container}>
      <h2 className={styles.heading}>Available Vehicles</h2>

      {loading && <p className={styles.loading}>Loading Drivers...</p>}
      {error && <p className={styles.error}>Error: {error}</p>}
      {!loading && vehicles.length === 0 && (
        <p className={styles.noData}>No Vehicles Available</p>
      )}

      <ul className={styles.vehicleList}>
        {vehicles.map((vehicle) => (
          <li key={vehicle._id} className={styles.vehicleCard}>
            <img
              src={`http://localhost:5000/uploads/${vehicle.vehicleImage}`} // update path if needed
              alt={vehicle.vehicleNumber}
              className={styles.vehicleImage}
              onError={(e) => (e.target.src = '/default-driver.jpg')} // fallback image
            />
            <div className={styles.vehicleInfo}>
              <strong>Brand Name: {vehicle.brandName}</strong>
              <strong>VehicleNumber: {vehicle.vehicleNumber}</strong>
              <strong>VehicleType: {vehicle.vehicleType}</strong>
              <p className="fw-bold mb-2">
                Fuel Type: <span className="badge bg-primary p-2">{vehicle.fuelType}</span>
              </p>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Availablevehicles;
