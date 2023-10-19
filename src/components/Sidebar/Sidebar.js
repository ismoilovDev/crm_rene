import { memo, useState } from 'react'
import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined';
import PersonOutlineOutlinedIcon from '@mui/icons-material/PersonOutlineOutlined';
import { AiFillDatabase, AiFillFileText, AiOutlineFileAdd, AiFillFolderOpen, AiFillFile, AiOutlineBook, AiOutlineUsergroupAdd, AiOutlineCalendar, AiOutlineCalculator } from 'react-icons/ai';
import { BsBuilding } from 'react-icons/bs';
import { IoCloseCircleOutline } from "react-icons/io5";
import { MdArrowBackIos, MdArrowForwardIos } from "react-icons/md";
import { Tabs } from 'antd';
import { Link } from 'react-router-dom';
import Logo from '../../assets/images/Logo';

const { TabPane } = Tabs;

function Sidebar({ role, sidebarActive, setSidebarActive, isSidebarMini, currentPath, hendleChangeSidebarSize }) {
   const sidebarLink = [
      { to: '/', icon: <HomeOutlinedIcon />, span: 'Statistika', keys: 1, visible: "visible" },
      { to: '/clients/pages/1', icon: <PersonOutlineOutlinedIcon />, span: 'Mijozlar', keys: 2, visible: role.includes('admin') || role.includes("user") || role.includes("director") ? "visible" : "hidden" },
      { to: '/groups/pages/1', icon: <AiOutlineUsergroupAdd />, span: 'Guruhlar', keys: 3, visible: role.includes('admin') || role.includes("director") || role.includes("user") ? "visible" : "hidden" },
      { to: '/orders/pages/1', icon: <AiFillFileText />, span: 'Buyurtma', keys: 4, visible: role.includes('admin') || role.includes("director") || role.includes("monitoring") || role.includes("user") ? "visible" : "hidden" },
      { to: '/supplies/pages/1', icon: <AiFillFolderOpen />, span: "Ta'minot", keys: 5, visible: role.includes('admin') || role.includes("director") || role.includes("monitoring") || role.includes("user") ? "visible" : "hidden" },
      { to: '/contracts/pages/1', icon: <AiFillFile />, span: 'Shartnoma', keys: 6, visible: role.includes('admin') || role.includes("director") || role.includes("user") ? "visible" : "hidden" },
      { to: '/client-marks/pages/1', icon: <AiOutlineBook />, span: 'KL1', keys: 7, visible: role.includes('admin') || role.includes("director") || role.includes("monitoring") ? "visible" : "hidden" },
      { to: '/branches/pages/1', icon: <BsBuilding />, span: 'Filiallar', keys: 8, visible: role.includes('admin') ? "visible" : "hidden" },
      { to: '/employees/pages/1', icon: <AiOutlineUsergroupAdd />, span: 'Xodimlar', keys: 9, visible: role.includes('admin') ? "visible" : "hidden" },
      { to: '/products/pages/1', icon: <AiOutlineFileAdd />, span: 'Mahsulotlar', keys: 10, visible: role.includes('admin') ? "visible" : "hidden" },
      { to: '/sections/pages/1', icon: <AiFillDatabase />, span: "Bo'limlar", keys: 11, visible: role.includes('admin') ? "visible" : "hidden" },
      { to: '/users/pages/1', icon: <AiOutlineUsergroupAdd />, span: 'Foydalanuvchilar', keys: 12, visible: role.includes('admin') ? "visible" : "hidden" },
      { to: '/calculator', icon: <AiOutlineCalculator />, span: 'Kalkulyator', keys: 13, visible: "visible" },
      { to: '/calendar', icon: <AiOutlineCalendar />, span: 'Kalendar', keys: 14, visible: role.includes('admin') ? "visible" : "hidden" }
   ]

   const keys = sidebarLink.filter(item => {
      let linkUrl = item.to.replace(/^\/|\/$/g, '').substring(0, 4);
      return currentPath.includes(linkUrl)
   })
   const key = keys.length > 1 ? keys[1].keys.toString() : keys[0].keys.toString()
   const [activeKey, setActiveKey] = useState(key);

   const handleTabClick = (key) => {
      setActiveKey(key);
      setSidebarActive(false)
   }

   return (
      <nav className={sidebarActive ? 'sidebar active' : isSidebarMini ? 'sidebar min_size' : 'sidebar'}>
         <div className="nav_content">
            <div className="sidebar_header">
               <Link to='/'>
                  <Logo isSidebarMini={isSidebarMini} />
               </Link>
               <div className="sidebar_close">
                  <IoCloseCircleOutline onClick={() => setSidebarActive(false)} />
               </div>
            </div>
            <button className="sidebar_resize" onClick={hendleChangeSidebarSize}>
               {!isSidebarMini ? <MdArrowBackIos /> : <MdArrowForwardIos />}
            </button>
            <Tabs
               activeKey={activeKey}
               onTabClick={handleTabClick}
               className="nav-list"
            >
               {
                  sidebarLink?.map(item => {
                     return (
                        <TabPane
                           tab={
                              <Link to={item?.to} className={`nav-item ${item?.visible}`}>
                                 <div className='nav-item_icon'>
                                    {item?.icon}
                                 </div>
                                 <span>{item?.span}</span>
                              </Link>
                           }
                           key={item?.keys} />
                     )
                  })
               }
            </Tabs>
         </div>
      </nav>
   )
}

export default memo(Sidebar);