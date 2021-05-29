// import React, { useEffect } from 'react'
// import "./post.css"



// const UploadFile=(props) =>{


//     useEffect(()=>{
//     },[])

   
//     const hiddenFileInput = React.useRef(null)
//     const [fileAry, setFileAry] = props.usefileAry
//     const [fileBase64Ary, setFileBase64Ary] = props.useFileBase64Ary
    
    
//     const handleClick = (event) => {
//          hiddenFileInput.current.click();
//          event.preventDefault();
//     }
    

//     const inputFile = (e) => {
       
//         var file=e.target.files[0];
//         var name = file.name;
//         var lastDot = name.lastIndexOf('.');
//         //var fileName=name.substring(0, lastDot);
//         var fileExt=name.substring(lastDot+1,name.length);
//         var fileSize=file.size;
//         var fsMB=(fileSize/(1024*1024)).toFixed(2);

//         const files = Array.from(e.target.files)
//         if (!files)
//             return
//             setFileAry([...fileAry, ...files])

//         files.forEach(file => {
//             var reader = new FileReader()
//             reader.readAsDataURL(file)
//             reader.onloadend = () => {
//                 const base64 = reader.result
//                 if(base64){
//                     let arr = fileBase64Ary
//                     var file = new Object();
//                     file.data=base64.toString()
//                     file.name=name
//                     file.size=fsMB+"MB"
//                     file.ext=fileExt;
//                     arr.push(file)
//                     setFileBase64Ary([...arr])
//                 }
//             }
//         })
//     }

//   return(
//       <div>
//                     <div className="rec-file-container">
//                     <div className="rec-file-wrapper-left">
//                         <button className="rec-file-button"
//                         onClick={(e)=>handleClick(e)}>

//                             <input type="file" multiple
//                             title="파일 첨부하기"
//                             name='inputfile'
//                             ref={hiddenFileInput}
//                             onChange={inputFile}
//                             style={{display: 'none'}}
//                             />
//                             <li>파일<br/>첨부하기</li>
//                             </button>
//                     </div>   
//                     <div className="rec-file-wrapper-right">
//                                 {fileBase64Ary.map((file, idx) => {
//                                     if(typeof(file) === 'string' && file !== '')
//                                             return (
                                                        
//                                             <div key={idx} in={true}>
//                                                 <div>{file}</div>
//                                             </div>
                                        
//                                             )
//                             else return null
//                         })}
//                     </div> 
//                 </div>
//              </div>
//   )
// }
// export default UploadFile;

//    {/* <div onClick={()=> deleteImg(idx)} style={imageBoxStyle} > */}
//                         {/* <img src={image} alt="미리보기" style={imageStyle}/> */}
                     
//                         {/* </div> */}
