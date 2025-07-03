
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

const BASE_URL = `${process.env.REACT_APP_API_BASE_URL}`

// Worker Saga: addVehicleWorker
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
