import React from 'react';
import { useEffect,useState} from 'react';
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';
import ArrowForwardIosIcon from '@material-ui/icons/ArrowForwardIos';
import "./pageNation.css"

const Paginations = ({postsPerPage, totalPosts, paginate,current}) => {
  const [pageNumbers] = useState([]);
  const [page, setPage] = useState(1);

  
  useEffect(() => {
    for (let i = 1; i <= Math.ceil(totalPosts / postsPerPage); i++) pageNumbers.push(i);
    setPage(pageNumbers.slice(-1)[0])

  }, [totalPosts,postsPerPage,pageNumbers]);




  const handlebefor=()=>{
    if(current>1) {paginate(current-1)}
    else{return;}
  }
  const handleafter=()=>{
    if(current<page) {paginate(current+1)}
    else{return;}
  }


  return (
    <div className="pagenation-wrap">
      <ArrowBackIosIcon fontSize="small" onClick={()=>handlebefor()}/>
      {current} / {page}
      <ArrowForwardIosIcon fontSize="small" onClick={()=>handleafter()}/>

  </div>
  );
};

export default Paginations;


