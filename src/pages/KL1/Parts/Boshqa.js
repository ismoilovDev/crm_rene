import { useContext,useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import { Input, Textarea,Checkbox } from '@nextui-org/react'
import { NumericFormat } from 'react-number-format';
import { v4 as uuidv4 } from 'uuid';
import { AiOutlineDoubleRight, AiOutlineDoubleLeft } from 'react-icons/ai'
import { Context } from '../../../context/context';

function Boshqa() {
    const { activeTab, setActiveTab } = useContext(Context)
    const { mavsumiyWindow, setMavsumiyWindow } = useContext(Context)
    const { biznesWindow, setBiznesWindow } = useContext(Context)
    const { myDaromads, setMyDaromads } = useContext(Context)
    const { checkMavsumiy, setCheckMavsumiy } = useContext(Context)
    const { checkBiznes,setCheckBiznes } = useContext(Context)
    const { checkOthers,setCheckOthers } = useContext(Context)
    const { familyMemCheck } = useContext(Context)

    useEffect(() => {
        setActiveTab(3)
    }, [])
    
    let navigate = useNavigate()

    function nextStep(){
        if(mavsumiyWindow == 'open'){
            navigate('/kl1/addkl1/mavsumiy', { replace: true });
        }else if(biznesWindow == 'open'){
            navigate('/kl1/addkl1/biznes', { replace: true });
        }else{
            navigate('/kl1/addkl1/6_qism', { replace: true });
        }
    }

    function backStep(){
        navigate("/kl1/addkl1/1_qism", { replace: true });
    }

    // My Daromads adding and deleting funtions
    function addMyDaromad(){
        let newMyDaromad = [{
            id: uuidv4(),
            nomi:'',
            qiymati:'',
            birlikNarxi:0,
            hajmi:0,
            oylik:0,
            izoh:''
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
            newSumArray.push(item.oylik)
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
                            <Input
                                rounded
                                bordered
                                label='Daromad nomi'
                                color="secondary"
                                width='100%'
                                className='kl1_input'
                                value={myDaromads.find(x => x.id === item.id).nomi}
                                onChange={(e)=>{
                                    const newBoshqaDaromads = [...myDaromads]
                                    newBoshqaDaromads[index].nomi = e.target.value
                                    setMyDaromads(newBoshqaDaromads)
                                }}
                            />
                            <div className="numeric_format_input width_47">
                                <label>Hajmi</label>
                                <NumericFormat
                                    thousandSeparator={' '}
                                    value={myDaromads.find(x => x.id === item.id).hajmi}
                                    onChange={(e)=>{
                                        const changed_number = Number((e.target.value).replace(/\s/g, ''))
                                        const newBoshqaDaromads = [...myDaromads]
                                        newBoshqaDaromads[index].oylik = (changed_number)*(emptyCheck(newBoshqaDaromads[index].birlikNarxi))
                                        newBoshqaDaromads[index].hajmi = changed_number
                                        setMyDaromads(newBoshqaDaromads)
                                    }}
                                />
                            </div>
                            <div className="numeric_format_input width_47">
                                <label>Birlik narxi</label>
                                <NumericFormat
                                    thousandSeparator={' '}
                                    value={myDaromads.find(x => x.id === item.id).birlikNarxi}
                                    onChange={(e)=>{
                                        const changed_number = Number((e.target.value).replace(/\s/g, ''))
                                        const newBoshqaDaromads = [...myDaromads]
                                        newBoshqaDaromads[index].birlikNarxi = changed_number
                                        newBoshqaDaromads[index].oylik = (changed_number)*(emptyCheck(newBoshqaDaromads[index].hajmi))
                                        setMyDaromads(newBoshqaDaromads)
                                    }}
                                />
                            </div>
                            <div className="numeric_format_input width_47">
                                <label>Qiymati</label>
                                <NumericFormat
                                    thousandSeparator={' '}
                                    value={myDaromads.find(x => x.id === item.id).qiymati}
                                    onChange={(e)=>{
                                        const changed_number = Number((e.target.value).replace(/\s/g, ''))
                                        const newBoshqaDaromads = [...myDaromads]
                                        newBoshqaDaromads[index].qiymati = changed_number
                                        setMyDaromads(newBoshqaDaromads)
                                    }}
                                />
                            </div>
                            <div className="numeric_format_input width_47">
                                <label>Oylik daromad</label>
                                <NumericFormat
                                    thousandSeparator={' '}
                                    value={emptyCheck((myDaromads[index].birlikNarxi)*(myDaromads[index].hajmi))}
                                    onChange={(e)=>{
                                        const changed_number = Number((e.target.value).replace(/\s/g, ''))
                                        const newBoshqaDaromads = [...myDaromads]
                                        newBoshqaDaromads[index].oylik = changed_number
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
                                value={myDaromads.find(x => x.id === item.id).izoh}
                                onChange={(e)=>{
                                    const newBoshqaDaromads = [...myDaromads]
                                    newBoshqaDaromads[index].izoh = e.target.value
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