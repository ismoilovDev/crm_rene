import { useState, useEffect } from 'react'
import { LittleStatistics } from '../../components/Statistics/LittleStatistics'
import { MainStatistics } from '../../components/Statistics/MainStatistics'
import { LineStatistics } from '../../components/Statistics/LineStatistics'
import { BigStatistics } from '../../components/Statistics/BigStatistics'
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
         <LittleStatistics pieSize={pieSize} statisticInfo={statisticInfo} overData={overData} />
         <MainStatistics overData={overData} />
         <BigStatistics statisticInfo={statisticInfo} />
         <LineStatistics orders={statisticInfo?.orders} />
      </section>
   )
}

export default Home