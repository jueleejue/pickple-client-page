import axios from "axios"
import POST from '../../actions/postAction';
import { call, put, takeEvery, all, fork} from "redux-saga/effects";
import { push } from "connected-react-router";



        const loadPostAPI = (payload) =>{
            
            const config = {
                headers: {
                "Content-Type": "application/json",
                },
            };
            return axios.post("/api/v1/recboard/filter",payload,config);
        }

        function* loadPosts (action){
            try {
            const result =  yield call(loadPostAPI,action.payload)

            yield put({
                type:POST.POST_LOADING_SUCCESS,
                payload:result.data,
                page:action.page,
            })
            } catch (e) {
                yield put({
                    type:POST.POST_LOADING_FAILURE,
                    payload: e,
                });
            }
            }


            
    

        const loadDetailPostAPI = (payload) =>{

            const config = {
                headers: {
                "Content-Type": "application/json",
                "X-AUTH-TOKEN":localStorage.getItem("token"),
                },
            };
            return axios.get(`/api/v1/recboard/${payload}`,config);

        }

        function* loadDetailPosts (action){
            try {
            const result =  yield call(loadDetailPostAPI,action.payload);

            yield put({
                type:POST.POST_DETAIL_LOADING_SUCCESS,
                payload:result.data
            })
            } catch (e) {
                if(e.response.status===403) 
                {
                    localStorage.removeItem("token");
                    yield put(push("/"));
                } 
                yield put({
                    type:POST.POST_DETAIL_LOADING_FAILURE,
                    payload:e,
                });
                

            }
            }

        

        const uploadPostAPI = (payload) =>{
            const config = {
                headers: {
                "Content-Type": "application/json",
                "X-AUTH-TOKEN":localStorage.getItem("token"),
                },
            };

            return axios.post("/api/v1/recboard",payload,config);
        
        }

        function* uploadPosts (action){
            try {
        
            const result =  yield call(uploadPostAPI,action.payload)

            yield put({
                type:POST.POST_UPLOADING_SUCCESS,
                payload:result.data
            })
            alert("업로드 성공")
            yield put(push("/board"));
            } catch (e) {
                if(e.response.status===403) 
                {
                    localStorage.removeItem("token");
                    yield put(push("/"));
                } 
                yield put({
                    type:  POST.POST_UPLOADING_FAILURE,
                    payload: e,
                });
                
            alert("업로드 실패")
                
            }
            }



         
        const editPostAPI = (payload) =>{
            const config = {
                headers: {
                "Content-Type": "application/json",
                "X-AUTH-TOKEN":localStorage.getItem("token"),
                },
            };

            return axios.put("/api/v1/recboard",payload,config);
        
        }

        function* editPosts (action){
            try {
            const result =  yield call(editPostAPI,action.payload)
            yield put({
                type:POST.POST_EDIT_SUCCESS,
                payload:result.data
            })
            alert("모집글이 수정되었습니다.")
            yield put(push(`/board/${action.payload.boardId}`)); 
            } catch (e) {
                if(e.response.status===403) 
                {
                    localStorage.removeItem("token");
                    yield put(push("/board"));
                } 
                yield put({
                    type:  POST.POST_EDIT_FAILURE,
                    payload: e,
                });
            alert("모집글 수정을 실패했습니다.")
            yield put(push(`/board/${action.payload.boardId}`)); 
                
            }
            }

       
        const deletePostAPI = (payload) =>{
            const config = {
                headers: {
                "Content-Type": "application/json",
                "X-AUTH-TOKEN":localStorage.getItem("token"),
                },
            };
            return axios.delete(`/api/v1/recboard/${payload}`,config);
        
        }

        function* deletePosts (action){
            try {
            const result =  yield call(deletePostAPI,action.payload)
            yield put({
                type:POST.POST_DELETE_SUCCESS,
                payload:result.data
            })
            alert("삭제를 성공했습니다.")
            yield put(push("/board"));
            } catch (e) {
                if(e.response.status===403) 
                {
                    localStorage.removeItem("token");
                    yield put(push("/board"));
                } 
                yield put({
                    type:  POST.POST_DELETE_FAILURE,
                    payload: e,
                });
            alert("삭제를 실패했습니다.")
                
            }
            }

 
        
        const tagLoadPostAPI = () =>{

            return axios.get("/api/v1/tag");
        }

        function* tagLoadPosts (){
            try {
            const result =  yield call(tagLoadPostAPI)

            yield put({
                type:POST.TAG_LOADING_SUCCESS,
                payload:result.data
            })
            } catch (e) {
                yield put({
                    type:  POST.TAG_LOADING_FAILURE,
                    payload: e,
                });

            }
            }
        
    

      
   

    const uploadBookAPI = (payload) =>{

        const config = {
            headers: {
              "Content-Type": "application/json",
              "X-AUTH-TOKEN":localStorage.getItem("token"),
            },
          };
          
        return axios.post("/api/v1/bookmark",payload,config);
    
    }

    function* uploadBook (action){
        try {
        const result =  yield call(uploadBookAPI,action.payload)
        yield put({
            type:POST.BOOKMARK_UPLOADING_SUCCESS,
            payload:result.data
        })
        alert("북마크 등록!")
        } catch (e) {
            if(e.response.status===403) 
            {
                localStorage.removeItem("token");
                yield put(push("/board"));
            } 
            yield put({
                type:  POST.BOOKMARK_UPLOADING_FAILURE,
                payload: e,
              });
   
        }
        }
    

    

    const deleteBookAPI = (payload) =>{

        const config = {
            headers: {
              "Content-Type": "application/json",
              "X-AUTH-TOKEN":localStorage.getItem("token"),
            },
          };
    
        return axios.delete(`/api/v1/bookmark/${payload}`,config);
    
    }

    function* deleteBook (action){
        try {
        const result =  yield call(deleteBookAPI,action.payload)
  
        yield put({
            type:POST.BOOKMARK_DELETE_SUCCESS,
            payload:result.data
        })
        alert("북마크 해제!")
        } catch (e) {
            if(e.response.status===403) 
            {
                localStorage.removeItem("token");
                yield put(push("/board"));
            } 
            yield put({
                type:  POST.BOOKMARK_DELETE_FAILURE,
                payload: e,
              });
   
        }
        }



    const loadBookAPI = (payload) =>{

        const config = {
            headers: {
              "Content-Type": "application/json",
              "X-AUTH-TOKEN":localStorage.getItem("token"),
            },
          };

        return axios.get( `/api/v1/bookmark/my/${payload}`,config);
    
    }

    function* loadBook (action){
        try {
        const result =  yield call(loadBookAPI,action.payload)
   
        yield put({
            type:POST.BOOKMARK_LOADING_SUCCESS,
            payload:result.data
        })
        } catch (e) {
            yield put({
                type:  POST.BOOKMARK_LOADING_FAILURE,
                payload: e,
              });
   
        }
        }
    
        function* watchLoadPosts(){
            yield takeEvery(POST.POST_LOADING_REQUEST,loadPosts)
      
        }
    
    
        function* watchLoadDetailPosts(){
            yield takeEvery(POST.POST_DETAIL_LOADING_REQUEST,loadDetailPosts)
      
        }
    
        function* watchupLoadPosts(){
            yield takeEvery(POST.POST_UPLOADING_REQUEST,uploadPosts)
      
        }
    
        function* watcheditPosts(){
            yield takeEvery(POST.POST_EDIT_REQUEST,editPosts)
      
        }

        function* watchdeltePosts(){
            yield takeEvery(POST.POST_DELETE_REQUEST,deletePosts)
      
        }
    
        function* watchtagLoadPosts(){
                    yield takeEvery(POST.TAG_LOADING_REQUEST,tagLoadPosts)
            
                }

           
        function* watchupLoadBook(){
                yield takeEvery(POST.BOOKMARK_UPLOADING_REQUEST,uploadBook)
          
            }
    
       function* watchdeleteBook(){
                yield takeEvery(POST.BOOKMARK_DELETE_REQUEST,deleteBook)
          
            }
        function* watchloadBook(){
            yield takeEvery(POST.BOOKMARK_LOADING_REQUEST,loadBook)
      
        }

     

    

    

    


    export default function* postSaga() {
        yield all([
            fork(watchLoadPosts),
            fork(watchupLoadPosts),
            fork(watchtagLoadPosts),
            fork(watchLoadDetailPosts),
            fork(watchupLoadBook),
            fork(watchdeleteBook),
            fork(watchloadBook),
            fork(watcheditPosts),
            fork(watchdeltePosts),
          ]);
    
      }





