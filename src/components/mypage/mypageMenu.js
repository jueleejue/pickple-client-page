import React, { useState,useEffect} from 'react'
import "./mypage.css"
import { Link } from "react-router-dom";
import { Container } from 'reactstrap';
import {Menu} from "../../util/category"
import { Fragment } from 'react';


const MyMenu=()=>{
  

    const [selected,setSelected]=useState("");

    useEffect(()=>{
      
    },[])


    return(
        <Fragment>
                 <div className="mypage-container">
            <Container>
                <div className="mypage-tit-wrap">
                   <Link to="/Mypage">마이페이지</Link> 
                </div>
            </Container>
        </div>
        
        <div className="mypage-container">
        <Container>


        <div className="mapage-info-container">
            <div className="mypage-left-wrap">
                <div className="mypage-left-top-info">
                    <div  className="mypage-left-menu-wrap">
                

                { Menu.menu.map(({id,name,link})=>{
                            return(
                                 <Link to={link}  key={id} >
                                    <div 
                                    className={id===selected ?'mypage-left-menu-item mypage-left-menu-test' :"mypage-left-menu-item"}
                                    onClick={()=>setSelected(id)}
                                    >
                                        <span >{name}</span> 
                                    
                                    </div>
                                </Link>
                                )
                    }) }    
                        
                    </div>
                </div>
            </div>
    </div>
    </Container>
    </div>
    </Fragment>
    );

}


export default MyMenu;
