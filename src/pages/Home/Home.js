import { useState, useEffect } from 'react'
import { MainStatistics } from '../../components/Statistics/MainStatistics'
import { BigStatistics } from '../../components/Statistics/BigStatistics'
import DemoRingProgress from '../../components/Charts/ChartCircle'
import DemoRingProgress2 from '../../components/Charts/ChartCircle2'
import { LineStatistics } from '../../components/Statistics/LineStatistics'
import https from '../../services/https'

const branch_id = window.localStorage.getItem('branch_id')

function Home() {
   const [pieSize, setPieSize] = useState(80)
   const [overData, setOverData] = useState([])
   const [statisticInfo, setStatisticInfo] = useState({})

   const getStatistics = async () => {
      try {
         const { data } = await https.get('/statistics')
         setStatisticInfo(data)
         console.log(data, 'data');
      }
      catch (err) {
         console.log(err)
      }
   }

   const getOwerDate = async () => {
      try {
         const { data } = await https.get(`/statistics/${branch_id}`)
         setOverData(data?.data)
      }
      catch (err) {
         console.log(err)
      }
   }

   useEffect(() => {
      if (window.innerWidth >= 1600) {
         setPieSize(100)
      }
      const getBranchDetails = async () => {
         try {
            await getStatistics()
            await getOwerDate()
         } catch (err) {
            console.log(err)
         }
      }
      getBranchDetails()
   }, [])

   return (
      <section>
         <div className='little-statistics'>
            {/* first */}
            <div className='circle-total'>
               <div className='circle_total_parts'>
                  <div className='total-part'>
                     <p className='price-total'>
                        {((statisticInfo?.branch_portfolio?.currentMonth) / 1000000).toFixed(2)} mln so'm
                     </p>
                     <p className='total-text'>
                        Portfel
                     </p>
                  </div>
                  <div className='total-part-circle-blue'>
                     <i className='bx bx-bar-chart'></i>
                  </div>
               </div>
               <div className='total-end'>
                  <p className={(statisticInfo?.branch_portfolio?.pointer == 'up') ? 'total-end-text-green' : 'total-end-text-red'}>
                     <span>
                        {
                           statisticInfo?.branch_portfolio?.pointer == 'up' ?
                              <i className='bx bx-up-arrow-alt'></i> :
                              <i className='bx bx-down-arrow-alt'></i>
                        }
                        {
                           statisticInfo?.branch_portfolio?.pointer == 'up' ?
                              ((statisticInfo?.branch_portfolio?.currentMonth / statisticInfo?.branch_portfolio?.all) * 100 - (statisticInfo?.branch_portfolio?.lastMonth / statisticInfo?.branch_portfolio?.all) * 100).toFixed(2) :
                              ((statisticInfo?.branch_portfolio?.lastMonth / statisticInfo?.branch_portfolio?.all) * 100 - (statisticInfo?.branch_portfolio?.currentMonth / statisticInfo?.branch_portfolio?.all) * 100).toFixed(2)
                        }%</span>o'tgan oyga ko'ra
                  </p>
               </div>
            </div>

            {/* second */}
            <div className='circle-total'>
               <div className='circle_total_parts'>
                  <div className='total-part'>
                     <p className='price-total'>
                        {statisticInfo?.orders?.[statisticInfo?.orders?.length - 1]?.currentMonth} dona
                     </p>
                     <p className='total-text'>
                        Buyurtma
                     </p>
                  </div>
                  <div className='total-part-circle-pie'>
                     <DemoRingProgress procent={(statisticInfo?.orders?.[statisticInfo?.orders?.length - 1]?.currentMonth / statisticInfo?.orders?.[statisticInfo?.orders?.length - 1]?.all).toFixed(2)} size={pieSize} />
                  </div>
               </div>
               <div className='total-end'>
                  <p className={(statisticInfo?.orders?.[statisticInfo?.orders?.length - 1]?.pointer == 'up') ? 'total-end-text-green' : 'total-end-text-red'}>
                     <span>
                        {
                           statisticInfo?.orders?.[statisticInfo?.orders?.length - 1]?.pointer == 'up' ?
                              <i className='bx bx-up-arrow-alt'></i> :
                              <i className='bx bx-down-arrow-alt'></i>
                        }
                        {
                           statisticInfo?.orders?.[statisticInfo?.orders?.length - 1]?.pointer == 'up' ?
                              ((statisticInfo?.orders?.[statisticInfo?.orders?.length - 1]?.currentMonth / statisticInfo?.orders?.[statisticInfo?.orders?.length - 1]?.all) * 100 - (statisticInfo?.orders?.[statisticInfo?.orders?.length - 1]?.lastMonth / statisticInfo?.orders?.[statisticInfo?.orders?.length - 1]?.all) * 100).toFixed(2) :
                              ((statisticInfo?.orders?.[statisticInfo?.orders?.length - 1]?.lastMonth / statisticInfo?.orders?.[statisticInfo?.orders?.length - 1]?.all) * 100 - (statisticInfo?.orders?.[statisticInfo?.orders?.length - 1]?.currentMonth / statisticInfo?.orders?.[statisticInfo?.orders?.length - 1]?.all) * 100).toFixed(2)
                        }%</span>o'tgan oyga ko'ra
                  </p>
               </div>
            </div>

            {/* third */}
            <div className='circle-total'>
               <div className='circle_total_parts'>
                  <div className='total-part'>
                     <p className='price-total'>
                        {statisticInfo?.clients?.currentMonth} mijoz
                     </p>
                     <p className='total-text'>
                        Mijoz
                     </p>
                  </div>
                  <div className='total-part-circle-pie'>
                     <DemoRingProgress2 procent={(statisticInfo?.clients?.currentMonth / statisticInfo?.clients?.all).toFixed(2)} size={pieSize} />
                  </div>
               </div>
               <div className='total-end'>
                  <p className={(statisticInfo?.clients?.pointer == "up") ? 'total-end-text-green' : 'total-end-text-red'}>
                     <span>
                        {
                           (statisticInfo?.clients?.pointer == "up") ?
                              <i className='bx bx-up-arrow-alt'></i> :
                              <i className='bx bx-down-arrow-alt'></i>
                        }{
                           statisticInfo?.clients?.pointer == "up" ?
                              ((statisticInfo?.clients?.currentMonth / statisticInfo?.clients?.all - statisticInfo?.clients?.lastMonth / statisticInfo?.clients?.all) * 100)?.toFixed(2) :
                              ((statisticInfo?.clients?.lastMonth / statisticInfo?.clients?.all - statisticInfo?.clients?.currentMonth / statisticInfo?.clients?.all) * 100)?.toFixed(2)
                        }%</span>o'tgan oyga ko'ra
                  </p>
               </div>
            </div>

            {/* fourth */}
            <div className='circle-total'>
               <div className='circle_total_parts'>
                  <div className='total-part'>
                     <p className='price-total'>
                        {
                           statisticInfo?.branch_portfolio?.pointer == 'up' ?
                              <i className='bx bx-up-arrow-alt'></i> :
                              <i className='bx bx-down-arrow-alt'></i>
                        }
                        {
                           statisticInfo?.branch_portfolio?.pointer == 'up' ?
                              ((statisticInfo?.branch_portfolio?.currentMonth / statisticInfo?.branch_portfolio?.all) * 100 - (statisticInfo?.branch_portfolio?.lastMonth / statisticInfo?.branch_portfolio?.all) * 100).toFixed(2) :
                              ((statisticInfo?.branch_portfolio?.lastMonth / statisticInfo?.branch_portfolio?.all) * 100 - (statisticInfo?.branch_portfolio?.currentMonth / statisticInfo?.branch_portfolio?.all) * 100).toFixed(2)
                        }%
                     </p>
                     <p className='total-text'>
                        O'sish
                     </p>
                  </div>
                  <div className='total-part-circle-yellow'>
                     <i className='bx bx-bar-chart'></i>
                  </div>
               </div>
               <div className='total-end'>
                  <p className={(statisticInfo?.branch_portfolio?.pointer == "up") ? 'total-end-text-green' : 'total-end-text-red'}>
                     <span>
                        {
                           statisticInfo?.branch_portfolio?.pointer == 'up' ?
                              <i className='bx bx-up-arrow-alt'></i> :
                              <i className='bx bx-down-arrow-alt'></i>
                        }
                        {
                           statisticInfo?.branch_portfolio?.pointer == 'up' ?
                              ((statisticInfo?.branch_portfolio?.currentMonth / statisticInfo?.branch_portfolio?.all) * 100 - (statisticInfo?.branch_portfolio?.lastMonth / statisticInfo?.branch_portfolio?.all) * 100).toFixed(2) :
                              ((statisticInfo?.branch_portfolio?.lastMonth / statisticInfo?.branch_portfolio?.all) * 100 - (statisticInfo?.branch_portfolio?.currentMonth / statisticInfo?.branch_portfolio?.all) * 100).toFixed(2)
                        }%</span>o'tgan oyga ko'ra
                  </p>
               </div>
            </div>

         </div>
         <MainStatistics overData={overData} />
         <BigStatistics statisticInfo={statisticInfo} />
         <LineStatistics orders={statisticInfo?.orders}/>
      </section>
   )
}


export default Home