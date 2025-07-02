import { call, put, takeLatest } from "redux-saga/effects";
import {
  registerRequest,
  registerSuccess,
  registerFailure,
  loginRequest,
  loginSuccess,
  loginFailure,
} from "../Slice/authSlice";
import { registerAPI, loginAPI } from "../../Api/authApi";

//RegisterWorkerSaga
function* registerWorker(action) {
  try {
    const res = yield call(registerAPI, action.payload);
    yield put(
      registerSuccess({
        user: res.user,
        token: res.token,
      })
    );
    console.log("User", res.user);
    console.log("Token:", res.token);
  } catch (err) {
    yield put(registerFailure(err.message || "Something went wrong"));
  }
}

//loginWorker
function* loginWorker(action) {
  try {
    const res = yield call(loginAPI, action.payload);

    //  Save to localStorage
    localStorage.setItem("authUser", JSON.stringify(res.user));
    localStorage.setItem("authToken", res.token);

    yield put(
      loginSuccess({
        user: res.user,
        token: res.token,
      })
    );
  } catch (err) {
    console.log("Login error:", err);

    // If multiple field errors
    if (Array.isArray(err.fields)) {
      yield put(loginFailure(err.fields));
    } else if (err.field) {
      yield put(loginFailure([{ field: err.field, message: err.message }]));
    } else {
      yield put(
        loginFailure([{ field: "general", message: "Something went wrong" }])
      );
    }
  }
}

//changePassword


//WatcherSaga
export function* authRootSaga() {
  yield takeLatest(registerRequest.type, registerWorker);
  yield takeLatest(loginRequest.type, loginWorker);
}
