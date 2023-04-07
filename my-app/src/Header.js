
import React from "react";
import './Header.css';

function Header(){
      return(
        <div className="header">
          <div id="logo-holder">
            <img src={require('./img/TuneBotPink.png')} alt="TuneBotPink" class="sway"/>
          </div>
          <div className="text-box">
              <span>T</span>
              <span>U</span>
              <span>N</span>
              <span>E</span>
              <span>B</span>
              <span>O</span>
              <span>T</span>
          </div>
          <div className="author">
            By Mumichians
          </div>
        </div>
      )

}
export default Header;