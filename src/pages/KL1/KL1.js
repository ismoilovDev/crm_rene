import { useState } from 'react'
import { Link } from 'react-router-dom'
import { Tabs } from 'antd';
import { AiOutlineUserAdd, AiOutlineClear, AiOutlineRollback } from 'react-icons/ai'
import Shaxshiy from './Parts/Malumot'
import Table from './Parts/Table'
import FirstKl1 from './Parts/Qism1'
import Boshqa from './Parts/Boshqa'
import Oilaviy from './Parts/Qism6'
import BuyurtmaOylik from './Parts/Qism7'
import Mavsumiy from './Parts/Mavsumiy'
import Biznes from './Parts/Biznes'

const { TabPane } = Tabs;

function KL1() {
   const [biznesWindow, setBiznesWindow] = useState('close')
   const [mavsumiyWindow, setMavsumiyWindow] = useState('close')
   const [resetWarning, setResetWarning] = useState('warning_reset_main close')

   function openReset(e) {
      e.preventDefault()
      setResetWarning('warning_reset_main open')
   }

   function closeReset(e) {
      e.preventDefault()
      setResetWarning('warning_reset_main close')
   }

   const onChangeTabs = () => {};

   function mavsumiyPage() {
      if (mavsumiyWindow == 'open') {
         return (
            <TabPane tab="Mavsumiy" key="4">
               <Mavsumiy />
            </TabPane>
         )
      } else {
         <></>
      }
   }

   function biznesPage() {
      if (biznesWindow == 'open') {
         return (
            <TabPane tab="Biznes" key="5">
               <Biznes />
            </TabPane>
         )
      } else {
         <></>
      }
   }

   return (
      <>
         <div className={resetWarning}>
            <p>Haqiqatan ham ma'lumontlarni qayta tiklamoqchimisiz?</p>
            <div >
               <button onClick={closeReset}>Ha</button>
               <button onClick={closeReset}>Yoq</button>
            </div>
         </div>
         <Link to='/kl1' className='clientform_back back-back'>
            <AiOutlineRollback />
            Orqaga
         </Link>

         <section className='kl1'>
            <div className='kl1_title'>
               <h1>Kreditga layoqatilikni baholash varaqasi </h1>
            </div>
            <div className='kl1_tabs_main'>
               <div className='kl1_content'>
                  <Tabs defaultActiveKey="1" onChange={onChangeTabs}>
                     <TabPane tab="Ma'lumot" key="1">
                        <Shaxshiy />
                     </TabPane>
                     <TabPane tab="1 qism" key="2">
                        <FirstKl1 />
                     </TabPane>
                     <TabPane tab="Boshqa" key="3">
                        <Boshqa
                           mavsumiyWindow={mavsumiyWindow}
                           setMavsumiyWindow={setMavsumiyWindow}
                           biznesWindow={biznesWindow}
                           setBiznesWindow={setBiznesWindow}
                        />
                     </TabPane>
                     {
                        mavsumiyPage()
                     }
                     {
                        biznesPage()
                     }
                     <TabPane tab="6 qism" key="6">
                        <Oilaviy />
                     </TabPane>
                     <TabPane tab="7 qism" key="7">
                        <BuyurtmaOylik />
                     </TabPane>
                     <TabPane tab="Jadvali" key="8">
                        <Table />
                     </TabPane>
                  </Tabs>
               </div>
               <div className='submit-buttons'>
                  <button className='client_submit reset' onClick={openReset}>
                     Formani tiklash
                     <AiOutlineClear />
                  </button>
                  <button type='submit' className='client_submit submit'>
                     Formani qo'shish
                     <AiOutlineUserAdd />
                  </button>
               </div>
            </div>
         </section>
      </>
   )
}

export default KL1
