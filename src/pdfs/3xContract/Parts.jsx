import dateConvert from '../../utils/functions/dateConvert';
import Adding_VVB from '../AddingVVB';
import { typeFunc } from '../../utils/functions/supplyTypes';
import { capitalize } from '../../utils/functions/capitalize'
import { monthDiff } from '../Parts/functions';

export function MainPart({documentInfo, orderInfo}) {
   return (
      <>
         <div className="text_center">
            <p className='text_black_18 text_center contract_title'>Bosh kelishuv № {orderInfo?.open_contract?.code}</p>
            <p className="pdf_margin_top_5">
               (ochiq liniyali mikroqarz ajratish bo‘yicha)
            </p>
         </div>
         <div className='between align_center pdf_margin_top_20'>
            <p className='black_text title_contract'>{documentInfo?.data?.branch?.city}</p>
            <p className='black_text title_contract'>{dateConvert(orderInfo?.protocol_result_date)} yil</p>
         </div>
         <div className="margin_top_20">
            “Renesans Mikromoliya tashkiloti”  MCHJ (bundan buyon matnlarda “Qarz beruvchi” deb nomlanadi) nomidan _______________ yildagi №________________-sonli ishonchnoma asosida
            harakat qiluvchi {documentInfo?.data?.branch?.city} filiali boshqaruvchisi boshlig‘i {Adding_VVB(document?.branch?.id) ? 'v.v.b' : ''} {documentInfo?.data?.branch?.head_of_branch} bir tarafdan va (bundan buyon matnda «Qarz oluvchi» deb yuritiluvchi) {documentInfo?.data?.client?.name} ikkinchi tarafdan, ushbu bitimni (bundan buyon matnda bitim deb yuritiladi) quyidagilar to‘g‘risida tuzdilar:
         </div>
      </>
   )
}

function supplyTypeTwo(type){
   if(type === "auto"){
      return "Transport vositasi"
   }else if(type === "gold"){
      return "Tilla buyumlar"
   }
   return "";
}

export function Part1({orderInfo}) {
   return (
      <>
         <p className='black_text pdf_margin_top_20 title_contract_part'>1. Bitim predmeti</p>
         <div className='part'>
            <p className="pdf_margin_top_5">
               1.1. Mazkur bitimga muvofiq qarz beruvchi qarz oluvchiga {monthDiff(new Date(orderInfo?.open_contract?.start_date), new Date(orderInfo?.open_contract?.end_date))} oy muddatga kredit taqdim qilish uchun liniya ochish majburiyatini, qarz oluvchi esa liniya miqdoridan kelib chiqib, mikromiloya tashkiloti kredit siyosati talablari doirasida ta’minot bilan ta’minlash, liniya bo‘yicha olinishi nazarda tutilgan mikroqarzlarni bosh kelishuvga asosan tuzilgan mikroqarz shartnomada (keyingi o‘rinlarda mikroqarz shartnoma) nazarda tutilgan muddatlarda qaytarish, ular bo‘yicha hisoblangan foizlar shuningdek, mikroqarz shartnomasiga asosan yuzaga keladigan boshqa to‘lovlar to‘lash, majburiyatlarni bajaradi va huquqlardan foydalanadi.
            </p>
         </div>
      </>
   )
}

