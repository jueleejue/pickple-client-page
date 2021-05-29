import React, { useState,useEffect} from 'react'
import "./mypage.css"
import { Link } from "react-router-dom";
import { Container } from 'reactstrap';
import Identity from "./identity"
import MyApply from "./myApply"
import MyOther from "./myOther"
import MyReview from "./myReview"
import {Menu} from "../../util/category"


const MyPage=()=>{
  

    const [menu,setMenu]=useState("");

        useEffect(()=>{
        },[menu])
    
   

    return(
        <div className="mypage-container">
            <Container>
                <div className="mypage-tit-wrap">
                   <Link to="/Mypage">마이페이지</Link> 
                </div>
            

            <div className="mapage-info-container">
                    <div className="mypage-left-wrap">
                        <div className="mypage-left-top-info">
                            <div className="mypage-left-top-tit">
                                <span>
                                    MENU
                                </span>
                            </div>       
                            <div  className="mypage-left-menu-wrap">
                        

                        { Menu.menu.map(({id,name})=>{
                                    return(
                                         
                                            <div  key={id} className="mypage-left-menu-item" onClick={()=>setMenu(id)}>
                                                <span>{name}</span> 
                                            </div>
                                         
                                        )
                            }) }    
                                
                            </div>
                        </div>
                    </div>

              
            </div>
            </Container>
        </div>
 
    );

}


export default MyPage;
