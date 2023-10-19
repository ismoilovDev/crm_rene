import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { List } from 'react-content-loader'
import Prev from '../../../components/Prev/Prev';
import https from '../../../services/https';


function SingleInsurance() {
   const { id } = useParams()
   const [loading, setLoading] = useState(true)
   const [sugurtaInfo, setSugurtaInfo] = useState({})

   useEffect(() => {
      https
         .get(`/supply-info/${id}`)
         .then(res => {
            setSugurtaInfo(res?.data)
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
                     <h1 className='text_center filial_edit_text'>{sugurtaInfo?.order?.client?.name}</h1>
                     <div className='pdf_margin_top_15'>
                        <div className='single_buyurtma_info'>
                           <div className='single_buyurtma_inputs'>
                              <p>Ta'minot turi:</p>
                              <p>Sugurta kompaniyasi sugurta polisi</p>
                           </div>
                           <div className='single_buyurtma_inputs'>
                              <p>Sug'urta kompaniyasining nomi</p>
                              <p>{sugurtaInfo?.insurance?.company_name}</p>
                           </div>
                           <div className='single_buyurtma_inputs'>
                              <p>Sugurta polis raqami:</p>
                              <p>{sugurtaInfo?.insurance?.policy}</p>
                           </div>
                           <div className='single_buyurtma_inputs'>
                              <p>Sug'urta summasi</p>
                              <p>{sugurtaInfo?.insurance?.sum?.toLocaleString(undefined, {minimumFractionDigits: 2})}</p>
                           </div>
                           <div className='single_buyurtma_inputs'>
                              <p>Sug'urta sanasi:</p>
                              <p>{sugurtaInfo?.insurance?.issue_date}</p>
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

export default SingleInsurance