export function Part2({documentInfo}) {
   return (
      <>
         <p className='black_text pdf_margin_top_20 title_contract_part'>2. Umumiy qoidalar </p>
         <div className='part'>
            <p className="pdf_margin_top_5">
               2.1.	Mazkur bitimga asosan qarz oluvchi bitimning 3.1-bandida ko‘rsatilgan miqdorgacha mikroqarz shartnomasidagi maqsadlari uchun olishi mumkin.
            </p>
            <p className="pdf_margin_top_5">
               2.2.	Ajratiladigan mikroqarz mazkur bitimga asosan qiymatidan kelib chiqib, liniya doirasida mikroqarz shartnoma tuzish orqali taqdim qilinadi.
            </p>
            <p className="pdf_margin_top_5">
               2.3.	Bosh kelishuvga asosan o‘rnatilgan limit doirasida mikroqarz liniyalaridan foydalanish muddati shartnoma imzolangan sanadan boshlab bosh kelishuv muddati tugashiga 6 oy qolguncha amal qiladi. Bu muddat tugaganidan so‘ng qarz oluvchi liniyalari (transh) ochish huquqini yo‘qotadi.
            </p>
            <p className="pdf_margin_top_5">
               2.4.	Mikroqarz shartnomalari asosida har bir transh alohida ssuda hisob raqamlar ochish orqali amalga oshiriladi. Bunda bosh kelishuv doirasida mikroqarz shartnomasiga asosan ajratiladigan mikroqarzlarning so‘ndirish muddati bosh kelishuvning tugash muddatidan ortib ketmasligi shart.
            </p>
            <p className="pdf_margin_top_5">
               2.5.	Qarz oluvchi ajratilgan mablag‘lardan mikroqarz shartnomalarida ko‘rsatilgan maqsadlarda foydalanadi.
            </p>
            <p className="pdf_margin_top_5">
               2.6.	Mikroqarz ajratishda shartnomada ko‘rsatilgan barcha shartlarga va mikroqarzni qaytarishni ta’minlash maqsadida tuzilgan boshqa barcha shartnomalarga rioya etiladi. Qarz oluvchida qarz mablag‘lariga extiyoj paydo bo‘lganda ochilgan liniya limitiga mos miqdorda mikroqarzdan foydalanadi.
            </p>
            <p className="pdf_margin_top_5">
               2.7.	Mikroqarz qaytarishlilik, to‘lovlilik va muddatlilik shartlari asosida beriladi.
            </p>
            <p className="pdf_margin_top_5">
               2.8.	Mikromoliya tashkiloti mikroqarz shartnomasi imzolanganidan so‘ng 60 kalendar kuni davomida mikroqarzni ajratishni o‘z zimmasiga oladi. Ko‘rsatilgan muddat o‘tganidan so‘ng qarz oluvchining kreditni olish huquqi va qarz beruvchining uni ajratishga oid majburiyati tugagan hisoblanadi.
            </p>
            <div className="pdf_margin_top_5">
               2.9.	Qarz oluvchi qarz beruvchi tomonidan taqdim etilgan mikroqarzdan quyidagi maqsadlarda foydalanmaslik majburiyatini o‘z zimmasiga oladi:
               <ol type="a">
                  <li>
                     Qarz oluvchining muddati o‘tgan majburiyatlarini bevosita yoki bilvosita (shu jumladan uchinchi shaxslar orqali) to‘lash,
                  </li>
                  <li>
                     Uchinchi shaxslarga qarzlarni taqdim etish;
                  </li>
                  <li>
                     Amaldagi qonun xujjatlari va kredit siyosatiga asosan taqiqlangan boshqa barcha maqsadlarga.
                  </li>
               </ol>
            </div>
            <div className="pdf_margin_top_5">
               <p>
                  2.10.	Shartnoma bo‘yicha majburiyatlarni bajarishni ta’minlash uchun qarz oluvchi va/yoki uchinchi shaxslar quyidagi ta’minotlarni taqdim etadi:
               </p>
               <ul className='p1_left_space'>
                  <li>
                     -{capitalize(supplyTypeTwo(documentInfo?.data?.supply_infos?.[0]?.type))}ni garovga qo‘yish to‘g‘risida garov shartnomasi;
                  </li>
                  <li>
                     -Qarz oluvchilarning qarz beruvchi oldidagi majburiyatlarini bajarish bo‘yicha solidar tartibdagi kafillik shartnomasi.
                  </li>
               </ul>
            </div>
            <p className="pdf_margin_top_5">
               2.11.	Mazkur Bosh kelishuvga asosan tuzilgan mikroqarz shartnomasi kelishuvning ajralmas qismi hisoblanadi.
            </p>
            <p className="pdf_margin_top_5">
               2.12.	Mazkur Bosh kelishuv qoidalari unga asosan tuzilgan mikroqarz shartnomasiga nisbatan to‘liq hajmda qo‘llaniladi. Bunda bosh kelishuv hamda bosh kelishuvga asosan tuzilgan mikroqarz shartnomasi qoidalari o‘rtasida ziddiyat vujudga kelgan taqdirda, bosh kelishuv qoidalari ustunroq kuchga ega bo‘ladi.
            </p>
         </div>
      </>
   )
}

export function Part3({orderInfo}) {
   return (
      <>
         <p className='black_text pdf_margin_top_20 title_contract_part'>3. Bitim bahosi</p>
         <div className='part'>
            <p className="pdf_margin_top_5">
               3.1. Bosh kelishuvga asosan liniya miqdori {orderInfo?.open_contract?.sum?.toLocaleString()} so‘mni tashkil qiladi.
            </p>
            <p className="pdf_margin_top_5">
               3.2. Har bir beriladigan mikroqarz miqdori mikroqarz shartnomaga asosan belgilanadi.
            </p>
         </div>
      </>
   )
}

export function Part4() {
   return (
      <>
         <p className='black_text pdf_margin_top_20 title_contract_part'>4. Tasdiqlash va kafolatlar berish</p>
         <div className='part'>
            <p className="pdf_margin_top_5">
               4.1. Qarz oluvchi qarz beruvchiga taqdim etgan mikroqarz olish bilan bog‘liq bo‘lgan zaruriy hujjatlar xaqiqiyligini, ma’lumotlarning ishonchliligini va hujjatlarning nusxalari asliga to‘g‘riligini kafolatlaydi.
            </p>
            <p className="pdf_margin_top_5">
               4.2. Tasdiqlash va kafolatlar berishga qarz oluvchi to‘liq hajmda amal qilishi lozim. Kelishuvda ko‘zda tutilgan tasdiqlash va kafolatlar berishga amal qilinmagan yoki lozim darajada amal qilinmagan taqdirda qarz beruvchi qarz oluvchiga mikroqarz taqdim etishdan bosh tortishga haqli.
            </p>
         </div>
      </>
   )
}

