import { combineReducers } from "redux";
import { connectRouter } from "connected-react-router";
import userReducer from "./userReducer";
import postReducer from "./postReducer";
import profileReducer from "./profileReducer"
import mypageReducer from "./mypageReducer";
import applyReducer from "./applyReducer";
import reportReducer from "./reportReducer"

const createRootReducer = (history) =>
  combineReducers({
    router: connectRouter(history),
    user: userReducer,
    post: postReducer,
    profile: profileReducer,
    apply:applyReducer,
    mypage:mypageReducer,
    report:reportReducer,
  });

export default createRootReducer;
