import { memo } from "react"
import { RingProgressBar } from "../Charts/ChartCircle"

const CirceTotalBox = memo(({ title, amount, amount2, percentage, color, pieSize }) => {
   return (
      <div className='circle-total'>
         <div className='circle_total_parts'>
            <div className='total-part'>
               <p className='price-total'>
                  {amount}
               </p>
               {
                  amount2 && <p className='price-total'> {amount2} </p>
               }
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
            amount={`${statisticInfo?.clients?.all.toLocaleString(undefined, { minimumFractionDigits: 0 }) || 0} mijoz`}
         />
         <CirceTotalBox
            color={'yellow'}
            title={'Buyurtma'}
            amount={`${statisticInfo?.orders?.[statisticInfo?.orders?.length - 1]?.all.toLocaleString(undefined, { minimumFractionDigits: 0 }) || 0} dona`}
         />
         <CirceTotalBox
            pieSize={pieSize}
            title={'Berilgan kredit'}
            percentage={overData?.percentage / 100 || 0}
            amount={`${(overData?.fact / 1000000).toLocaleString(undefined, { minimumFractionDigits: 2 }) || 0} mln`}
         />
         <CirceTotalBox
            color={'green'}
            title={'Jinsi'}
            amount={`Erkak - ${overData?.male || 0} %` || 0}
            amount2={`Ayol - ${overData?.female || 0} %` || 0}
         />
      </div>
   )
})