export function Part5() {
   return (
      <>
         <p className='black_text pdf_margin_top_20 title_contract_part'>5. Qarz oluvchining huquq va majburiyatlari</p>
         <div className='part'>
            <p className="sub_title_contract_part">5.1. Qarz oluvchi quyidagi huquqlarga ega:</p>
            <p className="pdf_margin_top_5">
               5.1.1. Garov ta'minoti qarz beruvchi tomonidan sugurta qilinmaydi, qarz oluvchining xoxishiga ko'ra, uning o'z hisobidan sug'urta qilinishi mumkin.
            </p>
            <p className="pdf_margin_top_5">
               5.1.2. Mikroqarzdan foydalanish, uni so‘ndirish bilan bog‘liq masalalar bo‘yicha qarz beruvchining  vakiliga murojaat qilish;
            </p>
            <p className="pdf_margin_top_5">
               5.1.3. Bitim va mikroqarz shartnomalarni imzo qo‘ymasdan oldin tanishib chiqishi uchun o‘zi bilan olib ketish;
            </p>
            <p className="pdf_margin_top_5">
               5.1.4. Bitim yoki mikroqarz shartnoma tuzilgandan keyin pul mablag‘lari olingunga qadar bo‘lgan davrda mikroqarz olishdan bepul asosda voz kechish;
            </p>
            <p className="pdf_margin_top_5">
               5.1.5. Istalgan vaqtda mikroqarzni muddatidan oldin so‘ndirish;
            </p>
            <p className="pdf_margin_top_5">
               5.1.6. Mikroqarz ajratish jarayoni yuzasidan qonun hujjatlarida belgilangan talab va qoidalar to‘g‘risida qarz beruvchidan maslahatlar olish;
            </p>
            <p className="pdf_margin_top_5">
               5.1.7. Qarz beruvchidan bitimda belgilangan shartlar asosida belgilangan miqdorda mikroqarz mablag‘ini o‘z vaqtida ajratilishini talab qilish;
            </p>
            <p className="pdf_margin_top_5">
               5.1.8. Qarz beruvchi tomonidan bitimda ko‘zda tutilgan mikroqarz uzrli sabablarsiz yoki kechiktirib ajratilgani uchun neustoyka to‘lashni talab qilish;
            </p>
            <p className="pdf_margin_top_5">
               5.1.9. Kredit to‘lovlari to‘g‘risida ma’lumotlar olish;
            </p>
            <p className="pdf_margin_top_5">
               5.1.10. Qonun hujjatlarida belgilangan nizoni sudgacha hal qilish usullarini, shu jumladan muzokaralar o‘tkazish orqali, qo‘llash.
            </p>
         </div>
         <div className='part'>
            <p className="sub_title_contract_part">5.2.  Qarz oluvchining majburiyatlari quyidagilar: </p>
            <p className="pdf_margin_top_5">
               5.2.1. Mikroqarzni olishga va undan foydalanishga bevosita aloqador bo‘lgan faoliyat bilan qarz beruvchining to‘siqsiz tanishishiga imkon berish;
            </p>
            <p className="pdf_margin_top_5">
               5.2.2. Qarz beruvchi tomonidan qarz oluvchining moliyaviy holatidan kelib chiqib talab qilinishi mumkin bo‘lgan barcha kerakli ma’lumotlar belgilangan muddatlarda qarz beruvchiga taqdim etilishini ta’minlash, shuningdek, 5 ish kuni davomida kredit va unga hisoblangan foizlarni vaqtida va to‘laligicha to‘lashga ta’sir ko‘rsatadigan boshqa holatlar haqida qarz beruvchini xabardor qilish;
            </p>
            <p className="pdf_margin_top_5">
               5.2.3. Bitim va mikroqarz shartnomasi imzolangandan so‘ng, bitimga asosan mikroqarz ta’minotiga oid barcha talablarni bajarish, jumladan, mikroqarz ta’minoti sifatida taqdim qilinayotgan mol-mulklarni (yoki mulkiy huquqlarni) shartnoma muddatiga ixtiyoriy tartibda sug‘urta qilish, garov shartnomalarini qonunchilikda belgilangan tartibda rasmiylashtirish, vakolatli organlarda ro‘yxatdan o‘tkazish hamda ta’qiq qo‘yish yoki uchinchi shaxsga tegishli ta’minot taqdim qilinayotgan bo‘lsa, garov shartnomalarini qonuniy tartibda rasmiylashtirish;
            </p>
            <p className="pdf_margin_top_5">
               5.2.4. Ajratilgan kreditlar uchun 125 foizdan kam bo‘lmagan qiymatdagi likvidli bo‘lgan ta’minot turlarini taqdim qilish. Qarz beruvchi tomonidan monitoring, undiruv davomida yoki boshqa sabablarga ko‘ra garov ta’minoti qarz majburiyatlarini qoplashga yetarli emas deb topilgan taqdirda yetarlicha miqdorda qo‘shimcha ta’minot taqdim qiladi hamda uni tegishli tartibda rasmiylashtirilishini ta’minlaydi;
            </p>
            <div className="pdf_margin_top_5">
               5.2.5 Qarz oluvchining faoliyatini amalga oshirilishi jarayonida O‘zbekiston Respublikasining mehnat to‘g‘risidagi qonun hujjatlari talablariga amal qilish majburiyatini oladi, shu jumladan:
               <ol type="a">
                  <li>
                     Bolalar mehnatining yo‘qligi;
                  </li>
                  <li>
                     Ishchilar bandligiga oid kamsitishlarning yo‘qligi;
                  </li>
                  <li>
                     Majburiy mehnatning yo‘qligi.
                  </li>
               </ol>
            </div>
            <p className="pdf_margin_top_5">
               5.2.6. Qarz oluvchi (garovga qo‘yuvchi) ta’minotga taqdim etilgan obe’ktni (mol-mulkni, mulkiy huquqlarni, huquqlarni) mikroqarz va uning foizlari to‘liq to‘langunga qadar Qarz beruvchining roziligisiz sotishga yoki boshqacha tarzda realizatsiya qilishga haqli emas.
            </p>
         </div>
      </>
   )
}

