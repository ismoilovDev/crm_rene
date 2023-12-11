import dateConvert from '../../utils/functions/dateConvert';
import { typeFunc } from '../../utils/functions/supplyTypes';
import { capitalize } from '../../utils/functions/capitalize'
import { monthDiff } from '../Parts/functions';

export function MainPart({documentInfo, orderInfo}) {
   return (
      <>
         <div className="text_center">
            <p className='text_black_18 text_center contract_title'>Bosh kelishuv № {orderInfo?.open_contract?.code}</p>
            <p className="pdf_margin_top_5">
               (ochiq liniyali kredit ajratish bo’yicha)
            </p>
         </div>
         <div className='between align_center pdf_margin_top_20'>
            <p className='black_text title_contract'>{documentInfo?.data?.branch?.city}</p>
            <p className='black_text title_contract'>{dateConvert(orderInfo?.protocol_result_date)} yil</p>
         </div>
         <div className="margin_top_20">
         “Renesans Mikromoliya Tashkiloti” MChJ (bundan buyon matnlarda “Qarz beruvchi” deb nomlanadi) nomidan _______________ yildagi №________________-sonli ishonchnoma asosida
            harakat qiluvchi {documentInfo?.data?.branch?.city} filiali boshqaruvchisi {documentInfo?.data?.branch?.head_of_branch} bir tarafdan va (bundan buyon matnda «Qarz oluvchi» deb yuritiluvchi) Fuqaro {documentInfo?.data?.client?.name} ikkinchi tarafdan, ushbu bosh kelishuvni (bundan buyon matnda kelishuv deb yuritiladi) quyidagilar to‘g‘risida tuzdilar:
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
         <p className='black_text pdf_margin_top_20 title_contract_part'>1. Kelishuv predmeti</p>
         <div className='part'>
            <p className="pdf_margin_top_5">
               1.1 Mazkur kelishuvga muvofiq qarz beruvchi qarz oluvchiga {monthDiff(new Date(orderInfo?.open_contract?.start_date), new Date(orderInfo?.open_contract?.end_date))} oy muddatga, {orderInfo?.open_contract?.sum?.toLocaleString()} so‘m miqdorida kredit taqdim qilish uchun liniya ochish majburiyatini, qarz oluvchi esa
                  liniya miqdoridan kelib chiqib, mikromoliya tashkiloti kredit siyosati talablari doirasida ta’minot bilan
                  ta’minlash, liniya bo‘yicha olinishi nazarda tutilgan kredit bosh kelishuvga asosan tuzilgan kredit
                  shartnomada (keyingi o‘rinlarda kredit shartnoma) nazarda tutilgan muddatlarda qaytarish, ular bo‘yicha
                  hisoblangan foizlar shuningdek, kredit shartnomasiga asosan yuzaga keladigan boshqa to‘lovlar to‘lash, majburiyatlarni bajaradi va huquqlardan foydalanadi.
            </p>
         </div>
      </>
   )
}

