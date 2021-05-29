import React ,{ Fragment ,useState,useEffect} from 'react'
import "./myReview.css"
import {Dialog,IconButton,TextField} from '@material-ui/core';
import CloseIcon from '@material-ui/icons/Close';
import APPLY from "../../actions/applyAction"
import { useDispatch} from "react-redux";



const ReviewView=({useOpen,reviewDetail})=>{


    const [open,setOpen]=useOpen;
    const [review,setReview]=useState("")
    const dispatch = useDispatch();

    useEffect(()=>{
        setReview(reviewDetail.review)
      },[reviewDetail.review])

      
    const onChange=(e)=>{
        setReview(e.target.value);
      };

    const handleClose=()=>{
        setOpen(false);
      }

      const  reviewupload=async(e)=>{
        if (window.confirm("등록 하시겠습니까?")) {
                e.preventDefault();
                if(review==="")
                {
                alert("리뷰 내용을 입력해주세요.")
                }
                else{

                dispatch({ 
                    type: APPLY.REVIEW_UPLOADING_REQUEST,
                    payload: {applyId:reviewDetail.applyId,review:review},
                    })
                setOpen(false)
                }
        } else {
          e.preventDefault();
        }
      }




    return(
        <Fragment>
        <Dialog fullWidth open={open}  onClose={handleClose} >
          <div className="review-view-tit-wrap">
          <div className="review-view-tit" >
              <strong>리뷰 보기</strong>
              </div>
              <IconButton onClick={()=>setOpen(false)}>   
              <CloseIcon style={{fontSize:"2rem",float:"right"}}/></IconButton>
          </div>


                    <Fragment>
                        {
                            reviewDetail.reviewState==="REJECT"?
                            <Fragment>
                            <div className="review-view-input-content">
                                <div className="review-view-content-sub">
                                    <TextField
                                        id="outlined-multiline-static"
                                        name="review"
                                        multiline
                                        rows={12}
                                        fullWidth
                                        disabled={false}
                                        onChange={onChange}
                                        value={review}
                                        variant="outlined"/>
                                </div>
                            </div>
                                    <div className="btn-review-form-area">
                                    <button className="btn-review-form"onClick={()=>setOpen(false)}  >
                                    취소
                                    </button>
                                    <button className="btn-review-form"onClick={(e)=>reviewupload(e)}  >
                                    리뷰 등록
                                    </button>
                                    </div >
                            </Fragment>
                            
                            :
                            
                          <div className="review-view-content">
                          <div className="review-view-content-sub">
                            <div className="review-view-content-txt"> 
                                {reviewDetail.review}
                            </div>
                          </div>
                        </div>
                        }
                    </Fragment>
        </Dialog>
   </Fragment> 
    );

}


export default ReviewView;