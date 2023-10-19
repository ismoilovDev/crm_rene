import { memo } from "react"

export const CircleStatistic = memo(({ statisticInfo }) => {
   return (
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
   )
})