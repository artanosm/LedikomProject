import classes from "./Footer.module.css";
import {Facebook, Instagram, YouTube, Call, Email} from '@mui/icons-material';

// import { SocialMediaIconsReact } from "social-media-icons-react";

import React from "react";

const Footer = () => {
  return (
    <div className={classes.container1}>
      <div className={classes.newsletter}>
        <h1>NEWSLETTER</h1>
        <p>Subscribe for newsletter!</p>
        <div className={classes.inputContainer}>
          <input type="email" placeholder="Please enter your email!"></input>
          <button>Sign In</button>
        </div>
      </div>
      <div className={classes.container2}>
        <img
          className={classes.logoFooter}
          src="https://ledikom.mk/assets/ledikom/images/logo.png?v=1"
          alt="logo"
        />
        <div className={classes.footer}>
          <h3>Contacts</h3>
          <a href="tel: 070252525"><Call fontSize="sm"/> 070 25 25 25</a>
          <a href="mailto:  info@ledikom.mk"><Email fontSize="sm"/> info@ledikom.mk</a>
        </div>
        <div className={classes.footer}>
          <h3>Useful Links</h3>
          <p>Newsletter info</p>
          <p>Privacy Policies</p>
          <p>Agreements</p>
        </div>
        <div className={classes.footer}>
          <h3>Social Media</h3>
          <span>
          <a href="https://facebook.com/"> <Facebook/></a>            
          <a href="https://instagram.com/"> <Instagram/></a>            
          <a href="https://youtube.com/"> <YouTube/></a>            
          </span>
        </div>
      </div>
      <p>
        © 2022 Ledikom Mobile Store. All Rights Reserved. Developed by GSM Media
      </p>
    </div>
  );
};

export default Footer;
/* <SocialMediaIconsReact
              borderColor="rgba(255,255,255,0.25)"
              borderWidth="0"
              borderStyle="outset"
              icon="facebook"
              iconColor="darkgrey"
              backgroundColor="rgba(9,9,9,0)"
              iconSize="0"
              roundness="26%"
              url="https://facebook.com/"
              size="30"
            />
            <SocialMediaIconsReact
              borderColor="rgba(255,255,255,0.25)"
              borderWidth="0"
              borderStyle="outset"
              icon="instagram"
              iconColor="darkgrey"
              backgroundColor="rgba(9,9,9,0)"
              iconSize="0"
              roundness="26%"
              url="https://instagram.com/"
              size="30"
            />
            <SocialMediaIconsReact
              borderColor="rgba(255,255,255,0.25)"
              borderWidth="0"
              borderStyle="outset"
              icon="youtube"
              iconColor="darkgrey"
              backgroundColor="rgba(9,9,9,0)"
              iconSize="0"
              roundness="26%"
              url="https://youtube.com/"
              size="30"
            /> */