export function Part2({documentInfo}) {
   return (
      <>
         <p className='black_text pdf_margin_top_20 title_contract_part'>2. Umumiy qoidalar</p>
         <div className='part'>
            <p className="pdf_margin_top_5">
               2.1.	Mazkur kelishuvga asosan qarz oluvchi kelishuvning 3.1-bandida ko‘rsatilgan miqdorgacha kredit shartnomasidagi maqsadlari uchun mikroqarz olishi mumkin.
            </p>
            <p className="pdf_margin_top_5">
               2.2.	Ajratiladigan kredit mazkur kelishuvga asosan qiymatidan kelib chiqib, liniya doirasida kredit shartnoma tuzish orqali taqdim qilinadi.
            </p>
            <p className="pdf_margin_top_5">
               2.3.	Bosh kelishuvga asosan o‘rnatilgan limit doirasida kredit liniyalaridan foydalanish muddati shartnoma imzolangan sanadan boshlab bosh kelishuv muddati tugashiga 6 oy qolguncha amal qiladi.
                  Bu muddat tugaganidan so‘ng qarz oluvchi mikroqarz shartnomasi (transh) ochish huquqini yo‘qotadi.
            </p>
            <p className="pdf_margin_top_5">
               2.4.	Kredit shartnomalari asosida har bir transh alohida mikroqarz shartnomasi orqali amalga oshiriladi. Bunda bosh kelishuv doirasida kredit shartnomasiga asosan ajratiladigan kreditlarning so‘ndirish muddati bosh kelishuvning tugash muddatidan ortib ketmasligi shart.
            </p>
            <p className="pdf_margin_top_5">
               2.5.	Qarz oluvchi ajratilgan mablag‘dan mikroqarz shartnomalarida ko‘rsatilgan maqsadlarda foydalanadi.
            </p>
            <p className="pdf_margin_top_5">
               2.6.	Kredit ajratishda shartnomada ko‘rsatilgan barcha shartlarga va kreditni qaytarishni ta’minlash maqsadida tuzilgan boshqa barcha shartnomalarga rioya etiladi. Qarz oluvchida qarz mablag’lariga extiyoj paydo bo’lganda ochilgan mikroqarz liniyasi limitiga mos miqdorda kreditdan foydalanadi.
            </p>
            <p className="pdf_margin_top_5">
               2.7.	Kredit <span style={{'fontWeight': 700}}>qaytarishlilik, to‘lovlilik va maqsadlilik, muddatlilik, taminlanganlik,</span> shartlari asosida beriladi.
            </p>
            <p className="pdf_margin_top_5">
               2.8.	Mikromoliya tashkiloti mikroqrz ajratish bo‘yicha qaror qabul qilingandan so’ng 30 kalendar kuni davomida kreditni ajratishni o’z zimmasiga oladi. Ko’rsatilgan muddat o’tganidan so’ng qarz oluvchining kreditni olish huquqi va qarz beruvchining uni ajratishga oid majburiyati tugagan hisoblanadi.
               Qarz oluvchi qarz beruvchi tomonidan taqdim etilgan kreditdan quyidagi maqsadlarda foydalanmaslik majburiyatini o’z zimmasiga oladi:
               <ol type="a">
                  <li>
                     Qarz oluvchining muddati o’tgan majburiyatlarini bevosita yoki bilvosita (shu jumladan uchinchi shaxslar orqali) to’lash,
                  </li>
                  <li>
                     Uchinchi shaxslarga qarzlarni taqdim etish;
                  </li>
                  <li>
                     Amaldagi qonun xujjatlari va kredit siyosatiga asosan taqiqlangan boshqa barcha maqsadlarg.
                  </li>
                  <li>
                     Shartnoma bo’yicha majburiyatlarni bajarishni ta’minlash uchun qarz oluvchi va/yoki uchinchi shaxslar quyidagi ta’minotlarni taqdim etadi:
                     <p> -{capitalize(supplyTypeTwo(documentInfo?.data?.supply_infos?.[0]?.type))}ni garovga qo’yish to’g’risida garov shartnomasi;</p>
                     <p> qarz oluvchilarning qarz beruvchi oldidagi majburiyatlarini bajarish bo’yicha solidar tartibdagi kafillik shartnomasi.</p>
                  </li>
               </ol>
            </p>
            <div className="pdf_margin_top_5">
               2.9.	Mazkur Bosh kelishuvga asosan tuzilgan mikroqarz shartnomasi kelishuvning ajralmas qismi hisoblanadi.
            </div>
            <div className="pdf_margin_top_5">
               2.10.	Mazkur Bosh kelishuv qoidalari unga asosan tuzilgan mikroqarz shartnomasiga nisbatan to’liq hajmda qo’llaniladi. Bunda bosh kelishuv hamda bosh kelishuvga asosan tuzilgan mikroqarz shartnomasi qoidalari o’rtasida ziddiyat vujudga kelgan taqdirda, bosh kelishuv qoidalari ustunroq kuchga ega bo’ladi.
            </div>
         </div>
      </>
   )
}

