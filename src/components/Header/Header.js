import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { Avatar } from '@mui/material';
import { AiOutlineFullscreen, AiOutlineFullscreenExit } from 'react-icons/ai';
import { IoMenuOutline } from "react-icons/io5";
import PowerSettingsNewOutlinedIcon from '@mui/icons-material/PowerSettingsNewOutlined';
import IndicatorMobile from '../Indicator/IndicatorMobile';
import logo from '../../assets/images/logo.png';
import Indicator from '../Indicator/Indicator';
import fullName from '../../utils/functions/fullName';

function Header({ name, role, photo, removeData, sidebarActive, setSidebarActive }) {
   const [windowWidth, setWindowWidth] = useState(window.innerWidth);
   const [headerDropDown, setHeaderDropDown] = useState(false);
   const [isFullScreen, setIsFullScreen] = useState(false);
   const catalogRef = useRef(null)

   useEffect(() => {
      const handleWindowResize = () => {
         setWindowWidth(window.innerWidth);
      };

      window.addEventListener('resize', handleWindowResize);

      return () => {
         window.removeEventListener('resize', handleWindowResize);
      };
   });

   const hendleOutSide = (e) => {
      const { current: wrap } = catalogRef;
      if (wrap && !wrap.contains(e.target)) {
         setHeaderDropDown(false)
      }
   }

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

   return (
      <header>
         {
            windowWidth < 992 ?
            <div className="mobile_menu">
               <IoMenuOutline onClick={() => setSidebarActive(!sidebarActive)} className='toggle' />
               <Link to='/'>
                  {
                     windowWidth < 720 ? null : <img src={logo} alt="logo" />
                  }
               </Link>
            </div> : <></>
         }
         {
            windowWidth < 992 ?
            <IndicatorMobile/> : <Indicator/>
         }
         <div className='header_last'>
            <div className="full_screen_icon" onClick={handleFullScreen}>
               <button>
                  {
                     isFullScreen ?
                        <AiOutlineFullscreenExit /> :
                        <AiOutlineFullscreen />
                  }
               </button>
            </div>
            <div className='header_info'>
               <h2>{windowWidth < 920 ? fullName(name) : name}</h2>
               <p>{windowWidth < 600 ? role[0] : role.join(',')}</p>
            </div>
            <Avatar
               onClick={() => { setHeaderDropDown(!headerDropDown) }}
               className='header_avatar'
               alt="John Doe"
               sx={{ width: 50, height: 50 }}
               src={
                  photo ? `https://ioi-tech.uz/${photo}` :
                     'https://pixinvent.com/demo/vuexy-react-admin-dashboard-template/demo-1/static/media/avatar-s-11.1d46cc62.jpg'
               } />
            <ul className={headerDropDown ? 'header_dropdown header_dropdown_active' : 'header_dropdown'} ref={catalogRef}>
               <div className='header_dropdown_item' onClick={() => removeData()}>
                  <Link to='/' onClick={() => { setHeaderDropDown(false) }} >
                     <div className='header_dropdown_icon' >
                        <PowerSettingsNewOutlinedIcon />
                     </div>
                     <p>Log Out</p>
                  </Link>
               </div>
            </ul>
         </div>
      </header>
   )
}

export default Header