import React, {  useEffect,useState,Fragment } from 'react'
import { withRouter,Link} from 'react-router-dom';
import {IconButton ,Button} from '@material-ui/core';
import "./cardDetail.css"
import EditOutlinedIcon from '@material-ui/icons/EditOutlined';
import DeleteOutlineRoundedIcon from '@material-ui/icons/DeleteOutlineRounded';
import BookmarkBorderIcon from '@material-ui/icons/BookmarkBorder';
import BookmarkIcon from '@material-ui/icons/Bookmark';
import Report from "../report/report.js"
import { useDispatch, useSelector } from "react-redux";
import POST from "../../actions/postAction";
import APPLY from "../../actions/applyAction";
import PROFILE from "../../actions/profileAction"
import Spinner from "../../util/spinner"



 
const DetailAction=({boardId,writerId,accountId,userdelete}) =>{

    const dispatch = useDispatch();
    const [wish,setWish]=useState(false)
    const [open,setOpen]=useState(false)
    const {isbookmark,bookmarkId} = useSelector((state) => state.post);
    const {isProfile} = useSelector((state) => state.profile);
    const {applycheck} = useSelector((state) => state.apply);


    useEffect(()=>{
  
          if(writerId!==accountId)
          {
            dispatch({ 
              type: POST.BOOKMARK_LOADING_REQUEST,
              payload: boardId,
            }) 
            dispatch({type: PROFILE.PROFILE_CHECK_REQUEST})  

            dispatch({
              type: APPLY.APPLY_LOADING_REQUEST,
              payload: boardId,
            })          
        }

        },[dispatch,boardId,writerId,accountId,isbookmark])

       

    // 북마크 등록
    const bookUpload=()=>{
    const bookmark= {boardId:boardId}
    dispatch({ 
        type: POST.BOOKMARK_UPLOADING_REQUEST,
        payload: bookmark,
      })
    }

     // 북마크 삭제
    const bookDelete=()=>{
        dispatch({ 
            type: POST.BOOKMARK_DELETE_REQUEST,
            payload: bookmarkId,
          }) 
    }

     // 모집글 삭제 
    const postDelete=()=>{
        if (window.confirm("삭제 하시겠습니까?")) {     
          dispatch({ 
            type: POST.POST_DELETE_REQUEST,
            payload: boardId,
          }) 
      } else {
        return;
      }
     }

     // 프로필로 지원하기

     const profileApply=()=>{
       const apply={boardId:boardId}

       if (window.confirm("지원 하시겠습니까?")) {     
          dispatch({ 
            type: APPLY.APPLY_UPLOADING_REQUEST,
            payload: apply,
            })   
      } else {
        return;
      }
     }


    // 작성자
    const DetailAuth=()=>{
        return(
          <div className="DetailRightEdit">
                 <Link to={`/board/edit/${boardId}`} className="text-dark text-decoration-none"
                 >  
                  <IconButton >
                      <EditOutlinedIcon/>
                  </IconButton>
                  </Link>

                  <IconButton onClick={()=>postDelete()}>
                      <DeleteOutlineRoundedIcon/>
                  </IconButton>  
                 </div>)
    }

    // 게스트
    const DetailGuest = () => {
        return(
          <div>
          <div style={{display:"flex",justifyContent:"space-around"}}>
            <strong  onClick={() => setWish(!wish)}>
           
                {isbookmark ?
                <IconButton onClick={()=>bookDelete()} ><BookmarkIcon style={{fontSize:"30px"}}/></IconButton>
                :
                <IconButton onClick={()=>bookUpload()}> <BookmarkBorderIcon style={{fontSize:"30px"}}/></IconButton>}
            </strong>
            
              <Button onClick={()=>setOpen(true)}>
                  신고하기 
              </Button>
            <Report useOpen={[open, setOpen]} boardId={boardId} reporter={accountId} reported={writerId} />
          </div>
          <div>
          <div style={{display:"flex",justifyContent:"center",padding:"1rem"}}>
          {isProfile? 
          applycheck?
        
              <button className="RecProfileButton">제출 완료</button>
              :
              <button className="RecProfileButton" onClick={()=>profileApply()}>
              프로필 제출하기
              </button>
              
          :
            <div className="RecProfileCheck">*모집글 지원은 프로필 등록이 먼저입니다 :)</div>}
          
         
          </div>
          </div>

        </div>
        )
    }
 
  

        return (
            <Fragment>
              {
              userdelete===0?
              writerId===undefined?<Spinner/>:
              accountId===writerId?<DetailAuth/>:<DetailGuest/>:
              <div className="DetailUserDeleted">* 탈퇴한 회원입니다.</div>
              }
            </Fragment>
        )
        
}
  



export default withRouter(DetailAction);