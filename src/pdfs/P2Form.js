import { useLocation } from 'react-router-dom'
import { PdfControls } from '../components/Pdf/PdfControls';
import { PdfWrapper } from '../components/Pdf/Wrapper';
import { checkOwnerClient, reneConfidence, typesSupply } from '../utils/functions/supplyTypes';
import { collectGroupSupply, collectGroupSupplyFull, getSumma, getSummaText } from '../utils/functions/totalSum';
import useDataFetching from '../hooks/usePdfDataFetching';
import fullName from '../utils/functions/fullName';

function P2Form() {
   let autoSum = 0
   let goldSum = 0
   const location = useLocation()
   const orderId = location?.state?.id
   const { data: documentInfo } = useDataFetching(`/p2/${orderId}`)

   
   return (
      <>
         <PdfControls />
         <PdfWrapper indicator={documentInfo}>
            <p className='text_black_18 text_center'>"Renesans Mikromoliya Tashkiloti" MChJ Kredit Qo‘mitasining</p>
            <p className='text_black_18 text_center'>________________________ sonli Yig'ilish Bayonnomasi</p>

            <div className='between align_center pdf_margin_top_20'>
               <p className='black_text pdf_margin_top_5'>Toshkent sh</p>
               <p className='black_text pdf_margin_top_5'>{documentInfo?.group?.name ? documentInfo?.group?.clients?.[0]?.order?.protocol_result_date : documentInfo?.order?.protocol_result_date}</p>
            </div>
            <div className='between align_center pdf_margin_top_10 capitalize'>
               <p>Kredit Qo‘mitasi Raisi</p>
               <p>{fullName(documentInfo?.branch?.committee_chairman)}</p>
            </div>
            <div className='between align_center pdf_margin_top_10 capitalize'>
               <p>Kredit Qo‘mitasi a'zorali</p>
               <p>{fullName(documentInfo?.branch?.committee_members[0])}</p>
            </div>
            <div className='between align_center pdf_margin_top_10 capitalize'>
               <p></p>
               <p>{fullName(documentInfo?.branch?.committee_members[1])}</p>
            </div>
            <div className='between align_center pdf_margin_top_10 capitalize'>
               <p>Kotib</p>
               <p>Abdullayev N.N</p>
            </div>
            <p className='pdf_margin_top_30'>
               Kun tartibi: {documentInfo?.branch?.name} Kredit Komissiyasining {documentInfo?.group?.name ? documentInfo?.group?.clients?.[0]?.order?.protocol_number : documentInfo?.order?.protocol_number} sonli bayonnomasini ko‘rib chiqish.
            </p>
            <p className='pdf_margin_top_20'>
               Bayonnomaga ko‘ra: {documentInfo?.branch?.name}ga {documentInfo?.group?.name ? "Buyurtmachilar" : "Buyurtmachi"} quyidagi shartlarda mikroqarz so‘rab murojaat etgan:
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
            {
               <p className={reneConfidence(documentInfo) ? "close" : "pdf_margin_top_20"}>
                  {
                     documentInfo?.group?.name ?
                        `Buyurtmachilar mikroqarz qaytarilishini ta'minlash maqsadida 
                           ${collectGroupSupply(documentInfo?.group?.clients)?.includes('auto') ?
                           `o‘zaro solidar javobgarlik to‘g‘risidagi Kafillik shartnomasini taqdim qilishlarini va  garov shartnomasi asosida ${checkOwnerClient(collectGroupSupplyFull(documentInfo?.group?.clients)?.[0])}ga tegishli bo‘lgan transport vositasini garovga qo‘yishlarini ma'lum qilganlar.`
                           : (
                              collectGroupSupply(documentInfo?.group?.clients)?.includes('gold') ?
                                 "garov shartnomasi asosida o‘ziga tegishli bo‘lgan tilla buyumlarni garovga qo‘yishlarini ma'lum qilganlar."
                                 : (
                                    collectGroupSupply(documentInfo?.group?.clients)?.includes('guarrantor') ?
                                       `kafillik shartnomasi asosida ${collectGroupSupplyFull(documentInfo?.group?.clients)}ning to‘liq kafilligini taqdim qilganlar.`
                                       : (
                                          collectGroupSupply(documentInfo?.group?.clients)?.includes('insurance') ?
                                             `${collectGroupSupplyFull(documentInfo?.group?.clients)} sug‘urta kompaniyasining "Kredit qaytarilmasligini sug‘urtalash shartnomasi"ga ko‘ra xavfni sug‘urtalatishi va tegishli sug‘urta polisini taqdim etishini ma'lum qilganlar.`
                                             : ""
                                       )
                                 )
                           )
                        }
                        `
                        :
                        `Buyurtmachi mikroqarz qaytarilishini ta'minlash maqsadida 
                           ${typesSupply(documentInfo?.supply_info)?.includes('transport vositasi garovi') || typesSupply(documentInfo?.supply_info)?.includes('transport vositasi garovi va kafillik')?
                           `garov shartnomasi asosida ${checkOwnerClient(documentInfo?.supply_info?.[0])}ga tegishli bo‘lgan transport vositasini garovga qo‘yishini ma'lum qilgan.`
                           : (
                              typesSupply(documentInfo?.supply_info)?.includes('tilla buyumlar garov') ?
                                 "garov shartnomasi asosida o‘ziga tegishli bo‘lgan tilla buyumlarni garovga qo‘yishini ma'lum qilgan."
                                 : (
                                    typesSupply(documentInfo?.supply_info)?.includes('3 shaxs kafilligi') ?
                                       `kafillik shartnomasi asosida ${documentInfo?.supply_info?.[0]}ning to‘liq kafilligini taqdim qiladi.`
                                       : (
                                          typesSupply(documentInfo?.supply_info)?.includes('sugurta') ?
                                             `${documentInfo?.supply_info?.[0]} sug‘urta kompaniyasining "Kredit qaytarilmasligini sug‘urtalash shartnomasi"ga ko‘ra xavfni sug‘urtalatishi va tegishli sug‘urta polisini taqdim etishini ma'lum qilgan.`
                                             : ""
                                       )
                                 )
                           )
                        }
                        `
                  }
               </p>
            }
            {console.log(collectGroupSupply(documentInfo?.group?.clients))}
            {(reneConfidence(documentInfo) || documentInfo?.supply_info?.[0]?.type === "without_supply") ?
               <p>
                  Buyurtmachi({documentInfo?.group?.name ? "lar" : ""}) ({documentInfo?.group?.name ? "o‘zlari" : "o‘zi"})ning kredit tarixi hamda qarz oluvchi sifatidagi obro‘sini inobatga olgan xolda, unga mikroqarzni ishonch asosida, hech qanday ta'minotsiz ajratishni so‘ragan.
               </p> : <></>
            }
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
                              documentInfo?.supply_info?.map((item, index) => {
                                 if (item?.type == 'auto') {
                                    autoSum += getSumma(item?.auto, 'sum')
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

            <p className='pdf_margin_top_15 distance'>
               {documentInfo?.group?.name ? 'Buyurtmachilar' : 'Buyurtmachi'}ning xarakteri, salohiyati, daromadi va daromad manbalari, kredit tarixi, to‘lovga qobiliyatliligi, buyurtmada ko‘rsatilgan ma'lumotlar, boshqa bank-moliya muassasalari oldidagi mavjud qarzdorligi, ta'minot, buyurtmada ko‘rsatilgan maqsad va kredit mahsulotining muvofiqligi kredit byurosidan va MMTning boshqa o‘z manbalaridan olingan axborotlar asosida kredit mutaxassislari tomonidan o‘rganilib, taxlil qilib buyurtma summasi {documentInfo?.branch?.name} Kredit Komissiyasi kreditlash limitidan yuqori bo‘lganligi uchun Kredit Qo‘mitasiga taqdim qilgan.
            </p>
            <p className='pdf_margin_top_20'>
               Yuqoridagilardan kelib chiqib va taqdim qilgan mavjud xujjatlarni ko‘rib chiqqan holda Kredit Qo‘mitasi qaror qiladi:
            </p>
            <>
               <div className='startRow pdf_margin_top_10'>
                  <p>1</p>
                  <div className='p1_left_space'>
                     {documentInfo?.branch?.name} Kredit Komissiyasi tomonidan ko‘rib chiqilgan va kredit berish to‘g‘risidagi bayonnomasi qarori ma'qullansin:
                  </div>
               </div>
               <div className='startRow pdf_margin_top_20'>
                  <p>2</p>
                  <div className='p1_left_space'>
                     Mikroqarz ajratishga doir barcha hujjatlarni qonuniy rasmiylashtirish, o‘z vaqtida qaytarilishi va doimiy monitoring qilinishi ustidan nazorat qilish {documentInfo?.branch?.name} Boshqaruvchisiga va Bosh ofis mikromoliyalash boshqarmasi zimmasiga yuklatilsin.
                  </div>
               </div>
            </>
            <div className='between align_center pdf_margin_top_30'>
               <p>Kredit Komissiyasi Raisi</p>
               <p>{fullName(documentInfo?.branch?.committee_chairman)}</p>
            </div>
            <div className='between align_center pdf_margin_top_10'>
               <p>Kredit Komissiyasi a'zorali</p>
               <p>{fullName(documentInfo?.branch?.committee_members[0])}</p>
            </div>
            <div className='between align_center pdf_margin_top_10'>
               <p></p>
               <p>{fullName(documentInfo?.branch?.committee_members[1])}</p>
            </div>
            <div className='between align_center pdf_margin_top_10'>
               <p>Kotib</p>
               <p>Abdullayev N.N</p>
            </div>
         </PdfWrapper>
      </>
   )
}

export default P2Form