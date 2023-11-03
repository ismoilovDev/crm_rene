import { useState } from 'react'
import { useLocation } from 'react-router-dom';
import { AiOutlineUserAdd, AiOutlineClear, } from 'react-icons/ai'
import { useForm } from "react-hook-form";
import { Input } from "@nextui-org/react";
import { alert } from '../../../components/Alert/alert';
import Prev from '../../../components/Prev/Prev';
import https from '../../../services/https';


function ContractForm() {
   const location = useLocation()
   const idItem = location?.state?.id
   const codeItem = location?.state?.code
   const orderItem = location?.state?.order
   const { register, handleSubmit } = useForm()
   const [disable, setDisable] = useState(false)
   const [resetWarning, setResetWarning] = useState('warning_reset_main close')

   function openReset(e) {
      e.preventDefault()
      setResetWarning('warning_reset_main open')
   }

   function closeReset(e) {
      e.preventDefault()
      setResetWarning('warning_reset_main close')
   }

   const onSubmit = (data) => {
      let info = { ...data }

      if (orderItem) {
         info = { ...data, order_id: idItem, group_id: null }
      } else {
         info = { ...data, group_id: idItem, order_id: null }
      }

      https
         .post('/contracts', info)
         .then(res => {
            alert("Shartnama qoshildi", 'success')
            setDisable(false)
         })
         .catch(err => {
            alert(err?.response?.data?.message, 'error')
            setDisable(false)
         })
   }

   return (
      <>
         <div className={resetWarning}>
            <p>Haqiqatan ham ma'lumontlarni qayta tiklamoqchimisiz?</p>
            <div >
               <button onClick={closeReset}>Ha</button>
               <button onClick={closeReset}>Yoq</button>
            </div>
         </div>
         <Prev />
         <div className='client margin_top_15'>
            <form className='contract_main' onSubmit={handleSubmit(onSubmit)}>
               <Input
                  className='vall'
                  width='100%'
                  readOnly
                  value={codeItem}
                  label={orderItem ? "Buyurtma kodi" : "Guruh kodi"}
                  bordered
                  color="secondary"
               />
               <Input
                  className='vall'
                  width='100%'
                  label="Mikroqarz berish sanasi"
                  bordered
                  color="secondary"
                  type='date'
                  {...register("credit_issue_date", { required: true })}
               />
               <Input
                  className='vall'
                  width='100%'
                  label="Birinchi tolov sonasi"
                  bordered
                  color="secondary"
                  type='date'
                  {...register("first_repayment_date", { required: true })}
               />
               <Input
                  className='vall'
                  width='100%'
                  label="Shartnoma sanasi"
                  bordered
                  color="secondary"
                  type='date'
                  {...register("contract_issue_date", { required: true })}
               />
               <div className='submit-buttons'>
                  <button className='client_submit reset' onClick={openReset}>
                     Formani tiklash
                     <AiOutlineClear />
                  </button>
                  <button type='submit' disabled={disable} className={`client_submit submit ${disable ? "disabled" : ""}`}>
                     Shartnomani qo'shish
                     <AiOutlineUserAdd />
                  </button>
               </div>
            </form>
         </div>
      </>
   )
}

export default ContractForm;