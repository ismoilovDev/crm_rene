import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { List } from 'react-content-loader'
import Prev from '../../../components/Prev/Prev';
import https from '../../../services/https';

function SingleOwner() {
   const { id } = useParams()
   const [loading, setLoading] = useState(true)
   const [thirdTaminot, setThirdTaminot] = useState({})

   useEffect(() => {
      https
         .get(`/supply-info/${id}`)
         .then(res => {
            setThirdTaminot(res?.data)
            setLoading(false)
         })
         .catch(err => {
            console.log(err)
         })
   }, [])

   return (
      <section>
         <div className='filialform_header'>
            <Prev />
         </div>
         <div className='single_buyurtma'>
            {
               loading ? (
                  <div className='margin_top_30'>
                     <List />
                  </div>
               ) : (
                  <>
                     <h1 className='text_center filial_edit_text'>{thirdTaminot?.order?.client?.name}</h1>
                     <div className='pdf_margin_top_15'>
                        <div className='single_buyurtma_info'>
                           <div className='single_buyurtma_inputs'>
                              <p>Ta'minot turi:</p>
                              <p>3 shaxs kafilligi</p>
                           </div>
                           <div className='single_buyurtma_inputs'>
                              <p>Uchinchi mulki egasining F.I.Sh.</p>
                              <p>{thirdTaminot?.owner?.fio}</p>
                           </div>
                           <div className='single_buyurtma_inputs'>
                              <p>Shaxsini tasdiqlovchi xujjat:</p>
                              <p>{thirdTaminot?.owner?.doc_type}</p>
                           </div>
                           <div className='single_buyurtma_inputs'>
                              <p>Seriyasi va raqami</p>
                              <p>{thirdTaminot?.owner?.serial_num}</p>
                           </div>
                           <div className='single_buyurtma_inputs'>
                              <p>Kim tomonidan berilgan:</p>
                              <p>{thirdTaminot?.owner?.issued_by}</p>
                           </div>
                           <div className='single_buyurtma_inputs'>
                              <p>Berilgan sana</p>
                              <p>{thirdTaminot?.owner?.issued_date}</p>
                           </div>
                           <div className='single_buyurtma_inputs'>
                              <p>Telefon Raqami:</p>
                              <p>{thirdTaminot?.owner?.phone}</p>
                           </div>
                           <div className='single_buyurtma_inputs'>
                              <p>Ro'yxat bo'yicha yashash manzili</p>
                              <p>{thirdTaminot?.owner?.address}</p>
                           </div>
                           <div className='single_buyurtma_inputs'>
                              <p>Identifikatsiya raqami (JShShIR):</p>
                              <p>{thirdTaminot?.owner?.pinfl}</p>
                           </div>
                        </div>
                     </div>
                  </>
               )
            }
         </div>
      </section>
   )
}

export default SingleOwner