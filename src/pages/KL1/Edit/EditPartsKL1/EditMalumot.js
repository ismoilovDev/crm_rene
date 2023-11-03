import { useContext,useEffect } from 'react'
import { Input } from '@nextui-org/react'
import { useForm } from "react-hook-form";
import { useNavigate } from 'react-router-dom';
import { AiOutlineDoubleRight } from 'react-icons/ai'
import { Context } from '../../../../context/context';
import { InputSingle } from '../../../../components/Input/InputSingle';

function EditMalumot() {

    let navigate = useNavigate()
    
    function nextStep(){
        navigate('/kl1/editkl1/1_qism', { replace: true });
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
            nextStep()
        },200)   
    }


    return (
        <>
            <form onSubmit={handleSubmit(onSubmit)}>
                <Input
                    rounded
                    bordered
                    label='Hujjat tayyorlangan sana'
                    type='date'
                    color="secondary"
                    width='100%'
                    className='kl1_input'
                    value={dataMalumot?.doc_date}
                    {...register("doc_date", { required: false })}
                    onChange={(e)=>{
                        let newMalumot = {...dataMalumot}
                        newMalumot.doc_date = e.target.value
                        setDataMalumot(newMalumot)
                    }}
                />
                <Input
                    rounded
                    bordered
                    label='Mijoz tekshirilgan va organilgan sana'
                    type='date'
                    color="secondary"
                    width='100%'
                    className='kl1_input'
                    value={dataMalumot?.mark_date}
                    {...register("mark_date", { required: false })}
                    onChange={(e)=>{
                        let newMalumot = {...dataMalumot}
                        newMalumot.mark_date = e.target.value
                        setDataMalumot(newMalumot)
                    }}
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

export default EditMalumot