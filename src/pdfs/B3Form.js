import { useLocation } from 'react-router-dom'
import { checkOwner } from '../utils/functions/supplyTypes'
import { PdfControls } from '../components/Pdf/PdfControls'
import { PdfWrapper } from '../components/Pdf/Wrapper'
import useDataFetching from '../hooks/usePdfDataFetching'
import fullName from '../utils/functions/fullName'
import Logo from '../assets/images/Logo'
import Blank from './Blank'

const user_name = window.localStorage.getItem('name')

function B3Form() {
  const location = useLocation()
  const orderId = location?.state?.id
  const { data: documentInfo } = useDataFetching(`/b3/${orderId}`)

  function CollectClients(group) {
    let clients = []
    group?.map(item => {
      clients?.push(item?.name)
    })
    return clients?.join(', ')
  }

  return (
    <>
      <PdfControls />
      <PdfWrapper indicator={documentInfo}>
        {
          documentInfo?.branch?.name ?
            <>
              <div className="pdf_header_blank">
                <Blank
                  user_name={fullName(user_name)}
                  order_date={documentInfo?.order?.order_date || documentInfo?.order_date || ""}
                  boss={fullName(documentInfo?.branch?.head_of_branch) || ""}
                />
                <div className='header_logo'>
                  <Logo width={200} />
                  <div className='b1_subtitle'>
                    <div className='endColumn'>
                      <span>{documentInfo?.branch?.name} Boshqaruvchisi </span>
                      <span>{fullName(documentInfo?.branch?.head_of_branch)} ga</span>
                    </div>
                  </div>
                </div>
              </div>
              <h1 className='text_black_18 text_center pdf_margin_top_30'>Rozilik xati</h1>
              <div className='pdf_margin_top_30'>
                <p className='distance'>
                  Men, {checkOwner(documentInfo) ? checkOwner(documentInfo) : documentInfo?.client}, {documentInfo?.group?.name ? `${documentInfo?.group?.name} qarzdorlar guruhi a'zolari ${CollectClients(documentInfo?.group?.clients)}` : documentInfo?.client}  tomonidan buyurtma berilgan mikroqarzga garov ta'minoti sifatida taklif etilayotgan {documentInfo?.possessor == 'trust_owner' ? documentInfo?.owner : "o'zim"}ga tegishli bo‘lgan {documentInfo?.auto?.[0]?.registration_cert}-sonli transport vositasini qayd etish guvohnomasiga asosan transport vositasini {documentInfo?.possessor == 'trust_owner' ? `${documentInfo?.trust_owner_proxy_number}-sonli Ishonchnomada berilgan vakolatlarga ko‘ra` : ""} ta'minot sifatida garovga qo‘yishga rozilik beraman.
                </p>
                <p className='pdf_margin_top_30 distance'>
                  Shuningdek, buyurtma berilgan mikroqarzga garov ta'minoti sifatida taklif etilayotgan garov ob'ekti to‘g‘risidagi ma'lumotlarni O‘zbekiston Respublikasining ''Garov reestri to‘g‘risida'' gi  Qonuniga muvofiq men bilan garov shartnomasini tuzilgan vaqtdan e'tiboran garov reestridan ro‘yxatdan o‘tkazish va zaruriy xollarda garov ob'ekti bilan bog‘liq boshqa ma'lumotlar kiritilishiga avvaldan rozilik berishimni ma'lum qilaman.
                </p>
                <p className='pdf_margin_top_30 pdf_margin_bottom_50 distance'>
                  Ushbu rozilik xatiga shaxsimni tasdiqlovchi hujjatim{documentInfo?.possessor == 'trust_owner' ? ", garovga qo‘yish vakolati berilgan Ishonchnoma" : ""} va transport vositasini qayd etish guvohnomasining nusxalarini ilova tarzida taqdim qilaman.
                </p>
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
            </> : <>
              <h1 className='text_center'>{documentInfo?.message}</h1>
            </>
        }
      </PdfWrapper>
    </>
  )
}

export default B3Form