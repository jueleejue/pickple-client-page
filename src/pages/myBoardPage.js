import React ,{useEffect,useState,Fragment}from 'react'
import MyBoard from "../components/mypage/myBoard"
import {useDispatch, useSelector} from "react-redux"
import MYPAGE from "../actions/myPageAction"
import Paginations from "../util/mypagePageNation"
import DefaultPage from "../util/defaultPage"
import Loading from "../util/loading"
import { Container } from 'reactstrap';
import MyMenu from "../components/mypage/mypageMenu"

const MyBoardPage = () =>{
 
      const [currentPage, setCurrentPage] = useState(1);
      const [postsPerPage] = useState(6);

      const indexOfLast = currentPage * postsPerPage; 
      const indexOfFirst = indexOfLast - postsPerPage;


      const dispatch = useDispatch();
      const {myboards,boardloading} = useSelector((state) => state.mypage);

      function currentPosts(tmp) {
            let currentPosts = 0;
            currentPosts = tmp.slice(indexOfFirst, indexOfLast);
            return currentPosts;
        }
   
  
  
      useEffect(()=>{
          dispatch({type: MYPAGE.MYPAGE_BOARD_REQUEST})
          window.scrollTo(0,0);
          },[dispatch])

      return(
       <Fragment>
           <MyMenu/>
           <Container>
             <div className="mypage-board-top-tit">
                    <strong>모집 현황</strong>
                </div>
           </Container>
            {myboards.length>0? <MyBoard  myboards={currentPosts(myboards)} />:
                  boardloading?<Loading/>:<DefaultPage/>}

            {myboards.length>0? <Paginations postsPerPage={postsPerPage} totalPosts={myboards.length} current={currentPage} paginate={setCurrentPage}/>:
                 ""}    
            
     </Fragment>
     )


    }

export default MyBoardPage;
