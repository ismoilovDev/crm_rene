import { useLocation } from 'react-router-dom'
import Adding_VVB from './AddingVVB';
import AddingVVBbug from './AddingVVBbug';
import fullName from '../utils/functions/fullName';
import { PdfWrapper } from '../components/Pdf/Wrapper';
import useDataFetching from '../hooks/usePdfDataFetching';
import { PdfControls } from '../components/Pdf/PdfControls';
import { checkOwner } from '../utils/functions/supplyTypes';
import { getSummaText, supplySumProcentClient } from '../utils/functions/totalSum';
import { AutoTable, GoldTable } from './Parts/tables';

function KD2Form() {
   const location = useLocation()
   const orderId = location?.state?.id
   const { data: documentInfo } = useDataFetching(`/kd/${orderId}`)

   return (
      <>
         <PdfControls />
         <PdfWrapper indicator={documentInfo}>
            {
               documentInfo?.data?.supply_infos?.[0]?.type == 'auto' || documentInfo?.data?.supply_infos?.[0]?.type == 'gold' ?
                  <>

                     <p className='text_black_18 text_center'>
                        {documentInfo?.data?.supply_infos?.[0]?.type == 'auto' ? 'Trasport vositasini' : 'Tilla buyumlarni'} garovga qabul qilish uchun kelishuv
                     </p>
                     <p className='text_black_18 text_center pdf_margin_top_5'>
                        D A L O L A T N O M A S I
                     </p>
                     <div className='between align_center pdf_margin_top_20'>
                        <p className='black_text'>{documentInfo?.data?.branch?.city}</p>
                        <p className='black_text'>{documentInfo?.contract_issue_date} yil</p>
                     </div>
                     <div className='pdf_margin_top_20'>
                        <p className='distance'>Biz, quyida imzo chekuvchilar, {documentInfo?.data?.branch?.name} Kredit Komissiyasi raisi {Adding_VVB(documentInfo?.data?.branch?.id) ? 'v.v.b' : ''} {fullName(documentInfo?.data?.branch?.head_of_branch)}, Kredit Komissiyasining a'zolari {AddingVVBbug(documentInfo?.data?.branch?.id) ? 'v.v.b' : ''} {fullName(documentInfo?.data?.branch?.chief_accountant)} ,{fullName(documentInfo?.data?.branch?.head_of_credit)} va {documentInfo?.contract_issue_date} yil dagi {documentInfo?.contract_num}-sonli
                           mikroqarz shartnomasiga ta'minot sifatida taklif etilayotgan mol-mulkni garovga qo‘yuvchi
                           {
                              documentInfo?.data?.supply_infos?.[0]?.type == 'auto' ?
                                 `${checkOwner(documentInfo?.data?.supply_infos?.[0]) ?
                                    ` ${checkOwner(documentInfo?.data?.supply_infos?.[0])?.fio} (shaxsini tasdiqlovchi hujjat ma'lumotlari: ${checkOwner(documentInfo?.data?.supply_infos?.[0])?.serial_num} raqamli ${checkOwner(documentInfo?.data?.supply_infos?.[0])?.doc_type}  ${checkOwner(documentInfo?.data?.supply_infos?.[0])?.issued_date} y. da ${checkOwner(documentInfo?.data?.supply_infos?.[0])?.issued_by} tomonidan berilgan. Yashash manzilim:${checkOwner(documentInfo?.data?.supply_infos?.[0])?.address}), `
                                    : ` ${documentInfo?.data?.client?.name} (shaxsini tasdiqlovchi hujjat ma'lumotlari: ${documentInfo?.data?.client?.serial_num} raqamli ${documentInfo?.data?.client?.doc_type}  ${documentInfo?.data?.client?.issued_date} y. da ${documentInfo?.data?.client?.issued_by} tomonidan berilgan. Yashash manzilim:${documentInfo?.data?.client?.city}, ${documentInfo?.data?.client?.district}, ${documentInfo?.data?.client?.address}), `
                                 }`
                                 :
                                 `
                                    ${documentInfo?.data?.client?.name} (shaxsini tasdiqlovchi hujjat ma'lumotlari: ${documentInfo?.data?.client?.serial_num} raqamli ${documentInfo?.data?.client?.doc_type}  ${documentInfo?.data?.client?.issued_date} y. da ${documentInfo?.data?.client?.issued_by} tomonidan berilgan. Yashash manzilim:${documentInfo?.data?.client?.city}, ${documentInfo?.data?.client?.district}, ${documentInfo?.data?.client?.address}), 
                                `
                           }
                           ushbu dalolatnomani quyidagilar to‘g‘risida tuzdik:</p>
                        <p className='pdf_margin_top_20 distance'>
                           Quyidagi Jadval №1 da keltirilgan
                           {
                              documentInfo?.data?.supply_infos?.[0]?.type == 'auto' ?
                                 `${checkOwner(documentInfo?.data?.supply_infos?.[0]) ?
                                    `  ${checkOwner(documentInfo?.data?.supply_infos?.[0])?.fio}`
                                    : `  ${documentInfo?.data?.client?.name} `
                                 }`
                                 :
                                 `
                                        ${documentInfo?.data?.client?.name}
                                    `
                           }
                           {` `}taqdim etgan {documentInfo?.data?.supply_infos?.[0]?.type == 'auto' ? 'trasport vositasi' : 'tilla buyumlar'} {documentInfo?.data?.supply_infos?.[0]?.company?.name ?
                              (`(${documentInfo?.data?.supply_infos?.[0]?.company?.name} tomonidan o‘ralgan va muhrlangan) ${documentInfo?.data?.supply_infos?.[0]?.company?.name} (${documentInfo?.data?.supply_infos?.[0]?.company?.license})  baholovchisi ${documentInfo?.data?.supply_infos?.[0]?.company?.valuer_name} amalga oshirgan ${documentInfo?.data?.supply_infos?.[0]?.date} dagi ${documentInfo?.data?.supply_infos?.[0]?.company?.doc_code} sonli ''Tilla buyumlarni baholash to‘g‘risidagi Hisobot''`) : (`${documentInfo?.data?.supply_infos?.[0]?.date} yildagi tomonlar o'rtasidagi o‘zaro kelishuv`)}
                           ga asosan ushbu bahoga kelishildi:
                        </p>
                     </div>
                     <div className='endRow pdf_margin_top_10'>
                        <p>Jadval №1</p>
                        {console.log(documentInfo?.data?.supply_infos)}
                     </div>
                     {
                        documentInfo?.data?.supply_infos?.map((item, mindex) => {
                           if (item?.type == 'auto') {
                              return(<AutoTable auto={item?.auto} />)
                           } else if (item?.type == 'gold') {
                              return(<GoldTable gold={item?.gold} />)
                           }
                        })
                     }
                     <div>
                        <p className='pdf_margin_top_30 distance'>
                           O'zaro kelishuvga asosan {documentInfo?.data?.supply_infos?.[0]?.type == 'auto' ? getSummaText(documentInfo?.data?.supply_infos?.[0]?.auto, 'sum') : getSummaText(documentInfo?.data?.supply_infos?.[0]?.gold, 'sum')} so‘mga baholangan {documentInfo?.data?.supply_infos?.[0]?.type == 'auto' ? 'trasport vositasi' : 'tilla buyumlar'} "Renesans Mikromoliya Tashkiloti" MChJ tomonidan tomonlarning kelishuviga binoan o‘z baholangan qiymatining {supplySumProcentClient(documentInfo?.data?.supply_infos)?.percent}%, ya'ni {supplySumProcentClient(documentInfo?.data?.supply_infos)?.sum?.toLocaleString()} so‘m miqdorida garov sifatida qabul qilinadi.
                        </p>
                        <p className='pdf_margin_top_20 distance'>
                           Yuqorida keltirilganlarga asosan (Jadval №1), {documentInfo?.data?.branch?.name} tomonidan qabul qilinayotgan garov qiymati tomonlarning kelishuviga binoan {supplySumProcentClient(documentInfo?.data?.supply_infos)?.sum?.toLocaleString(undefined, { minimumFractionDigits: 2 })} so‘m deb hisoblaniladi.
                        </p>
                        <p className='pdf_margin_top_30'>
                           Yuqoridagi dalolatnomani tasdiqlaymiz:
                        </p>
                        <div className='between align_center pdf_margin_top_10'>
                           <p>Kredit Komissiyasi Raisi</p>
                           <p>{Adding_VVB(documentInfo?.data?.branch?.id) ? 'v.v.b' : ''} {fullName(documentInfo?.data?.branch?.head_of_branch)}</p>
                        </div>
                        <div className='between align_center pdf_margin_top_10'>
                           <p>Kredit Komissiyasi a'zorali</p>
                           <p>{AddingVVBbug(documentInfo?.data?.branch?.id) ? 'v.v.b' : ''} {fullName(documentInfo?.data?.branch?.chief_accountant)}</p>
                        </div>
                        <div className='between align_center pdf_margin_top_10'>
                           <p></p>
                           <p>{fullName(documentInfo?.data?.branch?.head_of_credit)}</p>
                        </div>
                        <p className='pdf_margin_top_20'>
                           Kelishildi va tanishtirildi:
                        </p>
                        <p className='pdf_margin_top_5'>
                           {
                              documentInfo?.data?.supply_infos?.[0]?.type == 'auto' ?
                                 `${checkOwner(documentInfo?.data?.supply_infos?.[0]) ?
                                    `  ${checkOwner(documentInfo?.data?.supply_infos?.[0])?.fio}`
                                    : `  ${documentInfo?.data?.client?.name} `
                                 }`
                                 :
                                 `
                                        ${documentInfo?.data?.client?.name}
                                    `
                           }
                        </p>
                        <p className='pdf_margin_top_20'>
                           ____________________________
                        </p>
                     </div>
                  </> : null
            }
         </PdfWrapper>
      </>
   )
}

export default KD2Form