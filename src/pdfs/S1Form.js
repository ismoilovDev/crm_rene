import { useLocation } from 'react-router-dom'
import Adding_VVB from './AddingVVB'
import AddingVVBbug from './AddingVVBbug'
import { CardInfo } from './Parts/personal';
import fullName from '../utils/functions/fullName';
import { PdfWrapper } from '../components/Pdf/Wrapper'
import useDataFetching from '../hooks/usePdfDataFetching'
import { checkOwner } from '../utils/functions/supplyTypes'
import { PdfControls } from '../components/Pdf/PdfControls'
import { collectGroupSupply, collectGroupSupplyFull } from '../utils/functions/totalSum'

function S1Form() {
   const location = useLocation()
   const orderId = location?.state?.id
   const { data: documentInfo } = useDataFetching(`/s1/${orderId}`)
   const { data: document } = useDataFetching(`/k1/${orderId}`)

   return (
      <>
         <PdfControls />
         <PdfWrapper indicator={documentInfo}>
            <p className='text_black_18 text_center title_contract'>Mikroqarz shartnomasi № {documentInfo?.contract_num}</p>
            <div className='between align_center pdf_margin_top_20'>
               <p className='black_text title_contract'>{documentInfo?.data?.branch?.city}</p>
               <p className='black_text title_contract'>{documentInfo?.contract_issue_date} yil</p>
            </div>
            <div className='margin_top_20'>
               {
                  documentInfo?.data?.group?.name ?
                     <p>{document?.branch?.name} {Adding_VVB(document?.branch?.id) ? 'v.v.b' : ''} nomidan {document?.branch?.contract} asosida ish yurituvchi {document?.branch?.short_name} Boshqaruvchisi {Adding_VVB(document?.branch?.id) ? 'v.v.b' : ''} {document?.branch?.head_of_branch},
                        bundan buyon «Qarz Beruvchi» deb ataladi, bir tomondan, va "{document?.group?.name}" Qarzdorlar guruhi a'zolari
                        {document?.group?.clients?.map(item => {
                           return (` ${item?.name}, `)
                        })} bundan buyon "Qarz oluvchilar" deb ataladilar, ikkinchi tomondan, ushbu shartnomani quyidagilar to'g'risida tuzdilar:
                     </p> :
                     <p>{documentInfo?.data?.branch?.name} nomidan {documentInfo?.data?.branch?.contract} asosida ish yurituvchi {documentInfo?.data?.branch?.short_name} Boshqaruvchisi {Adding_VVB(documentInfo?.data?.branch?.id) ? 'v.v.b' : ''} {documentInfo?.data?.branch?.head_of_branch},
                        bundan buyon «Qarz Beruvchi» deb ataladi, bir tomondan, va {documentInfo?.data?.client?.name}, bundan buyon "Qarz oluvchi" deb ataladi, ikkinchi tomondan, ushbu shartnomani quyidagilar to'g'risida tuzdilar:
                     </p>
               }
               <p className='black_text pdf_margin_top_30 title_contract'>1. Shartnoma mavzusi</p>
               <div className='sections_ul pdf_margin_top_5'>
                  <p>1.1</p>
                  <ul>
                     <li>{documentInfo?.data?.branch?.name} Kredit Komissiyasining {documentInfo?.data?.group?.name ? documentInfo?.data?.group?.clients?.[0]?.order?.protocol_result_date : documentInfo?.data?.order?.protocol_result_date} dagi № {documentInfo?.data?.group?.name ? documentInfo?.data?.group?.clients?.[0]?.order?.protocol_number : documentInfo?.data?.order?.protocol_number} sonli Majlis Bayoni bilan berilgan vakolatlar asosida, Qarz Beruvchi Qarz {documentInfo?.data?.group?.name ? 'oluvchilar' : 'oluvchi'}ga quyidagi tartibda  va miqdorda mikroqarz beradi:</li>
                     {
                        documentInfo?.data?.group?.name ?
                           documentInfo?.data?.group?.clients?.map(item => {
                              return (
                                 <li className='point_list pdf_margin_top_5'>
                                    {item?.name}ga {item?.order?.sum?.toLocaleString()} so'm miqdorida {item?.order?.time} oylik muddatga {item?.order?.aim} uchun. (Maqsadning xosraqami: {item?.order?.sector?.code})
                                 </li>
                              )
                           }) :
                           <li className='point_list pdf_margin_top_5'>
                              {documentInfo?.data?.client?.name}ga {documentInfo?.data?.order?.sum?.toLocaleString()} so'm miqdorida {documentInfo?.data?.order?.time} oylik muddatga {documentInfo?.data?.order?.aim} uchun. (Maqsadning xosraqami: {documentInfo?.data?.sector?.code})
                           </li>
                     }
                  </ul>
               </div>
               <p className='black_text pdf_margin_top_10 title_contract'>2. Qarz muddati va shartlari</p>
               <div className='sections_ul pdf_margin_top_5'>
                  <p>2.1</p>
                  <ul>
                     {
                        (collectGroupSupply(documentInfo?.data?.group?.clients)?.includes('auto') || documentInfo?.data?.supply_infos?.[0]?.type === 'auto') ?
                           <li>Mikroqarz, Qarz beruvchi va Qarz oluvchi{documentInfo?.data?.group?.name ? "lar" : ""} (garovga qo'yuvchi) o'rtasida Garov shartnomasi tuzilib, notarial tartibda tasdiqlangandan so'ng {documentInfo?.data?.group?.name ? documentInfo?.data?.group?.clients?.[0]?.order?.time : documentInfo?.data?.order?.time} oy muddatga beriladi.</li>
                           :
                           <li>Qarz {documentInfo?.data?.contract?.credit_issue_date} yildan {documentInfo?.data?.contract?.credit_end_date} yilgacha bo'lgan muddatga beriladi. </li>
                     }
                  </ul>
               </div>
               <div className='sections_ul pdf_margin_top_10'>
                  <p>2.2</p>
                  <ul>
                     {
                        documentInfo?.data?.group?.name ?
                           (collectGroupSupply(documentInfo?.data?.group?.clients)?.includes('auto') || collectGroupSupply(documentInfo?.data?.group?.clients)?.includes('gold') ?
                              <li>Qarz oluvchilar olingan qarzni qaytarilishini ta'minlash maqsadida o'zaro solidar javobgarlik to'g'risidagi {documentInfo?.data?.contract?.contract_issue_date} yildagi {documentInfo?.contract_num}-sonli Kafillik shartnomasini taqdim qiladilar va  garov shartnomasi asosida
                                 {
                                    documentInfo?.data?.group?.clients?.map(item => {
                                       if (item?.order?.supply_info?.[0]) {
                                          return (` ${item?.order?.supply_info?.[0]?.type == 'auto' ? `${item?.order?.supply_info?.[0]?.auto?.[0]?.registration_cert} - sonli Transport vositasini qayd etish guvohnomasiga ko'ra ${checkOwner(item?.order?.supply_info?.[0]) ? checkOwner(item?.order?.supply_info?.[0]) : item?.name}ga tegishli bo'lgan ${item?.order?.supply_info?.[0]?.auto?.[0]?.name} rusumli transport vositasini` : `${item?.order?.supply_info?.[0]?.type == 'gold' ? `${item?.name} tegishli bo'lgan tilla buyumlarni ` : ``}`}, `)
                                       }
                                    })
                                 }
                                 garovga qo'yadilar.
                              </li>
                              :
                              (
                                 collectGroupSupply(documentInfo?.data?.group?.clients)?.includes('insurance') ?
                                    <li>Qarz oluvchilar olingan qarzni qaytarilishini ta'minlash maqsadida Qarz beruvchi, Qarz oluvchi va {collectGroupSupplyFull(documentInfo?.data?.group?.clients)?.find(item => item?.type === 'insurance')?.name} o'rtasida tuzilgan {documentInfo?.contract_issue_date} yildagi {documentInfo?.contract_num}-sonli Kredit qaytarilmasligi xavfini sug'urtalash shartnomasiga ko'ra berilgan sugurta polisini taqdim qiladilar</li>
                                    :
                                    (collectGroupSupply(documentInfo?.data?.group?.clients)?.includes('guarrantor') ?
                                       <li>Qarz oluvchilar olingan qarzni qaytarilishini ta'minlash maqsadida Qarz beruvchi, Qarz oluvchilar va {collectGroupSupplyFull(documentInfo?.data?.group?.clients)?.find(item => item?.type === 'guarrantor')?.owner?.fio} o'rtasida tuzilgan {documentInfo?.contract_issue_date} yildagi {documentInfo?.contract_num}-sonli Kafillik shartnomasini taqdim qiladilar.</li>
                                       :
                                       <li>Qarz oluvchilar olingan qarzni qaytarilishini ta'minlash maqsadida o'zaro solidar javobgarlik tog'risidagi {documentInfo?.contract_issue_date} da imzolangan {documentInfo?.contract_num} - sonli Kafillik shartnomasini taqdim qiladilar.</li>
                                    )
                              )
                           ) :
                           (
                              documentInfo?.data?.supply_infos?.[0]?.type === 'auto' ?
                                 <li>Qarz oluvchi olingan qarzni qaytarilishini ta'minlash maqsadida garov shartnomasi asosida {documentInfo?.data?.supply_infos?.[0]?.auto?.[0]?.registration_cert} - sonli Transport vositasini qayd etish guvohnomasiga ko'ra {checkOwner(documentInfo?.data?.supply_infos?.[0]) ? checkOwner(documentInfo?.data?.supply_infos?.[0]) : 'ozi'}ga tegishli bo'lgan {documentInfo?.data?.supply_infos?.[0]?.auto?.[0]?.name} rusumli transport vositasini garovga qo'yadi.</li>
                                 :
                                 (
                                    documentInfo?.data?.supply_infos?.[0]?.type === 'gold' ?
                                       <li>Qarz oluvchi olingan qarzni qaytarilishini ta'minlash maqsadida tomonlar o'rtasida {documentInfo?.contract_issue_date} yilda tuzilgan {documentInfo?.contract_num}-sonli garov shartnomasi asosida o'ziga tegishli bo'lgan tilla buyumlarni garovga qo'yadi.</li>
                                       :
                                       (
                                          documentInfo?.data?.supply_infos?.[0]?.type === 'insurance' ?
                                             <li>Qarz oluvchi olingan qarzni qaytarilishini ta'minlash maqsadida Qarz beruvchi, Qarz oluvchi va {documentInfo?.data?.supply_infos?.[0]?.insurance?.company_name} o'rtasida tuzilgan {documentInfo?.contract_issue_date} yildagi {documentInfo?.contract_num}-sonli Kredit qaytarilmasligi xavfini sug'urtalash shartnomasiga ko'ra berilgan sugurta polisini taqdim qiladilar</li>
                                             :
                                             (
                                                documentInfo?.data?.supply_infos?.[0]?.type === 'guarrantor' ?
                                                   <li>Qarz oluvchi olingan qarzni qaytarilishini ta'minlash maqsadida Qarz beruvchi, Qarz oluvchi va {documentInfo?.data?.supply_infos?.[0]?.owner?.fio} o'rtasida tuzilgan {documentInfo?.contract_issue_date} yildagi {documentInfo?.contract_num}-sonli Kafillik shartnomasini taqdim qiladilar.</li>
                                                   :
                                                   <li>Qarz beruvchi Qarz oluvchiga mikroqarzni hech qanday ta'minotsiz, ya'ni ishonch asosida ajratadi.</li>
                                             )
                                       )
                                 )
                           )
                     }
                  </ul>
               </div>
               <div className='sections_ul pdf_margin_top_10'>
                  <p>2.3</p>
                  <ul>
                     <li>Foiz miqdori:</li>
                     <li className='point_list pdf_margin_top_5'>
                        Berilgan qarz qoldiq miqdori uchun Qarz oluvchilar yillik {documentInfo?.data?.group?.name ? documentInfo?.data?.group?.clients?.[0]?.order?.percent_year : documentInfo?.data?.order?.percent_year} foiz miqdoridan kelib chiqib ustama haq to'laydi.
                     </li>
                  </ul>
               </div>
               <div className='sections_ul pdf_margin_top_10'>
                  <p>2.4</p>
                  <ul>
                     <li>Qarz oluvchilar, olgan qarz miqdorini shartnomaning ajralmas qismi hisoblangan 1- ilovadagi to'lov jadvali asosida {(documentInfo?.data?.group?.name ? documentInfo?.data?.group?.clients?.[0]?.order?.type_repayment : documentInfo?.data?.order?.type_repayment) == 1 ? 'annuitet' : 'differential'} usulida to'laydi.</li>
                     <li className='point_list pdf_margin_top_5'>
                        Kreditning to'liq qiymati shartnoma tuzish paytidagi uning mutlaq qiymatini, ya'ni kredit yoki qarzning asosiy qarzi, unga hisoblanadigan foizlari, komission va boshqa to'lovlarni, shu jumladan amaldagi tariflar bo'yicha kredit rasmiylashtirish bilan bog'liq uchinchi shaxslar foydasiga to'lanadigan to'lovlarni o'z ichiga oladi.
                     </li>
                  </ul>
               </div>
               <p className='black_text pdf_margin_top_10 title_contract'>3. Shartnomaning muddati</p>
               <div className='sections_ul pdf_margin_top_5'>
                  <p>3.1</p>
                  <ul>
                     <li>Ushbu shartnoma ikki tomonlama imzolangandan so'ng yuridik kuchga kiradi va shartnoma bo'yicha tomonlarning majburiyatlar to'liq bajarilgungacha o'z kuchini saqlaydi.</li>
                  </ul>
               </div>
               <div className='sections_ul pdf_margin_top_10'>
                  <p>3.2</p>
                  <ul>
                     <li>Ushbu shartnomaning bekor qilinishi:</li>
                     <li className='point_list pdf_margin_top_5'>
                        Shartnoma majburiyatlari to'liq bajarilganida;
                     </li>
                     <li className='point_list pdf_margin_top_5'>
                        Ikki tomonlama kelishuv asosida;
                     </li>
                     <li className='point_list pdf_margin_top_5'>
                        Qarz {documentInfo?.data?.group?.name ? 'oluvchilar' : 'oluvchi'} mikromoliyaviy xizmatdan shartnoma tuzilgan kundan e’tiboran bir oy ichida foydalanmagan taqdirda, mikromoliyaviy xizmatlar ko'rsatuvchi tashkilot shartnomani bekor qilish haqida qarz {documentInfo?.data?.group?.name ? 'oluvchilar' : 'oluvchi'}ni yozma ravishda xabardor etish orqali shartnomani bir tomonlama tartibda bekor qilinadi.
                     </li>
                     <li className='point_list pdf_margin_top_5'>
                        Qonunda nazarda tutilgan boshqa holatlarda bekor qilinadi.
                     </li>
                  </ul>
               </div>
               <p className='black_text pdf_margin_top_10 title_contract'>4. Tomonlarning huquq va majburiyatlari</p>
               <div className='sections_ul pdf_margin_top_5'>
                  <p>4.1</p>
                  <ul>
                     <li>Qarz beruvchining huquqlari:</li>
                     <li className='point_list pdf_margin_top_5'>
                        Mikromoliyaviy xizmat ko'rsatish va shartnoma bo'yicha majburiyatlarni bajarish uchun zarur bo'lgan hujjatlarni buyurtma beruvchidan so'rab olish;
                     </li>
                     <li className='point_list pdf_margin_top_5'>
                        To'lov o'z vaqtida amalga oshirilmaganda, qarz to'lash tartibiga rioya qilmaslik xolati kelib chiqsa, so'ralgan ma'lumotlar o'z vaqtida taqdim qilinmasa, shuningdek noto'g'ri ma'umotlar taqdim qilinganligi yoki ularni qalbakilashtirilishi holatlari aniqlansa majburiyatlarning qarz oluvchi tomonidan muddatidan ilgari bajarilishini talab qilish;
                     </li>
                     <li className='point_list pdf_margin_top_5'>
                        Qarz {documentInfo?.data?.group?.name ? 'oluvchilar' : 'oluvchi'}ga hisob va moliyaviy hujjatlarini yuritish buyicha konsultativ yordam ko'rsatish;
                     </li>
                     <li className='point_list pdf_margin_top_5'>
                        Qarz {documentInfo?.data?.group?.name ? 'oluvchilar' : 'oluvchi'} ko'rsatilgan mikromoliyaviy xizmatdan shartnoma tuzilgan kundan e'tiboran bir oy ichida foydalanmagan taqdirda, shartnomani bekor qilish haqida qarz {documentInfo?.data?.group?.name ? 'oluvchilar' : 'oluvchi'}ni yozma ravishda xabardor etish  orqali shartnomani bir tomonlama tartibda bekor qilish;
                     </li>
                     <li className='point_list pdf_margin_top_5'>
                        Qarz {documentInfo?.data?.group?.name ? 'oluvchilar' : 'oluvchi'}ni lozim darajada tekshirish va lozim darajada tekshirish zaruriyati yuzaga kelganda qo'shimcha ma'lumotlar yoki hujjatlar talab qilish, ulardan nusxa olish va (yoki) ma'lumotlarni boshqa usullarda qayta ishlash, saqlash.
                     </li>
                  </ul>
               </div>
               <div className='sections_ul pdf_margin_top_10'>
                  <p>4.2</p>
                  <ul>
                     <li>Qarz beruvchining  majburiyatlari:</li>
                     <li className='point_list pdf_margin_top_5'>
                        Buyurtma beruvchining huquq va majburiyatlari to'g'risida, shu jumladan, mikromoliyaviya xizmat  ko'rsatish  bilan bog'liq barcha xarajatlar haqida buyurtma beruvchiga ishonchli hamda to'liq  axborotni ma'lum qilish;
                     </li>
                     <li className='point_list pdf_margin_top_5'>
                        Qarz {documentInfo?.data?.group?.name ? 'oluvchilar' : 'oluvchi'}ning belgilangan qarz miqdorini berish;
                     </li>
                     <li className='point_list pdf_margin_top_5'>
                        Shartnoma bo'yicha majburiyatlar bajarilmaganligi yoki lozim darajada bajarilmaganligi natijasida yetkazilgan zararlarning o'rnini qarz {documentInfo?.data?.group?.name ? 'oluvchilar' : 'oluvchi'}ga qoplash;
                     </li>
                     <li className='point_list pdf_margin_top_5'>
                        Qarz berish shartlariga har qanday mumkin bo'lgan o'zgarishlar kiritiladigan bo'lsa, Qarz {documentInfo?.data?.group?.name ? 'oluvchilar' : 'oluvchi'}ga 2  hafta  oldin xabar qilish;
                     </li>
                     <li className='point_list pdf_margin_top_5'>
                        Qarz {documentInfo?.data?.group?.name ? 'oluvchilar' : 'oluvchi'}ning belgilangan qarz miqdorini shartnoma imzolangach, 30 kun ichida berish;
                     </li>
                  </ul>
               </div>
               <div className='sections_ul pdf_margin_top_10'>
                  <p>4.3</p>
                  <ul>
                     <li>Qarz {documentInfo?.data?.group?.name ? 'oluvchilar' : 'oluvchi'}ning huquqlari:</li>
                     <li className='point_list pdf_margin_top_5'>
                        Olingan qarzni shartnomada belgilangan muddatdan oldin to'lash;
                     </li>
                     <li className='point_list pdf_margin_top_5'>
                        Mikromoliyaviy xizmatlar ko'rsatish qoidalari bilan tanishib chiqish;
                     </li>
                     <li className='point_list pdf_margin_top_5'>
                        O'z huquq va majburiyatlari to'g'risida, shu jumladan mikromoliyaviy xizmat ko'rsatish bilan bog'liq barcha xarajatlar haqida ishonchli hamda to'liq axborot olish;
                     </li>
                     <li className='point_list pdf_margin_top_5'>
                        Shartnoma shartlarini belgilangan tartibda va muddatlarda bajarilishini talab qilish;
                     </li>
                     <li className='point_list pdf_margin_top_5'>
                        Shartnoma bo'yicha majburiyatlar bajarilmaganligi yoki lozim darajada bajarilmaganligi natijasida yetkazilgan zararlarning o'rnini qoplashni talab qilish;
                     </li>
                     <li className='point_list pdf_margin_top_5'>
                        Shartnoma tuzilgandan keyin mijoz tomonidan pul mablag'lari olingunga qadar bo'lgan davrda kredit olishdan bepul asosda voz kechish;
                     </li>
                     {
                        collectGroupSupply(documentInfo?.data?.group?.clients)?.includes('auto') || collectGroupSupply(documentInfo?.data?.group?.clients)?.includes('gold') || documentInfo?.data?.supply_infos?.[0]?.type === 'auto' || documentInfo?.data?.supply_infos?.[0]?.type === 'gold' ?
                           <li className='point_list pdf_margin_top_5'> Garov ta'minoti qarz beruvchi tomonidan sugurta qilinmaydi, qarz oluvchining xoxishiga ko'ra, uning o'z hisobidan sug'urta qilinishi mumkin.</li>
                           : <></>
                     }
                  </ul>
               </div>
               <div className='sections_ul pdf_margin_top_10'>
                  <p>4.4</p>
                  <ul>
                     <li>Qarz {documentInfo?.data?.group?.name ? 'oluvchilar' : 'oluvchi'}ning majburiyatlari:</li>
                     <li className='point_list pdf_margin_top_5'>
                        Mikromoliyaviy xizmatdan foydalanish va shartnoma bo'yicha majburiyatlarni bajarish uchun zarur bo'lgan hujjatlarni taqdim etishi;
                     </li>
                     <li className='point_list pdf_margin_top_5'>
                        Qarz {documentInfo?.data?.group?.name ? 'oluvchilar' : 'oluvchi'} olingan mikroqarzni belgilangan muddatda so'ndirish;
                     </li>
                     <li className='point_list pdf_margin_top_5'>
                        Majburiyatlarni shartnomada belgilangan tartibda va muddatlarda bajarishi shart;
                     </li>
                     <li className='point_list pdf_margin_top_5'>
                        Mikroqarz shartnomasiga asosan asosiy qismi yoki unga hisoblangan foizlar, penya va jarimalarni muddatida to'lanmagan taqdirda qarzdorlik bank plastik kartalari, omonat va boshqa hisobvaraqlaridan so'zsiz (aktseptsiz) tartibda to'liq undirib olinishiga rozilik berish;
                     </li>
                     <li className='point_list pdf_margin_top_5'>
                        Shartnoma shartlari bajarilmaganda "qarz beruvchi"ning talabiga asosan, mikroqarzning asosiy qarz qoldiq summasini, hisoblangan foizlari bilan birga muddatidan oldin qaytarish;
                     </li>
                     <li className='point_list pdf_margin_top_5'>
                        Istiqomat qiladigan joyi, familiyasi yoki ismi, faoliyat turi, faoliyat joyi, shaxsini tasdiqlovchi hujjat yoki ushbu shartnomani tuzish uchun asos bo'lgan boshqa har qanday ma'lumotlar o'zgargan holatda 5 kun ichida Qarz beruvchiga xabar qilish.
                     </li>
                  </ul>
               </div>
               <p className='black_text pdf_margin_top_10 title_contract'>5. Tomonlarning mas'uliyatlari</p>
               <div className='sections_ul pdf_margin_top_5'>
                  <p>5.1</p>
                  <ul>
                     <li>Qarz {documentInfo?.data?.group?.name ? 'oluvchilar' : 'oluvchi'} to'lov jadvaliga asosan belgilangan qarz to'lovini to'lov kuni soat 16-00gacha to'lashi shart. Agar, qarz to'lovi yoki uning bir qismini to'lash kechiksa, muddati o'tkazib yuborilgan qarzdorlik yuzaga kelgan kundan boshlab qarz {documentInfo?.data?.group?.name ? 'oluvchilar' : 'oluvchi'} qarz beruvchiga o'tkazib yuborilgan muddatning har bir kuni uchun majburiyatning bajarilmagan qismidan {documentInfo?.data?.group?.name ? documentInfo?.data?.group?.clients?.[0]?.order?.daily_fine : documentInfo?.data?.order?.daily_fine}%, ammo kechiktirilgan umumiy qarz miqdorining 50%idan oshmagan mikdorda penya to'laydi. Bunda, qarz {documentInfo?.data?.group?.name ? 'oluvchilar' : 'oluvchi'} tomonidan to'langan barcha foizlar, penya va boshqa turdagi asosiy qarzni qaytarish bilan bog'liq bo'lmagan to'lovlarning jami summasi shartnoma tuzilgan sanadan boshlab hisoblanadigan alohida olingan har bir kalendar yili uchun shartnoma bo'yicha qarz miqdorining 50%idan oshmasligi lozim.</li>
                  </ul>
               </div>
               <div className='sections_ul pdf_margin_top_10'>
                  <p>5.2</p>
                  <ul>
                     <li>Qarz beruvchi o'z majburiyatlarini shartnomada ko'rsatilgan muddat ichida bajarmagan taqdirda qarz {documentInfo?.data?.group?.name ? 'oluvchilar' : 'oluvchi'}ga kechiktirilan har bir kuni uchun belgilangan qarz miqdorining  {documentInfo?.data?.group?.name ? documentInfo?.data?.group?.clients?.[0]?.order?.daily_fine : documentInfo?.data?.order?.daily_fine}%, ammo umumiy qarz miqdorining 50%dan oshmagan miqdorida jarima to'laydi.</li>
                  </ul>
               </div>
               {
                  documentInfo?.data?.group?.name ?
                     (
                        collectGroupSupplyFull(documentInfo?.data?.group?.clients)?.length !== 0 ?
                           <div className='sections_ul pdf_margin_top_10'>
                              <p>5.3</p>
                              <ul>
                                 <li>Garov shartnomasi va Kafillik shartnomasiga asoslanib, Qarz beruvchi Qarz {documentInfo?.data?.group?.name ? 'oluvchilar' : 'oluvchi'}ning to'lov kechiktirilgan asosiy qarz, uning foiz to'lovlari va hisoblangan penya bo'yicha majburiyatlarini hech qanday tortishuvlarsiz garov mulkidan  va/yoki kafillik beruvchidan undirishga haqlidir.</li>
                              </ul>
                           </div> : <></>
                     ) :
                     <div className='sections_ul pdf_margin_top_10'>
                        <p>5.3</p>
                        <ul>
                           <li>Garov shartnomasi va Kafillik shartnomasiga asoslanib, Qarz beruvchi Qarz {documentInfo?.data?.group?.name ? 'oluvchilar' : 'oluvchi'}ning to'lov kechiktirilgan asosiy qarz, uning foiz to'lovlari va hisoblangan penya bo'yicha majburiyatlarini hech qanday tortishuvlarsiz garov mulkidan  va/yoki kafillik beruvchidan undirishga haqlidir.</li>
                        </ul>
                     </div>
               }
               <p className='black_text pdf_margin_top_10 title_contract'>6. Fors-major xolatlari</p>
               <div className='sections_ul pdf_margin_top_5'>
                  <p>6.1</p>
                  <ul>
                     <li>Fors-major holatlari taraflardan biri boshqa tarafning oldida ushbu shartnoma bo'yicha olgan majburiyatlarini taraflarning erki va istagidan tashqari paydo bo'lgan va ularni oldindan ko'ra bilishi yoki bartaraf etishi mumkin bo'lmagan holatlar, ya'ni yer qimirlashi, suv toshqini, yong'in va boshqa tabiiy ofatlar bilan bog'liq holda bajarmaganlari uchun javobgar bo'lmaydi.</li>
                  </ul>
               </div>
               <div className='sections_ul pdf_margin_top_10'>
                  <p>6.2</p>
                  <ul>
                     <li>O'z majburiyatini bajarmagan taraf shartnoma bo'yicha majburiyatni bajarishga ushbu holatlarning ta'sir ko'rsatishi yoki mone'lik qilishi to'g'risida boshqa tarafga imkon qadar tezda xabar berishi lozim.</li>
                  </ul>
               </div>
               <p className='black_text pdf_margin_top_10 title_contract'>7. Nizolarni xal qilish</p>
               <div className='sections_ul pdf_margin_top_5'>
                  <p>7.1</p>
                  <ul>
                     <li>Agar, Ushbu shartnomada  tomonlar o'rtasida kelib chiqqan nizo va ixtiloflar hal bo'lmasa, bu nizo va ixtiloflar muzokaralar orqali hal qilinadi.</li>
                  </ul>
               </div>
               <div className='sections_ul pdf_margin_top_10'>
                  <p>7.2</p>
                  <ul>
                     <li>Agar, nizolarni muzokaralar orqali hal qilib bo'lmasa, hal qilinmagan nizolarni tomonlar O'zbekiston Respublikasining  qonunchiligiga asosan belgilangan tartibda {documentInfo?.data?.branch?.judge} xal qiladi.</li>
                  </ul>
               </div>
               <p className='black_text pdf_margin_top_10 title_contract'>8. Boshka shartlar</p>
               <div className='sections_ul pdf_margin_top_5'>
                  <p>8.1</p>
                  <ul>
                     <li>Ushbu shartnomaga kiritiladigan har qanday o'zgartirish va qo'shimchalar yozma ravishda tomonlar o'rtasida qo'shimcha bitim tuzish orqali amalga oshiriladi va tuzilgan qo'shimcha bitimlar Ushbu shartnomaning ajralmas qismi hisoblanadi.</li>
                  </ul>
               </div>
               <div className='sections_ul pdf_margin_top_10'>
                  <p>8.2</p>
                  <ul>
                     <li>Tomonlar o'zlarining bir - birlari oldidagi majburiyatlarini bajargan holdagina, ushbu shartnoma to'liq bajarilgan deb hisoblanadi.</li>
                  </ul>
               </div>
               <div className='sections_ul pdf_margin_top_10'>
                  <p>8.3</p>
                  <ul>
                     <li>Ushbu shartnoma {documentInfo?.data?.group?.name ? documentInfo?.data?.group?.clients?.length + 1 : 2} nusxada, har bir tomon uchun bir nusxadan tuzilgan bo'lib, bir xil yuridik kuchga ega va tomonlarda bittadan saqlanadi.</li>
                  </ul>
               </div>
               <p className='black_text pdf_margin_top_10 title_contract'>9. Tomonlarning bank rekvizitlari  va yuridik manzillari</p>
               <div className='sections_ul pdf_margin_top_5'>
                  <div className='pdf_end_2sections'>
                     <div className='pdf_end_2sections_section'>
                        <p className='title_contract'>9.1. Qarz beruvchi:</p>
                        <div className='pdf_margin_top_20 section_space_pdf'>
                           <p className='black_text text_center title_contract'>{documentInfo?.data?.branch?.name}</p>
                           <p className='pdf_margin_top_20'>{documentInfo?.data?.branch?.address}</p>
                           <p>{documentInfo?.data?.branch?.requisite}</p>
                           <p>{documentInfo?.data?.branch?.itn}</p>
                           <p>Tel.: {documentInfo?.data?.branch?.phone}</p>
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
                        <p className='title_contract'>9.2. Qarz oluvchilar:</p>
                        {
                           documentInfo?.data?.group?.name ?
                              documentInfo?.data?.group?.clients?.map(item => {
                                 return (
                                    <>
                                       <div className='pdf_margin_top_20 section_space_pdf'>
                                          <p className='black_text text_center title_contract'>{item?.name}</p>
                                          <p className='pdf_margin_top_20'>{item?.serial_num} raqamli {item?.doc_type}  {item?.issued_date} y. da {item?.issued_by} tomonidan berilgan.</p>
                                          <p>Yashash manzili: {item?.city}, {item?.district}, {item?.address}</p>
                                          <p>JSh ShIR: {item?.pinfl}</p>
                                          <p>Telefon: {item?.phone?.join(', ')}</p>
                                          {
                                             item?.order?.type_credit === "card" ? 
                                             <CardInfo info={item?.order}/> : <></>
                                          }
                                       </div>
                                       <div className='between pdf_margin_top_30'>
                                          <p>_______________</p>
                                       </div>
                                    </>
                                 )
                              }) :
                              <>
                                 <div className='pdf_margin_top_20 section_space_pdf'>
                                    <p className='black_text text_center'>{documentInfo?.data?.client?.name}</p>
                                    <p className='pdf_margin_top_20'>{documentInfo?.data?.client?.serial_num} raqamli {documentInfo?.data?.client?.doc_type}   {documentInfo?.data?.client?.issued_date} y da {documentInfo?.data?.client?.issued_by} tomonidan berilgan.</p>
                                    <p>Yashash manzili: {documentInfo?.data?.client?.city}, {documentInfo?.data?.client?.district}, {documentInfo?.data?.client?.address}</p>
                                    <p>JSh ShIR: {documentInfo?.data?.client?.pinfl}</p>
                                    <p>Telefon: {documentInfo?.data?.client?.phone?.join(', ')}</p>
                                    {
                                       documentInfo?.data?.order?.type_credit === "card" ? 
                                       <CardInfo info={documentInfo?.data?.order}/> : <></>
                                    }
                                 </div>
                                 <div className='endRow pdf_margin_top_30'>
                                    <p>________________</p>
                                 </div>
                              </>
                        }

                     </div>
                  </div>
               </div>
            </div>
         </PdfWrapper>
      </>
   )
}

export default S1Form