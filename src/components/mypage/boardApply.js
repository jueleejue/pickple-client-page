import React,{useState,useEffect} from 'react'
import "./boardApply.css"
import { Container } from 'reactstrap';
import {useDispatch,useSelector} from "react-redux"
import  Reviewform from "../post/reviewform"
import PROFILE from "../../actions/profileAction"
import APPLY from "../../actions/applyAction"
import ProfileDateil from "../profile/profileDetail"
import ReviewDetail from "../mypage/myReview"
import Loading from "../../util/loading"
import { Fragment } from 'react';


const RecApply=({myboardusers,boarduserloading,boardId})=>{

  
    const [formopen,setFormOpen]=useState(false);
    const [profileopen,setProfileOpen]=useState(false);
    const [viewopen,setViewOpen]=useState(false);
    const {profileDetail} = useSelector((state) => state.profile);
    const [accountId,setAccountId] =useState(0);
    const {isContracted,reviewState,applydetail} = useSelector((state) => state.apply);
    const {profilereviews,detailloading} =useSelector((state) => state.apply);


    const dispatch = useDispatch();

        useEffect(()=>{
      
        },[dispatch,isContracted,reviewState])

 
    const profileClick=(profileId)=>{
        setProfileOpen(true);
        dispatch({
            type: PROFILE.PROFILE_DETAIL_LOADING_REQUEST,
            payload: profileId
        })
       
        dispatch({
                type: APPLY.REVIEW_PROFILE_REQUEST,
                payload: profileId
            })

    }


    const reviewrResult=(state)=>{

        switch(state){
          case "BEFORE":
            return(
              <strong>-</strong>
            )
         case "WAITING":
            return(
              <strong>승인 대기</strong>
            )
         case "ACCEPT":
            return(
              <strong>승인 완료</strong>
            )
         case "REJECT":
            return(
              <strong>승인 거절</strong>
            )
        
        default:
              return(
                <Fragment></Fragment>
              )
        }
        }

    const  Contract=(applyId)=> {
        if (window.confirm("승인하시겠습니까?")) {
                 const apply={applyId:applyId}
                dispatch({
                        type: APPLY.APPLY_CONTRACT_REQUEST,
                        payload: apply,
                        boardId:boardId,
                    })
        
        } else {
          return;
        }

      }

    const reviewDetail=(applyId)=>{
        setViewOpen(true);
            dispatch({
                type: APPLY.APPLY_DETAIL_REQUEST,
                payload: applyId,
            })
    }  


    const reviewForm=(appyId)=>{
            setFormOpen(true)
            setAccountId(appyId)
    }


    return(
            <div className="mypage-user-container">
            <Container>
            <div className="mypage-user-container">
            
                <div className="mypage-user-content-wrap">
                
                {boarduserloading?
                <div className="mypage-user-content-sub">
                        <Loading/>
                </div>
                :
                <div className="mypage-user-content-sub">
                  { myboardusers.map((myboardusers,index)=>{
                            return(
                        <div  key={index} className="mypage-user-content-item">
                         
                           <Fragment>
                                <div className="mypage-user-content-left">
                                        <div className="mypage-user-content-tit">
                                                <strong>
                                                {myboardusers.accountName}
                                                </strong>
                                         </div>

                                        {myboardusers.accountIsDeleted?
                                         <div className="mypage-user-content-txt"
                                         style={{fontWeight:"550" ,color:"#e73535"
                                        ,textOverflow:"inherit",overflow:"inherit"
                                        }}
                                         >
                                        * 탈퇴한 사용자
                                        </div>:
                                         <div className="mypage-user-content-txt">
                                         {myboardusers.profileIntroduce}
                                        </div>
                                        }
                                       
                                </div>
                                
                                {/* 여기--- */}

                                {myboardusers.accountIsDeleted?"":
                                  <div className="mypage-user-content-right">
                                  <div className="mypage-user-contract-wrap">
                                              <div className="mypage-user-contract-state">
                                                      {myboardusers.isContracted===1?<strong>승인</strong>:
                                                      <div className="mypage-user-contract-btn" 
                                                      onClick={()=>Contract(myboardusers.applyId)}>

                                                              승인하기</div>
                                                      }

                                              </div>
                                             
                                              <div className="mypage-user-contract-profile" onClick={()=>profileClick(myboardusers.profileId)}>
                                                      <strong>프로필 보기</strong>
                                              </div>
                                             
                              
                                  </div>      

                                  <div className="mypage-user-after-wrap">
                                          {myboardusers.isContracted!==1?
                                          <div className="mypage-user-after-none" >* 승인 후 활성화 됩니다.</div>
                                          
                                          :
                                          myboardusers.reviewState==="BEFORE"?
                                          <div className="mypage-user-review-wrap">
                                                  <div className="mypage-user-after-review" onClick={()=>reviewForm(myboardusers.applyId)}>
                                                       <strong>리뷰작성 </strong>
                                                  </div>
                                                  
                                                  <div className="mypage-user-review-state">
                                                       <strong>{reviewrResult(myboardusers.reviewState)}</strong>
                                                  </div>
                                                  
                                          </div>
                                          
                                          :
                                          <div className="mypage-user-review-wrap">
                                                  
                                              <div className="mypage-user-after-review" onClick={()=>reviewDetail(myboardusers.applyId)}>
                                                      <strong>리뷰보기</strong>
                                              </div>
                                              <div className="mypage-user-review-state">
                                              {reviewrResult(myboardusers.reviewState)}
                                              </div>
                                              
                                          </div>
                                          

                                          }
                                  </div>  

                              </div>

                                }

                             
                           </Fragment>
                           
                           
                       
                               

                                  </div>
                                 
                               )
                         }) }
                </div>
                }
              
                        <ProfileDateil  useOpen={[profileopen,setProfileOpen]}  profileDetail={profileDetail} profilereviews={profilereviews} detailloading={detailloading}/>
                        <ReviewDetail useOpen={[viewopen,setViewOpen]} reviewDetail={applydetail} />  
                        <Reviewform useOpen={[formopen,setFormOpen]} applyId={accountId} boardId={boardId}/>
                </div>
            </div>
            </Container>
            </div>
    );

}


export default RecApply;