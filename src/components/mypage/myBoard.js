import React from 'react'
import "./myBoard.css"
import { Link } from "react-router-dom";
import { Container } from 'reactstrap';
import moment from 'moment';
import {Tooltip } from '@material-ui/core'

const MyBoard=({myboards})=>{
 

    const recEndDate = moment(myboards.recEndDate).format('YYYY-MM-DD')
    const workStartDate = moment(myboards.workStartDate).format('YYYY-MM-DD')
    return(
            <div className="mypage-board-container">
            <Container>
            <div className="mypage-board-content-wrap">
                <div className="mypage-board-content-sub">
                { myboards.map((myboards,index)=>{
                            return(
                              <div  key={index} className="mypage-board-content-item">
                            
                                <div className="mypage-board-content-left">
                                <a href={`/board/${myboards.boardId}`} className="text-dark text-decoration-none" style={{width:"100%"}}>
                                    <Tooltip title="클릭시 해당 글 이동" placement='top'>
                                        <div className="mypage-board-left-tit">{myboards.title}</div>
                                    </Tooltip>    
                                </a>
                                    <div className="mypage-board-left-date">
                                            <div className="mypage-board-date-sub">
                                                <div  className="mypage-board-date-txt">마감일</div >
                                                <div className="mypage-board-date-type">{recEndDate}</div>
                                            </div>
                                            <div className="mypage-board-date-sub">
                                                <div  className="mypage-board-date-txt">업무 시작일</div >
                                                <div className="mypage-board-date-type">{workStartDate}</div>
                                            </div>
                                     </div>   

                                </div>
                                 

                                <div className="mypage-board-content-right">

                                    <Link to= {`/MyPage/board/apply/${myboards.boardId}`}>
                                        <div className="mypage-board-right-wrap">
                                            <div className="mypage-board-right-btn" >지원자<br/>보러가기</div>
                                        </div>  
                                    </Link>    
                                </div>    
                                  </div>
                                 
                               )
                         }) }  
                </div>
            </div>
    
    
            </Container>
            </div>
    );

}


export default MyBoard;