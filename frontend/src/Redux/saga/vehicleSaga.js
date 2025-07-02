
import { takeLatest, call, put } from 'redux-saga/effects';
import axios from 'axios';
import {
  addVehicleRequest,
  addVehicleSuccess,
  addVehicleFailure,
  fetchVehicleRequest,
  fetchVehicleFailure,
  fetchVehicleSuccess,
  updateVehicleRequest
} from '../Slice/vehicleSlice';

const BASE_URL = 'http://localhost:5000/api/vehicles'

// Worker Saga: addVehicleWorker

// function* addVehicleWorker(action) {
//   try {
//     console.log("Payload received in saga:", action.payload); // Debug

//     // Make API call to backend with FormData
//     const response = yield call(() =>
//       axios.post(
//         `${BASE_URL}/add-vehicle`,
//         action.payload,
//         {
//           headers: {
//             'Content-Type': 'multipart/form-data',
//           },
//         }
//       )
//     );

//     console.log('Vehicle API success:', response.data); // Debug
//     yield put(addVehicleSuccess(response.data));
//   } catch (error) {
//     console.error('Vehicle API error:', error.response?.data || error.message); // Debug
//     yield put(addVehicleFailure(error.response?.data?.error || error.message));
//   }
// }

function* addVehicleWorker(action) {
  try {
    const response = yield call(() =>
      axios.post(`${BASE_URL}/add-vehicle`, action.payload, {
        headers: { 'Content-Type': 'multipart/form-data' },
      })
    );

    yield put(addVehicleSuccess(response.data));
  } catch (error) {
    // const errData = error.response?.data;
    // yield put(addVehicleFailure({
    //   message: errData?.error || error.message,
    //   field: errData?.field || 'general',
    // }));
    const errData = error.response?.data;
    yield put(addVehicleFailure({ message: errData?.error || error.message, field: errData?.field }));
  }
}


//Worker Saga: GetVehicleWorker
function* getVehicleWorker() {
  try {
    const response = yield call(axios.get, `${BASE_URL}`);
    yield put(fetchVehicleSuccess(response.data.data));
    console.log(response.data.data)
  } catch (error) {
    yield put(fetchVehicleFailure(error.message))
    console.log(error.message)
  }
}

//WorkerSaga: updateVehicle
function* updateVehicleWorker(action) {
  try {
    const { _id, ...updatedData } = action.payload;
    const response = yield call(axios.put, `${BASE_URL}/updatevehicle/:_id`, updatedData);
    yield put(fetchVehicleSuccess(response.data))
    console.log('UpdateUserSuccess', response.data)
  } catch (err) {
    yield put(fetchVehicleFailure(err.message))
    console.log('UpdateUserFailure', err.message)
  }
}


// Watcher Saga: watches for dispatched actions
export function* vehicleSaga() {
  yield takeLatest(addVehicleRequest.type, addVehicleWorker);
  yield takeLatest(fetchVehicleRequest.type, getVehicleWorker);
  yield takeLatest(updateVehicleRequest.type, updateVehicleWorker);
}
