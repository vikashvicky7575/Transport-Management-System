// import React, { useEffect, useState } from "react";
// import { useDispatch ,useSelector} from "react-redux";
// import { useFormik } from "formik";
// import * as Yup from "yup";
// import Swal from "sweetalert2";
// import Lottie from "lottie-react";
// import vehicleAnime from "../../../../assets/images/vehicle3.json";
// import { addVehicleRequest } from "../../../../Redux/Slice/vehicleSlice";

// const AddVehicle = () => {
//   const dispatch = useDispatch();

//   const {error,success} = useSelector((state)=>state.vehicleStore)

//   const formik = useFormik({
//     initialValues: {
//       vehicleNumber: "",
//       vehicleType: "",
//       chassisNumber: "",
//       engineNumber: "",
//       insuranceExpiry: "",
//       pollutionExpiry: "",
//       fuelType: "",
//       brandName: "",
//       model: "",
//       fuelTankCapacity: "",
//       fcDate: "",
//       manufacturingYear: "",
//       permitType: "",
//       vehicleImage: null,
//     },
//     validationSchema: Yup.object({
//       brandName: Yup.string().required("Brand Name is Required"),
//       model: Yup.string().required("Vehicle Model is Required"),
//       manufacturingYear: Yup.number()
//         .min(1990, "Year must be after 1990")
//         .max(new Date().getFullYear(), "Year cannot be in the future")
//         .required("Manufacturing Year is Required"),
//       vehicleNumber: Yup.string()
//         .matches(
//           /^[A-Z]{2} \d{2} [A-Z]{2} \d{4}$/,
//           "Invalid vehicle number format (e.g., TN 10 AB 1234)"
//         )
//         .required("Vehicle Number is Required"),
//       vehicleType: Yup.string().required("Vehicle Type is Required"),
//       chassisNumber: Yup.string()
//         .required("Chassis Number is required")
//         .length(17, "Chassis Number must be exactly 17 characters")
//         .matches(/^[A-Za-z0-9]+$/, "Chassis Number must be alphanumeric only"),
//       engineNumber: Yup.string()
//         .required("Engine Number is Required")
//         .matches(
//           /^[A-Z0-9]{11,17}$/,
//           "Engine Number must be 11 to 17 characters (only letters and numbers)"
//         ),
//       fuelType: Yup.string().required("Fuel Type is Required"),
//       fuelTankCapacity: Yup.number()
//         .typeError("Must be a number")
//         .required("Fuel Tank Capacity is Required"),
//       permitType: Yup.string().required("Permit Type is Required"),
//       insuranceExpiry: Yup.date()
//         .min(new Date(), "Insurance Expiry must be in the future")
//         .required("Insurance Expiry is Required"),
//       pollutionExpiry: Yup.date()
//         .min(new Date(), "Pollution Expiry must be in the future")
//         .required("Pollution Expiry is Required"),
//       fcDate: Yup.date()
//         .min(new Date(), "FC Date must be in the future")
//         .required("FC Expiry is Required"),
//       vehicleImage: Yup.mixed()
//         .required("Vehicle image is required")
//         .test(
//           "fileType",
//           "Unsupported File Format",
//           (value) =>
//             value &&
//             ["image/jpeg", "image/png", "image/jpg"].includes(value.type)
//         )
//         .test(
//           "fileSize",
//           "File too large",
//           (value) => value && value.size <= 2 * 1024 * 1024 // 2MB
//         ),
//     }),

//     onSubmit: async (values, { resetForm, setFieldError }) => {
//       const formData = new FormData();
//       for (const key in values) {
//         if (key === "vehicleImage") {
//           formData.append(key, values[key], values[key].name);
//         } else {
//           formData.append(key, values[key]);
//         }
//       }

//       try {
//         const resultAction = await dispatch(addVehicleRequest(formData));
//         const resData = resultAction?.payload;

//         // Check if error is returned (not success)
//         if (resData?.field && resData?.message) {
//           // Field-level error
//           setFieldError(resData.field, resData.message);
//           return;
//         }

