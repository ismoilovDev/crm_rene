import { useState, useMemo } from 'react'
import { useParams } from 'react-router-dom';
import { InputSingle } from '../../../components/Input/InputSingle';
import dateConvert from '../../../utils/functions/fullName';
import Prev from '../../../components/Prev/Prev';
import https from '../../../services/https';


function ContractSingle() {
   const { id } = useParams()
   const [shartnama, setShartnama] = useState({})

   async function getData() {
      try {
         const res = await https.get(`/contracts/${id}`)
         const { data } = res;
         setShartnama(data)
         console.log(data);
      } catch (err) {
         console.log(err);
      }
   }

   useMemo(() => {
      getData()
   }, [id])

   return (
      <section>
         <div className='filialform_header'>
            <Prev />
         </div>
         <div className=' single_buyurtma'>
            <h1 className='text_center filial_edit_text'>{shartnama?.order?.client?.name}</h1>
            <div className='pdf_margin_top_15'>
               <div className='single_buyurtma_info'>
                  {
                     shartnama?.group?.name ?
                        <InputSingle label={"Guruh nomi:"} value={shartnama?.group?.name} />
                        : <InputSingle label={"Buyurtma Code:"} value={shartnama?.order?.code} />
                  }
                  <InputSingle label={"Mikroqarz berish sanasi:"} value={dateConvert(shartnama?.credit_issue_date)} />
                  <InputSingle label={"Birinchi tolov sonasi:"} value={dateConvert(shartnama?.first_repayment_date)} />
                  <InputSingle label={"Shartnoma sanasi:"} value={dateConvert(shartnama?.contract_issue_date)} />
                  <InputSingle label={"Shartnoma kodi:"} value={shartnama?.contract_num} />
               </div>
            </div>
         </div>
      </section>
   )
}
export default ContractSingle;