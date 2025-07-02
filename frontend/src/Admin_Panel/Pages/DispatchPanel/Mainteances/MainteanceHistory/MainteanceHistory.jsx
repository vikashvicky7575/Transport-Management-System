// import React, { useEffect } from "react";
// // import styles from "./MainteanceHistory.module.css";
// import { fetchMaiteancesHistoryRequest } from "../../../../../Redux/Slice/mainteancesSlice";
// import { useSelector, useDispatch } from "react-redux";

// const MainteanceHistory = () => {
//   const dispatch = useDispatch();
//   const { loading, error, mainteanceAllHistory } = useSelector(
//     (state) => state.mainteancesStore
//   );

//   console.log("MainteancesDetails:", mainteanceAllHistory);

//   useEffect(() => {
//     dispatch(fetchMaiteancesHistoryRequest());
//   }, [dispatch]);

//   return (
//     <>
//       <div className="container mt-4">
//         <h3>All Mainteances History</h3>
//         {loading && <p>Loading...</p>}
//         {error && <p className="text-danger">Error: {error}</p>}

//         {mainteanceAllHistory.length === 0 && !loading ? (
//           <p>No Mainteances History</p>
//         ) : (
//           <table className="table table-borderd mt-3">
//             <thead>
//               <tr className="text-align-center">
//                 <th>Mainteanice ID</th>
//                 <th>Brand Name</th>
//                 <th>Vehicle Type</th>
//                 <th>Vehicle Number</th>
//                 <th>Vehicle Image</th>
//                 <th>Type</th>
//                 <th>Date</th>
//                 <th>Issue</th>
//                 <th>Company</th>
//                 <th>Mechanic</th>
//                 <th>Status</th>
//               </tr>
//             </thead>
//             <tbody>
//               {mainteanceAllHistory.map((m) => (
//                 <tr key={m._id}>
//                   <td>{m.mainteananceId}</td>
//                   <td>{m.vehicleId?.brandName}</td>
//                   <td>{m.vehicleId?.vehicleType}</td>
//                   <td>{m.vehicleId?.vehicleNumber}</td>
//                   <td>
//                   {m.vehicleId?.vehicleImage ? (
//                     <img
//                       src={`http://localhost:5000/uploads/${m.vehicleId?.vehicleImage}`}
//                       alt="Vehicle"
//                       width={100}
//                     />
//                   ) : (
//                     <span>No Image</span>
//                   )}
//                 </td>

//                 <td>{m.maintenanceType}</td>
//                 <td>
//                   {new Date(m.maintenanceDate).toLocaleDateString("en-GB")}
//                 </td>
//                 <td>{m.issuetype}</td>
//                 <td>{m.companyName}</td>
//                 <td>{m.MechanicName}</td>
//                 <td>{m.status}</td>
//                 </tr>
//               ))}
//             </tbody>
//           </table>
//         )}
//       </div>
//     </>
//   );
// };
// export default MainteanceHistory;


import React, { useEffect, useState } from "react";
import styles from "./MainteanceHistory.module.css";
import { useDispatch, useSelector } from "react-redux";
import { fetchMaiteancesHistoryRequest } from "../../../../../Redux/Slice/mainteancesSlice";

const MainteanceHistory = () => {
  const dispatch = useDispatch();
  const { loading, error, mainteanceAllHistory } = useSelector(
    (state) => state.mainteancesStore
  );

  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    dispatch(fetchMaiteancesHistoryRequest());
  }, [dispatch]);

  const getStatusClass = (status) => {
    switch (status.toLowerCase()) {
      case "pending":
        return styles.pending;
      case "in progress":
        return styles.inProgress;
      case "delayed":
        return styles.delayed;
      case "fixed":
        return styles.fixed;
      case "waiting for parts":
        return styles.waiting;
      case "work to workshop":
        return styles.toWorkshop;
      default:
        return "";
    }
  };

  const filteredData = mainteanceAllHistory.filter((m) =>
    m.vehicleId?.vehicleNumber
      ?.toLowerCase()
      .includes(searchTerm.toLowerCase())
  );

  return (
    <div className="container mt-4">
      <h3>All Maintenance History</h3>

      {/*  Search Input */}
      <div className="mb-3 mt-3">
        <input
          type="text"
          placeholder="Search by Vehicle Number"
          className="form-control"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      {loading && <p>Loading...</p>}
      {error && <p className="text-danger">Error: {error}</p>}

      {filteredData.length === 0 && !loading ? (
        <p>No Maintenance Records Found</p>
      ) : (
        <div className="table-responsive">
          <table className="table table-bordered table-striped mt-3">
            <thead className="table-dark text-center">
              <tr>
                <th>Maintenance ID</th>
                <th>Brand</th>
                <th>Type</th>
                <th>Vehicle No</th>
                <th>Image</th>
                <th>Issue Type</th>
                <th>Date</th>
                <th>Issue</th>
                <th>Company</th>
                <th>Mechanic</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody className="text-center align-middle">
              {filteredData.map((m) => (
                <tr key={m._id}>
                  <td>{m.mainteananceId}</td>
                  <td>{m.vehicleId?.brandName}</td>
                  <td>{m.vehicleId?.vehicleType}</td>
                  <td>{m.vehicleId?.vehicleNumber}</td>
                  <td>
                    {m.vehicleId?.vehicleImage ? (
                      <img
                        src={`http://localhost:5000/uploads/${m.vehicleId.vehicleImage}`}
                        alt="Vehicle"
                        width={80}
                      />
                    ) : (
                      <span>No Image</span>
                    )}
                  </td>
                  <td>{m.maintenanceType}</td>
                  <td>{new Date(m.maintenanceDate).toLocaleDateString("en-GB")}</td>
                  <td>{m.issuetype}</td>
                  <td>{m.companyName}</td>
                  <td>{m.MechanicName}</td>
                  <td>
                    <span className={`${styles.status} ${getStatusClass(m.status)}`}>
                      {m.status}
                    </span>
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

export default MainteanceHistory;