//         // Success
//         Swal.fire({
//           icon: "success",
//           title: "Success",
//           text: resData.message || "Vehicle added successfully!",
//         });
//         resetForm();
//       } catch (err) {
//         Swal.fire({
//           icon: "error",
//           title: "Error",
//           text: err.message || "Failed to add vehicle.",
//         });
//       }
//     },
//   });

//   //useEffect
//   useEffect(() => {
//     if (error?.field && error?.message) {
//       formik.setFieldError(error.field, error.message);
//     }
//   }, [error,formik]);

//   //spinner
//   const [loading, setloading] = useState(true);
//   useEffect(() => {
//     const timer = setTimeout(() => {
//       setloading(false);
//     }, 1000);
//     return () => clearTimeout(timer);
//   }, []);

//   return (
//     <>
//       {loading ? (
//         <div
//           className="d-flex justify-content-center align-items-center"
//           style={{ height: "100%" }}
//         >
//           <Lottie
//             animationData={vehicleAnime}
//             loop={true}
//             style={{ width: 300 }}
//           />
//         </div>
//       ) : (
//         <div className="container mt-5">
//           <h3>Add New Vehicle</h3>
//           <form onSubmit={formik.handleSubmit} encType="multipart/form-data">
//             {/* Brand, Model, Year */}
//             <div className="row mb-3">
//               <div className="col-4">
//                 <label>Brand</label>
//                 <input
//                   type="text"
//                   name="brandName"
//                   className={`form-control ${
//                     formik.touched.brandName && formik.errors.brandName
//                       ? "is-invalid"
//                       : ""
//                   }`}
//                   {...formik.getFieldProps("brandName")}
//                 />
//                 <div className="invalid-feedback">
//                   {formik.errors.brandName}
//                 </div>
//               </div>
//               <div className="col-4">
//                 <label>Model</label>
//                 <input
//                   type="text"
//                   name="model"
//                   className={`form-control ${
//                     formik.touched.model && formik.errors.model
//                       ? "is-invalid"
//                       : ""
//                   }`}
//                   {...formik.getFieldProps("model")}
//                 />
//                 <div className="invalid-feedback">{formik.errors.model}</div>
//               </div>
//               <div className="col-4">
//                 <label>Manufacturing Year</label>
//                 <input
//                   type="number"
//                   name="manufacturingYear"
//                   className={`form-control ${
//                     formik.touched.manufacturingYear &&
//                     formik.errors.manufacturingYear
//                       ? "is-invalid"
//                       : ""
//                   }`}
//                   {...formik.getFieldProps("manufacturingYear")}
//                 />
//                 <div className="invalid-feedback">
//                   {formik.errors.manufacturingYear}
//                 </div>
//               </div>
//             </div>

//             {/* Vehicle Number, Type */}
//             <div className="row mb-3">
//               <div className="col-6">
//                 <label>Vehicle Number</label>
//                 <input
//                   type="text"
//                   name="vehicleNumber"
//                   className={`form-control ${
//                     formik.errors.vehicleNumber ? "is-invalid" : ""
//                   }`}
//                   value={formik.values.vehicleNumber}
//                   onChange={(e) =>
//                     formik.setFieldValue(
//                       "vehicleNumber",
//                       e.target.value.toUpperCase()
//                     )
//                   }
//                   onBlur={formik.handleBlur}
//                 />
//                 {/* {formik.errors.vehicleNumber && (
//                   <div className="invalid-feedback d-block">
//                     {formik.errors.vehicleNumber}
//                   </div>
//                 )} */}

//                 {formik.touched.vehicleNumber &&
//                   formik.errors.vehicleNumber && (
//                     <div className="invalid-feedback d-block">
//                       {formik.errors.vehicleNumber}
//                     </div>
//                   )}
//               </div>

//               <div className="col-6">
//                 <label>Vehicle Type</label>
//                 <select
//                   name="vehicleType"
//                   className={`form-control ${
//                     formik.touched.vehicleType && formik.errors.vehicleType
//                       ? "is-invalid"
//                       : ""
//                   }`}
//                   {...formik.getFieldProps("vehicleType")}
//                 >
//                   <option value="">Select</option>
//                   <option value="truck">Truck</option>
//                   <option value="minitruck">Mini Truck</option>
//                   <option value="van">Van</option>
//                 </select>
//                 <div className="invalid-feedback">
//                   {formik.errors.vehicleType}
//                 </div>
//               </div>
//             </div>

