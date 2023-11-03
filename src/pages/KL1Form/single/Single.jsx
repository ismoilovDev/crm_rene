import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom';
import { AiOutlinePrinter } from 'react-icons/ai'
import { Radio, Input } from '@nextui-org/react'
import { YMaps, Map, Placemark } from '@pbe/react-yandex-maps';
import ContainerView from '../../../components/ImageContainer/ContainerView';
import Prev from '../../../components/Prev/Prev';
import https from '../../../services/https';
import { months } from '../../../utils/constants/months';


function SingleKL1() {

   const { id } = useParams()
   const navigate = useNavigate()
   const [mainInfo, setMainInfo] = useState({})
   const [kreditData, setKreditData] = useState({})
   const [orderInfo, setOrderInfo] = useState({})

   const getPaymentClear = async(id) => {
      try{
         const res = await https.post(`/g1/${id}`, {})
         const { data } = res;
         setKreditData(data?.graph?.['0']);
      }
      catch(error){
         console.log(error)
      }
   }

   const namunaRequest = async(info) =>{
      try{
         const res = await https.post('/namuna', info)
         const { data } = res;
         setKreditData(data?.['0'])
      }
      catch(err){
         console.log(err);
      }
   }

   const orderGetData = async(id) =>{
      try{
         const res = await https.get(`/orders/${id}`)
         setOrderInfo(res?.data)
      }
      catch(err){
         console.log(err);
      }
   }

   async function getMainInfo() {
      try{
         const res = await https.get(`/client-marks/${id}`)
         const { data } = res;

         setMainInfo(res?.data)
         orderGetData(res?.data?.order?.id)

         const info = {
            type: data?.order?.type_repayment === 1 ? 'annuitet' : 'differential',
            sum: data?.order?.sum,
            time: data?.order?.time,
            percent: data?.order?.percent_year,
            given_date: data?.contract?.id ? data?.contract?.contract_issue_date : data?.order?.order_date,
            first_repayment_date: data?.contract?.id ? data?.contract?.first_repayment_date : data?.order?.order_date
         }

         if(res?.data?.contract?.id){
            getPaymentClear(data?.order?.id)
         }else{
            namunaRequest(info)   
         }
      }
      catch(err){
         console.log(err)
      }
   }

   useEffect(() => {
      getMainInfo()
   }, [])

   // Location
   const defaultState = {
      center: [Number(mainInfo?.geolocation?.latitude), Number(mainInfo?.geolocation?.longitude)],
      zoom: 14,
   };
   function Location() {
      if (mainInfo?.geolocation?.latitude && mainInfo?.geolocation?.longitude) {
         return (
            <div className='location_field margin_top_15'>
               <YMaps>
                  <Map defaultState={defaultState}>
                     <Placemark geometry={[Number(mainInfo?.geolocation?.latitude), Number(mainInfo?.geolocation?.longitude)]} />
                  </Map>
               </YMaps>
            </div>
         )
      } else {
         return (<></>)
      }
   }

   // Boshqa Daromad
   function BoshqaSum() {
      let array = []
      mainInfo?.other_income?.map(item => {
         array.push(item?.volume * item?.unit_price)
      })
      let totalPrices = array.reduce((prev, current) => prev + current, 0)
      return totalPrices ? totalPrices?.toLocaleString(undefined, { minimumFractionDigits: 2 }) : 0
   }
   function BoshqaSumNumber() {
      let array = []
      mainInfo?.other_income?.map(item => {
         array.push(item?.volume * item?.unit_price)
      })
      let totalPrices = array.reduce((prev, current) => prev + current, 0)
      return totalPrices ? totalPrices : 0
   }

   // MonthDaromad 
   function MonthlyDaromad() {
      if (mainInfo?.monthly_income) {
         let MonthArrSum1 = Object.values(mainInfo?.monthly_income);
         let totalMonth1 = MonthArrSum1.reduce((prev, current) => Number(prev) + Number(current), 0)
         return totalMonth1 ? totalMonth1?.toLocaleString(undefined, { minimumFractionDigits: 2 }) : 0
      }
      return 0
   }
   function MonthlyDaromadNumber() {
      if (mainInfo?.monthly_income) {
         let MonthArrSum1 = Object.values(mainInfo?.monthly_income);
         let totalMonth1 = MonthArrSum1.reduce((prev, current) => Number(prev) + Number(current), 0)
         return totalMonth1 ? totalMonth1 : 0
      }
      return 0
   }

   // MonthXarajat
   function MonthlyXarajat() {
      if (mainInfo?.monthly_expense) {
         let MonthArrSum2 = Object.values(mainInfo?.monthly_expense);
         let totalMonth2 = MonthArrSum2.reduce((prev, current) => Number(prev) + Number(current), 0)
         return totalMonth2 ? totalMonth2?.toLocaleString(undefined, { minimumFractionDigits: 2 }) : 0
      }
      return 0
   }
   function MonthlyXarajatNumber() {
      if (mainInfo?.monthly_expense) {
         let MonthArrSum2 = Object.values(mainInfo?.monthly_expense);
         let totalMonth2 = MonthArrSum2.reduce((prev, current) => Number(prev) + Number(current), 0)
         return totalMonth2 ? totalMonth2 : 0
      }
      return 0
   }

   // Biznes Xarajat
   function BiznesDaromad() {
      let array = []
      mainInfo?.business_incomes?.map(item => {
         array.push(item?.monthly_income)
      })
      let totalPrices = array.reduce((prev, current) => prev + current, 0)
      return totalPrices ? totalPrices?.toLocaleString(undefined, { minimumFractionDigits: 2 }) : 0
   }

   function BiznesDaromadNumber() {
      let array = []
      mainInfo?.business_incomes?.map(item => {
         array.push(item?.monthly_income)
      })
      let totalPrices = array.reduce((prev, current) => prev + current, 0)
      return totalPrices ? totalPrices : 0
   }

   // Biznes Xarajat
   function BiznesXarajat() {
      let array = []
      mainInfo?.business_expenses?.map(item => {
         array.push(item?.average_monthly_expense)
      })
      let totalPrices = array.reduce((prev, current) => prev + current, 0)
      return totalPrices ? totalPrices?.toLocaleString(undefined, { minimumFractionDigits: 2 }) : 0
   }
   function BiznesXarajatNumber() {
      let array = []
      mainInfo?.business_expenses?.map(item => {
         array.push(item?.average_monthly_expense)
      })
      let totalPrices = array.reduce((prev, current) => prev + current, 0)
      return totalPrices ? totalPrices : 0
   }

   // Family Daromad
   function FamilyDaromad() {
      let array = []
      mainInfo?.family_incomes?.map(item => {
         array.push(item?.monthly_income)
      })
      let totalPrices = array.reduce((prev, current) => prev + current, 0)
      return totalPrices ? totalPrices : 0
   }


   // Family Xarajat
   function FamilyXarajat() {
      let array = []
      mainInfo?.family_expenses?.map(item => {
         array.push(item?.expense)
      })
      let totalPrices = array.reduce((prev, current) => prev + current, 0)
      return totalPrices ? totalPrices : 0

   }

   // Family Daromad
   function FamilyDaromadText() {
      let array = []
      mainInfo?.family_incomes?.map(item => {
         array.push(item?.monthly_income)
      })
      let totalPrices = array.reduce((prev, current) => prev + current, 0)
      return totalPrices ? totalPrices?.toLocaleString(undefined, { minimumFractionDigits: 2 }) : 0
   }

   // Family Xarajat
   function FamilyXarajatText() {
      let array = []
      mainInfo?.family_expenses?.map(item => {
         array.push(item?.expense)
      })
      let totalPrices = array.reduce((prev, current) => prev + current, 0)
      return totalPrices ? totalPrices?.toLocaleString(undefined, { minimumFractionDigits: 2 }) : 0
   }

   // Family Loans
   function FamilyLoansMain() {
      let array = []
      mainInfo?.family_loans?.map(item => {
         array.push(item?.main)
      })
      let totalPrices = array.reduce((prev, current) => prev + current, 0)
      return totalPrices ? totalPrices?.toLocaleString(undefined, { minimumFractionDigits: 2 }) : 0
   }

   // Family Loans
   function FamilyLoansMonth() {
      let array = []
      mainInfo?.family_loans?.map(item => {
         array.push(item?.monthly)
      })
      let totalPrices = array.reduce((prev, current) => prev + current, 0)
      return totalPrices ? totalPrices : 0
   }

   // Loans
   function ClientLoansMain() {
      let array = []
      mainInfo?.loans?.map(item => {
         array.push(item?.main)
      })
      let totalPrices = array.reduce((prev, current) => prev + current, 0)
      return totalPrices ? totalPrices?.toLocaleString(undefined, { minimumFractionDigits: 2 }) : 0
   }

   // Loans
   function ClientLoansMonth() {
      let array = []
      mainInfo?.loans?.map(item => {
         array.push(item?.monthly)
      })
      let totalPrices = array.reduce((prev, current) => prev + current, 0)
      return totalPrices ? totalPrices?.toLocaleString(undefined, { minimumFractionDigits: 2 }) : 0
   }
   function ClientLoansMonthNumber() {
      let array = []
      mainInfo?.loans?.map(item => {
         array.push(item?.monthly)
      })
      let totalPrices = array.reduce((prev, current) => prev + current, 0)
      return totalPrices ? totalPrices : 0
   }

   function SofFun() {
      return (BoshqaSumNumber() + (MonthlyDaromadNumber() / 12) + BiznesDaromadNumber() - (MonthlyXarajatNumber() / 12) - BiznesXarajatNumber())
   }


   function supplyTypes() {
      let types = []
      orderInfo?.supply_info?.map(item => {
         if (item?.type == 'gold') {
            types.push('Tilla Buyumlar Kafilligi')
         } else if (item?.type == 'auto') {
            types.push('Transport Vositasi Garovi')
         } else if (item?.type == 'guarrantor') {
            types.push('3 shaxs kafilligi')
         } else if (item?.type == 'insurance') {
            types.push('Sugurta kompaniyasi sugurta polisi')
         } else {
            types.push('Ishonch asosida')
         }
      })
      return types?.join(',')
   }

   function supplySum() {
      let summ = []
      orderInfo?.supply_info?.map(item => {
         if (item?.type === "insurance") {
            summ.push(item?.insurance?.sum)
         } else {
            summ.push(item?.sum)
         }
      })
      let totalSum = summ.reduce((prev, current) => prev + current, 0)
      return totalSum ? totalSum : 0
   }

   return (
      <div>
         <div className='pdf_header'>
            <Prev />
            <button onClick={() => navigate("/pdf/client-marks", { state: { id } })}>
               Print List
               <AiOutlinePrinter />
            </button>
         </div>
         <section className='single_buyurtma'>
            {/* Malumot */}
            <h1 className='text_center filial_edit_text'>{mainInfo?.client?.name}</h1>
            <div className='single_buyurtma_inputs pdf_margin_top_15'>
               <p>Hujjat tayyorlangan sana:</p>
               <p>{mainInfo?.doc_date}</p>
            </div>
            <div className='single_buyurtma_inputs pdf_margin_top_15'>
               <p>Mijoz tekshirilgan va organilgan sana:</p>
               <p>{mainInfo?.mark_date}</p>
            </div>
            <div className='single_buyurtma_inputs pdf_margin_top_15'>
               <p>Buyurtmachining F.I.Sh:</p>
               <p>{mainInfo?.client?.name}</p>
            </div>
            <div className='single_buyurtma_inputs pdf_margin_top_15'>
               <p>Doimiy yashash manzili:</p>
               <p>{mainInfo?.client?.address}</p>
            </div>
            {
               mainInfo?.client?.temp_address ?
               <div className='single_buyurtma_inputs pdf_margin_top_15'>
                  <p>Vaqtinchalik yashash manzili:</p>
                  <p>{mainInfo?.client?.temp_address}</p>
               </div> : <></>
            }
            <div className='single_buyurtma_inputs pdf_margin_top_15'>
               <p>JSh ShIR:</p>
               <p>{mainInfo?.client?.pinfl}</p>
            </div>
            <div className='single_buyurtma_inputs pdf_margin_top_15'>
               <p>Buyurtmachining telefon raqami:</p>
               <p>{mainInfo?.client?.phone[0]}</p>
            </div>
            <div className='single_buyurtma_inputs pdf_margin_top_15'>
               <p>Kredit maqsadi:</p>
               <p>{mainInfo?.order?.aim}</p>
            </div>
            <div className='single_buyurtma_inputs pdf_margin_top_15'>
               <p>Soralayotgan kredit miqdori:</p>
               <p>{mainInfo?.order?.sum?.toLocaleString(undefined, { minimumFractionDigits: 2 })}</p>
            </div>

            {/* ********Part 1********* */}
            <h2 className='kl1_subtitle margin_top_30'>Buyurtmachining oilaviy sharoitini organish natijalari</h2>
            <p className='kl1_formtitle text_center'>Birgalikda istiqomat qiluvchilar</p>
            <div className='list_sinlge_form'>
               <p>Istiqomat qiluvchi:</p>
               {
                  mainInfo?.family?.map((item, index) => {
                     return (
                        <p key={index}>{index + 1}. {item}</p>
                     )
                  })
               }
            </div>
            <div className='single_buyurtma_inputs pdf_margin_top_15'>
               <p>Oila azolari bilan suhbat davomida aniqlangan muhim malumotlar:</p>
               <p>{mainInfo?.conversation_result}</p>
            </div>
            <p className='kl1_formtitle text_center'>Buyurtmachining boshqa mulklari</p>
            <div className='list_sinlge_form'>
               <p>Mulk nomi:</p>
               {
                  mainInfo?.property?.map((item, index) => {
                     return (
                        <p key={index}>{index + 1}. {item}</p>
                     )
                  })
               }
            </div>
            <div className='single_buyurtma_inputs pdf_margin_top_15'>
               <p>Yashash sharoiti:</p>
               <p>{mainInfo?.living_condition}</p>
            </div>
            <h2 className='kl1_subtitle margin_top_30'>Buyurtmachining faoliyati va daromad  manbalarini organish natijalari</h2>
            <div className='single_buyurtma_inputs pdf_margin_top_15'>
               <p>Buyurtmachining faoliyat turi:</p>
               <p>{mainInfo?.activity?.type}</p>
            </div>
            <div className='single_buyurtma_inputs pdf_margin_top_15'>
               <p>Faoliyat manzili:</p>
               <p>{mainInfo?.activity?.address}</p>
            </div>
            <div className='single_buyurtma_inputs pdf_margin_top_15'>
               <p>Faoliyat joyi (shaxsiy / ijara / boshqa):</p>
               <p>{mainInfo?.activity?.owner}</p>
            </div>
            <div className='single_buyurtma_inputs pdf_margin_top_15'>
               <p>Ushbu sohada foliyat yuritish davomiyligi:</p>
               <p>{mainInfo?.activity?.duration}</p>
            </div>
            <p className='margin_top_15'></p>
            <ContainerView paths={mainInfo?.images} />

            {/* ********___Boshqa___********* */}
            <h2 className='kl1_subtitle margin_top_30'>Buyurtmachining daromadlari</h2>
            <p className='kl1_formtitle text_center'>Boshqa daromad turlari shuningdek passiv daromadlar</p>
            {
               mainInfo?.other_income?.map((item, index) => {
                  return (
                     <div className='single_boshqa_product' key={item?.id}>
                        <div className='kl1_product_title'>
                           <p>Daromad {index + 1}</p>
                        </div>
                        <div className='single_buyurtma_inputs pdf_margin_top_15'>
                           <p>Daromad nomi:</p>
                           <p>{item?.name}</p>
                        </div>
                        <div className='single_buyurtma_inputs pdf_margin_top_15'>
                           <p>Hajmi:</p>
                           <p>{item?.volume}</p>
                        </div>
                        <div className='single_buyurtma_inputs pdf_margin_top_15'>
                           <p>Birlik narxi:</p>
                           <p>{item?.unit_price}</p>
                        </div>
                        <div className='single_buyurtma_inputs pdf_margin_top_15'>
                           <p>Qiymati:</p>
                           <p>{item?.worth}</p>
                        </div>
                        <div className='single_buyurtma_inputs pdf_margin_top_15'>
                           <p>Oylik daromad:</p>
                           <p>{item?.volume * item?.unit_price}</p>
                        </div>
                        <div className='single_buyurtma_inputs pdf_margin_top_15'>
                           <p>Izoh:</p>
                           <p>{item?.comment}</p>
                        </div>
                     </div>
                  )
               })
            }
            <p className='kl1_jami margin_top_15'>Jami o'rtacha oylik daromadlari: {BoshqaSum()} so`m</p>

            {/******___Mavsumiy___******/}
            <div>
               {
                  MonthlyDaromad() ? <>
                     <p className='kl1_formtitle text_center'>Mavsumiy daromad turi, manbasi va faoliyat joyi</p>
                     {
                        mainInfo?.seasonal_income?.map((item, index) => {
                           return (
                              <div className='kl1_products' key={item.id}>
                                 <div className='kl1_product_title'>
                                    Mavsumiy daromad {index + 1}
                                 </div>
                                 <div className='kl1_product'>
                                    <Input
                                       rounded
                                       bordered
                                       label='Daromad nomi'
                                       color="secondary"
                                       width='47%'
                                       className='kl1_input'
                                       value={mainInfo?.seasonal_income?.find(x => x.id === item.id)?.name}
                                    />
                                    <Input
                                       rounded
                                       bordered
                                       label='Yillik daromad hajmi'
                                       color="secondary"
                                       width='47%'
                                       type='number'
                                       onWheel={(e) => e.target.blur()}
                                       className='kl1_input'
                                       value={mainInfo?.seasonal_income?.find(x => x.id === item.id)?.income}
                                    />
                                 </div>
                              </div>
                           )
                        })
                     }

                     <p className='kl1_formtitle text_center'>Mavsumiy daromadlarning oylar bo'yicha taqsimlanishi</p>

                     <div className='kl1_calendar_single'>
                        {
                           months?.map((item, index)=>{
                              return(
                                 <div className='single_buyurtma_inputs' key={index+10}>
                                    <p>{item?.name}:</p>
                                    <p>{(mainInfo?.monthly_income?.[item?.value])?.toLocaleString()}</p>
                                 </div>
                              )
                           })
                        }
                     </div>
                     <p className='kl1_jami margin_top_15'>Jami: {MonthlyDaromad()} so'm</p>
                  </> : <></>
               }

               {
                  MonthlyXarajat() ? <>

                     <p className='kl1_formtitle text_center'>Mavsumiy xarajatlar</p>
                     {
                        mainInfo?.seasonal_expense?.map((item, index) => {
                           return (
                              <div className='kl1_products' key={index}>
                                 <div className='kl1_product_title'>
                                    Mavsumiy xarajat {index + 1}
                                 </div>
                                 <div className='kl1_product'>
                                    <Input
                                       rounded
                                       bordered
                                       label='Xarajat nomi'
                                       color="secondary"
                                       width='47%'
                                       className='kl1_input'
                                       value={mainInfo?.seasonal_expense?.find(x => x.id === item.id)?.name}
                                    />
                                    <Input
                                       rounded
                                       bordered
                                       label='Yillik xarajat hajmi'
                                       color="secondary"
                                       width='47%'
                                       type='number'
                                       onWheel={(e) => e.target.blur()}
                                       className='kl1_input'
                                       value={mainInfo?.seasonal_expense?.find(x => x.id === item.id)?.expense}
                                    />
                                 </div>
                              </div>
                           )
                        })
                     }

                     <p className='kl1_formtitle text_center'>Mavsumiy xarajatlarning oylar bo'yicha taqsimlanishi</p>
                     <div className='kl1_calendar_single'>
                        {
                           months?.map((item, index)=>{
                              return(
                                 <div className='single_buyurtma_inputs' key={index+10}>
                                    <p>{item?.name}:</p>
                                    <p>{(mainInfo?.monthly_expense?.[item?.value])?.toLocaleString()}</p>
                                 </div>
                              )
                           })
                        }
                     </div>
                     <p className='kl1_jami margin_top_15'>Jami: {MonthlyXarajat()} so'm</p>
                  </> : <></>
               }
            </div>

            {/******___Biznes___******/}
            <div>
               {
                  mainInfo?.business_incomes?.length != 0 ? <>
                     <p className='kl1_formtitle text_center'>Biznes daromadlar turi</p>
                     {
                        mainInfo?.business_incomes?.map((item, index) => {
                           return (
                              <div className='single_boshqa_product' key={item?.id}>
                                 <div className='kl1_product_title'>
                                    <p>Biznes daromad {index + 1}</p>
                                 </div>
                                 <div className='single_buyurtma_inputs pdf_margin_top_15'>
                                    <p>Daromad nomi:</p>
                                    <p>{item?.name}</p>
                                 </div>
                                 <div className='single_buyurtma_inputs pdf_margin_top_15'>
                                    <p>Oylik hajm:</p>
                                    <p>{item?.monthly_volume}</p>
                                 </div>
                                 <div className='single_buyurtma_inputs pdf_margin_top_15'>
                                    <p>1 birlikning o`rtacha sotish naxri:</p>
                                    <p>{item?.unit_price}</p>
                                 </div>
                                 <div className='single_buyurtma_inputs pdf_margin_top_15'>
                                    <p>O`rtacha ustamasi % da:</p>
                                    <p>{item?.average_price}</p>
                                 </div>
                                 <div className='single_buyurtma_inputs pdf_margin_top_15'>
                                    <p>Bir oylik daromad:</p>
                                    <p>{item?.monthly_income}</p>
                                 </div>
                                 <div className='single_buyurtma_inputs pdf_margin_top_15'>
                                    <p>Izoh:</p>
                                    <p>{item?.comment}</p>
                                 </div>
                              </div>
                           )
                        })
                     }
                     <p className='kl1_jami margin_top_15'>Jami: {BiznesDaromad()} so'm</p>
                  </> : <></>
               }
               {
                  mainInfo?.business_expenses?.length != 0 ? <>
                     <p className='kl1_formtitle text_center'>Biznes uchun xarajatlar</p>
                     {
                        mainInfo?.business_expenses?.map((item, index) => {
                           return (
                              <div className='single_boshqa_product' key={item?.id}>
                                 <div className='kl1_product_title'>
                                    <p>Biznes xarajat {index + 1}</p>
                                 </div>
                                 <div className='single_buyurtma_inputs pdf_margin_top_15'>
                                    <p>Xarajat nomi:</p>
                                    <p>{item?.name}</p>
                                 </div>
                                 <div className='single_buyurtma_inputs pdf_margin_top_15'>
                                    <p>Oylik hajm:</p>
                                    <p>{item?.volume}</p>
                                 </div>
                                 <div className='single_buyurtma_inputs pdf_margin_top_15'>
                                    <p>Naxri:</p>
                                    <p>{item?.price}</p>
                                 </div>
                                 <div className='single_buyurtma_inputs pdf_margin_top_15'>
                                    <p>Qiymati:</p>
                                    <p>{item?.value}</p>
                                 </div>
                                 <div className='single_buyurtma_inputs pdf_margin_top_15'>
                                    <p>O`rtacha oylik xarajat:</p>
                                    <p>{item?.average_monthly_expense}</p>
                                 </div>
                                 <div className='single_buyurtma_inputs pdf_margin_top_15'>
                                    <p>Izoh:</p>
                                    <p>{item?.comment}</p>
                                 </div>
                              </div>
                           )
                        })
                     }
                     <p className='kl1_jami margin_top_15'>Jami: {BiznesXarajat()} so'm</p>
                  </> : <></>
               }
            </div>

            {/******___6-Qism___******/}
            <div>
               {
                  mainInfo?.family_incomes?.length != 0 ? <>
                     <p className='kl1_formtitle text_center'>Oila azolarining daromadlar , shuningdek uy xojaligining boshqa daromadlari</p>
                     {
                        mainInfo?.family_incomes?.map((item, index) => {
                           return (
                              <div className='single_form_product_first' key={item?.id}>
                                 <div>
                                    <p>Odam {index + 1}</p>
                                 </div>
                                 <div className='single_buyurtma_inputs'>
                                    <p>Daromad Egasi:</p>
                                    <p>{item?.name}</p>
                                 </div>
                                 <div className='single_buyurtma_inputs'>
                                    <p>Faoliyat Turi:</p>
                                    <p>{item?.activity_type}</p>
                                 </div>
                                 <div className='single_buyurtma_inputs'>
                                    <p>Faoliyat Joyi:</p>
                                    <p>{item?.activity_address}</p>
                                 </div>
                                 <div className='single_buyurtma_inputs'>
                                    <p>Bir oylik daromad:</p>
                                    <p>{item?.monthly_income}</p>
                                 </div>
                                 <div className='single_buyurtma_inputs'>
                                    <p>Izoh</p>
                                    <p>{item?.comment}</p>
                                 </div>
                              </div>
                           )
                        })
                     }
                     <p className='kl1_jami margin_top_15'>Jami: {FamilyDaromadText()} so'm</p>
                  </> : <></>
               }
               {
                  mainInfo?.family_expenses?.length != 0 ? <>
                     <p className='kl1_formtitle text_center'>Uy xojaligining xarajatlari</p>
                     {
                        mainInfo?.family_expenses?.map((item, index) => {
                           return (
                              <div className='single_form_product_first' key={item?.id}>
                                 <div>
                                    <p>Xarajat {index + 1}</p>
                                 </div>
                                 <div className='single_buyurtma_inputs'>
                                    <p>Xarajat nomi:</p>
                                    <p>{item?.name}</p>
                                 </div>
                                 <div className='single_buyurtma_inputs'>
                                    <p>Ortaja oylik xarajat:</p>
                                    <p>{item?.expense}</p>
                                 </div>
                                 <div className='single_buyurtma_inputs'>
                                    <p>Izoh</p>
                                    <p>{item?.comment}</p>
                                 </div>
                              </div>
                           )
                        })
                     }
                     <p className='kl1_jami margin_top_15'>Jami: {FamilyXarajatText()} so'm</p>
                  </> : <></>
               }
               {
                  mainInfo?.family_loans?.[0] ? <>
                     <p className='kl1_formtitle text_center'>Uy xojaligi azolarining mavjud kredit va qarzdorliklari togrisidagi malumotlar</p>
                     {
                        mainInfo?.family_loans?.map((item, index) => {
                           return (
                              <div className='single_form_product_second' key={item?.id}>
                                 <div>
                                    <p>Malumot {index + 1}</p>
                                 </div>
                                 <div className='single_buyurtma_inputs'>
                                    <p>Malumot nomi:</p>
                                    <p>{item?.name}</p>
                                 </div>
                                 <div className='single_buyurtma_inputs'>
                                    <p>Asosiy qarz qoldigi:</p>
                                    <p>{item?.main}</p>
                                 </div>
                                 <div className='single_buyurtma_inputs'>
                                    <p>Oylik tolov miqdori:</p>
                                    <p>{item?.monthly}</p>
                                 </div>
                                 <div className='single_buyurtma_inputs'>
                                    <p>Izoh</p>
                                    <p>{item?.comment}</p>
                                 </div>
                              </div>
                           )
                        })
                     }
                     <div className='flex_column margin_top_10'>
                        <p className='kl1_jami margin_bottom'>Jami asosiy qarz qoldigi: {FamilyLoansMain()} so`m</p>
                        <p className='kl1_jami margin_bottom'>Jami oylik tolov miqdori: {FamilyLoansMonth()} so`m</p>
                     </div>
                  </> : <></>
               }
               {
                  mainInfo?.family_expenses?.length != 0 ? <>
                     <p className={(FamilyDaromad() - FamilyXarajat() - FamilyLoansMonth()) > 0 ? 'text_black_18 green_text margin_top_10' : 'text_black_18 red_text margin_top_10'}>Uy xojaligi byudjetining ortacha oylik ortiqcha mablagi yoki kamomadi miqdori: {(FamilyDaromad() - FamilyXarajat() - FamilyLoansMonth())} so`m</p>
                  </> : <></>
               }
            </div>

            {/******___7-Qism___******/}
            <div>
               {
                  mainInfo?.loans?.length != 0 ? <>
                     <h2 className='kl1_subtitle margin_top_30'>Buyurtmachining mavjud kredit va qarz majburiyatlari</h2>
                     {
                        mainInfo?.loans?.map((item, index) => {
                           return (
                              <div className='single_form_product_second' key={item?.id}>
                                 <div>
                                    <p>Mavjud malumot {index + 1}</p>
                                 </div>
                                 <div className='single_buyurtma_inputs'>
                                    <p>Mavjud kredit va qarzlar:</p>
                                    <p>{item?.name}</p>
                                 </div>
                                 <div className='single_buyurtma_inputs'>
                                    <p>Asosiy qarz qoldigi:</p>
                                    <p>{item?.main}</p>
                                 </div>
                                 <div className='single_buyurtma_inputs'>
                                    <p>Oylik tolov miqdori:</p>
                                    <p>{item?.monthly}</p>
                                 </div>
                                 <div className='single_buyurtma_inputs'>
                                    <p>Izoh</p>
                                    <p>{item?.comment}</p>
                                 </div>
                              </div>
                           )
                        })
                     }
                     <div className='flex_column margin_top_15'>
                        <p className='kl1_jami margin_bottom'>Jami asosiy qarz qoldigi: {ClientLoansMain()} so`m</p>
                        <p className='kl1_jami margin_bottom'>Jami oylik tolov miqdori: {ClientLoansMonth()} so`m</p>
                        <p className='kl1_jami '>Joiriy kreditlar boyicha qarz yuki korsatkichi: {((ClientLoansMonthNumber() / SofFun()) * 100)?.toFixed(2)}%</p>
                     </div>
                  </> : <></>
               }
               <h2 className='kl1_subtitle margin_top_30'>Oylik kredit tolovi ( eng katta tolov miqdori )</h2>
               <div className='single_form_product_third'>
                  <div className='single_buyurtma_inputs'>
                     <p>Asosiy qarz:</p>
                     <p>{(kreditData?.principal_debt)?.toLocaleString(undefined, { minimumFractionDigits: 2 })}</p>
                  </div>
                  <div className='single_buyurtma_inputs'>
                     <p>Foizlar:</p>
                     <p>{(kreditData?.interest)?.toLocaleString(undefined, { minimumFractionDigits: 2 })}</p>
                  </div>
                  <div className='single_buyurtma_inputs'>
                     <p>Jami oylik tolov:</p>
                     <p>{(kreditData?.interest + kreditData?.principal_debt)?.toLocaleString(undefined, { minimumFractionDigits: 2 })}</p>
                  </div>
                  <div className='single_buyurtma_inputs'>
                     <p>Soralayotgan kredit hisobi qarzi yoki korsatkichi (${'< 50%'})</p>
                     <p>{(((kreditData?.interest + kreditData?.principal_debt + ClientLoansMonthNumber()) / SofFun()) * 100).toFixed(2)}</p>
                  </div>
               </div>
               <div className='single_buyurtma_inputs margin_top_10'>
                  <p>Kredit tarixi</p>
                  <p>{mainInfo?.credit_history}</p>
               </div>
            </div>

            {/******___Table___******/}
            <div>
               <div className="kl_responsive_table">
                  <div className='kl1_table'>
                     <div className='kl1_table_dark-bg'>Hulq atvori</div>
                     <div className='kl1_table_dark-bg'>Shaxsiy sifatida baholanishi</div>
                     <div className='kl1_table_dark-bg'>Moliaviy malumotlar va savodxonlik</div>
                     <div className='kl1_table_double kl1_table_noPadding'>
                        <p>сухбат</p>
                        <p>{mainInfo?.table_conversation_result}</p>
                     </div>
                     <div className='kl1_table_double kl1_table_noPadding'>
                        <p>учрашув</p>
                        <p>{mainInfo?.table_meeting_result}</p>
                     </div>
                     <div>{mainInfo?.table_financial_literacy}</div>
                     <div className='kl1_table_double kl1_table_noPadding'>
                        <p>oylik tolov</p>
                        <p>OT/OD</p>
                     </div>
                     <div className='kl1_table_double kl1_table_dark-bg kl1_table_noPadding'>
                        <p>SD/OT</p>
                        <p>OHX</p>
                     </div>
                     <div className='kl1_table_dark-bg'>Natija</div>
                     <div className='kl1_table_double kl1_table_dark-bg kl1_table_noPadding'>
                        <p className='kl1_table_yellow-bg'>{(kreditData?.interest + kreditData?.principal_debt)?.toLocaleString(undefined, { minimumFractionDigits: 2 })}</p>
                        <p className={(((kreditData?.interest + kreditData?.principal_debt + ClientLoansMonthNumber()) / SofFun()) * 100).toFixed(2) > 50 || (((kreditData?.interest + kreditData?.principal_debt + ClientLoansMonthNumber()) / SofFun()) * 100).toFixed(2) < 0 ? 'kl1_table_red-bg' : 'kl1_table_green-bg'}>{(((kreditData?.interest + kreditData?.principal_debt + ClientLoansMonthNumber()) / SofFun()) * 100).toFixed(2)}%</p>
                     </div>
                     <div className='kl1_table_double kl1_table_noPadding'>
                        <p className='kl1_table_yellow-bg'>{((SofFun() / (kreditData?.interest + kreditData?.principal_debt)) * 100).toFixed(2)}%</p>
                        <p className='kl1_table_yellow-bg'>{(FamilyXarajat() + FamilyLoansMonth()) ? (FamilyXarajat() + FamilyLoansMonth())?.toLocaleString(undefined, { minimumFractionDigits: 2 }) : 0}</p>
                     </div>
                     <div className='kl1_table_yellow-bg'> {`<= 50% и >= 120%`}</div>
                     <div className='kl1_table_dark-bg'>Shaxsiy kapital miqdori</div>
                     <div className='kl1_table_dark-bg'>Shaxsiy kapital/kreditlar</div>
                     <div className='kl1_table_dark-bg'>Natija</div>
                     <div>{mainInfo?.table_personal_capital?.toLocaleString(undefined, { minimumFractionDigits: 2 })}</div>
                     <div className='kl1_table_yellow-bg'>{mainInfo?.table_personal_capital ? (mainInfo?.table_personal_capital * 100 / orderInfo?.sum)?.toFixed(0) : 0}%</div>
                     <div className='kl1_table_yellow-bg'>50</div>
                     <div className='kl1_table_dark-bg'>Daromad manbai</div>
                     <div className='kl1_table_dark-bg'>Faoliyat barqarorligi</div>
                     <div className='kl1_table_dark-bg'>Kutilayotgan rivojlanish</div>
                     <div>{mainInfo?.table_income_source}</div>
                     <div>{mainInfo?.table_work_stability}</div>
                     <div>{mainInfo?.table_expected_growth}</div>
                     <div className='kl1_table_dark-bg'>Taminot turi</div>
                     <div className='kl1_table_dark-bg'>Taminot qiymati</div>
                     <div className='kl1_table_dark-bg'>Kreditni qoplash koeffitsenti</div>
                     <div>{supplySum() ? supplyTypes() : 'kafillik'}</div>
                     <div>{supplySum() ? supplySum()?.toLocaleString(undefined, { minimumFractionDigits: 2 }) : orderInfo?.sum?.toLocaleString(undefined, { minimumFractionDigits: 2 })}</div>
                     <div className='kl1_table_yellow-bg'>{supplySum() ? (supplySum() * 100 / orderInfo?.sum)?.toFixed(0) : 100}%</div>
                  </div>
               </div>

               <div className='single_buyurtma_inputs'>
                  <p>Ajratilgan kreditning buyurtmachi uchun tasirini baholash:</p>
                  <p>{mainInfo?.credit_impact}</p>
               </div>
               <div className='single_buyurtma_inputs margin_top_20'>
                  <p>Monitoring boyicha masul xodimning yakuniy xulosasi:</p>
                  <p>{mainInfo?.conclusion}</p>
               </div>
               <h3 className='margin_top_25'>Lokasiya</h3>
               <div className='single_buyurtma_inputs margin_top_15'>
                  <p>Kenglik:</p>
                  <p>{mainInfo?.geolocation?.latitude}</p>
               </div>
               <div className='single_buyurtma_inputs margin_top_15'>
                  <p>Uzunlik:</p>
                  <p>{mainInfo?.geolocation?.longitude}</p>
               </div>
               {
                  Location()
               }
               <div className='kl1_accepting'>
                  <p>Taqdim etilgan va toplangan malumotlar hamda kredit byurosidan olingan kredit tarixiga asoslanib men tomonimdan otkazilgan organish va tahlillar asosida ushbu buyurtma boyicha quiydagi yakuniy xulosamni kredit komissiyasida korib chiqish uchun taqdim etaman</p>
                  <Radio.Group label=' ' value={mainInfo?.status == 1 ? true : false} size='sm' className='kl1_accepting_radio'>
                     <div className='kl1_accept margin_bottom'><Radio color='success' className='radio_end' value={true}>Kredit ajratish</Radio></div>
                     <div className='kl1_accept'><Radio color='error' className='radio_end' value={false}>Rad etish</Radio></div>
                  </Radio.Group>
               </div>
            </div>

         </section>
      </div>
   )
}

export default SingleKL1