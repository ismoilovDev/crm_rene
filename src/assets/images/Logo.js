import { memo } from 'react';
import mini_logo from './mini_logo.png'
import logo from './logo.png'

function Logo({ width, isSidebarMini }) {
   return (
      <img
         className={isSidebarMini ? "logo mini_logo" : "logo"}
         src={isSidebarMini ? mini_logo : logo}
         style={{ width: width }}
         alt='logo'
      />
   )
}

export default memo(Logo)