export function Part3({orderInfo}) {
   return (
      <>
         <p className='black_text pdf_margin_top_20 title_contract_part'>3. Kelishuv bahosi</p>
         <div className='part'>
            <p className="pdf_margin_top_5">
               3.1. Bosh kelishuvga asosan ajratiladigan mikroqarz miqdori qoldiq summa bilan birga {orderInfo?.open_contract?.sum?.toLocaleString()} so’mni tashkil qiladi.
            </p>
            <p className="pdf_margin_top_5">
               3.2. Har bir beriladigan kredit miqdori kredit shartnomasiga asosan belgilanadi.
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
               4.1. Qarz oluvchi qarz beruvchiga taqdim etgan kredit olish bilan bog’liq bo’lgan zaruriy hujjatlar xaqiqiyligini, ma’lumotlarning ishonchliligini va hujjatlarning nusxalari asliga to’g’riligini kafolatlaydi.
            </p>
            <p className="pdf_margin_top_5">
               4.2. Tasdiqlash va kafolatlar berishga qarz oluvchi to’liq hajmda amal qilishi lozim. Kelishuvda ko’zda tutilgan tasdiqlash va kafolatlar berishga amal qilinmagan yoki lozim darajada amal qilinmagan taqdirda qarz beruvchi qarz oluvchiga kredit taqdim etishdan bosh tortishga haqli
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
               5.1.1. Garov ta’minoti yuzasidan sug’urta kompaniyasini o’z ixtiyoriga asosan tanlash;
            </p>
            <p className="pdf_margin_top_5">
               5.1.2. Kreditdan foydalanish, uni so’ndirish bilan bog’liq masalalar bo’yicha qarz beruvchining vakiliga murojaat qilish;
            </p>
            <p className="pdf_margin_top_5">
               5.1.3. Kelishuv va kredit shartnomalarini imzo qo’ymasdan oldin tanishib chiqishi uchun o’zi bilan olib ketish;
            </p>
            <p className="pdf_margin_top_5">
               5.1.4. Kelishuv yoki kredit shartnomasi tuzilgandan keyin pul mablag’lari olingunga qadar bo’lgan davrda kredit olishdan bepul asosda voz kechish;
            </p>
            <p className="pdf_margin_top_5">
               5.1.5. Istalgan vaqtda kreditni muddatidan oldin so’ndirish;
            </p>
            <p className="pdf_margin_top_5">
               5.1.6. Kredit ajratish jarayoni yuzasidan qonun hujjatlarida belgilangan talab va qoidalar to’g’risida qarz beruvchidan maslahatlar olish;
            </p>
            <p className="pdf_margin_top_5">
               5.1.7. Qarz beruvchidan kelishuvda belgilangan shartlar asosida belgilangan miqdorda kredit mablag’ini o’z vaqtida ajratilishini talab qilish;
            </p>
            <p className="pdf_margin_top_5">
               5.1.8. Qarz beruvchi tomonidan kelishuvda ko’zda tutilgan kredit uzrli sabablarsiz yoki kechiktirib ajratilgani uchun to’lashni talab qilish;
            </p>
            <p className="pdf_margin_top_5">
               5.1.9. Kredit to’lovlari to’g’risida ma’lumotlar olish;
            </p>
            <p className="pdf_margin_top_5">
               5.1.10. Qonun hujjatlarida belgilangan nizoni sudgacha hal qilish usullarini, shu jumladan muzokaralar o’tkazish orqali, qo’llash.
            </p>
         </div>
         <div className='part'>
            <p className="sub_title_contract_part">5.2. Qarz oluvchining majburiyatlari quyidagilar:</p>
            <p className="pdf_margin_top_5">
               5.2.1. Kreditni olishga va undan foydalanishga bevosita aloqador bo’lgan faoliyat bilan qarz beruvchining to’siqsiz tanishishiga imkon berish;
            </p>
            <p className="pdf_margin_top_5">
               5.2.2. Qarz beruvchi tomonidan qarz oluvchining moliyaviy holatidan kelib chiqib talab qilinishi mumkin bo’lgan barcha kerakli ma’lumotlar belgilangan muddatlarda qarz beruvchiga taqdim etilishini ta’minlash, shuningdek, 5 ish kuni davomida kredit va unga hisoblangan foizlarni vaqtida va to’laligicha to’lashga ta’sir ko’rsatadigan boshqa holatlar haqida qarz beruvchini xabardor qilish;
            </p>
            <p className="pdf_margin_top_5">
               5.2.3. Kelishuv va kredit shartnomasi imzolangandan so’ng, kelishuvga asosan kredit ta’minotiga oid barcha talablarni bajarish, jumladan, kredit ta’minoti sifatida taqdim qilinayotgan mol-mulklarni (yoki mulkiy huquqlarni) shartnoma muddatiga sug’urta qilish, garov shartnomalarini qonunchilikda belgilangan tartibda rasmiylashtirish, vakolatli organlarda ro’yxatdan o’tkazish hamda ta’qiq qo’yish yoki ta’minot sifatida kafillik taqdim qilinayotgan bo’lsa, kafillik shartnomalarini qonuniy tartibda rasmiylashtirish;
            </p>
            <p className="pdf_margin_top_5">
               5.2.4. Ajratilgan kreditlar uchun 125 foizdan kam bo’lmagan qiymatdagi likvidli bo’lgan ta’minot turlarini taqdim qilish. Qarz beruvchi tomonidan monitoring, undiruv davomida yoki boshqa sabablarga ko‘ra garov ta’minoti qarz majburiyatlarini qoplashga yetarli emas deb topilgan taqdirda yetarlicha miqdorda qo’shimcha ta’minot taqdim qiladi hamda uni tegishli tartibda rasmiylashtirilishini ta’minlaydi;
            </p>
            <div className="pdf_margin_top_5">
               5.2.5 Qarz oluvchining faoliyatini amalga oshirilishi jarayonida O’zbekiston Respublikasining mehnat to’g’risidagi qonun hujjatlari talablariga amal qilish majburiyatini oladi, shu jumladan:
               <ol type="a">
                  <li>
                     Bolalar mehnatining yo’qligi;
                  </li>
                  <li>
                     Ishchilar bandligiga oid kamsitishlarning yo’qligi;
                  </li>
                  <li>
                     Majburiy mehnatning yo’qligi.
                  </li>
               </ol>
            </div>
            <p className="pdf_margin_top_5">
               5.2.6. Qarz oluvchi (garovga qo’yuvchi) ta’minotga taqdim etilgan obe’ktni (mol-mulkni, mulkiy huquqlarni, huquqlarni) kredit va uning foizlari to’liq to’langunga qadar Qarz beruvchining roziligisiz sotishga yoki boshqacha tarzda realizatsiya qilishga haqli emas
            </p>
         </div>
      </>
   )
}

