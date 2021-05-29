 import React, { useState,Fragment } from 'react'
 import {Dialog,IconButton,TextField} from '@material-ui/core';
 import CloseIcon from '@material-ui/icons/Close';
import "./report.css"
import { useDispatch} from "react-redux";
import REPORT from "../../actions/reportAction";
import {UseConfirm} from "../../util/confirm"


 const Report=({boardId,useOpen}) =>{
 
  var title ='※모집글 신고사항 제목 : \n \n Ex) 잘못된 정보 기재,사기 피해  등 \n \n '
  var content='※상세한 신고 내용 \n\n  Ex) 부정확한 연락 수단 기재 등 '

    const [open,setOpen]=useOpen;
    const [text,setText]=useState(title+content)
   const dispatch = useDispatch();


    const handleClose=()=>{
      setOpen(false);
    }
    
  
  const uploadConfirm = () => {reportUpload()}
  const cancelConfirm = () => {return;}

  const ConfirmDelete = UseConfirm(
    "제출하시겠습니까?",
    uploadConfirm,
    cancelConfirm
  );

    const reportUpload=()=>{

      if(text==="")
      {
        alert("신고글을 입력해주세요.")
      }
      else{
        const report= {boardId:boardId,text:text}
        dispatch({ 
            type: REPORT.REPORT_UPLOADING_REQUEST,
            payload: report,
          })
        setOpen(false);
      }

  
      }
 
   
   return(
     <Fragment>
      <Dialog fullWidth open={open}  onClose={handleClose} >
        <div className="report-tit-wrap">
        <div className="report-tit" >
            <strong>신고서 양식 </strong>
            </div>
            <IconButton onClick={()=>setOpen(false)}>   
            <CloseIcon style={{fontSize:"2rem",float:"right"}}/></IconButton>
        </div>
  
                <div className="report-body">
                <TextField
                    id="outlined-multiline-static"
                    name="text"
                    multiline
                    rows={12}
                    inputProps={{
                      maxLength: 255,
                    }}
                    fullWidth
                    onChange={(e) => {setText(e.target.value)}}
                    value={text}
                    variant="outlined"/>

                </div>
        <div className="btn-report-area">
  
          <button className="btn-report"  onClick={()=>ConfirmDelete()}>
            제출
          </button>
        </div >
      </Dialog>
 </Fragment> 
    
   )
 }


 export default Report;