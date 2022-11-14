import React from "react";
import { Link } from "react-router-dom";

function Footer() {
  return (
    <footer className="login_footer">
      <div className="login_footer_wrap">
        <Link to="/">English (US)</Link>
        <Link to="/">Español</Link>
        <Link to="/">Français (France)</Link>
        <Link to="/">中文(简体)</Link>
        <Link to="/">العربية</Link>
        <Link to="/">Português (Brasil)</Link>
        <Link to="/">Italiano</Link>
        <Link to="/">한국어</Link>
        <Link to="/">Deutsch</Link>
        <Link to="/">हिन्दी</Link>
        <Link to="/" className="">
          日本語
          <div className="footer_square">
            <i className="plus_icon "></i>
          </div>
        </Link>
      </div>
      <div className="footer_splitter"></div>
      <div className="login_footer_wrap">
        <Link to="/">Sign Up</Link>
        <Link to="/">Log In</Link>
        <Link to="/">Messanger</Link>
        <Link to="/">Facebook Lite</Link>
        <Link to="/">Watch</Link>
        <Link to="/">Places</Link>
        <Link to="/">Games</Link>
        <Link to="/">Marketplace</Link>
        <Link to="/">Facebook Pay</Link>
        <Link to="/">Oculus</Link>
        <Link to="/">Poster</Link>
        <Link to="/">Instagram</Link>
        <Link to="/">Bulletin</Link>
        <Link to="/">Local</Link>
        <Link to="/">Fundraisers</Link>
        <Link to="/">Services</Link>
        <Link to="/">Voting Information Center</Link>
        <Link to="/">Groups</Link>
        <Link to="/">About</Link>
        <Link to="/">Create Ad</Link>
        <Link to="/">Create Page</Link>
        <Link to="/">Developers</Link>
        <Link to="/">Careers</Link>
        <Link to="/">Privacy</Link>
        <Link to="/">Cookies</Link>
        <Link to="/">
          Ad choices<i className="adChoices_icon"></i>
        </Link>
        <Link to="/">Terms </Link>
        <Link to="/">Help</Link>
        <Link to="/">Contact Uploading & Non-UsersSettings</Link>
      </div>
      <div className="login_footer_wrap">
        <Link to="/" style={{ fontSize: "12px", marginTop: "10px" }}>
          Meta © 2022
        </Link>
      </div>
    </footer>
  );
}

export default Footer;
