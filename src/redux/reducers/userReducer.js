import USER from '../../actions/userAction';


  const initialState = {
    token: localStorage.getItem("token"),
    isAuthenticated: null,
    users:"",
    isLoading: false,
    userloading:true,
    accountId: "",
    userName: "",
    userRole: "",
    resultMsg:"",
    isDeleted:0,
    accountType:"",

  };

 
  
  const userReducer = (state = initialState, action) => {

    switch (action.type) {
      
      
    
      case USER.USER_LOGIN_REQUEST:
        return {
          ...state,
          errorMsg: "",
          isLoading: true,
        };
      case USER.USER_LOGIN_SUCCESS:
        localStorage.setItem("token",action.payload);
        return {
          ...state,
          ...action.payload,
          isAuthenticated: true,
          isLoading: false,
          resultMsg: "",
        };

      case USER.USER_LOGIN_FAILURE:
        return {
          ...state,
          ...action.payload,
          token: null,
          isAuthenticated: false,
          isLoading: false,
        };


      case USER.USER_ACCOUNT_REQUEST:
        return {
          ...state,
          errorMsg: "",
          isLoading: true,
        };
      case USER.USER_ACCOUNT_SUCCESS:
        localStorage.setItem("token",action.payload);
        return {
          ...state,
          ...action.payload,
          isAuthenticated: true,
          isLoading: false,
          resultMsg: "",
        };

      case USER.USER_ACCOUNT_FAILURE:
        return {
          ...state,
          ...action.payload,
          token: null,
          isAuthenticated: false,
          isLoading: false,
        };




 

       case USER.USER_LOGOUT_REQUEST:
          return {
            ...state,
            errorMsg: "",
            isLoading: true,
          };
        case USER.USER_LOGOUT_SUCCESS:
          localStorage.removeItem("token");
          return {
            ...state,
            ...action.payload,
            isAuthenticated: false,
            isLoading: false,
            resultMsg:"로그아웃 성공!"
          };
        case USER.USER_LOGOUT_FAILURE:
          return {
            ...state,
            ...action.payload,
            isAuthenticated: true,
            isLoading: false,
            resultMsg: "로그아웃 실패",
          };
  

       case USER.LOGIN_LOADING_REQUEST:
        return {
          ...state,
          isLoading: true,
        };
      case USER.LOGIN_LOADING_SUCCESS:
        return {
          ...state,
          isAuthenticated: true,
          isLoading: false,
        };
      case USER.LOGIN_LOADING_FAILURE:
        return {
          ...state,
          user: null,
          isAuthenticated: false,
        };


       case USER.USER_LOADING_REQUEST:
        return {
          ...state,
          userloading: true,
        };
      case USER.USER_LOADING_SUCCESS:

        return {
          ...state,
          users:action.payload.data,
          accountId:action.payload.data.accountId,
          accountType:action.payload.data.accountType,
          isAuthenticated: true,
          userloading: false,
        };
      case USER.USER_LOADING_FAILURE:
        return {
          ...state,
          user: null,
          userloading:false,
          isAuthenticated: false,
        };


        

       case USER.USER_EDIT_REQUEST:
        return {
          ...state,
          resultMsg:"",
          isLoading: true,
        };
      case USER.USER_EDIT_SUCCESS:
        return {
          ...state,
          isLoading: false,
        };
      case USER.USER_EDIT_FAILURE:
        return {
          ...state,
          isLoading: false,
        };

    
       case USER.USER_DELETE_REQUEST:
        return {
          ...state,
          isLoading: true,
        };
      case USER.USER_DELETE_SUCCESS:
        return {
          ...state,
          isLoading: false,
          isAuthenticated: true,
        };
      case USER.USER_DELETE_FAILURE:
        return {
          ...state,
          isLoading: false,
          isAuthenticated: false,
        };



      
      case USER.CLEAR_ERROR_REQUEST:
        return {
          ...state,
          resultMsg: null,
        };
      case USER.CLEAR_ERROR_SUCCESS:
        return {
          ...state,
          resultMsg: null,
        };
      case USER.CLEAR_ERROR_FAILURE:
        return {
          ...state,
          resultMsg: null,
        };
     
  
      default:
        return state;
    }
  };
  
  export default userReducer;