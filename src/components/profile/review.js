import React, { Fragment} from 'react'
import "./profileCard.css"
import PermIdentityIcon from '@material-ui/icons/PermIdentity';



const Review=({review})=>{


    const nameMasking=(name)=>{

        const reviewName = name.replace(/(?<=.{1})./, "*");
        return reviewName;
    }


    return(
      <Fragment>
    {
    review.length>0 ?
    review.map((review,index) =>{
        return(
            <Fragment  key={index} >
          
            <div  className="p-detail-review-left-wrap">
            <PermIdentityIcon style={{fontSize:"5em" ,margin:"auto"}}/>
            <div className="p-detail-review-left-tit">{nameMasking(review.reviewWriterName)}</div>
           </div>
              
            <div className="p-detail-review-right-wrap">
                <div className="p-detail-review-right-tit">
                </div>
                <div className="p-detail-review-right-txt">
                {review.review}
                </div>
            </div>
                 
            </Fragment>   
            )
        })
    :
        <div className="p-review-default-wrap">
             <div className="p-review-default-tit">현재 등록된 리뷰가 없습니다.</div>
        </div>
        } 
       

                
    </Fragment>        
     
    )



}


export default Review;
