import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchMaiteancesRequest } from "../../../../../Redux/Slice/mainteancesSlice";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";

const MainteancesList = () => {
  const dispatch = useDispatch();

  const { fetchMainteancesHistory, loading, error } = useSelector(
    (state) => state.mainteancesStore
  );
  console.log("MainteancesDetails:", fetchMainteancesHistory);

  useEffect(() => {
    dispatch(fetchMaiteancesRequest());
  }, [dispatch]);

  const handleStatusChange = async (id, newStatus) => {
    try {
      const res = await axios.patch(
        `http://localhost:5000/api/mainteances/updateMainteancesStatus/${id}`,
        { status: newStatus }
      );

      console.log("Status updated:", res.data);

      // Dynamic success message
      toast.success(`Status changed to "${newStatus}"`, {
        position: "top-right",
        autoClose: 2000,
      });

      dispatch(fetchMaiteancesRequest()); // Refresh list
    } catch (error) {
      console.error("Failed to update status", error);
      toast.error("Failed to update status", {
        position: "top-right",
        autoClose: 2000,
      });
    }
  };

  const statusOptions = [
    "In Progress",
    "Delayed",
    "Fixed",
    "Waiting For Parts",
    "Sent To WorkShop",
  ];

  return (
    <div className="container mt-4">
      <h4>All Maintenance Records</h4>
      {loading && <p>Loading...</p>}
      {error && <p className="text-danger">Error: {error}</p>}

      {fetchMainteancesHistory.length === 0 && !loading ? (
        <p className="text-center text-muted">No maintenance history found.</p>
      ) : (
        <table className="table table-bordered mt-3">
          <thead>
            <tr className="text-align-center">
              <th>Maintenance ID</th>
              <th>Brand Name</th>
              <th>Vehicle Type</th>
              <th>Vehicle Number</th>
              <th>Vehicle Image</th>
              <th>Type</th>
              <th>Date</th>
              <th>Issue</th>
              <th>Company</th>
              <th>Mechanic</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {fetchMainteancesHistory.map((m) => (
              <tr key={m._id}>
                <td>{m.mainteananceId}</td>
                <td>{m.vehicleId?.brandName}</td>
                <td>{m.vehicleId?.vehicleType}</td>
                <td>{m.vehicleId?.vehicleNumber}</td>
                <td>
                  {m.vehicleId?.vehicleImage ? (
                    <img
                      src={`http://localhost:5000/uploads/${m.vehicleId?.vehicleImage}`}
                      alt="Vehicle"
                      width={100}
                    />
                  ) : (
                    <span>No Image</span>
                  )}
                </td>

                <td>{m.maintenanceType}</td>
                <td>
                  {new Date(m.maintenanceDate).toLocaleDateString("en-GB")}
                </td>
                <td>{m.issuetype}</td>
                <td>{m.companyName}</td>
                <td>{m.MechanicName}</td>
                {/* <td>{m.status}</td> */}
                <td>
                  <select
                    className="form-select"
                    value={m.status}
                    onChange={(e) => handleStatusChange(m._id, e.target.value)}
                  >
                    {statusOptions.map((status) => (
                      <option key={status} value={status}>
                        {status}
                      </option>
                    ))}
                  </select>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
      <ToastContainer />
    </div>
  );
};

export default MainteancesList;
