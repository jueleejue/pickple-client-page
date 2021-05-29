import MyBookMark from "../components/mypage/myBookMark"
import React ,{useEffect,useState,Fragment}from 'react'
import {useDispatch, useSelector} from "react-redux"
import MYPAGE from "../actions/myPageAction"
import Paginations from "../util/mypagePageNation"
import DefaultPage from "../util/defaultPage"
import Loading from "../util/loading"
import { Container } from 'reactstrap';
import MyMenu from "../components/mypage/mypageMenu"


const MyBookMarkPage = () =>{

      const [currentPage, setCurrentPage] = useState(1);
      const [postsPerPage] = useState(6);
    

      const indexOfLast = currentPage * postsPerPage; 
      const indexOfFirst = indexOfLast - postsPerPage;


      const dispatch = useDispatch();
      const {mybookmarks,bookloading} = useSelector((state) => state.mypage);

      function currentPosts(tmp) {
            let currentPosts = 0;
            currentPosts = tmp.slice(indexOfFirst, indexOfLast);
            return currentPosts;
        }
   
  
  
      useEffect(()=>{
          window.scrollTo(0, 0);
          dispatch({type: MYPAGE.MYPAGE_BOOKMARK_REQUEST})
  
          },[dispatch])

      return(
      <Fragment>
            <MyMenu/>
            <Container>
                  <div className="mypage-bookmark-top-tit">
                  <strong>북마크 현황</strong>
                  </div>
            </Container>
            {mybookmarks.length>0? <MyBookMark  mybookmarks={currentPosts(mybookmarks)} />:
                  bookloading?<Loading/>:<DefaultPage/>}

            {mybookmarks.length>0? <Paginations postsPerPage={postsPerPage} totalPosts={mybookmarks.length} current={currentPage} paginate={setCurrentPage}/>:
                 ""}    
            
     </Fragment>)


    }

export default MyBookMarkPage;