export function Part6() {
   return (
      <>
         <p className='black_text pdf_margin_top_20 title_contract_part'>6. Qarz beruvchining huquq va majburiyatlari </p>
         <div className='part'>
            <p className="sub_title_contract_part">6.1. Qarz beruvchi quyidagi huquqlarga ega: </p>
            <p className="pdf_margin_top_5">
               6.1.1. Kreditlash jarayonida qarz oluvchining moliyaviy-xo‘jalik holatini tekshirish va shartnoma bo‘yicha majburiyatlarni bajarishni ta’minlash uchun qabul qilingan garov predmetining haqiqiy holatini tekshirish;
            </p>
            <p className="pdf_margin_top_5">
               6.1.2. Qarz oluvchi tomonidan mikroqarzni so‘ndirish jarayonida gumonli va/yoki shubhali operatsiyalar alomatlari mavjud operatsiyalar bajarilganda operatsiya haqidagi qo‘shimcha ma’lumotlarni, jumladan pul mablag‘lari manbalari to‘g‘risidagi ma’lumotlarni olish yuzasidan mijozga murojaat qilish hamda taqdim qilingan hujjatlar nusxalarining to‘g‘riligiga gumon yoki boshqa zarurat paydo bo‘lgan taqdirda, tanishish uchun hujjatlarning asl nusxalari taqdim qilinishini talab qilish;
            </p>
            <p className="pdf_margin_top_5">
               6.1.3. Qarz oluvchi tomonidan atayin noto‘g‘ri bo‘lgan hujjatlar taqdim etilganda yoki qonun hujjatlariga muvofiq so‘raladigan hujjatlar taqdim etilmaganda, qarz oluvchi joylashgan yeri (pochta manzili) bo‘yicha tekshirish imkoni mavjud bo‘lmaganida hamda jinoiy faoliyatdan olingan daromadlarni legallashtirishga, terrorizmni moliyalashtirishga va ommaviy qirg‘in qurolini tarqatishni moliyalashtirishga qarshi kurashish to‘g‘risidagi qonun hujjatlarida  belgilangan hollarda kredit ajratishni to‘xtatib qo‘yish;
            </p>
            <p className="pdf_margin_top_5">
               6.1.4. Bitim va mikroqarz shartnomasida ko‘rsatilgan holatlarga oydinlik kiritish uchun qarz oluvchidan har qanday ma’lumotni so‘rash, tasdiqlovchi hujjatlarni taqdim etishini talab qilish, shuningdek, boshqa harakatlarni amalga oshirish;
            </p>
            <p className="pdf_margin_top_5">
               6.1.5. Mikroqarz ta’minotiga oid barcha talablar bajarilgach, mikroqarz shartnomasiga asosan mablag‘ ajratish;
            </p>
            <div className="pdf_margin_top_5">
               6.1.6. Tegishli to‘lov muddatlari buzilganda, mikroqarz asosiy qismi, foiz to‘lovi va boshqa to‘lovlarni (bank plastik kartalaridan, omonat va boshqa hisobvaraqlaridan so‘zsiz (aksepsiz) tartibda to‘liq) undirib olish va  quyidagi navbatda yo‘naltirishga haqli:
               <ol type="a">
                  <li>
                     Birinchi navbatda – neustoykalar (jarima, penya)ni qoplash;
                  </li>
                  <li>
                     Ikkinchi navbatda  – mikroqarzdan foydalanganlik uchun foizlarni qoplash;
                  </li>
                  <li>
                     Uchinchi navbatda- asosiy qarzni qoplash;
                  </li>
                  <li>
                     To‘rtinchi navbatda – sud va undiruv jarayonlari bilan bog‘liq xarajatlarni qoplash;
                  </li>
                  <li>
                     Beshinchi navbatda – mikroqarzning majburiyatlarni bajarishga  sarflangan xarajatlarini shu jumladan, undiruv xarajatlarini qoplash;
                  </li>
               </ol>
            </div>
            <div className="pdf_margin_top_5">
               6.1.7. Agar quyidagi holatlardan biri yuz bergan taqdirda, liniya doirasida mikroqarz taqdim qilish to‘xtatiladi:
               <ol type="a">
                  <li>
                     Qarz oluvchi mazkur bitim hamda mikroqarz shartnomalari bo‘yicha majburiyatlarini to‘liq, o‘z vaqtida bajarmagan yoki lozim darajada bajarmaganda;
                  </li>
                  <li>
                     Muddati o‘tkazib yuborilgan kreditorlik qarzlarining mavjud bo‘lganda;
                  </li>
                  <li>
                     Ta’minotining bozor bahosi majburiyatlarni kamida 125 foiz qoplashi uchun yetarli bo‘lmaganda;
                  </li>
                  <li>
                     Bitim izolanganidan so‘ng qarz beruvchining roziligisiz boshqa bank yoki moliya tashkilotlaridan qarz va boshqa majburiyatlarning olinishi;
                  </li>
                  <li>
                     Ta’minot holatining yomonlashishi, uning o‘g‘rilanishi, talon-toroj qilinishi, likvidliligining pasayishi, bozor kon’yukturasi narxlarining kamida 25 foizga pasayib ketishi yoki boshqacha holatlar natijasida kredit ta’minlanmay qolish xavfining vujudga kelishi, basharti ta’minotni o‘zgartirish yoki qo‘shimcha ta’minot taqdim etish bo‘yicha mikroqarz shartnoma talabining bajarilmasligi;
                  </li>
                  <li>
                     Monitoringdan bo‘yin tovlashlik yoki MMT xodimlari (jalb qilingan mutaxassislar)ning monitoring o‘tkazishiga har qanday usullar bilan to‘sqinlik qilishi;
                  </li>
                  <li>
                     Qarz beruvchiga bitim va mikroqarz shartnomada nazarda tutilgan hujjatlarni taqdim etmasligi yoki haqqoniy bo‘lmagan hujjatlar va ma’lumotlarning taqdim etilishi;
                  </li>
                  <li>
                     Mikroqarz va unga hisoblangan foizlarni shartnomada belgilangan muddatdan 30 kun va undan ortiq muddatga kechiktirilishi;
                  </li>
                  <li>
                     Mikroqarz va unga hisoblangan foizlarni muntazam ravishda kechiktirib to‘lanishi, ya’ni mazkur shartnomaning ajralmas qismi hisoblangan qaytarish jadvalida qayd etilgan to‘lov muddatini kechiktirish mikroqarz tasnifini standartdan boshqasiga  o‘zgarishiga sabab bo‘lishi;
                  </li>
                  <li>
                     O‘zbekiston Respublikasi Markaziy banki yoki sud tomonidan MMT litsenziyasi chaqirib olinganda, ayrim bank operatsiyalari to‘xtatilganda, litsenziya amal qilishi vaqtincha to‘xtatilishi oqibatida  vaziyatning jiddiy o‘zgarishi natijasida;
                  </li>
               </ol>
            </div>
            <p className="pdf_margin_top_5">
               6.1.8. Qarz oluvchi tomonidan ushbu shartnomaning 10.4-bandida ko‘rsatilgan shartnomani jiddiy buzish holatlari sodir qilinganligi aniqlagan taqdirda, qarz beruvchi shartnomani muddatidan oldin bir tomonlama yoki sud tartibida bekor  qilib, mikroqarz qarzdorliklarini qoplash uchun undiruvni mikroqarz ta’minotiga qaratishga xaqli;
            </p>
            <p className="pdf_margin_top_5">
               6.1.9. Qarz oluvchi shartnomada belgilangan muddatda qarz summasini muddatida qaytarishga qodir emasligidan aniq-ravshan dalolat beruvchi holatlar aniqlanganda, mikroqarzni taqdim etish majburiyatini bajarmaslik;
            </p>
            <p className="pdf_margin_top_5">
               6.1.10. Qarz oluvchi mikroqarz shartnomasi bo‘yicha qarzning asosiy summasini qaytarish va (yoki) foizlarni to‘lash muddatlarini buzganda, mikroqarz shartnomasida nazarda tutilgan usulda nizoni sudgacha hal qilish yuzasidan o‘z talabnomasini iste’molchiga yetkazish.
            </p>
         </div>
         <div className='part'>
            <p className="sub_title_contract_part">6.2.  Qarz beruvchining majburiyatlari: </p>
            <p className="pdf_margin_top_5">
               6.2.1.	Qarz oluvchi tomonidan shartnomaga asosan qarz bo‘yicha qarzdorlik summasini to‘lash majburiyati to‘liq bajarilgan sanadan boshlab uch ish kunidan kechiktirmagan holda mazkur qarz bo‘yicha garovda turgan mulkni ta’qiqdan chiqarish va garov sifatida bo‘lgan mol-mulkka nisbatan qarz beruvchining huquqlari to‘g‘risidagi yozuvni garov reyestridan chiqarish;
            </p>
            <p className="pdf_margin_top_5">
               6.2.2.	Qarz oluvchiga mikroqarz shartnomasida nazarda tutilgan mikroqarzni berishdan butunlay yoki qisman bosh tortgan taqdirda, ushbu mikroqarz bo‘yicha mablag‘lar berishni to‘xtatib qo‘yish to‘g‘risida qaror qabul qilingan sanadan boshlab keyingi ish kunidan kechiktirmasdan qarz oluvchiga  mikroqarz  berish to‘xtatilganligi  va uning sabablari yuzasidan yozma xabarnoma yuborish;
            </p>
            <p className="pdf_margin_top_5">
               6.2.3.	Mikroqarz shartnomasi bo‘yicha muddati o‘tkazib yuborilgan qarzdorlik yuzaga kelganda, qarz oluvchi zimmasidagi qarz yuki yanada oshib ketishining oldini olish maqsadida muddati o‘tkazib yuborilgan qarzdorlik yuzaga kelgan sanadan boshlab 10 (o‘n) kalendar kuni davomida qarz oluvchi bilan shartnomada kelishilgan har qanday aloqa bog‘lash usullaridan, shu jumladan pochta aloqa vositalaridan yoki qonun hujjatlarida nazarda tutilgan boshqa usullardan foydalanib, qarz oluvchiga muddati o‘tkazib yuborilgan qarzdorlik yuzaga kelganligi haqida (taqdim etilgan so‘ndirish jadvalidan kelib chiqqan holda) xabar berish.
            </p>
         </div>
      </>
   )
}

