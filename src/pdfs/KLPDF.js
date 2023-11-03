import { useState, useEffect } from 'react'
import { useLocation } from 'react-router-dom';
import { PdfControls } from '../components/Pdf/PdfControls';
import { PdfWrapper } from '../components/Pdf/Wrapper';
import { months } from '../utils/constants/months';
import https from '../services/https';

function KLPDF() {
   const location = useLocation()
   const id = location?.state?.id
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

   function boshqaSum() {
      let array = []
      mainInfo?.other_income?.map(item => {
         array.push(item?.volume * item?.unit_price)
      })
      let totalPrices = array.reduce((prev, current) => prev + current, 0)
      return totalPrices ? totalPrices?.toLocaleString(undefined, { minimumFractionDigits: 2 }) : 0
   }

   function boshqaSumNumber() {
      let array = []
      mainInfo?.other_income?.map(item => {
         array.push(item?.volume * item?.unit_price)
      })
      let totalPrices = array.reduce((prev, current) => prev + current, 0)
      return totalPrices ? totalPrices : 0
   }

   function monthlyDaromad() {
      if (mainInfo?.monthly_income) {
         let MonthArrSum1 = Object.values(mainInfo?.monthly_income);
         let totalMonth1 = MonthArrSum1.reduce((prev, current) => Number(prev) + Number(current), 0)
         if (totalMonth1) {
            return (totalMonth1?.toLocaleString(undefined, { minimumFractionDigits: 2 }))
         } else {
            return 0
         }
      } else {
         return 0
      }
   }

   function monthlyDaromadNumber() {
      if (mainInfo?.monthly_income) {
         let MonthArrSum1 = Object.values(mainInfo?.monthly_income);
         let totalMonth1 = MonthArrSum1.reduce((prev, current) => Number(prev) + Number(current), 0)
         if (totalMonth1) {
            return (totalMonth1)
         } else {
            return 0
         }
      } else {
         return 0
      }
   }

   function monthlyXarajat() {
      if (mainInfo?.monthly_expense) {
         let MonthArrSum2 = Object.values(mainInfo?.monthly_expense);
         let totalMonth2 = MonthArrSum2.reduce((prev, current) => Number(prev) + Number(current), 0)
         if (totalMonth2) {
            return (totalMonth2?.toLocaleString(undefined, { minimumFractionDigits: 2 }))
         } else {
            return 0
         }
      } else {
         return 0
      }
   }

   function monthlyXarajatNumber() {
      if (mainInfo?.monthly_expense) {
         let MonthArrSum2 = Object.values(mainInfo?.monthly_expense);
         let totalMonth2 = MonthArrSum2.reduce((prev, current) => Number(prev) + Number(current), 0)
         if (totalMonth2) {
            return (totalMonth2)
         } else {
            return 0
         }
      } else {
         return 0
      }
   }

   function biznesDaromad() {
      let array = []
      mainInfo?.business_incomes?.map(item => {
         array.push(item?.monthly_income)
      })
      let totalPrices = array.reduce((prev, current) => prev + current, 0)
      return totalPrices ? totalPrices?.toLocaleString(undefined, { minimumFractionDigits: 2 }) : 0
   }

   function biznesDaromadNumber() {
      let array = []
      mainInfo?.business_incomes?.map(item => {
         array.push(item?.monthly_income)
      })
      let totalPrices = array.reduce((prev, current) => prev + current, 0)
      return totalPrices ? totalPrices : 0
   }

   function biznesXarajat() {
      let array = []
      mainInfo?.business_expenses?.map(item => {
         array.push(item?.average_monthly_expense)
      })
      let totalPrices = array.reduce((prev, current) => prev + current, 0)
      return totalPrices ? totalPrices?.toLocaleString(undefined, { minimumFractionDigits: 2 }) : 0
   }

   function biznesXarajatNumber() {
      let array = []
      mainInfo?.business_expenses?.map(item => {
         array.push(item?.average_monthly_expense)
      })
      let totalPrices = array.reduce((prev, current) => prev + current, 0)
      return totalPrices ? totalPrices : 0
   }

   function familyDaromad() {
      let array = []
      mainInfo?.family_incomes?.map(item => {
         array.push(item?.monthly_income)
      })
      let totalPrices = array.reduce((prev, current) => prev + current, 0)
      return totalPrices ? totalPrices : 0
   }

   function familyXarajat() {
      let array = []
      mainInfo?.family_expenses?.map(item => {
         array.push(item?.expense)
      })
      let totalPrices = array.reduce((prev, current) => prev + current, 0)
      return totalPrices ? totalPrices : 0

   }

   function familyDaromadText() {
      let array = []
      mainInfo?.family_incomes?.map(item => {
         array.push(item?.monthly_income)
      })
      let totalPrices = array.reduce((prev, current) => prev + current, 0)
      return totalPrices ? totalPrices.toLocaleString(undefined, { minimumFractionDigits: 2 }) : 0
   }

   function familyXarajatText() {
      let array = []
      mainInfo?.family_expenses?.map(item => {
         array.push(item?.expense)
      })
      let totalPrices = array.reduce((prev, current) => prev + current, 0)
      return totalPrices ? totalPrices.toLocaleString(undefined, { minimumFractionDigits: 2 }) : 0
   }

   function familyLoansMain() {
      let array = []
      mainInfo?.family_loans?.map(item => {
         array.push(item?.main)
      })
      let totalPrices = array.reduce((prev, current) => prev + current, 0)
      return totalPrices ? totalPrices.toLocaleString(undefined, { minimumFractionDigits: 2 }) : 0
   }

   function familyLoansMonth() {
      let array = []
      mainInfo?.family_loans?.map(item => {
         array.push(item?.monthly)
      })
      let totalPrices = array.reduce((prev, current) => prev + current, 0)
      return totalPrices ? totalPrices : 0
   }

   function clientLoansMain() {
      let array = []
      mainInfo?.loans?.map(item => {
         array.push(item?.main)
      })
      let totalPrices = array.reduce((prev, current) => prev + current, 0)
      return totalPrices ? totalPrices.toLocaleString(undefined, { minimumFractionDigits: 2 }) : 0
   }

   function clientLoansMonth() {
      let array = []
      mainInfo?.loans?.map(item => {
         array.push(item?.monthly)
      })
      let totalPrices = array.reduce((prev, current) => prev + current, 0)
      return totalPrices ? totalPrices.toLocaleString(undefined, { minimumFractionDigits: 2 }) : 0
   }

   function clientLoansMonthNumber() {
      let array = []
      mainInfo?.loans?.map(item => {
         array.push(item?.monthly)
      })
      let totalPrices = array.reduce((prev, current) => prev + current, 0)
      return totalPrices ? totalPrices : 0
   }

   function sofFun() {
      return (boshqaSumNumber() + (monthlyDaromadNumber() / 12) + biznesDaromadNumber() - (monthlyXarajatNumber() / 12) - biznesXarajatNumber())
   }

   function supplyTypes() {
      let types = []
      orderInfo?.supply_info?.map(item => {
         if (item?.type === 'gold') {
            types.push('Tilla Buyumlar Garovi')
         } else if (item?.type === 'auto') {
            types.push('Transport Vositasi Garovi')
         } else if (item?.type === 'guarrantor') {
            types.push('3 shaxs kafilligi')
         } else if (item?.type === 'insurance') {
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
         <PdfControls />
         <PdfWrapper indicator={mainInfo?.doc_date}>
            <p className='text_black_18 text_center'>Biznesni o‘rganish / Kreditga layoqatlilikni baholash varaqasi</p>
            <div className='row_div between under_line margin_top_20'>
               <p className='div_child'>Hujjat tayyorlangan sana:</p>
               <p className='div_child'>{mainInfo?.doc_date}</p>
            </div>
            <div className='row_div between under_line margin_top_10'>
               <p className='div_child'>Mijoz tekshirilgan va organilgan sana:</p>
               <p className='div_child'>{mainInfo?.mark_date}</p>
            </div>
            <div className='row_div between under_line margin_top_10'>
               <p className='div_child'>Buyurtmachining F.I.Sh:</p>
               <p className='div_child'>{mainInfo?.client?.name}</p>
            </div>
            <div className='row_div between under_line margin_top_10'>
               <p className='div_child'>Doimiy yashash manzili:</p>
               <p className='div_child'>{mainInfo?.client?.region?.name_uz} {mainInfo?.client?.district?.name_uz}, {mainInfo?.client?.address}</p>
            </div>
            {
               mainInfo?.client?.temp_address ? 
               <div className='row_div between under_line margin_top_10'>
                  <p className='div_child'>Vaqtinchalik yashash manzili:</p>
                  <p className='div_child'>{mainInfo?.client?.temp_address}</p>
               </div> : <></>
            }
            <div className='row_div between under_line margin_top_10'>
               <p className='div_child'>JSh ShIR:</p>
               <p className='div_child'>{mainInfo?.client?.pinfl}</p>
            </div>
            <div className='row_div between under_line margin_top_10'>
               <p className='div_child'>Buyurtmachining telefon raqami:</p>
               <p className='div_child'>{mainInfo?.client?.phone?.join('  ')}</p>
            </div>
            <div className='row_div between under_line margin_top_10'>
               <p className='div_child'>Kredit maqsadi:</p>
               <p className='div_child'>{mainInfo?.order?.aim}</p>
            </div>
            <div className='row_div between under_line margin_top_10'>
               <p className='div_child'>Soralayotgan kredit miqdori:</p>
               <p className='div_child'>{mainInfo?.order?.sum?.toLocaleString(undefined, { minimumFractionDigits: 2 })}</p>
            </div>

            {/* ********Part 1********* */}
            <p className='text_black_18 text_center margin_top_30'>Buyurtmachining oilaviy sharoitini organish natijalari</p>
            <p className='black_text text_center'>Birgalikda istiqomat qiluvchilar</p>
            <div className='row_div between under_line margin_top_10'>
               <p>Istiqomat qiluvchi:</p>
               <div className='row_div div_child'>
                  {
                     mainInfo?.family?.map((item, index) => {
                        return (
                           <p className='marginRight' key={index}>{index + 1}) {item}</p>
                        )
                     })
                  }
               </div>
            </div>
            <div className='row_div between under_line margin_top_10'>
               <p className='div_child'>Oila azolari bilan suhbat davomida aniqlangan muhim malumotlar:</p>
               <p className='div_child'>{mainInfo?.conversation_result}</p>
            </div>
            <p className='black_text text_center margin_top_15'>Buyurtmachining boshqa mulklari</p>
            <div className='row_div between under_line margin_top_10'>
               <p>Mulk nomi:</p>
               <div className='row_div div_child'>
                  {
                     mainInfo?.property?.map((item, index) => {
                        return (
                           <p className='marginRight' key={index}>{index + 1}) {item}</p>
                        )
                     })
                  }
               </div>
            </div>
            <div className='row_div between under_line margin_top_10'>
               <p className='div_child'>Yashash sharoiti:</p>
               <p className='div_child'>{mainInfo?.living_condition}</p>
            </div>
            <p className='text_black_18 margin_top_20 text_center'>Buyurtmachining faoliyati va daromad  manbalarini organish natijalari</p>
            <div className='row_div between under_line margin_top_10'>
               <p className='div_child'>Buyurtmachining faoliyat turi:</p>
               <p className='div_child'>{mainInfo?.activity?.type}</p>
            </div>
            <div className='row_div between under_line margin_top_10'>
               <p className='div_child'>Faoliyat manzili:</p>
               <p className='div_child'>{mainInfo?.activity?.address}</p>
            </div>
            <div className='row_div between under_line margin_top_10'>
               <p className='div_child'>Faoliyat joyi (shaxsiy / ijara / boshqa):</p>
               <p className='div_child'>{mainInfo?.activity?.owner}</p>
            </div>
            <div className='row_div between under_line margin_top_10'>
               <p className='div_child'>Ushbu sohada foliyat yuritish davomiyligi:</p>
               <p className='div_child'>{mainInfo?.activity?.duration}</p>
            </div>

            {/* ********___Boshqa___********* */}
            <p className='text_black_18 text_center margin_top_20'>Buyurtmachining daromadlari</p>
            {
               mainInfo?.other_income?.[0] ?
                  <>
                     <p className='black_text text_center'>Boshqa daromad turlari shuningdek passiv daromadlar</p>
                     <div className='margin_top_20'>
                        <div className="table_root">

                        </div>
                        <table className='single_table_pdf responsive_table'>
                           <thead className="table_header">
                              <tr>
                                 <td>№</td>
                                 <td>Daromad nomi:</td>
                                 <td>Hajmi:</td>
                                 <td>Birlik narxi:</td>
                                 <td>Qiymati:</td>
                                 <td>Oylik daromad:</td>
                                 <td>Izoh:</td>
                              </tr>
                           </thead>
                           <tbody className="table_body">
                              {
                                 mainInfo?.other_income?.map((item, index) => {
                                    return (
                                       <tr key={item?.id}>
                                          <td>{index + 1}</td>
                                          <td>{item?.name}</td>
                                          <td>{item?.volume?.toLocaleString()}</td>
                                          <td>{item?.unit_price?.toLocaleString()}</td>
                                          <td>{item?.worth?.toLocaleString()}</td>
                                          <td>{(item?.volume * item?.unit_price)?.toLocaleString()}</td>
                                          <td>{item?.comment}</td>
                                       </tr>
                                    )
                                 })
                              }
                           </tbody>
                        </table>
                        <div className='endRow margin_top_10'>
                           <p className='black_text'>Jami o'rtacha oylik daromadlari: {boshqaSum()} so`m</p>
                        </div>
                     </div>
                  </>
                  : <></>
            }

            {/******___Mavsumiy___******/}
            <div>
               {
                  monthlyDaromad() ? <>
                     <p className='black_text text_center'>Mavsumiy daromadlarning oylar bo'yicha taqsimlanishi</p>
                     <div className='margin_top_20'>
                        <table className='single_table_pdf'>
                           <tbody>
                              <tr>
                                 <td>№</td>
                                 <td>Daromad nomi:</td>
                                 <td>Yillik daromad hajmi:</td>
                              </tr>
                              {
                                 mainInfo?.seasonal_income?.map((item, index) => {
                                    return (
                                       <tr key={item?.id}>
                                          <td>{index + 1}</td>
                                          <td>{item?.name}</td>
                                          <td>{item?.income?.toLocaleString()}</td>
                                       </tr>
                                    )
                                 })
                              }
                           </tbody>
                        </table>
                     </div>
                     <div className='kl1_calendar_single'>
                        {
                           months?.map((item, index)=>{
                              return(
                                 <div className='row_div between under_line margin_top_10' key={index+5}>
                                    <p className='div_child'>{item?.name}:</p>
                                    <p className='div_child'>{(mainInfo?.monthly_income?.[item?.value])?.toLocaleString()}</p>
                                 </div>
                              )
                           })
                        }
                     </div>
                     <p className='black_text margin_top_15'>Jami: {monthlyDaromad()} so'm</p>
                  </> : <></>
               }

               {
                  monthlyXarajat() ? <>
                     <p className='black_text text_center'>Mavsumiy xarajatlarning oylar bo'yicha taqsimlanishi</p>
                     <div className='margin_top_20'>
                        <table className='single_table_pdf'>
                           <tbody>
                              <tr>
                                 <td>№</td>
                                 <td>Xarajat nomi:</td>
                                 <td>Yillik xarajat hajmi:</td>
                              </tr>
                              {
                                 mainInfo?.seasonal_expense?.map((item, index) => {
                                    return (
                                       <tr key={item?.id}>
                                          <td>{index + 1}</td>
                                          <td>{item?.name}</td>
                                          <td>{item?.expense?.toLocaleString()}</td>
                                       </tr>
                                    )
                                 })
                              }
                           </tbody>
                        </table>
                     </div>
                     <div className='kl1_calendar_single'>
                        {
                           months?.map((item, index)=>{
                              return(
                                 <div className='row_div between under_line margin_top_10' key={index+5}>
                                    <p className='div_child'>{item?.name}:</p>
                                    <p className='div_child'>{(mainInfo?.monthly_expense?.[item?.value])?.toLocaleString()}</p>
                                 </div>
                              )
                           })
                        }
                     </div>
                     <p className='black_text margin_top_15'>Jami: {monthlyXarajat()} so'm</p>
                  </> : <></>
               }
            </div>

            {/******___Biznes___******/}
            <div>
               {
                  mainInfo?.business_incomes?.length != 0 ?
                     <>
                        <p className='black_text text_center'>Biznes daromadlar turi</p>
                        <div className='margin_top_20'>
                           <table className='single_table_pdf'>
                              <tbody>
                                 <tr>
                                    <td>№</td>
                                    <td>Daromad nomi:</td>
                                    <td>Oylik hajmi:</td>
                                    <td>Birlik o'rtacha narxi:</td>
                                    <td>O'rtacha ustamasi % da:</td>
                                    <td>Bir oylik daromad:</td>
                                    <td>Izoh:</td>
                                 </tr>
                                 {
                                    mainInfo?.business_incomes?.map((item, index) => {
                                       return (
                                          <tr key={item?.id}>
                                             <td>{index + 1}</td>
                                             <td>{item?.name}</td>
                                             <td>{item?.monthly_volume}</td>
                                             <td>{item?.unit_price}</td>
                                             <td>{item?.average_price}</td>
                                             <td>{item?.monthly_income}</td>
                                             <td>{item?.comment}</td>
                                          </tr>
                                       )
                                    })
                                 }
                              </tbody>
                           </table>
                           <div className='endRow margin_top_10'>
                              <p className='black_text'>Jami: {biznesDaromad()} so'm</p>
                           </div>
                        </div>
                     </> : <></>
               }
               {
                  mainInfo?.business_expenses?.length != 0 ? <>
                     <p className='black_text text_center'>Biznes uchun xarajatlar</p>
                     <div className='margin_top_20'>
                        <table className='single_table_pdf'>
                           <tbody>
                              <tr>
                                 <td>№</td>
                                 <td>Xarajat nomi:</td>
                                 <td>Oylik hajmi:</td>
                                 <td>Narxi:</td>
                                 <td>Qiymati:</td>
                                 <td>O'rtacha oylik xarajat:</td>
                                 <td>Izoh:</td>
                              </tr>
                              {
                                 mainInfo?.business_expenses?.map((item, index) => {
                                    return (
                                       <tr key={item?.id}>
                                          <td>{index + 1}</td>
                                          <td>{item?.name}</td>
                                          <td>{item?.volume}</td>
                                          <td>{item?.price}</td>
                                          <td>{item?.value}</td>
                                          <td>{item?.average_monthly_expense}</td>
                                          <td>{item?.comment}</td>
                                       </tr>
                                    )
                                 })
                              }
                           </tbody>
                        </table>
                        <div className='endRow margin_top_10'>
                           <p className='black_text'>Jami: {biznesXarajat()} so'm</p>
                        </div>
                     </div>
                  </> : <></>
               }
            </div>

            {/******___6-Qism___******/}
            <div>
               {
                  mainInfo?.family_incomes?.length != 0 ? <>
                     <p className='black_text text_center'>Oila azolarining daromadlar , shuningdek uy xojaligining boshqa daromadlari</p>
                     <div className='margin_top_20'>
                        <table className='single_table_pdf'>
                           <tbody>
                              <tr>
                                 <td>№</td>
                                 <td>Daromad Egasi:</td>
                                 <td>Faoliyat Turi:</td>
                                 <td>Faoliyat Joyi:</td>
                                 <td>Bir oylik daromad:</td>
                                 <td>Izoh:</td>
                              </tr>
                              {
                                 mainInfo?.family_incomes?.map((item, index) => {
                                    return (
                                       <tr key={item?.id}>
                                          <td>{index + 1}</td>
                                          <td>{item?.name}</td>
                                          <td>{item?.activity_type}</td>
                                          <td>{item?.activity_address}</td>
                                          <td>{item?.monthly_income}</td>
                                          <td>{item?.comment}</td>
                                       </tr>
                                    )
                                 })
                              }
                           </tbody>
                        </table>
                        <div className='endRow margin_top_10'>
                           <p className='black_text'>Jami: {familyDaromadText()} so'm</p>
                        </div>
                     </div>
                  </> : <></>
               }
               {
                  mainInfo?.family_expenses?.length != 0 ? <>
                     <p className='black_text text_center'>Uy xojaligining xarajatlari</p>
                     <div className='margin_top_20'>
                        <table className='single_table_pdf'>
                           <tbody>
                              <tr>
                                 <td>№</td>
                                 <td>Xarajat nomi:</td>
                                 <td>Ortaja oylik xarajat:</td>
                                 <td>Izoh:</td>
                              </tr>
                              {
                                 mainInfo?.family_expenses?.map((item, index) => {
                                    return (
                                       <tr key={item?.id}>
                                          <td>{index + 1}</td>
                                          <td>{item?.name}</td>
                                          <td>{item?.expense}</td>
                                          <td>{item?.comment}</td>
                                       </tr>
                                    )
                                 })
                              }
                           </tbody>
                        </table>
                        <div className='endRow margin_top_10'>
                           <p className='black_text'>Jami: {familyXarajatText()} so'm</p>
                        </div>
                     </div>
                  </> : <></>
               }
               {
                  mainInfo?.family_loans?.length != 0 ? <>
                     <p className='black_text text_center'>Uy xojaligi azolarining mavjud kredit va qarzdorliklari togrisidagi malumotlar</p>
                     <div className='margin_top_20'>
                        <table className='single_table_pdf'>
                           <tbody>
                              <tr>
                                 <td>№</td>
                                 <td>Malumot nomi:</td>
                                 <td>Asosiy qarz qoldigi:</td>
                                 <td>Oylik tolov miqdori:</td>
                                 <td>Izoh:</td>
                              </tr>
                              {
                                 mainInfo?.family_loans?.map((item, index) => {
                                    return (
                                       <tr key={item?.id}>
                                          <td>{index + 1}</td>
                                          <td>{item?.name}</td>
                                          <td>{item?.main}</td>
                                          <td>{item?.monthly}</td>
                                          <td>{item?.comment}</td>
                                       </tr>
                                    )
                                 })
                              }
                           </tbody>
                        </table>
                     </div>
                     <div className='flex_column margin_top_10'>
                        <p className='black_text margin_bottom'>Jami asosiy qarz qoldigi: {familyLoansMain()} so`m</p>
                        <p className='black_text margin_bottom'>Jami oylik tolov miqdori: {familyLoansMonth()?.toLocaleString(undefined, { minimumFractionDigits: 2 })} so`m</p>
                     </div>
                  </> : <></>
               }
               {
                  mainInfo?.family_expenses?.length != 0 ? <>
                     <p className={(familyDaromad() - familyXarajat() - familyLoansMonth()) > 0 ? 'text_black_18 green_text margin_top_10' : 'text_black_18 red_text margin_top_10'}>Uy xojaligi byudjetining ortacha oylik ortiqcha mablagi yoki kamomadi miqdori: {(familyDaromad() - familyXarajat() - familyLoansMonth())} so`m</p>
                  </> : <></>
               }
            </div>

            {/******___7-Qism___******/}
            <div>
               {
                  mainInfo?.loans?.length != 0 ? <>
                     <p className='text_black_18 text_center margin_top_30'>Buyurtmachining mavjud kredit va qarz majburiyatlari</p>
                     <div className='margin_top_20'>
                        <table className='single_table_pdf'>
                           <tbody>
                              <tr>
                                 <td>№</td>
                                 <td>Mavjud kredit va qarzlar:</td>
                                 <td>Asosiy qarz qoldigi:</td>
                                 <td>Oylik tolov miqdori:</td>
                                 <td>Izoh:</td>
                              </tr>
                              {
                                 mainInfo?.loans?.map((item, index) => {
                                    return (
                                       <tr key={item?.id}>
                                          <td>{index + 1}</td>
                                          <td>{item?.name}</td>
                                          <td>{item?.main}</td>
                                          <td>{item?.monthly}</td>
                                          <td>{item?.comment}</td>
                                       </tr>
                                    )
                                 })
                              }
                           </tbody>
                        </table>
                     </div>
                     <div className='flex_column margin_top_15'>
                        <p className='black_text margin_bottom'>Jami asosiy qarz qoldigi: {clientLoansMain()} so`m</p>
                        <p className='black_text margin_bottom'>Jami oylik tolov miqdori: {clientLoansMonth()} so`m</p>
                        <p className='black_text '>Joiriy kreditlar boyicha qarz yuki korsatkichi: {((clientLoansMonthNumber() / sofFun()) * 100)?.toFixed(2)}%</p>
                     </div>
                  </> : <></>
               }
               <p className='text_black_18 text_center margin_top_30'>Oylik kredit tolovi ( eng katta tolov miqdori )</p>
               <div className='row_div between under_line margin_top_10'>
                  <p className='div_child'>Asosiy qarz:</p>
                  <p className='div_child'>{(kreditData?.principal_debt)?.toLocaleString(undefined, { minimumFractionDigits: 2 })}</p>
               </div>
               <div className='row_div between under_line margin_top_10'>
                  <p className='div_child'>Foizlar:</p>
                  <p className='div_child'>{(kreditData?.interest)?.toLocaleString(undefined, { minimumFractionDigits: 2 })}</p>
               </div>
               <div className='row_div between under_line margin_top_10'>
                  <p className='div_child'>Jami oylik tolov:</p>
                  <p className='div_child'>{(kreditData?.interest + kreditData?.principal_debt)?.toLocaleString(undefined, { minimumFractionDigits: 2 })}</p>
               </div>
               <div className='row_div between under_line margin_top_10'>
                  <p className='div_child'>Soralayotgan kredit hisobi qarzi yoki korsatkichi (${'< 50%'})</p>
                  <p className='div_child'>{(((kreditData?.interest + kreditData?.principal_debt + clientLoansMonthNumber()) / sofFun()) * 100).toFixed(2)}%</p>
               </div>
               <div className='row_div between under_line margin_top_10'>
                  <p className='div_child'>Kredit tarixi</p>
                  <p className='div_child'>{mainInfo?.credit_history}</p>
               </div>
            </div>

            {/******___Table___******/}
            <div>
               <div className='kl1_table'>
                  <div className='kl1_table_dark-bg'>Hulq atvori</div>
                  <div className='kl1_table_dark-bg'>Shaxsiy sifatida baholanishi</div>
                  <div className='kl1_table_dark-bg'>Moliaviy malumotlar va savodxonlik</div>
                  <div className='kl1_table_double kl1_table_noPadding'>
                     <p>Suhbat</p>
                     <p>{mainInfo?.table_conversation_result}</p>
                  </div>
                  <div className='kl1_table_double kl1_table_noPadding'>
                     <p>Uchrashuv</p>
                     <p>{mainInfo?.table_meeting_result}</p>
                  </div>
                  <div>{mainInfo?.table_financial_literacy}</div>
                  <div className='kl1_table_double kl1_table_noPadding'>
                     <p>Oylik tolov</p>
                     <p>OT/OD</p>
                  </div>
                  <div className='kl1_table_double kl1_table_dark-bg kl1_table_noPadding'>
                     <p>SD/OT</p>
                     <p>OHX</p>
                  </div>
                  <div className='kl1_table_dark-bg'>Natija</div>
                  <div className='kl1_table_double kl1_table_dark-bg kl1_table_noPadding'>
                     <p className='kl1_table_yellow-bg'>{(kreditData?.interest + kreditData?.principal_debt)?.toLocaleString(undefined, { minimumFractionDigits: 2 })}</p>
                     <p className={(((kreditData?.interest + kreditData?.principal_debt + clientLoansMonthNumber()) / sofFun()) * 100).toFixed(2) > 50 || (((kreditData?.interest + kreditData?.principal_debt + clientLoansMonthNumber()) / sofFun()) * 100).toFixed(2) < 0 ? 'kl1_table_red-bg' : 'kl1_table_green-bg'}>{(((kreditData?.interest + kreditData?.principal_debt + clientLoansMonthNumber()) / sofFun()) * 100).toFixed(2)}%</p>
                  </div>
                  <div className='kl1_table_double kl1_table_noPadding'>
                     <p className='kl1_table_yellow-bg'>{((sofFun() / (kreditData?.interest + kreditData?.principal_debt)) * 100).toFixed(2)}%</p>
                     <p className='kl1_table_yellow-bg'>{(familyXarajat() + familyLoansMonth()) ? (familyXarajat() + familyLoansMonth())?.toLocaleString(undefined, { minimumFractionDigits: 2 }) : 0}</p>
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
               <div className='row_div between under_line margin_top_10'>
                  <p className='div_child'>Ajratilgan kreditning buyurtmachi uchun tasirini baholash:</p>
                  <p className='div_child'>{mainInfo?.credit_impact}</p>
               </div>
               <div className='row_div between under_line margin_top_10'>
                  <p className='div_child'>Monitoring boyicha masul xodimning yakuniy xulosasi:</p>
                  <p className='div_child'>{mainInfo?.conclusion}</p>
               </div>
               <h4 className='margin_top_15'>Geolokatsiya koordinatalari</h4>
               <div className='row_div between under_line margin_top_10'>
                  <p className='div_child'>Kenglik:</p>
                  <p className='div_child'>{mainInfo?.geolocation?.latitude}</p>
               </div>
               <div className='row_div between under_line margin_top_10'>
                  <p className='div_child'>Uzunlik:</p>
                  <p className='div_child'>{mainInfo?.geolocation?.longitude}</p>
               </div>
               <div className='kl1_pdf_status_part margin_top_20'>
                  <p>Taqdim etilgan va toplangan malumotlar hamda kredit byurosidan olingan kredit tarixiga asoslanib men tomonimdan otkazilgan organish va tahlillar asosida ushbu buyurtma boyicha quiydagi yakuniy xulosamni kredit komissiyasida korib chiqish uchun taqdim etaman</p>
                  {
                     mainInfo?.status ?
                        <p className='text_black_18 text_center'>Kredit ajratish</p>
                        :
                        <p className='text_black_18 text_center'>Rad etish</p>
                  }
               </div>
               <div className='row_div between under_line margin_top_20'>
                  <p className='div_child black_text'>Monitoringni amalga oshirgan xodim F.I.Sh:</p>
                  <p className='div_child black_text'>{mainInfo?.user?.name}</p>
               </div>
            </div>
         </PdfWrapper>
      </div>
   )
}

export default KLPDF