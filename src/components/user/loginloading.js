import store from "../../store/store"
import USER from "../../actions/userAction"

const LoginLoading=()=>{


    try {
        store.dispatch({
            type: USER.LOGIN_LOADING_REQUEST,
            payload:localStorage.getItem("token"),

            });
    } catch (e) {
  
    }
};

export default LoginLoading;