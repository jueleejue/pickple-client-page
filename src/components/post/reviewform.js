import React, { useState} from 'react'
import "./reviewform.css"
import {Dialog,IconButton,TextField} from '@material-ui/core';
import CloseIcon from '@material-ui/icons/Close';
import { Fragment } from 'react';
import {UseConfirm} from "../../util/confirm"
import APPLY from "../../actions/applyAction"
import { useDispatch} from "react-redux";


const Reviewform=({useOpen,applyId,boardId})=>{


    const [open,setOpen]=useOpen;
    const dispatch = useDispatch();
    const [form,setVaule]=useState({review:""})
  


    const handleClose=()=>{
        setOpen(false);
      }


    const onChange=(e)=>{

        setVaule({
          ...form,
          [e.target.name]:e.target.value,
        });
      };

 
      const uploadConfirm = () => {reviewupload()}
      const cancelConfirm = () => {setOpen(false)}
    
      const Confirmupload= UseConfirm(
        "등록하시겠습니까?",
        uploadConfirm,
        cancelConfirm
      );
    
        const reviewupload=()=>{
        
          if(form.review==="")
          {
            alert("리뷰 내용을 입력해주세요.")
          }
          else{
            const review={applyId:applyId,review:form.review}
            
            dispatch({ 
                type: APPLY.REVIEW_UPLOADING_REQUEST,
                payload: review,
                boardId:boardId,
              })
          setOpen(false)
          }

        
          }

    return(
        <Fragment>
        <Dialog  style={{backgroundColor:"rgba(70, 70, 71, 0.1)"}} fullWidth open={open}  onClose={handleClose} 
        
        aria-labelledby="alert-dialog-slide-title"
        aria-describedby="alert-dialog-slide-description"
        >
          <div className="review-form-tit-wrap">
          <div className="review-form-tit" >
              <strong>리뷰 작성</strong>
              </div>
              <IconButton onClick={()=>setOpen(false)}>   
              <CloseIcon style={{fontSize:"2rem",float:"right"}}/></IconButton>
          </div>
                <div className="review-form-content">
                    <div className="review-form-content-sub">

                        <TextField
                            id="outlined-multiline-static"
                            name="review"
                            multiline
                            rows={12}
                            fullWidth
                            onChange={onChange}
                            value={form.review}
                            variant="outlined"/>
                    </div>
                </div>

          <div className="btn-review-form-area">
    
             <button className="btn-review-form"onClick={()=>setOpen(false)}  >
              취소
            </button>
            <button className="btn-review-form"onClick={()=>Confirmupload()}  >
              등록
            </button>
          </div >
        </Dialog>
   </Fragment> 
    );

}


export default Reviewform;