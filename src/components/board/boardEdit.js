// 모집글 수정 
import "../post/post.css"
import { withRouter} from "react-router-dom";
import React, { useState,useEffect} from 'react'
import { Container } from 'reactstrap';
import { TextField,IconButton} from '@material-ui/core';
// import UploadFile from "../post/postFile"
import { useDispatch, useSelector } from "react-redux";
import POST from "../../actions/postAction";
import Tag from "../post/tag.js";
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline';
import RemoveCircleOutlineIcon from '@material-ui/icons/RemoveCircleOutline';
import DatePicker from "react-datepicker";
import { ko } from "date-fns/esm/locale";
import "react-datepicker/dist/react-datepicker.css";
import moment from 'moment';



const BoardEdit=(req) =>{
  
    const dispatch = useDispatch();

    // const [fileUrls, setFileUrls] = useState("")
    // const [fileAry, setFileAry] = useState([])
    // const [fileBase64Ary, setFileBase64Ary] = useState([]) // 미리보기
    const [form,setVaule]=useState({
      title:"",payment:"",text:"",recNumber:0,recEndDate:"",workStartDate:"",workEndDate:""})
    const [tagList,setTagList]=useState([])
    const BoardId=Number(req.match.params.id);
    const {tags,postDetail,b_title,b_payment,b_text,b_recNumber,boardtag} = useSelector((state) => state.post);
    
    useEffect(()=>{
      dispatch({type: POST.TAG_LOADING_REQUEST}) //태그
      dispatch({
          type:POST.POST_DETAIL_LOADING_REQUEST, //default 디테일 정보
          payload:req.match.params.id, 
        })
    
        setVaule({
          title:b_title,
          payment:b_payment,
          text:b_text,
          recNumber:b_recNumber,
          recEndDate:moment(postDetail.recEndDate).toDate(),
          workStartDate:moment(postDetail.workStartDate).toDate(),
          workEndDate:moment(postDetail.workEndDate).toDate(),
        });
      },[dispatch,req.match.params.id,b_title,
        b_payment,b_text,b_recNumber,postDetail.recEndDate
        ,postDetail.workStartDate,postDetail.workEndDate])

        useEffect(()=>{
            setTagList(boardtag);
          },[boardtag])


    

      const onChange=(e)=>{
        setVaule({
          ...form,
          [e.target.name]:e.target.value,
        });
      };


      const onSubmit=async(e)=>{


        if (window.confirm("수정 하시겠습니까?")) {
          e.preventDefault();
          if( !form.title||!form.text||!form.recNumber>0||!form.recEndDate||!form.workStartDate||!form.workEndDate)
          {
            alert("필수 사항을 모두 입력해 주세요!")
          }
          else{
      
  
             const newpost = {newTitle:form.title,newPaymentMax:form.payment,newText:form.text,newRecNumber:form.recNumber
              ,newRecEndDate:form.recEndDate,newWorkStartDate:form.workStartDate,newWorkEndDate:form.workEndDate,
              boardId:BoardId,tagList:tagList,newRecStartDate:moment(postDetail.recStartDate).toDate()};
          

            dispatch({ 
              type: POST.POST_EDIT_REQUEST,
              payload: newpost,
            })
          }
             
        } else {
          e.preventDefault();
        }
  }

      return(
        <form onSubmit={onSubmit}>
        <Container >
      
          <div className="PostTitle">
          <h2>모집글 수정</h2>
          </div>
          
  
          <div className="PostWarpper">
          <div className="PostContainer">
          <div className="PostSubTitle">
                      <h3>제목을 입력해주세요.
                      <strong style={{fontSize:"13px",color:"#b6b7b9"}}> [최대 50]</strong>
                      <strong className="PostCheck"> *</strong>
                      </h3>
                  </div>

                  <TextField
                    name="title"
                    placeholder="제목을 입력해주세요."
                    rows={1}
                    fullWidth
                    inputProps={{
                      maxLength: 50,
                    }}
                    value={form.title?form.title:""}
                    onChange={onChange}
                    variant="outlined"/>
            
                <div className="PostSubTitle" style={{marginTop:"3rem"}}>
                    <h3>모집 인원 / 지급액 입력해주세요
                    <strong className="PostCheck"> *</strong>
                    </h3>
                   
                </div>
        
              <div className="PostDetailWarpper">
                <div className="PostDetailItem">
                       <strong className="PostDetailText">
                         모집 인원:</strong>
                       <strong style={{padding:"1rem"}}>  {form.recNumber}</strong>
                    <IconButton style={{padding:"0"}} onClick={()=> setVaule({...form,recNumber:form.recNumber + 1})}><AddCircleOutlineIcon style={{fontSize:"1.5rem"}} /></IconButton>
                    <IconButton style={{padding:"0"}} onClick={()=>form.recNumber>0? setVaule({...form,recNumber:form.recNumber -1}):0}><RemoveCircleOutlineIcon style={{fontSize:"1.5rem"}}/></IconButton>               
                </div>
    
                <div className="PostDetailItem">
                       <strong className="PostDetailText">
                    
                         지급액:</strong>
                       <TextField
                          id="outlined-uncontrolled"
                          name="payment"
                          type="number"
                          variant="outlined"
                          size="small"
                          inputProps={{
                            min: 0,
                          }}
                          onChange={onChange}
                          value={form.payment?form.payment:""}
                         style={{width:"12rem"}}
                        />
                        <strong className="work-text">원</strong>
                </div>
               </div>

            <div className="PostEditWarpper" >


                <div className="PostSubTitle">
                <h3>업무 기간을 선택해주세요.
                <strong className="PostCheck"> *</strong>
                </h3>
            </div>

                <div className="PostBottomWarpper">

                <div className="PostBottomItem">
                <strong className="PostBottomTitle">모집 마감일 :</strong>
                <DatePicker
                            locale={ko}	
                            name="recEndDate"
                            dateFormat="yyyy-MM-dd"	
                            className="PostDate"	
                            minDate={new Date()}		
                            value={form.recEndDate}
                            closeOnScroll={true}	
                            placeholderText={form.recEndDate}	
                            selected={form.recEndDate}	
                            onChange={(date) => {setVaule({...form,recEndDate:date})}}	// 날짜를 선택하였을 때 실행될 함수
                            ></DatePicker>  
                </div>
                <div className="PostBottomItem">
                <strong className="PostBottomTitle">업무 시작일 :</strong>
                    <DatePicker
                        locale={ko}	
                        name="workstartDate"
                        dateFormat="yyyy-MM-dd"	
                        className="PostDate"	
                        minDate={form.recEndDate}		
                        closeOnScroll={true}	
                        placeholderText={form.recEndDate}	
                        selected={form.workStartDate}	
                        onChange={(date) => {setVaule({...form,workStartDate:date})}}
                        ></DatePicker> 
                </div>
                
                <div className="PostBottomItem">
                <strong className="PostBottomTitle">업무 마감일 :</strong>
                    <DatePicker
                        locale={ko}	
                        name="workEndDate"
                        dateFormat="yyyy-MM-dd"	
                        className="PostDate"	
                        minDate={form.workStartDate}	
                        closeOnScroll={true}	
                        placeholderText={form.workStartDate}	
                        selected={form.workEndDate}	
                        onChange={(date) => {setVaule({...form,workEndDate:date})}}
                        ></DatePicker> 
                </div>
                </div>
            </div>
    
               {/* 상세내용  */}
                  <div className="PostSubTitle" style={{marginTop:"2.3rem"}}>
                    <h3>상세내용을 입력해주세요.
                    <strong style={{fontSize:"13px",color:"#b6b7b9"}}> [최대 2000]</strong>
                    <strong className="PostCheck"> *</strong>
                    </h3>
                </div>
    
                <TextField
                    id="outlined-multiline-static"
                    name="text"
                    multiline
                    rows={12}
                    inputProps={{
                      maxLength: 2000,
                    }}
                    fullWidth
                    onChange={onChange}
                    value={form.text}
                    variant="outlined"/>
    
    
                <div className="PostSubTitle" style={{marginTop:"3rem"}}>
                    <h3>필요기술 또는 언어가 있나요?
                    </h3>
                </div>
                <div><Tag tags={tags} useTagList={[tagList,setTagList]} /></div>

    
               {/* 첨부파일  */}
                {/* <div className="PostSubTitle" style={{marginTop:"3rem"}}>
                    <h3>첨부파일이 있으신가요?
                    <small className="PostSubTitleEs">[생략 가능]</small>
                    </h3>
                </div> 
    
                <UploadFile usefileAry={[fileAry,setFileAry]} useFileBase64Ary={[fileBase64Ary, setFileBase64Ary]} /> */}
        
                <div className="PostArea" >
                     <button className="PostBtn"type="submit" >수정</button>
                </div>
          </div>
            
                  </div>  
          </Container>
          </form>
      )  



}
export default withRouter(BoardEdit);