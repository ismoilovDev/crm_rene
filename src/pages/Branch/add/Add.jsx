import { useState } from 'react';
import { useForm } from "react-hook-form";
import { Input } from '@nextui-org/react';
import { AiOutlineClear, AiOutlineUserAdd } from 'react-icons/ai'
import { NumericFormat } from "react-number-format";
import { alert } from '../../../components/Alert/alert'
import LoaderBackdrop from '../../../components/Loader/LoaderBackdrop';
import Prev from '../../../components/Prev/Prev';
import https from '../../../services/https';

function BranchForm() {
   const [disable, setDisable] = useState(false)
   const [creditLimit, setCreditLimit] = useState(0)
   const { register, handleSubmit } = useForm();

   const onSubmit = (data) => {
      setDisable(true)
      const info = { ...data, limit_credit: creditLimit }
      https
         .post('/branches', info)
         .then(_ => {
            setDisable(false)
            alert("Filial qoshildi", 'success')
         })
         .catch((err) => {
            setDisable(false)
            alert(err?.response?.data?.message, 'error')
         })
   }

   return (
      <>
         <section className='filialform'>
            <div className='filialform_header'>
               <Prev />
            </div>
            <form className='filialform_form' onSubmit={handleSubmit(onSubmit)}>
               <h1 className='filialform_title'>Shakllarni To'ldiring:</h1>
               <Input
                  width='100%'
                  clearable
                  bordered
                  label="Nomi"
                  className='filial_input'
                  color="secondary"
                  {...register("name", { required: true })}
               />
               <Input
                  width='100%'
                  clearable
                  bordered
                  label="Qisqa nomi"
                  className='filial_input'
                  color="secondary"
                  {...register("short_name", { required: true })}
               />
               <Input
                  width='100%'
                  clearable
                  bordered
                  label="Filial kodi"
                  className='filial_input'
                  color="secondary"
                  {...register("code", { required: true })}
               />
               <Input
                  width='100%'
                  clearable
                  bordered
                  label="Shartnama"
                  className='filial_input'
                  color="secondary"
                  {...register("contract", { required: true })}
               />
               <Input
                  width='100%'
                  clearable
                  bordered
                  label="Qo'mita"
                  className='filial_input'
                  color="secondary"
                  {...register("committee", { required: true })}
               />
               <Input
                  width='100%'
                  clearable
                  bordered
                  label="Manzil"
                  className='filial_input'
                  color="secondary"
                  {...register("address", { required: true })}
               />
               <Input
                  width='100%'
                  clearable
                  bordered
                  label="Bank rekvizitlari"
                  className='filial_input'
                  color="secondary"
                  {...register("requisite", { required: true })}
               />
               <Input
                  width='100%'
                  clearable
                  bordered
                  label="ITN"
                  className='filial_input'
                  color="secondary"
                  {...register("itn", { required: true })}
               />
               <Input
                  width='100%'
                  clearable
                  bordered
                  type='number'
                  labelLeft='+998'
                  label='Raqam'
                  className='filial_input'
                  color="secondary"
                  pattern="\d{8}"
                  title='8 raqamdan kob emas bolishi kerak!'
                  {...register("phone", {
                     required: true,
                  })}
               />
               <Input
                  width='100%'
                  clearable
                  bordered
                  label="Shahar"
                  className='filial_input'
                  color="secondary"
                  {...register("city", { required: true })}
               />
               <Input
                  width='100%'
                  clearable
                  bordered
                  label="Sudi"
                  className='filial_input'
                  color="secondary"
                  {...register("judge", { required: true })}
               />
               <div className="numeric_format_input width_100 border_radius_10 taminot_tableform_input">
                  <label>Kredit limiti</label>
                  <NumericFormat
                     thousandSeparator={' '}
                     value={creditLimit}
                     onChange={(e) => {
                        const changed_number = Number((e.target.value).replace(/\s/g, ''))
                        setCreditLimit(changed_number)
                     }}
                  />
               </div>
               <div className='filial_buttons'>
                  <button className='client_submit reset' type='reset'>
                     Formani tiklash
                     <AiOutlineClear />
                  </button>
                  <button type='submit' className='client_submit submit' >
                     Filialni qo'shish
                     <AiOutlineUserAdd />
                  </button>
               </div>

               <LoaderBackdrop disable={disable} />
            </form>
         </section>
      </>
   )
}

export default BranchForm