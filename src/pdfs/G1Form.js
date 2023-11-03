import { useLocation } from 'react-router-dom'
import Adding_VVB from './AddingVVB'
import AddingVVBbug from './AddingVVBbug'
import { CardInfo } from './Parts/personal'
import fullName from '../utils/functions/fullName'
import { PdfWrapper } from '../components/Pdf/Wrapper'
import useDataFetching from '../hooks/usePdfDataFetching'
import { PdfControls } from '../components/Pdf/PdfControls'
import { getSumma, getSummaText } from '../utils/functions/totalSum'

function G1Form() {
   const location = useLocation()
   const orderId = location?.state?.id
   const { data: documentInfo } = useDataFetching(`/g1/${orderId}`)

   return (
      <>
         <PdfControls />
         <PdfWrapper indicator={documentInfo}>
            <div className='between'>
               <div className='number_box'>
                  <p>To‘lov tizimlari uchun shartnoma kodi</p>
                  <div></div>
               </div>
               <div className='column_div'>
                  <p>Qarz shartnomasiga №______________</p>
                  <div className='endRow pdf_margin_top_10'>
                     <p>Ilova №1</p>
                  </div>
               </div>
            </div>
            <p className='text_black_18 text_center pdf_margin_top_20'>
               Qarz to‘lovlarini qoplash
            </p>
            <p className='text_black_18 text_center'>
               JADVALI
            </p>
            <h2 className='text_center pdf_margin_top_10'>
               {documentInfo?.client?.name}
            </h2>
            <div className='pdf_g1_table_first pdf_margin_top_20'>
               <div>
                  <p>Mikroqarzning umumiy miqdori</p>
                  <p>{documentInfo?.order?.sum?.toLocaleString()} so‘m</p>
               </div>
               <div>
                  <p>Mikroqarz berilgan sana</p>
                  <p>{documentInfo?.order?.order_date}</p>
               </div>
               <div>
                  <p>Mikroqarzni so‘ndirish sanasi</p>
                  <p>{documentInfo?.graph?.[documentInfo?.graph?.length - 1]?.date_of_payment}</p>
               </div>
            </div>
            <div className='pdf_g1_table_second pdf_margin_top_30'>
               <div className='g1_table2_header'>
                  <p>t/r</p>
                  <p>So‘ndirish sanasi</p>
                  <p>Asosiy qarz qoldig‘i</p>
                  <p>Asosiy qarz miqdori</p>
                  <p>Foiz miqdori</p>
                  <p>Jami</p>
               </div>
               {
                  documentInfo?.graph?.map((item, index) => {
                     return (
                        <div className='g1_table2_header' key={item?.['#']}>
                           <p>{index + 1}</p>
                           <p>{item?.date_of_payment}</p>
                           <p>{item?.principal_debt_left?.toLocaleString(undefined, { minimumFractionDigits: 2 })} so'm</p>
                           <p>{item?.principal_debt?.toLocaleString(undefined, { minimumFractionDigits: 2 })} so'm</p>
                           <p>{item?.interest?.toLocaleString(undefined, { minimumFractionDigits: 2 })} so'm</p>
                           <p>{(item?.monthly_payment)?.toLocaleString(undefined, { minimumFractionDigits: 2 })} so'm</p>
                        </div>
                     )
                  })
               }
               <div className='g1_table2_header'>
                  <p></p>
                  <p className='black_text'>Jami:</p>
                  <p></p>
                  <p className='black_text'>{getSummaText(documentInfo?.graph, 'principal_debt')} so'm</p>
                  <p className='black_text'>{(getSumma(documentInfo?.graph, 'monthly_payment') - getSumma(documentInfo?.graph, 'principal_debt'))?.toLocaleString(undefined, { minimumFractionDigits: 2 })} so'm</p>
                  <p className='black_text'>{getSummaText(documentInfo?.graph, 'monthly_payment')} so'm</p>
               </div>
            </div>
            <div className='margin_top_15 row_elem'>
               <p className='black_text marginRight'>Eslatma:</p>
               <p>Qarz oluvchi tomonidan mikroqarz va unga hisoblangan foizlar jadvalda ko‘rsatilgan sanalardan boshqa kunlarda (shu jumladan, to‘lov sanasi bayram yoxud dam olish kunlariga to‘g‘ri kelganligi munosabati bilan) yoki miqdorlarda so‘ndirilsa, jadval bo‘yicha keyingi to‘lovlar miqdori kamayishi yoki ko‘payishi mumkin. Foizlar shartnoma shartlariga asosan har bir kun uchun asosiy qarz qoldig‘iga nisbatan hisoblanadi.</p>
            </div>
            <div>
               <div className='pdf_end_2sections pdf_margin_top_30'>
                  <div className='pdf_end_2sections_section'>
                     <p className='black_text'>Qarz beruvchi:</p>
                     <div className='pdf_margin_top_20 section_space_pdf'>
                        <p className='black_text text_center'>{documentInfo?.branch?.name}</p>
                        <p className='pdf_margin_top_20'>{documentInfo?.branch?.address}</p>
                        <p>{documentInfo?.branch?.requisite}</p>
                        <p>{documentInfo?.branch?.itn}</p>
                        <p>Tel:{documentInfo?.branch?.phone}</p>
                     </div>
                  </div>
                  <div className='pdf_end_2sections_section'>
                     <p className='black_text'>Qarz oluvchi:</p>
                     <div className='pdf_margin_top_20 section_space_pdf'>
                        <p className='black_text text_center'>{documentInfo?.client?.name}</p>
                        <p className='pdf_margin_top_20'>{documentInfo?.client?.serial_num} raqamli {documentInfo?.client?.doc_type} {documentInfo?.client?.issued_date} da {documentInfo?.client?.issued_by} tomonidan berilgan.</p>
                        <p>Yashash manzili:{documentInfo?.client?.city}, {documentInfo?.client?.district}, {documentInfo?.client?.address}</p>
                        <p>JSh ShIR: {documentInfo?.client?.pinfl}</p>
                        <p>Telefon: {documentInfo?.client?.phone?.join('  ')}</p>
                        {
                           documentInfo?.order?.type_credit === "card" ? 
                           <CardInfo info={documentInfo?.order}/> : <></>
                        }
                     </div>
                  </div>
               </div>
               <div className='pdf_end_2sections pdf_margin_top_30'>
                  <div className='pdf_end_2sections_section'>
                     <div className='between'>
                        <p>Boshqaruvchi </p>
                        <p>{Adding_VVB(documentInfo?.branch?.id) ? 'v.v.b' : ''} {fullName(documentInfo?.branch?.head_of_branch)}</p>
                     </div>
                     <div className='between pdf_margin_top_20'>
                        <p>Bosh buxgalter</p>
                        <p>{AddingVVBbug(documentInfo?.branch?.id) ? 'v.v.b' : ''} {fullName(documentInfo?.branch?.chief_accountant)}</p>
                     </div>
                  </div>
                  <div className='pdf_end_2sections_section'>
                     <div className='between'>
                        <p>{documentInfo?.client?.name}</p>
                        <p></p>
                     </div>
                     <div className='between pdf_margin_top_20'>
                        <p> </p>
                        <p>___________________</p>
                     </div>
                  </div>
               </div>
            </div>
         </PdfWrapper>
      </>
   )
}

export default G1Form