//             {/* Chassis & Engine Numbers */}
//             <div className="row mb-3">
//               <div className="col-6">
//                 <label>Chassis Number</label>
//                 <input
//                   type="text"
//                   name="chassisNumber"
//                   maxLength={17}
//                   className={`form-control ${
//                     formik.touched.chassisNumber && formik.errors.chassisNumber
//                       ? "is-invalid"
//                       : ""
//                   }`}
//                   {...formik.getFieldProps("chassisNumber")}
//                   onChange={(e) =>
//                     formik.setFieldValue(
//                       "chassisNumber",
//                       e.target.value.toUpperCase()
//                     )
//                   }
//                 />
//                 <div className="invalid-feedback">
//                   {formik.errors.chassisNumber}
//                 </div>
//               </div>
//               <div className="col-6">
//                 <label>Engine Number</label>
//                 <input
//                   type="text"
//                   name="engineNumber"
//                   className={`form-control ${
//                     formik.touched.engineNumber && formik.errors.engineNumber
//                       ? "is-invalid"
//                       : ""
//                   }`}
//                   {...formik.getFieldProps("engineNumber")}
//                   onChange={(e) =>
//                     formik.setFieldValue(
//                       "engineNumber",
//                       e.target.value.toUpperCase()
//                     )
//                   }
//                 />
//                 <div className="invalid-feedback">
//                   {formik.errors.engineNumber}
//                 </div>
//               </div>
//             </div>

//             {/* Fuel Type & Capacity */}
//             <div className="row mb-3">
//               <div className="col-6">
//                 <label>Fuel Type</label>
//                 <select
//                   name="fuelType"
//                   className={`form-control ${
//                     formik.touched.fuelType && formik.errors.fuelType
//                       ? "is-invalid"
//                       : ""
//                   }`}
//                   {...formik.getFieldProps("fuelType")}
//                 >
//                   <option value="">Select</option>
//                   <option value="Diesel">Diesel</option>
//                   <option value="Petrol">Petrol</option>
//                   <option value="Electric">Electric</option>
//                   <option value="CNG">CNG</option>
//                 </select>
//                 <div className="invalid-feedback">{formik.errors.fuelType}</div>
//               </div>
//               <div className="col-6">
//                 <label>Fuel Tank Capacity</label>
//                 <input
//                   type="number"
//                   name="fuelTankCapacity"
//                   className={`form-control ${
//                     formik.touched.fuelTankCapacity &&
//                     formik.errors.fuelTankCapacity
//                       ? "is-invalid"
//                       : ""
//                   }`}
//                   {...formik.getFieldProps("fuelTankCapacity")}
//                 />
//                 <div className="invalid-feedback">
//                   {formik.errors.fuelTankCapacity}
//                 </div>
//               </div>
//             </div>

//             {/* Permit Type */}
//             <div className="mb-3">
//               <label>Permit Type</label>
//               <select
//                 name="permitType"
//                 className={`form-control ${
//                   formik.touched.permitType && formik.errors.permitType
//                     ? "is-invalid"
//                     : ""
//                 }`}
//                 {...formik.getFieldProps("permitType")}
//               >
//                 <option value="">Select</option>
//                 <option value="national">National</option>
//                 <option value="state">State</option>
//               </select>
//               <div className="invalid-feedback">{formik.errors.permitType}</div>
//             </div>

