import { memo, useEffect } from "react";
import { NavLink } from 'react-router-dom';

const tabs = [
   {
      id: 1,
      label: `Mijoz haqida`,
      navigate: '/'
   },
   {
      id: 2,
      label: `Ta'minot`,
      navigate: '/supply-info-tab'
   },
   {
      id: 3,
      label: `Buyurtma`,
      navigate: '/orders-tab'
   },
   {
      id: 4,
      label: `Shartnoma`,
      navigate: '/contracts-tab'
   },
   {
      id: 5,
      label: `Ochiq kredit `,
      navigate: '/open-contract-tab'
   },
   {
      id: 6,
      label: `Monitoring`,
      navigate: '/monitoring-tab'
   },
   {
      id: 7,
      label: `Depozit`,
      navigate: '/depozit'
   },
   {
      id: 8,
      label: `Fayllar`,
      navigate: '/files'
   },
   {
      id: 9,
      label: `Kafillik`,
      navigate: '/surety'
   },
]

export const TabPanel = memo(({ id }) => {

   useEffect(() => {
      const handleScroll = () => {
         const tabsContainer = document.querySelector('.tab_panel');
         if (tabsContainer) {
            const isSticky = tabsContainer.getBoundingClientRect().top <= 0;
            if (isSticky) {
               tabsContainer.classList.add('sticky');
            } else {
               tabsContainer.classList.remove('sticky');
            }
         }
      };

      window.addEventListener('scroll', handleScroll);
      return () => {
         window.removeEventListener('scroll', handleScroll);
      };
   }, []);

   return (
      <div className="tab_panel">
         <ul className="tab_panel_list">
            {
               tabs?.map(item => (
                  <li
                     key={item.label}
                     className={"tab"}
                  >
                     <NavLink to={`/clients/${id}${item?.navigate}`} activeclassname="active_tab">{item?.label}</NavLink>
                  </li>
               ))
            }
         </ul>
      </div>
   )
})
