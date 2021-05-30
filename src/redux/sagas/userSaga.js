import axios from "axios";
import { call, put, takeEvery, all, fork } from "redux-saga/effects";
import USER from '../../actions/userAction';
import { push } from "connected-react-router";
import { Link } from "react-router-dom";



const loginUserAPI = (payload) => {
 
  const config = {
    headers: {
      "Content-Type": "application/json",
    }, 
  };
  return axios.post(`/api/v1/signin/${"NAVER"}`,payload,config);

 
};


function* loginUser(action) {
  try {
  
    const result = yield call(loginUserAPI, action.payload); 

    yield put({
      type: USER.USER_LOGIN_SUCCESS, 
      payload: result.data.data.token,  
    });
    yield put(push("/")); 


  } catch (e) {
    yield put({
      type: USER.USER_LOGIN_FAILURE,
      payload: e.response,
    });
    
    yield put(push("/pickple")); 
    alert("로그인을 실패했습니다.")
   
  }
}




const accountUserAPI = (payload) => {

  return axios.post("/api/v1/signin",payload);
};


function* accountUser(action) {
  try {
  
    const result = yield call(accountUserAPI, action.payload); 

    yield put({
      type: USER.USER_ACCOUNT_SUCCESS, 
      payload: result.data.data.token,  
    });
    <Link to={"/"}/>
    yield put(push("/")); 


  } catch (e) {
    yield put({
      type: USER.USER_ACCOUNT_FAILURE,
      payload: e.response,
    });
    
    yield put(push("/")); 
    alert("로그인을 실패했습니다.")
   
  }
}








function* logout(action) {
  try {
    yield put({
      type: USER.USER_LOGOUT_SUCCESS,
    });
  
    yield put(push("/")); 
  } catch (e) {
    yield put({
      type: USER.USER_LOGOUT_FAILURE,
    });

  }
}





const registerUserAPI = (payload) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
      
    }, 
  };
  return axios.post("api/auth", payload, config);

};

function* registerUser(action) {
  try {
    const result = yield call(registerUserAPI,action.payload); 
    
    yield put({
      type: USER.USER_REGISTER_SUCCESS, 
      payload: result.data,  
    });
  } catch (e) {
    yield put({
      type: USER.USER_REGISTER_FAILURE,
      payload: e.response,
    });
  }
}






function* clearError() {
  try {
    yield put({
      type: USER.CLEAR_ERROR_SUCCESS,
    });
  } catch (e) {
    yield put({
      type: USER.CLEAR_ERROR_FAILURE,
    });
    console.error(e);
  }
}


const userLoadingAPI = (token) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
      "X-AUTH-TOKEN":localStorage.getItem("token"),
    },
  };
  return axios.get("/api/v1/account/my", config);
};

function* userLoading() {
  try {
    const result = yield call(userLoadingAPI);
    yield put({
      type: USER.USER_LOADING_SUCCESS,
      payload: result.data,
    });
  } catch (e) {
    if(e.response.status===403) 
    {
        alert("권한이 만료되어 로그아웃 되었습니다.")
        localStorage.removeItem("token");
    } 
    yield put(push("/")); 
    yield put({
      type: USER.USER_LOADING_FAILURE,
      payload: e.response,
    });
  }
}




const usereditAPI = (payload) => {


  const config = {
    headers: {
      "Content-Type": "application/json",
      "X-AUTH-TOKEN":localStorage.getItem("token"),
    },
  };
  return axios.put("/api/v1/account",payload,config);
};

function* userEdit(action) {
  try {
    const result = yield call(usereditAPI,action.payload);
    yield put({
      type: USER.USER_EDIT_SUCCESS,
      payload: result.data,
    });
    alert("수정을 성공했습니다.")
    yield put(push("/Mypage/profile"));
  } catch (e) {
    if(e.response.status===403) 
    {
        localStorage.removeItem("token");
    } 
    alert("수정을 실패했습니다.")
    yield put(push("/Mypage/profile"));
    
    yield put({
      type: USER.USER_EDIT_FAILURE,
      payload: e.response,
    });
  }
}




const userdeleteAPI = (payload) => {


  return axios.delete("/api/v1/account",
  {headers: {"X-AUTH-TOKEN":localStorage.getItem("token"),"Content-Type": "application/json"} , data:{idString:payload.idString}});
 

};

function* userDelete(action) {
  try {
    const result = yield call(userdeleteAPI,action.payload);
    yield put({
      type: USER.USER_DELETE_SUCCESS,
      payload: result.data,
    });
    localStorage.removeItem("token");
    alert("회원 탈퇴가 되셨습니다.")
    yield put(push("/"));
  } catch (e) {
    if(e.response.status===403) 
    {
        localStorage.removeItem("token");
        alert("권한이 만료되어 로그아웃 되었습니다.")
    } 
    alert("회원 탈퇴를 실패했습니다.")
    yield put(push("/")); 
    
    yield put({
      type: USER.USER_DELETE_FAILURE,
      payload: e.response,
    });
  }
}






//로그인유지

const loginLoadingAPI = (token) => {

  if (token) {
    return true;
  }
  
};

function* loginLoading(action) {
  try {
    const result = yield call(loginLoadingAPI, action.payload);
    yield put({
      type: USER.LOGIN_LOADING_SUCCESS,
      payload: result.data,
    });
  } catch (e) {
    yield put({
      type: USER.LOGIN_LOADING_FAILURE,
      payload: e.response,
    });
  }
}


function* watchEditUser() {
  yield takeEvery(USER.USER_EDIT_REQUEST, userEdit);
}


function* watchAccountUser() {
  yield takeEvery(USER.USER_ACCOUNT_REQUEST, accountUser);
}

function* watchLoginUser() {
  yield takeEvery(USER.USER_LOGIN_REQUEST, loginUser);
}

function* watchlogout() {
  yield takeEvery(USER.USER_LOGOUT_REQUEST, logout);
}

function* watchregisterUser() {
  yield takeEvery(USER.USER_REGISTER_REQUEST, registerUser);
}



function* watchclearError() {
  yield takeEvery(USER.CLEAR_ERROR_REQUEST, clearError);
}

function* watchuserLoading() {
  yield takeEvery(USER.USER_LOADING_REQUEST, userLoading);
}


function* watchloginLoading() {
  yield takeEvery(USER.LOGIN_LOADING_REQUEST, loginLoading);
}
// userDelete


function* watchuserdelete() {
  yield takeEvery(USER.USER_DELETE_REQUEST, userDelete);
}

export default function* userSaga() {
  yield all([
    fork(watchLoginUser),
    fork(watchlogout),
    fork(watchregisterUser),
    fork(watchEditUser),
    fork(watchclearError),
    fork(watchloginLoading),
    fork(watchuserLoading),
    fork(watchAccountUser),
    fork(watchuserdelete),
  ]);
}