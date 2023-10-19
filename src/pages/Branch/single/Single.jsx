import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { InputSingle } from '../../../components/Input/InputSingle';
import Prev from '../../../components/Prev/Prev';
import https from '../../../services/https';

function BranchSingle() {
   const [filial, setFilial] = useState({});
   let { id } = useParams()

   useEffect(() => {
      getBranchDetails()
      async function getBranchDetails() {
         try {
            const { data } = await https.get(`/branches/${id}`)
            setFilial(data)
         } catch (err) {
            console.log(err);
         }
      }
   }, [])

   return (
      <section>
         <div className='filialform_header'>
            <Prev />
         </div>
         <div className=' single_buyurtma'>
            <h1 className='text_center filial_edit_text'>{filial?.name}</h1>
            <div className='pdf_margin_top_15'>
               <div className='single_buyurtma_info'>
                  <InputSingle label={"Nomi:"} value={filial?.name} />
                  <InputSingle label={"Qisqa nomi:"} value={filial?.short_name} />
                  <InputSingle label={"Filial kodi:"} value={filial?.code} />
                  <InputSingle label={"Shartnama:"} value={filial?.contract} />
                  <InputSingle label={"Qo'mita:"} value={filial?.committee} />
                  <InputSingle label={"Manzil:"} value={filial?.address} />
                  <InputSingle label={"Bank rekvizitlari:"} value={filial?.requisite} />
                  <InputSingle label={"ITN:"} value={filial?.itn} />
                  <InputSingle label={"Telefon raqam:"} value={`+998 ${filial?.phone}`} />
                  <InputSingle label={"Shahar:"} value={filial?.city} />
                  <InputSingle label={"Sudi:"} value={filial?.judge} />
                  <InputSingle label={"Kredit limiti:"} value={filial?.limit_credit} />
               </div>
            </div>
         </div>
      </section>
   )
}

export default BranchSingle