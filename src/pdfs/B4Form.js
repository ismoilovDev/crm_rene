import { useLocation } from 'react-router-dom'
import { PdfControls } from '../components/Pdf/PdfControls'
import { PdfWrapper } from '../components/Pdf/Wrapper'
import useDataFetching from '../hooks/usePdfDataFetching'
import fullName from '../utils/functions/fullName'
import Logo from '../assets/images/Logo'
import Adding_VVB from './AddingVVB'
import Blank from './Blank'
import './pdf.css'

const user_name = window.localStorage.getItem('name')

function B4Form() {
  const location = useLocation()
  const orderId = location?.state?.id
  const { data: documentInfo } = useDataFetching(`/b4/${orderId}`)

  return (
    <>
      <PdfControls />
      <PdfWrapper indicator={documentInfo}>
        <div className="pdf_header_blank">
          <Blank
            user_name={fullName(user_name)}
            order_date={documentInfo?.order?.order_date || ""}
            boss={fullName(documentInfo?.branch?.head_of_branch) || ""}
            vvb={Adding_VVB(documentInfo?.branch?.id) ? 'v.v.b' : ''}
          />
          <div className='header_logo'>
            <Logo width={200} />
            <div className='b1_subtitle'>
              <div className='endColumn'>
                <span>{documentInfo?.branch?.name} Boshqaruvchisi {Adding_VVB(documentInfo?.branch?.id) ? 'v.v.b' : ''}</span>
                <span>{fullName(documentInfo?.branch?.head_of_branch)} ga</span>
              </div>
            </div>
          </div>
        </div>
        <h1 className='text_black_18 text_center pdf_margin_top_30'>Ariza</h1>
        <div className='pdf_margin_top_30'>
          <p className='distance'>
            Men, {documentInfo?.supply_infos?.[0]?.owner?.fio}, {documentInfo?.client?.name} tomonidan buyurtma berilgan {documentInfo?.order?.sum?.toLocaleString(undefined, { minimumFractionDigits: 2 })} so‘m mikroqarzga, unga hisoblanadigan foizlar va shartnoma shartlarining qarz oluvchi tomonidan bajarilmasligi yoki lozim darajada bajarilmasligi natijasida yuzaga kelishi mumkin bo'lgan zararlar, hisoblanadigan penya va jarimalarni muddatida to'lanmagan taqdirda qarzdorlik mening nomimga ochilgan barcha bank plastik kartalari, omonat va boshqa hisob va hisobvaraqlaridan so'zsiz (akseptsiz) to'liq tartibda undirib olinishiga rozilik berishimni bildiraman.
          </p>
          <p className='pdf_margin_top_30 distance'>
            Shaxsimni tasdiqlovchi hujjat ma'lumotlari: {documentInfo?.supply_infos?.[0]?.owner?.serial_num} raqamli {documentInfo?.supply_infos?.[0]?.owner?.doc_type}  {documentInfo?.supply_infos?.[0]?.owner?.issued_date} y. da {documentInfo?.supply_infos?.[0]?.owner?.issued_by} tomonidan berilgan.
            Yashash manzilim: {documentInfo?.supply_infos?.[0]?.owner?.city} {documentInfo?.supply_infos?.[0]?.owner?.district} {documentInfo?.supply_infos?.[0]?.owner?.address}.
          </p>
          <p className='pdf_margin_top_10 distance'>
            Shaxsiy identifikatsiya raqamim (JShShIR): {documentInfo?.supply_infos?.[0]?.owner?.pinfl}</p>
        </div>
        <div className='pdf_margin_top_20 distance'>
          <p>"Ushbu arizamga quyidagi hujjatlarni ilova qilaman:</p>
          <p>1. Shaxsimni tasdiqlovchi hujjat nusxasi;</p>
          <p>2. Daromadlarim to‘g‘risida ma'lumotnoma;</p>
        </div>
        <div className='b1_lines'>
          <p>____________________________________________________________________<pre>    </pre></p>
          <p className='section_space_pdf'>__________________</p>
        </div>
        <div className='b1_end'>
          <div>
            "<u><pre>        </pre></u>"
            <u><pre>                           </pre></u>
            20
            <u><pre>      </pre></u>
            <pre> </pre>y.
          </div>
        </div>
      </PdfWrapper >
    </>
  )
}

export default B4Form