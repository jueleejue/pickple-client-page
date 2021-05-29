import React from 'react';
import{Container,IconButton}  from '@material-ui/core';
import AnnouncementIcon from '@material-ui/icons/Announcement';
import "./defaultPage.css"

const DefaultPage=()=>{
    return(
        <Container>
            <div className="dafault-container">
                <div className="default-wrap">

                <IconButton>
                    <AnnouncementIcon/>
                </IconButton>
                <div className="default-tit">현재 등록된 글이 없습니다.</div>

                </div>
            </div>


        
        </Container>
    
      
  
    ); 
}


export default DefaultPage;