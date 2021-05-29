import "./tag.css"
import { withRouter} from "react-router-dom";
import React, { useState,useEffect, Fragment} from 'react'
import {Tooltip } from '@material-ui/core'
import CloseIcon from '@material-ui/icons/Close';

const Tag=(props) =>{


    const tags=props.tags;
    const [tagList,setTagList]=props.useTagList;
    const [tagKey,setTagKey]=useState("")

    useEffect(()=>{    
    },[tagList])


    const deleteTag=(index)=>{
    
        let deletetag = [...tagList]
        deletetag.splice(index, 1)
        setTagList([...deletetag])

    }

   
    const showTag=()=>{
    
        if (Array.isArray(tagList) ) {
            return tagList
            .sort((a, b) => a.tagName > b.tagName ? 1 : -1)
            .map((tagList, index) => {
                return(
                    <Fragment key={index}>
                    <strong className="tag-item-text" onClick={()=>deleteTag(index)}>{tagList.tagName} 
                    <CloseIcon style={{fontSize:"1rem"}}/>
                    </strong>
                    </Fragment>
               )
              });
          }  
    }

    const selecttagList = (tags) =>{

        let ischeck=true;
        if(tagList.length===0)
        {
            tagList.push(tags);
            setTagKey("");
        }
        else{ 
            for(let j = 0; j < tagList.length; j++) {
                if(tags.tagId === tagList[j].tagId) {
                ischeck=false
                break;
                }
            }
            if(ischeck) {
                tagList.push(tags);
                setTagKey("");
            }
            else{return;}
        }
    }



   const mapTag = (tags) => {
    tags = tags.filter( (tags) => { 
            return tags.tagName.toLowerCase().indexOf(tagKey.toLowerCase()) > -1;
        } )
        if (tagKey !== '') {
          return tags
          .sort((a, b) => a.tagName > b.tagName ? 1 : -1)
          .map((tags, i) => {
            return (
                    <Fragment key={i}>
                     <Tooltip title="클릭시 태그 추가" placement='left'>
                         <strong className="tag-content-text" onClick={()=>selecttagList(tags)}>{tags.tagName} </strong>
                        </Tooltip>
                        <br/>
                    </Fragment>
               );
            });
        } 
}


      return(
       <div>
            <div className="tag-input-wrap">
                  <input type="search"
                    className="tag-input"
                    placeholder="태그입력"
                    onChange={(e) => setTagKey(e.target.value)}/>
            </div>

             <div className="tag-content-wrap">
                {mapTag(tags)} 
            </div>

            <div className="tag-item-wrap">
                {showTag()}
           </div>
       </div>
      )  



}
export default withRouter(Tag);