import MyReport from "../components/mypage/myreport"
import React ,{useEffect,useState,Fragment}from 'react'
import {useDispatch, useSelector} from "react-redux"
import MYPAGE from "../actions/myPageAction"
import Paginations from "../util/mypagePageNation"
import DefaultPage from "../util/defaultPage"
import Loading from "../util/loading"
import { Container } from 'reactstrap';
import MyMenu from "../components/mypage/mypageMenu"


const MyReportPage = () =>{
 
      const [currentPage, setCurrentPage] = useState(1);
      const [postsPerPage] = useState(6);


      const indexOfLast = currentPage * postsPerPage; 
      const indexOfFirst = indexOfLast - postsPerPage;

      const dispatch = useDispatch();
      const {myreports,reportloading} = useSelector((state) => state.mypage);

      function currentPosts(tmp) {
            let currentPosts = 0;
            currentPosts = tmp.slice(indexOfFirst, indexOfLast);
            return currentPosts;
        }

        useEffect(()=>{
            window.scrollTo(0, 0);
            dispatch({type: MYPAGE.MYPAGE_REPORT_REQUEST})
          },[dispatch])

   

      return(
      <Fragment>
            <MyMenu/>
            <Container>
            <div className="mypage-report-top-tit">
                <strong>신고 현황</strong>
            </div>
            </Container>
            {myreports.length>0? <MyReport  myreports={currentPosts(myreports)} reportloading={reportloading}/>:
                  reportloading?<Loading/>:<DefaultPage/>}

            {myreports.length>0? 
            <Paginations postsPerPage={postsPerPage} totalPosts={myreports.length} current={currentPage} paginate={setCurrentPage}/>:
                 ""}    
            
     </Fragment>
      )


    }

export default MyReportPage;
