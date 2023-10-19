import { memo } from 'react';
import { Input } from '@nextui-org/react'

export const InputDate = memo(({value, setValue, input_name, label, register}) =>{

    function toDay(){
        const today = new Date();
        const todayDate = today.getFullYear() + '-' + ('0' + (today.getMonth() + 1)).slice(-2) + '-' + ('0' + today.getDate()).slice(-2);
        
        let data = {...value}
        data[input_name] = todayDate
        setValue(data)

        register(input_name)
    }

    return(
        <div className="input_wrapper">
            <Input
                rounded
                bordered
                label={label}
                type='date'
                color="secondary"
                width='100%'
                className='input_date'
                value={value?.[input_name]}
                {...register(`${input_name}`, { required: false })}
                onChange={(e)=>{
                    let data = {...value}
                    data[input_name] = e.target.value
                    setValue(data)
                }}
            />
            <button className='today_button' type='button' onClick={()=>{toDay()}}>bugun</button>
        </div>
    )
})