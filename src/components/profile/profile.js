import React, { useState, useEffect,Fragment }from 'react'
import {useDispatch, useSelector} from "react-redux"
import { withRouter } from 'react-router-dom';
import POST from "../../actions/postAction"
import {Container} from 'reactstrap'
import ProfileCard from "./profileCard.js"
import Filter from "./Pfilter"
import {Grid,Box } from '@material-ui/core';
import "./profile.css"
import Loading from "../../util/loading"
import DefaultPage from "../../util/defaultPage"

const Profile=() =>{

   const dispatch = useDispatch();
   const {tags} = useSelector((state) => state.post);
   const {profiles,profileloading,lastpage} = useSelector((state) => state.profile);
   const [page,setPage]=useState(1);
  



    useEffect(()=>{
      dispatch({type: POST.TAG_LOADING_REQUEST})
      },[dispatch])

      const showMore = () => {
        setPage(page+1)
    }
  



  return(
  <Fragment>
    <div className="profile-container">
  <Container  className="sub-container">
    
    <Grid item xs={12} className="profile-tit">
      <h1>프로필</h1>
      </Grid>

      <Grid container className="profile-wrap" >
      <Filter tags={tags} usePage={[page,setPage]}/>
      <Grid item xs={12} lg={9} >
    
        <Box style={{backgroundColor:"#fff",height:"100%"}}> 
        {profiles.length>0 ? <ProfileCard profiles={profiles} />:
        profileloading?<Loading/>:<DefaultPage/>}
        </Box>
      </Grid>
  </Grid>

 </Container>

      <div className="profileNextView">

      {
         profiles.length!==0?
         profiles.length%8?
          <div className="board-next-default">더 이상 포스터가 없습니다.</div>:
          lastpage?<div className="board-next-default">포스터가 존재하지 않습니다.</div>:
          <button className="board-btn" onClick={()=>showMore()}>
            +더보기
          </button>
          :<div className="board-next-default">포스터가 존재하지 않습니다.</div>
          }

          
        </div>
    
     </div>  
</Fragment> 
   
  )
}
export default withRouter(Profile);
