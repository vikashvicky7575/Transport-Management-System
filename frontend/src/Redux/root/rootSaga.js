import { all } from "redux-saga/effects";
import { vehicleSaga } from "../saga/vehicleSaga";
import { driverDetailsSaga } from "../saga/driverSaga";
import { authRootSaga } from "../saga/authSaga";
import { tripSaga } from "../saga/tripSaga";
import { mainteanceSaga } from "../saga/mainteancesSaga";
import { dashboardSaga } from "../saga/dashboardSaga";
import { userSaga } from "../saga/UserListSaga";
import {AdminDashboardSaga} from '../saga/adminDashboardSaga'

export default function* rootSaga() {
  yield all([
    vehicleSaga(),
    driverDetailsSaga(),
    authRootSaga(),
    tripSaga(),
    mainteanceSaga(),
    dashboardSaga(),
    userSaga(),
    AdminDashboardSaga()
  ]);
}
