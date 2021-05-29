
import React, {useEffect} from "react";
import "../components/user/login.css"
import dotenv from "dotenv";
dotenv.config();

const CLIENT_ID = process.env.REACT_APP_CLIENT_ID;
const REDIRECT_URI = process.env.REACT_APP_REDIRECT_URI;

function NaverLogin (){


    useEffect(() => {
      naver();
    },[]) 

  const naver=()=>{
    const naver_id_login = new window.naver_id_login( CLIENT_ID, REDIRECT_URI );
    const state = naver_id_login.getUniqState();

    naver_id_login.setButton( 'green', 5, 54);
    naver_id_login.setState( state );
    naver_id_login.init_naver_id_login();
  }
 
  return (
    <div id="naver_id_login" style={ { marginTop: "10px",textAlign:"center" } } >
      
    </div>
    );

 
};


export default NaverLogin;