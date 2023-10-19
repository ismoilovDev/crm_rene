import { useContext,useEffect } from 'react'
import { Context } from '../../../context/context';
import { useForm } from "react-hook-form";
import { useNavigate } from 'react-router-dom';
import { AiOutlineDoubleRight } from 'react-icons/ai'
import { InputDate } from '../../../components/Input/InputDate';
import { InputSingle } from '../../../components/Input/InputSingle';

function Shaxshiy() {

    let navigate = useNavigate()
    
    function NextStep(){
        navigate('/kl1/addkl1/1_qism', { replace: true })
    }
    
    const {setActiveTab, infoClient, infoOrder, dataMalumot, setDataMalumot } = useContext(Context);

    // Tab active
    useEffect(() => {
        setActiveTab(1)
    }, [])

    // UseForm
    const { register,
        handleSubmit,
        watch,
        formState: { errors, isValid }
    } = useForm();

    const onSubmit = (data) =>{
        setTimeout(()=>{
            NextStep()
        },500)   
    }


    return (
        <>
            <form onSubmit={handleSubmit(onSubmit)}>
                <InputDate 
                    value = {dataMalumot}
                    setValue={setDataMalumot}
                    input_name={'doc_date'}
                    label={"Hujjat tayyorlangan sana"}
                    register={register}
                />
                <InputDate 
                    value = {dataMalumot}
                    setValue={setDataMalumot}
                    input_name={'mark_date'}
                    label={"Mijoz tekshirilgan va organilgan sana"}
                    register={register}
                />
                <div className='single_buyurtma_info pdf_margin_top_5'>
                    <InputSingle label={'Buyurtmachining F.I.Sh:'} value={infoClient?.name} />
                    <InputSingle label={'Doimiy yashash manzili:'} value={infoClient?.address} />
                    {
                        infoClient?.temp_address ? 
                        <InputSingle label={'Vaqtinchalik yashash manzili:'} value={infoClient?.temp_address} /> :
                        <></>
                    }
                    <InputSingle label={'Kredit maqsadi:'} value={infoOrder?.aim} />
                    <InputSingle label={'Soralayotgan kredit miqdori:'} value={infoOrder?.sum} />
                </div>
                <div className='step_buttons single_button'>
                    <button type='submit' className='step_next'><p>Keyingi</p><AiOutlineDoubleRight/></button>
                </div>
            </form>
        </>
    )
}

export default Shaxshiy