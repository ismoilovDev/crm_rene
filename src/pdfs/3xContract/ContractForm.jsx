import Adding_VVB from "../AddingVVB"
import AddingVVBbug from "../AddingVVBbug"
import { CardInfo } from '../Parts/personal';
import fullName from "../../utils/functions/fullName"
import { phoneFormat } from '../../utils/functions/phoneFormat';

export function ContractForm({documentInfo, orderInfo}) {

   return (
      <div className='pdf_end_2sections pdf_margin_top_5'>
         <div className='pdf_end_2sections_section'>
            <p className='title_contract black_text text_center'>Qarz beruvchi:</p>
            <div className='margin_top_15 section_space_pdf'>
               <p className='black_text text_center title_contract'>{documentInfo?.data?.branch?.name}</p>
               <p className='pdf_margin_top_20'>{documentInfo?.data?.branch?.address}</p>
               <p>{documentInfo?.data?.branch?.requisite}</p>
               <p>{documentInfo?.data?.branch?.itn}</p>
               <p>Tel.: {phoneFormat(documentInfo?.data?.branch?.phone)}</p>
            </div>
            <div className='pdf_margin_top_20'>
               <div className='between pdf_margin_top_20'>
                  <p>Boshqaruvchi </p>
                  <p>{Adding_VVB(documentInfo?.data?.branch?.id) ? 'v.v.b' : ''} {fullName(documentInfo?.data?.branch?.head_of_branch)}</p>
               </div>
               <div className='between pdf_margin_top_20'>
                  <p>Bosh buxgalter </p>
                  <p>{AddingVVBbug(documentInfo?.data?.branch?.id) ? 'v.v.b' : ''} {fullName(documentInfo?.data?.branch?.chief_accountant)}</p>
               </div>
            </div>
         </div>
         <div className='pdf_end_2sections_section'>
            <p className='title_contract black_text text_center'>Qarz oluvchi:</p>
               <div className='margin_top_15 section_space_pdf'>
                  <p className='black_text text_center'>{documentInfo?.data?.client?.name}</p>
                  <p className='pdf_margin_top_20'>{documentInfo?.data?.client?.serial_num} raqamli {documentInfo?.data?.client?.doc_type}   {documentInfo?.data?.client?.issued_date} y da {documentInfo?.data?.client?.issued_by} tomonidan berilgan.</p>
                  <p>Yashash manzili: {documentInfo?.data?.client?.city}, {documentInfo?.data?.client?.district}, {documentInfo?.data?.client?.address}</p>
                  <p>JSh ShIR: {documentInfo?.data?.client?.pinfl}</p>
                  <p>Telefon: {phoneFormat(documentInfo?.data?.client?.phone?.[0])} {documentInfo?.data?.client?.phone?.[1] ? phoneFormat(documentInfo?.data?.client?.phone?.[1]) : ''}</p>
                  {
                     orderInfo?.type_credit === "card" ? 
                     <CardInfo info={orderInfo}/> : <></>
                  }
               </div>
               <div className='endRow pdf_margin_top_30'>
                  <p>________________</p>
               </div>
         </div>
      </div>
   )
}
