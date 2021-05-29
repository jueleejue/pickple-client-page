import React from 'react'
import "./myApply.css"
import {useDispatch} from "react-redux"
import { Container } from 'reactstrap';
import { Fragment } from 'react';
import moment from 'moment';
import {Tooltip } from '@material-ui/core'
import APPLY from "../../actions/applyAction"

const MyApply=({myapplys})=>{
  

    const dispatch = useDispatch();
    const recEndDate = moment(myapplys.boardRecEndDate).format('YYYY-MM-DD')
    const workStartDate = moment(myapplys.boardWordStartDate).format('YYYY-MM-DD')
    
    
    const  deleteApply=(applyId)=> {
        if (window.confirm("삭제하시겠습니까? 삭제 시 해당 모집글에 재지원이 불가능 합니다.")) {
                const apply={applyId:applyId}
                dispatch({
                        type: APPLY.APPLY_DELETE_REQUEST,
                        payload: apply,
                    })
        } else {
          return;
        }
      }



    return(
        <div className="mypage-apply-container">
        <Container>
        <div className="mypage-apply-container">
            <div className="mypage-apply-bottom-container">
                <div className="mypage-apply-content-wrap">
                { myapplys.map((myapplys,index)=>{
                        return(
                            <Fragment key={index}>
                              <div   className="mypage-apply-content-sub">
                              <div className="mypage-apply-content-align">


                              {
                                        myapplys.boardIsDeleted?
                                        <Fragment>
                                      <div className="mypage-apply-content-tit">
                                       {myapplys.boardTitle}
                                      </div>
                                      <div className="mypage-apply-state-txt" style={{color:"rgb(97, 95, 95)",fontSize:"14px"}}>삭제된 게시물</div>
                                        </Fragment>
                                      
                                      :
                                        <Fragment>
                                            <a href={`/board/${myapplys.boardId}`} className="text-dark text-decoration-none" style={{width:"62%"}}>
                                      <Tooltip title="클릭시 해당 글 이동" placement='left'>
                                        <div className="mypage-apply-content-tit">
                                          {myapplys.boardTitle}
                                        </div>
                                      </Tooltip>
                                      </a>
                                      
                                      <div className="mypage-apply-content-state">
                                          
                                      {
                                      
                                      myapplys.applyIsContracted===1?<div className="mypage-apply-state-txt" style={{color:"#00a878"}}>승인</div>
                                    :  <Fragment>
                                        <div className="mypage-apply-state-txt">미승인</div>
                                        <div className="mypage-apply-state-delete" onClick={()=>deleteApply(myapplys.applyId)}>삭제</div>
                                    </Fragment>   
                                }
                    
                                       
                                 </div>
                                </Fragment>
                              }
                            
                          </div>
                                    <div className="mypage-apply-date-wrap">
                                       <div className="mypage-apply-date-sub">
                                           <div  className="mypage-apply-date-txt">마감일</div >
                                           <div className="mypage-apply-date-type">{recEndDate}</div>
                                       </div>
                                       <div className="mypage-apply-date-sub">
                                           <div  className="mypage-apply-date-txt">업무 시작일</div >
                                           <div className="mypage-apply-date-type">{workStartDate}</div>
                                       </div>
                                    </div>
                              </div>
                            </Fragment>
                           
                           )
                     }) }  
                  
                </div>


            </div>

        </div>
        </Container>
        </div>
    );

}


export default MyApply;