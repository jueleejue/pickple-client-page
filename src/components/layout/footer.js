import React from "react";
import "../layout/footer.css";
import { IconButton} from '@material-ui/core'
import logo_Image from "../../assets/img/footer_logo.png";
import CallIcon from '@material-ui/icons/Call';
import MailOutlineIcon from '@material-ui/icons/MailOutline';
import LocationOnIcon from '@material-ui/icons/LocationOn';
import { withRouter } from "react-router-dom";


function footer(props) {
	if ("/login" ===window.location.pathname||"/Naver/Callback"===window.location.pathname )return null;
    return (
			<footer id="footer">
				<div className="inner">
              <div className="logo">
                  <img onClick={() => props.history.push('/')}
                      src={logo_Image} alt="픽플" />
              </div>
					<ul className="actions">
						<li><IconButton   ><CallIcon  style={{color:"#fff"}}/></IconButton>Call (054) 478-7114</li>
						<li><IconButton><MailOutlineIcon  style={{color:"#fff"}} /></IconButton> FAX : (054) 478-7114 E-mail</li>
						<li><IconButton><LocationOnIcon  style={{color:"#fff"}}/></IconButton>금오공과대학교,(39177) 경북 구미시 대학로 61</li>
					</ul>
				</div>
				<div className="copyright">
					 © PICKPLE Corp. ALL RIGHTS RESERVED.
				</div>
			</footer>
    );
}
export default withRouter(footer);

