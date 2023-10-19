import { useState, useContext,useEffect } from 'react'
import { v4 as uuidv4 } from 'uuid'
import { useForm } from "react-hook-form";
import { useNavigate } from 'react-router-dom';
import { Input, Textarea } from '@nextui-org/react'
import { AiOutlineDoubleRight, AiOutlineDoubleLeft } from 'react-icons/ai'
import { NumericFormat } from 'react-number-format';
import { Context } from '../../../../context/context';
import { alert } from '../../../../components/Alert/alert';
import https from '../../../../services/https';

function EditPart7() {

    // Tab active
    const { activeTab, setActiveTab } = useContext(Context)
    const { clientLoans, setClientLoans} = useContext(Context)
    const { historyKredit, setHistoryKredit } = useContext(Context)
    const { contract, setContract } = useContext(Context)
    const [kreditData, setKreditData] = useState({})
    const [sof, setSof] = useState(1)
    const orderIdGet = window.localStorage.getItem('order_id')

    // Components
    const { 
        // Boshqa
        myDaromads,
        // Mavsumiy
        mavsumiyDaromads, mavsumiyXarajats, 
        // Biznes
        biznesDaromads, biznesXarajats,
    } = useContext(Context)

    function getSumDaromadBiznes(){
        let newBiznesDaromad = []
        biznesDaromads.map((item,index)=>{
            newBiznesDaromad.push(item.monthly_income)
        })
        let totalDaromad = newBiznesDaromad.reduce((prev,current)=> Number(prev) + Number(current), 0)
        return(totalDaromad ? totalDaromad : 0)
    }

    function getSumXarajatBiznes(){
        let newBiznesXarajat = []
        biznesXarajats.map((item,index)=>{
            newBiznesXarajat.push(item.average_monthly_expense)
        })
        let totalXarajat = newBiznesXarajat.reduce((prev,current)=> Number(prev) + Number(current), 0)
        return(totalXarajat ? totalXarajat : 0)
    }

    // get total price of Daromad
    const getTotalSumBoshqa = () => {
        const newSumArray = []
        myDaromads?.map((item, index) => {
            newSumArray?.push(item?.volume * item?.unit_price)
        })
        let totalPrices = newSumArray.reduce((prev, current) => prev + current, 0)
        return(totalPrices ? totalPrices : 0)
    }

    const getDaromadSumMavsumiy = () =>{
        const SumArr1 = []
        mavsumiyDaromads?.map((item,index)=>{
            SumArr1?.push(Number(item.income))
        })
        let totalSum1 = SumArr1.reduce((prev, current)=> prev + current, 0)
        return(totalSum1 ? totalSum1 : 0)
    }

    const getXarajatSumMavsumiy = () =>{
        const SumArr2 = []
        mavsumiyXarajats.map((item,index)=>{
            SumArr2.push(Number(item.expense))
        })

        let totalSum2 = SumArr2.reduce((prev, current)=> prev + current, 0)
        return(totalSum2 ? totalSum2 : 0)
    }

    const getPaymentClear = (id) => {
        // payment
        https
        .post(`/g1/${id}`, {})
        .then(resp =>{
           setKreditData(resp?.data?.graph?.['0']);
        })
        .catch(error =>{
           console.log(error)
        })
    }

    const getPaymentAround = (id) =>{
        let Data = new Date();
        let Year = Data.getFullYear();
        let Month = Data.getMonth() + 1;
        let Day = Data.getDate();
        let today = `${Year}-${Month}-${Day}`


        https
            .get(`/orders/${id}`)
            .then(res =>{
                let data ={
                    type : 'annuitet',
                    sum : res?.data?.sum,
                    time : res?.data?.time,
                    percent : 58,
                    given_date : today,
                    first_repayment_date : today
                }
                if(data?.time && data?.sum && data?.type && data?.percent){
                    https
                    .post('/namuna', data)
                    .then(responsive =>{
                        setKreditData(responsive?.data?.['0'])
                    })
                    .catch(error =>{
                        console.log(error)
                        console.log(data)
                    })
                }
            })
            .catch(error =>{
                console.log(error)
                console.log(orderIdGet)
            })
    }



    // UseForm
    const { register,
        handleSubmit,
        watch,
        formState: { errors, isValid }
    } = useForm();


    useEffect(() => {

        setSof(getSumDaromadBiznes() + getTotalSumBoshqa() + (getDaromadSumMavsumiy())/12 - getSumXarajatBiznes() - (getXarajatSumMavsumiy())/12)

        setActiveTab(7)
        
        if(contract?.id){
            getPaymentClear(orderIdGet)
        }else{
            getPaymentAround(orderIdGet)   
        }

    }, [])

    let navigate = useNavigate()

    function nextStep(){
        navigate('/kl1/editkl1/table', { replace: true });
    }
    function backStep(){
        navigate("/kl1/editkl1/6_qism", { replace: true });
    }


    // Family Mavjuds Adding and Deleting Functions
    function addfamMavjud () {
        let newLoan = [{
            id:uuidv4(),
            name:'',
            main:0,
            monthly:0,
            comment:''
        }]
        setClientLoans(clientLoans.concat(newLoan))
        
    }
    function deletefamMavjud (id) {
        if(clientLoans?.length>1){
            let newLoans = clientLoans?.filter((famMavjud,famMavjudId)=> famMavjudId !== (id))
            setClientLoans(newLoans)
        }else if(clientLoans?.length===1){
            setClientLoans([])
        }
    }

    function mavjudRest(){
        let rest = []
        clientLoans?.map(item =>{
            rest.push(item.main)
        })
        let totalRest = rest.reduce((prev,current) => Number(prev) + Number(current), 0)
        return totalRest.toLocaleString()
    }
    function mavjudPay(){
        let pay = []
        clientLoans?.map(item =>{
            pay.push(item.monthly)
        })
        let totalPay = pay.reduce((prev,current) => Number(prev) + Number(current), 0)

        return totalPay.toLocaleString()
    }
    function procentNumberBefore(){
        let pay = []
        clientLoans?.map(item =>{
            pay.push(item.monthly)
        })
        let totalPay = pay.reduce((prev,current) => Number(prev) + Number(current), 0)
        return(((totalPay/sof)*100).toFixed(2))
    }
    function procentNumber(){
        let pay = []
        clientLoans?.map(item =>{
            pay.push(item.monthly)
        })
        let totalPay = pay.reduce((prev,current) => Number(prev) + Number(current), 0)

        return((((kreditData?.interest + kreditData?.principal_debt + totalPay)/sof)*100).toFixed(2))
    }



    const onSubmit = (data) =>{
        if(procentNumber() > 50){
            return alert("Soralayotgan kredit hisobi 50% dan ortik", 'error')
        }

        setTimeout(()=>{
            nextStep()
        },500)  
    }

    
    return (
        <section>
            <h2 className='kl1_subtitle'>Buyurtmachining mavjud kredit va qarz majburiyatlari</h2>
            <form onSubmit={handleSubmit(onSubmit)} className='qism_7'>
                {
                    clientLoans?.map((item,index)=>(
                        <div className='kl1_products' key={item.id}>
                            <div className='kl1_product_title'>
                                Mavjud malumot {index + 1}
                                <button
                                type='button'
                                className='kl1_delete_button'
                                onClick={() => deletefamMavjud(index)}
                                >
                                    <i className='bx bx-trash'></i>
                                </button>
                            </div>
                            <div className='kl1_product'>
                                <Input
                                    rounded
                                    bordered
                                    label='Mavjud kredit va qarzlar'
                                    color="secondary"
                                    width='31%'
                                    className='kl1_input'
                                    value={clientLoans?.find(x => x.id === item.id).name}
                                    onChange={(e)=>{
                                        let newLoan = [...clientLoans]
                                        newLoan[index].name = e.target.value
                                        setClientLoans(newLoan)
                                    }}
                                />
                                <div className="numeric_format_input width_31">
                                    <label>Asosiy qarz qoldigi</label>
                                    <NumericFormat
                                        thousandSeparator={' '}
                                        value={clientLoans?.find(x => x.id === item.id).main}
                                        onChange={(e)=>{
                                            const changed_number = Number((e.target.value).replace(/\s/g, ''))
                                            const newLoan = [...clientLoans]
                                            newLoan[index].main = changed_number
                                            setClientLoans(newLoan)
                                        }}
                                    />
                                </div>
                                <div className="numeric_format_input width_31">
                                    <label>Oylik tolov miqdori</label>
                                    <NumericFormat
                                        thousandSeparator={' '}
                                        value={clientLoans?.find(x => x.id === item.id).monthly}
                                        onChange={(e)=>{
                                            const changed_number = Number((e.target.value).replace(/\s/g, ''))
                                            const newLoan = [...clientLoans]
                                            newLoan[index].monthly = changed_number
                                            setClientLoans(newLoan) 
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
                                    value={clientLoans?.find(x => x.id === item.id).comment}
                                    onChange={(e)=>{
                                        let newLoan = [...clientLoans]
                                        newLoan[index].comment = e.target.value
                                        setClientLoans(newLoan)
                                    }}
                                />
                            </div>
                        </div>
                    ))
                }
                <div className='kl1_product_footer'>
                    <button
                    type='button'
                    className='kl1_add_button'
                    onClick={()=>{addfamMavjud()}}
                    >
                        Mavjud kredit va qarz qoshish
                    </button>
                    <div className='flex_column'>
                        <p className='kl1_jami margin_bottom'>Jami asosiy qarz qoldigi: {mavjudRest()} so`m</p>
                        <p className='kl1_jami margin_bottom'>Jami oylik tolov miqdori: {mavjudPay()} so`m</p>
                        <p className='kl1_jami '>Joiriy kreditlar boyicha qarz yuki korsatkichi: {procentNumberBefore()}%</p>
                    </div>
                </div>

                <h2 className='kl1_subtitle'>Oylik kredit tolovi ( eng katta tolov miqdori )</h2>
                {
                    kreditData?.principal_debt ? 
                    <div className='flex-row procent_inputs'>
                        <div className='single_buyurtma_inputs pdf_margin_top_15'>
                            <p>Asosiy qarz:</p>
                            <p>{(kreditData?.principal_debt)?.toLocaleString()}</p>
                        </div>
                        <div className='single_buyurtma_inputs pdf_margin_top_15'>
                            <p>Foizlar:</p>
                            <p>{(kreditData?.interest)?.toLocaleString()}</p>
                        </div>
                        <div className='single_buyurtma_inputs pdf_margin_top_15'>
                            <p>Jami oylik tolov:</p>
                            <p>{(kreditData?.interest + kreditData?.principal_debt)?.toLocaleString()}</p>
                        </div>
                        <div className={procentNumber() > 50 ? 'single_buyurtma_inputs pdf_margin_top_15 red_text' : 'single_buyurtma_inputs pdf_margin_top_15 green_text'}>
                            <p>{`Soralayotgan kredit hisobi qarzi yoki korsatkichi (<50%)`}:</p>
                            <p>{procentNumber()}</p>
                        </div>
                    </div> :
                    <></>
                }
                <Textarea
                    width='100%'
                    bordered
                    rounded
                    color="secondary"
                    className='kl1_input'
                    // placeholder='Jami 7 marotaba kredit olgan, shu jumladan, Renesansdan 2 marotaba. Muntazam o‘z vaqtida to‘lagan. 30 kungacha kechiktirishlar soni - 0, 30 kundan ortiq kechiktirishlar soni - 0'
                    label='Kredit tarixi'
                    value={historyKredit}
                    {...register("credit_history", { required: false })}
                    onChange={(e)=>{
                        setHistoryKredit(e.target.value)
                    }}
                />
                <div className='step_buttons double_button'>
                    <button type='button' onClick={()=>{backStep()}} className='previous_button'><AiOutlineDoubleLeft/><p>Oldingi</p></button>
                    <button type='submit' className='step_next'><p>Keyingi</p> <AiOutlineDoubleRight/></button>
                </div>
            </form>
        </section>
    )
}

export default EditPart7