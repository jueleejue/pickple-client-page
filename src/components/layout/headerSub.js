import React, { Fragment, useState,  useEffect } from "react";
import {
  Navbar,
  Container,
  NavbarToggler,
  Collapse,
  Nav,
  NavItem,
} from "reactstrap";
import { Link } from "react-router-dom";
import {useDispatch } from "react-redux";
import "./header.css"
import title_logo from "../../assets/img/logo.png";
import USER from "../../actions/userAction"



const HeaderSub = () => {
  const dispatch = useDispatch();
  const [isOpen, setIsOpen] = useState(false);
  const token=localStorage.getItem("token")


  useEffect(() => {

  }, []);


  const onLogout =() => {
    dispatch({
      type: USER.USER_LOGOUT_REQUEST,
    });
  }


  const handleToggle = () => {
    setIsOpen(!isOpen);
  };

  const authLink = (


    <ul className="authLinkWarp">
        <Link to="/Mypage" style={{textDecoration:"none"}} >
        <li className="mypage-txt">
              마이페이지
            </li>
        </Link> 
        <li className="logout-txt"></li>
          <li onClick={()=>onLogout()}>
            로그아웃
          </li>
    </ul>
    
  );
  
  
  const guestLink = (
 
                   <Link to="/login" >
                     <div className="HeaderLoginWrap">
                     <button className="HeaderLogin">
                      로그인/회원가입
                    </button>
                     </div>
                    </Link>
     
  );


  return (
 
    <Fragment>
      <Navbar color="white" light expand="lg" className="sticky-top mt-1 mb-1" > 
        <Container >
          <Link to="/" > <img  src={title_logo} alt="픽플" /> </Link>
          <NavbarToggler  onClick={handleToggle} />

          <Collapse  isOpen={isOpen}  className="mt-2 mb-2" navbar color="#fff"  >
            <Nav className="m-auto d-felx justify-content-around navToggle " navbar>
              <NavItem className="navToggle">
              <Link to="/board" className=" p-4 HeaderItem text-dark text-decoration-none" > 모집글</Link>
              {/* <a href="/RecBoard" className=" p-4 HeaderItem" > 모집글</a> */}
              </NavItem>

              <NavItem  className="navToggle">
              <Link to="/profile"  className=" p-4 HeaderItem text-dark text-decoration-none" > 프로필</Link>
              </NavItem>

              <NavItem  className="navToggle">
              <Link to="/board/post"  className=" p-4 HeaderItem text-dark text-decoration-none" > 모집글 등록</Link>
              
              </NavItem>

            </Nav>
              
              {token ? authLink : guestLink}
          
          </Collapse>
        </Container>
      </Navbar>
    </Fragment>
  );
};

export default HeaderSub;
