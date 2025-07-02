import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import swal from "sweetalert2";
import { loginRequest, clearAuthStatus } from "../../Redux/Slice/authSlice";
import { useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";
import styles from "./Login.module.css";
import loginImage from "../../assets/images/login.jpg";
import "bootstrap-icons/font/bootstrap-icons.css";
import LoginGreeting from "./LoginGreeting";

const Login = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { success, error, authUser } = useSelector((state) => state.authStore);
    const [showPassword, setShowPassword] = useState(false);

    const validationSchema = Yup.object({
        email: Yup.string().email("Invalid email address").required("Email is required"),
        role: Yup.string().oneOf(["admin", "dispatcher", "driver"], "Invalid role").required("Role is required"),
        password: Yup.string().min(6, "Minimum 6 characters").required("Password is required"),
    });

    const formik = useFormik({
        initialValues: { email: "", role: "", password: "" },
        validationSchema,
        onSubmit: (values) => {
            dispatch(loginRequest(values));
        },
    });

    useEffect(() => {
    if (success && authUser) {
        swal.fire({
            icon: "success",
            title: "Login Successful",
            text: "Welcome back!",
            timer: 2000,
            showConfirmButton: false,
        }).then(() => {
            formik.resetForm();
            dispatch(clearAuthStatus());
            const role = authUser.role;
            if (role === "admin") navigate("/admin/dashboard");
            else if (role === "dispatcher") navigate("/dispatcher/dashboard");
            else if (role === "driver") navigate("/driver");
            else navigate("/");
        });
    }

    if (error) {
        formik.setErrors({}); // Clear previous errors
        console.log("Error from backend:", error);

        // If it's an array of field errors
        if (Array.isArray(error)) {
            const fieldErrors = {};
            error.forEach(err => {
                if (err.field && err.message) {
                    formik.setFieldTouched(err.field, true, false);
                    fieldErrors[err.field] = err.message;
                }
            });
            formik.setErrors(fieldErrors);

        } else {
            // fallback: single field error
            const msg = error.message || "Something went wrong";
            formik.setErrors({ general: msg });

            swal.fire({
                icon: "error",
                title: "Login Failed",
                text: msg,
            });
        }

        dispatch(clearAuthStatus());
    }
}, [success, error, authUser, dispatch, navigate, formik]);


    return (
        <div className={`container-fluid ${styles.containerHead} vh-100 d-flex align-items-center justify-content-center`}>
            <div className="row shadow-lg w-100 rounded-4 overflow-hidden" style={{ maxWidth: "800px" }}>
                {/* Left side */}
                <div className="col-md-6 d-none d-md-flex flex-column justify-content-center align-items-center text-white p-0 bg-gradient">
                    <img src={loginImage} alt="Login Visual" className="img-fluid rounded " />


                </div>

                {/* Right side (form) */}
                <div className="col-md-6 bg-white p-4">
                    <h3 className="text-center mb-4">Login</h3>
                    <LoginGreeting />
                    <form onSubmit={formik.handleSubmit}>
                        {/* Email */}
                        <div className="mb-3">
                            <label className="form-label">Email</label>
                            <input
                                type="email"
                                name="email"
                                className={`form-control ${formik.touched.email && formik.errors.email ? "is-invalid" : ""}`}
                                placeholder="Enter your email"
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                value={formik.values.email.toLowerCase()}
                            />
                            {formik.touched.email && formik.errors.email && (
                                <div className="invalid-feedback">{formik.errors.email}</div>
                            )}
                        </div>

                        {/* Role */}
                        {/* <div className="mb-3">
                            <label className="form-label">Role</label>
                            <select
                                name="role"
                                className={`form-control ${formik.touched.role && formik.errors.role ? "is-invalid" : ""}`}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                value={formik.values.role}
                            >
                                <option value="">Select Role</option>
                                <option value="admin">Admin</option>
                                <option value="dispatcher">Dispatcher</option>
                                <option value="driver">Driver</option>
                            </select>
                            {formik.touched.role && formik.errors.role && (
                                <div className="invalid-feedback">{formik.errors.role}</div>
                            )}
                        </div> */}
                        <div className="mb-3">
                            <label className="form-label">Role</label>
                            <select
                                name="role"
                                className={`form-control ${formik.errors.role ? "is-invalid" : ""}`}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                value={formik.values.role}
                            >
                                <option value="">Select Role</option>
                                <option value="admin">Admin</option>
                                <option value="dispatcher">Dispatcher</option>
                                <option value="driver">Driver</option>
                            </select>

                            {/* Don't rely on touched */}
                            {formik.errors.role && (
                                <div className="invalid-feedback d-block">{formik.errors.role}</div>
                            )}
                        </div>

                        {/* Password */}
                        <div className="mb-4">
                            <label className="form-label">Password</label>
                            <div className="input-group">
                                <input
                                    type={showPassword ? "text" : "password"}
                                    name="password"
                                    className={`form-control ${formik.touched.password && formik.errors.password ? "is-invalid" : ""}`}
                                    placeholder="Enter your password"
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    value={formik.values.password}
                                />
                                <span
                                    className="input-group-text"
                                    onClick={() => setShowPassword(!showPassword)}
                                    style={{ cursor: "pointer" }}
                                >
                                    <i className={`bi ${showPassword ? "bi-eye-slash" : "bi-eye"}`}></i>
                                </span>
                            </div>
                            {formik.touched.password && formik.errors.password && (
                                <div className="invalid-feedback d-block">{formik.errors.password}</div>
                            )}
                        </div>

                        <button type="submit" className="btn btn-primary  w-100">
                            Login
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Login;