export function Part7() {
   return (
      <>
         <p className='black_text pdf_margin_top_20 title_contract_part'>7.Tomonlarning majburiyatlarining bajarilishini ta’minlash</p>
         <div className='part'>
            <p className="pdf_margin_top_5">
               7.1.	Mazkur bitim doirasida tuziladigan mikroqarz shartnomalarida ko‘rsatilgan tomonlarning majburiyatlarini bajarilishini ta’minlashi lozim.
            </p>
            <p className="pdf_margin_top_5">
               7.2.	Bitim doirasida kelib chiqadigan majburiyatlarni bajarilishini ta’minlash uchun qarz oluvchi mazkur bitimning 2.10-bandida qayd etilgan ta’minotlarni taqdim etadi yoki taqdim etilishi yuzasidan bitimlar tuzilishini ta’minlaydi.
            </p>
            <p className="pdf_margin_top_5">
               7.3.	Penya qarz oluvchi tomonidan muddati o‘tkazib yuborilgan summadan, to‘lov amalga oshirilishi kerak bo‘lgan kundan qarz oluvchi tomonidan muddati o‘tgan majburiyat bajarilgunga qadar hisoblanadi.
            </p>
         </div>
      </>
   )
}

export function Part8() {
   return (
      <>
         <p className='black_text pdf_margin_top_20 title_contract_part'>8.Bitim bo‘yicha huquqlardan voz kechish</p>
         <div className='part'>
            <p className="pdf_margin_top_5">
               8.1.	Qarz beruvchi qarz oluvchining roziligi bilan bitim bo‘yicha talab qilish huquqidan to‘laligicha yoki qisman uchinchi shaxslar foydasiga voz kechishi mumkin.
            </p>
            <p className="pdf_margin_top_5">
               8.2.	Qarz beruvchi mikroqarz bo‘yicha talab qilish huquqidan voz kechilgan taqdirda uchinchi shaxslarga, yuridik va moliyaviy maslahatchilarga bank sirini tashkil qiladigan, qarz oluvchi va uning operatsiyalari to‘g‘risidagi ma’lumotlarni taqdim etishga haqli.
            </p>
            <p className="pdf_margin_top_5">
               8.3.	Qarz oluvchi qarz beruvchi bilan kelishmagan holda o‘z huquqlaridan voz kechish va bitim bo‘yicha majburiyatlarini qanday shaklda bo‘lmasin uchinchi shaxslarga topshirishga, o‘tkazishga haqli emas.
            </p>
         </div>
      </>
   )
}

