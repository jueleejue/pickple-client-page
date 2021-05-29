import React, {  useEffect,Fragment } from 'react'
import {Container} from 'reactstrap'
import {Grid} from '@material-ui/core';
import "./cardDetail.css"
import DetailAction from "./detailAction.js"
import { useDispatch, useSelector } from "react-redux";
import POST from "../../actions/postAction";
import USER from "../../actions/userAction";
import moment from 'moment';
import Loading from "../../util/loading"

 
const CardDetail=(req) =>{

  const dispatch = useDispatch();
  const {postDetail,detailloading} = useSelector((state) => state.post);
  const {accountId} = useSelector((state) => state.user);
  const recEndDate = moment(postDetail.recEndDate).format('YYYY-MM-DD')
  const recStartDate = moment(postDetail.recStartDate).format('YYYY-MM-DD')
  const workStartDate = moment(postDetail.workStartDate).format('YYYY-MM-DD')
  const workEndDate = moment(postDetail.workEndDate).format('YYYY-MM-DD')

  
  useEffect(()=>{
    dispatch({type: USER.USER_LOADING_REQUEST})
    window.scrollTo(0, 0);
     dispatch({
      type: POST.POST_DETAIL_LOADING_REQUEST,
      payload: req.match.params.id,
    }
    )
    },[dispatch,postDetail.workEndDate,req.match.params.id])



  return(
    
    <Fragment>
  {postDetail?
   <div className="detail-component">
   {/* 모집글 타이틀 */}
   <Container>
     
     <Grid item xs={12} className="CardDetailTitle">
       <h1>모집글</h1>
     </Grid>
     <div className="CardDetailWrap">
 
         <div className="DetailLeftInfo">
             <div className="DetailLeftBox">
                 <div className="DetailLeftItem">
                     <div className="Title">
                       <span >{postDetail.title}</span>
                      
                     </div>
                     <div className="SideInfo">
                   
                       <span>작성일:{recStartDate}</span>
                     </div>
                 </div>
                   
             </div>
             <div className="RecMiddleInfo">
                 <ul className="MiddleInfoItemWrap">
                   <li className="MiddleItem">
                       <span className="MiddleTit">모집 인원</span>
                       <span  className="MiddleTitSub">
                         {postDetail.recNumber}
                         명
                     </span>
                   </li>
                   <li className="MiddleItem">
                   <span className="MiddleTit">지급액</span>
                       <span  className="MiddleTitSub">
                       {postDetail.paymentMax}원
                     </span>
                   </li>
                   <li className="MiddleItem">
                   <span className="MiddleTit">마감일</span>
                       <span  className="MiddleTitSub">
                         {/* 업무 Start - End */}
                         {recEndDate}
                     </span>
                   </li>
                   <li className="MiddleItem">
                   <span className="MiddleTit">예상 진행일</span>
                       <span  className="MiddleTitSub" style={{fontSize:"1.2rem",padding:"0.3rem"}} >
                         {workStartDate} &nbsp;부터
                      
                     </span>
                     <span  className="MiddleTitSub" style={{fontSize:"1.2rem",padding:"0.3rem"}}>
                         {workEndDate} &nbsp;까지
                      
                     </span>
                   </li>
                 </ul>
                <div className="RecTechWrap">
                
                  <div className="RecLabel"> <strong className="RecDeco"/>기술 스택 </div>
                  <div className="RecTechSubWrap" >
                    {
                   Array.isArray(postDetail.recruitmentBoardTagList) ? postDetail.recruitmentBoardTagList.map(({tagName},index) =>{
                     return(
                             <div className="RecTechText" key={index} >
                                 <strong>{tagName}</strong>
                             </div>
                           )
                       }) :
                     ""}
                  </div>
                </div>
              <div className="RecDetailContent">
                <div className="RecLabel"><strong className="RecDeco"/>상세 내용</div>
                   <div className="RecDetailDataWrap">
                         <p className="RecDetailData">
                         {postDetail.text}
                         </p>
                   </div>
                </div>
               </div>  
         </div>
         {/* 오른쪽  */}
         <div className="DetailRightInfo">
               <div className="DetailInfoUser">
                 <div className="UserTitle"> [작성자] </div>
                {postDetail.writerIsDeleted===0?
                <span >{postDetail.writerName}</span>:
                <Fragment>
                  <span >{postDetail.writerName}</span>
                  
                </Fragment>
     
                
                }
                
               </div>
           <DetailAction boardId={postDetail.boardId} writerId={postDetail.writerId}  accountId={accountId} userdelete={postDetail.writerIsDeleted}
           
           />
         </div>
      
      </div>
     </Container>
      </div>
  : detailloading?<Loading/>:<Loading/>
    }
 
</Fragment> 
   
  )
}
export default CardDetail;