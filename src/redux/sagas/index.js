import { all, fork } from "redux-saga/effects";
import axios from "axios";

import userSaga from "./userSaga";
import postSaga from "./postSaga";
import profileSaga from "./profileSage"
import mypageSaga from "./mypageSaga"
import applySaga from "./applySaga"
import reportSaga from "./reportSaga"

import dotenv from "dotenv";
dotenv.config();

// 서버와 통신하는 부분 
axios.defaults.baseURL = process.env.REACT_APP_BASIC_SERVER_URL;

export default function* rootSaga() {
  yield all([fork(userSaga),fork(postSaga),fork(profileSaga),fork(mypageSaga),fork(applySaga),fork(reportSaga)]);
}
