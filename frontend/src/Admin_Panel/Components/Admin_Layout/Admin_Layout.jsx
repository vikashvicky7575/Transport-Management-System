import React from "react";
import styles from "./Admin_Layout.module.css";
import AdminNavbar from "../Admin_Navbar/Admin_Navbar";
import { Routes, Route } from "react-router-dom";
import Dashboard from "../../Pages/Dashboard/Dashboard";
import AddVehicle from "../../Pages/Vehicles/AddVehicle/AddVehicle";
import Viewvehicles from "../../Pages/Vehicles/ViewVehicles/Viewvehicles";
import AddDriver from "../../Pages/Driver/AddDriver/AddDriverDetails";
import ViewDriver from "../../Pages/Driver/DriverList/DriverDetails";
import UpdateVehicles from "../../Pages/Vehicles/UpdateVehicles/UpdateVehicles";
import Register from "../../../Pages/Register/Register";
import AuthProfile from "../../Pages/AuthProfile/AuthProfile";
import UserListByRole from "../../Pages/UserListByRole/UserListByRole";

const Admin_Layout = () => {
  return (
    <div className={styles.layout}>
      <AdminNavbar />
      <div className={styles.mainContent}>
        <div className={styles.content}>
          {/* Admin Panel Link Routes */}
          <Routes>
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/addvehicle" element={<AddVehicle />} />
            <Route path="/viewvehicles" element={<Viewvehicles />} />
            <Route path="/updateVehicle" element={<UpdateVehicles />} />
            <Route path="/addDriver" element={<AddDriver />} />
            <Route path="/viewDriver" element={<ViewDriver />} />
            <Route path="/register" element={<Register />} />
            <Route path="/authProfile" element={<AuthProfile />} />
            <Route path="/userlist/:role" element={<UserListByRole />} />
          </Routes>
        </div>
      </div>
    </div>
  );
};

export default Admin_Layout;
