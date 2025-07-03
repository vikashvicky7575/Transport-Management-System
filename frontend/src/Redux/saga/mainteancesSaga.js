import { call, put, takeLatest } from "redux-saga/effects";
import {
  mainteanceRequest,
  mainteancesSuccess,
  mainteancesFailure,
  fetchMaiteancesRequest,
  fetchMainteancesSuccess,
  fetchMainteancesFailure,
  fetchMaiteancesHistoryRequest,
  fetchMainteancesHistorySuccess,
  fetchMainteancesHistoryFailure
} from "../Slice/mainteancesSlice";
import axios from "axios";

const BASE_URL = `${process.env.REACT_APP_API_BASE_URL}/mainteances`;

//Worker Saga: MainteancesDetails Post
function* postMainteancesDetailsWorker(action) {
  try {
    const response = yield call(() =>
      axios.post(`${BASE_URL}/mainteancesPost`, action.payload, )
    );
    yield put(mainteancesSuccess(response.data));
    console.log("Post Mainteances Details success:", response.data);
  } catch (error) {
    yield put(mainteancesFailure(error.message));
    console.log("Mainteances Details Fails ", error.message);
  }
}

//Worker Saga: fetchMainteances All details Get
function* fetchAllMainteancesHistory(action){
try{
  const response = yield call(()=>
    axios.get(`${BASE_URL}/getAllmainteances`)
  );
  console.log("Get All Mainteances History success",response.data)
  yield put(fetchMainteancesSuccess(response.data))
}catch(error){
   console.log("Get All Mainteances History Fails",error.message)
  yield put(fetchMainteancesFailure(error.message))
}
} 


//Worker Saga: fetchMainteances All History Get
function* fetchAllHistory(action){
try{
  const response = yield call(()=>
    axios.get(`${BASE_URL}/getAllHistory`)
  );
  console.log("Get All Mainteances History success",response.data)
  yield put(fetchMainteancesHistorySuccess(response.data))
}catch(error){
   console.log("Get All Mainteances History Fails",error.message)
  yield put(fetchMainteancesHistoryFailure(error.message))
}
} 

//WatcherSaga
export function* mainteanceSaga() {
  yield takeLatest(mainteanceRequest.type, postMainteancesDetailsWorker);
  yield takeLatest(fetchMaiteancesRequest.type,fetchAllMainteancesHistory);
  yield takeLatest(fetchMaiteancesHistoryRequest.type,fetchAllHistory);
}
