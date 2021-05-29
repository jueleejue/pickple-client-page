import React ,{useState} from 'react'
import "./myreport.css"
import REPORT from "../../actions/reportAction"
import { Container } from 'reactstrap'
import Reportview from "../report/reportview"
import { Fragment } from 'react'
import { useDispatch, useSelector } from "react-redux";
import DefaultPage from "../../util/defaultPage"

const MyReport=({myreports})=>{

    const dispatch = useDispatch();
    const [open,setOpen]=useState(false);
    const {reportdetails} = useSelector((state) => state.report);


    const reportDetail=(reportId)=>{
        setOpen(true);
        dispatch({
            type: REPORT.REPORT_DETAIL_REQUEST,
            payload: reportId
        })
    }

 
    



    return(
        <div className="mypage-report-container">
        <Container>
            <div className="mypage-report-content-container">
            
                {  Array.isArray(myreports) ? myreports.map((myreports,index)=>{
                        return(
                        <Fragment key={index}>
                               <div className="mypage-report-content-wrap">
                               <div className="mypage-report-content-tit-wrap"> 
                               {myreports.reportState==="BEFORE"?
                                <div className="mypage-report-content-tit">처리 전</div>:
                                <div className="mypage-report-content-tit">처리 완료</div>
                                }
                                  
                               </div>

                               <div className="mypage-report-content-body">
                                  <div className="mypage-report-content-txt">{myreports.reportText}</div> 
                               </div>

                               {myreports.boardIsDeleted?
                               <div className="mypage-report-bottom-wrap">
                                     <div className="mypage-report-board-deleted">* 삭제된 게시물 입니다.</div>
                                </div>
                               
                               :
                                <div className="mypage-report-bottom-wrap">
                                    <div className="mypage-report-bottom-detail" onClick={()=>reportDetail(myreports.reportId)}>상세보기</div>
                                    <a  href={`/board/${myreports.boardId}`} >
                                    <button className="mypage-report-bottom-next" >바로가기</button>
                                    </a>
                                </div>
                               }
                              
                           </div>
                        </Fragment>
                           )
                     }):<DefaultPage/> }  

                    <Reportview useOpen={[open, setOpen]} reportdetails={reportdetails} />
                  
                </div>
        </Container>
        </div>
 
    );

}


export default MyReport;
