import React, { Fragment } from 'react'
import "./postcard.css"
import moment from 'moment';
import { Link } from "react-router-dom";



const PostCard=({post})=>{

  
  const RecDateVaild=(recEndDate)=>{

    const nowDate=new Date();

    if(new Date()<=moment(recEndDate).toDate()){
      return(
        <span className="recruiting-mark">모집 중</span>
      )
    }
    else if(nowDate.getDate()===(moment(recEndDate).toDate()).getDate())
    {
      return(
        <span className="recruiting-mark">모집 중</span>
      )
    }
    else return(
      <span className="recruiting-mark" style={{backgroundColor:"#636161"}}>모집 마감</span>
    )
  }

    return(
        <Fragment>
            {
              
                Array.isArray(post) ? post.map((post) =>{
                    return(
                        
                      <div key={post.boardId} className="col p-2 CardContainer">
                          
                      <Link to={`/board/${post.boardId}`} className="text-dark text-decoration-none">  

                            <div  style={{boxShadow:"none"}}>
                            <div className="CardWarpper">
                              
                                <span className="recruiting-mark-status"> {RecDateVaild(post.recEndDate)}</span>

                                <div className="CardHeader">
                                  <span className="CardTitle">{post.title}</span>
                                </div>
                                

                                <div className="ThumTop">
                                    <div className="ThumItem 01">
                                        <span>모집 인원</span>
                                        <strong className="color">{post.recNumber}명</strong>
                                    </div>
                                    <div className="ThumItem 02">
                                        <span>지급액</span>
                                        <strong >{post.paymentMax}원</strong>
                                    </div>
                                    <div className="ThumItem 03">
                                       <span>마감일</span>
                                       <strong>{moment(post.recEndDate).format('YYYY-MM-DD')}</strong>
                                    
                                    </div>

                                 </div>
           
                            <div className="ThumBottom">
                                <div className="ThumContentsWrap">
                                  <div className="ThumContents">
                                    <strong>{post.text}</strong>
                                  </div>
                                </div>
                                <div className="ThumBottomEtc" >
                                <div className="ThumTech">
                                    {
                                    Array.isArray(post.recruitmentBoardTagList) ? post.recruitmentBoardTagList.map(({tagId,tagName}) =>{
                                        return(
                                                <div className="ThumTechTxt" key={tagId} >
                                                    <strong>{tagName}</strong>
                                                </div>
                                            )
                                        }) :
                                        ""} 
                                    
                                    </div>
                                  <div className="ThumBottomDate">등록일:{moment(post.recStartDate).format('YYYY-MM-DD')}</div>
                                </div>

                                
                            </div>

                            </div>
                          </div> 
                        </Link>
                        </div>
                    )
                }) :
              ""
            }
        </Fragment>
    )



}


export default PostCard;
