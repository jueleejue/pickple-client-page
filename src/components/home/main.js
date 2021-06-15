
import React from "react";
import { Link } from "react-router-dom";
import "./main.css"


function Main() {

  return (
   <div className="site-main position-relative overflow-hidden " >
       <div className="container">
            <div className="index-main-txt col-md-12 col-lg-6 mt-4 mb-4">
                <h2>
                    당신이 찾던 개발자,<br/>모두 픽플에
                </h2>
                <p>유망있는 예비 개발자 학생들이 당신의 프로젝트를 기다리고 있어요.
                    요구사항에 딱 맞는 학생들을 구해보세요.
                </p>
                <div className="index-button-area">
                    <Link to="/board/post">
                    <button className="index-button">
                      지금 시작하기 
                    </button>
                    </Link>
                </div>
            </div>
        </div>
    </div>
      
  );     
}

export default Main;