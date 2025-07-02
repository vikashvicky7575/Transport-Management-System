import React, { useEffect, useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useDispatch } from "react-redux";
import { mainteanceRequest } from "../../../../../Redux/Slice/mainteancesSlice";
import { useSelector } from "react-redux";
import axios from "axios";
import Swal from "sweetalert2";

const MaintenanceForm = () => {
  const dispatch = useDispatch();
  const [vehicles, setVehicles] = useState([]);

  //fetching the dispatchername automatically using redux-saga
  const { authUser } = useSelector((state) => state.authStore);

  // Fetch available vehicles on load
  useEffect(() => {
    axios
      .get("http://localhost:5000/api/vehicles/available")
      .then((res) => {
        console.log("Available vehicles fetched:", res.data); // ✅ log the data
        setVehicles(res.data);
      })
      .catch((err) => {
        console.error(
          "Error fetching vehicles:",
          err.response?.data || err.message
        );
      });
  }, []);

  const initialValues = {
    vehicleId: "",
    vehicleNumber: "",
    maintenanceType: "",
    maintenanceDate: "",
    issuetype: "",
    issueDescription: "",
    status: "",
    companyName: "",
    MechanicName: "",
    dispatcher: authUser?.name || "", //autofetched dispatcher name
  };

  const validationSchema = Yup.object({
    vehicleId: Yup.string().required("Vehicle is required"),
    maintenanceType: Yup.string().required("Type required"),
    maintenanceDate: Yup.string().required("Date required"),
    issuetype: Yup.string().required("Issue required"),
    issueDescription: Yup.string().required("Description required"),
    status: Yup.string().required("Status required"),
    companyName: Yup.string().required("Company Name required"),
    MechanicName: Yup.string().required("Mechanic Name required"),
    dispatcher: Yup.string().required("Dispatcher Name is required"),
  });

  const onSubmit = (values, { resetForm }) => {
    // Remove wrong field if accidentally still tracked
    // delete values.vehicleID;
    dispatch(mainteanceRequest(values));

    // Remove the selected vehicle from dropdown after submitted the previous vehicle
    setVehicles((prev) => prev.filter((v) => v._id !== values.vehicleId));
    Swal.fire({
      icon: "success",
      title: "Success!",
      text: "Maintenance created successfully.",
      timer: 2000,
      showConfirmButton: false,
    });
    resetForm();
  };

  return (
    <div className="container mt-4">
      <h4 className="mb-3">Vehicle Maintenance Form</h4>

      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={onSubmit}
      >
        {({ setFieldValue }) => (
          <Form className="row g-3">
            {/* Vehicle Dropdown */}
            <div className="col-md-6">
              <label>Select Vehicle</label>
    
              <Field as="select" name="vehicleId" className="form-select">
                <option value="">-- Select --</option>
                {vehicles.map((v) => (
                  <option key={v._id} value={v._id}>
                    {v.vehicleNumber}
                  </option>
                ))}
              </Field>

              <ErrorMessage
                name="vehicleId"
                component="div"
                className="text-danger"
              />
            </div>

            <div className="col-md-6">
              <label>Maintenance Type</label>
              <Field as="select" name="maintenanceType" className="form-select">
                <option value="">Select</option>
                <option>General service</option>
                <option>BreakDown</option>
                <option>Emergency</option>
              </Field>
              <ErrorMessage
                name="maintenanceType"
                component="div"
                className="text-danger"
              />
            </div>

            <div className="col-md-6">
              <label>Date</label>
              <Field
                type="date"
                name="maintenanceDate"
                className="form-control"
              />
              <ErrorMessage
                name="maintenanceDate"
                component="div"
                className="text-danger"
              />
            </div>

            <div className="col-md-6">
              <label>Issue Type</label>
              <Field as="select" name="issuetype" className="form-select">
                <option value="">Select</option>
                <option>Engine</option>
                <option>Brake</option>
                <option>Tyre</option>
                <option>Electrical</option>
                <option>Suspension</option>
                <option>Oil Change</option>
                <option>Others</option>
              </Field>
              <ErrorMessage
                name="issuetype"
                component="div"
                className="text-danger"
              />
            </div>

            <div className="col-md-12">
              <label>Description</label>
              <Field
                as="textarea"
                name="issueDescription"
                className="form-control"
                rows="3"
              />
              <ErrorMessage
                name="issueDescription"
                component="div"
                className="text-danger"
              />
            </div>

            <div className="col-md-6">
              <label>Status</label>
              <Field as="select" name="status" className="form-select">
                <option value="">Select</option>
                <option>In Progress</option>
                <option>Delayed</option>
                <option>Fixed</option>
                <option>Waiting For Parts</option>
                <option>Sent To WorkShop</option>
              </Field>
              <ErrorMessage
                name="status"
                component="div"
                className="text-danger"
              />
            </div>

            <div className="col-md-6">
              <label>Company Name</label>
              <Field name="companyName" className="form-control" />
              <ErrorMessage
                name="companyName"
                component="div"
                className="text-danger"
              />
            </div>

            <div className="col-md-6">
              <label>Mechanic Name</label>
              <Field name="MechanicName" className="form-control" />
              <ErrorMessage
                name="MechanicName"
                component="div"
                className="text-danger"
              />
            </div>

            <div className="col-md-6 ">
              <label className="form-label m-0">Dispatcher Name</label>
              <Field name="dispatcher" className="form-control" />
              <ErrorMessage
                name="dispatcher"
                component="div"
                className="text-danger"
              />
            </div>

            <div className="col-12">
              <button type="submit" className="btn btn-primary w-100">
                Submit
              </button>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default MaintenanceForm;