export function Part9() {
   return (
      <>
         <p className='black_text pdf_margin_top_20 title_contract_part'>9.Boshqa shartlar</p>
         <div className='part'>
            <p className="pdf_margin_top_5">
               9.1.	Qarz oluvchi mikroqarz majburiyatlarini bajarishni ta’minlash uchun qilingan barcha xarajatlarni to‘lashni o‘z zimmasiga oladi.
            </p>
            <p className="pdf_margin_top_5">
               9.2.	Majburiyatlarini buzgan taraf bitimda ko‘zda tutilgan javobgarlikka qo‘shimcha ravishda boshqa tarafga yetkazilgan zararni qoplash majburiyatini o‘z zimmasiga oladi.
            </p>
            <p className="pdf_margin_top_5">
               9.3.	Qarz oluvchi bitim bo‘yicha pul majburiyatlari lozim darajada bajarilishiga barcha mol-mulki, aktivlari va qarz oluvchi tomonidan shartnoma bo‘yicha majburiyatlari to‘liq yoki qisman bajarilmaganida haqiqiy qarzdorlik summasini undirishga qaratilishi mumkin bo‘lgan, shuningdek, shartnoma bajarilishi bilan bog‘liq barcha xarajatlar, shu jumladan sud va boshqa xarajatlar uchun javobgar bo‘lishini tasdiqlaydi va kafolat beradi.
            </p>
            <p className="pdf_margin_top_5">
               9.4.	Taraflar tomonidan bir-biriga jo‘natiladigan har qanday xabarnoma, talabnoma yoki boshqa xatlar yozma shaklda amalga oshirilishi shart. Pochta xabari/xati pochtadan ko‘rsatilgan manzilda oluvchi shaxs yo‘qligi tufayli belgisi bilan qaytarilgan hollarda ham jo‘natilgan, deb hisoblanadi.
            </p>
            <p className="pdf_margin_top_5">
               9.5.	Bitimni bajarilishida taraflar mazkur bitim shartlariga hamda O‘zbekiston Respublikasining qonun hujjatlariga amal qilishadi.
            </p>
         </div>
      </>
   )
}

