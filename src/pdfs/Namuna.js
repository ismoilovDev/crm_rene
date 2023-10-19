import { useLocation } from 'react-router-dom'
import { getSumma, getSummaText } from '../utils/functions/totalSum'
import { PdfControls } from '../components/Pdf/PdfControls';
import { PdfWrapper } from '../components/Pdf/Wrapper';
import useDataFetching from '../hooks/usePdfDataFetching'

function Namuna() {
   const location = useLocation()
   const orderId = location?.state?.id
   const { data: documentInfo } = useDataFetching(`/g1/${orderId}`)

   return (
      <>
         <PdfControls />
         <PdfWrapper indicator={documentInfo}>
            <p className='text_black_18 text_center'>Карз туловларини коплаш </p>
            <p className='text_black_18 text_center pdf_margin_top_5'>ЖАДВАЛИ</p>
            <div className='pdf_g1_table_first pdf_margin_top_30'>
               <div>
                  <p>Микроқарзнинг умумий миқдори</p>
                  <p>{documentInfo?.order?.sum?.toLocaleString()} so‘m</p>
               </div>
               <div>
                  <p>Микроқарз берилган сана</p>
                  <p>{documentInfo?.order?.order_date}</p>
               </div>
               <div>
                  <p>Микроқарзни сўндириш санаси</p>
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
                           <p>{item?.principal_debt_left?.toLocaleString()} so'm</p>
                           <p>{item?.principal_debt?.toLocaleString()} so'm</p>
                           <p>{item?.interest?.toLocaleString()} so'm</p>
                           <p>{(item?.monthly_payment)?.toLocaleString()} so'm</p>
                        </div>
                     )
                  })
               }
               <div className='g1_table2_header'>
                  <p></p>
                  <p className='black_text'>Jami:</p>
                  <p></p>
                  <p className='black_text'>{getSummaText(documentInfo?.graph, 'principal_debt')} so'm</p>
                  <p className='black_text'>{(getSumma(documentInfo?.graph, 'monthly_payment') - getSumma(documentInfo?.graph, 'principal_debt')).toLocaleString()} so'm</p>
                  <p className='black_text'>{getSummaText(documentInfo?.graph, 'monthly_payment')}so'm</p>
               </div>
            </div>
            <div className='pdf_namuna_end_table pdf_margin_top_30'>
               <div className='namuna_table_section'>
                  <p className='black_text'>Қарз олувчи:</p>
                  <p>Паспорт (оригинал)</p>
                  <p>Сўнгги 12 ой учун иш жойидан даромади тўғрисида маълумотнома</p>
                  <p>СТИР (ИНН) нусхаси</p>
               </div>
               <div className='namuna_table_section'>
                  <p className='black_text'>Кафиллик берувчи:</p>
                  <p>Паспорт (оригинал)</p>
                  <p>Сўнгги 12 ой учун иш жойидан даромади тўғрисида маълумотнома</p>
                  <p>СТИР (ИНН) нусхаси</p>
               </div>
            </div>
         </PdfWrapper>
      </>
   )
}

export default Namuna