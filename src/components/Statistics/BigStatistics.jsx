import { memo } from 'react'
import { DemoDualAxes } from '../Charts/ChartBar';
import { DemoBar } from '../Charts/ChartHoriz';

export const BigStatistics = memo(({ statisticInfo }) => {
   return (
      <div className='big-statistics'>
         <div className='barChart'>
            {statisticInfo?.orders ? <DemoDualAxes orders={statisticInfo?.orders} /> : null}
         </div>

         <div className='horizChart'>
            <DemoBar products={statisticInfo?.products} />
         </div>
      </div>
   )
})
