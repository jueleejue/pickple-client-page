import "./profileform.css"
import { withRouter} from "react-router-dom";
import React, { useState,useEffect} from 'react'
import { Container } from 'reactstrap';
import { TextField,IconButton} from '@material-ui/core';
import { useDispatch, useSelector } from "react-redux";
import Tag from "./tag.js";
import PROFILE from "../../actions/profileAction"
import POST from "../../actions/postAction"
import CheckBoxOutlineBlankIcon from '@material-ui/icons/CheckBoxOutlineBlank';
import CheckBoxIcon from '@material-ui/icons/CheckBox';


const Profileform=() =>{
  

    const dispatch = useDispatch();
     const {tags} = useSelector((state) => state.post);
     const [form,setVaule]=useState({kakaoId:"",workEmail:"",blog:"",introduce:"",isOpen:0})
     const [tagList,setTagList]=useState([])

    useEffect(()=>{
        dispatch({type: POST.TAG_LOADING_REQUEST})
      },[dispatch])


      
      const onChange=(e)=>{
        setVaule({
          ...form,
          [e.target.name]:e.target.value,
        });
      };


   

      const onSubmit=async(e)=>{


        if (window.confirm("등록 하시겠습니까?")) {
            e.preventDefault();
            if(!form.introduce||!form.workEmail||!form.kakaoId) {alert("필수 사항을 입력해주세요.")}
            else{
           
              const profile = {kakaoId:form.kakaoId,
              workEmail:form.workEmail,introduce:form.introduce,
              blog:form.blog===""?null:form.blog,tagList:tagList,isOpen:form.isOpen};
  
              dispatch({ 
                type: PROFILE.PROFILE_UPLOADING_REQUEST,
                payload: profile,
              })
            }
                
        } else {
          e.preventDefault();
        }         
       }

 
    


      return(
        <form onSubmit={onSubmit}>
        <Container>
      
          <div className="p-post-wrap">
              <div className="p-post-sub-wrap">
              <div className="p-post-tit">
                <h2>프로필 등록</h2>
              </div>
  
                  <div className="p-post-sub-tit" style={{marginTop:"2.3rem"}}>
                          <h3>연락 수단을 입력해주세요.
                        
                        </h3>
                    </div>
                    <div className="p-post-contact">
                        <div className="p-post-contact-item">
                            <strong>카톡ID :</strong>
                            <input className="p-post-contact-input"
                              name="kakaoId"
                            onChange={onChange}
                            value={form.kakaoId}/>
                            
                        </div>
                        <div className="p-post-contact-item">
                            <strong>이메일 :</strong>
                            <input 
                            className="p-post-contact-input"
                            name="workEmail"
                            type="email"
                            onChange={onChange}
                            value={form.workEmail}>
                                
                            </input>
                          
                        </div>
            
                        <div className="p-post-contact-item">
                            <strong>블로그 :</strong>
                            <input
                            className="p-post-contact-input"
                            name="blog"
                            onChange={onChange}
                            value={form.blog}/>
                            
                        </div>


                    </div>
                  
    
                      <div className="p-post-sub-tit" style={{marginTop:"2.3rem"}}>
                        <h3>자기소개를 입력해주세요.
                        <strong style={{fontSize:"13px",color:"#b6b7b9"}}> [최대 500]</strong>
                        <small className="p-post-sub-tit-es"> *</small>
                        </h3>
                      
                    </div>
    


                    <TextField
                        id="outlined-multiline-static"
                        name="introduce"
                        multiline
                        rows={8}
                        fullWidth
                        inputProps={{
                          maxLength: 500,
                        }}
                        onChange={onChange}
                        value={form.introduce}
                        variant="outlined"/>
               

                      <div className="p-post-sub-tit" style={{marginTop:"3rem"}}>
                          <h3>보유한 기술 스택이 있나요?
                          </h3>
                      </div>
                      <div><Tag tags={tags} useTagList={[tagList,setTagList]} /></div>

                      <div className="p-post-isopen">
                        <strong>해당 프로필을 공개 하시겠습니까?</strong>
             

                      {form.isOpen!==0 ?
                      <IconButton onClick={() =>  setVaule({...form,isOpen:0})} ><CheckBoxIcon style={{fontSize:"30px"}}/></IconButton>
                      :
                      <IconButton onClick={() =>  setVaule({...form,isOpen:1})}> <CheckBoxOutlineBlankIcon style={{fontSize:"30px"}}/></IconButton>}
                    
                  </div>
    
                <div className="p-post-area" >
                     <button className="p-post-btn"type="submit" >등록</button>
                </div>
              </div>
             
                  </div>  
          </Container>
          </form>
      )  



}
export default withRouter(Profileform);