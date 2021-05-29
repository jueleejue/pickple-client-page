import axios from "axios"
import PROFILE from '../../actions/profileAction';
import { call, put, takeEvery, all, fork} from "redux-saga/effects";
import { push } from "connected-react-router";





    const checkProfileAPI = () =>{

        const config = {
            headers: {
              "Content-Type": "application/json",
              "X-AUTH-TOKEN":localStorage.getItem("token"),
            },
          };
    

        return axios.get("/api/v1/profile/my",config);
    }

    function* checkProfiles (){
        try {
        const result =  yield call(checkProfileAPI)
     
        yield put({
            type:PROFILE.PROFILE_CHECK_SUCCESS,
            payload:result.data
        })
        } catch (error) {
    
            yield put({
                type:PROFILE.PROFILE_CHECK_FAILURE,
                payload: error,
            });
            return;
        }
        }




    const  isopenProfileAPI = (payload) =>{
      
        const config = {
            headers: {
              "Content-Type": "application/json",
              "X-AUTH-TOKEN":localStorage.getItem("token"),
            },
          };
        return axios.put("/api/v1/profile/visibility",payload,config);
    }

    function* isopenProfile (action){
        try {
        const result =  yield call(isopenProfileAPI,action.payload)
        yield put({
            type:PROFILE.PROFILE_ISOPEN_SUCCESS,
            payload:result.data
        })
        } catch (error) {
    
            yield put({
                type:PROFILE.PROFILE_ISOPEN_FAILURE,
                payload: error,
            });
            return;
        }
        }





    const loadProfileAPI = (payload) =>{
             
        const config = {
            headers: {
            "Content-Type": "application/json",
            },
        };
        return axios.post("api/v1/profile/filter",payload,config);
    }

    function* loadProfiles (action){
        try {
        const result =  yield call(loadProfileAPI,action.payload)
        yield put({
            type:PROFILE.PROFILE_LOADING_SUCCESS,
            payload:result.data,
            page:action.page,
        })
        } catch (error) {
            yield put({
                type:PROFILE.PROFILE_LOADING_FAILURE,
                payload: error,
            });

        }
        }
        

    const uploadProfileAPI = (payload) =>{
        const config = {
            headers: {
              "Content-Type": "application/json",
              "X-AUTH-TOKEN":localStorage.getItem("token"),
            },
          };
      
        return axios.post("/api/v1/profile",payload,config);
    }  


    function* uploadProfiles (action){
        try {
        const result =  yield call(uploadProfileAPI,action.payload)
        yield put({
            type:PROFILE.PROFILE_UPLOADING_SUCCESS,
            payload:result.data
        })
        
         alert("프로필이 등록되었습니다.")
         yield put(push("/Mypage/profile"));  

        } catch (error) {

            if(error.response.status===403) 
            {
                localStorage.removeItem("token");
                yield put(push("/"));
                alert("권한이 만료되어 로그아웃 되었습니다.")
            } 
           

            yield put({
                type:PROFILE.PROFILE_UPLOADING_FAILURE,
                payload: error,
              });        
        alert("프로필 등록을 실패했습니다.")

        }
        }

      

    const editProfileAPI = (payload) =>{
        const config = {
            headers: {
              "Content-Type": "application/json",
              "X-AUTH-TOKEN":localStorage.getItem("token"),
            },
          };
    
     return axios.put("/api/v1/profile",payload,config);
    }  

    function* editProfiles (action){
        try {

        const result =  yield call(editProfileAPI,action.payload)
        yield put({
            type:PROFILE.PROFILE_EDIT_SUCCESS,
            payload:result.data
        })
        alert("프로필이 수정되었습니다.")
        yield put(push("/Mypage/profile"));  

        } catch (error) {

            if(error.response.status===403) 
            {
                localStorage.removeItem("token");
                yield put(push("/"));  
                alert("권한이 만료되어 로그아웃 되었습니다.")
            } 

            yield put({
                type:PROFILE.PROFILE_EDIT_FAILURE,
                payload: error,
              });       
              alert("프로필이 수정을 실패했습니다.")   
              yield put(push("/Mypage/profile")); 
        }
        }




 
    const loadDetailProfileAPI = (payload) =>{
        const config = {
            headers: {
              "Content-Type": "application/json",
              "X-AUTH-TOKEN":localStorage.getItem("token"),
            },
          };
    
        return axios.get(`/api/v1/profile/${payload}`,config);
      
    }

    function* loadDetailProfiles (action){
        try {
        const result =  yield call(loadDetailProfileAPI,action.payload)

        yield put({
            type:PROFILE.PROFILE_DETAIL_LOADING_SUCCESS,
            payload:result.data
        })
        } catch (error) {
    
            
            if(error.response.status===403) 
            {
                localStorage.removeItem("token");
                yield put(push("/"));  
                alert("권한이 만료되어 로그아웃 되었습니다.")
            } 

            yield put({
                type:PROFILE.PROFILE_DETAIL_LOADING_FAILURE,
                payload: error,
            });

        }
        }

    
   

    function* watchCheckProfile(){
        yield takeEvery(PROFILE.PROFILE_CHECK_REQUEST,checkProfiles)
  
    }

    function* watchLoadProfile(){
        yield takeEvery(PROFILE.PROFILE_LOADING_REQUEST,loadProfiles)
  
    }
    function* watchUpLoadProfile(){
        yield takeEvery(PROFILE.PROFILE_UPLOADING_REQUEST,uploadProfiles)
  
    }
    function* watchLoadDetailProfile(){
        yield takeEvery(PROFILE.PROFILE_DETAIL_LOADING_REQUEST,loadDetailProfiles)
    }
    function* watcheditProfile(){
        yield takeEvery(PROFILE.PROFILE_EDIT_REQUEST,editProfiles)
  
    }

    function* watchisOpenProfile(){
        yield takeEvery(PROFILE.PROFILE_ISOPEN_REQUEST,isopenProfile)
  
    }

 

    export default function* profileSaga() {
      
        yield all([
            fork(watchLoadProfile),
            fork(watchUpLoadProfile),
            fork(watchLoadDetailProfile),
            fork(watcheditProfile),
            fork(watchCheckProfile),
            fork(watchisOpenProfile),
          ]);
      }





