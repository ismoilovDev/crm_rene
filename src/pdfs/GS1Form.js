import { useState, useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import Adding_VVB from './AddingVVB'
import https from '../services/https'
import AddingVVBbug from './AddingVVBbug'
import { CardInfo } from './Parts/personal'
import fullName from '../utils/functions/fullName'
import { PdfWrapper } from '../components/Pdf/Wrapper'
import useDataFetching from '../hooks/usePdfDataFetching'
import { PdfControls } from '../components/Pdf/PdfControls'
import { checkOwner } from '../utils/functions/supplyTypes'
import { collectClients, getSummaText, ordersSum, supplySumProcentClient } from '../utils/functions/totalSum'

function GS1Form() {
   const location = useLocation()
   const orderId = location?.state?.id
   const [documentInfo, setDocumentInfo] = useState({})
   const [groupInfo, setGroupInfo] = useState({})  

   async function getGroupData(group_id){
      try{
         const res = await https.get(`/groups/${group_id}`)
         const { data } = res;
         setGroupInfo(data)
      }
      catch(err){
         console.log(err);
      }
   }

   async function getData(){
      try{
         const res  = await https.post(`/kd/${orderId}`, {})
         const { data } = res;
         setDocumentInfo(data)
         if (data?.group_id) {
            getGroupData(data?.group_id)
         }
      }
      catch(err){
         console.log(err);
      }
   }

   useEffect(() => {
      getData()
   }, []);

   return (
      <>
         <PdfControls />
         <PdfWrapper indicator={documentInfo}>
            {
               documentInfo?.data?.supply_infos?.[0]?.type == 'auto' ?
                  <p className='text_black_18 text_center'>DASTLABKI GAROV ShARTNOMASI № {documentInfo?.contract_num}</p>
                  :
                  <>
                     <p className='text_black_18 text_center'>TILLA BUYUMLARNI GAROVGA QO‘YISH</p>
                     <p className='text_black_18 text_center'>SHARTNOMASI № {documentInfo?.contract_num}</p>
                  </>
            }
            <div className='between align_center pdf_margin_top_20'>
               <p className='black_text'>{documentInfo?.data?.branch?.city}</p>
               <p className='black_text'>{documentInfo?.contract_issue_date} yil</p>
            </div>
            <div className='text-norm'>
               <p className='pdf_margin_top_30'>
                  {documentInfo?.data?.branch?.name} nomidan {documentInfo?.data?.branch?.contract} asosida ish yurituvchi {documentInfo?.data?.branch?.short_name} Boshqaruvchisi {Adding_VVB(documentInfo?.data?.branch?.id) ? 'v.v.b' : ''} {documentInfo?.data?.branch?.head_of_branch}, bundan buyon «Garovga oluvchi» deb ataladi, bir tomondan, va
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
                  bundan buyon «Garovga qo‘yuvchi» deb ataladi, ikkinchi tomondan, ushbu shartnomani quyidagilar to‘g‘risida tuzdilar:
               </p>
               <ul className='pdf_margin_top_30'>
                  <li className='startRow'>
                     <p> 1.</p>
                     {
                        documentInfo?.group_id ?
                           <p className='p1_left_space'>
                              Garovga oluvchi {documentInfo?.contract_issue_date} yildagi {documentInfo?.contract_num}-sonli mikroqarz shartnomasiga asosan "{groupInfo?.name}" qarzdorlar guruhi a'zolari {collectClients(groupInfo?.clients)}ga {documentInfo?.data?.order?.time} oy muddatga {ordersSum(groupInfo?.activeOrders)} so‘m miqdorda mikroqarz beradi.
                           </p> :
                           <p className='p1_left_space'>
                              Garovga oluvchi {documentInfo?.contract_issue_date} yildagi {documentInfo?.contract_num}-sonli mikroqarz shartnomasiga asosan {documentInfo?.data?.client?.name}ga {documentInfo?.data?.order?.time} oy muddatga {documentInfo?.data?.order?.sum?.toLocaleString(undefined, { minimumFractionDigits: 2 })} so‘m miqdorda mikroqarz beradi.
                           </p>
                     }
                  </li>
                  <li className='pdf_margin_top_10 startRow'>
                     <p>2.</p>
                     <p className='p1_left_space'>
                        Garovga  qo‘yuvchi, mikrokarz  shartnomasi bo‘yicha  olingan mikrokarzning o‘z  vaqtida  qaytarilishini ta'minlash  uchun  Garovga  oluvchiga  quyidagi {documentInfo?.data?.supply_infos?.[0]?.type == 'auto' ? 'trasport vositasi' : 'tilla buyumlar'}ni garovga qo‘yadi:
                     </p>
                  </li>
                  <div className='endRow pdf_margin_top_10'>
                     <p>Jadval №1</p>
                  </div>
                  {
                     documentInfo?.data?.supply_infos?.map(item => {
                        if (item?.type == 'auto') {
                           return (
                              <div className='margin_top_10'>
                                 <table className='single_table_pdf'>
                                    <tbody>
                                       <tr key={99}>
                                          <td>№</td>
                                          <td>Nomi</td>
                                          <td>Ishlab chiqarilgan yil</td>
                                          <td>Davlat raqam belgisi</td>
                                          <td>Transport vositasi turi</td>
                                          <td>Qayd etish guvohnomasi</td>
                                          <td>Dvigatel raqami</td>
                                          <td>Kuzov raqami</td>
                                          <td>Shassi №</td>
                                          <td>Baholangan qiymati, so'm</td>
                                       </tr>
                                       {
                                          item?.auto?.map((car, carIndex) => {
                                             return (
                                                <tr key={car?.id}>
                                                   <td>{carIndex + 1}</td>
                                                   <td>{car?.name}</td>
                                                   <td>{car?.year}</td>
                                                   <td>{car?.number}</td>
                                                   <td>{car?.type_of_auto}</td>
                                                   <td>{car?.registration_cert}</td>
                                                   <td>{car?.engine_number}</td>
                                                   <td>{car?.body_code}</td>
                                                   <td>{car?.chassis}</td>
                                                   <td>{car?.sum?.toLocaleString(undefined, { minimumFractionDigits: 2 })}</td>
                                                </tr>
                                             )
                                          })
                                       }
                                    </tbody>
                                 </table>
                                 <div className='endRow margin_top_10'>
                                    <p className='black_text'>JAMI: {getSummaText(item?.auto, 'sum')} so`m</p>
                                 </div>
                              </div>
                           )
                        } else if (item?.type == 'gold') {
                           return (
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
                                    item?.gold?.map((gold, goldIndex) => {
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
                                    <p className='p1_second_headers_product black_text'>{getSummaText(item?.gold, 'weight')}</p>
                                    <p className='p1_second_headers_product black_text'>{getSummaText(item?.gold, 'stone_weight')}</p>
                                    <p className='p1_second_headers_product black_text'>{getSummaText(item?.gold, 'clean_weight')}</p>
                                    <p className='p1_second_headers_product black_text'>{getSummaText(item?.gold, 'sum')}</p>
                                 </div>
                              </div>
                           )
                        }
                     })
                  }
                  {documentInfo?.data?.supply_infos?.[0]?.type == 'auto' ?
                     <>
                        <li className='pdf_margin_top_10 startRow'>
                           <p>3.</p>
                           <p className='p1_left_space'>
                              Garovga  qo‘yilgan mulk Garovga qo‘yuvchining  shaxsiy mulki hisoblanib, tomonlar o'rtacha {documentInfo?.data?.supply_infos?.[0]?.type == 'auto' ? getSummaText(documentInfo?.data?.supply_infos?.[0]?.auto, 'sum') : getSummaText(documentInfo?.data?.supply_infos?.[0]?.gold, 'sum')} so‘mga baholangan va taraflarning kelishuvga asosan {supplySumProcentClient(documentInfo?.data?.supply_infos)?.sum?.toLocaleString(undefined, { minimumFractionDigits: 2 })} so‘m deb garov uchun qabul qilindi.
                           </p>
                        </li>
                        <li className='pdf_margin_top_10 startRow'>
                           <p>4.</p>
                           <p className='p1_left_space'>
                              Garov ta'minoti qarz beruvchi tomonidan sugurta qilinmaydi, qarz oluvchining xoxishiga ko'ra, uning o'z hisobidan sug'urta qilinishi mumkin.
                           </p>
                        </li>
                        <li className='pdf_margin_top_10 startRow'>
                           <p>5.</p>
                           <p className='p1_left_space'>
                              Garovga  qo‘yilgan garov mulki taraflarning kelishuviga muvofiq saqlash uchun Garovga qo‘yuvchining o‘zida qoldiriladi. Garovga qo‘yuvchi garov mulkini but va foydalanishga yaroqli holatda saqlanishi uchun javobgardir.
                           </p>
                        </li>
                        <li className='pdf_margin_top_10 startRow'>
                           <p>6.</p>
                           <p className='p1_left_space'>
                              Garovga qo‘yuvchi garov mulkini foydalanish uchun uchinchi shaxslarga Garovga oluvchining yozma roziligisiz berishi, shuningdek, boshqa qarz majburiyatlarini bajarilishi uchun ta'minot sifatida garovga qo‘yishi mumkin emas.
                           </p>
                        </li>
                        <li className='pdf_margin_top_10 startRow'>
                           <p>7.</p>
                           <p className='p1_left_space'>
                              Garov mulki O‘zbekiston Respublikasining "Garov reestri to‘g‘risida"gi Qonuniga muvofiq garov shartnomasi tuzilgan vaqtdan e'tiboran garov reestridan ro‘yxatdan o‘tkaziladi va zaruriy hollarda garov ob'ekti bilan bog‘liq boshqa ma'lumotlar kiritiladi.
                           </p>
                        </li>
                        <li className='pdf_margin_top_10 startRow'>
                           <p>8.</p>
                           <p className='p1_left_space'>
                              Mikroqarz shartnomasi bo‘yicha olingan qarz belgilangan muddat ichida to‘lanmagan taqdirda, qarz summasi garovga qo‘yilgan mulkni sotishdan olingan mablag‘lar hisobidan qoplanadi.
                           </p>
                        </li>
                        <li className='pdf_margin_top_10 startRow'>
                           <p>9.</p>
                           <p className='p1_left_space'>
                              Mazkur shartnoma uch nusxada tuzilgan bo‘lib, bir nusxasi Garovga oluvchida, ikkinchi nusxasi Garovga qo‘yuvchida saqlanadi. Uchinchi nusxasi Garov shartnomasini notarial tartibda tasdiqlagan notarial idorada qoldiriladi.
                           </p>
                        </li>
                        <li className='pdf_margin_top_10 startRow'>
                           <p>10.</p>
                           <p className='p1_left_space'>
                              Shartnomaga o‘zgartirish va qo‘shimchalar kiritish yoki uni bekor qilish taraflarning kelishuviga muvofiq, vakolatli shaxslar tomonidan imzolangan va yozma ravishda qo‘shimcha bitim tuzilgan taqdirdagina amalga oshiriladi.
                           </p>
                        </li>
                        <li className='pdf_margin_top_20 startRow'>
                           <p>11.</p>
                           <p className='p1_left_space'>
                              Ushbu shartnoma taraflar tomonidan imzolanib, notarial tartibda tasdiqlangandan so‘ng kuchga kiradi va {documentInfo?.group_id ? "qarzdorlar" : "qarzdor"} tomonidan mikroqarz shartnomasi bo‘yicha barcha majburiyatlar to‘liq bajarilish muddatigacha  belgilanadi.
                           </p>
                        </li>
                        <li className='pdf_margin_top_20 startRow'>
                           <p>12.</p>
                           <p className='p1_left_space'>
                              Ushbu shartnomada nazarda tutilmagan boshqa holatlar O‘zbekiston Respublikasining Fuqarolik Kodeksi va «Garov to‘g‘risida»gi qonunlari bilan tartibga solinadi.
                           </p>
                        </li>
                     </> :
                     <>
                        <li className='pdf_margin_top_10 startRow'>
                           <p>3.</p>
                           <p className='p1_left_space'>
                              Garovga qo‘yilgan mulk Renesans Mikromoliya Tashkilotida saqlanadi.
                           </p>
                        </li>
                        <li className='pdf_margin_top_10 startRow'>
                           <p>4.</p>
                           <p className='p1_left_space'>
                              Garovga  qo‘yilgan mulk Garovga qo‘yuvchining  shaxsiy mulki hisoblanib, tomonlar o'rtacha {documentInfo?.data?.supply_infos?.[0]?.type == 'auto' ? getSummaText(documentInfo?.data?.supply_infos?.[0]?.auto, 'sum') : getSummaText(documentInfo?.data?.supply_infos?.[0]?.gold, 'sum')} so‘mga baholangan va taraflarning kelishuvga asosan {supplySumProcentClient(documentInfo?.data?.supply_infos)?.sum?.toLocaleString(undefined, { minimumFractionDigits: 2 })} so‘m deb garov uchun qabul qilindi.
                           </p>
                        </li>
                        <li className='pdf_margin_top_10 startRow'>
                           <p>5.</p>
                           <p className='p1_left_space'>
                              Garovga  qo‘yilgan tilla buyumlar taraflarning kelishuviga muvofiq to‘liq Garovga oluvchiga topshiriladi va  Garov mulkini topshirish - qabul kilish dalolatnomasi tuziladi.
                           </p>
                        </li>
                        <li className='pdf_margin_top_10 startRow'>
                           <p>6.</p>
                           <p className='p1_left_space'>
                              Garovga  qo‘yilgan tilla buyumlar mikroqarz shartnomasi bo‘yicha barcha majburiyatlar Garovga qo‘yuvchi tomonidan to‘liq  bajarilganidan so‘ng, Garovga qo‘yuvchiga qaytariladi va bu to‘g‘risida topshirish - qabul qilish dalolatnomasi tuziladi.
                           </p>
                        </li>
                        <li className='pdf_margin_top_10 startRow'>
                           <p>7.</p>
                           <p className='p1_left_space'>
                              Mikroqarz shartnomasi bo‘yicha olingan qarz belgilangan muddat ichida to‘lanmagan taqdirda, qarz summasi garovga qo‘yilgan mulkni sotishdan olingan mablag‘lar hisobidan qoplanadi.
                           </p>
                        </li>
                        <li className='pdf_margin_top_10 startRow'>
                           <p>8.</p>
                           <p className='p1_left_space'>
                              Mazkur shartnoma ikki nusxada tuzilgan bo‘lib, bir nusxasi Garovga oluvchida, ikkinchi nusxasi Garovga qo‘yuvchida saqlanadi.
                           </p>
                        </li>
                        <li className='pdf_margin_top_10 startRow'>
                           <p>9.</p>
                           <p className='p1_left_space'>
                              Shartnomaga o‘zgartirish va qo‘shimchalar kiritish yoki uni bekor qilish taraflarning kelishuviga muvofiq, vakolatli shaxslar tomonidan imzolangan va yozma ravishda qo‘shimcha bitim tuzilgan taqdirdagina amalga oshiriladi.
                           </p>
                        </li>
                        <li className='pdf_margin_top_20 startRow'>
                           <p>10.</p>
                           <p className='p1_left_space'>
                              Shartnomaning amal qilish muddati taraflar tomonidan imzolangan paytdan boshlanib, Garovga {documentInfo?.group_id ? "qo'yuvchilar" : "qo'yuvchi"} tomonidan mikroqarz shartnomasi bo‘yicha barcha majburiyatlar to‘liq bajarilish muddatigacha  belgilanadi.
                           </p>
                        </li>
                        <li className='pdf_margin_top_20 startRow'>
                           <p>11.</p>
                           <p className='p1_left_space'>
                              Ushbu shartnomada nazarda tutilmagan boshqa holatlar O‘zbekiston Respublikasining Fuqarolik Kodeksi va «Garov to‘g‘risida»gi qonunlari bilan tartibga solinadi.
                           </p>
                        </li>
                     </>
                  }

               </ul>
               <p className='pdf_margin_top_20 text_black_18 text_center text-norm'>
                  TARAFLARNING REKVIZITLARI VA IMZOLARI:
               </p>
               <div className='pdf_end_2sections pdf_margin_top_20'>
                  <div className='pdf_end_2sections_section'>
                     <p className='black_text text_center'>GAROVGA QO‘YUVCHI:</p>
                     <div className='pdf_margin_top_15 '>
                        {
                           (documentInfo?.data?.supply_infos?.[0]?.type == 'auto' && checkOwner(documentInfo?.data?.supply_infos?.[0])) ?
                           <>
                              <p className='black_text text_center'>{checkOwner(documentInfo?.data?.supply_infos?.[0])?.fio}</p>
                              <p className='pdf_margin_top_20'>{checkOwner(documentInfo?.data?.supply_infos?.[0])?.serial_num} raqamli {checkOwner(documentInfo?.data?.supply_infos?.[0])?.doc_type}  {checkOwner(documentInfo?.data?.supply_infos?.[0])?.issued_date} y. da {checkOwner(documentInfo?.data?.supply_infos?.[0])?.issued_by} tomonidan berilgan.</p>
                              <p>Yashash manzili: {checkOwner(documentInfo?.data?.supply_infos?.[0])?.address}</p>
                              <p>JSh ShIR: {checkOwner(documentInfo?.data?.supply_infos?.[0])?.pinfl}</p>
                              <p>Telefon: {checkOwner(documentInfo?.data?.supply_infos?.[0])?.phone}</p>
                           </>
                           :
                           <>
                              <p className='black_text text_center'>{documentInfo?.data?.client?.name}</p>
                              <p className='pdf_margin_top_20'>{documentInfo?.data?.client?.serial_num} raqamli {documentInfo?.data?.client?.doc_type}  {documentInfo?.data?.client?.issued_date} y. da {documentInfo?.data?.client?.issued_by} tomonidan berilgan.</p>
                              <p>Yashash manzili: {documentInfo?.data?.client?.city}, {documentInfo?.data?.client?.district}, {documentInfo?.data?.client?.address}</p>
                              <p>JSh ShIR: {documentInfo?.data?.client?.pinfl}</p>
                              <p>Telefon: {documentInfo?.data?.client?.phone?.join('  ')}</p>
                              {
                                 documentInfo?.data?.order?.type_credit === "card" ? 
                                 <CardInfo info={documentInfo?.data?.order}/> : <></>
                              }
                           </>
                        }
                     </div>
                  </div>
                  <div className='pdf_end_2sections_section'>
                     <p className='black_text text_center'>GAROVGA OLUVCHI:</p>
                     <div className='pdf_margin_top_10 '>
                        <p className='black_text text_center'>{documentInfo?.data?.branch?.name}</p>
                        <p className='pdf_margin_top_20'>{documentInfo?.data?.branch?.address}</p>
                        <p>{documentInfo?.data?.branch?.requisite}</p>
                        <p>{documentInfo?.data?.branch?.itn}</p>
                        <p>
                           Telefon: {documentInfo?.data?.branch?.phone}
                        </p>
                     </div>
                  </div>
               </div>
               <div className='pdf_end_2sections pdf_margin_top_40'>
                  <div className='pdf_end_2sections_section'>
                     {
                        documentInfo?.data?.supply_infos?.[0]?.type == 'auto' ?
                           checkOwner(documentInfo?.data?.supply_infos?.[0]) ?
                              <div className='between'>
                                 <p>{checkOwner(documentInfo?.data?.supply_infos?.[0])?.fio}</p>
                                 <p></p>
                              </div>
                              :
                              <div className='between'>
                                 <p>{documentInfo?.data?.client?.name}</p>
                                 <p></p>
                              </div>

                           :
                           <div className='between'>
                              <p>{documentInfo?.data?.client?.name}</p>
                              <p></p>
                           </div>
                     }
                     <div className='between pdf_margin_top_20'>
                        <p>Imzo_______________</p>
                        <p> </p>
                     </div>
                  </div>
                  <div className='pdf_end_2sections_section'>
                     <div className='between'>
                        <p>Boshqaruvchi</p>
                        <p>{Adding_VVB(documentInfo?.data?.branch?.id) ? 'v.v.b' : ''} {fullName(documentInfo?.data?.branch?.head_of_branch)}</p>
                     </div>
                     <div className='between pdf_margin_top_20'>
                        <p>Bosh buxgalter </p>
                        <p>{AddingVVBbug(documentInfo?.data?.branch?.id) ? 'v.v.b' : ''} {fullName(documentInfo?.data?.branch?.chief_accountant)}</p>
                     </div>
                  </div>
               </div>
            </div>
         </PdfWrapper>
      </>
   )
}

export default GS1Form