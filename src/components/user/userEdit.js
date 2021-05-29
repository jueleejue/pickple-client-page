import React, { useState,useEffect} from 'react'
import "./userEdit.css"
import {Dialog,IconButton} from '@material-ui/core';
import CloseIcon from '@material-ui/icons/Close';
import { Fragment } from 'react';
import {useDispatch} from "react-redux"
import USER from "../../actions/userAction"
import {UseConfirm} from "../../util/confirm"
import SupervisedUserCircleIcon from '@material-ui/icons/SupervisedUserCircle';


const UserEdit=({useOpen,users})=>{

    const dispatch = useDispatch();

    const [open,setOpen]=useOpen;
    const [form,setVaule]=useState({newEmail:"",newStudentId:""})

    useEffect(()=>{
      
          if(users.studentId===undefined)
          {
            setVaule({
              newEmail:users.email,
              newStudentId:"",
            })
            }else{
              setVaule({
                newEmail:users.email,
                newStudentId:users.studentId,
              })
          }
      },[users.email,users.studentId])


    const handleClose=()=>{
        setOpen(false);
      }

    const checkEmail = (email) => {
        var regExp = /^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*.[a-zA-Z]{2,3}$/i;
        if (email.match(regExp) != null) {
          return true;
        }
        else {
          return false;
        }
     }


    const onChange=(e)=>{

        setVaule({
          ...form,
          [e.target.name]:e.target.value,
        });
      };
 
      const uploadConfirm = () => {userEdit()}
      const cancelConfirm = () => {setOpen(false)}
    
      const  lengthLimit=(e)=>{

        if(e.target.value.length >20){
          e.target.value = e.target.value.slice(0, 20)
      }
       
    }

      const ConfirmEdit= UseConfirm(
        "수정하시겠습니까?",
        uploadConfirm,
        cancelConfirm
      );
    
        const userEdit=()=>{
        
          const newuser={newEmail:form.newEmail,newStudentId:form.newStudentId,
            accountType:users.accountType,accountId:users.accountId}
    
        if(!checkEmail(form.newEmail)){
          alert("잘못된 이메일 형식입니다.")
        }
        else if(form.newStudentId.length<8){
          alert("학번은 최소 8글자 이상입니다.")
        }
        
        else{
            dispatch({ 
              type: USER.USER_EDIT_REQUEST,
              payload: newuser,
            })
          setOpen(false)
        }
          
          }

    return(
        <Fragment>
  
        <Dialog fullWidth open={open}  onClose={handleClose} >
          <div className="user-edit-tit-wrap">
          <div className="user-edit-tit" >
              <strong>사용자 정보 수정  </strong>
              </div>
              <IconButton onClick={()=>setOpen(false)}>   
              <CloseIcon style={{fontSize:"2rem",float:"right"}}/></IconButton>
          </div>
                <div className="user-edit-content">
                    <div className="user-edit-content-sub">
                    
                    <div className="user-edit-content-item">
                    <SupervisedUserCircleIcon style={{fontSize:80 ,color:"#00a878"}}/>
                        </div>

                        <div className="user-edit-content-item">
                            <strong>이름 :</strong>
                            <input className="user-edit-content-read"
                            readOnly
                            value={users.name}/>
                        </div>


                        <div className="user-edit-content-item">
                            <strong>이메일 :</strong>
                            <input className="user-edit-content-input"
                            name="newEmail"
                            type="email"
                            onChange={onChange}
                            value={form.newEmail}/>
                        </div>

                        <div className="user-edit-content-item">
                            <strong>학번 :</strong>
                            <input className="user-edit-content-input"
                            name="newStudentId"
                            type="number"
                            maxLength='8'
                            onChange={onChange}
                            onInput={lengthLimit}
                            value={form.newStudentId}/>
                        </div>


                    </div>
                </div>

          <div className="btn-user-edit-area">
    
             <button className="btn-user-edit"onClick={()=>setOpen(false)}  >
              취소
            </button>
            <button className="btn-user-edit"onClick={()=>ConfirmEdit()}  >
              수정
            </button>
          </div >

        </Dialog>
   </Fragment> 
    );

}


export default UserEdit;