import React, {  useEffect,useState,Fragment }from 'react'
import {useDispatch, useSelector} from "react-redux"
import { withRouter } from 'react-router-dom';
import POST from "../../actions/postAction"
import {Container} from 'reactstrap'
import PostCard from "./postcard"
import Filter from "./filter"
import {Grid,Box } from '@material-ui/core';
import "./board.css"
import Loading from "../../util/loading"
import DefaultPage from "../../util/defaultPage"


const Board=() =>{

  const dispatch = useDispatch();
  const {post,lastpage,boardloading} = useSelector((state) => state.post);
  const {tags} = useSelector((state) => state.post);
  const [page,setPage]=useState(1);


    useEffect(()=>{
      dispatch({type: POST.TAG_LOADING_REQUEST})
      },[dispatch])


    const showMore = () => {
      setPage(page+1)
  }




  return(
  <Fragment>
    <div className="BoardContainer">

  <Container  className="BoardSubContainer">
    
    <Grid item xs={12} className="BoardTitle">
      <h1>모집글</h1>
      </Grid>

      <Grid container className="BoardWapper" >
    
        <Filter tags={tags} usePage={[page,setPage]}  />
    
      <Grid item xs={12} lg={9} >
      
        <Box   style={{backgroundColor:"#fff",height:"100%"}}> 
        {post.length>0? <PostCard post={post}  />:
        boardloading?<Loading/>:<DefaultPage/>}
        </Box>
      </Grid>
     
      </Grid>
  </Container>
      
        <div className="boardNextView">
        {
         post.length!==0?
          post.length%8?
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
export default withRouter(Board);