export function Part6() {
   return (
      <>
         <p className='black_text pdf_margin_top_20 title_contract_part'>6. Qarz beruvchining huquq va majburiyatlari</p>
         <div className='part'>
            <p className="sub_title_contract_part">6.1. Qarz beruvchi quyidagi huquqlarga ega: </p>
            <p className="pdf_margin_top_5">
               6.1.1. Kreditlash jarayonida qarz oluvchining moliyaviy-xo’jalik holatini tekshirish va shartnoma bo’yicha majburiyatlarni bajarishni ta’minlash uchun qabul qilingan garov predmetining haqiqiy holatini tekshirish;
            </p>
            <p className="pdf_margin_top_5">
               6.1.2. Qarz oluvchi tomonidan kreditni so’ndirish jarayonida gumonli va/yoki shubhali operatsiyalar alomatlari mavjud operatsiyalar bajarilganda operatsiya haqidagi qo’shimcha ma’lumotlarni, jumladan pul mablag’lari manbalari to’g’risidagi ma’lumotlarni olish yuzasidan mijozga murojaat qilish hamda taqdim qilingan hujjatlar nusxalarining to’g’riligiga gumon yoki boshqa zarurat paydo bo’lgan taqdirda, tanishish uchun hujjatlarning asl nusxalari taqdim qilinishini talab qilish;
            </p>
            <p className="pdf_margin_top_5">
               6.1.3. Qarz oluvchi tomonidan atayin noto’g’ri bo’lgan hujjatlar taqdim etilganda yoki qonun hujjatlariga muvofiq so’raladigan hujjatlar taqdim etilmaganda, qarz oluvchi joylashgan yeri (pochta manzili) bo’yicha tekshirish imkoni mavjud bo’lmaganida hamda jinoiy faoliyatdan olingan daromadlarni legallashtirishga, terrorizmni moliyalashtirishga va ommaviy qirg’in qurolini tarqatishni moliyalashtirishga qarshi kurashish to’g’risidagi qonun hujjatlarida belgilangan hollarda kredit ajratishni to’xtatib qo’yish;
            </p>
            <p className="pdf_margin_top_5">
               6.1.4. Kelishuv va kredit shartnomasida ko’rsatilgan holatlarga oydinlik kiritish uchun qarz oluvchidan har qanday ma’lumotni so’rash, tasdiqlovchi hujjatlarni taqdim etishini talab qilish, shuningdek, boshqa harakatlarni amalga oshirish;
            </p>
            <p className="pdf_margin_top_5">
               6.1.5. Kredit ta’minotiga oid barcha talablar bajarilgach, kredit shartnomasiga asosan mablag’ ajratish;
            </p>
            <div className="pdf_margin_top_5">
               6.1.6. Tegishli to’lov muddatlari buzilganda, mikroqarzning asosiy qismi, foiz to’lovi va boshqa to’lovlarni (bank plastik kartalaridan, so’zsiz (aktseptsiz) tartibda to’liq) undirib olishga amaldagi qonunchilikga va jamiyatning hisob siyosatiga asosan haqli;
            </div>
            <div className="pdf_margin_top_5">
               6.1.7. Agar quyidagi holatlardan biri yuz bergan taqdirda, liniya doirasida kredit taqdim qilish to’xtatiladi:
               <ol type="a">
                  <li>
                     Qarz oluvchi mazkur kelishuv hamda kredit shartnomalari bo’yicha majburiyatlarini to’liq, o’z vaqtida bajarmagan yoki lozim darajada bajarmaganda;
                  </li>
                  <li>
                     Muddati o’tkazib yuborilgan kreditorlik qarzlarining mavjud bo’lganda;
                  </li>
                  <li>
                     Ta’minotining bozor bahosi majburiyatlarni kamida 125 foiz qoplashi uchun yetarli bo’lmaganda
                  </li>
                  <li>
                     Ta’minot holatining yomonlashishi, uning o’g’rilanishi, talon-toroj qilinishi, likvidliligining pasayishi, bozor kon’yukturasi narxlarining kamida 25 foizga pasayib ketishi yoki boshqacha holatlar natijasida kredit ta’minlanmay qolish xavfining vujudga kelishi, basharti ta’minotni o’zgartirish yoki qo’shimcha ta’minot taqdim etish bo’yicha kredit shartnoma talabining bajarilmasligi;
                  </li>
                  <li>
                     Monitoringdan bo’yin tovlashlik yoki MMT xodimlari (jalb qilingan mutaxassislar)ning monitoring o’tkazishiga har qanday usullar bilan to’sqinlik qilishi;
                  </li>
                  <li>
                     Qarz beruvchiga kelishuv va kredit shartnomada nazarda tutilgan hujjatlarni taqdim etmasligi yoki haqqoniy bo’lmagan hujjatlar va ma’lumotlarning taqdim etilishi;
                  </li>
                  <li>
                     Kredit va unga hisoblangan foizlarni shartnomada belgilangan muddatdan 30 kun va undan ortiq muddatga kechiktirilishi;
                  </li>
                  <li>
                     Kredit va unga hisoblangan foizlarni muntazam ravishda kechiktirib to’lanishi, ya’ni mazkur shartnomaning ajralmas qismi hisoblangan qarzni qaytarish jadvalida qayd etilgan to’lov muddatini kechiktirish kredit tasnifini standartdan boshqasiga o’zgarishiga sabab bo’lishi;
                  </li>
                  <li>
                     Qarz oluvchi tomonidan mazkur kelishuvning 5.2.6.- bandida ko’rsatilgan majburiyatning bajarilmasligi;
                  </li>
                  <li>
                     O’zbekiston Respublikasi Markaziy banki yoki sud tomonidan MMT litsenziyasi chaqirib olinganda, ayrim bank operatsiyalari to’xtatilganda, litsenziya amal qilishi vaqtincha to’xtatilishi oqibatida vaziyatning jiddiy o’zgarishi natijasida;
                  </li>
               </ol>
            </div>
            <p className="pdf_margin_top_5">
               6.1.8. Qarz oluvchi tomonidan ushbu shartnomaning 10.4-bandida ko’rsatilgan shartnomani jiddiy buzish holatlari sodir qilinganligi aniqlagan taqdirda, qarz beruvchi shartnomani muddatidan oldin bir tomonlama yoki sud tartibida bekor qilib, kredit qarzdorliklarini qoplash uchun undiruvni kredit ta’minotiga qaratishga xaqli;
            </p>
            <p className="pdf_margin_top_5">
               6.1.9. Qarz oluvchi shartnomada belgilangan muddatda qarz summasini muddatida qaytarishga qodir emasligidan aniq-ravshan dalolat beruvchi holatlar aniqlanganda, kreditni taqdim etish majburiyatini bajarmaslik;
            </p>
            <p className="pdf_margin_top_5">
               6.1.10. Qarz oluvchi kredit shartnomasi bo’yicha qarzning asosiy summasini qaytarish va (yoki) foizlarni to’lash muddatlarini buzganda, kredit shartnomasida nazarda tutilgan usulda nizoni sudgacha hal qilish yuzasidan o’z talabnomasini iste’molchiga yetkazish;
            </p>
         </div>
         <div className='part'>
            <p className="sub_title_contract_part">6.2. Qarz beruvchining majburiyatlari:</p>
            <p className="pdf_margin_top_5">
               6.2.1.   Qarz oluvchi tomonidan shartnomaga asosan qarz bo’yicha qarzdorlik summasini to’lash majburiyati to’liq bajarilgan sanadan boshlab uch ish kunidan kechiktirmagan holda mazkur qarz bo’yicha garovda turgan mulkni ta’qiqdan chiqarish va garov sifatida bo’lgan mol-mulkka nisbatan qarz beruvchining huquqlari to’g’risidagi yozuvni garov reyestridan chiqarish;
            </p>
            <p className="pdf_margin_top_5">
               6.2.2.	Qarz oluvchiga kredit shartnomasida nazarda tutilgan kreditni berishdan butunlay yoki qisman bosh tortgan taqdirda, ushbu kredit bo’yicha mablag’lar berishni to’xtatib qo’yish to’g’risida qaror qabul qilingan sanadan boshlab keyingi ish kunidan kechiktirmasdan qarz oluvchiga kredit berish to’xtatilganligi va uning sabablari yuzasidan yozma xabarnoma yuborish;
            </p>
            <p className="pdf_margin_top_5">
               6.2.3.	Kredit shartnomasi bo’yicha muddati o’tkazib yuborilgan qarzdorlik yuzaga kelganda, qarz oluvchi zimmasidagi qarz yuki yanada oshib ketishining oldini olish maqsadida muddati o’tkazib yuborilgan qarzdorlik yuzaga kelgan sanadan boshlab 10 (o’n) kalendar kuni davomida qarz oluvchi bilan shartnomada kelishilgan har qanday aloqa bog’lash usullaridan, shu jumladan pochta aloqa vositalaridan yoki qonun hujjatlarida nazarda tutilgan boshqa usullardan foydalanib, qarz oluvchiga muddati o’tkazib yuborilgan qarzdorlik yuzaga kelganligi haqida (taqdim etilgan so’ndirish jadvalidan kelib chiqqan holda) xabar berish.
            </p>
         </div>
      </>
   )
}

