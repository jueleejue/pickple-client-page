import React from 'react';
import{CircularProgress,Container}  from '@material-ui/core';

export default function CircularUnderLoad() {
  return(
      <Container>
        <div className="p-5" style={{display:"flex",justifyContent:"center"}}> 
         <CircularProgress disableShrink />
      </div>
      </Container>
    

  ); 
  
}