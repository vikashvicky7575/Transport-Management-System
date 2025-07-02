
// import React, { useEffect } from 'react'
// import { useDispatch, useSelector } from 'react-redux'
// import { fetchVehicleRequest } from '../../../../Redux/Slice/vehicleSlice'
// import { Link } from 'react-router-dom'

// const Viewvehicles = () => {
//     const dispatch = useDispatch()
//     const { vehicle, loading, error } = useSelector((state) => state.vehicleStore)

//     useEffect(() => {
//         dispatch(fetchVehicleRequest())
//     }, [dispatch])

//     return (
//         <div className='container mt-4'>
//             <h3 className='mb-4 text-primary fw-bold'>All Vehicles</h3>
//             {loading && <p>Loading...</p>}
//             {error && <p className='text-danger'>{error}</p>}

//             <div className='row g-4'>
//                 {vehicle.length > 0 ? (
//                     vehicle.map((v) => (
//                         <div className='col-md-6 col-lg-4' key={v._id}>
//                             <div className="card shadow-sm h-100 border-0 rounded-3">
//                                 <img
//                                     className="card-img-top rounded-top"
//                                     src={`http://localhost:5000/uploads/${v.vehicleImage}`}
//                                     alt={v.brandName}
//                                     style={{ height: '200px', objectFit: 'cover' }}
//                                 />
//                                 <div className="card-body">
//                                     <h5 className="card-title text-primary">{v.brandName} - {v.model}</h5>
//                                     <ul className="list-unstyled mb-3">
//                                         <li><strong>Vehicle No:</strong> {v.vehicleNumber}</li>
//                                         <li><strong>Type:</strong> {v.vehicleType}</li>
//                                         <li><strong>Fuel:</strong> {v.fuelType}</li>
//                                         <li><strong>Year:</strong> {v.manufacturingYear}</li>
//                                         <li><strong>Chassis No:</strong> {v.chassisNumber}</li>
//                                         <li><strong>Engine No:</strong> {v.engineNumber}</li>
//                                         <li><strong>Tank Capacity:</strong> {v.fuelTankCapacity} L</li>
//                                         <li><strong>Insurance Expiry:</strong> {v.insuranceExpiry}</li>
//                                         <li><strong>Pollution Expiry:</strong> {v.pollutionExpiry}</li>
//                                         <li><strong>FC Date:</strong> {v.fcDate}</li>
//                                         <li><strong>Permit:</strong> <span className="badge bg-success">{v.permitType}</span></li>
//                                     </ul>
//                                 </div>
//                                 {/* Update & delete button */}
//                                 <div className='d-flex justify-content-end m-3'>
//                                     <Link className='btn btn-warning  mx-2' to='/admin/updateVehicle' state={{ vehicleData: v }}>Update</Link>
//                                     <button className='btn btn-danger '>Delete</button>
//                                 </div>
//                             </div>
//                         </div>
//                     ))
//                 ) : (
//                     <p>No vehicles found</p>
//                 )}
//             </div>
//         </div>
//     )
// }

// export default Viewvehicles;


import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchVehicleRequest } from '../../../../Redux/Slice/vehicleSlice'
import { Link } from 'react-router-dom'

const Viewvehicles = () => {
    const dispatch = useDispatch()
    const { vehicle, loading, error } = useSelector((state) => state.vehicleStore)

    useEffect(() => {
        dispatch(fetchVehicleRequest())
    }, [dispatch])

    return (
        <div className='container mt-4'>
            <h3 className='mb-4 text-primary fw-bold'>All Vehicles</h3>
            {loading && <p>Loading...</p>}
            {error && <p className='text-danger'>{error}</p>}

            <div className='row g-4'>
                {vehicle.length > 0 ? (
                    vehicle.map((v) => (
                        <div className='col-md-6 col-lg-4' key={v._id}>
                            <div className="card shadow-sm h-100 border-0 rounded-3">
                                <img
                                    className="card-img-top rounded-top"
                                    src={`http://localhost:5000/uploads/${v.vehicleImage}`}
                                    alt={v.brandName}
                                    style={{ height: '200px', objectFit: 'cover' }}
                                />
                                <div className="card-body">
                                    <h5 className="card-title text-primary">{v.brandName} - {v.model}</h5>
                                    <ul className="list-unstyled mb-3">
                                        <li><strong>Vehicle No:</strong> {v.vehicleNumber}</li>
                                        <li><strong>Type:</strong> {v.vehicleType}</li>
                                        <li><strong>Fuel:</strong> {v.fuelType}</li>
                                        <li><strong>Year:</strong> {v.manufacturingYear}</li>
                                        <li><strong>Chassis No:</strong> {v.chassisNumber}</li>
                                        <li><strong>Engine No:</strong> {v.engineNumber}</li>
                                        <li><strong>Tank Capacity:</strong> {v.fuelTankCapacity} L</li>
                                        <li><strong>Insurance Expiry:</strong> {v.insuranceExpiry}</li>
                                        <li><strong>Pollution Expiry:</strong> {v.pollutionExpiry}</li>
                                        <li><strong>FC Date:</strong> {v.fcDate}</li>
                                        <li><strong>Permit:</strong> <span className="badge bg-success">{v.permitType}</span></li>
                                    </ul>
                                </div>
                                {/* Update & delete button */}
                                <div className='d-flex justify-content-end m-3'>
                                    {/* Pass single vehicle object, NOT whole array */}
                                    <Link
                                        className='btn btn-warning mx-2'
                                        to='/admin/updateVehicle'
                                        state={{ vehicleData: v }}
                                    >
                                        Update
                                    </Link>
                                    <button className='btn btn-danger '>Delete</button>
                                </div>
                            </div>
                        </div>
                    ))
                ) : (
                    <p>No vehicles found</p>
                )}
            </div>
        </div>
    )
}

export default Viewvehicles

