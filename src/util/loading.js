import React from 'react';
import "./loading.css"
import { Spinner } from 'reactstrap';


const loadginPage=()=>{
    return(
        <div className="loading-wrap">
         <div className="loading-item">
                <Spinner style={{maring:"0.5rem"}} type="grow" color="primary" />
                <Spinner style={{maring:"0.5rem"}} type="grow" color="secondary" />
                <Spinner style={{maring:"0.5rem"}} type="grow" color="success" />
                <Spinner style={{maring:"0.5rem"}} type="grow" color="danger" />
                <Spinner style={{maring:"0.5rem"}} type="grow" color="warning" />
             
         </div>
      </div>

    ); 
}


export default loadginPage;