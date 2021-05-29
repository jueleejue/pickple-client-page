import React from 'react'
import "./mypage.css"
import { Link } from "react-router-dom";
import { Container } from 'reactstrap';



const MyHeader=()=>{
  


    return(
        <div className="mypage-container">
            <Container>
                <div className="mypage-tit-wrap">
                   <Link to="/Mypage">마이페이지</Link> 
                </div>
            </Container>
        </div>
 
    );

}


export default MyHeader;
