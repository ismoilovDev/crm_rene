import { useLocation } from 'react-router-dom'
import { collectReasonsClient, collectReasonsGroup } from '../utils/functions/totalSum'
import { PdfControls } from '../components/Pdf/PdfControls'
import { PdfWrapper } from '../components/Pdf/Wrapper'
import useDataFetching from '../hooks/usePdfDataFetching'
import fullName from '../utils/functions/fullName'
import Logo from '../assets/images/Logo'

function X1Form() {
   const location = useLocation()
   const orderId = location?.state?.id
   const { data: documentInfo } = useDataFetching(`/x1/${orderId}`)

   return (
      <>
         <PdfControls />
         <PdfWrapper indicator={documentInfo}>
            <div className='b1_img_start margin_top_minus column_div'>
               <Logo width={300} />
               <p>{documentInfo?.branch?.name}</p>
               <p >{documentInfo?.branch?.address}</p>
            </div>
            {
               documentInfo?.group?.name ?
                  documentInfo?.group?.clients?.map(item => {
                     return (
                        <div className='x1_preview_part pdf_margin_top_20'>
                           <div className='x1_preview_div'>
                              <p className='text_black_18'>{item?.name}ga</p>
                              <p className="pdf_margin_top_10">{item?.city}, {item?.district}, {item?.address}</p>
                           </div>
                        </div>
                     )
                  }) :
                  <div className='x1_preview_part pdf_margin_top_20'>
                     <div className='x1_preview_div'>
                        <p className='text_black_18'>{documentInfo?.client?.name}ga</p>
                        <p className="pdf_margin_top_10">{documentInfo?.client?.city}, {documentInfo?.client?.district}, {documentInfo?.client?.address}</p>
                     </div>
                  </div>
            }
            <div className='pdf_margin_top_30'>
               <p className='distance'>
                  Sizning {documentInfo?.group?.name ? documentInfo?.group?.clients?.[0]?.order?.order_date : documentInfo?.order?.order_date} yildagi {documentInfo?.group?.name ? documentInfo?.group?.clients?.[0]?.order?.order_number : documentInfo?.order?.order_number}-sonli kredit olish uchun bergan buyurtmangiz Renesans Mikromoliya Tashkiloti tomonidan ko‘rib chiqildi va  {documentInfo?.branch?.name} Kredit Komissiyasining {documentInfo?.group?.name ? documentInfo?.group?.clients?.[0]?.order?.protocol_result_date : documentInfo?.order?.protocol_result_date} yildagi {documentInfo?.group?.name ? documentInfo?.group?.clients?.[0]?.order?.protocol_number : documentInfo?.order?.protocol_number}-sonli yig'ilish qaroriga ko'ra quyidagi sabablarga asoslangan holda rad etildi:
               </p>
               <ul className=''>
                  {
                     documentInfo?.group?.name ?
                        collectReasonsGroup(documentInfo?.group?.clients)?.map((item, index) => {
                           return (
                              <li className='point_list margin_top_15' key={index}>
                                 {item}
                              </li>
                           )
                        }) :
                        collectReasonsClient(documentInfo)?.map((item, index) => {
                           return (
                              <li className='point_list margin_top_15' key={index}>
                                 {item}
                              </li>
                           )
                        })
                  }
               </ul>
               <p className='pdf_margin_top_30 distance'>
                  Yuqoridagi sabablar bartaraf etilganidan so‘ng Renesans Mikromoliya Tashkilotiga qaytadan kredit uchun buyurtma berishingiz mumkin.
               </p>
               <p className='pdf_margin_top_20 distance'>
                  Shuningdek, ushbu qarordan norozi bo‘lsangiz {documentInfo?.branch?.name}ning yuqori boshqaruv organlariga yoki O‘zbekiston Respublikasining tegishli sudlariga murojaat etishingiz mumkinligini ma'lum qilamiz.
               </p>
               <p className='pdf_margin_top_40'>Hurmat bilan,</p>
               <div className='pdf_margin_top_15 between align_center'>
                  <p className='x1_end_width400'>{documentInfo?.branch?.name} Boshqaruvchisi</p>
                  <p>{fullName(documentInfo?.branch?.head_of_branch)}</p>
               </div>
            </div>
         </PdfWrapper>
      </>
   )
}

export default X1Form