import React, { Fragment } from "react";
import Header from "../components/layout/header"
import Footer from "../components/layout/footer";
import MainPage from "../pages/mainPage"
import BoardPage from "../pages/boardPage"
import ProfilePage from "../pages/profilePage"
import PostPage from "../pages/postPage"
import LoginPage from "../components/user/login"
import ProfileformPage from "../pages/profileformPage"
import { Switch, Route} from "react-router-dom";
import BoardDetail from "../components/board/cardDetail.js"
import callBackPage from "../pages/callBackPage"
import ProfileEditPage from "../pages/profileEditPage"
import BoardEditPage from "../pages/boardEditPage"
import PrivateRoute from "./privateRouter"
import Apply from "../pages/myApplyPage"
import MyReport from "../pages/myReportPage"
import Identity from "../pages/IdentityPage"
import MyBoard from "../pages/myBoardPage"
import BoardApply from "../pages/boardApplyPage"
import MyBookMark from "../pages/myBookmarkPage"








const Router = () => {
  return (
    <Fragment>
        <Header/>
                <Switch>
                  {/* <PrivateRoute exact path="/" component={LoginPage}/> */}
                          
                            <Route path="/" exact component={MainPage} />
                            {/* boardformPage */}
                            <Route path="/board" exact component={BoardPage} />
                            <PrivateRoute path="/board/post" exact component={PostPage} />
                            <PrivateRoute path="/board/edit/:id" exact component={BoardEditPage} />
                            <PrivateRoute path="/board/:id" exact component={BoardDetail} />
                          
                            {/* profileformPage */}
                            <Route path="/profile" exact component={ProfilePage} />
                            {/* user */}
                            <Route path="/Naver/Callback" exact component={callBackPage} />
                            <Route path="/login" exact component={LoginPage} />
                            {/* mypage*/}
                            <PrivateRoute path="/profile/post/:id" exact component={ProfileformPage} />
                            <PrivateRoute path="/Mypage" exact component={Identity} /> 
                            <PrivateRoute path="/Mypage/profile" exact component={Identity} />
                            <PrivateRoute path="/MyPage/apply" exact  component={Apply} />
                            <PrivateRoute path="/MyPage/report" exact component={MyReport} />
                            <PrivateRoute path="/MyPage/bookmark" exact component={MyBookMark} />
                            <PrivateRoute path="/MyPage/board" exact component={MyBoard} />
                            <PrivateRoute path="/profile/edit/:id" exact component={ProfileEditPage} />
                            <PrivateRoute path="/MyPage/board/apply/:id" exact component={BoardApply} />         
                </Switch>
        <Footer/>
  </Fragment>
  );
}
 
 
  

export default Router;