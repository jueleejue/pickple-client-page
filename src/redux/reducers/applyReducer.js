import APPLY from '../../actions/applyAction';



const initialState = {

  recapplyloading: false,
  applycheck: false,
  applydetail: "",
  applydetailloading: false,
  applyuploading: false,
  isapplydelete:0,

  contractloading: false,
  reviewuploading: false,
  isContracted: 0,
  myboardusers: [],
  boarduserloading: true,
  reviewState: "BEFORE",
  isreview: 0,

  profilereviews:[],
  profilereviewloading:false,
};

const applyReducer = (state = initialState, action) => {
  switch (action.type) {

   
    case APPLY.APPLY_LOADING_REQUEST:
      return {
        ...state,
        recapplyloading: true,
      };
    case APPLY.APPLY_LOADING_SUCCESS:
      return {
        ...state,
        recapplyloading: false,
        applycheck: true,
      };
    case APPLY.APPLY_LOADING_FAILURE:
      return {
        ...state,
        recapplyloading: false,
        applycheck: false,
      }


  
    case APPLY.APPLY_BOARD_USER_REQUEST:
      return {
        ...state,
        myboardusers: [],
        boarduserloading: true,
      };
    case APPLY.APPLY_BOARD_USER_SUCCESS:

      return {
        ...state,
        boarduserloading: false,
        myboardusers: [...action.payload.data],
        isContracted: action.payload.data.isContracted,
        reviewState: action.payload.data.reviewState,
      };
    case APPLY.APPLY_BOARD_USER_FAILURE:
      return {
        ...state,
        boarduserloading: false,
      }



   
    case APPLY.APPLY_UPLOADING_REQUEST:
      return {
        ...state,
        applyuploading: true,
      };
    case APPLY.APPLY_UPLOADING_SUCCESS:
      return {
        ...state,
        applyuploading: false,
        applycheck: true,
      };
    case APPLY.APPLY_UPLOADING_FAILURE:
      return {
        ...state,
        applyuploading: false,
        applycheck: false,
      }

  
    case APPLY.APPLY_DELETE_REQUEST:
      return {
        ...state,
      };
    case APPLY.APPLY_DELETE_SUCCESS:
      return {
        ...state,
        isapplydelete: 1,
      };
    case APPLY.APPLY_DELETE_FAILURE:
      return {
        ...state,
      }



    case APPLY.APPLY_CONTRACT_REQUEST:
      return {
        ...state,
        contractloading: true,
      };
    case APPLY.APPLY_CONTRACT_SUCCESS:
      return {
        ...state,
        contractloading: false,
        isContracted: 1,
      };
    case APPLY.APPLY_CONTRACT_FAILURE:
      return {
        ...state,
        contractloading: false,
      }


    case APPLY.REVIEW_UPLOADING_REQUEST:
      return {
        ...state,
        reviewuploading: true,
      };
    case APPLY.REVIEW_UPLOADING_SUCCESS:
      return {
        ...state,
        reviewuploading: false,
        reviewState: "WAITING",
        isreview: 1,
      };
    case APPLY.REVIEW_UPLOADING_FAILURE:
      return {
        ...state,
        reviewuploading: false,
      }


    case APPLY.APPLY_DETAIL_REQUEST:
      return {
        ...state,
        applydetailloading: true,
      };
    case APPLY.APPLY_DETAIL_SUCCESS:
      return {
        ...state,
        applydetail: action.payload.data,
        applydetailloading: false,
      };
    case APPLY.APPLY_DETAIL_FAILURE:
      return {
        ...state,
        applydetailloading: false,
      }



    case APPLY.REVIEW_PROFILE_REQUEST:
      return {
        ...state,
        profilereviewloading: true,
      };
    case APPLY.REVIEW_PROFILE_SUCCESS:
      return {
        ...state,
        profilereviews: [...action.payload.data],
        profilereviewloading: false,
      };
    case APPLY.REVIEW_PROFILE_FAILURE:
      return {
        ...state,
        profilereviewloading: false,
      }

 




    default:
      return state;
  }

};
export default applyReducer;
