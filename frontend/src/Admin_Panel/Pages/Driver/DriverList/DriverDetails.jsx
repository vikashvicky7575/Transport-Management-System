import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchDriverRequest } from '../../../../Redux/Slice/driverSlice';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';

const DriverDetails = () => {
    const dispatch = useDispatch();

    // ✅ Add fallback values to avoid undefined error
    const {
        driverData = [],
        loading = false,
        error = null
    } = useSelector((state) => state.driverstore || {});

    const [localLoading, setLocalLoading] = useState(true);

    useEffect(() => {
        dispatch(fetchDriverRequest());

        // Skeleton display minimum delay
        const timer = setTimeout(() => {
            setLocalLoading(false);
        }, 2000);

        return () => clearTimeout(timer);
    }, [dispatch]);

    const renderSkeletonCard = () => (
        <div className="col-4" key={Math.random()}>
            <div className="card h-100 shadow">
                <Skeleton height={250} />
                <div className="card-body">
                    <h5 className="card-title"><Skeleton width={150} /></h5>
                    <p className="card-text mb-1"><Skeleton count={6} /></p>
                </div>
            </div>
        </div>
    );

    return (
        <div className="container mt-4">
            <h3 className="mb-4 text-primary fw-bold">All Drivers</h3>
            {error && <p className="text-danger">Error: {error}</p>}

            <div className="row row-cols-1 row-cols-md-2 row-cols-lg-3 g-4">
                {(loading || localLoading) ? (
                    Array(driverData.length || 6).fill().map(() => renderSkeletonCard())
                ) : (
                    driverData.length > 0 ? driverData.map((d) => (
                        <div className="col-4" key={d._id}>
                            <div className="card h-100 shadow">
                                <img
                                    src={`http://localhost:5000/uploads/${d.photo}`}
                                    className="card-img-top"
                                    alt={d.driverName}
                                    style={{ height: '250px', objectFit: 'cover' }}
                                />
                                <div className="card-body">
                                    <h5 className="card-title text-primary">{d.driverName}</h5>
                                    <p className="card-text mb-1"><strong>Employee ID:</strong> {d.employeeId}</p>
                                    <p className="card-text mb-1"><strong>Mobile:</strong> {d.mobileNumber}</p>
                                    <p className="card-text mb-1"><strong>Gender:</strong> {d.gender}</p>
                                    <p className="card-text mb-1"><strong>Address:</strong> {d.address}</p>
                                    <p className="card-text mb-1"><strong>Aadhar:</strong> {d.aadharNumber}</p>
                                    <p className="card-text mb-1"><strong>License:</strong> {d.licenceNumber} ({d.licenceType})</p>
                                    <p className="card-text mb-1"><strong>Joining Date:</strong> {new Date(d.joiningDate).toLocaleDateString()}</p>
                                    <p className="card-text mb-1"><strong>Experience:</strong> {d.experience}</p>
                                    <p className="card-text mb-1"><strong>Blood Group:</strong> {d.bloodGroup}</p>
                                    <p className="card-text mb-1"><strong>Emergency Contact:</strong> {d.emergencyContactName} - {d.emergencyContactNumber}</p>
                                    <p className="card-text mb-1"><strong>Bank:</strong> {d.bankName}</p>
                                    <p className="card-text mb-1"><strong>Account Number:</strong> {d.accountNumber}</p>
                                    <p className="card-text"><strong>IFSC:</strong> {d.ifscCode}</p>
                                </div>

                                <div className='d-flex justify-content-end m-3'>
                                    <button className='btn btn-success mx-2'>Update</button>
                                    <button className='btn btn-danger'>Delete</button>
                                </div>
                            </div>
                        </div>
                    )) : (
                        <p className='text-muted'>No Driver Details found</p>
                    )
                )}
            </div>
        </div>
    );
};

export default DriverDetails;


