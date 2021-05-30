import React from "react";
import HeaderSub from "./headerSub";
import { withRouter } from "react-router-dom";

const Header = () =>{
 

   const  HeaderType = () => {
    
        if ("/login" ===window.location.pathname
        ||"/Naver/Callback"===window.location.pathname){
          return null;
        } else {
          return <HeaderSub/>;
        }
      }

      return(
            <div>
            {HeaderType()}
            </div>)


    }

export default withRouter(Header);
