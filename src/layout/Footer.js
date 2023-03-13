import {memo} from "react";
import classes from "./Footer.module.scss";
import {Facebook, Instagram, YouTube, Call, Email} from '@mui/icons-material';


const Footer = () => {

  return (
    <div className={classes.container1}>
      <div className={classes.newsletter}>
        <h1>NEWSLETTER</h1>
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
          <div>
          <a href="https://facebook.com/"><Facebook/></a>            
          <a href="https://instagram.com/"><Instagram/></a>            
          <a href="https://youtube.com/"><YouTube/></a>            
          </div>
         
        </div>
      </div>
      <p>
        © 2022 Ledikom Mobile Store. All Rights Reserved. Developed by GSM Media
      </p>
    </div>
  );
};

export default memo(Footer);

