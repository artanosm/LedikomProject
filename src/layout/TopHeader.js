import classes from "./TopHeader.module.scss";
import FacebookIcon from '@mui/icons-material/Facebook';
import InstagramIcon from '@mui/icons-material/Instagram';
import YouTubeIcon from '@mui/icons-material/YouTube';
import SearchBox from "../components/signForms/SearchBox";

const TopHeader = () => {
  return (
    <div className={classes.mainContainer}>
      <div className={classes.socialNetworkContainer}>
        <a href="https://facebook.com/">
          <FacebookIcon fontSize="small" sx={{
            '&:hover':{
              fill:'#395498'
            }
          }}/>
         
        </a>
        <a href="https://instagram.com/">
          <InstagramIcon fontSize="small" sx={{
            '&:hover':{
              fill:'#ab2f88'
            }
          }} />
        </a>
        <a href="https://youtube.com/">
          <YouTubeIcon sx={{
            '&:hover':{
              fill:'red',
          
            }
          }} fontSize="small" />
        </a>
      </div>
      <SearchBox />
    </div>
  );
};

export default TopHeader;
