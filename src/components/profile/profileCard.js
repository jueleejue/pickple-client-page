import React, { useState} from 'react'
import "./profileCard.css"
import check from "../../assets/img/contact_check.png";
import ProfileDateil from "./profileDetail.js"
import { useDispatch, useSelector } from "react-redux";
import PROFILE from "../../actions/profileAction";
import APPLY from "../../actions/applyAction"
import { Fragment } from 'react';

const ProfileCard=({profiles})=>{

    const dispatch = useDispatch();
    const [open,setOpen]=useState(false);
    const {profileDetail,detailloading} = useSelector((state) => state.profile);
    const {isAuthenticated} = useSelector((state) => state.user);
    const {profilereviews} =useSelector((state) => state.apply);

    const profileClick=(profileId)=>{
     
        if(isAuthenticated){
            setOpen(true);
            dispatch({
                type: PROFILE.PROFILE_DETAIL_LOADING_REQUEST,
                payload: profileId
            })
            
            dispatch({
                type: APPLY.REVIEW_PROFILE_REQUEST,
                payload: profileId
            })



        }else{
            alert("로그인이 필요한 서비스 입니다.")
        }



    }


    return(
        <div>
            {
              
                Array.isArray(profiles) ? profiles.map((profiles,index) =>{
                    return(
                        <div key={index} className="col p-2 p-card-container">
                        <div  style={{boxShadow:"none"}}  >
                        <div className="p-card-wrap">
                                <div className="p-card-left">
                                    <div className="p-card-user">
                                    <strong className="p-user-txt">{profiles.userName}</strong>
                                    <span>활동가능</span>
                                    </div>
                                    
                                    <div className="p-card-introduce">
                                                {profiles.introduce}
                                    </div>

                                    <div className="p-card-tech">
                                    {
                                    Array.isArray(profiles.profileTagList) ? profiles.profileTagList.map(({tagId,tagName}) =>{
                                        return(
                                                <div className="p-card-txt" key={tagId} >
                                                    <strong>{tagName}</strong>
                                                </div>
                                            )
                                        }) :
                                        ""} 
                                    
                                    </div>

                                </div>

            
                        <div className="p-card-right">
                            <div className="p-additional-info">
                           
                            {profiles.profileTagList.length>0?"":""

                            }
                            <img  src={check} alt="img" style={{width:"1.3rem"}} />
                                    <span>연락처 등록</span>

                            {profiles.profileTagList.length>0?
                            <Fragment>
                                <img src={check} alt="img" style={{width:"1.3rem"}} />
                                    <span>기술 스택 </span> 
                            </Fragment>
                            :
                            ""
                            }    
                            </div>
                       
                        <div className="p-additional-detail"  onClick={()=>profileClick(profiles.profileId)} >
                            <h3 className="p-additional-btn">
                                프로필 바로가기
                            </h3>

                        </div>
                                    
                        </div>
                        </div>
                     
                      </div> 
                
                    </div>
                    )
                }) :
              ""
            }
             <ProfileDateil  useOpen={[open,setOpen]}profileDetail={profileDetail} profilereviews={profilereviews} detailloading={detailloading} />
              
    
            
        </div>
    )



}


export default ProfileCard;
