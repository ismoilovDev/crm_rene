import { useState, useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import { checkOwner, checkOwnerClient, reneConfidence, typeFunc, typesSupplyList } from '../utils/functions/supplyTypes';
import { collectClients, collectProducts, collectReasonsClient, collectReasonsGroup, getSumma, getSummaText, supplySumProcent, supplySumProcentClient } from '../utils/functions/totalSum';
import { PdfControls } from '../components/Pdf/PdfControls';
import { PdfWrapper } from '../components/Pdf/Wrapper';
import fullName from '../utils/functions/fullName';
import AddingVVBbug from './AddingVVBbug';
import https from '../services/https';
import Adding_VVB from './AddingVVB';

function P1Form() {
   let autoSum = 0
   let goldSum = 0
   const location = useLocation()
   const orderId = location?.state?.id
   const [ageUsers, setAgeUsers] = useState([])
   const [ageStatus, setAgeStatus] = useState(false)
   const [documentInfo, setDocumentInfo] = useState({})

   useEffect(() => {
      https
         .post(`/p1/${orderId}`, {})
         .then(res => {
            setDocumentInfo(res?.data)
            ageText(res?.data)
         })
         .catch(err => {
            console.log(err)
         })
   }, [])

   function ageText(doc) {
      let users = []
      let maxAge = 65;
      if (doc?.group?.name) {
         doc?.group?.clients?.map(item => {
            if (checkAge(item?.birth_date) > maxAge) {
               if (!users?.includes(item?.name)) {
                  users?.push(item?.name)
               }
            }
         })

         if (users?.length !== 0) {
            setAgeStatus(true)
            setAgeUsers(users)
         }
      } else {
         if (checkAge(doc?.client?.birth_date) > maxAge) {
            setAgeStatus(true)
         }
      }

   }

   function formatDate(dateString) {
      const parts = dateString.split('.');
      const day = parts[0].padStart(2, '0');
      const month = parts[1].padStart(2, '0');
      const year = parts[2];
      return `${month}/${day}/${year}`;
   }

   function checkAge(date) {
      const birthDateStr = formatDate(date);
      if (!birthDateStr) {
         throw new Error('Tug\'ilgan sana kiritilishi shart');
      }

      const birthDate = new Date(birthDateStr);
      if (isNaN(birthDate.getTime())) {
         throw new Error('Tug\'ilgan sana xato');
      }

      // Calculate age
      const today = new Date();
      let age = today.getFullYear() - birthDate.getFullYear();
      const monthDiff = today.getMonth() - birthDate.getMonth();
      const dayDiff = today.getDate() - birthDate.getDate();
      if (monthDiff < 0 || (monthDiff === 0 && dayDiff < 0)) {
         age--;
      }
      return age;
   }

   return (
      <>
         <PdfControls />
         <PdfWrapper indicator={documentInfo?.branch?.short_name}>
            <p className='text_black_18 text_center'>"Renesans Mikromoliya Tashkiloti" MChJ {documentInfo?.branch?.short_name} Kredit Komissiyasining</p>
            <p className='text_black_18 text_center'>{documentInfo?.group?.name ? documentInfo?.group?.clients?.[0]?.order?.protocol_number : documentInfo?.order?.protocol_number} sonli Yig'ilish Bayonnomasi</p>

            <div className='between align_center pdf_margin_top_20'>
               <p className='black_text pdf_margin_top_5'>{documentInfo?.branch?.city}</p>
               <p className='black_text pdf_margin_top_5'>{documentInfo?.group?.name ? documentInfo?.group?.clients?.[0]?.order?.protocol_result_date : documentInfo?.order?.protocol_result_date}</p>
            </div>
            <div className='between align_center pdf_margin_top_10'>
               <p>Kredit Komissiyasi Raisi</p>
               <p>{Adding_VVB(documentInfo?.branch?.id) ? 'v.v.b' : ''} {fullName(documentInfo?.branch?.head_of_branch)}</p>
            </div>
            <div className='between align_center pdf_margin_top_10'>
               <p>Kredit Komissiyasi a'zolari</p>
               <p>{AddingVVBbug(documentInfo?.branch?.id) ? 'v.v.b' : ''} {fullName(documentInfo?.branch?.chief_accountant)}</p>
            </div>
            <div className='between align_center pdf_margin_top_10'>
               <p></p>
               <p>{fullName(documentInfo?.branch?.head_of_credit)}</p>
            </div>
            {
               documentInfo?.group?.name ?
                  <p className='pdf_margin_top_30'>
                     Kun tartibi: Buyurtmachilar "{documentInfo?.group?.name}" {reneConfidence(documentInfo) ? "solidar tartibda javobgarlar" : "qarzdorlar"} guruhi a'zolari {collectClients(documentInfo?.group?.clients)}ning {reneConfidence(documentInfo) ? "solidar guruh kafilligi" : `${collectProducts(documentInfo?.group?.clients)} shartlari `} asosida mikroqarz ajratish bo'yicha berilgan buyurtmalarini ko'rib chiqish
                  </p> :
                  <p className='pdf_margin_top_30'>
                     Kun tartibi: Buyurtmachi {documentInfo?.client?.name}ning {documentInfo?.product?.name} shartlari asosida mikroqarz ajratish bo'yicha berilgan buyurtmasini ko'rib chiqish
                  </p>
            }
            <p className='pdf_margin_top_20'>
               "Renesans Mikromoliya Tashkiloti" MChJ {documentInfo?.branch?.short_name}ga {documentInfo?.group?.name ? 'Buyurtmachilar' : 'Buyurtmachi'} quyidagi shartlarda mikroqarz so'rab murojaat etgan:
            </p>
            <div className='pdf_p1_table pdf_margin_top_5'>
               <div className='pdf_p1_table_headers' key={19}>
                  <p className='p1_headers_product'>№</p>
                  <p className='p1_headers_product'>F.I.O</p>
                  <p className='p1_headers_product'>Shaxsini tasdiqlovchi hujjat</p>
                  <p className='p1_headers_product'>Mikroqarz miqdori</p>
                  <p className='p1_headers_product'>Maqsadi</p>
                  <p className='p1_headers_product'>Muddat</p>
               </div>
               {
                  documentInfo?.group?.name ?
                     documentInfo?.group?.clients?.map((item, index) => {
                        return (
                           <div className='pdf_p1_table_headers' key={item?.id}>
                              <p className='p1_headers_product'>{index + 1}</p>
                              <p className='p1_headers_product'>{item?.name}</p>
                              <p className='p1_headers_product'>{item?.serial_num} raqamli {item?.doc_type} {item?.issued_date} da {item?.issued_by} tomonidan berilgan</p>
                              <p className='p1_headers_product'>{item?.order?.sum?.toLocaleString(undefined, { minimumFractionDigits: 2 })} so'm</p>
                              <p className='p1_headers_product'>{item?.order?.aim}</p>
                              <p className='p1_headers_product'>{item?.order?.time} oy</p>
                           </div>
                        )
                     }) :
                     <div className='pdf_p1_table_headers' key={18}>
                        <p className='p1_headers_product'>{1}</p>
                        <p className='p1_headers_product'>{documentInfo?.client?.name}</p>
                        <p className='p1_headers_product'>{documentInfo?.client?.serial_num} raqamli {documentInfo?.client?.doc_type} {documentInfo?.client?.issued_date} da {documentInfo?.client?.issued_by} tomonidan berilgan</p>
                        <p className='p1_headers_product'>{documentInfo?.order?.sum?.toLocaleString(undefined, { minimumFractionDigits: 2 })} so'm</p>
                        <p className='p1_headers_product'>{documentInfo?.order?.aim}</p>
                        <p className='p1_headers_product'>{documentInfo?.order?.time} oy</p>
                     </div>
               }
            </div>
            <p className={reneConfidence(documentInfo) ? "close" : 'pdf_margin_top_20'}>
               {documentInfo?.group?.name ?
                  `Buyurtmachilar  mikroqarz qaytarilishini ta'minlash maqsadida o‘zaro solidar javobgarlik to‘g‘risidagi Kafillik shartnomasini taqdim qilishlarini va garov shartnomasi asosida
                    ${documentInfo?.group?.clients?.map(item => {
                     if (item?.order?.supply_info?.[0]?.type == 'auto') {
                        return (`${checkOwner(item?.order?.supply_info?.[0]) ? checkOwner(item?.order?.supply_info?.[0]) : item?.name}ga tegishli bo‘lgan transport vositasini garov`)
                     }
                     if (item?.order?.supply_info?.[0]?.type == 'gold') {
                        return (`o'ziga tegishli bo'lgan tilla buyumlarni garov`)
                     }
                     if (item?.order?.supply_info?.[0]?.type == 'guarrantor' || item?.order?.supply_info?.[0]?.type == 'insurance') {
                        return (`${typeFunc(item?.order?.supply_info?.[0]?.type)}`)
                     }
                  }).join('')}ga qo‘yishlarini ma'lum qilganlar.`
                  :
                  (
                     (typesSupplyList(documentInfo?.supply_infos))?.includes('sugurta') ?
                        `Buyurtmachi mikroqarz qaytarilishini ta'minlash maqsadida ${documentInfo?.supply_infos?.[0]?.insurance?.company_name} sug'urta kompaniyasining "Kredit qaytarilmasligini sug'urtalash shartnomasi"ga ko'ra xavfni sug'urtalatishi va tegishli sug'urta polisini taqdim etishini ma'lum qilgan`
                        :
                        (
                           documentInfo?.supply_infos?.[0]?.type == "without_supply" ?
                              "Buyurtmachi o‘zining kredit tarixi hamda qarz oluvchi sifatidagi obro‘sini inobatga olgan xolda, unga mikroqarzni ishonch asosida, hech qanday ta'minotsiz ajratishni so‘ragan." :
                              `Buyurtmachi mikroqarz qaytarilishini ta'minlash maqsadida garov shartnomasi asosida ${(typesSupplyList(documentInfo?.supply_infos))?.includes('transport vositasi garovi') ? checkOwnerClient(documentInfo?.supply_infos?.find(x => x?.type == 'auto')) : "o'zi"}ga tegishli bo'lgan ${documentInfo?.supply_infos?.[0] ? typesSupplyList(documentInfo?.supply_infos) : ""}ga qo'yishlarini ma'lum qilgan.`
                        )
                  )}
            </p>
            {
               reneConfidence(documentInfo) ?
                  <></> :
                  <>
                     {
                        documentInfo?.group?.name ?
                           (documentInfo?.group?.clients?.map(item => {
                              if (item?.order?.supply_info?.[0]?.type == 'auto') {
                                 autoSum += getSumma(item?.order?.supply_info?.[0]?.auto, 'sum')
                                 return (
                                    <div className='margin_top_20'>
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
                                                item?.order?.supply_info?.[0]?.auto?.map((car, carIndex) => {
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
                                          <p className='black_text'>JAMI: {getSummaText(item?.order?.supply_info?.[0]?.auto, 'sum')?.toLocaleString(undefined, { minimumFractionDigits: 2 })} so`m</p>
                                       </div>
                                    </div>
                                 )
                              } else if (item?.order?.supply_info?.[0]?.type == 'gold') {
                                 goldSum += getSumma(item?.order?.supply_info?.[0]?.gold, 'sum')
                                 return (
                                    <div className='p1_second_table pdf_margin_top_20'>
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
                                          item?.order?.supply_info?.[0]?.gold?.map((gold, goldIndex) => {
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
                                          <p className='p1_second_headers_product black_text'>{getSummaText(item?.order?.supply_info?.[0]?.gold, 'weight')}</p>
                                          <p className='p1_second_headers_product black_text'>{getSummaText(item?.order?.supply_info?.[0]?.gold, 'stone_weight')}</p>
                                          <p className='p1_second_headers_product black_text'>{getSummaText(item?.order?.supply_info?.[0]?.gold, 'clean_weight')}</p>
                                          <p className='p1_second_headers_product black_text'>{getSummaText(item?.order?.supply_info?.[0]?.gold, 'sum')}</p>
                                       </div>
                                    </div>
                                 )
                              }
                           })) :
                           (
                              documentInfo?.supply_infos?.map((item, index) => {
                                 if (item?.type == 'auto') {
                                    autoSum += getSumma(item?.auto, 'sum')
                                    return (
                                       <div className='margin_top_20' key={index}>
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
                                                   item?.auto?.map((item, index) => {
                                                      return (
                                                         <tr key={item?.id}>
                                                            <td>{index + 1}</td>
                                                            <td>{item?.name}</td>
                                                            <td>{item?.year}</td>
                                                            <td>{item?.number}</td>
                                                            <td>{item?.type_of_auto}</td>
                                                            <td>{item?.registration_cert}</td>
                                                            <td>{item?.engine_number}</td>
                                                            <td>{item?.body_code}</td>
                                                            <td>{item?.chassis}</td>
                                                            <td>{item?.sum?.toLocaleString(undefined, { minimumFractionDigits: 2 })}</td>
                                                         </tr>
                                                      )
                                                   })
                                                }

                                             </tbody>
                                          </table>
                                          <div className='endRow margin_top_10'>
                                             <p className='black_text'>JAMI: {getSummaText(item?.auto, 'sum')?.toLocaleString(undefined, { minimumFractionDigits: 2 })} so`m</p>
                                          </div>
                                       </div>
                                    )
                                 } else if (item?.type == 'gold') {
                                    goldSum += getSumma(item.gold, 'sum')
                                    return (
                                       <div className='p1_second_table pdf_margin_top_20'>
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
                                             item?.gold?.map((item, index) => {
                                                return (
                                                   <div className='p1_second_table_headers' key={item?.id}>
                                                      <p className='p1_second_headers_product'>{index + 1}</p>
                                                      <p className='p1_second_headers_product'>{item?.name}</p>
                                                      <p className='p1_second_headers_product'>{item?.gold_num}</p>
                                                      <p className='p1_second_headers_product'>{item?.measure}</p>
                                                      <p className='p1_second_headers_product'>{item?.quantity}</p>
                                                      <p className='p1_second_headers_product'>{item?.weight?.toLocaleString(undefined, { minimumFractionDigits: 2 })}</p>
                                                      <p className='p1_second_headers_product'>{item?.stone_weight?.toLocaleString(undefined, { minimumFractionDigits: 2 })}</p>
                                                      <p className='p1_second_headers_product'>{item?.clean_weight?.toLocaleString(undefined, { minimumFractionDigits: 2 })}</p>
                                                      <p className='p1_second_headers_product'>{item?.sum?.toLocaleString(undefined, { minimumFractionDigits: 2 })}</p>
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
                           )
                     }
                  </>
            }

            {
               reneConfidence(documentInfo) ?
                  <p className='pdf_margin_top_15 distance'>
                     Buyurtmachilar o‘zlarini o‘zlari band qilgan xolda kichik tadbirkorlik faoliyati bilan shug‘ullanib keladilar. Buyurtma qilingan mikromoliyaviy xizmatlarni ta'minlash maqsadida o‘zaro ixtiyoriylik asosida "{documentInfo?.group?.name}" deb nomlangan guruh tuzishga qaror qilishib, o‘zaro solidar javobgarlik belgilangan kafillik shartnomasini imzolashgan.
                  </p> :
                  <></>
            }

            <p className='pdf_margin_top_15 distance'>
               {documentInfo?.group?.name ? 'Buyurtmachilar' : 'Buyurtmachi'}ning xarakteri, salohiyati, daromadi va daromad manbalari, kredit tarixi, to‘lovga qobiliyatliligi, buyurtmada ko‘rsatilgan ma'lumotlar, boshqa bank-moliya muassasalari oldidagi mavjud qarzdorligi, ta'minot, buyurtmada ko‘rsatilgan maqsad va kredit mahsulotining muvofiqligi kredit byurosidan va MMTning boshqa o‘z manbalaridan olingan axborotlar asosida o‘rganildi va taxlil qilindi. Shu bilan birgalikda, {documentInfo?.group?.clients?.[0]?.order?.status == 'denied' || documentInfo?.order?.status == 'denied' ? "monitoring bo'limi xodimining yakuniy xulosasi inobatga olindi" : 'qarz yuki ko‘rsatkichi, kreditga layoqatlilik taxlili va yakuniy xulosa inobatga olindi'}.
            </p>
            <p className='pdf_margin_top_20'>
               Yuqoridagilardan kelib chiqqan holda "Renesans Mikromoliya Tashkiloti" MChJ {documentInfo?.branch?.short_name} Kredit Komissiyasi qaror qiladi:
            </p>
            {documentInfo?.group?.clients?.[0]?.order?.status == 'denied' || documentInfo?.order?.status == 'denied' ?
               <>
                  <div className='startRow pdf_margin_top_10'>
                     <p>1</p>
                     <div className='p1_left_space'>
                        MMT Kredit siyosati va o‘rnatilgan tartiblarga ko‘ra {documentInfo?.group?.name ? 'Buyurtmachilar' : 'Buyurtmachi'}ga mikroqarz ajratish quyidagi sabablarga asosan rad etilsin:
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
                     </div>
                  </div>
                  <div className='startRow pdf_margin_top_20'>
                     <p>2</p>
                     <div className='p1_left_space'>
                        <p>
                           {documentInfo?.group?.name ? 'Buyurtmachilar' : `Buyurtmachi ${documentInfo?.client?.name} `} rad etish sabablari ko‘rsatilgan holda berilgan buyurtma rad etilganligi to‘g‘risida  yozma ravishda xabardor etilsin.
                        </p>
                     </div>
                  </div>
               </> :
               <>
                  <div className='startRow pdf_margin_top_10'>
                     <p>1</p>
                     <div className='p1_left_space'>
                        {
                           documentInfo?.group?.name ?
                              <p>
                                 MMT Kredit siyosatiga ko‘ra o‘rnatilgan tartibda mikroqarz shartnomasi asosida {reneConfidence(documentInfo) ? '' : ' garov shartnomasi notarial tartibda tasdiqlangandan so‘ng'} Buyurtmachilarga quyidagicha mikroqarz ajratilsin:
                              </p> :
                              <p>
                                 MMT kredit siyosatiga ko'ra o'rnatilgan tartibda mikroqarz shartnomasiga asosida Buyurtmachiga quyidagicha mikroqarz ajratilsin:
                              </p>
                        }
                        {
                           documentInfo?.group?.name ?
                              <ul className='point_list'>
                                 {
                                    documentInfo?.group?.clients?.map(item => {
                                       return (
                                          <li className='pdf_margin_top_5 point_list' key={item?.name}>
                                             {item?.name}ga {item?.order?.sum?.toLocaleString(undefined, { minimumFractionDigits: 2 })} so'm miqdorida yillik {item?.order?.percent_year} foiz ustama to'lash shart bilan {item?.order?.time} oylik muddatga {item?.order?.aim} uchun;
                                          </li>
                                       )
                                    })
                                 }
                              </ul>
                              :
                              <ul className='point_list'>
                                 <li className='pdf_margin_top_5 point_list'>
                                    {documentInfo?.client?.name}ga {documentInfo?.order?.sum?.toLocaleString(undefined, { minimumFractionDigits: 2 })} so'm miqdorida yillik {documentInfo?.order?.percent_year} foiz ustama tulash shart bilan {documentInfo?.order?.time} oylik muddatga {documentInfo?.order?.aim} uchun;
                                 </li>
                              </ul>
                        }
                     </div>
                  </div>
                  <div className='startRow pdf_margin_top_20'>
                     <p>2</p>
                     <div className='p1_left_space'>
                        {
                           documentInfo?.group?.name ?
                              (
                                 reneConfidence(documentInfo) ?
                                    <p>Ajratilayotgan mikroqarzga ta'minot sifatida o'zaro solidar javobgarlik to'g'risidagi Kafillik shartnomasi qabul qilinsin;</p>
                                    :
                                    <p>
                                       Berilayotgan mikroqarzga ta'minot sifatida o'zaro solidar javobgarlik to'g'risidagi Kafillik shartnomasi va garov shartnomasi asosida
                                       {documentInfo?.group?.clients?.map(item => {
                                          if (item?.order?.supply_info?.[0]?.type == 'auto') {
                                             return (` ${checkOwner(item?.order?.supply_info?.[0]) ? checkOwner(item?.order?.supply_info?.[0]) : item?.name}ga tegishli bo‘lgan transport vositasi`)
                                          } else if (item?.order?.supply_info?.[0]?.type == 'gold') {
                                             return (` o'ziga tegishli bo'lgan tilla buyumlarni garov`)
                                          } else if (item?.order?.supply_info?.[0]?.type == 'guarrantor' || item?.order?.supply_info?.[0]?.type == 'insurance') {
                                             return (` ${typeFunc(item?.order?.supply_info?.[0]?.type)}`)
                                          }
                                       })}
                                       {' '} baholangan qiymatining {documentInfo?.group?.name ? supplySumProcent(documentInfo?.group?.clients)?.percent : supplySumProcentClient(documentInfo?.supply_infos)?.percent}% i yoki {documentInfo?.group?.name ? supplySumProcent(documentInfo?.group?.clients)?.sum?.toLocaleString(undefined, { minimumFractionDigits: 2 }) : supplySumProcentClient(documentInfo?.supply_infos)?.sum?.toLocaleString(undefined, { minimumFractionDigits: 2 })} so'm deb garov uchun qabul qilinsin;
                                    </p>
                              )
                              :
                              (
                                 reneConfidence(documentInfo) ?
                                    <p>Ajratilayotgan mikroqarzga ta'minot sifatida o'zaro solidar javobgarlik to'g'risidagi Kafillik shartnomasi qabul qilindi</p>
                                    :
                                    <p>
                                       {
                                          documentInfo?.supply_infos?.[0]?.type === "without_supply" ?
                                             "Mikroqarz Buyurtmachiga hech qanday ta'minotsiz, ya'ni ishonch asosida (blankli kredit sifatida) ajratilsin;"
                                             : (
                                                (typesSupplyList(documentInfo?.supply_infos))?.includes('sugurta') ?
                                                   "Berilayotgan mikroqarzga ta'minot sifatida Buyurtmachi tomonidan taklif etilgan sug'urta kompaniyasining ''Kredit qaytarilmasligi xavfidan sug'urtalash shartnomasi''ga ko'ra taqdim etiladigan sug'urta polisi qabul qilinsin;"
                                                   :
                                                   ((typesSupplyList(documentInfo?.supply_infos))?.includes('3 shaxs kafilligi') ?
                                                      `Berilayotgan mikroqarzga ta'minot sifatida ${documentInfo?.supply_infos?.[0]?.owner?.fio} kafilligi kafillik shartnomasi asosida qabul qilinsin;` :
                                                      `Berilayotgan mikroqarzga ta'minot sifatida garov shartnomasi asosida ${(typesSupplyList(documentInfo?.supply_infos))?.includes('transport vositasi garovi') ? checkOwnerClient(documentInfo?.supply_infos?.find(x => x?.type == 'auto')) : "o'zi"}ga tegishli bo'lgan Jadval da ko'rsatilgan ${documentInfo?.supply_infos?.[0] ? typesSupplyList(documentInfo?.supply_infos) : ''} o'z baholangan qiymatining ${supplySumProcentClient(documentInfo?.supply_infos)?.percent}% i yoki ${supplySumProcentClient(documentInfo?.supply_infos)?.sum?.toLocaleString(undefined, { minimumFractionDigits: 2 })} so'm deb garov uchun qabul qilinsin;`
                                                   ))}
                                    </p>
                              )
                        }

                     </div>
                  </div>
                  <div className='startRow pdf_margin_top_20'>
                     <p>3</p>
                     <div className='p1_left_space'>
                        <p>
                           Ushbu {documentInfo?.group?.name ? 'buyurtmachilar' : `buyurtmachi`}ga ajratiladigan mikroqarz o‘z boshqaruvidagi kredit portfeliga biriktiriladigan xodim zaruriy xollarda MMT ichki nazorat bo‘limi xodimlarini ham jalb etgan holda MMT ichki qoidalarida o‘rnatilgan tartibda berilgan mikroqarz ustidan doimiy nazorat/monitoring olib borsin.
                        </p>
                     </div>
                  </div>
                  {
                     ageStatus ?
                        <div className='startRow pdf_margin_top_20'>
                           <p>4</p>
                           <div className='p1_left_space'>
                              <p>
                                 "Renesans Mikromoliya Tashkiloti" MChJning Mikromoliya xizmatlari ko'rsatish qoidalarida mijozning yosh chegarasi 65 deb belgilangan bo'lsada,
                                 {documentInfo?.group?.name ?
                                    ` guruh ${ageUsers?.length === 1 ? "a'zosi" : "a'zolari"} (${ageUsers?.length === 1 ? ageUsers?.[0] : ageUsers?.join(", ")}) "Renesans Mikromoliya Tashkiloti" MChJ ning doimiy ${ageUsers?.length === 1 ? "mijozi" : "mijozlari"} bo'lganligi sababli yoshga doir cheklov istisno qilingan holda mikroqarz ajratilsin.`
                                    :
                                    ` "Renesans Mikromoliya Tashkiloti" MChJ ning doimiy mijozi bo'lganligi sababli yoshga doir cheklov istisno qilingan holda mikroqarz ajratilsin.`
                                 }
                              </p>
                           </div>
                        </div> : <></>
                  }
                  {
                     (documentInfo?.group?.clients?.[0]?.order?.sign_committee || documentInfo?.order?.sign_committee) ?
                        <div className='startRow pdf_margin_top_20'>
                           <p>{ageStatus ? 5 : 4}</p>
                           <div className='p1_left_space'>
                              <p>
                                 Buyurtma miqdori filial Kredit komissiyasining vakolat doirasidan yuqori bo‘lganligi sababli, yig‘ilgan hujjatlar yakuniy qaror qabul qilish uchun Bosh ofis Kredit Qo‘mitasiga taqdim etilsin.
                              </p>
                           </div>
                        </div> :
                        <></>
                  }
               </>}

            <div className='between align_center pdf_margin_top_30'>
               <p>Kredit Komissiyasi Raisi</p>
               <p>{Adding_VVB(documentInfo?.branch?.id) ? 'v.v.b' : ''} {fullName(documentInfo?.branch?.head_of_branch)}</p>
            </div>
            <div className='between align_center pdf_margin_top_10'>
               <p>Kredit Komissiyasi a'zolari</p>
               <p>{AddingVVBbug(documentInfo?.branch?.id) ? 'v.v.b' : ''} {fullName(documentInfo?.branch?.chief_accountant)}</p>
            </div>
            <div className='between align_center pdf_margin_top_10'>
               <p></p>
               <p>{fullName(documentInfo?.branch?.head_of_credit)}</p>
            </div>
         </PdfWrapper>
      </>
   )
}

export default P1Form