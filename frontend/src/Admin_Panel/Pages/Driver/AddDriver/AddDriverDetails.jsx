
import React, { useEffect, useState } from 'react'
import Lottie from 'lottie-react'
import vehicleAnime from '../../../../assets/images/vehicle3.json'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import { useDispatch, useSelector } from 'react-redux'
import { addDriverRequest, checkFieldUnique } from '../../../../Redux/Slice/driverSlice'

const validationSchema = Yup.object({
    driverName: Yup.string()
        .matches(/^[A-Za-z\s]+$/, 'Only letters and spaces are allowed')
        .required('Driver name is required'),
    mobileNumber: Yup.string()
        .matches(/^\d{10}$/, 'Mobile number must be exactly 10 digits')
        .required('Mobile number is required'),

    gender: Yup.string().required('Gender is required'),
    aadharNumber: Yup.string()
        .matches(/^\d{12}$/, 'Aadhar number must be exactly 12 digits')
        .required('Aadhar number is required'),
    licenceNumber: Yup.string()
        .required('Licence Number is required')
        .matches(/^[A-Za-z0-9\s-]{16}$/, 'Licence Number must be exactly 16 characters including space or hyphen'),
    licenseType: Yup.string()
        .required('Licence type is required'),
    joiningDate: Yup.date()
        .required('Joining Date is required')
        .max(new Date(), 'Joining Date cannot be in the future'),
    experience: Yup.string()
        .required('Experience Type is required'),
    bloodGroup: Yup.string()
        .required('Blood Group type is required'),
    emergencyContactName: Yup.string()
        .matches(/^[A-Za-z\s]+$/, 'Only letters and spaces are allowed')
        .required('Emergency Contact Name  is required'),
    emergencyContactNumber: Yup.string()
        .required('Emergency Contact Number  is required')
        .matches(/^\d{10}$/, 'Emergency contact number must be exactly 10 digits'),
    bankName: Yup.string()
        .required('Bank Name  is required'),
    accountNumber: Yup.string()
        .required('Account Number  is required')
        .matches(/^\d{16}$/, 'Account number must be exactly 16 digits'),
    ifscCode: Yup.string()
        .required('IFSC Code  is required'),
    address: Yup.string()
        .required('Address is required'),
    photo: Yup.mixed()
        .test('fileSize', 'File too large', value => {
            if (!value) return true // no file uploaded
            return value.size <= 2000000 // 2MB max
        })
        .test('fileType', 'Unsupported file format', value => {
            if (!value) return true
            return ['image/jpeg', 'image/png', 'image/jpg'].includes(value.type)
        }),
})

