import { memo } from 'react'
import LineGraph from '../Charts/LineGraph'

export const LineStatistics = memo(({ orders }) => {
    return (
        <div className='line_statistics'>
            <LineGraph orders={orders} />
        </div>
    )
})