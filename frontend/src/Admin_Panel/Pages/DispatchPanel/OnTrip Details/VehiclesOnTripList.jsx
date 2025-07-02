
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchVehiclesOnTripStart, updateTripStatusStart } from '../../../../Redux/Slice/tripSlice';
import styles from './VehicleOnTripList.module.css';
import TripTrackingMap from './TripTrackingMap';

const VehiclesOnTripList = () => {
  const dispatch = useDispatch();
  const { vehiclesOnTrip, loading } = useSelector((state) => state.tripStore);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedTrip, setselectedTrip] = useState(null);

  useEffect(() => {
    dispatch(fetchVehiclesOnTripStart());
  }, [dispatch]);


  const handleStatusChange = (tripId, newStatus) => {
    if (window.confirm(`Are you sure you want to mark this trip as "${newStatus}"?`)) {
      dispatch(updateTripStatusStart({ tripId, status: newStatus }));
    }
  };

  //handleViewTracking
  const handleViewTracking = (trip) => {
    console.log('Pickup:', trip.pickupLocation);
    console.log('Drop:', trip.dropLocation);
    setselectedTrip(trip);
  }

  //filter for Vehicle Number & DriverName
  const filteredTrips = vehiclesOnTrip.filter((trip) => {
    const vehicleNumber = trip.vehicleNumber?.toLowerCase() || '';
    const driverName = trip.driver?.driverName?.toLowerCase() || '';

    const matchesSearch =
      vehicleNumber.includes(searchQuery.toLowerCase()) ||
      driverName.includes(searchQuery.toLowerCase());

    return matchesSearch;
  });

  const getStatusBadgeClass = (status) => {
    switch (status) {
      case 'Completed':
        return 'badge bg-success';
      case 'Cancelled':
        return 'badge bg-danger';
      case 'In Transit':
      default:
        return 'badge bg-primary';
    }
  };

  return (
    <div className="container mt-4">
      <div className={styles.containerBox}>
        <h3 className="text-center text-primary mb-4">Vehicles Currently on Trip</h3>

        <div className={`input-group mb-4 ${styles.searchBox}`}>
          <input
            type="text"
            className="form-control"
            placeholder="Search by vehicle or driver..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>

        {loading ? (
          <p className="text-center">Loading...</p>
        ) : filteredTrips.length === 0 ? (
          <p className="text-center">No vehicles currently on trip.</p>
        ) : (
          <div className="row">
            {filteredTrips.map((trip) => (
              <div key={trip._id} className="col-md-6 col-lg-4">
                <div className={styles.cardItem}>
                  <h5 className={styles.cardTitle}>
                    {trip.vehicleNumber} ({trip.vehicleType})
                  </h5>
                  <p className={styles.cardInfo}><strong>Trip ID:</strong> {trip.tripId}</p>
                  <p className={styles.cardInfo}><strong>Driver:</strong> {trip.driver?.driverName}</p>
                  <p className={styles.cardInfo}><strong>Mobile:</strong> {trip.driverMobileNumber}</p>
                  <p className={styles.cardInfo}><strong>Dispatcher:</strong> {trip.dispatcher}</p>
                  <p className={styles.cardInfo}><strong>Pickup:</strong> {trip.pickupLocation?.name}</p>
                  <p className={styles.cardInfo}><strong>Drop:</strong> {trip.dropLocation?.name}</p>
                  <p className={styles.cardInfo}><strong>Start:</strong> {new Date(trip.startDateTime).toLocaleString()}</p>
                  <p className={styles.cardInfo}><strong>ETA:</strong> {new Date(trip.estimatedEndDateTime).toLocaleString()}</p>
                  <span className={`${getStatusBadgeClass(trip.status)} mb-2 d-inline-block`}>
                    {trip.status === 'Completed'
                      ? 'Trip Completed'
                      : trip.status === 'Cancelled'
                        ? 'Trip Cancelled'
                        : 'In Transit'}
                  </span>

                  {/* View Tracking Button */}
                  <button className='btn btn-outline-success btn-sm m-2' onClick={() => handleViewTracking(trip)}>
                    View Tracking
                  </button>


                  {/* updateButton */}
                  {/* Status Dropdown */}
                  <div className='form-group'>
                    <label className="fw-bold me-2">Update Status:</label>
                    <select
                      className="form-select form-select-sm"
                      value={trip.status}
                      onChange={(e) => handleStatusChange(trip.tripId, e.target.value)}
                      disabled={trip.status !== 'In Transit'}
                    >
                      <option value="In Transit">In Transit</option>
                      <option value="Completed">Completed</option>
                      <option value="Cancelled">Cancelled</option>
                    </select>
                  </div>

                </div>
              </div>
            ))}
          </div>
        )}
        {/* Mapbox View Tracking Modal */}
        {selectedTrip && (
          <div className={styles.mapmodal}>
            <TripTrackingMap
              pickup={selectedTrip.pickupLocation}
              drop={selectedTrip.dropLocation}
              onClose={() => setselectedTrip(null)}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default VehiclesOnTripList;

