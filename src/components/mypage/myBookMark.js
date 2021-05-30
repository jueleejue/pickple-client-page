import React from 'react'
import "./myBookMark.css"
import {IconButton} from '@material-ui/core';
import { Container } from 'reactstrap';
import { Fragment } from 'react';
import BookmarkIcon from '@material-ui/icons/Bookmark';
import { Link } from "react-router-dom";

const MyBookMark=({mybookmarks})=>{
  
    

    return(
        <div className="mypage-bookmark-container">
        <Container>
        <div className="mypage-bookmark-container">
            <div className="mypage-bookmark-bottom-container">
                <div className="mypage-bookmark-content-wrap">
                {
                Array.isArray(mybookmarks) ? mybookmarks.map((mybookmarks,index)=>{
                        return(
                            <Fragment key={index}>
                              <div   className="mypage-bookmark-content-sub">
                                {
                                  mybookmarks.boardIsDeleted?
                                  <Fragment>
                                    <div className="mypage-bookmark-content-align">
                                    <div className="mypage-bookmark-content-tit">
                                                  {mybookmarks.boardTitle}
                                            </div>
                                            </div>
                                          <div className="mypage-bookmark-date-wrap">
                                          <div  className="mypage-bookmark-date-txt">
                                              *삭제된 게시물 입니다.
                                              </div > 
                                      </div>
                                  </Fragment>
                               
                                  :
                                  <Fragment>
                                      <div className="mypage-bookmark-content-align">
                                          <Link to={`/board/${mybookmarks.boardId}`} className="text-dark text-decoration-none">
                                            <div className="mypage-bookmark-content-tit">
                                              {mybookmarks.boardTitle}
                                            </div>
                                          </Link>
                                      <div className="mypage-bookmark-content-state">
                                        <IconButton><BookmarkIcon/></IconButton>
                                      </div>
                                    </div>

                                        <div className="mypage-bookmark-date-wrap">
                                        <div  className="mypage-bookmark-date-txt">
                                            *제목 클릭시 해당 게시물로 이동
                                            </div > 
                                        </div>
                                  </Fragment>
                                }    
                              </div>
                         
                            </Fragment>
                           
                           )
                     }) :""}  
                  
                </div>


            </div>

        </div>
        </Container>
        </div>
    );

}


export default MyBookMark;