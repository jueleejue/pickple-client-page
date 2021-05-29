import POST from '../../actions/postAction';

  
    const initialState = {
      isAuthenticated: null,
      post: [],
      posttest:"",
      postDetail: "",
      loading: false,
      detailloading:false,
      editloading:false,
      boardloading:true,

      b_title: "",
      b_paymentMax:"",
      b_text:"",
      b_recNumber:0,
      b_rec_start_date:"",
      b_recEndDate:"",
      b_workStartDate:"",
      b_workEndDate:"",
      b_recruitmentBoardTagList:[],

      
      tags:[],
      tagLoading:false,
      tagSearch:[],


      isbookmark:false,
      bookLoading:false,
      bookmarkId:"",

      lastpage:false,

    };
    

  
    const postReducer = (state = initialState, action) => {
        switch (action.type) {



      case POST.POST_UPLOADING_REQUEST:
        return {
          ...state,
          loading: true,
        };
      case POST.POST_UPLOADING_SUCCESS:
        return {
          ...state,
          loading: false,
        };
      case POST.POST_UPLOADING_FAILURE:
        return {
          ...state,
          loading: false,
        }


        case POST.POST_LOADING_REQUEST:
            
          return {
            ...state,
            boardloading: true,
          };
        case POST.POST_LOADING_SUCCESS:
          if(action.page===1)
          {
            return {
            ...state,
            post: [...action.payload.data.content],
            boardloading: false,
          }
        }
        else{
          if(action.payload.data.content.length===0)
          {
            return {
              ...state,
              post: [...state.post,...action.payload.data.content],
              boardloading: false,
              lastpage:true,
            };
          }
          else{
            return {
              ...state,
              post: [...state.post,...action.payload.data.content],
              boardloading: false,
              lastpage:false,
            };
          }
        
        }
        
        case POST.POST_LOADING_FAILURE:
          return {
            ...state,
            boardloading: false,
          }


      case POST.POST_EDIT_REQUEST:
        return {
          ...state,
          editloading: true,
        };
      case POST.POST_EDIT_SUCCESS:
        return {
          ...state,
          editloading: false,
        };
      case POST.POST_EDIT_FAILURE:
        return {
          ...state,
          editloading: false,
        }


      case POST.POST_DELETE_REQUEST:
        return {
          ...state,
          loading: true,
        };
      case POST.POST_DELETE_SUCCESS:
        return {
          ...state,
          loading: false,
        };
      case POST.POST_DELETE_FAILURE:
        return {
          ...state,
          loading: false,
        }

       
        case POST.POST_DETAIL_LOADING_REQUEST:
          return {
            ...state,
            posts: [],
            detailloading: true,
          };
        case POST.POST_DETAIL_LOADING_SUCCESS:
          return {
            ...state,
            detailloading: false,
            postDetail:action.payload.data,
            b_title:action.payload.data.title,
            b_payment:action.payload.data.paymentMax,
            b_text:action.payload.data.text,
            b_recNumber:action.payload.data.recNumber,
            boardtag:action.payload.data.recruitmentBoardTagList,
          };

        case POST.POST_DETAIL_LOADING_FAILURE:
          return {
            ...state,
            error:action.payload,
            detailloading:false,
          }

 

      case POST.TAG_LOADING_REQUEST:
            
        return {
          ...state,

          tagLoading: true,
        };
      case POST.TAG_LOADING_SUCCESS:
     
        return {
          ...state,
          tags: [...action.payload.data],
          tagLoading: false,
        };
      case POST.TAG_LOADING_FAILURE:
        return {
          ...state,
          tagLoading: false,
        }

        case POST.TAG_SEARCH_REQUEST:
            
          return {
            ...state,
            tagLoading: true,
          };
        case POST.TAG_SEARCH_SUCCESS:
       
          return {
            ...state,
            tagSearch: [...action.payload],
            tagLoading: false,
          };
        case POST.TAG_SEARCH_FAILURE:
          return {
            ...state,
            tagLoading: false,
          }
  


              
        case POST.BOOKMARK_LOADING_REQUEST:
                  
          return {
            ...state,
            bookLoading: true,
          };
        case POST.BOOKMARK_LOADING_SUCCESS:
          return {
            ...state,
            isbookmark:true,
            bookmarkId:action.payload.data.bookmarkId,
            bookLoading: false,
          };

        case POST.BOOKMARK_LOADING_FAILURE:
         
          return {
            ...state,
            isbookmark:false,
            bookLoading: false,
          }


      
      case POST.BOOKMARK_UPLOADING_REQUEST:
          
        return {
          ...state,
          bookLoading: true,
        };
      case POST.BOOKMARK_UPLOADING_SUCCESS:
   
        return {
          ...state,
          isbookmark:true,
          bookLoading: false,
        };

      case POST.BOOKMARK_UPLOADING_FAILURE:
        return {
          ...state,
          isbookmark:false,
          bookLoading: false,
        }
  


      
      case POST.BOOKMARK_DELETE_REQUEST:
            
        return {
          ...state,
          bookLoading: true,
        };
      case POST.BOOKMARK_DELETE_SUCCESS:

        return {
          ...state,
          isbookmark:false,
          bookLoading: false,
        };

      case POST.BOOKMARK_DELETE_FAILURE:
        return {
          ...state,
          isbookmark:true,
          bookLoading: false,
        }
  




            
        default:
          return state;
        }
     
    };
    export default postReducer;
   