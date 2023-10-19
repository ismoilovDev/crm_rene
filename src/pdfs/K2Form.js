import { useLocation } from 'react-router-dom'
import { PdfControls } from '../components/Pdf/PdfControls'
import { PdfWrapper } from '../components/Pdf/Wrapper';
import useDataFetching from '../hooks/usePdfDataFetching'
import fullName from '../utils/functions/fullName'
import AddingVVBbug from './AddingVVBbug'
import Adding_VVB from './AddingVVB'

function K2Form() {
   const location = useLocation()
   const orderId = location?.state?.id
   const { data: documentInfo } = useDataFetching(`/kd/${orderId}`)

   return (
      <>
         <PdfControls />
         <PdfWrapper indicator={documentInfo}>
            <div>
               <p className='text_black_18 text_center'>Kafillik  shartnomasi</p>
               {/* <p className='text_center'>(Qarzdorlar guruhi uchun)</p> */}
            </div>
            <div className='between align_center pdf_margin_top_20'>
               <p className='black_text pdf_margin_top_5'>{documentInfo?.data?.branch?.city}</p>
               <p className='black_text pdf_margin_top_5'>{documentInfo?.data?.contract?.contract_issue_date}</p>
            </div>
            <div className='margin_top_20'>
               <p>{documentInfo?.data?.branch?.name} nomidan {documentInfo?.data?.branch?.contract} asosida ish yurituvchi {documentInfo?.data?.branch?.short_name} boshqaruvchisi {Adding_VVB(documentInfo?.data?.branch?.id) ? 'v.v.b' : ''} {documentInfo?.data?.branch?.head_of_branch},
                  bundan buyon «Qarz Beruvchi» deb ataladi , bir tomondan, va {documentInfo?.data?.client?.name}, bundan buyon  «Qarzdor» deb ataladi, ikkinchi tomondan, va {documentInfo?.data?.supply_infos?.[0]?.owner?.fio}, bundan buyon «Kafillik beruvchi» deb ataladi, uchinchi tomondan, ushbu shartnomani quyidagilar to‘g‘risida tuzdilar:
               </p>

               <p className='black_text pdf_margin_top_30'>1. Shartnoma mavzusi</p>
               <div className='sections_ul pdf_margin_top_5'>
                  <p>1.1</p>
                  <ul>
                     <li>{documentInfo?.data?.branch?.name} va {documentInfo?.data?.client?.name} o'rtasida {documentInfo?.data?.contract?.contract_issue_date} yilda tuzilgan Milkomoliyalash to'g'risidagi {documentInfo?.data?.contract?.contract_num}-sonli mikroqarz shartnomasi bo‘yicha
                        Qarz oluvchining majburiyatlarini to'liq bajarilishi uchun «Kafillik Beruvchi» «Qarz beruvchi» oldida kafillik beradi va Qarz oluvchi tomonidan o'z vaqtida to'lanmagan asosiy garz, unga hisoblangan foizlarni hamda kechiktirilganlik uchun penya va jarimalarni to lab beradi.
                     </li>

                  </ul>
               </div>
               <div className='sections_ul pdf_margin_top_5'>
                  <p>1.2</p>
                  <ul>
                     <li>
                        «Qarz beruvchi»  Qarz oluvchi tomonidan o‘z vaqtida to‘lanmagan asosiy qarz, unga hisoblangan foizlarni hamda kechiktirilganlik uchun penya va jarimalarni «Kafillik Beruvchi» dan talab qiladi.
                     </li>
                  </ul>
               </div>

               <p className='black_text pdf_margin_top_15'>2. Qarz beruvchining Huquq va Majburiyatlari:</p>
               <div className='sections_ul pdf_margin_top_5'>
                  <p>2.1</p>
                  <ul>
                     <li>
                        Qarz beruvchi  Qarzdor mikroqarz shartnomasiga asosan o‘z majburiyatlarini shartnomada belgilangan muddatda bajarmaganida, ushbu bajarilmagan majburiyatni Kafillik beruvchidan talab qilish huquqiga ega.
                     </li>
                  </ul>
               </div>
               <div className='sections_ul pdf_margin_top_5'>
                  <p>2.2</p>
                  <ul>
                     <li>
                        Kafillik beruvchi majburiyatni bajarganidan keyin Qarz beruvchi qarzdorga bo‘lgan talabni tasdiqlovchi hujjatlarni kafilga topshiradi va bu talabni ta'minlaydigan huquqlarni beradi.
                     </li>
                  </ul>
               </div>
               <div className='sections_ul pdf_margin_top_5'>
                  <p>2.3</p>
                  <ul>
                     <li>
                        Kafillik shartnomasiga asosan mikroqarzning asosiy qismi yoki unga hisoblangan foizlar, penya va jarimalarni muddatida to'lanmagan taqdirda qarzdorlikni ''Kafillik beruvchilar"ning plastik karta, omonat va boshqa hisobvaraqlaridan so'zsiz (akseptsiz) tartibda undirib olishga haqli.
                     </li>
                  </ul>
               </div>
               <div className='sections_ul pdf_margin_top_5'>
                  <p>2.4</p>
                  <ul>
                     <li>
                        Qarz beruvchi Kafillik beruvchini xabardor qilmasdan ushbu kafillik bilan ta'minlangan mikroqarz shartnomasining shartlarini va muddatini o‘zgartirishi mumkin emas, aks holda, Kafillik shartnomasi bekor qilingan deb hisoblanadi.
                     </li>
                  </ul>
               </div>

               <p className='black_text pdf_margin_top_15'>3. Kafillik beruvchining Huquq va Majburiyatlari:</p>
               <div className='sections_ul pdf_margin_top_5'>
                  <p>3.1</p>
                  <ul>
                     <li>
                        Qarzdor kafillik bilan ta'minlangan majburiyatni bajarmagan yoki lozim darajada bajarmagan taqdirda kafillik beruvchi qarz beruvchi oldida solidar tartibda javobgar hisoblanadi.
                     </li>
                  </ul>
               </div>
               <div className='sections_ul pdf_margin_top_5'>
                  <p>3.2</p>
                  <ul>
                     <li>
                        Kafillik beruvchi qarz beruvchi oldida qarzdor tomonidan bajarilmagan majburiyat uchun javob beradi, shu jumladan, foizlar to‘laydi, qarzni undirib olish bo‘yicha sud chiqimlarini va qarzdor majburiyatni bajarmaganligi yoki lozim darajada bajarmaganligi tufayli qarz beruvchi ko‘rgan boshqa zararlarni qoplaydi.
                     </li>
                  </ul>
               </div>
               <div className='sections_ul pdf_margin_top_5'>
                  <p>3.3</p>
                  <ul>
                     <li>
                        Majburiyatni bajargan kafilga qarz beruvchining ushbu majburiyat bo‘yicha huquqlari kafil qarz beruvchining talabini qancha hajmda qanoatlantirgan bo‘lsa, shuncha hajmda o‘tadi. Kafil qarz beruvchiga to‘langan summaga foizlar to‘lashni va qarzdor uchun javobgarlik munosabati bilan ko‘rgan boshqa zararini to‘lashni qarzdordan talab qilishga haqli.
                     </li>
                  </ul>
               </div>

               <p className='black_text pdf_margin_top_15'>4. Fors-major xolatlari.</p>
               <div className='sections_ul pdf_margin_top_5'>
                  <p>4.1</p>
                  <ul>
                     <li>
                        Fors-major holatlari - taraflarning biri boshqa tarafning oldida ushbu shartnoma bo‘yicha olgan majburiyatlarini taraflarning erki va istagidan tashqari paydo bo‘lgan va ularni oldindan ko‘ra bilishi yoki bartaraf etishi mumkin bo‘lmagan holatlar, ya'ni yer qimirlash, suv toshqini, yong‘in va boshqa tabiiy ofatlar bilan bog‘liq holda bajarmaganlari uchun javobgar bo‘lmaydi.
                     </li>
                  </ul>
               </div>
               <div className='sections_ul pdf_margin_top_5'>
                  <p>4.2</p>
                  <ul>
                     <li>
                        O‘z majburiyatini bajarmagan taraf shartnoma bo‘yicha majburiyatni bajarishga ushbu holatlarning ta'sir ko‘rsatishi yoki mone'lik qilishi to‘g‘risida boshqa tarafga imkon qadar tezda xabar berishi lozim.
                     </li>
                  </ul>
               </div>

               <p className='black_text pdf_margin_top_15'>5. Boshqa shartlar:</p>
               <div className='sections_ul pdf_margin_top_5'>
                  <p>5.1</p>
                  <ul>
                     <li>
                        Ushbu shartnomaga kiritiladigan har qanday o‘zgartirish va qo‘shimchalar yozma ravishda tomonlar o‘rtasida qo‘shimcha bitim tuzish orqali amalga oshiriladi va tuzilgan qo‘shimcha bitimlar ushbu shartnomaning ajralmas qismi hisoblanadi.
                     </li>
                  </ul>
               </div>
               <div className='sections_ul pdf_margin_top_5'>
                  <p>5.2</p>
                  <ul>
                     <li>
                        Ushbu kafillik shartnomasi tomonlar o‘rtasida imzolangan kundan yuridik kuchga kiradi va  kafillik bilan ta'minlangan  qarz majburiyati to‘liq bajarilguncha yuridik kuchga ega bo‘ladi.
                     </li>
                  </ul>
               </div>
               <div className='sections_ul pdf_margin_top_5'>
                  <p>5.3</p>
                  <ul>
                     <li>
                        Kafillik shartnomasi uch nusxada tuzilgan bo‘lib, tomonlarda bittadan saqlanadi va barcha nusxasi bir xil yuridik kuchga ega hisoblanadi.
                     </li>
                  </ul>
               </div>

               <p className='black_text pdf_margin_top_15'>6.  Kafillikning bekor bo‘lishi</p>
               <div className='sections_ul pdf_margin_top_5'>
                  <p>6.1</p>
                  <ul>
                     <li>
                        Kafillik bilan ta'minlangan majburiyat bekor bo‘lgach, shuningdek ushbu majburiyat kafilning roziligisiz javobgarlikning oshishiga yoki uning uchun boshqa noqulay oqibatlarga olib keladigan tarzda o‘zgartirilgan taqdirda kafillik bekor bo‘ladi;
                     </li>
                  </ul>
               </div>
               <div className='sections_ul pdf_margin_top_5'>
                  <p>6.2</p>
                  <ul>
                     <li>
                        Kafillik bilan ta'minlangan majburiyat bo‘yicha qarz boshqa shaxsga o‘tkazilganida, agar kafil yangi qarzdor uchun javobgar bo‘lish haqida Qarz beruvchiga rozilik bergan bo‘lmasa, kafillik bekor bo‘ladi;
                     </li>
                  </ul>
               </div>
               <div className='sections_ul pdf_margin_top_5'>
                  <p>6.3</p>
                  <ul>
                     <li>
                        Shartnomada ko‘rsatilgan kafillik muddati o‘tganidan keyin kafillik bekor bo‘ladi;
                     </li>
                  </ul>
               </div>
               <div className='sections_ul pdf_margin_top_5'>
                  <p>6.4</p>
                  <ul>
                     <li>
                        Qarz beruvchi kafillik bilan ta'minlangan majburiyatni bajarish muddati kelgan kundan boshlab bir yil davomida kafilga da'vo qo‘zg‘atmagan taqdirda kafillik bekor bo‘ladi.
                     </li>
                  </ul>
               </div>
               <p className='black_text pdf_margin_top_15'>7. Tomonlarning yuridik manzillari va rekvizitlari:</p>
               <p className='black_text pdf_margin_top_20 distance'>7.1. Qarzdor:</p>
               <div className='margin_site_20'>
                  <div className='margin_site_20 margin_top_20'>
                     <p className='black_text'>{documentInfo?.data?.client?.name}</p>
                     <div className='between align_center margin_top_10'>
                        <div>
                           <p>{documentInfo?.data?.client?.serial_num} raqamli {documentInfo?.data?.client?.doc_type}  {documentInfo?.data?.client?.issued_date} y. da {documentInfo?.data?.client?.issued_by} tomonidan berilgan.</p>
                           <p>Yashash manzilim:{documentInfo?.data?.client?.city} {documentInfo?.data?.client?.district} {documentInfo?.data?.client?.address}</p>
                           <p>Shaxsiy identifikatsiya raqamim (JShShIR): {documentInfo?.data?.client?.pinfl}.</p>
                        </div>
                        <p className='marginRight'>________________</p>
                     </div>

                  </div>
               </div>
               <p className='black_text pdf_margin_top_20 distance'>7.2. Kafillik beruvchi:</p>
               <div className='margin_site_20'>
                  <div className='margin_site_20 margin_top_20'>
                     <p className='black_text'>{documentInfo?.data?.supply_infos?.[0]?.owner?.fio}</p>
                     <div className='between align_center margin_top_10'>
                        <div>
                           <p>{documentInfo?.data?.supply_infos?.[0]?.owner?.serial_num} raqamli {documentInfo?.data?.supply_infos?.[0]?.owner?.doc_type}  {documentInfo?.data?.supply_infos?.[0]?.owner?.issued_date} y. da {documentInfo?.data?.supply_infos?.[0]?.owner?.issued_by} tomonidan berilgan.</p>
                           <p>Yashash manzilim:{documentInfo?.data?.supply_infos?.[0]?.owner?.city} {documentInfo?.data?.supply_infos?.[0]?.owner?.district} {documentInfo?.data?.supply_infos?.[0]?.owner?.address}</p>
                           <p>Shaxsiy identifikatsiya raqamim (JShShIR): {documentInfo?.data?.supply_infos?.[0]?.owner?.pinfl}.</p>
                        </div>
                        <p className='marginRight'>________________</p>
                     </div>

                  </div>
               </div>
               <p className='black_text pdf_margin_top_10 distance'>7.3. Qarz beruvchi:</p>
               <p className='distance black_text pdf_margin_top_10'>{documentInfo?.data?.branch?.name}</p>
               <p className='distance pdf_margin_top_5'>{documentInfo?.data?.branch?.address}</p>
               <p className='distance pdf_margin_top_5'>{documentInfo?.data?.branch?.requisite}</p>
               <p className='distance pdf_margin_top_5'>{documentInfo?.data?.branch?.itn}</p>
               <p className='distance pdf_margin_top_5'>Telefon: {documentInfo?.data?.branch?.phone}</p>
               <div className='between margin_top_15 margin_site_20'>
                  <p>Boshqaruvchi</p>
                  <p>{Adding_VVB(documentInfo?.data?.branch?.id) ? 'v.v.b' : ''} {fullName(documentInfo?.data?.branch?.head_of_branch)}</p>
               </div>
               <div className='between margin_top_15 margin_site_20'>
                  <p>Bosh buxgalter</p>
                  <p>{AddingVVBbug(documentInfo?.data?.branch?.id) ? 'v.v.b' : ''} {fullName(documentInfo?.data?.branch?.chief_accountant)}</p>
               </div>
            </div>
         </PdfWrapper>
      </>
   )
}

export default K2Form