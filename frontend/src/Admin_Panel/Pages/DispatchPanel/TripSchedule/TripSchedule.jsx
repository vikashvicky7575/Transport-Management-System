import React, { useEffect, useState } from 'react';
import * as Yup from 'yup';
import { Field, Form, Formik, ErrorMessage } from 'formik';
import { useDispatch, useSelector } from 'react-redux';
import { fetchAvailableStart, createTripStart } from '../../../../Redux/Slice/tripSlice';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import TripInvoice from './TripInvoice';
import axios from 'axios';

const MAPBOX_TOKEN = 'pk.eyJ1IjoibXZpa2FzaDc1NzUiLCJhIjoiY21ic3B1c25pMDZwejJsc2lmZnRweDAwdyJ9.Qjh_NVaN-Z-HdAe0zk8gaw';

const TripSchedule = () => {
  const dispatch = useDispatch();
  const { vehicles, drivers, loading, lastCreatedTrip } = useSelector((state) => state.tripStore);

  //fetching the dispatchername automatically using redux-saga
  const { authUser } = useSelector((state) => state.authStore);

  const [pickupSuggestions, setPickupSuggestions] = useState([]);
  const [dropSuggestions, setDropSuggestions] = useState([]);
  //showInvoice useState
  const [showInvoice, setShowInvoice] = useState(false);


  useEffect(() => {
    dispatch(fetchAvailableStart());
  }, [dispatch]);

  //invoice bill
  useEffect(() => {
    if (lastCreatedTrip) {
      setShowInvoice(true); // Show invoice when data is ready
    }
  }, [lastCreatedTrip]);

  useEffect(() => {
    if (lastCreatedTrip && showInvoice) {
      toast.success('Trip scheduled successfully!', {
        position: 'top-center',
        autoClose: 1500,
      });
    }
  }, [lastCreatedTrip, showInvoice]);

  const initialValues = {
    vehicle: '',
    driver: '',
    dispatcher: authUser?.name || '', // autofill dispatcher name
    pickupCity: '',
    dropCity: '',
    pickupLocation: { name: '', coordinates: [] },
    dropLocation: { name: '', coordinates: [] },
    startDateTime: '',
    estimatedEndDateTime: '',
  };

  const validationSchema = Yup.object({
    vehicle: Yup.string().required('Vehicle is required'),
    driver: Yup.string().required('Driver is required'),
    dispatcher: Yup.string().required('Dispatcher Name is required'),
    pickupCity: Yup.string().required('Pickup City is required'),
    dropCity: Yup.string().required('Drop City is required'),
    startDateTime: Yup.string().required('Start Date & Time is required'),
    estimatedEndDateTime: Yup.string().required('Estimated End Date & Time is required'),
  });

  const fetchSuggestions = async (input, setSuggestions) => {
    if (!input) {
      setSuggestions([]);
      return;
    }

    try {
      const res = await axios.get(
        `https://api.mapbox.com/geocoding/v5/mapbox.places/${input}.json`,
        {
          params: {
            access_token: MAPBOX_TOKEN,
            autocomplete: true,
            limit: 5,
          },
        }
      );

      setSuggestions(res.data.features.map(f => f.place_name));
    } catch (err) {
      console.error('Suggestion fetch error:', err);
    }
  };

  const fetchCoordinates = async (cityName) => {
    try {
      const res = await axios.get(`https://api.mapbox.com/geocoding/v5/mapbox.places/${cityName}.json`, {
        params: {
          access_token: MAPBOX_TOKEN,
          country: 'IN', // Only search within India
          limit: 5       // Get the most relevant result
        }
      });

      const place = res.data.features[0];
      return {
        name: place.place_name,
        coordinates: place.center
      };
    } catch (err) {
      console.error('Error fetching coordinates:', err);
      return { name: cityName, coordinates: [] };
    }
  };

  //handleSubmit
  const handleSubmit = async (values, { resetForm }) => {
    const pickupLocation = await fetchCoordinates(values.pickupCity);
    const dropLocation = await fetchCoordinates(values.dropCity);

    const tripData = {
      ...values,
      pickupLocation,
      dropLocation
    };

    delete tripData.pickupCity;
    delete tripData.dropCity;

    dispatch(createTripStart(tripData));
    resetForm();
    alert('TripSchedule Form Submitted Succesfully')

  };

  return (
    <div className="container invoice-block mt-5 position-relative">
      <ToastContainer />
      <h2 className="mb-4 text-center text-primary">Trip Scheduling</h2>
      <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={handleSubmit}>
        {({ values, setFieldValue }) => (
          <Form>
            <div className="row">
              <div className="col-md-6 mb-3">
                <label className="form-label">Vehicle</label>
                <Field as="select" name="vehicle" className="form-select">
                  <option value=''>Select Vehicle</option>
                  {vehicles?.map(v => (
                    <option key={v._id} value={v._id}>{v.vehicleNumber} ({v.vehicleType})</option>
                  ))}
                </Field>
                <ErrorMessage name="vehicle" component="div" className="text-danger" />
              </div>
              <div className="col-md-6 mb-3">
                <label className="form-label">Driver</label>
                <Field as="select" name="driver" className="form-select">
                  <option value=''>Select Driver</option>
                  {drivers?.map(d => (
                    <option key={d._id} value={d._id}>{d.driverName} ({d.mobileNumber})</option>
                  ))}
                </Field>
                <ErrorMessage name="driver" component="div" className="text-danger" />
              </div>
            </div>

            {/* Pickup City with Suggestions */}
            <div className="row">
              <div className="col-md-6 mb-3 position-relative">
                <label className="form-label">Pickup City</label>
                <Field name="pickupCity">
                  {({ field }) => (
                    <div>
                      <input
                        {...field}
                        className="form-control"
                        placeholder="e.g. Chennai"
                        onChange={(e) => {
                          setFieldValue('pickupCity', e.target.value);
                          fetchSuggestions(e.target.value, setPickupSuggestions);
                        }}
                      />
                      {pickupSuggestions.length > 0 && (
                        <ul className="list-group position-absolute z-3" style={{ maxHeight: '150px', overflowY: 'auto', width: '100%' }}>
                          {pickupSuggestions.map((suggestion, index) => (
                            <li
                              key={index}
                              className="list-group-item list-group-item-action"
                              onClick={() => {
                                setFieldValue('pickupCity', suggestion);
                                setPickupSuggestions([]);
                              }}
                            >
                              {suggestion}
                            </li>
                          ))}
                        </ul>
                      )}
                    </div>
                  )}
                </Field>
                <ErrorMessage name="pickupCity" component="div" className="text-danger" />
              </div>

              {/* Drop City with Suggestions */}
              <div className="col-md-6 mb-3 position-relative">
                <label className="form-label">Drop City</label>
                <Field name="dropCity">
                  {({ field }) => (
                    <div>
                      <input
                        {...field}
                        className="form-control"
                        placeholder="e.g. Bangalore"
                        onChange={(e) => {
                          setFieldValue('dropCity', e.target.value);
                          fetchSuggestions(e.target.value, setDropSuggestions);
                        }}
                      />
                      {dropSuggestions.length > 0 && (
                        <ul className="list-group position-absolute z-3" style={{ maxHeight: '150px', overflowY: 'auto', width: '100%' }}>
                          {dropSuggestions.map((suggestion, index) => (
                            <li
                              key={index}
                              className="list-group-item list-group-item-action"
                              onClick={() => {
                                setFieldValue('dropCity', suggestion);
                                setDropSuggestions([]);
                              }}
                            >
                              {suggestion}
                            </li>
                          ))}
                        </ul>
                      )}
                    </div>
                  )}
                </Field>
                <ErrorMessage name="dropCity" component="div" className="text-danger" />
              </div>
            </div>

            <div className="row">
              <div className="col-md-6 mb-3">
                <label className="form-label">Start Date & Time</label>
                <Field type="datetime-local" name="startDateTime" className="form-control" />
                <ErrorMessage name="startDateTime" component="div" className="text-danger" />
              </div>
              <div className="col-md-6 mb-3">
                <label className="form-label">Estimated End Date & Time</label>
                <Field type="datetime-local" name="estimatedEndDateTime" className="form-control" />
                <ErrorMessage name="estimatedEndDateTime" component="div" className="text-danger" />
              </div>
            </div>

            <div className="row">
              <div className="col-md-12 mb-3">
                <label className="form-label">Dispatcher Name</label>
                <Field name="dispatcher" className="form-control" />
                <ErrorMessage name="dispatcher" component="div" className="text-danger" />
              </div>
            </div>

            <button type="submit" className="btn btn-primary w-100">
              {loading ? 'Creating Trip...' : 'Create Trip '}
            </button>
          </Form>
        )}
      </Formik>

      {/* {lastCreatedTrip && showInvoice && <TripInvoice trip={lastCreatedTrip} onClose={() => setShowInvoice(false)} />} */}

      {lastCreatedTrip && showInvoice && (
        <div className="modal fade show d-block" tabIndex="-1" role="dialog" style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}>
          <div className="modal-dialog modal-xl modal-dialog-centered" role="document">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Trip Invoice</h5>
                <button type="button" className="btn-close" onClick={() => setShowInvoice(false)}></button>
              </div>
              <div className="modal-body">
                <TripInvoice trip={lastCreatedTrip} onClose={() => setShowInvoice(false)} />
              </div>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};

export default TripSchedule;
