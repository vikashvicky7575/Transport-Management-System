
import { call, put, takeLatest,all } from "redux-saga/effects";
import axios from "axios";
import {
  fetchDashboardRequest,
  fetchDashboardSuccess,
  fetchDashboardFailure,
} from "../Slice/dashboardSlice";

function* fetchDashboardDataWorker() {
  try {
    const [availableVehiclesRes, availableDriversRes, onTripRes, maintenanceRes] = yield all([
      call(axios.get, `${process.env.REACT_APP_API_BASE_URL}/vehicles/available`),
      call(axios.get, `${process.env.REACT_APP_API_BASE_URL}/drivers/driverDetails`),
       call(axios.get,`${process.env.REACT_APP_API_BASE_URL}/tripSchedule/ontripVehicles`),
      call(axios.get, `${process.env.REACT_APP_API_BASE_URL}/mainteances/getAllmainteances`), 
    ]);

    yield put(
      fetchDashboardSuccess({
        onTripVehicles: onTripRes.data,
        availableVehicles: availableVehiclesRes.data,
        availableDrivers: availableDriversRes.data.data,
        maintenanceVehicles: maintenanceRes.data,
      })
    );
  } catch (error) {
    yield put(fetchDashboardFailure(error.message));
  }
}

export function* dashboardSaga() {
  yield takeLatest(fetchDashboardRequest.type, fetchDashboardDataWorker);
}
