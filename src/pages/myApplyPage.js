import MyApply from "../components/mypage/myApply"
import React ,{useEffect,useState,Fragment}from 'react'
import {useDispatch, useSelector} from "react-redux"
import MYPAGE from "../actions/myPageAction"
import Paginations from "../util/mypagePageNation"
import DefaultPage from "../util/defaultPage"
import Loading from "../util/loading"
import { Container } from 'reactstrap';
import {profileProgress} from "../util/category"
import MyMenu from "../components/mypage/mypageMenu"

const MyApplyPage = () =>{

      const [currentPage, setCurrentPage] = useState(1);
      const [postsPerPage] = useState(6);

      const indexOfLast = currentPage * postsPerPage; 
      const indexOfFirst = indexOfLast - postsPerPage;


      const dispatch = useDispatch();
      const {myapplys,applyloading} = useSelector((state) => state.mypage);
      const {isapplydelete} = useSelector((state) => state.apply);

      function currentPosts(tmp) {
            let currentPosts = 0;
            currentPosts = tmp.slice(indexOfFirst, indexOfLast);
            return currentPosts;
        }
   
  
  
      useEffect(()=>{
          window.scrollTo(0, 0);
          dispatch({type: MYPAGE.MYPAGE_APPLY_REQUEST})
          },[dispatch,isapplydelete])
 
      return(
            <Fragment>
            <MyMenu/>
            <Container>
                 <div className="mypage-apply-top-tit">
            
                <strong>지원 현황</strong>
                </div>
                <div className="mypage-apply-top-sub-tit">
                    <strong>* 아래는 픽플 모집글 지원에 대한 프로세스입니다.</strong>
                </div>
                <div className="mypage-apply-bottom-container">
                <div className="mypage-apply-mid-wrap">
                <ul>
                    { profileProgress.progress.map((profileProgress,index)=>{
                        return(
                          
                              <li key={index}>
                                  <img  src={profileProgress.img} alt="img" style={{width:"2.3rem"}} />
                                  <div className="mypage-apply-mid-tit">{profileProgress.name}</div>
                              </li>)
                            }) }  
                     </ul> 
                </div>
                </div>
            </Container>
            {myapplys.length>0? <MyApply  myapplys={currentPosts(myapplys)} applyloading={applyloading}/>:
                  applyloading?<Loading/>:<DefaultPage/>}

            {myapplys.length>0? <Paginations postsPerPage={postsPerPage} totalPosts={myapplys.length} current={currentPage} paginate={setCurrentPage}/>:
                 ""}    
            
             </Fragment>
      )


    }

export default MyApplyPage;