const AddDriverDetails = () => {
    const dispatch = useDispatch()
    const { uniqueErrors } = useSelector((state) => state.driverstore)
    const [loading, setloading] = useState(true)

    const formik = useFormik({
        initialValues: {
            driverName: '',
            mobileNumber: '',
            gender: '',
            photo: null,
            address: '',
            aadharNumber: '',
            licenceNumber: '',
            licenseType: '',
            employeeId: '',
            joiningDate: '',
            experience: '',
            bloodGroup: '',
            emergencyContactName: '',
            emergencyContactNumber: '',
            bankName: '',
            accountNumber: '',
            ifscCode: '',
        },
        validationSchema,
        onSubmit: (values, { resetForm }) => {
            setloading(true);
            const formData = new FormData()
            Object.entries(values).forEach(([key, value]) => {
                if (key === 'photo' && value) {
                    formData.append(key, value)
                } else if (value !== null && value !== '') {
                    formData.append(key, value)
                }
            })

            dispatch(addDriverRequest(formData))
            alert('Driver Details Added Successfully')
            resetForm()


        },
    })

    useEffect(() => {
        if (formik.values.mobileNumber) {
            dispatch(checkFieldUnique({ field: 'mobileNumber', value: formik.values.mobileNumber }));
        }
        if (formik.values.aadharNumber) {
            dispatch(checkFieldUnique({ field: 'aadharNumber', value: formik.values.aadharNumber }));
        }
        if (formik.values.licenceNumber) {
            dispatch(checkFieldUnique({ field: 'licenceNumber', value: formik.values.licenceNumber }));
        }
        if (formik.values.accountNumber) {
            dispatch(checkFieldUnique({ field: 'accountNumber', value: formik.values.accountNumber }));
        }

        //spinner
        const timer = setTimeout(() => {
            setloading(false)
        }, 1000);
        return () => clearTimeout(timer);

    }, [formik.values.mobileNumber, formik.values.aadharNumber, formik.values.licenceNumber, formik.values.accountNumber, dispatch]);



    return (
        <>
            {loading ? (<div className="d-flex justify-content-center align-items-center" style={{ height: '100%' }}>
                <Lottie animationData={vehicleAnime} loop={true} style={{ width: 300 }} />
            </div>) : (
                <form onSubmit={formik.handleSubmit}>
                    <h2 className="my-3">Driver Registration</h2>

                    <div className="row mb-3">
                        <div className="col-4">
                            <label>Driver Name</label>
                            <input
                                type="text"
                                name="driverName"
                                className="form-control"
                                value={formik.values.driverName.toUpperCase()}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                            />
                            {formik.touched.driverName && formik.errors.driverName && (
                                <div className="text-danger">{formik.errors.driverName}</div>
                            )}
                        </div>

                        <div className="col-4">
                            <label>Driver Mobile Number</label>
                            <input
                                type="text"
                                name="mobileNumber"
                                className="form-control"
                                value={formik.values.mobileNumber}
                                onChange={(e) => {
                                    const input = e.target.value.replace(/\D/g, ''); // Remove non-digits
                                    if (input.length <= 10) {
                                        formik.setFieldValue('mobileNumber', input);
                                    }
                                }}
                                onBlur={formik.handleBlur}
                                maxLength={10}
                            />

                            {formik.touched.mobileNumber && (formik.errors.mobileNumber || uniqueErrors.mobileNumber) && (
                                <div className="text-danger">
                                    {formik.errors.mobileNumber || uniqueErrors.mobileNumber}
                                </div>
                            )}

                            {/* {formik.touched.mobileNumber && (
                                <>
                                    {formik.errors.mobileNumber && (
                                        <div className="text-danger">{formik.errors.mobileNumber}</div>
                                    )}
                                    {
                                        // Only show if error value matches current input
                                        uniqueErrors.mobileNumber?.value === formik.values.mobileNumber && (
                                            <div className="text-danger">{uniqueErrors.mobileNumber.error}</div>
                                        )
                                    }
                                </>
                            )} */}


                        </div>

                        <div className="col-4">
                            <label>Select Gender</label>
                            <select
                                name="gender"
                                className="form-control"
                                value={formik.values.gender}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                            >
                                <option value="">Select</option>
                                <option value="Male">Male</option>
                                <option value="Female">Female</option>
                                <option value="others">Others</option>
                            </select>
                            {formik.touched.gender && formik.errors.gender && (
                                <div className="text-danger">{formik.errors.gender}</div>
                            )}
                        </div>
                    </div>

                    <div className="row mb-3">
                        <div className="col-4">
                            <label>Aadhar Number</label>
                            <input
                                type="text"
                                name="aadharNumber"
                                className="form-control"
                                value={formik.values.aadharNumber}
                                onChange={(e) => {
                                    const input = e.target.value.replace(/\D/g, ''); // Remove non-digits
                                    if (input.length <= 12) {
                                        formik.setFieldValue('aadharNumber', input);
                                    }
                                }}
                                onBlur={formik.handleBlur}
                                maxLength={12}
                            />
                            {formik.touched.aadharNumber && formik.errors.aadharNumber && (
                                <div className="text-danger">{formik.errors.aadharNumber}</div>
                            )}
                        </div>

                        <div className="col-4">
                            <label>Licence Number</label>
                            <input
                                type="text"
                                name="licenceNumber"
                                className="form-control"
                                value={formik.values.licenceNumber.toUpperCase()}
                                onChange={(e) => {
                                    const input = e.target.value.replace(/[^a-zA-Z0-9]/g, ''); // Remove non-digits
                                    if (input.length <= 16) {
                                        formik.setFieldValue('licenceNumber', input);
                                    }
                                }}
                                onBlur={formik.handleBlur}
                                maxLength={16}
                            />
                            {formik.touched.licenceNumber && formik.errors.licenceNumber && (
                                <div className="text-danger">{formik.errors.licenceNumber}</div>
                            )}
                        </div>

                        <div className="col-4">
                            <label>Licence Type</label>
                            <select
                                name="licenseType"
                                className="form-control"
                                value={formik.values.licenseType}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                            >
                                <option value="">Select</option>
                                <option value="LMV">Light Motor Vehicle</option>
                                <option value="HMV">Heavy Motor Vehicle</option>
                            </select>
                            {formik.touched.licenseType && formik.errors.licenseType && (
                                <div className="text-danger">{formik.errors.licenseType}</div>
                            )}
                        </div>
                    </div>

                    <div className="row mb-3">
                        <div className="col-4">
                            <label>Joining Date</label>
                            <input
                                type="date"
                                name="joiningDate"
                                className="form-control"
                                value={formik.values.joiningDate}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                            />
                            {formik.touched.joiningDate && formik.errors.joiningDate && (
                                <div className="text-danger">{formik.errors.joiningDate}</div>
                            )}
                        </div>

                        <div className="col-4">
                            <label>Driver Experience</label>
                            <select
                                name="experience"
                                className="form-control"
                                value={formik.values.experience}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                            >
                                <option value="">Select</option>
                                <option value="<1 year">1 Year</option>
                                <option value="1-3 years">1-3 Years</option>
                                <option value="3-5 years">3-5 Years</option>
                                <option value="5+ years">5+ Years</option>
                            </select>
                            {formik.touched.experience && formik.errors.experience && (
                                <div className="text-danger">{formik.errors.experience}</div>
                            )}
                        </div>

                        <div className="col-4">
                            <label>Blood Group</label>
                            <select
                                name="bloodGroup"
                                className="form-control"
                                value={formik.values.bloodGroup}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                            >
                                <option value="">Select</option>
                                <option value="A+">A+</option>
                                <option value="A-">A-</option>
                                <option value="B+">B+</option>
                                <option value="B-">B-</option>
                                <option value="AB+">AB+</option>
                                <option value="O+">O+</option>
                                <option value="O-">O-</option>
                            </select>
                            {formik.touched.bloodGroup && formik.errors.bloodGroup && (
                                <div className="text-danger">{formik.errors.bloodGroup}</div>
                            )}
                        </div>
                    </div>

                    <div className="row mb-3">
                        <div className="col-6">
                            <label>Emergency Contact Name</label>
                            <input
                                type="text"
                                name="emergencyContactName"
                                className="form-control"
                                value={formik.values.emergencyContactName.toUpperCase()}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                            />
                            {formik.touched.emergencyContactName && formik.errors.emergencyContactName && (
                                <div className="text-danger">{formik.errors.emergencyContactName}</div>
                            )}
                        </div>

                        <div className="col-6">
                            <label>Emergency Contact Number</label>
                            <input
                                type="text"
                                name="emergencyContactNumber"
                                className="form-control"
                                value={formik.values.emergencyContactNumber}
                                onChange={(e) => {
                                    const input = e.target.value.replace(/\D/g, ''); // Remove non-digits
                                    if (input.length <= 10) {
                                        formik.setFieldValue('emergencyContactNumber', input);
                                    }
                                }}
                                onBlur={formik.handleBlur}
                            />
                            {formik.touched.emergencyContactNumber && formik.errors.emergencyContactNumber && (
                                <div className="text-danger">{formik.errors.emergencyContactNumber}</div>
                            )}
                        </div>
                    </div>

                    <div className="row mb-3">
                        <div className="col-4">
                            <label>Bank Name</label>
                            <input
                                type="text"
                                name="bankName"
                                className="form-control"
                                value={formik.values.bankName.toUpperCase()}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                            />
                            {formik.touched.bankName && formik.errors.bankName && (
                                <div className="text-danger">{formik.errors.bankName}</div>
                            )}
                        </div>

                        <div className="col-4">
                            <label>Account Number</label>
                            <input
                                type="text"
                                name="accountNumber"
                                className="form-control"
                                value={formik.values.accountNumber}
                                onChange={(e) => {
                                    const input = e.target.value.replace(/\D/g, ''); // Remove non-digits
                                    if (input.length <= 16) {
                                        formik.setFieldValue('accountNumber', input);
                                    }
                                }}
                                onBlur={formik.handleBlur}
                            />
                            {formik.touched.accountNumber && formik.errors.accountNumber && (
                                <div className="text-danger">{formik.errors.accountNumber}</div>
                            )}
                        </div>

                        <div className="col-4">
                            <label>IFSC Code</label>
                            <input
                                type="text"
                                name="ifscCode"
                                className="form-control"
                                value={formik.values.ifscCode.toUpperCase()}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                            />
                            {formik.touched.ifscCode && formik.errors.ifscCode && (
                                <div className="text-danger">{formik.errors.ifscCode}</div>
                            )}
                        </div>
                    </div>

                    <div className="row mb-3">
                        <div className="col-6">
                            <label>Address</label>
                            <input
                                type="text"
                                name="address"
                                className="form-control"
                                value={formik.values.address.toUpperCase()}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                            />
                            {formik.touched.address && formik.errors.address && (
                                <div className="text-danger">{formik.errors.address}</div>
                            )}
                        </div>

                        <div className="col-6">
                            <label>Image Upload</label>
                            <input
                                type="file"
                                name="photo"
                                className="form-control"
                                onChange={(event) => {
                                    formik.setFieldValue('photo', event.currentTarget.files[0])
                                }}
                                onBlur={formik.handleBlur}
                            />
                            {formik.touched.photo && formik.errors.photo && (
                                <div className="text-danger">{formik.errors.photo}</div>
                            )}
                        </div>
                    </div>

                    <div className="d-flex justify-content-center">
                        <button className="btn btn-primary" type="submit">
                            Submit
                        </button>
                    </div>
                </form>
            )}
        </>
    )

}


export default AddDriverDetails


