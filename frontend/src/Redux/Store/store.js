import { configureStore } from "@reduxjs/toolkit";
import createSagaMiddleware from "redux-saga";
import vehicleReducer from "../Slice/vehicleSlice";
import driverReducer from "../Slice/driverSlice";
import authReducer from "../Slice/authSlice";
import tripReducer from "../Slice/tripSlice";
import mainteanceReducer from "../Slice/mainteancesSlice";
import dashboardReducer from "../Slice/dashboardSlice";
import userListReducer from "../Slice/userListSlice";
import adminDashboardReducer from "../Slice/adminDashboardSlice";
import rootSaga from "../root/rootSaga";

const sagaMiddleware = createSagaMiddleware();

const store = configureStore({
  reducer: {
    //VehicleStore
    vehicleStore: vehicleReducer,
    //driverStore
    driverstore: driverReducer,
    //authstore
    authStore: authReducer,
    //tripStore
    tripStore: tripReducer,
    //mainteancesStore
    mainteancesStore: mainteanceReducer,
    //dashboardStore
    dashboardStore: dashboardReducer,
    //userStore
    userListstore: userListReducer,
    //adminDashboardStore
    adminDashboardStore:adminDashboardReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
      thunk: false,
    }).concat(sagaMiddleware),
});

sagaMiddleware.run(rootSaga);

export default store;
