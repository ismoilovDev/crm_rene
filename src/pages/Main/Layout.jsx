import { BrowserRouter } from 'react-router-dom';
import { memo, useEffect, useRef, useState } from 'react';
import Sidebar from '../../components/Sidebar/Sidebar';
import Header from '../../components/Header/Header';
import Router from './Routes';

const name = localStorage.getItem('name')
const photo = localStorage.getItem('photo')
const role = JSON.parse(window.localStorage.getItem('role'))

function Main({ logOutHendle }) {
   const main_content = useRef(null)
   const [sidebarActive, setSidebarActive] = useState(false)
   const [isSidebarMini, setIsSidebarMini] = useState(false)
   const [currentPath, setCurrentPath] = useState(window.location.pathname.replace(/^\/|\/$/g, ''))

   useEffect(() => {
      const handleBeforeUnload = (e) => {
         e.preventDefault();
         e.returnValue = '';
      };
      window.addEventListener('beforeunload', handleBeforeUnload);

      setCurrentPath(window.location.pathname.replace(/^\/|\/$/g, ''));

      return () => {
         window.removeEventListener('beforeunload', handleBeforeUnload);
      };
   }, []);

   const handleChangeSidebarSize = () => {
      setIsSidebarMini(!isSidebarMini)
   };

   const closeSidebar = () => {
      setSidebarActive(false)
      main_content.current.style.overflow = 'auto'
      main_content.current.style.height = 'auto'
   }

   const openSidebar = () => {
      setSidebarActive(true)
      main_content.current.style.overflow = 'hidden'
      main_content.current.style.height = '100vh'
   }

   return (
      <div className='layout'>
         <BrowserRouter>
            <Sidebar
               role={role}
               currentPath={currentPath}
               sidebarActive={sidebarActive}
               isSidebarMini={isSidebarMini}
               setSidebarActive={setSidebarActive}
               setIsSidebarMini={setIsSidebarMini}
               closeSidebar={closeSidebar}
               handleChangeSidebarSize={handleChangeSidebarSize}
            />

            <main className={isSidebarMini ? "max_size" : null} ref={main_content}>
               <Header
                  userInfo={{ name, role, photo }}
                  logOutHandler={logOutHendle}
                  onSidebarToggle={openSidebar}
               />
               <Router />
            </main>
            <div className={sidebarActive ? "sidebar_popup" : ""} onClick={() => setSidebarActive(false)}></div>
         </BrowserRouter>
      </div>
   )
}

export default memo(Main)