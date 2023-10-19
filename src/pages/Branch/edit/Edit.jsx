import { useState, useEffect } from 'react'
import { Input } from '@nextui-org/react'
import { useParams } from 'react-router-dom'
import { AiOutlineClear, AiOutlineUserAdd } from 'react-icons/ai'
import { NumericFormat } from "react-number-format";
import { alert } from '../../../components/Alert/alert';
import LoaderBackdrop from '../../../components/Loader/LoaderBackdrop';
import Prev from '../../../components/Prev/Prev'
import https from '../../../services/https';


function BranchEdit() {

   let { id } = useParams()
   const [filial, setFilial] = useState({})
   const [backFilial, setBackFilial] = useState({})
   const [disable, setDisable] = useState(false)

   const getUrl = async() =>{
      try{
         const res = await https.get(`/branches/${id}`)
         setFilial(res?.data)
         setBackFilial(res?.data)
      }
      catch(err){
         console.log(err);
      }
   }

   useEffect(() => {
      getUrl()
   }, []);

   // Edit
   function onSubmit() {
      setDisable(true)

      https
         .put(`/branches/${id}`, filial)
         .then(res => {
            setDisable(false)
            alert("Filial o'zgartirildi", 'success')
         })
         .catch(err => {
            setDisable(false)
            alert(err?.response?.data?.message, 'success')
            console.log(err);
         })
   }

   // Back
   function backFun() {
      setFilial(backFilial)
   }

   return (
      <section>
         <div className='filialform_header'>
            <Prev />
         </div>
         <div className='FilialEditTable single_buyurtma'>
            <h1 className='text_center filial_edit_text'>{filial?.name}</h1>
            <Input
               width='100%'
               bordered
               label="Nomi"
               value={filial?.name}
               className='filial_input'
               color="secondary"
               onChange={(e) => {
                  let newfilial = { ...filial }
                  newfilial.name = e.target.value
                  setFilial(newfilial)
               }}
            />
            <Input
               width='100%'
               bordered
               label="Qisqa nomi"
               value={filial?.short_name}
               className='filial_input'
               color="secondary"
               onChange={(e) => {
                  let newfilial = { ...filial }
                  newfilial.short_name = e.target.value
                  setFilial(newfilial)
               }}
            />
            <Input
               width='100%'
               bordered
               label="Filial kodi"
               value={filial?.code}
               className='filial_input'
               color="secondary"
               onChange={(e) => {
                  let newfilial = { ...filial }
                  newfilial.code = e.target.value
                  setFilial(newfilial)
               }}
            />
            <Input
               width='100%'
               bordered
               label="Shartnama"
               value={filial?.contract}
               className='filial_input'
               color="secondary"
               onChange={(e) => {
                  let newfilial = { ...filial }
                  newfilial.contract = e.target.value
                  setFilial(newfilial)
               }}
            />
            <Input
               width='100%'
               bordered
               label="Qo'mita"
               value={filial?.committee}
               className='filial_input'
               color="secondary"
               onChange={(e) => {
                  let newfilial = { ...filial }
                  newfilial.committee = e.target.value
                  setFilial(newfilial)
               }}
            />
            <Input
               width='100%'
               bordered
               label="Manzil"
               value={filial?.address}
               className='filial_input'
               color="secondary"
               onChange={(e) => {
                  let newfilial = { ...filial }
                  newfilial.address = e.target.value
                  setFilial(newfilial)
               }}
            />
            <Input
               width='100%'
               bordered
               label="Bank rekvizitlari"
               value={filial?.requisite}
               className='filial_input'
               color="secondary"
               onChange={(e) => {
                  let newfilial = { ...filial }
                  newfilial.requisite = e.target.value
                  setFilial(newfilial)
               }}
            />
            <Input
               width='100%'
               bordered
               label="ITN"
               value={filial?.itn}
               className='filial_input'
               color="secondary"
               onChange={(e) => {
                  let newfilial = { ...filial }
                  newfilial.itn = e.target.value
                  setFilial(newfilial)
               }}
            />
            <Input
               width='100%'
               bordered
               label="Telefon raqami"
               labelLeft='+998'
               value={filial?.phone}
               className='filial_input'
               color="secondary"
               onChange={(e) => {
                  let newfilial = { ...filial }
                  newfilial.phone = e.target.value
                  setFilial(newfilial)
               }}
            />
            <Input
               width='100%'
               bordered
               label="Shahar"
               value={filial?.city}
               className='filial_input'
               color="secondary"
               onChange={(e) => {
                  let newfilial = { ...filial }
                  newfilial.city = e.target.value
                  setFilial(newfilial)
               }}
            />
            <Input
               width='100%'
               bordered
               label="Sudi"
               value={filial?.judge}
               className='filial_input'
               color="secondary"
               onChange={(e) => {
                  let newfilial = { ...filial }
                  newfilial.judge = e.target.value
                  setFilial(newfilial)
               }}
            />
            <div className="numeric_format_input width_100 border_radius_10 taminot_tableform_input">
               <label>Kredit limiti</label>
               <NumericFormat
                  thousandSeparator={' '}
                  value={filial?.limit_credit}
                  onChange={(e)=>{
                     const changed_number = Number((e.target.value).replace(/\s/g, ''))
                     let newfilial = { ...filial }
                     newfilial.limit_credit = changed_number
                     setFilial(newfilial)
                  }}
               />
            </div>
            <div className='xodim_buttons'>
               <button type='reset' className='client_submit reset back_red' onClick={() => { backFun() }}>
                  O'zgarishni bekor qilish
                  <AiOutlineClear />
               </button>
               <button type='submit' className='client_submit submit back_green' onClick={() => { onSubmit() }}>
                  O'zgarishni kiritish
                  <AiOutlineUserAdd />
               </button>
            </div>
         </div>

         <LoaderBackdrop disable={disable} />
      </section>
   )
}

export default BranchEdit