export function Part10() {
   return (
      <>
         <p className='black_text pdf_margin_top_20 title_contract_part'>10.Bitimning kuchga kirishi, o‘zgartirish va bekor qilish tartibi</p>
         <div className='part'>
            <p className="pdf_margin_top_5">
               10.1.	Mazkur bitim bir xil yuridik kuchga ega bo‘lgan 3 nusxada tuzilib, bitim nusxalari shartlashuvchi tomonlarda bir nusxadan saqlanadi.
            </p>
            <p className="pdf_margin_top_5">
               10.2.	Bitim taraflar tomonidan imzolangan paytdan boshlab kuchga kiradi va taraflar tomonidan majburiyatlar to‘liq bajarilgunga qadar amal qiladi.
            </p>
            <p className="pdf_margin_top_5">
               10.3.	Bitimga tegishli o‘zgartirish va qo‘shimchalar kiritish haqidagi kelishuv yozma shaklda tuziladi va taraflar tomonidan imzolangan paytdan boshlab kuchga kiradi.
            </p>
            <p className="pdf_margin_top_5">
               10.4.	Qarz oluvchi mazkur bitimning 6.1.7.a-j-bandlarida ko‘rsatilgan holatlardan hech bo‘lmasa bittasiga yo‘l qo‘yilgan taqdirda shartnomani jiddiy buzish deb hisoblanadi va bunda qarz beruvchi bitim yoki mikroqarz shartnomani bir taraflama yoki sud tartibida muddatidan oldin bekor qilishi hamda mikroqarz va unga hisoblangan foizlarni muddatidan oldin qaytarib olishi mumkin.
            </p>
         </div>
      </>
   )
}

