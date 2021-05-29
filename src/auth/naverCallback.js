import React, {  useEffect} from 'react'
import {useDispatch} from "react-redux"
import USER from "../actions/userAction"
import dotenv from "dotenv";
dotenv.config();


const CLIENT_ID = process.env.REACT_APP_CLIENT_ID;
const REDIRECT_URI = process.env.REACT_APP_REDIRECT_URI;


const NaverCallback=()=> {
  
  const dispatch = useDispatch();

  useEffect(()=>{
    const naver_id_login = new window.naver_id_login(CLIENT_ID, REDIRECT_URI)
    const access_token =naver_id_login.oauthParams.access_token;

    dispatch({
      type: USER.USER_LOGIN_REQUEST,
      payload:access_token,
    })

    },[dispatch])


  
  return (

         <div></div>

  );
}

export default NaverCallback;