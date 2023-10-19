import { memo } from 'react';
import { BsArrowUpRightSquareFill } from "react-icons/bs";
import logo from './logo.png'

function Logo({ width, isSidebarMini }) {
   return (
      <>
         {
            isSidebarMini ?
               <BsArrowUpRightSquareFill /> :
               <img className={isSidebarMini ? "hide" : "logo"} style={{ width: width }} src={logo} alt='logo' />
         }

      </>
   )
}

export default memo(Logo)