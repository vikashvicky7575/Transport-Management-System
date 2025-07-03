import { call, put, takeLatest } from 'redux-saga/effects';
import axios from 'axios'
import {
    fetchAvailableStart, fetchAvailableSuccess, fetchAvailableFail,
    createTripStart, createTripSuccess, createTripFail,fetchtripHistoryStart,fetchtripHistorySuccess,fetchtripHistoryFailure ,fetchVehiclesOnTripStart, fetchVehiclesOnTripSuccess, fetchVehiclesOnTripFailure, updateTripStatusStart, updateTripStatusSuccess, updateTripStatusFailure
} from '../Slice/tripSlice'

const BASE_URL = `${process.env.REACT_APP_API_BASE_URL}/tripSchedule`

//workerSaga:createTrip
function* createTripWorker(action) {
    try {
        const res = yield call(axios.post, `${BASE_URL}/tripPost`, action.payload)
        yield put(createTripSuccess(res.data))
        console.log('createTripData:', res.data)
    } catch (err) {
        yield put(createTripFail(err.message));
    }
}

//workerSaga: getalltripdetails
function* fetchallTripDetails(){
  try{
  const res = yield call(axios.get, `${BASE_URL}/getAllTripdetails`)
  yield put(fetchtripHistorySuccess(res.data))
  console.log('TripAllDetailSuccess:',res.data)
  }catch(err){
    yield put(fetchtripHistoryFailure(err.message))
    console.error('tripAllDetailsFailure:',err.message)
  }
}

//WorkerSaga:availableSaga
function* fetchAvailableWorker() {
    try {
        const res = yield call(axios.get, `${BASE_URL}/available`);
        yield put(fetchAvailableSuccess(res.data));
        console.log('Get Vehicle & driver Data:', res.data)
    } catch (err) {
        yield put(fetchAvailableFail(err.message));
    }
}

//workerSaga:fetch OnTripVehicles
function* fetchVehiclesOnTripSaga() {
    try {
        const response = yield call(axios.get, `${BASE_URL}/ontripVehicles`);
        yield put(fetchVehiclesOnTripSuccess(response.data));
        console.log('Fetch onTrip Vehicle :', response.data)
    } catch (error) {
        yield put(fetchVehiclesOnTripFailure(error.message));
        console.log('Fetch onTrip Vehicle Failure:', error.message)
    }
}

//WorkerSaga:updateTripstatusSaga
function* updateTripStatusSaga(action) {
    try {
        const { tripId, status } = action.payload;
        const res = yield call(axios.patch, `${BASE_URL}/tripUpdateStatus`, { tripId, status });
        yield put(updateTripStatusSuccess({ tripId, status }));
        // yield put(fetchVehiclesOnTripStart());
        console.log('updateStatus', res.data)
    } catch (error) {
        yield put(updateTripStatusFailure(error.message));
        console.log('updateFailure', error.message)
    }
}


//watcherSaga
export function* tripSaga() {
    yield takeLatest(createTripStart.type, createTripWorker)
    yield takeLatest(fetchAvailableStart.type, fetchAvailableWorker)
    yield takeLatest(fetchVehiclesOnTripStart.type, fetchVehiclesOnTripSaga)
    yield takeLatest(updateTripStatusStart.type, updateTripStatusSaga)
    yield takeLatest(fetchtripHistoryStart.type,fetchallTripDetails)
}