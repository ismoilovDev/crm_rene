import { useContext,useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import { Input, Textarea } from '@nextui-org/react'
import { v4 as uuidv4 } from 'uuid';
import { Context } from '../../../../context/context';
import { AiOutlineDoubleRight, AiOutlineDoubleLeft } from 'react-icons/ai'
import { NumericFormat } from 'react-number-format';


function EditBiznes() {
    const { activeTab, setActiveTab } = useContext(Context)
    const { mavsumiyWindow, setMavsumiyWindow } = useContext(Context)
    const { biznesDaromads, setBiznesDaromads } = useContext(Context)
    const { biznesXarajats, setBiznesXarajats } = useContext(Context)

    useEffect(() => {
        setActiveTab(5)
    }, [])

    let navigate = useNavigate()
    
    function backStep(){
        if(mavsumiyWindow === 'open'){
            navigate("/kl1/editkl1/mavsumiy", { replace: true });
        }else{
            navigate("/kl1/editkl1/boshqa", { replace: true });
        }
    }

    // Biznes Daromads adding and deleting functions
    function addBiznesDaromad(){
        let newBiznesDaromad = [{
            id:uuidv4(),
            name:'',
            monthly_volume:0,
            unit_price:0,
            average_price:0,
            monthly_income:0,
            comment:''
        }]
        setBiznesDaromads(biznesDaromads.concat(newBiznesDaromad))
    }
    function deleteBiznesDaromad(id){
        if(biznesDaromads?.length > 1){
            let newBiznesDaromads = biznesDaromads?.filter((item,index)=>index !== id)
            setBiznesDaromads(newBiznesDaromads)
        }else if(biznesDaromads?.length===1){
            setBiznesDaromads([])
        }
    }

    function getSumDaromad(){
        let newBiznesDaromad = []
        biznesDaromads.map((item,index)=>{
            newBiznesDaromad.push(item.monthly_income)
        })
        let totalDaromad = newBiznesDaromad.reduce((prev,current)=> Number(prev) + Number(current), 0)
        return totalDaromad
    }


    // Biznes Xarajats adding and deleting functions
    function addBiznesXarajat(){
        let newBiznesXarajat = [{
            id:uuidv4(),
            name:'',
            volume:0,
            price:0,
            value:0,
            average_monthly_expense:0,
            comment:''
        }]
        setBiznesXarajats(biznesXarajats.concat(newBiznesXarajat))
    }
    function deleteBiznesXarajat(id){
        if(biznesXarajats.length > 1){
            let newBiznesXarajats = biznesXarajats.filter((item,index)=>index !== id)
            setBiznesXarajats(newBiznesXarajats)
        }else if(biznesXarajats?.length===1){
            setBiznesXarajats([])
        }
    }

    function getSumXarajat(){
        let newBiznesXarajat = []
        biznesXarajats.map((item,index)=>{
            newBiznesXarajat.push(item.average_monthly_expense)
        })
        let totalXarajat = newBiznesXarajat.reduce((prev,current)=> Number(prev) + Number(current), 0)
        return totalXarajat
    }

    function nextStep(){
        navigate('/kl1/editkl1/6_qism', { replace: true });
    }

    function onSubmit(){
        setTimeout(()=>{
            nextStep()
        },500)
    }

    return (
        <section>
            <div>
                <p className='kl1_formtitle'>Biznes daromadlar turi</p>

                {
                    biznesDaromads?.map((item,index)=>{
                        return(
                        <div className='kl1_products' key={item?.id}>
                            <div className='kl1_product_title'>
                            Biznes daromad {index +1}
                                <button className='kl1_delete_button' onClick={()=>{deleteBiznesDaromad(index)}}><i className='bx bx-trash'></i></button>
                            </div>
                            <div className='kl1_product'>
                                <Input
                                    rounded
                                    bordered
                                    label='Daromad nomi'
                                    color="secondary"
                                    width='100%'
                                    className='kl1_input'
                                    value={biznesDaromads.find(x => x.id === item.id).name}
                                    onChange={(e)=>{
                                        let newBiznesDaromadArr = [...biznesDaromads]
                                        newBiznesDaromadArr[index].name = e.target.value
                                        setBiznesDaromads(newBiznesDaromadArr)
                                    }}
                                />
                                <div className="numeric_format_input width_47">
                                    <label>Oylik hajm</label>
                                    <NumericFormat
                                        thousandSeparator={' '}
                                        value={biznesDaromads.find(x => x.id === item.id).monthly_volume}
                                        onChange={(e)=>{
                                            const changed_number = Number((e.target.value).replace(/\s/g, ''))
                                            const newBiznesDaromadArr = [...biznesDaromads]
                                            newBiznesDaromadArr[index].monthly_volume = changed_number
                                            newBiznesDaromadArr[index].monthly_income = (changed_number)*((newBiznesDaromadArr[index].average_price)/100)*(newBiznesDaromadArr[index].unit_price)
                                            setBiznesDaromads(newBiznesDaromadArr)
                                        }}
                                    />
                                </div>
                                <div className="numeric_format_input width_47">
                                    <label>1 birlikning o`rtacha sotish naxri</label>
                                    <NumericFormat
                                        thousandSeparator={' '}
                                        value={biznesDaromads.find(x => x.id === item.id).unit_price}
                                        onChange={(e)=>{
                                            const changed_number = Number((e.target.value).replace(/\s/g, ''))
                                            const newBiznesDaromadArr = [...biznesDaromads]
                                            newBiznesDaromadArr[index].unit_price = changed_number
                                            newBiznesDaromadArr[index].monthly_income = (changed_number)*((newBiznesDaromadArr[index].average_price)/100)*(newBiznesDaromadArr[index].monthly_volume)
                                            setBiznesDaromads(newBiznesDaromadArr)
                                        }}
                                    />
                                </div>
                                <Input
                                    rounded
                                    bordered
                                    label='O`rtacha ustamasi % da'
                                    color="secondary"
                                    width='47%'
                                    type='number'
                                    onWheel={(e) => e.target.blur()}
                                    className='kl1_input'
                                    value={biznesDaromads.find(x => x.id === item.id).average_price}
                                    onChange={(e)=>{
                                        let newBiznesDaromadArr = [...biznesDaromads]
                                        newBiznesDaromadArr[index].average_price = e.target.value
                                        newBiznesDaromadArr[index].monthly_income = (newBiznesDaromadArr[index].monthly_volume)*((e.target.value)/100)*(newBiznesDaromadArr[index].unit_price)
                                        setBiznesDaromads(newBiznesDaromadArr)
                                    }}
                                />
                                <div className="numeric_format_input width_47">
                                    <label>Bir oylik daromad</label>
                                    <NumericFormat
                                        thousandSeparator={' '}
                                        value={biznesDaromads.find(x => x.id === item.id).monthly_income}
                                        onChange={(e)=>{
                                            const changed_number = Number((e.target.value).replace(/\s/g, ''))
                                            const newBiznesDaromadArr = [...biznesDaromads]
                                            newBiznesDaromadArr[index].monthly_income = changed_number
                                            setBiznesDaromads(newBiznesDaromadArr)
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
                                    value={biznesDaromads.find(x => x.id === item.id).comment}
                                    onChange={(e)=>{
                                        let newBiznesDaromadArr = [...biznesDaromads]
                                        newBiznesDaromadArr[index].comment = e.target.value
                                        setBiznesDaromads(newBiznesDaromadArr)
                                    }}
                                />
                            </div>
                        </div>
                        )
                    })
                }
                <div className='kl1_product_footer'>
                    <button className='kl1_add_button' onClick={()=>{addBiznesDaromad()}}>
                        Biznes daromad qoshish
                    </button>
                    <p className='kl1_jami'>JAMI: {getSumDaromad()?.toLocaleString()} so`m</p>  
                </div>
            </div>
                
            <div>
                    <p className='kl1_formtitle'>Biznes uchun xarajatlar</p>

                    {
                        biznesXarajats?.map((item,index)=>{
                            return(
                            <div className='kl1_products' key={index}>
                                <div className='kl1_product_title'>
                                Biznes xarajat {index +1}
                                    <button className='kl1_delete_button' onClick={()=>{deleteBiznesXarajat(index)}}><i className='bx bx-trash'></i></button>
                                </div>
                                <div className='kl1_product'>
                                    <Input
                                        rounded
                                        bordered
                                        label='Xarajat nomi'
                                        color="secondary"
                                        width='100%'
                                        className='kl1_input'
                                        value={biznesXarajats.find(x => x.id === item.id).name}
                                        onChange={(e)=>{
                                        let newBiznesXarajatArr = [...biznesXarajats]
                                        newBiznesXarajatArr[index].name = e.target.value
                                        setBiznesXarajats(newBiznesXarajatArr)
                                    }}
                                    />
                                    <div className="numeric_format_input width_47">
                                        <label>Hajm</label>
                                        <NumericFormat
                                            thousandSeparator={' '}
                                            value={biznesXarajats.find(x => x.id === item.id).volume}
                                            onChange={(e)=>{
                                                const changed_number = Number((e.target.value).replace(/\s/g, ''))
                                                const newBiznesXarajatArr = [...biznesXarajats]
                                                newBiznesXarajatArr[index].volume = changed_number
                                                newBiznesXarajatArr[index].average_monthly_expense = (changed_number)*(newBiznesXarajatArr[index].price)
                                                setBiznesXarajats(newBiznesXarajatArr)
                                            }}
                                        />
                                    </div>
                                    <div className="numeric_format_input width_47">
                                        <label>Naxri</label>
                                        <NumericFormat
                                            thousandSeparator={' '}
                                            value={biznesXarajats.find(x => x.id === item.id).price}
                                            onChange={(e)=>{
                                                const changed_number = Number((e.target.value).replace(/\s/g, ''))
                                                const newBiznesXarajatArr = [...biznesXarajats]
                                                newBiznesXarajatArr[index].price = changed_number
                                                newBiznesXarajatArr[index].average_monthly_expense = (changed_number)*(newBiznesXarajatArr[index].volume)
                                                setBiznesXarajats(newBiznesXarajatArr)
                                            }}
                                        />
                                    </div>
                                    <div className="numeric_format_input width_47">
                                        <label>Qiymati</label>
                                        <NumericFormat
                                            thousandSeparator={' '}
                                            value={biznesXarajats.find(x => x.id === item.id).value}
                                            onChange={(e)=>{
                                                const changed_number = Number((e.target.value).replace(/\s/g, ''))
                                                const newBiznesXarajatArr = [...biznesXarajats]
                                                newBiznesXarajatArr[index].value = changed_number
                                                setBiznesXarajats(newBiznesXarajatArr)
                                            }}
                                        />
                                    </div>
                                    <div className="numeric_format_input width_47">
                                        <label>O`rtacha oylik xarajat</label>
                                        <NumericFormat
                                            thousandSeparator={' '}
                                            value={biznesXarajats.find(x => x.id === item.id).average_monthly_expense}
                                            onChange={(e)=>{
                                                const changed_number = Number((e.target.value).replace(/\s/g, ''))
                                                const newBiznesXarajatArr = [...biznesXarajats]
                                                newBiznesXarajatArr[index].average_monthly_expense = changed_number
                                                setBiznesXarajats(newBiznesXarajatArr)
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
                                        value={biznesXarajats.find(x => x.id === item.id).comment}
                                        onChange={(e)=>{
                                        let newBiznesXarajatArr = [...biznesXarajats]
                                        newBiznesXarajatArr[index].comment = e.target.value
                                        setBiznesXarajats(newBiznesXarajatArr)
                                    }}
                                    />
                                </div>
                            </div>
                            )
                        })
                    }
                    <div className='kl1_product_footer'>
                        <button className='kl1_add_button' onClick={()=>{addBiznesXarajat()}}>
                            Biznes xarajat qoshish
                        </button>
                        <p className='kl1_jami'>JAMI: {getSumXarajat()?.toLocaleString()} so`m</p>
                    </div>
                </div>

                <p className='kl1_jami_main'>Jami o'rtacha oylik daromadlari: {(getSumDaromad()-getSumXarajat())?.toLocaleString()} so'm</p>

                <div className='step_buttons double_button'>
                    <button type='button' onClick={()=>{backStep()}} className='previous_button'><AiOutlineDoubleLeft/><p>Oldingi</p></button>
                    <button type='submit' onClick={()=>{onSubmit()}} className='step_next'><p>Keyingi</p> <AiOutlineDoubleRight/></button>
                </div>
        </section>
    )
}

export default EditBiznes