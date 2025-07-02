import React, { useEffect, useState } from "react";
import styles from "./TripHistory.module.css";
import { useDispatch, useSelector } from "react-redux";
import { fetchtripHistoryStart } from "../../../../Redux/Slice/tripSlice";

const TripHistory = () => {
  const dispatch = useDispatch();
  const { tripAllDetails, loading, error, fetched } = useSelector(
    (state) => state.tripStore
  );
  const [statusFilter, setStatusFilter] = useState("All");

  //   useEffect(() => {
  //       dispatch(fetchtripHistoryStart());
  //   }, [dispatch]);

  useEffect(() => {
    if (!fetched) {
      dispatch(fetchtripHistoryStart());
    }
  }, [dispatch, fetched]);

  return (
    <div className={`container mt-4 ${styles.container}`}>
      <h2 className={`text-center mb-4 ${styles.heading}`}>
        All Trip History Details
      </h2>

      {/* Filter Dropdown */}
      <div className="mb-3 d-flex justify-content-end">
        <div className="d-flex align-items-center">
          <label
            htmlFor="statusFilter"
            className="form-label fw-semibold m-0 me-2"
          >
            Filter by Trip Status:
          </label>
        </div>
        <div>
          <select
            id="statusFilter"
            className="form-select w-auto"
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
          >
            <option value="All">All</option>
            <option value="In Transit">In Transit</option>
            <option value="Completed">Completed</option>
            <option value="Cancelled">Cancelled</option>
          </select>
        </div>
      </div>

      {/* States */}
      {loading && (
        <p className={styles.loading}>Loading Trip History Details...</p>
      )}
      {error && <p className={styles.error}>Error: {error}</p>}
      {!loading && tripAllDetails.length === 0 && (
        <p className={styles.nodata}>No Trip History Details</p>
      )}

      {/* Trip Table */}
      {!loading && tripAllDetails.length > 0 && (
        <div className={styles.scrollContainer}>
          <table
            className={`table table-striped table-hover table-sm align-middle ${styles.table}`}
          >
            <thead className="table-dark">
              <tr>
                <th>#</th>
                <th>Trip ID</th>
                <th>Driver</th>
                <th>Mobile</th>
                <th>Dispatcher</th>
                <th>Vehicle No</th>
                <th>Vehicle Type</th>
                <th>Start Time</th>
                <th>Estimated End</th>
                <th>Status</th>
                <th>Image</th>
              </tr>
            </thead>
            <tbody>
              {tripAllDetails
                .filter(
                  (trip) =>
                    statusFilter === "All" || trip.status === statusFilter
                )
                .map((trip, index) => (
                  <tr key={trip._id}>
                    <td>{index + 1}</td>
                    <td>{trip.tripId}</td>
                    <td>{trip.driverName}</td>
                    <td>{trip.driverMobileNumber}</td>
                    <td>{trip.dispatcher || "N/A"}</td>
                    <td>{trip.vehicleNumber}</td>
                    <td>{trip.vehicleType}</td>
                    <td>{new Date(trip.startDateTime).toLocaleString()}</td>
                    <td>
                      {new Date(trip.estimatedEndDateTime).toLocaleString()}
                    </td>
                    <td>
                      <span
                        className={`badge ${
                          styles[trip.status.replace(/\s/g, "").toLowerCase()]
                        }`}
                      >
                        {trip.status}
                      </span>
                    </td>
                   
                    <td>
                      {trip.vehicleImage ? (
                        <div className={styles.imageWrapper}>
                          <img
                            src={`http://localhost:5000/uploads/${trip.vehicleImage}`}
                            alt="Vehicle"
                            className={styles.tripImage}
                            loading="lazy"
                            onError={(e) => {
                              e.target.src = "/default-image.png";
                            }}
                          />
                        </div>
                      ) : (
                        <span className="text-muted">No Image</span>
                      )}
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default TripHistory;
