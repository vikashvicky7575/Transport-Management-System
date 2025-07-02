import { call, put, takeLatest } from 'redux-saga/effects'
import { addDriverRequest, addDriverSuccess, addDriverFailure, fetchDriverRequest, fetchDriverSuccess, fetchDriverFailure, checkFieldUnique, setUniqueError } from '../Slice/driverSlice'
import axios from 'axios'


const BASE_URL = 'http://localhost:5000/api';

//worker saga : DriverDetails Post
function* postDriverdetailsWorker(action) {
    try {
        const response = yield call(() => axios.post(`${BASE_URL}/drivers/add`, action.payload, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        }))
        yield put(addDriverSuccess(response.data))
        console.log('Post Driver Details success:', response.data)
    } catch (error) {
        yield put(addDriverFailure(error.message))
        console.log('Driver Details Fails ', error.message);

    }
}

//workerSaga:checkFieldUniqueSaga
function* checkFieldUniqueSaga(action) {
    const { field, value } = action.payload;
    try {
        const res = yield call(() => axios.post(`${BASE_URL}/drivers/uniqueDriverDetails`, { field, value }));
        if (!res.data.isUnique) {
            yield put(setUniqueError({ field, error: `${field} already exists` }));
        }
    } catch (error) {
        console.log(error)
    }
}

//workersaga:DriverDetails Get
function* fetchDriverDetailsWorker() {
    try {
        const response = yield call(() => axios.get(`${BASE_URL}/drivers/driverDetails`))
        yield put(fetchDriverSuccess(response.data))
        console.log('Get driver Details Success', response.data)
    } catch (error) {
        yield put(fetchDriverFailure(error.message))
        console.log('Get Driver Details Fails ', error.message);
    }
}

//watcherSaga
export function* driverDetailsSaga() {
    yield takeLatest(addDriverRequest.type, postDriverdetailsWorker);
    yield takeLatest(checkFieldUnique.type, checkFieldUniqueSaga);
    yield takeLatest(fetchDriverRequest.type, fetchDriverDetailsWorker);
}



