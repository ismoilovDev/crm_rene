import { useLocation } from 'react-router-dom'
import { PdfControls } from '../components/Pdf/PdfControls';
import { PdfWrapper } from '../components/Pdf/Wrapper';
import useDataFetching from '../hooks/usePdfDataFetching';
import fullName from '../utils/functions/fullName'

function K1Form() {
   const location = useLocation()
   const orderId = location?.state?.id
   const { data: documentInfo } = useDataFetching(`/k1/${orderId}`)

   return (
      <>
         <PdfControls />
         <PdfWrapper indicator={documentInfo}>
            <div>
               <p className='text_black_18 text_center'>Kafillik  shartnomasi</p>
               <p className='text_center'>(Qarzdorlar guruhi uchun)</p>
            </div>
            <div className='between align_center pdf_margin_top_20'>
               <p className='black_text pdf_margin_top_5'>{documentInfo?.branch?.city}</p>
               <p className='black_text pdf_margin_top_5'>{documentInfo?.contract?.contract_issue_date}</p>
            </div>
            <div className='margin_top_20'>
               <p>{documentInfo?.branch?.name} nomidan {documentInfo?.branch?.contract} asosida ish yurituvchi {documentInfo?.branch?.short_name} boshqaruvchisi {documentInfo?.branch?.head_of_branch},
                  bundan buyon «Qarz Beruvchi» deb ataladi , bir tomondan, va "{documentInfo?.group?.name}" solidar tartibda javobgar guruhi a'zolari
                  {documentInfo?.group?.clients?.map(item => {
                     return (` ${item?.name}, `)
                  })} bundan buyon birgalikda "Kafillik beruvchilar", har biri alohida  "Kafillik beruvchi" deb ataladilar, ikkinchi tomondan, ushbu shartnomani quyidagilar to'g'risida tuzdilar:
               </p>

               <p className='black_text pdf_margin_top_30'>1. Shartnoma mavzusi</p>
               <div className='sections_ul pdf_margin_top_5'>
                  <p>1.1</p>
                  <ul>
                     <li>{documentInfo?.branch?.name} va "{documentInfo?.group?.name}" solidar tartibda javobgar guruhi a'zolari
                        {documentInfo?.group?.clients?.map(item => {
                           return (` ${item?.name}, `)
                        })} o'rtasida {documentInfo?.contract?.contract_issue_date} yilda tuzilgan Milkomoliyalash to'g'risidagi {documentInfo?.contract?.contract_num}-sonli mikroqarz shartnomasi bo'yicha
                        Qarz oluvchining majburiyatlarini to'liq bajarilishi uchun «Kafillik Beruvchi» «Qarz beruvchi» oldida kafillik beradi va Qarz oluvchi tomonidan o'z vaqtida to'lanmagan asosiy qarz, unga hisoblangan foizlarni hamda kechiktirilganlik uchun penya va jarimalarni to'lab beradi.
                     </li>
                  </ul>
               </div>
               <div className='sections_ul pdf_margin_top_5'>
                  <p>1.2</p>
                  <ul>
                     <li>
                        «Kafillik Beruvchi»  ushbu shartnoma va Mikromoliyalash to'g'risidagi {documentInfo?.contract?.contract_num}-sonli mikroqarz shartnomasiga asosan bir vaqtning o'zida ham kafillik beruvchi, ham qarzdor hisoblanadi.
                     </li>
                  </ul>
               </div>
               <div className='sections_ul pdf_margin_top_5'>
                  <p>1.3</p>
                  <ul>
                     <li>
                        «Qarz beruvchi» Qarz oluvchi tomonidan o'z vaqtida to'lanmagan asosiy qarz, unga hisoblangan foizlarni hamda kechiktirilganlik uchun penya va jarimalarni «Kafillik Beruvchi» dan talab qiladi.
                     </li>
                  </ul>
               </div>

               <p className='black_text pdf_margin_top_15'>2. Qarz beruvchining Huquq va Majburiyatlari:</p>
               <div className='sections_ul pdf_margin_top_5'>
                  <p>2.1</p>
                  <ul>
                     <li>
                        Qarz beruvchi  Qarzdorlar guruhi a'zolaridan biri yoki bir nechtasi mikroqarz shartnomasiga asosan o'z majburiyatlarini shartnomada belgilangan muddatda bajarmaganida, ushbu bajarilmagan majburiyatlarni Kafillik beruvchilarning har biridan alohida alohida yoxud solidar tartibda talab qilish huquqiga ega.
                     </li>
                  </ul>
               </div>
               <div className='sections_ul pdf_margin_top_5'>
                  <p>2.2</p>
                  <ul>
                     <li>
                        Kafillik beruvchi majburiyatni bajarganidan keyin Qarz beruvchi qarzdorga bo'lgan talabni tasdiqlovchi hujjatlarni kafilga topshiradi va bu talabni ta'minlaydigan huquqlarni beradi.
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
                        Qarz beruvchi Kafillik beruvchini xabardor qilmasdan ushbu kafillik bilan ta'minlangan mikroqarz shartnomasining shartlarini va muddatini o'zgartirishi mumkin emas, aks holda, Kafillik shartnomasi bekor qilingan deb hisoblanadi.
                     </li>
                  </ul>
               </div>

               <p className='black_text pdf_margin_top_15'>3. Kafillik beruvchining Huquq va Majburiyatlari:</p>
               <div className='sections_ul pdf_margin_top_5'>
                  <p>3.1</p>
                  <ul>
                     <li>
                        Qarzdorlar guruhi a'zosi kafillik bilan ta'minlangan majburiyatni bajarmagan yoki lozim darajada bajarmagan taqdirda kafillik beruvchilar qarz beruvchi oldida solidar tartibda javobgar hisoblanadi.
                     </li>
                  </ul>
               </div>
               <div className='sections_ul pdf_margin_top_5'>
                  <p>3.2</p>
                  <ul>
                     <li>
                        Kafillik beruvchilar qarz beruvchi oldida qarzdor tomonidan bajarilmagan majburiyat uchun javob beradi, shu jumladan, foizlar to'laydi, qarzni undirib olish bo'yicha sud chiqimlarini va qarzdor majburiyatni bajarmaganligi yoki lozim darajada bajarmaganligi tufayli qarz beruvchi ko'rgan boshqa zararlarni qoplaydi.
                     </li>
                  </ul>
               </div>
               <div className='sections_ul pdf_margin_top_5'>
                  <p>3.3</p>
                  <ul>
                     <li>
                        Kafillik shartnomasiga asosan mikroqarzning asosiy qismi yoki unga hisoblangan foizlar, penya va jarimalarni muddatida to'lanmagan taqdirda ''Kafillik beruvchilar" qarzdorlikni o'zlarining plastik karta, omonat va boshqa hisobvaraqlaridan so'zsiz (akseptsiz) tartibda to'lab berish majburiyatini oladilar.
                     </li>
                  </ul>
               </div>
               <div className='sections_ul pdf_margin_top_5'>
                  <p>3.4</p>
                  <ul>
                     <li>
                        Majburiyatni bajargan kafilga qarz beruvchining ushbu majburiyat bo'yicha huquqlari kafil qarz beruvchining talabini qancha hajmda qanoatlantirgan bo'lsa, shuncha hajmda o'tadi. Kafil qarz beruvchiga to'langan summaga foizlar to'lashni va qarzdor uchun javobgarlik munosabati bilan ko'rgan boshqa zararini to'lashni qonunchilikda belgilangan tartibda qarzdordan talab qilishga haqli.
                     </li>
                  </ul>
               </div>

               <p className='black_text pdf_margin_top_15'>4. Fors-major xolatlari.</p>
               <div className='sections_ul pdf_margin_top_5'>
                  <p>4.1</p>
                  <ul>
                     <li>
                        Fors-major holatlari - taraflarning biri boshqa tarafning oldida ushbu shartnoma bo'yicha olgan majburiyatlarini taraflarning erki va istagidan tashqari paydo bo'lgan va ularni oldindan ko'ra bilishi yoki bartaraf etishi mumkin bo'lmagan holatlar, ya'ni yer qimirlash, suv toshqini, yong'in va boshqa tabiiy ofatlar bilan bog'liq holda bajarmaganlari uchun javobgar bo'lmaydi.
                     </li>
                  </ul>
               </div>
               <div className='sections_ul pdf_margin_top_5'>
                  <p>4.2</p>
                  <ul>
                     <li>
                        O'z majburiyatini bajarmagan taraf shartnoma bo'yicha majburiyatni bajarishga ushbu holatlarning ta'sir ko'rsatishi yoki mone'lik qilishi to'g'risida boshqa tarafga imkon qadar tezda xabar berishi lozim.
                     </li>
                  </ul>
               </div>

               <p className='black_text pdf_margin_top_15'>5. Kafillikning bekor bo'lishi:</p>
               <div className='sections_ul pdf_margin_top_5'>
                  <p>5.1</p>
                  <ul>
                     <li>
                        Kafillik bilan ta'minlangan majburiyat bekor bo'lgach, shuningdek ushbu majburiyat kafilning roziligisiz javobgarlikning oshishiga yoki uning uchun boshqa noqulay oqibatlarga olib keladigan tarzda o'zgartirilgan taqdirda kafillik bekor bo'ladi;
                     </li>
                  </ul>
               </div>
               <div className='sections_ul pdf_margin_top_5'>
                  <p>5.2</p>
                  <ul>
                     <li>
                        Kafillik bilan ta'minlangan majburiyat bo'yicha qarz boshqa shaxsga o'tkazilganida, agar kafil yangi qarzdor uchun javobgar bo'lish haqida Qarz beruvchiga rozilik bergan bo'lmasa, kafillik bekor bo'ladi;
                     </li>
                  </ul>
               </div>
               <div className='sections_ul pdf_margin_top_5'>
                  <p>5.3</p>
                  <ul>
                     <li>
                        Shartnomada ko'rsatilgan kafillik muddati o'tganidan keyin majburiyatlar to'liq bajarilgan taqdirda kafillik bekor bo'ladi;
                     </li>
                  </ul>
               </div>
               <div className='sections_ul pdf_margin_top_5'>
                  <p>5.4</p>
                  <ul>
                     <li>
                        Qarz beruvchi kafillik bilan ta'minlangan majburiyatni bajarish muddati kelgan kundan boshlab bir yil davomida kafilga da'vo qo'zg'atmagan taqdirda kafillik bekor bo'ladi.
                     </li>
                  </ul>
               </div>

               <p className='black_text pdf_margin_top_15'>6. Boshqa shartlar</p>
               <div className='sections_ul pdf_margin_top_5'>
                  <p>6.1</p>
                  <ul>
                     <li>
                        Ushbu shartnomaga kiritiladigan har qanday o'zgartirish va qo'shimchalar yozma ravishda tomonlar o'rtasida qo'shimcha bitim tuzish orqali amalga oshiriladi va tuzilgan qo'shimcha bitimlar ushbu shartnomaning ajralmas qismi hisoblanadi.
                     </li>
                  </ul>
               </div>
               <div className='sections_ul pdf_margin_top_5'>
                  <p>6.2</p>
                  <ul>
                     <li>
                        Ushbu kafillik shartnomasi tomonlar o'rtasida imzolangan kundan yuridik kuchga kiradi va  kafillik bilan ta'minlangan  qarz majburiyati to'liq bajarilguncha yuridik kuchga ega bo'ladi.
                     </li>
                  </ul>
               </div>
               <div className='sections_ul pdf_margin_top_5'>
                  <p>6.3</p>
                  <ul>
                     <li>
                        Kafillik shartnomasi to'rt  nusxada tuzilgan bo'lib, tomonlarda bittadan saqlanadi va barcha nusxasi bir xil yuridik kuchga ega hisoblanadi.
                     </li>
                  </ul>
               </div>
               <p className='black_text pdf_margin_top_15'>7. Tomonlarning yuridik manzillari va rekvizitlari:</p>
               <p className='black_text pdf_margin_top_10 distance'>7.1. Qarz beruvchi:</p>
               <p className='distance black_text pdf_margin_top_10'>{documentInfo?.branch?.name}</p>
               <p className='distance pdf_margin_top_5'>{documentInfo?.branch?.address}</p>
               <p className='distance pdf_margin_top_5'>{documentInfo?.branch?.requisite}</p>
               <p className='distance pdf_margin_top_5'>{documentInfo?.branch?.itn}</p>
               <p className='distance pdf_margin_top_5'>Telefon: {documentInfo?.branch?.phone}</p>
               <div className='between margin_top_15 margin_site_20'>
                  <p>Boshqaruvchi</p>
                  <p>{fullName(documentInfo?.branch?.head_of_branch)}</p>
               </div>
               <div className='between margin_top_15 margin_site_20'>
                  <p>Bosh buxgalter</p>
                  <p>{fullName(documentInfo?.branch?.chief_accountant)}</p>
               </div>
               <p className='black_text pdf_margin_top_20 distance'>7.2. Kafillik beruvchilar:</p>
               <div className='margin_site_20'>
                  {
                     documentInfo?.group?.clients?.map(item => {
                        return (
                           <div className='margin_site_20 margin_top_20' key={item?.id}>
                              <p className='black_text'>{item?.name}</p>
                              <div className='between align_center margin_top_10'>
                                 <div>
                                    <p>{item?.serial_num} raqamli {item?.doc_type}  {item?.issued_date} y. da {item?.issued_by} tomonidan berilgan.</p>
                                    <p>Yashash manzilim:{item?.city} {item?.district} {item?.address}</p>
                                    <p>Shaxsiy identifikatsiya raqamim (JShShIR): {item?.pinfl}.</p>
                                 </div>
                                 <p className='marginRight'>________________</p>
                              </div>

                           </div>
                        )
                     })
                  }
               </div>
            </div>
         </PdfWrapper>
      </>
   )
}

export default K1Form