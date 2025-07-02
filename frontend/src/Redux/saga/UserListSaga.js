import { call, put, takeLatest } from "redux-saga/effects";
import {
  fetchUsersByRoleRequest,
  fetchUserByRoleSuccess,
  fetchUserByRoleFailure,
} from "../Slice/userListSlice";

import axios from "axios";


//Api Call
function fetchUsers(role) {
  return axios.get(`http://localhost:5000/api/auth/userlist/${role}`);
}

//Worker saga: fetchUserBy RoleAccess
function* fetchUsersByRoleWorker(action) {
  try {
    const response = yield call(fetchUsers, action.payload);
    yield put(fetchUserByRoleSuccess(response.data));
  } catch (err) {
    yield put(fetchUserByRoleFailure(err.message));
  }
}

export function* userSaga() {
  yield takeLatest(fetchUsersByRoleRequest.type, fetchUsersByRoleWorker);
}