export function Part7() {
   return (
      <>
         <p className='black_text pdf_margin_top_20 title_contract_part'>7. Tomonlarning majburiyatlarining bajarilishini taminlash.</p>
         <div className='part'>
            <p className="pdf_margin_top_5">
               7.1.	Mazkur kelishuv doirasida tuziladigan kredit shartnomalarida ko’rsatilgan tomonlarning majburiyatlarini bajarilishini ta’minlashi lozim.
            </p>
            <p className="pdf_margin_top_5">
               7.2.	Kelishuv doirasida kelib chiqadigan majburiyatlarni bajarilishini ta’minlash uchun qarz oluvchi mazkur kelishuvning 2.12-bandida qayd etilgan ta’minotlarni taqdim etadi yoki taqdim etilishi yuzasidan kelishuvlar tuzilishini ta’minlaydi.
            </p>
            <p className="pdf_margin_top_5">
               7.3.	Penya qarz oluvchi tomonidan muddati o’tkazib yuborilgan summadan, to’lov amalga oshirilishi kerak bo’lgan kundan qarz oluvchi tomonidan muddati o’tgan majburiyat bajarilgunga qadar hisoblanadi.
            </p>
         </div>
      </>
   )
}

export function Part8() {
   return (
      <>
         <p className='black_text pdf_margin_top_20 title_contract_part'>8. Kelishuv bo’yicha huquqlardan voz kechish.</p>
         <div className='part'>
            <p className="pdf_margin_top_5">
               8.1.	Qarz beruvchi qarz oluvchining roziligi bilan kelishuv bo’yicha talab qilish huquqidan to’laligicha yoki qisman uchinchi shaxslar foydasiga voz kechishi mumkin.
            </p>
            <p className="pdf_margin_top_5">
               8.2.	Qarz oluvchi qarz beruvchi bilan kelishmagan holda o’z huquqlaridan voz kechish va kelishuv bo’yicha majburiyatlarini qanday shaklda bo’lmasin uchinchi shaxslarga topshirishga, o’tkazishga haqli emas.
            </p>
            <p className="pdf_margin_top_5">
               Boshqa shartlar
            </p>
            <p className="pdf_margin_top_5">
               8.3.	Qarz oluvchi kredit majburiyatlarini bajarishni ta’minlash uchun qilingan barcha xarajatlarni to’lashni o’z zimmasiga oladi.
            </p>
            <p className="pdf_margin_top_5">
               8.4. Majburiyatlarini buzgan taraf kelishuvda ko’zda tutilgan javobgarlikka qo’shimcha ravishda boshqa tarafga yetkazilgan zararni qoplash majburiyatini o’z zimmasiga oladi.
            </p>
            <p className="pdf_margin_top_5">
               8.5. Qarz oluvchi kelishuv bo’yicha pul majburiyatlari lozim darajada bajarilishiga barcha mol-mulki, aktivlari va qarz oluvchi tomonidan shartnoma bo’yicha majburiyatlari to’liq yoki qisman bajarilmaganida haqiqiy qarzdorlik summasini undirishga qaratilishi mumkin bo’lgan, shuningdek, shartnoma bajarilishi bilan bog’liq barcha xarajatlar, shu jumladan sud va boshqa xarajatlar uchun javobgar bo’lishini tasdiqlaydi va kafolat beradi.
            </p>
            <p className="pdf_margin_top_5">
               8.6. Taraflar tomonidan bir-biriga jo’natiladigan har qanday xabarnoma, talabnoma yoki boshqa xatlar yozma shaklda amalga oshirilishi shart. Pochta xabari/xati pochtadan ko’rsatilgan manzilda oluvchi shaxs yo’qligi tufayli belgisi bilan qaytarilgan hollarda ham jo’natilgan, deb hisoblanadi.
            </p>
            <p className="pdf_margin_top_5">
               8.7. Kelishuvni bajarilishida taraflar mazkur kelishuv shartlariga hamda O’zbekiston Respublikasining qonun hujjatlariga amal qilishadi.
            </p>
         </div>
      </>
   )
}

