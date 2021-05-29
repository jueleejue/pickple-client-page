import axios from "axios"
import MYPAGE from '../../actions/myPageAction';
import { call, put, takeEvery, all, fork} from "redux-saga/effects";
import { push } from "connected-react-router";



const mypagebookmarkAPI = () =>{

    const config = {
        headers: {
          "Content-Type": "application/json",
          "X-AUTH-TOKEN":localStorage.getItem("token"),
        },
      };
      
    return axios.get("/api/v1/bookmark/my",config);
}

function* mypagebookmarkload (){
    try {

    const result =  yield call(mypagebookmarkAPI)
    yield put({
        type:MYPAGE.MYPAGE_BOOKMARK_SUCCESS,
        payload:result.data,
    })
    } catch (e) {
        if(e.response.status===403) 
        {
          
            localStorage.removeItem("token");
        } 
        yield put({
            type:MYPAGE.MYPAGE_BOOKMARK_FAILURE,
            payload: e,
          });
          yield put(push("/"));
    }
    }


    
const mypageapplyAPI = () =>{

    const config = {
        headers: {
          "Content-Type": "application/json",
          "X-AUTH-TOKEN":localStorage.getItem("token"),
        },
      };
      
    return axios.get("/api/v1/apply/my",config);
}

function* mypageapplyload (){
    try {

    const result =  yield call(mypageapplyAPI)
    yield put({
        type:MYPAGE.MYPAGE_APPLY_SUCCESS,
        payload:result.data,
    })
    } catch (e) {
        if(e.response.status===403) 
        {
         
            localStorage.removeItem("token");
        } 
        yield put({
            type:MYPAGE.MYPAGE_APPLY_FAILURE,
            payload: e,
          });
          yield put(push("/"));
    }
    }

        
      
    const mypageboardAPI = () =>{

        const config = {
            headers: {
            "Content-Type": "application/json",
            "X-AUTH-TOKEN":localStorage.getItem("token"),
            },
        };
        
        return axios.get("/api/v1/recboard/my",config);
    }

    function* mypageboardload (){
        try {
        const result =  yield call(mypageboardAPI)
        yield put({
            type:MYPAGE.MYPAGE_BOARD_SUCCESS,
            payload:result.data,
        })
        } catch (e) {
            if(e.response.status===403) 
            {
            
                localStorage.removeItem("token");
            } 
            yield put({
                type:MYPAGE.MYPAGE_BOARD_FAILURE,
                payload: e,
            });
            yield put(push("/"));
        }
        }



    const mypagereportAPI = () =>{

        const config = {
            headers: {
            "Content-Type": "application/json",
            "X-AUTH-TOKEN":localStorage.getItem("token"),
            },
        };
        
        return axios.get("/api/v1/report/my",config);
    }

    function* mypagereportload (){
        try {

        const result =  yield call(mypagereportAPI)
        yield put({
            type:MYPAGE.MYPAGE_REPORT_SUCCESS,
            payload:result.data,
        })
        } catch (e) {
            if(e.response.status===403) 
            {
            
                localStorage.removeItem("token");
            } 
            yield put({
                type:MYPAGE.MYPAGE_REPORT_FAILURE,
                payload: e,
            });
            yield put(push("/"));
        }
        }
        



        function* watchLoadBookmark(){
            yield takeEvery(MYPAGE.MYPAGE_BOOKMARK_REQUEST,mypagebookmarkload)
      
        }
        function* watchLoadApply(){
            yield takeEvery(MYPAGE.MYPAGE_APPLY_REQUEST,mypageapplyload)
      
        }
        function* watchLoadBoard(){
            yield takeEvery(MYPAGE.MYPAGE_BOARD_REQUEST,mypageboardload)
      
        }
        function* watchLoadReport(){
            yield takeEvery(MYPAGE.MYPAGE_REPORT_REQUEST,mypagereportload)
      
        }

    
    
  
  


    export default function* mypageSaga() {
        yield all([
            fork(watchLoadBookmark),
            fork(watchLoadApply),
            fork(watchLoadBoard),
            fork(watchLoadReport),
            
          ]);
    
      }





