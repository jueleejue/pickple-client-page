import REPORT from '../../actions/reportAction';

  
    const initialState = {
     
        reportloading:false,
        resultMsg:"",

        reportdetails:"",
        reportdetailloading:false,

    };
    

    const reportReducer = (state = initialState, action) => {
        switch (action.type) {

   
      case REPORT.REPORT_UPLOADING_REQUEST:
        return {
          ...state,
          reportloading: true,
        };
      case REPORT.REPORT_UPLOADING_SUCCESS:
        return {
          ...state,
          reportloading: false,
          resultMsg:"신고글이 접수 되었습니다."
        };
      case REPORT.REPORT_UPLOADING_FAILURE:
        return {
          ...state,
          reportloading: false,
          resultMsg:"신고글 접수를 실패했습니다."
        }

 
      case REPORT.REPORT_DETAIL_REQUEST:
        return {
          ...state,
          reportdetailloading: true,
        };
      case REPORT.REPORT_DETAIL_SUCCESS:
        return {
          ...state,
          reportdetails:action.payload.data,
          reportdetailloading: false,
        };
      case REPORT.REPORT_DETAIL_FAILURE:
        return {
          ...state,
          reportdetailloading: false,

        }

          
        default:
          return state;
        }
     
    };
    export default reportReducer;
   