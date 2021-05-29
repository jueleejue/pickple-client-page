
import axios from "axios"
import REPORT from '../../actions/reportAction';
import { call, put, takeEvery, all, fork } from "redux-saga/effects";



const uploadReportAPI = (payload) => {
    const config = {
        headers: {
            "Content-Type": "application/json",
            "X-AUTH-TOKEN": localStorage.getItem("token"),
        },
    };

    return axios.post("api/v1/report", payload, config);

}

function* uploadReport(action) {
    try {
        const result = yield call(uploadReportAPI, action.payload)
        yield put({
            type: REPORT.REPORT_UPLOADING_SUCCESS,
            payload: result.data
        })
        alert("신고완료!")
    } catch (error) {
        yield put({
            type: REPORT.REPORT_UPLOADING_FAILURE,
            payload: error,
        });
        alert("신고실패!")
    }
}


const detailReportAPI = (payload) => {
    const config = {
        headers: {
            "Content-Type": "application/json",
            "X-AUTH-TOKEN": localStorage.getItem("token"),
        },
    };

    return axios.get(`api/v1/report/${payload}`, config);

}

function* detailReport(action) {
    try {
        const result = yield call(detailReportAPI, action.payload)
        yield put({
            type: REPORT.REPORT_DETAIL_SUCCESS,
            payload: result.data
        })
    } catch (error) {
        yield put({
            type: REPORT.REPORT_DETAIL_FAILURE,
            payload: error,
        });
    }
}



function* watchdetailReport() {
    yield takeEvery(REPORT.REPORT_DETAIL_REQUEST, detailReport)

}


function* watchupLoadReport() {
    yield takeEvery(REPORT.REPORT_UPLOADING_REQUEST, uploadReport)

}




export default function* reportSaga() {

    yield all([
        fork(watchupLoadReport),
        fork(watchdetailReport),
    ]);
}





