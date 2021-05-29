import PROFILE from '../../actions/profileAction';

  
    const initialState = {
      isAuthenticated: null,
      profiles: [],
      profileDetail: "",
      profileloading: false,
      resultMsg:"",
      errormsg: "",
      tags:[],
      profileId:"",
      profiletagList:[],
      kakaoId:"",
      tagLoading:false,
      uploadloading:false,
      detailloading:true,
      editloading:false,
      checkloading:false,
      isProfile:true,

      isopen:false,
      isopenloading:false,

      lastpage:false,

    };
    

  
    const profileReducer = (state = initialState, action) => {
        switch (action.type) {


              
              case PROFILE.PROFILE_CHECK_REQUEST:
            
                return {
                  ...state,
                  checkloading: true,
                };
              case PROFILE.PROFILE_CHECK_SUCCESS:
                return {
                  ...state,
                  isProfile:true,
                  isOpen:action.payload.data.isOpen===0?false:true,
                  profileId:action.payload.data.profileId,
                  checkloading: false,
                };
              case PROFILE.PROFILE_CHECK_FAILURE:
                return {
                  ...state,
                  isProfile:false,
                  checkloading: false,
                }
    
            
              case PROFILE.PROFILE_ISOPEN_REQUEST:
            
                return {
                  ...state,
                  isopenloading: true,
                };
              case PROFILE.PROFILE_ISOPEN_SUCCESS:
                return {
                  ...state,
                  isOpen:action.payload.data.isOpen===0?false:true,
                  isopenloading: false,
                };
              case PROFILE.PROFILE_ISOPEN_FAILURE:
                return {
                  ...state,
                  isopenloading: false,
                }
    

              
              case PROFILE.PROFILE_LOADING_REQUEST:
                
                return {
                  ...state,
                  profileloading: true,
                };
              case PROFILE.PROFILE_LOADING_SUCCESS:

                if(action.page===1)
                {
                  return {
                  ...state,
                  profiles: [...action.payload.data.content],
                  profileloading: false,
                }
              }
              else{
                if(action.payload.data.content.length===0)
                {
                  return {
                    ...state,
                    profiles: [...state.profiles,...action.payload.data.content],
                    profileloading: false,
                    lastpage:true,
                  };
                }
                else{
                  return {
                    ...state,
                    profiles: [...state.profiles,...action.payload.data.content],
                    profileloading: false,
                    lastpage:false,
                  };
                }
              
              }
              case PROFILE.PROFILE_LOADING_FAILURE:
                return {
                  ...state,
                  loading: false,
                }
         
              case PROFILE.PROFILE_UPLOADING_REQUEST:
                
                return {
                  ...state,
                  uploadloading: true,
                };
              case PROFILE.PROFILE_UPLOADING_SUCCESS:
                return {
                  ...state,
                  uploadloading: false,
                };
              case PROFILE.PROFILE_UPLOADING_FAILURE:
                return {
                  ...state,
                  uploadloading: false,
                }
               
              case PROFILE.PROFILE_DETAIL_LOADING_REQUEST:
                
                return {
                  ...state,
                  detailloading: true,
                };
              case PROFILE.PROFILE_DETAIL_LOADING_SUCCESS:
                return {
                  ...state,
                  detailloading: false,
                  p_blog:action.payload.data.blog,
                  profileDetail:action.payload.data,

                };

              case PROFILE.PROFILE_DETAIL_LOADING_FAILURE:
                return {
                  ...state,
                  detailloading: false,
                  errormsg:"조회에 실패했습니다.",
            

                }
      
              
              case PROFILE.PROFILE_EDIT_REQUEST:
                
                return {
                  ...state,
                  editloading: true,
                };
              case PROFILE.PROFILE_EDIT_SUCCESS:
                return {
                  ...state,
                  editloading: false,
                };
              case PROFILE.PROFILE_EDIT_FAILURE:
                return {
                  ...state,
                  editloading: false,
                }

            
        default:
          return state;
        }
     
    };
    export default profileReducer;
   