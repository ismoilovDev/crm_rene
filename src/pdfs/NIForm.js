import React, { useState, useMemo} from 'react'
import { useLocation } from 'react-router-dom'
import https from '../services/https'
import Logo from '../assets/images/Logo'
import fullName from '../utils/functions/fullName'
import siteLogo from '../assets/images/logo-site.png'
import { PdfWrapper } from '../components/Pdf/Wrapper'
import dateConvert from '../utils/functions/dateConvert'
import { PdfControls } from '../components/Pdf/PdfControls'
import { phoneFormat } from '../utils/functions/phoneFormat'


function checkOwner(taminot){
  if(taminot?.possessor === 'trust_owner'){
      return taminot?.trust_owner
  }else if(taminot?.possessor === 'owner'){
      return taminot?.owner
  }else if(taminot?.possessor === 'client'){
      return false
  }
}


function NIForm() {
  const location = useLocation()
  const orderId = location?.state?.id
  const [ documentInfo, setDocumentInfo ]= useState({})

  const [input1, setInput1] = useState('')
  const [input2, setInput2] = useState('')
  const [input3, setInput3] = useState('')
  const [input4, setInput4] = useState('')

  async function getData(){
      try{
          const res = await https.post(`/lifting-the-ban/${orderId}`)
          const { data } = res;
          setDocumentInfo(data)
          console.log(data);
      }
      catch(err){
          console.log(err);
      }
  }

  useMemo(()=>{
    getData()
  }, [orderId])

  const mainPart = (documentInfo) =>(
    <div className='margin_top_15'>
      <p className='distance'>
        «Renesans Mikromoliya Tashkiloti» MChJ {documentInfo?.branch?.short_name} va {documentInfo?.client?.name} o’rtasida tuzilgan {dateConvert(documentInfo?.contract?.contract_issue_date)} yildagi {documentInfo?.contract?.contract_num}-sonli mikroqarz shartnomasiga asosan {documentInfo?.client?.name} {documentInfo?.supply_infos?.[0]?.auto?.[0]?.registration_cert}-sonli transport vositasini qayd etish guvohnomasiga asosan {checkOwner(documentInfo?.supply_infos?.[0]) ? checkOwner(documentInfo?.supply_infos?.[0])?.fio : documentInfo?.client?.name}ga tegishli bo’lgan, "{documentInfo?.supply_infos?.[0]?.auto?.[0]?.name}" rusumli, {documentInfo?.supply_infos?.[0]?.auto?.[0]?.year} yilda ishlab chiqarilgan, dvigatel raqami {documentInfo?.supply_infos?.[0]?.auto?.[0]?.engine_number}, kuzov raqami {documentInfo?.supply_infos?.[0]?.auto?.[0]?.body_code}, shassi {documentInfo?.supply_infos?.[0]?.auto?.[0]?.chassis}, transport vositasi turi {documentInfo?.supply_infos?.[0]?.auto?.[0]?.type_of_auto}, davlat raqam belgisi {documentInfo?.supply_infos?.[0]?.auto?.[0]?.number} bo’lgan avtomashinani garovga qo’ygan.
      </p>
      <p className='distance margin_top_15'>
        «Renesans Mikromoliya Tashkiloti» MChJ {documentInfo?.branch?.short_name} oldidagi majburiyatlarini to’liq bajarganligi munosabati bilan {input1} notarius {input2} tomonidan {input3} yildagi {input4}-sonli reestrga qo’yilgan ta’qiqni bekor qilishingizni so’raymiz.
      </p>
    </div>
  )

  const endPart = (documentInfo) =>(
    <div className='logo_back margin_top_30'>
      <img src={siteLogo} alt='renesans-logo'/>
      <div className='text_part'>
        <p>Ijrochi: {fullName(documentInfo?.branch?.user_name)}<br/>
        Tel: {phoneFormat(documentInfo?.branch?.phone)}</p>
      </div>
    </div>
  )

  return (
    <>
        <PdfControls/>
        <div className='pdf_inputs_container'>
          <input
            placeholder='Manzil...' 
            value={input1}
            onChange={(e)=>setInput1(e.target.value)}
          />
          <input
            placeholder='F.I.Sh...' 
            value={input2}
            onChange={(e)=>setInput2(e.target.value)}
          />
          <input
            placeholder='Sana...' 
            value={input3}
            onChange={(e)=>setInput3(e.target.value)}
          />
          <input
            placeholder='Son...' 
            value={input4}
            onChange={(e)=>setInput4(e.target.value)}
          />
        </div>
        <PdfWrapper indicator={documentInfo}>
          <div className='between align_start'>
            <p>
              «Renesans Mikromoliya Tashkiloti» MChJ {documentInfo?.branch?.short_name}<br/>
              O'zbekiston Respublikasi, 111503<br/>
              {documentInfo?.branch?.address?.split(',')?.slice(0, 2)?.join(', ')}<br/>
              {documentInfo?.branch?.address?.split(',')?.slice(2)?.join(', ')}<br/>
              Tel/faks: {phoneFormat(documentInfo?.branch?.phone)}<br/>
              E-mail: info@renesans.uz
            </p>
            <Logo width={250}/>
          </div>
          <div className='margin_top_30'>
            <p className='black_text'>_________________ yil</p>
          </div>
          <div className=''>
            <p className='black_text margin_top_15'>____________________-sonli</p>
          </div>
          <h1 className='text_center margin_top_30'>Notarial Idoraga</h1>
          {mainPart(documentInfo)}
          <div className='margin_top_30'>
            <p className='black_text'>«Renesans Mikromoliya Tashkiloti» MChJ {documentInfo?.branch?.short_name} direktori:</p>
            <p className='black_text margin_top_5'>{documentInfo?.branch?.head}</p>
          </div>
          {endPart(documentInfo)}
        </PdfWrapper>

    </>
  )
}

export default NIForm