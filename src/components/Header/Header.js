import React, { memo, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Avatar } from '@mui/material';
import { AiOutlineFullscreen, AiOutlineFullscreenExit } from 'react-icons/ai';
import { IoMenuOutline } from "react-icons/io5";
import PowerSettingsNewOutlinedIcon from '@mui/icons-material/PowerSettingsNewOutlined';
import MenuItem from '@mui/material/MenuItem';
import Menu from '@mui/material/Menu';
import IndicatorMobile from '../Indicator/IndicatorMobile';
import fullName from '../../utils/functions/fullName';
import logo from '../../assets/images/logo.png';
import Indicator from '../Indicator/Indicator';
import LoaderBackdrop from '../Loader/LoaderBackdrop';

const Item = memo(({ onClick }) => (
   <MenuItem onClick={onClick}>
      <div className='header_dropdown_item'>
         <div className='header_dropdown_icon' >
            <PowerSettingsNewOutlinedIcon />
         </div>
         <p>Log Out</p>
      </div>
   </MenuItem>
))

function Header({ userInfo: { name, role, photo }, logOutHandler, onSidebarToggle }) {
   const [windowWidth, setWindowWidth] = useState(window.innerWidth);
   const [isFullScreen, setIsFullScreen] = useState(false);
   const [anchorEl, setAnchorEl] = useState(null);
   const [disable, setDisable] = useState(false);
   const open = Boolean(anchorEl);

   useEffect(() => {
      const handleWindowResize = () => {
         setWindowWidth(window.innerWidth);
      };
      window.addEventListener('resize', handleWindowResize);
      return () => {
         window.removeEventListener('resize', handleWindowResize);
      };
   });

   const toggleFullScreen = () => {
      const elem = document.documentElement;
      if (!document.fullscreenElement && !document.mozFullScreenElement && !document.webkitFullscreenElement) {
         if (elem.requestFullscreen) {
            elem.requestFullscreen();
         } else if (elem.mozRequestFullScreen) {
            elem.mozRequestFullScreen();
         } else if (elem.webkitRequestFullscreen) {
            elem.webkitRequestFullscreen();
         }
         setIsFullScreen(true);
      } else {
         if (document.exitFullscreen) {
            document.exitFullscreen();
         } else if (document.mozCancelFullScreen) {
            document.mozCancelFullScreen();
         } else if (document.webkitExitFullscreen) {
            document.webkitExitFullscreen();
         }
         setIsFullScreen(false);
      }
   };

   const handleFullScreen = () => {
      toggleFullScreen();
   };

   const logOut = () => {
      logOutHandler();
      handleClose();
      setDisable(true)
   };

   const handleClick = (event) => {
      setAnchorEl(event.currentTarget);
   };

   const handleClose = () => {
      setAnchorEl(null);
   };

   return (
      <React.Fragment>
         <header>
            {
               windowWidth < 992 && (
                  <div className="mobile_menu">
                     <IoMenuOutline onClick={onSidebarToggle} className='toggle' />
                     <Link to='/'> {windowWidth < 720 ? null : <img src={logo} alt="logo" />} </Link>
                  </div>
               )
            }
            {
               windowWidth < 992 ? <IndicatorMobile /> : <Indicator />
            }
            <div className='header_last'>
               <div className="full_screen_icon" onClick={handleFullScreen}>
                  <button> {isFullScreen ? <AiOutlineFullscreenExit /> : <AiOutlineFullscreen />} </button>
               </div>
               <div className='header_info'>
                  <h2>{windowWidth < 920 ? fullName(name) : name}</h2>
                  <p>{windowWidth < 600 ? role[0] : role.join(',')}</p>
               </div>
               <Avatar
                  className='header_avatar'
                  sx={{ width: 40, height: 40 }}
                  onClick={handleClick}
                  alt="Foydalanuvchi"
                  src={
                     photo !== 'undefined' ? `${process.env.REACT_APP_BASE_URL}/${photo}` :
                        'https://www.transparentpng.com/thumb/human/black-human-user-profile-png-icon-free-fsR5FT.png'
                  }
               />
               <Menu
                  id="basic-menu"
                  anchorEl={anchorEl}
                  open={open}
                  onClose={handleClose}
                  MenuListProps={{
                     'aria-labelledby': 'basic-button',
                  }}
               >
                  <Item onClick={logOut} />
               </Menu>
            </div>
         </header>
         <LoaderBackdrop disable={disable} />
      </React.Fragment>
   )
}

export default memo(Header)