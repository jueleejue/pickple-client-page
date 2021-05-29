import React, { Fragment,useState,useEffect} from 'react'
import "./identity.css"
import { Link } from "react-router-dom";
import HowToRegIcon from '@material-ui/icons/HowToReg';
import {useDispatch, useSelector} from "react-redux"
import USER from "../../actions/userAction"
import APPLY from "../../actions/applyAction"
import { Container } from 'reactstrap';
import PROFILE from "../../actions/profileAction"
import UserEdit from "../user/userEdit"
import ProfileDateil from "../profile/profileDetail"
import Switch from '@material-ui/core/Switch';


const Identity=()=>{
  
        const dispatch = useDispatch();
        const {isProfile,profileId} = useSelector((state) => state.profile);
        const {profileDetail,isOpen,detailloading} = useSelector((state) => state.profile);
        const [open,setOpen]=useState(false);
        const [isswitch,setSwitch]=useState(false);
        const [click,setClick]=useState(false);
        const {users,accountId} = useSelector((state) => state.user);
        const {profilereviews} =useSelector((state) => state.apply);
    

        useEffect(()=>{

            window.scrollTo(0, 0);
            dispatch({type: USER.USER_LOADING_REQUEST})
            dispatch({type: PROFILE.PROFILE_CHECK_REQUEST})  
            setSwitch(isOpen?isOpen:false)

            },[dispatch,isOpen])
         

            const profileClick=(profileId)=>{
                setClick(true);
                dispatch({
                    type: PROFILE.PROFILE_DETAIL_LOADING_REQUEST,
                    payload: profileId
                })
                dispatch({
                    type: APPLY.REVIEW_PROFILE_REQUEST,
                    payload: profileId
                })    

            }

            const  deleteUser=()=> {
                if (window.confirm("회원을 탈퇴하시겠습니까?")) {
                        const user={idString:users.idString}
                        dispatch({
                                type: USER.USER_DELETE_REQUEST,
                                payload: user,
                            })
                } else {
                  return;
                }
              }

            const handleisProfile=(e)=>{
                setSwitch(e.target.checked);
                dispatch({
                    type: PROFILE.PROFILE_ISOPEN_REQUEST,
                    payload:{isOpen:e.target.checked?1:0}
                })    
        
            }

        

    
        const isprofile=()=>{
                if(isProfile)
                {
                    return(
                        <Fragment>
                             <div className="mypage-profile-right-content">
                                  <span>프로필 공개 여부</span>
                                <span>
                                <Switch
                                    checked={isswitch}
                                    onChange={handleisProfile}
                                    color="primary"
                                    name="isswitch"
                                    style={{fontSize:"30px"}}
                                />
                                </span>
                                </div>

                     
                       <div className="mypage-profile-bottom-common">
                       <span  onClick={()=>profileClick(profileId)} >내 프로필 보기</span>
                       <ProfileDateil  useOpen={[click,setClick]} profileDetail={profileDetail} profilereviews={profilereviews} detailloading={detailloading} />
                       <Link to={`/profile/edit/${profileId}`} className="text-dark text-decoration-none">
                       <span>프로필 수정하기</span>
                       </Link>
    
                   </div>
                   </Fragment>
                    )
                }
                else{
                    return(
                        <Fragment>
                        <div className="mypage-profile-right-content">
                            <span>
                            아직 등록된 프로필이 없습니다!</span>
                       </div>
                       <div className="mypage-profile-bottom-common">
                       <Link to={`/profile/post/${accountId}`}><span>프로필 등록하기</span></Link> 
                   </div>
   
                   </Fragment>
                    )
                }
        }

  


    return(
        
    <div className="mypage-identity-container">
        <Container>
        
            <div className="mypage-profile-wrap">
            <div className="mypage-profile-info">
                <div className="mypage-profile-left">
                    <div className="mypage-profile-sub-tit">
                        <span>😀</span>
                        <span>내 정보</span>
                    </div>
                    <div className="mypage-profile-left-bottom">
                        <div className="mypage-profile-left-bottom-icon">
    
                         <HowToRegIcon style={{fontSize:"2.5rem"}}/>
                         <span>{users.name} 님</span>
                        </div>
    
                        <div className="mypage-profile-left-bottom-right">
                             <div >
                                
                           </div>
                        </div>
    
                    </div>
                    <div className="mypage-profile-bottom-common-wrap">
    
                    <div className="mypage-profile-bottom-common">
                    
                    <span onClick={()=>setOpen(true)}>내 정보 조회/수정하기</span>
                    <span onClick={()=>deleteUser(true)}>회원 탈퇴하기</span>
                    <UserEdit useOpen={[open,setOpen]} users={users}/>
                    </div>
                    </div>
               
                </div>
    
                <div className="mypage-profile-right">
                    <div className="mypage-profile-sub-tit">
                        <span>📖</span>
                        <span>프로필</span>
                    </div>
                    
                        {isprofile()}
                </div>
            </div>
           
    
        </div>
            
     
    </Container>
 </div>
 
    );

}


export default Identity;
