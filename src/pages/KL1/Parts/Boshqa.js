import { useContext, useEffect, useState, useRef } from 'react'
import { useNavigate } from 'react-router-dom';
import { Textarea,Checkbox } from '@nextui-org/react'
import { NumericFormat } from 'react-number-format';
import { v4 as uuidv4 } from 'uuid';
import { AiOutlineDoubleRight, AiOutlineDoubleLeft } from 'react-icons/ai'
import { Context } from '../../../context/context';
import IncomeInput from '../../../components/KL1/IncomeInput';


function Boshqa() {
    const { setActiveTab } = useContext(Context)
    const { mavsumiyWindow, setMavsumiyWindow } = useContext(Context)
    const { biznesWindow, setBiznesWindow } = useContext(Context)
    const { myDaromads, setMyDaromads } = useContext(Context)
    const { checkMavsumiy, setCheckMavsumiy } = useContext(Context)
    const { checkBiznes,setCheckBiznes } = useContext(Context)
    const { checkOthers,setCheckOthers } = useContext(Context)


    useEffect(() => {
        setActiveTab(3)
    }, [])
    
    let navigate = useNavigate()

    function nextStep(){
        if(mavsumiyWindow == 'open'){
            navigate('/client-marks/add/mavsumiy', { replace: true });
        }else if(biznesWindow == 'open'){
            navigate('/client-marks/add/biznes', { replace: true });
        }else{
            navigate('/client-marks/add/6_qism', { replace: true });
        }
    }

    function backStep(){
        navigate("/client-marks/add/1_qism", { replace: true });
    }

    // My Daromads adding and deleting funtions
    function addMyDaromad(){
        let newMyDaromad = [{
            id: uuidv4(),
            name:'',
            volume:'',
            unit_price: 0,
            worth: 0,
            monthly: 0,
            comment:''
        }]
        setMyDaromads(myDaromads.concat(newMyDaromad))
    }
    function deleteMyDaromad(id){
        if(myDaromads.length > 1){
            let newMyDaromads = myDaromads.filter((item,index)=>item.id !== id)
            setMyDaromads(newMyDaromads)
        }
    }
    // get total price of Daromad
    const getTotalSum = () => {
        const newSumArray = []
        myDaromads.map((item, index) => {
            newSumArray.push(item.monthly)
        })
        let totalPrices = newSumArray.reduce((prev, current) => prev + current, 0)
        return totalPrices.toLocaleString()
    }


    function emptyCheck(a){
        if(a){
            return a
        }else{
            return 0
        }
    }

    function onPutDate(){
        setTimeout(()=>{
            nextStep()
        },500)
       
    }

    return (
        <>
        <h2 className='kl1_subtitle'>Buyurtmachining daromadlari</h2>
        <div className='kl1_radio'>
            <Checkbox size='md' color='secondary' isSelected={checkBiznes} 
                onChange={(e)=>{
                    if(e){
                        setBiznesWindow('open')
                    }else{
                        setBiznesWindow('close')
                    }
                    setCheckBiznes(e)
                }}
            >Biznes daromadlar</Checkbox>
            <Checkbox size='md' className='kl1_radio_checkbox' color='secondary' isSelected={checkMavsumiy} 
                onChange={(e)=>{
                    setCheckMavsumiy(e)
                    if(e){
                        setMavsumiyWindow('open')
                    }else{
                        setMavsumiyWindow('close')
                    }
                }}
            >Mavsumiy daromadlar</Checkbox>
            <Checkbox size='md' className='kl1_radio_checkbox' color='secondary' defaultSelected={checkOthers} idSelected={checkOthers}
                onChange={(e)=>{
                    setCheckOthers(e)
                }}
            >Boshqa daromadlar</Checkbox>
        </div>

        <p className='kl1_formtitle'>Boshqa daromad turlari shuningdek passiv daromadlar</p>

        {
            myDaromads?.map((item,index)=>{
                return(
                    <div className='kl1_products' key={item.id}>
                        <div className='kl1_product_title'>
                            Daromad {index + 1}
                            <button className='kl1_delete_button' onClick={()=>{deleteMyDaromad(item.id)}}><i className='bx bx-trash'></i></button>
                        </div>
                        <div className='kl1_product'>
                            <IncomeInput
                                contextData={myDaromads}
                                setContextData={setMyDaromads}
                                item={item}
                                index={index}
                                width={100}
                            />
                            <div className="numeric_format_input width_47">
                                <label>Hajmi</label>
                                <NumericFormat
                                    thousandSeparator={' '}
                                    value={myDaromads.find(x => x.id === item.id).volume}
                                    onChange={(e)=>{
                                        const changed_number = Number((e.target.value).replace(/\s/g, ''))
                                        const newBoshqaDaromads = [...myDaromads]
                                        newBoshqaDaromads[index].monthly = (changed_number)*(emptyCheck(newBoshqaDaromads[index].unit_price))
                                        newBoshqaDaromads[index].volume = changed_number
                                        setMyDaromads(newBoshqaDaromads)
                                    }}
                                />
                            </div>
                            <div className="numeric_format_input width_47">
                                <label>Birlik narxi</label>
                                <NumericFormat
                                    thousandSeparator={' '}
                                    value={myDaromads.find(x => x.id === item.id).unit_price}
                                    onChange={(e)=>{
                                        const changed_number = Number((e.target.value).replace(/\s/g, ''))
                                        const newBoshqaDaromads = [...myDaromads]
                                        newBoshqaDaromads[index].unit_price = changed_number
                                        newBoshqaDaromads[index].monthly = (changed_number)*(emptyCheck(newBoshqaDaromads[index].volume))
                                        setMyDaromads(newBoshqaDaromads)
                                    }}
                                />
                            </div>
                            <div className="numeric_format_input width_47">
                                <label>Qiymati</label>
                                <NumericFormat
                                    thousandSeparator={' '}
                                    value={myDaromads.find(x => x.id === item.id).worth}
                                    onChange={(e)=>{
                                        const changed_number = Number((e.target.value).replace(/\s/g, ''))
                                        const newBoshqaDaromads = [...myDaromads]
                                        newBoshqaDaromads[index].worth = changed_number
                                        setMyDaromads(newBoshqaDaromads)
                                    }}
                                />
                            </div>
                            <div className="numeric_format_input width_47">
                                <label>Oylik daromad</label>
                                <NumericFormat
                                    thousandSeparator={' '}
                                    value={emptyCheck((myDaromads[index].unit_price)*(myDaromads[index].volume))}
                                    onChange={(e)=>{
                                        const changed_number = Number((e.target.value).replace(/\s/g, ''))
                                        const newBoshqaDaromads = [...myDaromads]
                                        newBoshqaDaromads[index].monthly = changed_number
                                        setMyDaromads(newBoshqaDaromads)
                                    }}
                                />
                            </div>
                            <Textarea
                                width='100%'
                                bordered
                                rounded
                                color="secondary"
                                className='kl1_input'
                                label='Izoh'
                                value={myDaromads.find(x => x.id === item.id).comment}
                                onChange={(e)=>{
                                    const newBoshqaDaromads = [...myDaromads]
                                    newBoshqaDaromads[index].comment = e.target.value
                                    setMyDaromads(newBoshqaDaromads)
                                }}
                            />
                        </div>
                    </div>
                )
            })
        }
        <div className='kl1_product_footer'>
            <button className='kl1_add_button' onClick={()=>{addMyDaromad()}}>
                Daromad qoshish
            </button>
            <p className='kl1_jami'>JAMI: {getTotalSum()} so'm</p>
        </div>
        <p className='kl1_jami_main'>Jami o'rtacha oylik daromadlari: {getTotalSum()} so'm</p>
        <div className='step_buttons double_button'>
            <button type='button' onClick={()=>{backStep()}} className='previous_button'><AiOutlineDoubleLeft/><p>Oldingi</p></button>
            <button type='submit' onClick={()=>{onPutDate()}} className='step_next'><p>Keyingi</p> <AiOutlineDoubleRight/></button>
        </div>
    </>
  )
}

export default Boshqa