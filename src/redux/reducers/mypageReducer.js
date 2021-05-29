import MYPAGE from '../../actions/myPageAction';


  
    const initialState = {
   
        mybookmarks:[],
        bookloading:true,

        myapplys:[],
        applyloading:true,
  
        myboards:[],
        boardloading:true,

        myreports:[],
        reportloading:true,

  

    };
    

  
    const mypageReducer = (state = initialState, action) => {
        switch (action.type) {



      case MYPAGE.MYPAGE_BOOKMARK_REQUEST:
        return {
          ...state,
          mybookmarks:[],
          bookloading: true,
        };
      case MYPAGE.MYPAGE_BOOKMARK_SUCCESS:
        return {
          ...state,
          bookloading: false,
          mybookmarks:[...action.payload.data]
        };
      case MYPAGE.MYPAGE_BOOKMARK_FAILURE:
        return {
          ...state,
          bookloading: false,
        }


      case MYPAGE.MYPAGE_APPLY_REQUEST:
        return {
          ...state,
          myapplys:[],
          applyloading: true,
        };
      case MYPAGE.MYPAGE_APPLY_SUCCESS:
        return {
          ...state,
          applyloading: false,
          myapplys:[...action.payload.data]
        };
      case MYPAGE.MYPAGE_APPLY_FAILURE:
        return {
          ...state,
          applyloading: false,
        }

      case MYPAGE.MYPAGE_BOARD_REQUEST:
        return {
          ...state,
          boardloading: true,
          myboards:[],
        };
      case MYPAGE.MYPAGE_BOARD_SUCCESS:
        return {
          ...state,
          boardloading: false,
          myboards:[...action.payload.data]
        };
      case MYPAGE.MYPAGE_BOARD_FAILURE:
        return {
          ...state,
          boardloading: false,
        }


      case MYPAGE.MYPAGE_REPORT_REQUEST:
        return {
          ...state,
          myreports:[],
          reportloading: true,
        };
      case MYPAGE.MYPAGE_REPORT_SUCCESS:
        return {
          ...state,
          reportloading: false,
          myreports:[...action.payload.data]
        };
      case MYPAGE.MYPAGE_REPORT_FAILURE:
        return {
          ...state,
          reportloading: false,
        }
  
  

     
        default:
          return state;
        }
     
    };
    export default mypageReducer;
   