export function Part9() {
   return (
      <>
         <p className='black_text pdf_margin_top_20 title_contract_part'>9. Kelishuvning kuchga kirishi, o’zgartirish va bekor qilish tartibi</p>
         <div className='part'>
            <p className="pdf_margin_top_5">
               9.1.	Mazkur kelishuv bir xil yuridik kuchga ega bo’lgan 3/4 nusxada tuzilib, kelishuv nusxalari shartlashuvchi tomonlarda bir nusxadan saqlanadi.
            </p>
            <p className="pdf_margin_top_5">
               9.2.	Kelishuv taraflar tomonidan imzolangan paytdan boshlab kuchga kiradi va taraflar tomonidan majburiyatlar to’liq bajarilgunga qadar amal qiladi.
            </p>
            <p className="pdf_margin_top_5">
               9.3.	Kelishuvga tegishli o’zgartirish va qo’shimchalar kiritish haqidagi kelishuv yozma shaklda tuziladi va taraflar tomonidan imzolangan paytdan boshlab kuchga kiradi.
            </p>
            <p className="pdf_margin_top_5">
               9.4.	Qarz oluvchi mazkur kelishuvning 6.1.7.a-j-bandlarida ko’rsatilgan holatlardan hech bo’lmasa bittasiga yo’l qo’yilgan taqdirda shartnomani jiddiy buzish deb hisoblanadi va bunda qarz beruvchi kelishuv yoki kredit shartnomani bir taraflama yoki sud tartibida muddatidan oldin bekor qilishi hamda kredit va unga hisoblangan foizlarni muddatidan oldin qaytarib olishi mumkin.
            </p>
         </div>
      </>
   )
}

