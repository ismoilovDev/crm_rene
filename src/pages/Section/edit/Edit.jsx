import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { AiOutlineClear, AiOutlineUserAdd } from 'react-icons/ai'
import { Input } from '@nextui-org/react'
import { alert } from '../../../components/Alert/alert'
import LoaderBackdrop from '../../../components/Loader/LoaderBackdrop';
import Prev from '../../../components/Prev/Prev'
import https from '../../../services/https'


function SectionEdit() {

   const { id } = useParams();
   const [section, setSection] = useState({})
   const [backSection, setBackSection] = useState({})
   const [status, setStatus] = useState('')
   const [disable, setDisable] = useState(false)

   const getUrl = async () => {
      try {
         const res = await https.get(`/sections/${id}`)
         setSection(
            res?.data
         )
         setBackSection(
            res?.data
         )
      }
      catch (err) {
         console.log(err)
      }
   }

   useEffect(() => {
      getUrl()
   }, [])

   function backFun() {
      setSection(backSection)
   }

   function onSubmit(a) {
      if (a.trim()) {
         setDisable(true)

         let data = {
            "name": section.name
         }
         https
            .put(`/sections/${id}`, data)
            .then(res => {
               if (res.request.status === 200 || res.request.status === 201) {
                  setDisable(false)
                  alert("Bo'lim o'zgartirildi", 'success')
                  setStatus('')
               }
            })
            .catch(err => {
               setDisable(false)
               alert(err?.response?.data?.message, 'error')
            })
      } else {
         setStatus("error")
      }
   }

   return (
      <section>
         <div className='filialform_header'>
            <Prev />
         </div>
         <div className='single_buyurtma'>
            <h1 className='text_center filial_edit_text'>{section?.name}</h1>
            <div className='pdf_margin_top_15'>
               <Input
                  width='100%'
                  bordered
                  label="Nomi"
                  value={section?.name}
                  className='filial_input'
                  color="secondary"
                  onChange={(e) => {
                     let newsection = { ...section }
                     newsection.name = e.target.value
                     setSection(newsection)
                  }}
                  status={status}
               />
               <div className='xodim_buttons'>
                  <button type='reset' className='client_submit reset back_red' onClick={() => { backFun() }}>
                     O'zgarishni bekor qilish
                     <AiOutlineClear />
                  </button>
                  <button type='submit' className='client_submit submit back_green' onClick={() => { onSubmit(section?.name) }}>
                     O'zgarishni kiritish
                     <AiOutlineUserAdd />
                  </button>
               </div>

               <LoaderBackdrop disable={disable} />
            </div>
         </div>
      </section>
   )
}

export default SectionEdit