import axios from "axios"
import APPLY from '../../actions/applyAction';
import { call, put, takeEvery, all, fork} from "redux-saga/effects";
import { push } from "connected-react-router";


const recapplyloadAPI = (payload) =>{

    const config = {
        headers: {
          "Content-Type": "application/json",
          "X-AUTH-TOKEN":localStorage.getItem("token"),
        },
      };
    return axios.get(`/api/v1/apply/my/${payload}`,config);
}

    function* recapplyload (action){
    try {

    const result =  yield call(recapplyloadAPI,action.payload)
   
    yield put({
        type:APPLY.APPLY_LOADING_SUCCESS,
        payload:result.data,
    })
    } catch (e) {
        yield put({
            type:APPLY.APPLY_LOADING_FAILURE,
            payload: e,
          });
    }
    }


const mypagerecuserAPI = (payload) =>{

    const config = {
        headers: {
          "Content-Type": "application/json",
          "X-AUTH-TOKEN":localStorage.getItem("token"),
        },
      };
      
    return axios.get(`/api/v1/apply/board/${payload}`,config);
}

function* mypagerecuserload (action){
    try {

    const result =  yield call(mypagerecuserAPI,action.payload)
    yield put({
        type:APPLY.APPLY_BOARD_USER_SUCCESS,
        payload:result.data,
    })
    } catch (e) {
    
        yield put({
            type:APPLY.APPLY_BOARD_USER_FAILURE,
            payload: e,
          });
          yield put(push("/"));
    }
    }


    


const applyuploadAPI = (payload) =>{

    const config = {
        headers: {
        "Content-Type": "application/json",
          "X-AUTH-TOKEN":localStorage.getItem("token"),
        },
      };
    return axios.post("/api/v1/apply",payload,config);
}

    function* applyupload (action){
    try {

    const result =  yield call(applyuploadAPI,action.payload)
    yield put({
        type:APPLY.APPLY_UPLOADING_SUCCESS,
        payload:result.data,
    })
    alert("지원이 완료되었습니다.")

    } catch (e) {
        yield put({
            type:APPLY.APPLY_UPLOADING_FAILURE,
            payload: e,
          });
         if(e.response.status===403) 
        {
            localStorage.removeItem("token");
            yield put(push("/"));
        } 
    alert("지원을 실패했습니다.")
    }
    }


const applydeleteAPI = (payload) =>{


    return axios.delete("/api/v1/apply",
     {headers: {"X-AUTH-TOKEN":localStorage.getItem("token"),"Content-Type": "application/json"} , data:{applyId:payload.applyId}});
    }

    function* applydelete (action){
    try {

    const result =  yield call(applydeleteAPI,action.payload)

    yield put({
        type:APPLY.APPLY_DELETE_SUCCESS,
        payload:result.data,
    })
    alert("지원이 삭제되었습니다.")

    } catch (e) {
        yield put({
            type:APPLY.APPLY_DELETE_FAILURE,
            payload: e,
          });
         if(e.response.status===403) 
        {
            localStorage.removeItem("token");
            yield put(push("/"));
        } 
    alert("지원 삭제를 실패했습니다.")
    }
    }

    

const applycontractAPI = (payload) =>{


    const config = {
        headers: {
          "Content-Type": "application/json",
          "X-AUTH-TOKEN":localStorage.getItem("token"),
        },
      };

    return axios.put("/api/v1/apply/contract",payload,config);
}

    function* applycontract (action){
    try {
     const result =  yield call(applycontractAPI,action.payload)

    yield put({
        type:APPLY.APPLY_CONTRACT_SUCCESS,
        payload:result.data,
    })
    alert("지원을 승인하였습니다.")
  
    } catch (e) {
      
        yield put({
            type:APPLY.APPLY_CONTRACT_FAILURE,
            payload: e,
          });
         if(e.response.status===403) 
        {
            localStorage.removeItem("token");
            yield put(push("/"));
        } 
        alert("지원 승인을 실패하였습니다.")
    }
    }
    

    const reviewuploadAPI = (payload) =>{

    const config = {
        headers: {
         "Content-Type": "application/json",
          "X-AUTH-TOKEN":localStorage.getItem("token"),
        },
      };
    return axios.put("/api/v1/apply/review",payload,config);
}

    function* reviewupload (action){
    try {

    const result =  yield call(reviewuploadAPI,action.payload)
    yield put({
        type:APPLY.REVIEW_UPLOADING_SUCCESS,
        payload:result.data,
    })
    alert("리뷰 작성 성공!")

    } catch (e) {
        yield put({
            type:APPLY.REVIEW_UPLOADING_FAILURE,
            payload: e,
          });
         if(e.response.status===403) 
        {
            localStorage.removeItem("token");
            yield put(push("/"));
        } 
    alert("리뷰 작성 실패!")
    }
    }
    

  const applydetailAPI = (payload) =>{

    const config = {
        headers: {
         "Content-Type": "application/json",
          "X-AUTH-TOKEN":localStorage.getItem("token"),
        },
      };
    return axios.get(`/api/v1/apply/${payload}`,config);
}

    function* applydetail (action){
    try {

    const result =  yield call(applydetailAPI,action.payload)
   
    yield put({
        type:APPLY.APPLY_DETAIL_SUCCESS,
        payload:result.data,
    })
   
    } catch (e) {
        yield put({
            type:APPLY.APPLY_DETAIL_FAILURE,
            payload: e,
          });

    }
    }
    

    const reviewprofileAPI = (payload) =>{
        const config = {
            headers: {
                "Content-Type": "application/json",
              "X-AUTH-TOKEN":localStorage.getItem("token"),
            },
          };
        return axios.get(`/api/v1/apply/review/${payload}`,config);
    }
    
        function* reviewprofile (action){
        try {
    
        const result =  yield call(reviewprofileAPI,action.payload)
        yield put({
            type:APPLY.REVIEW_PROFILE_SUCCESS,
            payload:result.data,
        })
    
        } catch (e) {
            yield put({
                type:APPLY.REVIEW_PROFILE_FAILURE,
                payload: e,
              });
        }
        }




        function* watchLoadapply(){
            yield takeEvery(APPLY.APPLY_LOADING_REQUEST,recapplyload)
      
        }

        
        function* watchLoadBoardUser(){
            yield takeEvery(APPLY.APPLY_BOARD_USER_REQUEST,mypagerecuserload)
      
        }

        function* watchUploadapply(){
            yield takeEvery(APPLY.APPLY_UPLOADING_REQUEST,applyupload)
      
        }

        
        function* watchApplydelete(){
            yield takeEvery(APPLY.APPLY_DELETE_REQUEST,applydelete)
      
        }

        function* watchContractapply(){
            yield takeEvery(APPLY.APPLY_CONTRACT_REQUEST,applycontract)
      
        }
    
        function* watchReviewupload(){
            yield takeEvery(APPLY.REVIEW_UPLOADING_REQUEST,reviewupload)
      
        }

        function* watchReviewprofile(){
            yield takeEvery(APPLY.REVIEW_PROFILE_REQUEST,reviewprofile)
      
        }



    function* watchApplydetail(){
        yield takeEvery(APPLY.APPLY_DETAIL_REQUEST,applydetail)
  
    }

    export default function* applySaga() {
        yield all([
            fork(watchLoadapply),
            fork(watchLoadBoardUser),
            fork(watchUploadapply),
            fork(watchContractapply),
            fork(watchReviewupload),
            fork(watchReviewprofile),
            fork(watchApplydelete),
            fork(watchApplydetail),
          ]);
    
      }





