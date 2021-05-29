import "./post.css"
import { withRouter} from "react-router-dom";
import React, { useState,useEffect} from 'react'
import { Container } from 'reactstrap';
import { TextField,IconButton} from '@material-ui/core';
import { useDispatch, useSelector } from "react-redux";
import POST from "../../actions/postAction";
import Tag from "./tag.js";
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline';
import RemoveCircleOutlineIcon from '@material-ui/icons/RemoveCircleOutline';
import DatePicker from "react-datepicker";
import { ko } from "date-fns/esm/locale";
import "react-datepicker/dist/react-datepicker.css";
import moment from 'moment';
import USER from "../../actions/userAction"
// import UploadFile from "./postFile"




const Postform=() =>{

  
    // // const [fileUrls, setFileUrls] = useState("")
    // const [fileAry, setFileAry] = useState([])
    // const [fileBase64Ary, setFileBase64Ary] = useState([]) // 미리보기
    const [tagList,setTagList]=useState([])
    const [rendtag]=useState([])
    const [form,setVaule]=useState({
      title:"",payment:0,text:"",recNumber:0,recEndDate:"",workStartDate:"",workEndDate:""
    })
    let today = new Date();   
    let defaultTime = moment(today).format('YYYY-MM-DD'); // 년도
    let startdefault=moment(form.recEndDate).format('YYYY-MM-DD');
    let enddefault=moment(form.workStartDate).format('YYYY-MM-DD');
   


    const dispatch = useDispatch();
    const {tags} = useSelector((state) => state.post);
  

    useEffect(()=>{
          dispatch({type: USER.USER_LOADING_REQUEST})
          dispatch({type: POST.TAG_LOADING_REQUEST})
      },[dispatch])

      const onChange=(e)=>{
        setVaule({
          ...form,
          [e.target.name]:e.target.value,
        });
      };


      const  recupload=async(e)=>{
        if (window.confirm("등록 하시겠습니까?")) {
                e.preventDefault();
                if( !form.title||!form.text||!form.recNumber>0||!form.recEndDate||!form.workStartDate||!form.workEndDate)
                {
                  alert("필수 사항을 모두 입력해 주세요!")
                }
                else{
                  if (tagList.length>0) {
                    tagList.map((tagList) => (
                      rendtag.push({tagId:tagList.tagId})
                    ));
                  }  
                
                  const post = {title:form.title,paymentMax:form.payment,text:form.text,recNumber:form.recNumber
                    ,recEndDate:form.recEndDate,workStartDate:form.workStartDate,workEndDate:form.workEndDate,tagList:rendtag}
                   
        
                  dispatch({ //업로드 요청 
                    type: POST.POST_UPLOADING_REQUEST,
                    payload: post,
                  })
                }

        } else {
          e.preventDefault();
        }
      }


  


      return(
        <form onSubmit={recupload}>
        <Container >
          <div className="PostTitle">
          <h2>모집글 등록</h2>
          </div>
          
  
          <div className="PostWarpper">
          <div className="PostContainer">
          <div className="PostSubTitle">
                      <h3>제목을 입력해주세요.
                      <strong className="PostCheck"> *</strong>
                      </h3>
                  </div>

                  <TextField
                    name="title"
                    placeholder="제목을 입력해주세요."
                    variant="outlined"
                    rows={1}
                    fullWidth
                    value={form.title}
                    onChange={onChange}/>
            
  
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
                          value={form.payment}
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
                            dateFormat="yyyy-MM-dd"	
                            className="PostDate"	
                            minDate={new Date()}		
                            closeOnScroll={true}	
                            placeholderText={defaultTime}	
                            selected={form.recEndDate}	
                            onChange={(date) => {setVaule({...form,recEndDate:date})}}	// 날짜를 선택하였을 때 실행될 함수
                            ></DatePicker>  
                </div>
                <div className="PostBottomItem">
                <strong className="PostBottomTitle">업무 시작일 :</strong>
                <DatePicker
                        locale={ko}	
                        dateFormat="yyyy-MM-dd"	
                        className="PostDate"	
                        minDate={form.recEndDate}		
                        closeOnScroll={true}	
                        placeholderText={form.recEndDate?startdefault:defaultTime}	
                        selected={form.workStartDate}	
                        onChange={(date) => {setVaule({...form,workStartDate:date})}}	// 날짜를 선택하였을 때 실행될 함수
                        ></DatePicker> 
                </div>
                
                <div className="PostBottomItem">
                <strong className="PostBottomTitle">업무 마감일 :</strong>
                <DatePicker
                        locale={ko}	
                        dateFormat="yyyy-MM-dd"	
                        className="PostDate"	
                        minDate={form.workStartDate}	
                        closeOnScroll={true}	
                        placeholderText={form.workStartDate?enddefault:defaultTime}	
                        selected={form.workEndDate}	
                        onChange={(date) => {setVaule({...form,workEndDate:date})}}	// 날짜를 선택하였을 때 실행될 함수
                        ></DatePicker> 
                </div>
                </div>
            </div>
    
               {/* 상세내용  */}
                  <div className="PostSubTitle" style={{marginTop:"2.3rem"}}>
                    <h3>상세내용을 입력해주세요.
                    <strong className="PostCheck"> *</strong>
                    </h3>
                </div>
    
                <TextField
                    id="outlined-multiline-static"
                    name="text"
                    multiline
                    rows={12}
                    fullWidth
                    onChange={onChange}
                    value={form.text}
                    variant="outlined"/>
    
    
                <div className="PostSubTitle" style={{marginTop:"3rem"}}>
                    <h3>필요기술 또는 언어가 있나요?
                    </h3>
                </div>
                <div><Tag tags={tags} useTagList={[tagList,setTagList]} /></div>

    
                {/* <div className="PostSubTitle" style={{marginTop:"3rem"}}>
                    <h3>첨부파일이 있으신가요?
                    <small className="PostSubTitleEs">[생략 가능]</small>
                    </h3>
                </div> 
    
                <UploadFile usefileAry={[fileAry,setFileAry]} useFileBase64Ary={[fileBase64Ary, setFileBase64Ary]} /> */}
        
                <div className="PostArea" >
                     <button className="PostBtn"type="submit" >등록</button>
                </div>
              
          </div>
            
                  </div>  
          </Container>
          </form>
      )  



}
export default withRouter(Postform);