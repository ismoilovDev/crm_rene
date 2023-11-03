import { useLocation } from 'react-router-dom'
import { getSummaText, supplySumProcentClient } from '../utils/functions/totalSum'
import { PdfControls } from '../components/Pdf/PdfControls'
import { PdfWrapper } from '../components/Pdf/Wrapper'
import useDataFetching from '../hooks/usePdfDataFetching'
import fullName from '../utils/functions/fullName'
import AddingVVBkassa from './AddingVVBkassa'
import AddingVVBbug from './AddingVVBbug'
import Adding_VVB from './AddingVVB'

function QDForm() {
   const location = useLocation()
   const orderId = location?.state?.id
   const { data: documentInfo } = useDataFetching(`/kd/${orderId}`)

   return (
      <>
         <PdfControls />
         <PdfWrapper indicator={documentInfo}>
            <p className='text_black_18 text_center'>Tilla buyumlarni topshirish-qabul qilish</p>
            <p className='text_black_18 text_center pdf_margin_top_5'>D A L O L A T N O M A S I</p>
            <div className='between align_center pdf_margin_top_20'>
               <p className='black_text'>{documentInfo?.data?.branch?.city}</p>
               <p className='black_text'>{documentInfo?.contract_issue_date} yil</p>
            </div>
            <div>
               {console.log(documentInfo)}
               <p className='pdf_margin_top_30'>
                  {documentInfo?.data?.branch?.name} va {documentInfo?.data?.client?.name} (shaxsini tasdiqlovchi hujjat ma'lumotlari: {documentInfo?.data?.client?.serial_num} raqamli {documentInfo?.data?.client?.doc_type}  {documentInfo?.data?.client?.issued_date} y. da {documentInfo?.data?.client?.issued_by} tomonidan berilgan. Yashash manzilim: {documentInfo?.data?.client?.city}, {documentInfo?.data?.client?.district}, {documentInfo?.data?.client?.address})
                  o‘rtasidagi {documentInfo?.contract_issue_date} yil da imzolangan tilla buyumlarni garovga qabul qilish uchun kelishuv dalolatnomasiga asosan tilla buyumlar {documentInfo?.data?.client?.name} "Renesans Mikromoliya Tashkiloti" MChJga garov ta'minoti sifatida quyidagi ro‘yxat bo‘yicha qabul qilinadi (Jadval №1):
               </p>
               <div className='endRow pdf_margin_top_10'>
                  <p>Jadval №1</p>
               </div>
               <div className='p1_second_table pdf_margin_top_10'>
                  <div className='p1_second_table_headers' key={15}>
                     <p className='p1_second_headers_product'>№</p>
                     <p className='p1_second_headers_product'>Nomi</p>
                     <p className='p1_second_headers_product'>Proba</p>
                     <p className='p1_second_headers_product'>O'lchov birligi</p>
                     <p className='p1_second_headers_product'>Soni</p>
                     <p className='p1_second_headers_product'>Umumiy og'irligi (gr)</p>
                     <p className='p1_second_headers_product'>Toshlari og'irligi (gr)</p>
                     <p className='p1_second_headers_product'>Sof og'irligi (gr)</p>
                     <p className='p1_second_headers_product'>Baholangan qiymati, so`m</p>
                  </div>
                  {
                     documentInfo?.data?.supply_infos?.[0]?.gold?.map((gold, goldIndex) => {
                        return (
                           <div className='p1_second_table_headers' key={gold?.id}>
                              <p className='p1_second_headers_product'>{goldIndex + 1}</p>
                              <p className='p1_second_headers_product'>{gold?.name}</p>
                              <p className='p1_second_headers_product'>{gold?.gold_num}</p>
                              <p className='p1_second_headers_product'>{gold?.measure}</p>
                              <p className='p1_second_headers_product'>{gold?.quantity}</p>
                              <p className='p1_second_headers_product'>{gold?.weight?.toLocaleString(undefined, { minimumFractionDigits: 2 })}</p>
                              <p className='p1_second_headers_product'>{gold?.stone_weight?.toLocaleString(undefined, { minimumFractionDigits: 2 })}</p>
                              <p className='p1_second_headers_product'>{gold?.clean_weight?.toLocaleString(undefined, { minimumFractionDigits: 2 })}</p>
                              <p className='p1_second_headers_product'>{gold?.sum?.toLocaleString(undefined, { minimumFractionDigits: 2 })}</p>
                           </div>
                        )
                     })
                  }
                  <div className='p1_second_table_headers' key={13}>
                     <p className='p1_second_headers_product'></p>
                     <p className='p1_second_headers_product black_text'>Jami</p>
                     <p className='p1_second_headers_product'></p>
                     <p className='p1_second_headers_product'></p>
                     <p className='p1_second_headers_product'></p>
                     <p className='p1_second_headers_product black_text'>{getSummaText(documentInfo?.data?.supply_infos?.[0]?.gold, 'weight')}</p>
                     <p className='p1_second_headers_product black_text'>{getSummaText(documentInfo?.data?.supply_infos?.[0]?.gold, 'stone_weight')}</p>
                     <p className='p1_second_headers_product black_text'>{getSummaText(documentInfo?.data?.supply_infos?.[0]?.gold, 'clean_weight')}</p>
                     <p className='p1_second_headers_product black_text'>{getSummaText(documentInfo?.data?.supply_infos?.[0]?.gold, 'sum')}</p>
                  </div>
               </div>
               <p className='pdf_margin_top_30 distance'>
                  {documentInfo?.contract_issue_date} yil da imzolangan tilla buyumlarni garovga qabul qilish uchun kelishuv dalolatnomasiga asosan {supplySumProcentClient(documentInfo?.data?.supply_infos)?.sum?.toLocaleString(undefined, { minimumFractionDigits: 2 })} so‘mga baholangan yuqorida ko‘rsatilgan tilla buyumlar
                  {documentInfo?.data?.client?.name} tomonidan "Renesans Mikromoliya Tashkiloti" MChJga mikroqarzdan foydalanish muddatiga (yoki "Renesans Mikromoliya Tashkiloti" MChJ oldidagi Garov shartnomasi va Mikroqarz shartnomasi bo‘yicha barcha majburiyatlar to‘liq bajarilgunga qadar) topshiriladi.
               </p>
               <p className='pdf_margin_top_30'>
                  Ushbu dalolatnomani tasdiqlaymiz:
               </p>
               <p className='pdf_margin_top_10'>
                  Boshqaruvchi:
               </p>
               <p>
                  {Adding_VVB(documentInfo?.data?.branch?.id) ? 'v.v.b' : ''} {fullName(documentInfo?.data?.branch?.head_of_branch)} _______________
               </p>
               <p className='pdf_margin_top_10'>
                  Bosh buxgalter :
               </p>
               <p>
                  {AddingVVBbug(documentInfo?.data?.branch?.id) ? 'v.v.b' : ''} {fullName(documentInfo?.data?.branch?.chief_accountant)}______________
               </p>
               <div className='pdf_end_2sections pdf_margin_top_40'>
                  <div className='pdf_end_2sections_section'>
                     <p className='black_text'>Qabul qildi:</p>
                     <p className='pdf_margin_top_20'>G‘aznachi:</p>
                     <p>{AddingVVBkassa(documentInfo?.data?.branch?.id) ? 'v.v.b' : ''} {fullName(documentInfo?.data?.branch?.chief_treasurer)}______________</p>
                  </div>
                  <div className='pdf_end_2sections_section'>
                     <p className='black_text'>Topshirdi:</p>
                     <p className='pdf_margin_top_20'>{documentInfo?.data?.client?.name}___________________</p>
                  </div>
               </div>
            </div>
         </PdfWrapper>
      </>
   )
}

export default QDForm