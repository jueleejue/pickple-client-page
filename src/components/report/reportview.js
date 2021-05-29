import React, { useEffect} from 'react'
import "./reportview.css"
import {Dialog,IconButton} from '@material-ui/core';
import CloseIcon from '@material-ui/icons/Close';
import { Fragment } from 'react';


const ReviewView=({useOpen,reportdetails})=>{


    const [open,setOpen]=useOpen;

    useEffect(()=>{
  

      },[])


    const handleClose=()=>{
        setOpen(false);
      }

    const reportresult=(state)=>{

      switch(state){
        case "NONE":
          return(
            <div className="report-view-state-txt">처리 전</div>
          )
       case "BOARD_DELETED":
          return(
            <div className="report-view-state-txt">게시물 삭제</div>
          )
       case "BOARD_MODIFIED":
          return(
            <div className="report-view-state-txt">게시물 수정</div>
          )
      case "ACCOUNT_DELETED":
          return(
            <div className="report-view-state-txt">회원 삭제</div>
          )
      case "GIVE_WARNING":
          return(
            <div className="report-view-state-txt">사용자 주의</div>
          )
      default:
            return(
              <Fragment></Fragment>
            )
      }
      
    }



    return(
        <Fragment>
        <Dialog fullWidth open={open}  onClose={handleClose} >
          <div className="report-view-tit-wrap">
          <div className="report-view-tit" >
              <strong>신고 상세</strong>
              </div>
              <IconButton onClick={()=>setOpen(false)}>   
              <CloseIcon style={{fontSize:"2rem",float:"right"}}/></IconButton>
          </div>
            <div className="report-view-state-wrap">
              <div className="report-view-state-sub">
              <div className="report-view-state-tit" >처리 결과:</div>
              {reportresult(reportdetails.reportResult)}
            
              </div>
            </div>

                <div className="report-view-content">
                    <div className="report-view-content-sub">

                   <div className="report-view-content-txt"> 
                   {reportdetails.reportText}
                   </div>
                    </div>
                </div>

     
        </Dialog>
   </Fragment> 
    );

}


export default ReviewView;