//             {/* Expiry Dates */}
//             <div className="row mb-3">
//               {["insuranceExpiry", "pollutionExpiry", "fcDate"].map(
//                 (field, i) => (
//                   <div key={i} className="col-4">
//                     <label>
//                       {field === "insuranceExpiry"
//                         ? "Insurance Expiry"
//                         : field === "pollutionExpiry"
//                         ? "Pollution Expiry"
//                         : "FC Date"}
//                     </label>
//                     <input
//                       type="date"
//                       name={field}
//                       className={`form-control ${
//                         formik.touched[field] && formik.errors[field]
//                           ? "is-invalid"
//                           : ""
//                       }`}
//                       {...formik.getFieldProps(field)}
//                     />
//                     <div className="invalid-feedback">
//                       {formik.errors[field]}
//                     </div>
//                   </div>
//                 )
//               )}
//             </div>

//             {/* Image Upload */}
//             <div className="mb-3">
//               <label>Vehicle Image</label>
//               <input
//                 type="file"
//                 name="vehicleImage"
//                 className={`form-control ${
//                   formik.touched.vehicleImage && formik.errors.vehicleImage
//                     ? "is-invalid"
//                     : ""
//                 }`}
//                 onChange={(e) =>
//                   formik.setFieldValue("vehicleImage", e.currentTarget.files[0])
//                 }
//                 accept="image/png, image/jpeg, image/jpg"
//               />
//               <div className="invalid-feedback">
//                 {formik.errors.vehicleImage}
//               </div>
//             </div>

//             {/* Submit */}
//             <div className="text-center">
//               <button type="submit" className="btn btn-primary">
//                 Add Vehicle
//               </button>
//             </div>
//           </form>
//         </div>
//       )}
//     </>
//   );
// };

// export default AddVehicle;

import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useFormik } from "formik";
import * as Yup from "yup";
import Swal from "sweetalert2";
import Lottie from "lottie-react";
import vehicleAnime from "../../../../assets/images/vehicle3.json";
import { addVehicleRequest } from "../../../../Redux/Slice/vehicleSlice";

