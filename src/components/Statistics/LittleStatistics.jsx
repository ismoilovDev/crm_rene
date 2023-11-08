import { memo } from "react"
import { RingProgressBar } from "../Charts/ChartCircle"

const CirceTotalBox = memo(({ title, amount, percentage, color, pieSize }) => {
   return (
      <div className='circle-total'>
         <div className='circle_total_parts'>
            <div className='total-part'>
               <p className='price-total'>
                  {amount}
               </p>
               <p className='total-text'>
                  {title}
               </p>
            </div>
            {
               color ?
                  <div className={`total-part-circle-${color}`}>
                     <i className='bx bx-bar-chart'></i>
                  </div> :
                  <div className='total-part-circle-pie'>
                     <RingProgressBar procent={percentage} size={pieSize} />
                  </div>
            }
         </div>
      </div>
   )
})

export const LittleStatistics = memo(({ statisticInfo, overData, pieSize }) => {

   return (
      <div className='little-statistics'>
         <CirceTotalBox
            color={'blue'}
            title={'Mijoz'}
            amount={`${statisticInfo?.clients?.all || 0} mijoz`}
         />
         <CirceTotalBox
            color={'yellow'}
            title={'Buyurtma'}
            amount={`${statisticInfo?.orders?.[statisticInfo?.orders?.length - 1]?.all || 0} dona`}
         />
         <CirceTotalBox
            color={'green'}
            title={'Gender'}
            amount={`E - ${overData?.male || 0} % / A - ${overData?.female || 0} %` || 0}
         />
         <CirceTotalBox
            pieSize={pieSize}
            title={'Berilgan kredit'}
            percentage={overData?.percentage / 100 || 0}
            amount={`${(overData?.fact / 1000000).toFixed(2) || 0} mln`}
         />
      </div>
   )
})