export function Part11() {
   return (
      <>
         <p className='black_text pdf_margin_top_20 title_contract_part'>11.Maxfiylik</p>
         <div className='part'>
            <p className="pdf_margin_top_5">
               11.1.	Bitimni tuzish va bajarish vaqtida taraflar bir-biridan olgan barcha ma’lumotlar maxfiy axborotlar deb tan olinadi.
            </p>
            <p className="pdf_margin_top_5">
               11.2.	Bitimni tuzish va undan kelib chiqadigan majburiyatlarni bajarish chog‘ida boshqa tarafning tijorat siri hisoblangan maxfiy axborotlar va ma’lumotlarni ikkinchi taraf axborot egasining yozma roziligisiz oshkor qilmaslik majburiyatini oladi.  Mazkur talab bitimning amal qilish muddatiga hamda uning muddati tugagan vaqtdan boshlab 3 yil davomida amal qiladi.
            </p>
            <p className="pdf_margin_top_5">
               11.3.	Ushbu talablarni buzgan taraf buning oqibatida ikkinchi tarafga yetkazilgan barcha zararni to‘liq hajmda qoplaydi.
            </p>
            <p className="pdf_margin_top_5">
               11.4.	Qarz oluvchi o‘zi to‘g‘risidagi har qanday ma’lumotlarni qarz beruvchi o‘z huquqlari, manfaatlari yoki ularni himoya qilish maqsadida uchinchi shaxslarga oshkor etish (topshirish) uchun so‘zsiz roziligini bildirgan hisoblanadi.
            </p>
            <p className="pdf_margin_top_5">
               11.5.	Qarz oluvchi qarz beruvchiga bitimda ko‘rsatilgan yoki bitim tuzilishi va bajarilishida taqdim etilgan o‘zining barcha  ma’lumotlari bilan ishlashga va topshirishga mazkur bitimga asosan roziligini tasdiqlaydi. Shu jumladan, bitim bo‘yicha huquqiy vorislik tartibida qarz beruvchining huquq  va majburiyatlari boshqa shaxsga o‘tganda, ularni uchinchi shaxsga topshirishga ham rozilik beradi. Bunday ma’lumotlarni uchinchi shaxslarga taqdim etish qarz oluvchining qonun bilan muhofaza qilinadigan MMT  va boshqa sirlarining buzilishi bo‘lib hisoblanmasligiga mazkur bitimga binoan roziligini bildirgan hisoblanadi.
            </p>
         </div>
      </>
   )
}

export function Part12() {
   return (
      <>
         <p className='black_text pdf_margin_top_20 title_contract_part'>12.Fors-major</p>
         <div className='part'>
            <p className="pdf_margin_top_5">
               12.1.	Yengib bo‘lmaydigan kuchlar (fors-major) holatlari - bu taraflarning irodasi, xohishiga bog‘liq bo‘lmagan tabiat hodisalari (zilzila, ko‘chki, bo‘ron va hokazo), ijtimoiy iqtisodiy holatlar (urush holati, qamal, davlat manfaatlarini ko‘zlab import va eksportni taqiqlash va boshqalar), xalqaro, banklararo va mikromoliya tashkiloti elektron to‘lov hamda ta’minot tizimidagi nosozlik, mikromoliya tashkilotining dasturiy ta’minot tizimiga qilingan tahdid (xujumlar) sababli yuzaga kelgan sharoitlarda taraflarga majburiyatlarni bajarish imkonini bermaydigan favqulodda, oldini olib bo‘lmaydigan va kutilmagan holatlardir.
            </p>
            <p className="pdf_margin_top_5">
               12.2.	Fors-major holatlari yuzaga kelgan vaqtda taraflar ushbu holatlar bartaraf etilguniga qadar shartnomaviy majburiyatlarini bajarishdan ozod bo‘ladi.
            </p>
            <p className="pdf_margin_top_5">
               12.3.	Fors-major holatlari boshlanganligi yoki yakunlanganligi haqida bir taraf ikkinchi tarafni 3 ish kuni ichida bu haqda yozma ravishda xabardor qilishi shart. Xabarnomalar barcha aloqa vositalari orqali yuborilishi mumkin.
            </p>
         </div>
      </>
   )
}

export function Part13() {
   return (
      <>
         <p className='black_text pdf_margin_top_20 title_contract_part'>13.Nizolarni hal qilish tartibi</p>
         <div className='part'>
            <p className="pdf_margin_top_5">
               13.1.	Taraflar mazkur bitimni bajarish vaqtida yuzaga kelgan kelishmovchilik yoki nizolarni muzokara yo‘li bilan hal etadilar.
            </p>
            <p className="pdf_margin_top_5">
               13.2.	O‘zaro kelishuv imkoniyati bo‘lmaganda, huquqi buzilgan taraf tomonidan yuborilgan talabnoma yoki ogohlantirish xatiga ikkinchi taraf mazkur talabnoma yoki ogohlantirish xatida ko‘rsatilgan muddat ichida javob berishi lozim.
            </p>
            <p className="pdf_margin_top_5">
               13.3.	Talabnoma yoki ogohlantirish xatini tarafga shaxsan topshirish pochta aloqa xizmati orqali xat bilan yuborish yo‘li bilan amalga oshiriladi.
            </p>
            <p className="pdf_margin_top_5">
               13.4.	Kelishuv yo‘li bilan hal etilmagan nizolar O‘zbekiston Respublikasi qonunchiligida belgilangan tartibda qarz beruvchining mikroqarz shartnomasida ko‘rsatilgan xududdagi sudda hal etiladi.
            </p>
         </div>
      </>
   )
}

export function Part14({ children }) {
   return (
      <>
         <p className='black_text pdf_margin_top_20 title_contract_part'>
            14.Taraflarning qayd etish ma’lumotlari va imzolari
         </p>
         {children}
      </>
   )
}