export function Part10() {
   return (
      <>
         <p className='black_text pdf_margin_top_20 title_contract_part'>10. Maxfiylik</p>
         <div className='part'>
            <p className="pdf_margin_top_5">
               10.1.	Kelishuvni tuzish va bajarish vaqtida taraflar bir-biridan olgan barcha ma’lumotlar maxfiy axborotlar deb tan olinadi.
            </p>
            <p className="pdf_margin_top_5">
               10.2.	Kelishuvni tuzish va undan kelib chiqadigan majburiyatlarni bajarish chog’ida boshqa tarafning tijorat siri hisoblangan maxfiy axborotlar va ma’lumotlarni ikkinchi taraf axborot egasining yozma roziligisiz oshkor qilmaslik majburiyatini oladi. Mazkur talab kelishuvning amal qilish muddatiga hamda uning muddati tugagan vaqtdan boshlab 3 yil davomida amal qiladi.
            </p>
            <p className="pdf_margin_top_5">
               10.3.	Ushbu talablarni buzgan taraf buning oqibatida ikkinchi tarafga yetkazilgan barcha zararni to’liq hajmda qoplaydi.
            </p>
            <p className="pdf_margin_top_5">
               10.4.	Qarz oluvchi o’zi to’g’risidagi har qanday ma’lumotlarni qarz beruvchi o’z huquqlari, manfaatlari yoki ularni himoya qilish maqsadida uchinchi shaxslarga oshkor etish (topshirish) uchun so’zsiz roziligini bildirgan hisoblanadi.
            </p>
            <p className="pdf_margin_top_5">
               10.5. Qarz oluvchi qarz beruvchiga kelishuvda ko’rsatilgan yoki kelishuv tuzilishi va bajarilishida taqdim etilgan o’zining barcha ma’lumotlari bilan ishlashga va topshirishga mazkur kelishuvga asosan roziligini tasdiqlaydi. Shu jumladan, kelishuv bo’yicha huquqiy vorislik tartibida qarz beruvchining huquq va majburiyatlari boshqa shaxsga o’tganda, ularni uchinchi shaxsga topshirishga ham rozilik beradi. Bunday ma’lumotlarni uchinchi shaxslarga taqdim etish qarz oluvchining qonun bilan muhofaza qilinadigan MMT va boshqa sirlarining buzilishi bo’lib hisoblanmasligiga mazkur kelishuvga binoan roziligini bildirgan hisoblanadi.
            </p>
         </div>
      </>
   )
}

