import React from "react";
import styles from "./Dispatcher_Layout.module.css";
import { Routes, Route } from "react-router-dom";
import DispatcherNavbar from "./DispatcherNavbar";
import TripSchedule from "../../Pages/DispatchPanel/TripSchedule/TripSchedule";
import AvailableDrivers from "../../Pages/DispatchPanel/AvailableDrivers/AvailableDrivers";
import AvailableVehicles from "../../Pages/DispatchPanel/AvailableVehicles/AvailableVehicles";
import VehiclesOnTripList from "../../Pages/DispatchPanel/OnTrip Details/VehiclesOnTripList";
import Dashboard from "../../../Admin_Panel/Pages/DispatchPanel/DispatcherDashboard/DispatcherDashboard";
import TripHistory from "../../Pages/DispatchPanel/TripHistory/TripHistory";
import MainteancesForm from "../../Pages/DispatchPanel/Mainteances/MainteancesForm/MainteancesForm";
import MainteancesList from "../../Pages/DispatchPanel/Mainteances/MaintaincesList/MainteancesList";
import ViewProfile from "../../Pages/DispatchPanel/ViewProfile/ViewProfile";
import MainteanceHistory from "../../Pages/DispatchPanel/Mainteances/MainteanceHistory/MainteanceHistory";

const DispatcherLayout = () => {
  return (
    <div className={styles.layout}>
      <DispatcherNavbar />
      <div className={styles.mainContent}>
        <div className={styles.content}>
          {/* Dispatcher Panel Link Routes */}
          <Routes>
            <Route path="/tripSchedule" element={<TripSchedule />}></Route>
            <Route
              path="/availableDrivers"
              element={<AvailableDrivers />}
            ></Route>
            <Route
              path="/availableVehicles"
              element={<AvailableVehicles />}
            ></Route>
            <Route
              path="/vehicleOnTrip"
              element={<VehiclesOnTripList />}
            ></Route>
            <Route path="/dashboard" element={<Dashboard />}></Route>
            <Route path="/tripHistory" element={<TripHistory />}></Route>
            <Route
              path="/maintenacesForm"
              element={<MainteancesForm />}
            ></Route>
            <Route
              path="/mainteancesList"
              element={<MainteancesList />}
            ></Route>
            <Route
              path="/mainteanceHistory"
              element={<MainteanceHistory />}
            ></Route>
            <Route path="/viewProfile" element={<ViewProfile />}></Route>
          </Routes>
        </div>
      </div>
    </div>
  );
};

export default DispatcherLayout;
