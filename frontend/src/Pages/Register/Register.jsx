import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { registerRequest, clearAuthStatus } from "../../Redux/Slice/authSlice";
import { useNavigate } from "react-router-dom";
import swal from "sweetalert2";
import { useFormik } from "formik";
import * as Yup from "yup";
import "../../../node_modules/bootstrap-icons/font/bootstrap-icons.css";

const Register = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { success, error } = useSelector((state) => state.authStore);

    // Toggle password visibility
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    const validationSchema = Yup.object({
        name: Yup.string()
            .matches(/^[A-Za-z ]*$/, "Only characters are allowed")
            .required("Name is required"),
        email: Yup.string()
            .email("Invalid email address")
            .required("Email is required"),
        role: Yup.string()
            .oneOf(["admin", "dispatcher", "driver"], "Invalid role")
            .required("Role is required"),
        password: Yup.string()
            .min(6, "Password must be at least 6 characters")
            .required("Password is required"),
        confirmPassword: Yup.string()
            .oneOf([Yup.ref("password"), null], "Passwords must match")
            .required("Confirm Password is required"),
    });

    const formik = useFormik({
        initialValues: {
            name: "",
            email: "",
            role: "",
            password: "",
            confirmPassword: "",
        },
        validationSchema,
        onSubmit: (values) => {
            dispatch(registerRequest(values));
        },
    });

    useEffect(() => {
        if (success) {
            swal
                .fire({
                    icon: "success",
                    title: "Registration Successful",
                    text: "You have registered successfully!",
                    timer: 2000,
                    showConfirmButton: false,
                })
                .then(() => {
                    formik.resetForm();
                    dispatch(clearAuthStatus());

                });
        }
        if (error) {
            swal.fire({
                icon: "error",
                title: "Registration Failed",
                text: error.includes("already") ? "Email already exists" : error,
            });
        }
        // if (error && formik.values.email) {
        //     dispatch(clearAuthStatus());
        // }
    }, [success, error, navigate, formik, dispatch,]);

    return (
        <div className="container mt-5">
            <div className="row justify-content-center">
                <div className="col-md-6">
                    <div className="card shadow">
                        <div className="card-body">
                            <h3 className="card-title text-center mb-4">Register</h3>
                            <form onSubmit={formik.handleSubmit}>
                                {/* Name */}
                                <div className="mb-3">
                                    <label className="form-label">Name</label>
                                    <input
                                        name="name"
                                        className={`form-control ${formik.touched.name && formik.errors.name ? "is-invalid" : ""}`}
                                        placeholder="Enter your name"
                                        onChange={formik.handleChange}
                                        onBlur={formik.handleBlur}
                                        value={formik.values.name}
                                    />
                                    {formik.touched.name && formik.errors.name && (
                                        <div className="invalid-feedback">{formik.errors.name}</div>
                                    )}
                                </div>

                                {/* Email */}
                                <div className="mb-3">
                                    <label className="form-label">Email</label>
                                    <input
                                        name="email"
                                        type="email"
                                        className={`form-control ${formik.touched.email && formik.errors.email ? "is-invalid" : ""}`}
                                        placeholder="Enter your email"
                                        onChange={(e) => {
                                            formik.handleChange(e);
                                            if (error) dispatch(clearAuthStatus());
                                        }}
                                        onBlur={formik.handleBlur}
                                        value={formik.values.email.toLowerCase()}
                                    />
                                    {formik.touched.email && formik.errors.email && (
                                        <div className="invalid-feedback">{formik.errors.email}</div>
                                    )}
                                </div>

                                {/* Role Access */}
                                <div className="mb-3">
                                    <label className="form-label">Role Access</label>
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
                                </div>

                                {/* Password */}
                                <div className="mb-3 position-relative">
                                    <label className="form-label">Password</label>
                                    <div className="input-group">
                                        <input
                                            type={showPassword ? "text" : "password"}
                                            name="password"
                                            className={`form-control ${formik.touched.password && formik.errors.password ? "is-invalid" : ""}`}
                                            placeholder="Enter password"
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

                                {/* Confirm Password */}
                                <div className="mb-4 position-relative">
                                    <label className="form-label">Confirm Password</label>
                                    <div className="input-group">
                                        <input
                                            type={showConfirmPassword ? "text" : "password"}
                                            name="confirmPassword"
                                            className={`form-control ${formik.touched.confirmPassword && formik.errors.confirmPassword ? "is-invalid" : ""}`}
                                            placeholder="Confirm password"
                                            onChange={formik.handleChange}
                                            onBlur={formik.handleBlur}
                                            value={formik.values.confirmPassword}
                                        />
                                        <span
                                            className="input-group-text"
                                            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                            style={{ cursor: "pointer" }}
                                        >
                                            <i className={`bi ${showConfirmPassword ? "bi-eye-slash" : "bi-eye"}`}></i>
                                        </span>
                                    </div>
                                    {formik.touched.confirmPassword && formik.errors.confirmPassword && (
                                        <div className="invalid-feedback d-block">{formik.errors.confirmPassword}</div>
                                    )}
                                </div>

                                <button type="submit" className="btn btn-primary w-100">
                                    Register
                                </button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Register;
