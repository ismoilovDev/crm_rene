import { memo } from "react"

export const InputSingle = memo(({label, value}) =>{
    return(
        <div className='single_buyurtma_inputs'>
            <p>{label}</p>
            <p>{value}</p>
        </div>
    )
})