import { useState, useContext, useEffect, useMemo } from 'react'
import { Textarea, Radio, Input } from '@nextui-org/react'
import { useForm } from "react-hook-form";
import { AiOutlineDoubleLeft } from 'react-icons/ai'
import { useNavigate } from 'react-router-dom';
import { NumericFormat } from 'react-number-format';
import { YMaps, Map, Placemark } from '@pbe/react-yandex-maps';
import { Context } from '../../../../context/context';
import { alert } from '../../../../components/Alert/alert';
import LoaderBackdrop from '../../../../components/Loader/LoaderBackdrop';
import https from './../../../../services/https';


function EditTable() {

   const [show, setShow] = useState(false)
   const [disable, setDisable] = useState(false)

   // Tab active
   const { setActiveTab } = useContext(Context)
   const { dataTable, setDataTable } = useContext(Context)

   useEffect(() => {
      setActiveTab(8)
   }, [])
   // components
   const {
      mainInfo, infoClient, infoOrder,
      // malumot
      dataMalumot,
      // 1 Qism
      familyMem, mulkItem, dataFirstQism, path,
      // Boshqa
      myDaromads, checkOthers, checkMavsumiy, checkBiznes,
      // Mavsumiy
      monthDaromad,
      monthXarajat,
      mavsumiyDaromads, mavsumiyXarajats,
      // Biznes
      biznesDaromads, biznesXarajats,
      // 6 Qism
      familyDaromad, familyXarajat, familyMalumot,
      // 7 Qism
      clientLoans, historyKredit,
      // Table
      geoLocation, setGeoLocation
   } = useContext(Context)

   const [sof, setSof] = useState(1)
   const [kreditData, setKreditData] = useState({})
   const userID = window.localStorage.getItem('user_id')


   // Get current location ----->
   const getCurrentLocation = () => {
      navigator.geolocation.getCurrentPosition(
         position => {
            let newLocation = { ...geoLocation }
            newLocation.latitude = position?.coords?.latitude
            newLocation.longitude = position?.coords?.longitude
            setGeoLocation(newLocation)
         },
         error => {
            alert('Joylashun aniqlanmadi', 'error')
         }
      );
   }

   // Summ 
   function GetSumDaromadBiznes() {
      let newBiznesDaromad = []
      biznesDaromads.map((item, index) => {
         newBiznesDaromad.push(item.monthly_income)
      })
      let totalDaromad = newBiznesDaromad.reduce((prev, current) => Number(prev) + Number(current), 0)
      return (totalDaromad ? totalDaromad : 0)
   }

   function GetSumXarajatBiznes() {
      let newBiznesXarajat = []
      biznesXarajats.map((item, index) => {
         newBiznesXarajat.push(item.average_monthly_expense)
      })
      let totalXarajat = newBiznesXarajat.reduce((prev, current) => Number(prev) + Number(current), 0)

      return (totalXarajat ? totalXarajat : 0)
   }

   // get total price of Daromad
   const GetTotalSumBoshqa = () => {
      const newSumArray = []
      myDaromads.map((item, index) => {
         newSumArray.push(item?.volume * item?.unit_price)
      })
      let totalPrices = newSumArray.reduce((prev, current) => prev + current, 0)
      return totalPrices
   }

   const GetDaromadSumMavsumiy = () => {
      const SumArr1 = []
      mavsumiyDaromads?.map((item, index) => {
         SumArr1.push(Number(item.income))
      })
      let totalSum1 = SumArr1.reduce((prev, current) => prev + current, 0)

      return (totalSum1 / 12 ? totalSum1 / 12 : 0)
   }

   const GetXarajatSumMavsumiy = () => {
      const SumArr2 = []
      mavsumiyXarajats?.map((item, index) => {
         SumArr2.push(Number(item.expense))
      })
      let totalSum2 = SumArr2.reduce((prev, current) => prev + current, 0)

      return (totalSum2 / 12 ? totalSum2 / 12 : 0)
   }

   function GetSumXarajatQism6() {
      let xarajat = []
      familyXarajat?.map(item => {
         xarajat.push(item.expense)
      })
      let totalXarajatSum = xarajat.reduce((prev, current) => Number(prev) + Number(current), 0)

      return (totalXarajatSum ? totalXarajatSum : 0)
   }

   function GetMalumotPayQism6() {
      let malumotPay = []
      familyMalumot?.map(item => {
         malumotPay.push(item.monthly)
      })
      let totalMalumotSumPay = malumotPay.reduce((prev, current) => Number(prev) + Number(current), 0)

      return (totalMalumotSumPay ? totalMalumotSumPay : 0)
   }

   function GetClientLoans() {
      let loans = []
      clientLoans?.map(item => {
         loans.push(item.monthly)
      })
      let totalSumPay = loans.reduce((prev, current) => Number(prev) + Number(current), 0)

      return (totalSumPay ? totalSumPay : 0)
   }

   function SupplyTypes(supply) {
      let types = []
      supply?.map(item => {
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

   function SupplySum(supply) {
      let summ = []
      supply?.map(item => {
         if (item?.type === "insurance") {
            summ.push(item?.insurance?.sum)
         } else {
            summ.push(item?.sum)
         }
      })
      let totalSum = summ.reduce((prev, current) => prev + current, 0)
      return totalSum ? totalSum : 0
   }

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

   useEffect(() => {
      setSof(GetSumDaromadBiznes() + GetTotalSumBoshqa() + GetDaromadSumMavsumiy() - GetSumXarajatBiznes() - GetXarajatSumMavsumiy())

      const data = {
         type: infoOrder?.type_repayment === 1 ? 'annuitet' : 'differential',
         sum: infoOrder?.sum,
         time: infoOrder?.time,
         percent: infoOrder?.percent_year,
         given_date: infoOrder?.contract ? infoOrder?.contract?.contract_issue_date : infoOrder?.order_date,
         first_repayment_date: infoOrder?.contract ? infoOrder?.contract?.first_repayment_date : infoOrder?.order_date
      }

      if(infoOrder?.contract?.id){
         getPaymentClear(infoOrder?.id)
      }else{
         namunaRequest(data)   
      }
   }, [])

   function ProcentNumber() {
      let pay = []
      clientLoans?.map(item => {
         pay.push(item.monthly)
      })
      let totalPay = pay.reduce((prev, current) => Number(prev) + Number(current), 0)
      return ((((kreditData?.interest + kreditData?.principal_debt + totalPay) / sof) * 100).toFixed(2))
   }

   let navigate = useNavigate()

   function BackStep() {
      navigate("/kl1/editkl1/7_qism", { replace: true });
   }

   // UseForm
   const { register,
      handleSubmit,
      watch,
      formState: { errors, isValid }
   } = useForm();

   // Location
   const defaultState = {
      center: [geoLocation?.latitude, geoLocation?.longitude],
      zoom: 14,
   };
   function Location() {
      if (geoLocation?.latitude && geoLocation?.longitude) {
         return (
            <div className='location_field'>
               <YMaps>
                  <Map defaultState={defaultState}>
                     <Placemark geometry={[geoLocation?.latitude, geoLocation?.longitude]} />
                  </Map>
               </YMaps>
            </div>
         )
      } else {
         return (<></>)
      }
   }

   async function PostFirst(dataBase) {
      await https
         .post(`/activities`, dataBase)
         .then(res => {
            console.log(res)
         })
         .catch(err => {
            console.log(err)
            return (alert(err?.response?.data?.message, 'error'))
         })
   }
   async function PostBoshqa(firstItem) {
      await https
         .post(`/other-income`, firstItem)
         .then(res => {
            console.log(res);
         })
         .catch(err => {
            console.log(err)
            return (alert(err?.response?.data?.message, 'error'))
         })
   }

   async function PostMavsumiyDaromad(Item) {
      await https
         .post('/seasonal-income', Item)
         .then(res => {
            console.log(res)
         })
         .catch(err => {
            console.log(err)
            return (alert(err?.response?.data?.message, 'error'))
         })
   }

   async function PostMavsumiyXarajat(Item) {
      await https
         .post('/seasonal-expense', Item)
         .then(res => {
            console.log(res)
         })
         .catch(err => {
            console.log(err)
            return (alert(err?.response?.data?.message, 'error'))
         })
   }

   async function PostBiznes(biznesPlusItem) {
      await https
         .post(`/business-incomes`, biznesPlusItem)
         .then(res => {
            console.log(res)
         })
         .catch(err => {
            console.log(err)
            return (alert(err?.response?.data?.message, 'error'))
         })
   }

   async function PostBiznesMinus(biznesMinusItem) {
      await https
         .post(`/business-expenses`, biznesMinusItem)
         .then(res => {
            console.log(res)
         })
         .catch(err => {
            console.log(err)
            return (alert(err?.response?.data?.message, 'error'))
         })
   }

   async function PostFamily(familyPlusItem) {
      await https
         .post(`/family-incomes`, familyPlusItem)
         .then(res => {
            console.log(res)
         })
         .catch(err => {
            console.log(err)
            return (alert(err?.response?.data?.message, 'error'))
         })
   }

   async function PostFamilyMinus(familyMinusItem) {
      await https
         .post(`/family-expenses`, familyMinusItem)
         .then(res => {
            console.log(res)
         })
         .catch(err => {
            console.log(err)
            return (alert(err?.response?.data?.message, 'error'))
         })
   }

   async function PostFamilyKredit(familyKreditItem) {
      await https
         .post(`/family-loans`, familyKreditItem)
         .then(res => {
            console.log(res)
         })
         .catch(err => {
            console.log(err)
            return (alert(err?.response?.data?.message, 'error'))
         })
   }

   async function PostClientKredit(clientKreditItem) {
      await https
         .post(`/loans`, clientKreditItem)
         .then(res => {
            console.log(res)
         })
         .catch(err => {
            console.log(err)
            return (alert(err?.response?.data?.message, 'error'))
         })
   }

   const onSubmit = (data) => {
      setDisable(true)

      let info = {
         user_id: userID,
         order_id: infoOrder?.id,
         client_id: infoClient?.id,
         doc_date: dataMalumot?.doc_date,
         mark_date: dataMalumot?.mark_date,
         family: familyMem,
         property: mulkItem,
         paths: path,
         geolocation: geoLocation,
         conversation_result: dataFirstQism?.conversation_result,
         living_condition: dataFirstQism?.living_condition,
         credit_impact: dataTable?.credit_impact,
         conclusion: dataTable?.conclusion,
         credit_history: historyKredit,
         status: dataTable?.status,
         monthly_income: monthDaromad,
         monthly_expense: monthXarajat,
         table_conversation_result: dataTable?.table_conversation_result,
         table_meeting_result: dataTable?.table_meeting_result,
         table_financial_literacy: dataTable?.table_financial_literacy,
         table_personal_capital: dataTable?.table_personal_capital,
         table_income_source: dataTable?.table_income_source,
         table_work_stability: dataTable?.table_work_stability,
         table_expected_growth: dataTable?.table_expected_growth
      }

      https
         .patch(`/client-marks/${mainInfo?.id}`, info)
         .then(res => {
            console.log(info)
            console.log(res)

            // 1 Qism
            let dataBase = {
               type: dataFirstQism.type,
               address: dataFirstQism.address,
               owner: dataFirstQism.owner,
               duration: dataFirstQism.duration,
               client_mark_id: mainInfo?.id
            }
            PostFirst(dataBase)

            // Boshqa
            if (checkOthers) {
               myDaromads?.map(item => {
                  delete item?.id
               })
               let newObject = {
                  client_mark_id: mainInfo?.id,
                  other_income: myDaromads
               }
               PostBoshqa(newObject)
            }

            // Mavsumiy
            if (checkMavsumiy) {
               mavsumiyDaromads?.map(item => {
                  delete item?.id
               })
               let newObject = {
                  client_mark_id: mainInfo?.id,
                  seasonal_income: mavsumiyDaromads
               }
               PostMavsumiyDaromad(newObject)

               mavsumiyXarajats?.map(item => {
                  delete item?.id
               })
               let newObject2 = {
                  client_mark_id: mainInfo?.id,
                  seasonal_expense: mavsumiyXarajats
               }
               PostMavsumiyXarajat(newObject2)
            }

            // Biznes
            if (checkBiznes) {
               biznesDaromads?.map((item, index) => {
                  delete item?.id
                  biznesDaromads[index] = {...item, type:1}
               })
               let newObject = {
                  client_mark_id: mainInfo?.id,
                  business_income: biznesDaromads
               }
               PostBiznes(newObject)

               biznesXarajats?.map((item,index) => {
                  delete item?.id
                  biznesXarajats[index] = {...item, type:1}
               })
               let newObject2 = {
                  client_mark_id: mainInfo?.id,
                  business_expense: biznesXarajats
               }
               PostBiznesMinus(newObject2)
            }

            // 6 Qism
            if (familyDaromad?.length != 0) {
               familyDaromad.map(item => {
                  delete item?.id
               })
               let newObject = {
                  client_mark_id: mainInfo?.id,
                  family_income: familyDaromad
               }
               PostFamily(newObject)
            }

            if (familyXarajat?.length != 0) {
               familyXarajat.map(item => {
                  delete item?.id
               })
               let newObject = {
                  client_mark_id: mainInfo?.id,
                  family_expense: familyXarajat
               }
               PostFamilyMinus(newObject)
            }

            if (familyMalumot?.length != 0) {
               familyMalumot.map(item => {
                  delete item?.id
               })
               let newObject = {
                  client_mark_id: mainInfo?.id,
                  family_loans: familyMalumot
               }
               PostFamilyKredit(newObject)
            }

            if (clientLoans?.length != 0) {
               clientLoans.map(item => {
                  delete item?.id
               })
               let newObject = {
                  client_mark_id: mainInfo?.id,
                  loans: clientLoans
               }
               PostClientKredit(newObject)
            }

            alert("KL1 shakl qo'shildi", 'success')
            setDisable(false)
         }
         )
         .catch(err => {
            console.log(err)
            setDisable(false)
            return (alert(err?.response?.data?.message, 'error'))
         })

   }

   return (
      <>
         <form onSubmit={handleSubmit(onSubmit)}>
            <div className='kl1_table'>
               <div className='kl1_table_dark-bg'>Hulq atvori</div>
               <div className='kl1_table_dark-bg'>Shaxsiy sifatida baholanishi</div>
               <div className='kl1_table_dark-bg'>Moliaviy malumotlar va savodxonlik</div>
               <div className='kl1_table_double kl1_table_noPadding'>
                  <p>сухбат</p>
                  <div className='kl1_table_inputs'>
                     <input
                        value={dataTable?.table_conversation_result}
                        onChange={(e) => {
                           let array = { ...dataTable }
                           array.table_conversation_result = e.target.value
                           setDataTable(array)
                        }}
                     />
                  </div>
               </div>
               <div className='kl1_table_double kl1_table_noPadding'>
                  <p>учрашув</p>
                  <div className='kl1_table_inputs'>
                     <input
                        value={dataTable?.table_meeting_result}
                        onChange={(e) => {
                           let array = { ...dataTable }
                           array.table_meeting_result = e.target.value
                           setDataTable(array)
                        }}
                     />
                  </div>
               </div>
               <div className='kl1_table_inputs'>
                  <input
                     value={dataTable?.table_financial_literacy}
                     onChange={(e) => {
                        let array = { ...dataTable }
                        array.table_financial_literacy = e.target.value
                        setDataTable(array)
                     }}
                  />
               </div>
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
                  <p className='kl1_table_yellow-bg'>{(kreditData?.interest + kreditData?.principal_debt)?.toLocaleString()}</p>
                  <p className={ProcentNumber() > 50 ? 'kl1_table_red-bg' : 'kl1_table_green-bg'}>{ProcentNumber()}</p>
               </div>
               <div className='kl1_table_double kl1_table_noPadding'>
                  <p className={((sof / (kreditData?.interest + kreditData?.principal_debt)) * 100).toFixed(2) > 120 ? 'kl1_table_green-bg' : 'kl1_table_red-bg'}>{((sof / (kreditData?.interest + kreditData?.principal_debt)) * 100).toFixed(2)}%</p>
                  <p className='kl1_table_yellow-bg'>{(GetSumXarajatQism6() + GetMalumotPayQism6()) ? (GetSumXarajatQism6() + GetMalumotPayQism6())?.toLocaleString() : 0}</p>
               </div>
               <div className='kl1_table_yellow-bg'> {`<= 50% и >= 120%`}</div>
               <div className='kl1_table_dark-bg'>Shaxsiy kapital miqdori</div>
               <div className='kl1_table_dark-bg'>Shaxsiy kapital/kreditlar</div>
               <div className='kl1_table_dark-bg'>Natija</div>
               <div className='kl1_table_inputs'>
                  <NumericFormat
                     thousandSeparator={' '}
                     value={dataTable?.table_personal_capital}
                     onChange={(e) => {
                        const changed_number = Number((e.target.value).replace(/\s/g, ''))
                        const array = { ...dataTable }
                        array.table_personal_capital = changed_number
                        setDataTable(array)
                     }}
                  />
               </div>
               <div className='kl1_table_yellow-bg'>{dataTable?.table_personal_capital ? (dataTable?.table_personal_capital * 100 / infoOrder?.sum)?.toFixed(0) : 0}%</div>
               <div className='kl1_table_yellow-bg'>50</div>
               <div className='kl1_table_dark-bg'>Daromad manbai</div>
               <div className='kl1_table_dark-bg'>Faoliyat barqarorligi</div>
               <div className='kl1_table_dark-bg'>Kutilayotgan rivojlanish</div>
               <div className='kl1_table_inputs kl1_table_input_padding'>
                  <input
                     value={dataTable?.table_income_source}
                     onChange={(e) => {
                        let array = { ...dataTable }
                        array.table_income_source = e.target.value
                        setDataTable(array)
                     }}
                  />
               </div>
               <div className='kl1_table_inputs kl1_table_input_padding'>
                  <input
                     value={dataTable?.table_work_stability}
                     onChange={(e) => {
                        let array = { ...dataTable }
                        array.table_work_stability = e.target.value
                        setDataTable(array)
                     }}
                  />
               </div>
               <div className='kl1_table_inputs kl1_table_input_padding'>
                  <input
                     value={dataTable?.table_expected_growth}
                     onChange={(e) => {
                        let array = { ...dataTable }
                        array.table_expected_growth = e.target.value
                        setDataTable(array)
                     }}
                  />
               </div>
               <div className='kl1_table_dark-bg'>Taminot turi</div>
               <div className='kl1_table_dark-bg'>Taminot qiymati</div>
               <div className='kl1_table_dark-bg'>Kreditni qoplash koeffitsenti</div>
               <div>{SupplySum(infoOrder?.supply_info) ? SupplyTypes(infoOrder?.supply_info) : 'kafillik'}</div>
               <div>{SupplySum(infoOrder?.supply_info) ? SupplySum(infoOrder?.supply_info)?.toLocaleString(undefined, { minimumFractionDigits: 2 }) : infoOrder?.sum?.toLocaleString(undefined, { minimumFractionDigits: 2 })}</div>
               <div className='kl1_table_yellow-bg'>{infoOrder?.supply_info?.length !== 0 ? (SupplySum(infoOrder?.supply_info) * 100 / infoOrder?.sum)?.toFixed(0)?.toLocaleString(undefined, { minimumFractionDigits: 2 }) : 100}%</div>
            </div>
            <Textarea
               width='100%'
               bordered
               rounded
               color="secondary"
               className='kl1_input'
               label='Ajratilgan kreditning buyurtmachi uchun tasirini baholash'
               value={dataTable?.credit_impact}
               {...register("credit_impact", { required: false })}
               onChange={(e) => {
                  let array = { ...dataTable }
                  array.credit_impact = e.target.value
                  setDataTable(array)
               }}
            />
            <Textarea
               width='100%'
               bordered
               rounded
               color="secondary"
               className='kl1_input'
               label='Monitoring boyicha masul xodimning yakuniy xulosasi'
               value={dataTable?.conclusion}
               {...register("conclusion", { required: false })}
               onChange={(e) => {
                  let array = { ...dataTable }
                  array.conclusion = e.target.value
                  setDataTable(array)
               }}
            />
            <Input
               rounded
               bordered
               label='Kenglik'
               color="secondary"
               width='100%'
               className='kl1_input'
               value={geoLocation?.latitude}
               {...register("location.latitude", { required: false })}
               onChange={(e) => {
                  let newLocation = { ...geoLocation }
                  newLocation.latitude = e.target.value
                  setGeoLocation(newLocation)
               }}
            />
            <Input
               rounded
               bordered
               label='Uzunlik'
               color="secondary"
               width='100%'
               className='kl1_input'
               value={geoLocation?.longitude}
               {...register("location.longitude", { required: false })}
               onChange={(e) => {
                  let newLocation = { ...geoLocation }
                  newLocation.longitude = e.target.value
                  setGeoLocation(newLocation)
               }}
            />
            <div className="geolocation_btns">
               <button type='button' className='location_button margin_right_20' onClick={() => { setShow(!show) }}>Kartada ko'rish</button>
               <button type='button' className='location_button' onClick={() => getCurrentLocation()}>Joriy joylashuv</button>
            </div>
            {
               show ? Location() : <></>
            }
            <div className='kl1_accepting'>
               <p>Taqdim etilgan va toplangan malumotlar hamda kredit byurosidan olingan kredit tarixiga asoslanib men tomonimdan otkazilgan organish va tahlillar asosida ushbu buyurtma boyicha quiydagi yakuniy xulosamni kredit komissiyasida korib chiqish uchun taqdim etaman</p>
               <Radio.Group label=' ' defaultValue={dataTable?.status === 1 ? true : false} value={dataTable?.status === 1 ? true : false} size='sm' className='kl1_accepting_radio'
                  onChange={(e) => {
                     let array = { ...dataTable }
                     array.status = e
                     setDataTable(array)
                  }}
               >
                  <div className='kl1_accept margin_bottom'><Radio color='success' className='radio_end' value={true}>Kredit ajratish</Radio></div>
                  <div className='kl1_accept'><Radio color='error' className='radio_end' value={false}>Rad etish</Radio></div>
               </Radio.Group>
            </div>

            <div className='step_buttons double_button'>
               <button type='button' onClick={() => { BackStep() }} className='previous_button'><AiOutlineDoubleLeft /><p>Oldingi</p></button>
               <button type='submit' disabled={disable} className={`step_next ${disable ? "disabled" : ""}`}><p>KL1 o'zgartish</p></button>
            </div>

            <LoaderBackdrop disable={disable} />
         </form>
      </>
   )
}

export default EditTable