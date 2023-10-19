import { BrowserRouter } from 'react-router-dom';
import { memo, useEffect, useState } from 'react';
import Sidebar from '../../components/Sidebar/Sidebar';
import Header from '../../components/Header/Header';
import Login from '../Login/Login';
import Router from './Routes';

function Main({ token, role, name, photo, logOutHendle }) {
   const [sidebarActive, setSidebarActive] = useState(true)
   const [isSidebarMini, setIsSidebarMini] = useState(false)
   const [currentPath, setCurrentPath] = useState(window.location.pathname.replace(/^\/|\/$/g, ''))

   useEffect(() => {
      const handleBeforeUnload = (e) => {
         e.preventDefault();
         e.returnValue = '';
      };
      window.addEventListener('beforeunload', handleBeforeUnload);
      return () => {
         window.removeEventListener('beforeunload', handleBeforeUnload);
      };
   }, []);

   useEffect(() => {
      setCurrentPath(window.location.pathname.replace(/^\/|\/$/g, ''))
      return () => { }
   }, []);

   const hendleChangeSidebarSize = () => {
      setIsSidebarMini(!isSidebarMini)
   }

   if (token) {
      return (
         <div className='layout'>
            <BrowserRouter>
               <Sidebar
                  role={role}
                  currentPath={currentPath}
                  sidebarActive={sidebarActive}
                  setSidebarActive={setSidebarActive}
                  isSidebarMini={isSidebarMini}
                  setIsSidebarMini={setIsSidebarMini}
                  hendleChangeSidebarSize={hendleChangeSidebarSize}
               />

               <main className={isSidebarMini ? "max_size" : " "}>
                  <Header
                     name={name}
                     role={role}
                     photo={photo}
                     removeData={logOutHendle}
                     sidebarActive={sidebarActive}
                     isSidebarMini={isSidebarMini}
                     setSidebarActive={setSidebarActive}
                  />
                  <Router />
               </main>
               <div className={sidebarActive ? "sidebar_popup" : ""} onClick={() => setSidebarActive(false)}></div>
            </BrowserRouter>
         </div>
      )
   } else {
      return (
         <Login />
      )
   }
}

export default memo(Main)