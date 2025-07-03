import {call,put,takeLatest,all} from 'redux-saga/effects';
import axios from 'axios';
import {fetchAdminDashboardRequest,fetchAdminDashboardSuccess,fetchAdminDashboardFailure} from "../Slice/adminDashboardSlice";


//workerSaga:fetchAdminDashBoardWorker

function* fetchAdminDashBoardWorker(){
  try{
       const [totalVehicleRes,totalDriverRes,activeTripsres,BookingHistoryRes] = yield all([
         call(axios.get,`${process.env.REACT_APP_API_BASE_URL}/vehicles`),
         call(axios.get,`${process.env.REACT_APP_API_BASE_URL}/drivers/driverDetails`),
         call(axios.get,`${process.env.REACT_APP_API_BASE_URL}/tripSchedule/ontripVehicles`),
         call(axios.get,`${process.env.REACT_APP_API_BASE_URL}/tripSchedule/getAllTripdetails`)
       ]);

       yield put(
        fetchAdminDashboardSuccess({
            totalvehicles:totalVehicleRes.data.data,
            totalDriver:totalDriverRes.data.data,
            activeTrips:activeTripsres.data,
            bookingHistory:BookingHistoryRes.data
        })
       )
  }catch(err){
    yield put(fetchAdminDashboardFailure(err.message))
  }
}

//watcher Saga: fetchAdminSaga
export function* AdminDashboardSaga(){
    yield takeLatest(fetchAdminDashboardRequest.type,fetchAdminDashBoardWorker)
}
