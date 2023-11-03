import { useLocation } from 'react-router-dom'
import { typesSupply, typesSupplyGroup } from '../utils/functions/supplyTypes'
import { PdfControls } from '../components/Pdf/PdfControls'
import { PdfWrapper } from '../components/Pdf/Wrapper'
import { Address, DocInfo } from './Parts/personal'
import dateConvert from '../utils/functions/dateConvert'
import useDataFetching from './../hooks/usePdfDataFetching'
import fullName from '../utils/functions/fullName'
import Logo from '../assets/images/Logo'
import Adding_VVB from './AddingVVB'
import Blank from './Blank'

const user_name = window.localStorage.getItem('name')

function B1Form() {
  const location = useLocation()
  const orderId = location?.state?.id
  const { data: documentInfo } = useDataFetching(`/b1/${orderId}`)

  function reneIshonchFun(doc) {
    const group = doc?.group;
    const clientOrder = group?.clients?.[0]?.order;
    const product = clientOrder?.product;
    const supplyInfo = clientOrder?.supply_info?.[0];
    const supplyType = doc?.supply_types?.[0]?.type;
  
    return (group && product?.name === 'ReneIshonch') || (supplyInfo?.type === 'without_supply') || (product?.name === 'ReneIshonch') || (supplyType === 'without_supply');
  }
  
  if (documentInfo?.client?.name) {
    return (
      <>
        <PdfControls />
        <PdfWrapper indicator={documentInfo}>
          <div className="pdf_header_blank">
            <Blank
              user_name={fullName(user_name)}
              order_date={dateConvert(documentInfo?.order?.order_date) || ""}
              boss={fullName(documentInfo?.branch?.head) || ""}
              vvb={Adding_VVB(documentInfo?.branch?.id) ? 'v.v.b' : ''}
            />
            <div className='header_logo'>
              <Logo width={200} />
              <div className='b1_subtitle margin_left_20'>
                <div className='endColumn'>
                  <span>{documentInfo?.branch?.name} Boshqaruvchisi {Adding_VVB(documentInfo?.branch?.id) ? 'v.v.b' : ''}</span>
                  <span>{fullName(documentInfo?.branch?.head)} ga</span>
                </div>
              </div>
            </div>
          </div>
          <h1 className='text_black_18 text_center pdf_margin_top_30'>BUYURTMA -- <span className='black_text'>{documentInfo?.order?.order_number}</span></h1>
          <div className='pdf_margin_top_30'>
            <p className='distance'>Men, {documentInfo?.client?.name} , Sizdan  {documentInfo?.order?.sum?.toLocaleString()} so‘m miqdorida {documentInfo?.product?.name} shartlari asosida {documentInfo?.order?.aim} uchun {documentInfo?.order?.time} oy muddatga {documentInfo?.order?.type_credit == 'card' ? 'plastik kartada' : 'naqd pulda'} mikroqarz ajratishingizni so‘rayman. Faoliyat turim: {documentInfo?.client?.job}, O‘rtacha oylik daromadim {documentInfo?.order?.salary?.toLocaleString()} so‘mni tashkil etadi.</p>
            <p className='pdf_margin_top_20 distance'><Address info={documentInfo?.client} /> <DocInfo info={documentInfo?.client} /></p>
            <p className='pdf_margin_top_20'>{reneIshonchFun(documentInfo) ? "Menga mikroqarzni ta'minotsiz, ishonch asosida ajratishingizni so‘rayman" : `Mikroqarz qaytarilishini ${typesSupply(documentInfo?.supply_types, false)}  bilan ta'minlayman.`}</p>
            <p className='pdf_margin_top_20 distance'>"Renesans Mikromoliya tashkiloti" MChJ mening buyurtmamni o‘rganish jarayonida va/yoki buyurtma asosida menga mikroqarz ajratilsa, mikroqarz shartnomasi bo‘yicha barcha majburiyatlarim to‘liq so‘ndirilgunga qadar men haqimda mening daromadlarim, majburiyatlarim, mavjud kredit va qarzlarim, kredit tarixim va/yoki boshqa har qanday ma'lumotlarni kredit byurolaridan, bank-moliya institutlaridan, soliq va ichki ishlar organlaridan, maxalla fuqarolar yig‘inlaridan va/yoki har qanday boshqa manbalardan og‘zaki yoki yozma ravishda so‘rab olinishiga roziligimni bildiraman.
              <p className='distance'>
                Shu bilan birga, menga ajratiladigan mikroqarzning asosiy qarzi yoki unga hisoblangan foizlarni, shuningdek, shartnoma shartlarining men tomonimdan bajarilmasligi yoki lozim darajada bajarilmasligi natijasida yuzaga kelishi mumkin bo‘lgan zararlar, hisoblanadigan penya va jarimalarni  mening nomimga ochilgan barcha bank plastik kartalari, omonat va boshqa hisobvaraqlarimdan so‘zsiz (aktseptsiz) tartibda to‘liq undirib olinishiga rozilik beraman.
              </p>
            </p>
            {
              typesSupply(documentInfo?.supply_types)?.includes('transport vositasi garovi') || typesSupply(documentInfo?.supply_types)?.includes('transport vositasi va kafillik') ? <>
                <p className='pdf_margin_top_20 distance'>Shuningdek, buyurtma berilgan mikroqarzga garov ta'minoti sifatida taklif etilayotgan garov ob'ekti to‘g‘risidagi ma'lumotlarni O‘zbekiston Respublikasining ''Garov reestri to‘g‘risida'' gi  Qonuniga muvofiq men bilan garov shartnomasi tuzilgan vaqtdan e'tiboran garov reestridan ro‘yxatdan o‘tkazish va zaruriy xollarda garov ob'ekti bilan bog‘liq boshqa ma'lumotlar kiritilishiga avvaldan rozilik bildiraman.</p>
              </> : <></>
            }
            <div className='b1_endData pdf_margin_top_20'>
              <span>Shaxsiy identifikatsiya raqamim (JShShIR) : {documentInfo?.client?.pinfl}</span>
              {
                documentInfo?.order?.type_credit == 'card' ? <>
                  <span>SSKS : {documentInfo?.order?.ssks}</span>
                  <span>Bank : {documentInfo?.order?.bank_name}</span>
                  <span>MFO : {documentInfo?.order?.bank_code}</span>
                </> : <></>
              }
            </div>
          </div>
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
        </PdfWrapper>
      </>
    )
  } else {
    return (
      <>
        <PdfControls />
        <PdfWrapper indicator={documentInfo}>
          <div className="pdf_header_blank">
            <Blank
              user_name={fullName(user_name)}
              order_date={dateConvert(documentInfo?.order?.order_date) || dateConvert(documentInfo?.group?.clients[0]?.order?.order_date) || ""}
              boss={fullName(documentInfo?.branch?.head) || fullName(documentInfo?.group?.branch?.head) || ""}
              vvb={Adding_VVB(documentInfo?.group?.branch?.id) ? 'v.v.b' : ''}
            />
            <div className='header_logo'>
              <div className='b1_img'>
                <Logo width={200} />
              </div>
              <div className='b1_subtitle'>
                <div className='startColumn'>
                  <span>{documentInfo?.group?.branch?.name} {Adding_VVB(documentInfo?.group?.branch?.id) ? 'v.v.b' : ''}</span>
                  <span>{fullName(documentInfo?.group?.branch?.head)} ga</span>
                </div>
              </div>
            </div>
          </div>
          <h1 className='text_black_18 text_center pdf_margin_top_30'>BUYURTMA -- <span className='black_text'>{documentInfo?.group?.clients?.[0]?.order?.order_number}</span></h1>
          <p className='text_center margin_top_5'><u>(qarzdorlar guruhi uchun)</u></p>
          <p className='text_black_18 margin_top_30'>Biz, quyida imzo chekuvchi {`"${documentInfo?.group?.name}"`} qarzdorlar guruhi a'zolari:</p>
          {
            documentInfo?.group?.clients?.map(item => {
              if (item?.order) {
                return (
                  <div className='margin_top_30'>
                    <p className='distance'>Men, {item?.name} , Sizdan  {item?.order?.sum?.toLocaleString()} so‘m miqdorida {item?.order?.product?.name} shartlari asosida {item?.order?.aim} uchun {item?.order?.time} oy muddatga {item?.order?.type_credit == 'card' ? 'plastik kartada' : 'naqd pulda'} mikroqarz ajratishingizni so‘rayman. Faoliyat turim: {item?.job}, O‘rtacha oylik daromadim {item?.order?.salary?.toLocaleString()} so‘mni tashkil etadi.</p>
                    <p className='pdf_margin_top_15 distance'>Shaxsiy identifikatsiya raqamim (JShShIR) : {item?.pinfl}. <Address info={item} /> <DocInfo info={item} /></p>

                    <div className='b1_endData pdf_margin_top_10'>
                      {/* <span>Shaxsiy identifikatsiya raqamim (JShShIR) : {item?.pinfl}</span> */}
                      {
                        item?.order?.type_credit == 'card' ? <>
                          <span className='margin_top_10'>SSKS : {item?.order?.ssks}</span>
                          <span>Bank : {item?.order?.bank_name}</span>
                          <span>MFO : {item?.order?.bank_code}</span>
                        </> : <></>
                      }
                    </div>
                  </div>
                )
              }
            })
          }
          <p className='pdf_margin_top_15'>Mikroqarz qaytarilishini {reneIshonchFun(documentInfo) ? 'o‘zaro solidar javobgarlik to‘g‘risidagi kafillik shartnomasi' : (typesSupplyGroup(documentInfo?.group?.clients))?.join(',')} bilan ta'minlaymiz.</p>
          <p className='pdf_margin_top_15 distance'>"Renesans Mikromoliya tashkiloti" MChJ tomonidan bizning mazkur buyurtmamizni o‘rganish jarayonida va/yoki buyurtma asosida bizga mikroqarz ajratilsa, mikroqarz shartnomasi bo‘yicha barcha majburiyatlarimiz to‘liq bajarilgunga qadar har birimiz haqida bizning daromadlarimiz, majburiyatlarimiz, mavjud kredit va qarzlarimiz, kredit tariximiz va/yoki boshqa har qanday ma'lumotlarni kredit byurolaridan, bank-moliya institutlaridan, soliq va ichki ishlar organlaridan, mahalla fuqarolar yig‘inlaridan va/yoki har qanday boshqa manbalardan og‘zaki yoki yozma ravishda so‘rab olinishiga roziligimizni bildiramiz.
            <p className='distance'>
              Shu bilan birga, bizga ajratiladigan mikroqarzning asosiy qarzi yoki unga hisoblangan foizlarni, shuningdek, shartnoma shartlarining biz tomonimizdan bajarilmasligi yoki lozim darajada bajarilmasligi natijasida yuzaga kelishi mumkin bo‘lgan zararlar, hisoblanadigan penya va jarimalarni istalgan birimizning nomimizga ochilgan barcha bank plastik kartalari, omonat va boshqa hisobvaraqlardan individual va/yoki solidar tartibda so‘zsiz (aktseptsiz) tartibda to‘liq undirib olinishiga rozilik beramiz.</p>
          </p>
          {
            (typesSupplyGroup(documentInfo?.group?.clients))?.includes('transport vositasi garovi va kafillik') ? <>
              <p className='pdf_margin_top_15 distance'>Shuningdek, buyurtmalar berilgan mikroqarzga garov ta'minoti sifatida taklif etilayotgan garov ob'ekti to‘g‘risidagi ma'lumotlarni O‘zbekiston Respublikasining ''Garov reestri to‘g‘risida'' gi  Qonuniga muvofiq biz bilan garov shartnomasi tuzilgan vaqtdan e'tiboran garov reestridan ro‘yxatdan o‘tkazish va zaruriy xollarda garov ob'ekti bilan bog‘liq boshqa ma'lumotlar kiritilishiga avvaldan rozilik bildiramiz.</p>
            </> : <></>
          }
          <div className='margin_top_20'>
            {
              documentInfo?.group?.clients?.map((item, index) => {
                if (item?.order) {
                  return (
                    <div className='between margin_top_10 align_end name_handmark'>
                      <p className='text_black_18'>
                        {item?.name}
                      </p>
                      <div></div>
                    </div>
                  )
                }
                <></>
              })
            }
          </div>
          <div className='b1_end'>
            <p className='margin_top_10'>{documentInfo?.group?.clients?.[0]?.order?.order_date}</p>
          </div>
        </PdfWrapper>
      </>
    )
  }
}

export default B1Form