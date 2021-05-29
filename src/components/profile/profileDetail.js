import React, { useState,useEffect} from 'react'
import {Dialog} from '@material-ui/core';
import DialogContent from '@material-ui/core/DialogContent';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { useTheme } from '@material-ui/core/styles';
import CloseIcon from '@material-ui/icons/Close';
import ChatBubbleOutlineIcon from '@material-ui/icons/ChatBubbleOutline';
import EmailIcon from '@material-ui/icons/Email';
import AssignmentIcon from '@material-ui/icons/Assignment';
import "./profileDetail.css"
import Review from "./review.js"
import Paginations from "../../util/pageNation"



const ProfileDatail=({useOpen,profileDetail,profilereviews})=>{
  
    const [open,setOpen]=useOpen;

        useEffect(()=>{
      
        },[profileDetail.kakaoId])

        const theme = useTheme();
        const fullScreen = useMediaQuery(theme.breakpoints.down('xs'));

      
        const [currentPage, setCurrentPage] = useState(1);
        const [postsPerPage] = useState(1);

        const indexOfLast = currentPage * postsPerPage; 
        const indexOfFirst = indexOfLast - postsPerPage;

        function currentPosts(tmp) {
            let currentPosts = 0;
            currentPosts = tmp.slice(indexOfFirst, indexOfLast);
            return currentPosts;
        }
        
        const handleClose = () => {
          setOpen(false);
        };

    return(
    
      <div>
 
      <Dialog
        fullScreen={fullScreen}
        fullWidth={true}
        open={open}
        onClose={handleClose}
        aria-labelledby="responsive-dialog-title"
       
      >  
     
                        <DialogContent
                        style={{padding:"1.2em"}}>

                        <div className="p-detail-container">
                                <div className="p-detail-tit">
                                    <strong>프로필 상세보기</strong> 
                                    <CloseIcon onClick={()=>handleClose()} style={{float:"right",fontSize:"1.2em",color:"#000"}}/>
                                </div>

                                <div className="p-detail-info-tit"> 
                                    <strong>{profileDetail.userName}</strong> 님
                                
                                </div>
                            <div className="p-detail-sub-container">
                            <div className="p-detail-info-wrap">
                                
                                <div className="p-detail-left-info">
                                    <div className="p-detail-sub-tit">연락수단
                                    </div>
                                        <div className="p-detail-left-item">
                                                <ChatBubbleOutlineIcon style={{fontSize:"2em",lineHeight:"3"}}/>
                                            <div className="p-detail-left-txt">{profileDetail.kakaoId}</div>
                                        </div>
                                        <div className="p-detail-left-item">
                                                <EmailIcon style={{fontSize:"2em",lineHeight:"3"}}/>
                                            <div className="p-detail-left-txt">{profileDetail.workEmail}</div>
                                        </div>
                                        <div className="p-detail-left-item">
                                                <AssignmentIcon style={{fontSize:"2em",lineHeight:"3"}}/>
                                            <div className="p-detail-left-txt">{profileDetail.blog}</div>
                                        </div>
                                    
                                </div>
                                <div className="p-detail-right-info">
                                        <div className="p-detail-sub-tit">기술스택 </div>
                                        <div className="p-detail-right-tech">
                                            {
                                            Array.isArray(profileDetail.profileTagList) ? profileDetail.profileTagList.map(({tagName},index) =>{
                                                return(
                                                        <div className="RecTechText" key={index} >
                                                            <strong>{tagName}</strong>
                                                        </div>
                                                    )
                                                }) :
                                                ""} 
                                            
                                            </div>
                                
                                </div>
                            </div>
                            <div className="p-detail-content">
                                        <div className="p-detail-sub-tit">상세내용 </div>
                            
                            <div className="p-datail-content-data">
                                {profileDetail.introduce}
                            </div>
                            </div>
                            </div>
                            

                                <div className="p-detail-review">
                                <div className="p-detail-sub-tit">리뷰
                                        </div>
                                        <div className="p-datail-review-data">

                                            <Review  review={currentPosts(profilereviews)} />
                                        </div>
                                    

                                        <div  className="p-detail-review-bottom">

                                        {profilereviews.length>0? <Paginations  postsPerPage={postsPerPage} totalPosts={profilereviews.length} current={currentPage} paginate={setCurrentPage}/>:
                                        ""}    

                                
                                        </div>
                                </div>
                        </div>
                        </DialogContent>
                </Dialog>
            </div>
    );

}


export default ProfileDatail;
