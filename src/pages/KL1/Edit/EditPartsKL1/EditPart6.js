import { useContext,useEffect } from 'react'
import { AiOutlineDoubleRight, AiOutlineDoubleLeft } from 'react-icons/ai'
import { NumericFormat } from 'react-number-format'
import { Input, Textarea } from '@nextui-org/react'
import { useNavigate } from 'react-router-dom'
import { v4 as uuidv4 } from 'uuid'
import { Context } from '../../../../context/context'

function EditPart6() {
    const { activeTab, setActiveTab } = useContext(Context)
    const { mavsumiyWindow, setMavsumiyWindow } = useContext(Context)
    const { biznesWindow, setBiznesWindow } = useContext(Context)
    const { familyDaromad, setFamilyDaromad } = useContext(Context)
    const { familyXarajat, setFamilyXarajat } = useContext(Context)
    const { familyMalumot, setFamilyMalumot } = useContext(Context)

    useEffect(() => {
        setActiveTab(6)
    }, [])

    let navigate = useNavigate()

    function nextStep(){
        navigate('/kl1/editkl1/7_qism', { replace: true });
    }
    function backStep(){
        if(biznesWindow === 'open'){
            navigate("/kl1/editkl1/biznes", { replace: true })
        }else if(mavsumiyWindow === 'open'){
            navigate("/kl1/editkl1/mavsumiy", { replace: true })
        }else{
            navigate("/kl1/editkl1/boshqa", { replace: true })
        }
    }

    // Family Daromads Adding and Deleting Functions
    function addfamDaromad () {
        let newfamilyDaromad = [{
            id:uuidv4(),
            name:'',
            activity_type:'',
            activity_address:'',
            monthly_income:0,
            comment:''
        }]
        setFamilyDaromad(familyDaromad.concat(newfamilyDaromad))
    }
    function deletefamDaromad (id) {
        if(familyDaromad?.length>1){
            let newfamilyDaromads = familyDaromad?.filter((famDaromad,famDaromadId)=> famDaromadId !== (id))
            setFamilyDaromad(newfamilyDaromads)
        }else if(familyDaromad?.length===1){
            setFamilyDaromad([])
        }
    }

    function getSumDaromad(){
        let daromad = []
        familyDaromad.map(item =>{
            daromad.push(item.monthly_income)
        })
        let totalDaromadSum = daromad.reduce((prev,current) => Number(prev) + Number(current), 0)
        return totalDaromadSum.toLocaleString()
    }


    // Family Xarajats Adding and Deleting Functions
    function addfamXarajat () {
        let newfamilyXarajat = [{
            id:uuidv4(),
            name:'',
            expense:0,
            comment:''
        }]
        setFamilyXarajat(familyXarajat.concat(newfamilyXarajat))
    }
    function deletefamXarajat (id) {
        if(familyXarajat.length>1){
            let newfamilyXarajats = familyXarajat.filter((famXarajat,famXarajatId)=> famXarajatId !== (id))
            setFamilyXarajat(newfamilyXarajats)
        }else if(familyXarajat?.length===1){
            setFamilyXarajat([])
        }
    }

    function getSumXarajat(){
        let xarajat = []
        familyXarajat?.map(item =>{
            xarajat.push(item.expense)
        })
        let totalXarajatSum = xarajat.reduce((prev,current) => Number(prev) + Number(current), 0)
        return totalXarajatSum.toLocaleString()
    }


    // Family Malumots Adding and Deleting Functions
    function addfamMalumot () {
        let newfamilyMalumot = [{
            id:uuidv4(),
            name:'',
            main:0,
            monthly:0,
            comment:''
        }]
        setFamilyMalumot(familyMalumot.concat(newfamilyMalumot))
    }
    function deletefamMalumot (id) {
        if(familyMalumot?.length>1){
            let newfamilyMalumots = familyMalumot?.filter((famMalumot,famMalumotId)=> famMalumotId !== (id))
            setFamilyMalumot(newfamilyMalumots)
        }else if(familyMalumot?.length===1){
            setFamilyMalumot([])
        }
    }

    function getMalumotPay(){
        let malumotPay = []
        familyMalumot?.map(item =>{
            malumotPay.push(item.monthly)
        })
        let totalMalumotSumPay = malumotPay.reduce((prev,current) => Number(prev) + Number(current), 0)
        return totalMalumotSumPay.toLocaleString()
    }

    function getMalumotRest(){
        let malumotRest = []
        familyMalumot.map(item =>{
            malumotRest.push(item.main)
        })
        let totalMalumotSumRest = malumotRest.reduce((prev,current) => Number(prev) + Number(current), 0)
        return totalMalumotSumRest.toLocaleString()
    }

    function totalMalumot(){
        let daromad = []
        familyDaromad.map(item =>{
            daromad.push(item.monthly_income)
        })
        let totalDaromadSum = daromad.reduce((prev,current) => Number(prev) + Number(current), 0)

        let xarajat = []
        familyXarajat.map(item =>{
            xarajat.push(item.expense)
        })
        let totalXarajatSum = xarajat.reduce((prev,current) => Number(prev) + Number(current), 0)

        let malumotPay = []
        familyMalumot.map(item =>{
            malumotPay.push(item.monthly)
        })
        let totalMalumotSumPay = malumotPay.reduce((prev,current) => Number(prev) + Number(current), 0)

        let total = totalDaromadSum - totalXarajatSum - totalMalumotSumPay
            
        return total
    }

    function onSubmit(){
        setTimeout(()=>{
            nextStep()
        },500)
    }

    return (
        <section>
            <h2 className='kl1_subtitle'>Oilaviy daromadlar va xarajatlar (Uy xo'jaligining daromad va xarajatlari)</h2>
                    <p className='kl1_formtitle'>Oila azolarining daromadlar , shuningdek uy xojaligining boshqa daromadlari</p>
                    {
                        familyDaromad.map((item,index)=>(
                            <div className='kl1_products' key={item.id}>
                                <div className='kl1_product_title'>
                                    Odam {index + 1}
                                    <button
                                    className='kl1_delete_button'
                                    onClick={() => deletefamDaromad(index)}
                                    >
                                        <i className='bx bx-trash'></i>
                                    </button>
                                </div>
                                <div className='kl1_product'>
                                    <Input
                                        rounded
                                        bordered
                                        label='Daromad Egasi'
                                        color="secondary"
                                        width='47%'
                                        className='kl1_input'
                                        value={familyDaromad.find(x => x.id === item.id).name}
                                        onChange={(e)=>{
                                            let newFamilyDaromad = [...familyDaromad]
                                            newFamilyDaromad[index].name = e.target.value
                                            setFamilyDaromad(newFamilyDaromad)
                                        }}
                                    />
                                    <Input
                                        rounded
                                        bordered
                                        label='Faoliyat Turi'
                                        color="secondary"
                                        width='47%'
                                        className='kl1_input'
                                        value={familyDaromad.find(x => x.id === item.id).activity_type}
                                        onChange={(e)=>{
                                            let newFamilyDaromad = [...familyDaromad]
                                            newFamilyDaromad[index].activity_type = e.target.value
                                            setFamilyDaromad(newFamilyDaromad)
                                        }}
                                    />
                                    <Input
                                        rounded
                                        bordered
                                        label='Faoliyat Joyi'
                                        color="secondary"
                                        width='47%'
                                        className='kl1_input'
                                        value={familyDaromad.find(x => x.id === item.id).activity_address}
                                        onChange={(e)=>{
                                            let newFamilyDaromad = [...familyDaromad]
                                            newFamilyDaromad[index].activity_address = e.target.value
                                            setFamilyDaromad(newFamilyDaromad)
                                        }}
                                    />
                                    <div className="numeric_format_input width_47">
                                        <label>Bir oylik daromad</label>
                                        <NumericFormat
                                            thousandSeparator={' '}
                                            value={familyDaromad.find(x => x.id === item.id).monthly_income}
                                            onChange={(e)=>{
                                                const changed_number = Number((e.target.value).replace(/\s/g, ''))
                                                const newFamilyDaromad = [...familyDaromad]
                                                newFamilyDaromad[index].monthly_income = changed_number
                                                setFamilyDaromad(newFamilyDaromad)
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
                                        value={familyDaromad.find(x => x.id === item.id).comment}
                                        onChange={(e)=>{
                                            let newFamilyDaromad = [...familyDaromad]
                                            newFamilyDaromad[index].comment = e.target.value
                                            setFamilyDaromad(newFamilyDaromad)
                                        }}
                                    />
                                </div>
                            </div>
                        ))
                    }
                    <div className='kl1_product_footer'>
                        <button
                        className='kl1_add_button'
                        onClick={()=>{addfamDaromad()}}
                        >
                            Daromad qoshish
                        </button>
                        <p className='kl1_jami'>JAMI: {getSumDaromad()} so`m</p>
                    </div>

                    <p className='kl1_formtitle'>Uy xojaligining xarajatlari</p>
                    {
                        familyXarajat.map((item,index)=>(
                            <div className='kl1_products' key={item.id}>
                                <div className='kl1_product_title'>
                                    Xarajat {index + 1}
                                    <button
                                    className='kl1_delete_button'
                                    onClick={() => deletefamXarajat(index)}
                                    >
                                        <i className='bx bx-trash'></i>
                                    </button>
                                </div>
                                <div className='kl1_product'>
                                    <Input
                                        rounded
                                        bordered
                                        label='Xarajat nomi'
                                        color="secondary"
                                        width='47%'
                                        className='kl1_input'
                                        value={familyXarajat.find(x => x.id === item.id).name}
                                        onChange={(e)=>{
                                            let newFamilyXarajat = [...familyXarajat]
                                            newFamilyXarajat[index].name = e.target.value
                                            setFamilyXarajat(newFamilyXarajat)
                                        }}
                                    />
                                    <div className="numeric_format_input width_47">
                                        <label>Ortaja oylik xarajat</label>
                                        <NumericFormat
                                            thousandSeparator={' '}
                                            value={familyXarajat.find(x => x.id === item.id).expense}
                                            onChange={(e)=>{
                                                const changed_number = Number((e.target.value).replace(/\s/g, ''))
                                                const newFamilyXarajat = [...familyXarajat]
                                                newFamilyXarajat[index].expense = changed_number
                                                setFamilyXarajat(newFamilyXarajat)
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
                                        value={familyXarajat.find(x => x.id === item.id).comment}
                                        onChange={(e)=>{
                                            let newFamilyXarajat = [...familyXarajat]
                                            newFamilyXarajat[index].comment = e.target.value
                                            setFamilyXarajat(newFamilyXarajat)
                                        }}
                                    />
                                </div>
                            </div>
                        ))
                    }
                    <div className='kl1_product_footer'>
                        <button
                        className='kl1_add_button'
                        onClick={()=>{addfamXarajat()}}
                        >
                            Xarajat qoshish
                        </button>
                        <p className='kl1_jami'>JAMI: {getSumXarajat()} so`m</p>
                    </div>

                    <p className='kl1_formtitle'>Uy xojaligi azolarining mavjud kredit va qarzdorliklari togrisidagi malumotlar</p>
                    {
                        familyMalumot.map((item,index)=>(
                            <div className='kl1_products' key={index}>
                                <div className='kl1_product_title'>
                                    Malumot {index + 1}
                                    <button
                                    className='kl1_delete_button'
                                    onClick={() => deletefamMalumot(index)}
                                    >
                                        <i className='bx bx-trash'></i>
                                    </button>
                                </div>
                                <div className='kl1_product'>
                                    <Input
                                        rounded
                                        bordered
                                        label='Malumot nomi'
                                        color="secondary"
                                        width='31%'
                                        className='kl1_input'
                                        value={familyMalumot.find(x => x.id === item.id).name}
                                        onChange={(e)=>{
                                            let newFamilyMalumott = [...familyMalumot]
                                            newFamilyMalumott[index].name = e.target.value
                                            setFamilyMalumot(newFamilyMalumott)
                                        }}
                                    />
                                    <div className="numeric_format_input width_31">
                                        <label>Asosiy qarz qoldigi</label>
                                        <NumericFormat
                                            thousandSeparator={' '}
                                            value={familyMalumot.find(x => x.id === item.id).main}
                                            onChange={(e)=>{
                                                const changed_number = Number((e.target.value).replace(/\s/g, ''))
                                                const newFamilyMalumott = [...familyMalumot]
                                                newFamilyMalumott[index].main = changed_number
                                                setFamilyMalumot(newFamilyMalumott)
                                            }}
                                        />
                                    </div>
                                    <div className="numeric_format_input width_31">
                                        <label>Oylik tolov miqdori</label>
                                        <NumericFormat
                                            thousandSeparator={' '}
                                            value={familyMalumot.find(x => x.id === item.id).monthly}
                                            onChange={(e)=>{
                                                const changed_number = Number((e.target.value).replace(/\s/g, ''))
                                                const newFamilyMalumott = [...familyMalumot]
                                                newFamilyMalumott[index].monthly = changed_number
                                                setFamilyMalumot(newFamilyMalumott)
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
                                        value={familyMalumot.find(x => x.id === item.id).comment}
                                        onChange={(e)=>{
                                            let newFamilyMalumott = [...familyMalumot]
                                            newFamilyMalumott[index].comment = e.target.value
                                            setFamilyMalumot(newFamilyMalumott)
                                        }}
                                    />
                                </div>
                            </div>
                        ))
                    }
                
                    <div className='kl1_product_footer'>
                        <button
                        className='kl1_add_button'
                        onClick={()=>{addfamMalumot()}}
                        >
                            Malumot qoshish
                        </button>
                        <div className='flex_column'>
                            <p className='kl1_jami margin_bottom'>Jami asosiy qarz qoldigi: {getMalumotRest()} so`m</p>
                            <p className='kl1_jami margin_bottom'>Jami oylik tolov miqdori: { getMalumotPay()} so`m</p>
                        </div>
                    </div>
                    <p className={(Number(totalMalumot()) >= 0)? 'text_black_18 green_text' : 'text_black_18 red_text'}>Uy xojaligi byudjetining ortacha oylik ortiqcha mablagi yoki kamomadi miqdori: {totalMalumot().toLocaleString()} so`m</p>
                    
                    <div className='step_buttons double_button'>
                        <button type='button' onClick={()=>{backStep()}} className='previous_button'><AiOutlineDoubleLeft/><p>Oldingi</p></button>
                        <button type='submit' onClick={()=>{onSubmit()}} className='step_next'><p>Keyingi</p> <AiOutlineDoubleRight/></button>
                    </div>
        </section>
    )
}

export default EditPart6