import BoardApply from "../components/mypage/boardApply"
import React ,{useEffect,useState,Fragment}from 'react'
import "../components/mypage/boardApply.css"
import { useHistory } from "react-router-dom";
import { IconButton} from '@material-ui/core';
import {useDispatch, useSelector} from "react-redux"
import APPLY from "../actions/applyAction"
import Paginations from "../util/mypagePageNation"
import DefaultPage from "../util/defaultPage"
import Loading from "../util/loading"
import { Container } from 'reactstrap';
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';
import MyMenu from "../components/mypage/mypageMenu"


const BoardApplyPage = (req) =>{

      const [currentPage, setCurrentPage] = useState(1);
      const [postsPerPage] = useState(6);
      const history = useHistory();
      const indexOfLast = currentPage * postsPerPage; 
      const indexOfFirst = indexOfLast - postsPerPage;
      const boardId=Number(req.match.params.id);

      const goBack = () => {
       history.goBack();
      };


      const dispatch = useDispatch();
      const {myboardusers,isContracted,isreview,boarduserloading} = useSelector((state) => state.apply);

      function currentPosts(tmp) {
            let currentPosts = 0;
            currentPosts = tmp.slice(indexOfFirst, indexOfLast);
            return currentPosts;
        }

          
      useEffect(()=>{
            window.scrollTo(0, 0);
            dispatch({
            type: APPLY.APPLY_BOARD_USER_REQUEST,
            payload: req.match.params.id,
            })
      
      },[dispatch,req.match.params.id,isContracted,isreview])

 
      return(
        

            <Fragment>
            <MyMenu/>
            <Container>
                  <div className="mypage-user-top-tit">
                        <IconButton onClick={()=>goBack()}><ArrowBackIosIcon/></IconButton>
                   <strong>지원자 조회</strong>
               </div>
            </Container>
 

            {boarduserloading?<Loading/>:myboardusers.length>0?
             <BoardApply  myboardusers={currentPosts(myboardusers)} boarduserloading={boarduserloading} boardId={boardId} />: 
             <DefaultPage/>
            }
           

            {myboardusers.length>0? <Paginations postsPerPage={postsPerPage} totalPosts={myboardusers.length} current={currentPage} paginate={setCurrentPage}/>:
                 ""}    
            
     </Fragment>

      )


    }

export default BoardApplyPage;
