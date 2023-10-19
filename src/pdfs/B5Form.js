import { useLocation } from 'react-router-dom'
import { PdfControls } from '../components/Pdf/PdfControls'
import { typeFunc } from '../utils/functions/supplyTypes'
import { PdfWrapper } from '../components/Pdf/Wrapper'
import { Address, DocInfo } from './Parts/personal'
import useDataFetching from '../hooks/usePdfDataFetching'
import dateConvert from '../utils/functions/dateConvert'
import fullName from '../utils/functions/fullName'
import Logo from '../assets/images/Logo'
import Adding_VVB from './AddingVVB'

const part1 = (documentInfo) => (
   <p className='distance pdf_margin_top_20'>Men, {documentInfo?.client?.name}, Sizdan {documentInfo?.order?.sum?.toLocaleString()} so‘m miqdorda ochiq liniyali mikroqarz ajratish
      bo‘yicha {documentInfo?.order?.time} oy muddat ichida mikroqarzlar ajratishingizni so‘rayman.
      Faoliyat turim: {documentInfo?.client?.job}, O‘rtacha oylik daromadim {documentInfo?.order?.salary?.toLocaleString()} so‘mni tashkil etadi.</p>
)

const logoPart = (documentInfo) => (
   <div className='header_logo'>
      <Logo width={200} />
      <div className='b1_subtitle'>
         <div className='endColumn'>
            <span>{documentInfo?.branch?.name} Boshqaruvchisi {Adding_VVB(documentInfo?.branch?.id) ? 'v.v.b' : ''}</span>
            <span>{fullName(documentInfo?.branch?.head)} ga</span>
         </div>
      </div>
   </div>
)

const wordsPart = () => (
   <>
      <p className='pdf_margin_top_20 distance'>
         "Renesans Mikromoliya tashkiloti" MChJ mening buyurtmamni o‘rganish jarayonida va/yoki buyurtma asosida men bilan bitim tuzilganda, bitim doirasidagi mikroqarz shartnomalari bo‘yicha barcha majburiyatlarim to‘liq so‘ndirilgunga qadar men haqimda mening daromadlarim, majburiyatlarim, mavjud kredit va qarzlarim, kredit tarixim va/yoki boshqa har qanday ma'lumotlarni kredit byurolaridan, bank-moliya institutlaridan, soliq va ichki ishlar organlaridan, maxalla fuqarolar yig‘inlaridan va/yoki har qanday boshqa manbalardan og‘zaki yoki yozma ravishda so‘rab olinishiga roziligimni bildiraman.
      </p>
      <p className='distance'>
         Shu bilan birga, menga ajratiladigan bitim doirasidagi mikroqarzlarning asosiy qarzi yoki unga hisoblangan foizlarni, shuningdek, shartnoma shartlarining men tomonimdan bajarilmasligi yoki lozim darajada bajarilmasligi natijasida yuzaga kelishi mumkin bo‘lgan zararlar, hisoblanadigan penya va jarimalarni mening nomimga ochilgan barcha bank plastik kartalari, omonat va boshqa hisobvaraqlarimdan so‘zsiz (aktseptsiz) tartibda to‘liq undirib olinishiga rozilik beraman.
      </p>
   </>
)

const endPart = (documentInfo) => (
   <>
      <div className='margin_top_20'>
         <div className='between margin_top_10 align_end name_handmark'>
            <p className='text_black_18'>
               {documentInfo?.client?.name}
            </p>
            <div></div>
         </div>
      </div>
      <div className='b1_end'>
         <p className='margin_top_10'>{dateConvert(documentInfo?.order?.order_date)}</p>
      </div>
   </>
)

function B5Form() {
   const location = useLocation()
   const orderId = location?.state?.id
   const { data: documentInfo } = useDataFetching(`/b1/${orderId}`)

   return (
      <>
         <PdfControls />
         <PdfWrapper indicator={documentInfo}>
            {logoPart(documentInfo)}
            <h1 className='text_black_18 text_center pdf_margin_top_30'>
               BUYURTMA -- <span className='black_text'>{documentInfo?.order?.order_number}</span>
            </h1>
            {part1(documentInfo)}
            <p className='pdf_margin_top_20 distance'>
               <Address info={documentInfo?.client} /> <DocInfo info={documentInfo?.client} />
            </p>
            <p className='pdf_margin_top_20'>
               Mikroqarz qaytarilishini {typeFunc(documentInfo?.supply_types?.[0]?.type)}  bilan ta'minlayman.
            </p>
            {wordsPart()}
            {endPart(documentInfo)}
         </PdfWrapper>
      </>
   )
}

export default B5Form