import React, { useState,useEffect} from 'react'
import {Grid,FormControlLabel,RadioGroup ,Radio } from '@material-ui/core';
import "./profile.css"
import CloseIcon from '@material-ui/icons/Close';
import SearchIcon from '@material-ui/icons/Search';
import { createBrowserHistory } from "history";
import {useDispatch} from "react-redux"
import PROFILE from "../../actions/profileAction"
import {Tooltip } from '@material-ui/core'

const Pfilter=({tags,usePage}) =>{

  const history = createBrowserHistory();
  const dispatch = useDispatch();

  const [tag,setTag]=useState()
  const [input,setInput]=useState(""); 
  const [search,setSearch]=useState("");
  const [tagList,setTagList]=useState([]);
  const [direction,setDirection]=useState("DESC")
  const [page,setPage]=usePage;
  
  useEffect(()=>{
    setTag(tags)
  },[tags])


  useEffect(()=>{

    var parse = history.location.search.substr(1).split('&');
    if (parse === "") return {};
    var parseJson = {};
    for (var i = 0; i < parse.length; ++i) {
        var parseRS = parse[i].split('=', 2);
        if (parseRS.length ===1)
        parseJson[parseRS[0]] = "";
        else
        parseJson[parseRS[0]] = decodeURIComponent(parseRS[1].replace(/\+/g," "));
    }

    var searchRS = parseJson.search; 
    const tag= tagList.join(",")


    if(searchRS){
      setSearch(searchRS);
      setInput(searchRS);
      
        dispatch({
          type: PROFILE.PROFILE_LOADING_REQUEST,
          payload:{pageRequest:{direction: direction,page: page,size:8},tags:tag?tag:null,keyword:searchRS},
          page:page,
        })}

        else{
          dispatch({
            type: PROFILE.PROFILE_LOADING_REQUEST,
            payload: {pageRequest:{direction: direction,page: page,size:8},tags:tag,keyword:search},
            page:page,
          })
    }
    if(page===1) window.scrollTo(0, 0);

    },[dispatch,page,direction,search,tagList, history.location.search])


  const insertParams=(key,value)=>{
  key = encodeURIComponent(key); 
  value = encodeURIComponent(value);

  var kvp = history.location.search.substr(1).split('&');

  if (kvp === '') {
      if(value==="")history.replace()
      history.push("?" + key + '=' + value)
  }

  else {
      var i = kvp.length; var x; while (i--) {
        x = kvp[i].split('=');

        if (x[0] === key) {
            x[1] = value;
            kvp[i] = x.join('=');
            break;
        }
    }


    if (i < 0) { kvp[kvp.length] = [key, value].join('='); }
      var url = kvp.join('&');
      history.push("?"+url)
  }
  }


  const onChange=(e)=>{

    setDirection(e.target.value);
    setPage(1)
  };

   
      const deleteTag=(index)=>{
  
   
        let deletetag = [...tagList]
        deletetag.splice(index, 1)

        let add= [...tagList]
        let addTag=add.splice(index, 1)


        setTag([...tag,{tagName:addTag}])
        setTagList([...deletetag])

        setPage(1)
            
    }

  

      const pushTagList = (Tags,index) =>{
      
        setTagList([...tagList,Tags.tagName])

        let onTag= [...tag]
        onTag.splice(index, 1)
        setTag(onTag)
        setPage(1)
      }


    const SelectedTag=()=>{

        if (Array.isArray(tagList) ) {
            return tagList.map((tagList, index) => {
                return(
                
                  <strong className="p-filter-select-txt" key={index} onClick={()=>deleteTag(index)}>
                    {tagList} 
                  <CloseIcon style={{fontSize:"0.9rem"}}/>
                  </strong>
                 
               )
              });
          }  
    }
   
    const showTag=(tags)=>{

      
        
      if (Array.isArray(tags) ) {
        return tags
        .sort((a, b) => a.tagName > b.tagName ? 1 : -1)
        .map((tags, index) => {
              return(
                <div className="p-tech-txt" onClick={()=>pushTagList(tags,index)}  key={index} >
                          <strong>{tags.tagName}</strong>


                    </div>
            )
            });
        }  
    }


    const onKeypress=(e)=>{
      if(e.key==="Enter")
      {
        onClick();
      }
     }
  
     const onClick=()=>{
        if(input){
          insertParams("search",input)
          setSearch(input)
        }
        else{
          history.replace();
          setSearch(input)
        }
        setPage(1)
     }
  

  return(
    
    <Grid item xs={12} lg={3} >
        <div className="p-filter-wrap" p={2} >
            <Grid item xs={12} >
                <div className="p-filter-search">
                    <Tooltip title="이름,카카오ID,소개글로 검색 가능" placement='right'>
                        <input className="p-search-input"placeholder="Search"
                            value={input}
                            onChange={(e)=>setInput(e.target.value)}
                            onKeyPress={onKeypress}
                            />
                    </Tooltip>   
                    <button id="p-search-btn"  onClick={()=>onClick()}> <SearchIcon/></button>
                </div>      
          </Grid>
        
            
        <div className="p-filter-tit"  >
            <h3 className="p-filter-txt">프로필 필터</h3>
        </div>

        <div className="p-filter-align" >
            <div className="p-filter-align-txt">정렬기준</div>
            <div> 
   
            <RadioGroup style={{flexDirection:"row"}} value={direction} onChange={(e)=>onChange(e)}>
              <FormControlLabel value="DESC" control={<Radio  style={{color:"#2099bb"}} />} label="최신순"/>
              <FormControlLabel value="ASC" control={<Radio style={{color:"#2099bb"}}  />} label="등록순" />
              
           </RadioGroup>
              </div> 
        </div>      


        <div className="p-filter-tech-wrap">

            <div className="p-filter-tech"  >
            {SelectedTag()}
            {showTag(tag)} 
            </div>  
        </div>
         
        </div>
     </Grid>
   
  )
}
export default Pfilter;