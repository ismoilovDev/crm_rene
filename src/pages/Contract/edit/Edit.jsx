import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { AiOutlineClear, AiOutlineUserAdd } from 'react-icons/ai'
import { Input } from '@nextui-org/react'
import { alert } from '../../../components/Alert/alert'
import Prev from '../../../components/Prev/Prev';
import https from '../../../services/https'


function ContractEdit() {

   const { id } = useParams()
   const [shartnama, setShartnama] = useState({})
   const [backShartnama, setBackShartnama] = useState({})

   useEffect(() => {
      https
         .get(`/contracts/${id}`)
         .then(res => {
            console.log(res?.data)
            const { client, order, ...newRes } = res?.data
            setShartnama({ ...newRes, order_id: res?.data?.order?.id, order_code: res?.data?.order?.code })
            setBackShartnama({ ...newRes, order_id: res?.data?.order?.id, order_code: res?.data?.order?.code })
         })
         .catch(err => {
            alert(err?.response?.data?.message, 'error')
            console.log(err)
         })
   }, []);


   function editHandler() {
      let shartnamaInfo = {}
      if (shartnama?.order_id) {
         shartnamaInfo = { ...shartnama, order_id: shartnama?.order_id, group_id: null }
      } else {
         shartnamaInfo = { ...shartnama, group_id: shartnama?.group?.id, order_id: null }
      }

      https
         .patch(`/contracts/${id}`, shartnamaInfo)
         .then(res => {
            if (res.request.status === 200) {
               alert("Shartnama o'zgartirildi", 'success')
            }
            console.log(shartnamaInfo)
         })
         .catch(err => {
            console.log(err);
            alert(err?.response?.data?.message, 'error')
         })
   }

   function backFun() {
      setShartnama(backShartnama)
   }


   return (
      <section>
         <div className='filialform_header'>
            <Prev />
         </div>
         <div className='FilialEditTable single_buyurtma'>
            <h1 className='text_center filial_edit_text'>{shartnama?.order?.client?.name}</h1>
            <Input
               className='vall'
               width='100%'
               readOnly
               label={shartnama?.order_code ? "Buyurtma kodi" : "Guruh nomi"}
               value={shartnama?.order_code ? shartnama?.order_code : shartnama?.group?.name}
               bordered
               color="secondary"
            />
            <Input
               className='vall'
               width='100%'
               type='date'
               label="Mikroqarz berish sanasi"
               value={shartnama?.credit_issue_date}
               bordered
               color="secondary"
               onChange={(e) => {
                  let newShartnama = { ...shartnama }
                  newShartnama.credit_issue_date = e.target.value
                  setShartnama(newShartnama)
               }}
            />
            <Input
               className='vall'
               width='100%'
               type='date'
               label="Birinchi tolov sonasi"
               value={shartnama?.first_repayment_date}
               bordered
               color="secondary"
               onChange={(e) => {
                  let newShartnama = { ...shartnama }
                  newShartnama.first_repayment_date = e.target.value
                  setShartnama(newShartnama)
               }}
            />
            <Input
               className='vall'
               width='100%'
               type='date'
               label="Shartnoma sanasi"
               value={shartnama?.contract_issue_date}
               bordered
               color="secondary"
               onChange={(e) => {
                  let newShartnama = { ...shartnama }
                  newShartnama.contract_issue_date = e.target.value
                  setShartnama(newShartnama)
               }}
            />
            <Input
               className='vall'
               width='100%'
               type='text'
               label="Shartnoma kodi"
               value={shartnama?.contract_num}
               bordered
               color="secondary"
               onChange={(e) => {
                  let newShartnama = { ...shartnama }
                  newShartnama.contract_num = e.target.value
                  setShartnama(newShartnama)
               }}
            />
            <div className='xodim_buttons'>
               <button type='button' className='client_submit reset back_red' onClick={backFun}>
                  O'zgarishni bekor qilish
                  <AiOutlineClear />
               </button>
               <button type='submit' className='client_submit submit back_green' onClick={editHandler}>
                  O'zgarishni kiritish
                  <AiOutlineUserAdd />
               </button>
            </div>
         </div>
      </section>
   )
}

export default ContractEdit;