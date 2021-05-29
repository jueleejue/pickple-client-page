import React, { useState } from "react";
import { Link} from "react-router-dom";
import {Dialog} from '@material-ui/core';
import "./login.css"
import title_logo from "../../assets/img/logo.png";
import USER from "../../actions/userAction"
import { useDispatch} from "react-redux";
import Naver from "../../auth/authAxios"
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { useTheme } from '@material-ui/core/styles';



function LoginPage() {
  
  const [modal] = useState(true);
  const [id,setId]=useState("")
  const dispatch = useDispatch();

  
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down('sm'));


  const onSubmit=async(e)=>{
       e.preventDefault();
      const user = {idString:id}

      dispatch({
        type: USER.USER_ACCOUNT_REQUEST,
        payload: user,
      })

  
    }




  return (
   <div className="LoginWapper">

        <Dialog
                fullScreen={fullScreen}
                open={modal}
                aria-labelledby="responsive-dialog-title"
              
              >  
            <div className="LoginModal">
           
               
                  <div className="LoginLogoWrap">
                  <Link to="/"><img src={title_logo} style={{width:"105px"}}  alt="픽플" /></Link>
                  </div>
          
                
                <div className="LoginContentWrap">
                      <div className="LoginTitle">
                        <h1>
                          학생들을 위한<br/>커리어 플랫폼, 픽플 !
                        </h1>
                        <h2>
                          커리어 성장과 행복을 위한 여정<br/>지금 픽플에서 시작하세요.
                        </h2>
                    </div>

                    <input className="LoginInput"
                              name="Id"
                              placeholder="ID"
                            onChange={(e)=>setId(e.target.value)}
                            />

              
                  
                    <div className="LoginInputWrap">
            


                   <button className="SeLogin" onClick={(e)=>onSubmit(e)}>
                      일반 로그인
                    </button>

                   {/* <div className="SeLoginWarp">
                   <button className="SeLogin" >
                      SE 로 로그인 하기
                    </button>
                   </div> */}
         
                
                     <Naver/>
                    </div>
                  </div>
            </div>
          </Dialog>
          </div>
   
      
  );     
}

export default LoginPage;