export function Part11() {
   return (
      <>
         <p className='black_text pdf_margin_top_20 title_contract_part'>11. Fors-major</p>
         <div className='part'>
            <p className="pdf_margin_top_5">
               11.1.	Yengib bo’lmaydigan kuchlar (fors-major) holatlari - bu taraflarning irodasi, xohishiga bog’liq bo’lmagan tabiat hodisalari (zilzila, ko’chki, bo’ron va hokazo), ijtimoiy iqtisodiy holatlar (urush holati, qamal, davlat manfaatlarini ko’zlab import va eksportni taqiqlash va boshqalar), xalqaro, banklararo va mikromoliya tashkiloti elektron to’lov hamda ta’minot tizimidagi nosozlik, mikromoliya tashkilotining dasturiy ta’minot tizimiga qilingan tahdid (xujumlar) sababli yuzaga kelgan sharoitlarda taraflarga majburiyatlarni bajarish imkonini bermaydigan favqulodda, oldini olib bo’lmaydigan va kutilmagan holatlardir.
            </p>
            <p className="pdf_margin_top_5">
               11.2.	Fors-major holatlari yuzaga kelgan vaqtda taraflar ushbu holatlar bartaraf etilguniga qadar shartnomaviy majburiyatlarini bajarishdan ozod bo’ladi.
            </p>
            <p className="pdf_margin_top_5">
               11.3.	Fors-major holatlari boshlanganligi yoki yakunlanganligi haqida bir taraf ikkinchi tarafni 3 ish kuni ichida bu haqda yozma ravishda xabardor qilishi shart. Xabarnomalar barcha aloqa vositalari orqali yuborilishi mumkin.
            </p>
         </div>
      </>
   )
}


export function Part12() {
   return (
      <>
         <p className='black_text pdf_margin_top_20 title_contract_part'>12. Nizolarni hal qilish tartibi</p>
         <div className='part'>
            <p className="pdf_margin_top_5">
               12.1.	Taraflar mazkur kelishuvni bajarish vaqtida yuzaga kelgan kelishmovchilik yoki nizolarni muzokara yo’li bilan hal etadilar.
            </p>
            <p className="pdf_margin_top_5">
               12.2.	O’zaro kelishuv imkoniyati bo’lmaganda, huquqi buzilgan taraf tomonidan yuborilgan talabnoma yoki ogohlantirish xatiga ikkinchi taraf mazkur talabnoma yoki ogohlantirish xatida ko’rsatilgan muddat ichida javob berishi lozim.
            </p>
            <p className="pdf_margin_top_5">
               12.3.	Talabnoma yoki ogohlantirish xatini tarafga shaxsan topshirish pochta aloqa xizmati orqali xat bilan yuborish yo’li bilan amalga oshiriladi.
            </p>
            <p className="pdf_margin_top_5">
               12.4. Kelishuv yo’li bilan hal etilmagan nizolar O’zbekiston Respublikasi qonunchiligida belgilangan tartibda qarz beruvchining kredit shartnomasida ko’rsatilgan xududdagi sudda hal etiladi.
            </p>
         </div>
      </>
   )
}

export function Part13({ children }) {
   return (
      <>
         <p className='black_text pdf_margin_top_20 title_contract_part'>
            13. Taraflarning qayd etish ma’lumotlari va imzolari
         </p>
         {children}
      </>
   )
}