const AddVehicle = () => {
  const dispatch = useDispatch();

  // Redux state for errors/success
  const { error, success } = useSelector((state) => state.vehicleStore);
  console.log("The err", error);
  // Formik setup
  const formik = useFormik({
    initialValues: {
      vehicleNumber: "",
      vehicleType: "",
      chassisNumber: "",
      engineNumber: "",
      insuranceExpiry: "",
      pollutionExpiry: "",
      fuelType: "",
      brandName: "",
      model: "",
      fuelTankCapacity: "",
      fcDate: "",
      manufacturingYear: "",
      permitType: "",
      vehicleImage: null,
    },
    validationSchema: Yup.object({
      brandName: Yup.string().required("Brand Name is Required"),
      model: Yup.string().required("Vehicle Model is Required"),
      manufacturingYear: Yup.number()
        .min(1990, "Year must be after 1990")
        .max(new Date().getFullYear(), "Year cannot be in the future")
        .required("Manufacturing Year is Required"),
      vehicleNumber: Yup.string()
        .matches(
          /^[A-Z]{2} \d{2} [A-Z]{2} \d{4}$/,
          "Invalid format (e.g., TN 10 AB 1234)"
        )
        .required("Vehicle Number is Required"),
      vehicleType: Yup.string().required("Vehicle Type is Required"),
      chassisNumber: Yup.string()
        .length(17, "Must be 17 characters")
        .matches(/^[A-Za-z0-9]+$/, "Must be alphanumeric only")
        .required("Chassis Number is Required"),
      engineNumber: Yup.string()
        .matches(/^[A-Z0-9]{11,17}$/, "Must be 11-17 letters/numbers")
        .required("Engine Number is Required"),
      fuelType: Yup.string().required("Fuel Type is Required"),
      fuelTankCapacity: Yup.number()
        .typeError("Must be a number")
        .required("Fuel Tank Capacity is Required"),
      permitType: Yup.string().required("Permit Type is Required"),
      insuranceExpiry: Yup.date()
        .min(new Date(), "Must be in the future")
        .required("Insurance Expiry is Required"),
      pollutionExpiry: Yup.date()
        .min(new Date(), "Must be in the future")
        .required("Pollution Expiry is Required"),
      fcDate: Yup.date()
        .min(new Date(), "Must be in the future")
        .required("FC Date is Required"),
      vehicleImage: Yup.mixed()
        .required("Image is required")
        .test("fileType", "Unsupported Format", (value) =>
          value
            ? ["image/jpeg", "image/jpg", "image/png"].includes(value.type)
            : false
        )
        .test("fileSize", "File too large", (value) =>
          value ? value.size <= 2 * 1024 * 1024 : false
        ),
    }),
    onSubmit: async (values, { resetForm, setFieldError }) => {
      const formData = new FormData();
      for (const key in values) {
        if (key === "vehicleImage") {
          formData.append(key, values[key], values[key].name);
        } else {
          formData.append(key, values[key]);
        }
      }

      const resultAction = await dispatch(addVehicleRequest(formData));
      const resData = resultAction?.payload;

      if (resData?.field && resData?.message) {
        setFieldError(resData.field, resData.message);
        return;
      }

      Swal.fire({
        icon: "success",
        title: "Success",
        text: resData?.message || "Vehicle added successfully!",
      });
      resetForm();
    },
  });

  // Show Redux backend errors in Formik fields
  useEffect(() => {
    if (error?.field && error?.message) {
      formik.setFieldError(error.field, error.message);
    }
  }, [error]);


  // Spinner
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 1000);
    return () => clearTimeout(timer);
  }, []);

  return loading ? (
    <div
      className="d-flex justify-content-center align-items-center"
      style={{ height: "100%" }}
    >
      <Lottie animationData={vehicleAnime} loop style={{ width: 300 }} />
    </div>
  ) : (
    <div className="container mt-4">
      <h3 className="mb-3">Add New Vehicle</h3>
      <form onSubmit={formik.handleSubmit} encType="multipart/form-data">
        {/* Brand, Model, Year */}
        <div className="row mb-3">
          <div className="col-4">
            <label>Brand</label>
            <input
              type="text"
              name="brandName"
              className={`form-control ${
                formik.touched.brandName && formik.errors.brandName
                  ? "is-invalid"
                  : ""
              }`}
              {...formik.getFieldProps("brandName")}
            />
            <div className="invalid-feedback">{formik.errors.brandName}</div>
          </div>
          <div className="col-4">
            <label>Model</label>
            <input
              type="text"
              name="model"
              className={`form-control ${
                formik.touched.model && formik.errors.model ? "is-invalid" : ""
              }`}
              {...formik.getFieldProps("model")}
            />
            <div className="invalid-feedback">{formik.errors.model}</div>
          </div>
          <div className="col-4">
            <label>Manufacturing Year</label>
            <input
              type="number"
              name="manufacturingYear"
              className={`form-control ${
                formik.touched.manufacturingYear &&
                formik.errors.manufacturingYear
                  ? "is-invalid"
                  : ""
              }`}
              {...formik.getFieldProps("manufacturingYear")}
            />
            <div className="invalid-feedback">
              {formik.errors.manufacturingYear}
            </div>
          </div>
        </div>

        {/* Vehicle Number & Type */}
        <div className="row mb-3">
          <div className="col-6">
            <label>Vehicle Number</label>
            <input
              type="text"
              name="vehicleNumber"
              className={`form-control ${
                formik.touched.vehicleNumber && formik.errors.vehicleNumber
                  ? "is-invalid"
                  : ""
              }`}
              value={formik.values.vehicleNumber}
              onChange={(e) =>
                formik.setFieldValue(
                  "vehicleNumber",
                  e.target.value.toUpperCase()
                )
              }
              onBlur={formik.handleBlur}
            />
            <div className="invalid-feedback">
              {formik.errors.vehicleNumber}
            </div>
          </div>
          <div className="col-6">
            <label>Vehicle Type</label>
            <select
              name="vehicleType"
              className={`form-control ${
                formik.touched.vehicleType && formik.errors.vehicleType
                  ? "is-invalid"
                  : ""
              }`}
              {...formik.getFieldProps("vehicleType")}
            >
              <option value="">Select</option>
              <option value="truck">Truck</option>
              <option value="minitruck">Mini Truck</option>
              <option value="van">Van</option>
            </select>
            <div className="invalid-feedback">{formik.errors.vehicleType}</div>
          </div>
        </div>

        {/* Chassis & Engine Numbers */}
        <div className="row mb-3">
          <div className="col-6">
            <label>Chassis Number</label>
            <input
              type="text"
              maxLength={17}
              className={`form-control ${
                formik.touched.chassisNumber && formik.errors.chassisNumber
                  ? "is-invalid"
                  : ""
              }`}
              {...formik.getFieldProps("chassisNumber")}
              onChange={(e) =>
                formik.setFieldValue(
                  "chassisNumber",
                  e.target.value.toUpperCase()
                )
              }
            />
            <div className="invalid-feedback">
              {formik.errors.chassisNumber}
            </div>
          </div>
          <div className="col-6">
            <label>Engine Number</label>
            <input
              type="text"
              className={`form-control ${
                formik.touched.engineNumber && formik.errors.engineNumber
                  ? "is-invalid"
                  : ""
              }`}
              {...formik.getFieldProps("engineNumber")}
              onChange={(e) =>
                formik.setFieldValue(
                  "engineNumber",
                  e.target.value.toUpperCase()
                )
              }
            />
            <div className="invalid-feedback">{formik.errors.engineNumber}</div>
          </div>
        </div>

        {/* Fuel Type & Capacity */}
        <div className="row mb-3">
          <div className="col-6">
            <label>Fuel Type</label>
            <select
              name="fuelType"
              className={`form-control ${
                formik.touched.fuelType && formik.errors.fuelType
                  ? "is-invalid"
                  : ""
              }`}
              {...formik.getFieldProps("fuelType")}
            >
              <option value="">Select</option>
              <option value="Diesel">Diesel</option>
              <option value="Petrol">Petrol</option>
              <option value="Electric">Electric</option>
              <option value="CNG">CNG</option>
            </select>
            <div className="invalid-feedback">{formik.errors.fuelType}</div>
          </div>
          <div className="col-6">
            <label>Fuel Tank Capacity</label>
            <input
              type="number"
              className={`form-control ${
                formik.touched.fuelTankCapacity &&
                formik.errors.fuelTankCapacity
                  ? "is-invalid"
                  : ""
              }`}
              {...formik.getFieldProps("fuelTankCapacity")}
            />
            <div className="invalid-feedback">
              {formik.errors.fuelTankCapacity}
            </div>
          </div>
        </div>

        {/* Permit Type */}
        <div className="mb-3">
          <label>Permit Type</label>
          <select
            className={`form-control ${
              formik.touched.permitType && formik.errors.permitType
                ? "is-invalid"
                : ""
            }`}
            {...formik.getFieldProps("permitType")}
          >
            <option value="">Select</option>
            <option value="national">National</option>
            <option value="state">State</option>
          </select>
          <div className="invalid-feedback">{formik.errors.permitType}</div>
        </div>

        {/* Expiry Dates */}
        <div className="row mb-3">
          {["insuranceExpiry", "pollutionExpiry", "fcDate"].map((field) => (
            <div key={field} className="col-4">
              <label>{field.replace(/([A-Z])/g, " $1")}</label>
              <input
                type="date"
                className={`form-control ${
                  formik.touched[field] && formik.errors[field]
                    ? "is-invalid"
                    : ""
                }`}
                {...formik.getFieldProps(field)}
              />
              <div className="invalid-feedback">{formik.errors[field]}</div>
            </div>
          ))}
        </div>

        {/* Image Upload */}
        <div className="mb-3">
          <label>Vehicle Image</label>
          <input
            type="file"
            name="vehicleImage"
            className={`form-control ${
              formik.touched.vehicleImage && formik.errors.vehicleImage
                ? "is-invalid"
                : ""
            }`}
            onChange={(e) =>
              formik.setFieldValue("vehicleImage", e.currentTarget.files[0])
            }
            accept="image/png, image/jpeg, image/jpg"
          />
          <div className="invalid-feedback">{formik.errors.vehicleImage}</div>
        </div>

        {/* Submit Button */}
        <div className="text-center">
          <button type="submit" className="btn btn-primary">
            Add Vehicle
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddVehicle;
