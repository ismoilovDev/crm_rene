import React, { useState } from 'react'
import { Input } from '@nextui-org/react'
import { incomeList } from './incomeList'
import './style.css'

const IncomeInput = ({contextData, setContextData, item, index, width }) => {
    const [incomes, setIncomes] = useState([incomeList])
    const [focusedInd, setFocusedInd] = useState(null)
    const [focusedOption, setFocusedOption] = useState(0)

    const handleSearch = (searchText) => {
        const filteredOptions = incomeList?.filter(option =>
            option?.toLowerCase()?.includes(searchText?.toLowerCase())
        )
        setIncomes(filteredOptions);
    }

    return (
        <div className='income_select_container' style={{width: `${width}%`}}>
            <Input
                rounded
                bordered
                label='Daromad nomi'
                color="secondary"
                width='100%'
                className='kl1_input'
                value={contextData?.find(x => x?.id === item?.id)?.name}
                onChange={(e)=>{
                    const newArray = [...contextData]
                    newArray[index].name = e.target.value
                    setContextData(newArray)
                    handleSearch(e.target.value)
                    setFocusedInd(index)
                }}
                onKeyDown={(event)=>{
                    if(event.key === 'Enter'){
                        if(contextData?.find(x => x?.id === item?.id)?.name !== incomes[focusedOption]){
                            const newArray = [...contextData]
                            newArray[index].name = incomes[focusedOption]
                            setContextData(newArray)
                        }
                        setFocusedInd(null)
                        setFocusedOption(0)
                    }
                    if(event.key === 'ArrowUp' && focusedOption>0){
                        setFocusedOption(focusedOption - 1)
                    }
                    if(event.key === 'ArrowDown'){
                        if(focusedOption !== (incomes?.length - 1)){
                            setFocusedOption(focusedOption + 1)
                        }else{
                            setFocusedOption(0)
                        }
                    }
                }}
            />
            {
                contextData?.find(x => x?.id === item?.id)?.name?.length !== 0 && incomes?.length !== 0 && focusedInd === index?
                <div className='income_options'>
                    {
                        incomes?.map((income, ind) =>(
                            <p className={focusedOption === ind ? 'focused_option' : ''} key={income} onClick={()=>{
                                const newArray = [...contextData]
                                newArray[index].name = income
                                setContextData(newArray)
                                setIncomes([])
                                setFocusedInd(null)
                            }}>{income}</p>
                        ))
                    }
                </div> : <></>
            }
        </div>
    )
}

export default IncomeInput