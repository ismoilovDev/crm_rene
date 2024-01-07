import React, { useState, useContext, useEffect } from 'react'
import { YMaps, Map, Placemark } from '@pbe/react-yandex-maps';
import { Textarea, Radio, Input } from '@nextui-org/react'
import { AiOutlineDoubleLeft } from 'react-icons/ai'
import { NumericFormat } from 'react-number-format'
import { useNavigate } from 'react-router-dom';
import { useForm } from "react-hook-form";
import https from '../../../services/https';
import { Context } from '../../../context/context';
import { alert, warning } from '../../../components/Alert/alert';
import { nextMonth } from '../../../utils/functions/nextMonth';
import LoaderBackdrop from '../../../components/Loader/LoaderBackdrop';
import { typesSupply } from '../../../utils/functions/supplyTypes';

const userID = window.localStorage.getItem('user_id')

function Table() {
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
      infoClient, infoOrder,
      // malumot
      dataMalumot,
      // 1 Qism
      familyMem, familyMemCheck, mulkItem, dataFirstQism, path,
      propertyTotal, propertyCars, propertyAnimals,
      // Boshqa 
      myDaromads, checkMavsumiy,
      // Mavsumiy
      monthDaromad,
      monthXarajat,
      mavsumiyDaromads, mavsumiyXarajats,
      // Biznes
      biznesDaromads, biznesXarajats,
      // 6 Qism
      familyDaromad, familyXarajat, familyMalumot,
      // 7 Qism
      familyMavjud, historyKredit,
      // Table
      geoLocation, setGeoLocation
   } = useContext(Context)

   const [sof, setSof] = useState(1)
   const [kreditData, setKreditData] = useState({})

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
            alert('Joylashuv aniqlanmadi', 'error')
         }
      );
   }

   // Get total price of Daromad
   const getTotalSumBoshqa = () => {
      const newSumArray = []
      myDaromads.map((item, index) => {
         newSumArray.push(item.monthly)
      })
      let totalPrices = newSumArray.reduce((prev, current) => prev + current, 0)
      return (totalPrices ? totalPrices : 0)
   }

   const GetDaromadSumMavsumiy = () => {
      const SumArr1 = []
      mavsumiyDaromads?.map((item, index) => {
         SumArr1.push(Number(item.income))
      })
      let totalSum1 = SumArr1.reduce((prev, current) => prev + current, 0)
      return (totalSum1 ? totalSum1 : 0)
   }

   const GetXarajatSumMavsumiy = () => {
      const SumArr2 = []
      mavsumiyXarajats?.map((item, index) => {
         SumArr2.push(Number(item.expense))
      })
      let totalSum2 = SumArr2.reduce((prev, current) => prev + current, 0)
      return (totalSum2 ? totalSum2 : 0)
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
      return (totalSum ? totalSum : 0)
   }

   const namunaRequest = async (info) => {
      try {
         const res = await https.post('/namuna', info)
         const { data } = res;
         setKreditData(data?.['0'])
      }
      catch (err) {
         console.log(err);
      }
   }

   useEffect(() => {
      setSof(GetSumDaromadBiznes() + getTotalSumBoshqa() + (GetDaromadSumMavsumiy()) / 12 - GetSumXarajatBiznes() - (GetXarajatSumMavsumiy()) / 12)

      const data = {
         type: +infoOrder?.type_repayment === 1 ? 'annuitet' : 'differential',
         sum: infoOrder?.sum,
         time: infoOrder?.time,
         percent: infoOrder?.percent_year,
         given_date: infoOrder?.order_date,
         first_repayment_date: nextMonth(infoOrder?.order_date)
      }

      namunaRequest(data)
   }, [])

   function ProcentNumber() {
      let pay = []
      familyMavjud?.map(item => {
         pay.push(item.monthly)
      })
      let totalPay = pay.reduce((prev, current) => Number(prev) + Number(current), 0)

      return ((((kreditData?.interest + kreditData?.principal_debt + totalPay) / sof) * 100).toFixed(2))
   }

   let navigate = useNavigate()

   function BackStep() {
      navigate("/client-marks/add/7_qism", { replace: true });
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


   const onSubmit = async () => {
      if (dataTable?.status) {
         if (ProcentNumber() > 45) {
            const result = await warning("Foiz 45%dan oshib ketdi. Bari bir KLni qo'shmoqchimisiz?")
            if (result.isDenied) {
               console.log('stop');
               return
            }
         }
      }

      setDisable(true)
      let familyMembers = []
      familyMemCheck?.map(item => {
         if (item?.checked) {
            if (item?.counter) {
               familyMembers.push(`${item?.count} ${item?.name}`)
            } else {
               familyMembers.push(item?.name)
            }
         }
      })
      familyMem?.map((item) => {
         familyMembers.push(item?.name)
      })


      let mulkCopy = []
      propertyTotal?.map(item => {
         if (item?.checked) {
            if (item?.counter) {
               mulkCopy.push(`${item?.count} ${item?.name}`)
            } else {
               mulkCopy.push(item?.name)
            }
         }
      })
      propertyCars?.map(item => {
         if (item?.checked) {
            mulkCopy.push(item?.name)
         }
      })
      propertyAnimals?.map(item => {
         if (item?.checked) {
            mulkCopy.push(`${item?.count} ${item?.name}`)
         }
      })
      mulkItem.map(item => {
         mulkCopy.push(item.name)
      })

      function mapAndFilterArray(array, callback) {
         return array?.length ? array.map(callback) : null;
      }

      const newOtherIncomes = mapAndFilterArray(myDaromads, ({ id, monthly, ...item }) => item);
      const newMavsumiyDaromads = mapAndFilterArray(mavsumiyDaromads, ({ id, ...item }) => item);
      const newMavsumiyXarajats = mapAndFilterArray(mavsumiyXarajats, ({ id, ...item }) => item);
      const newBiznesDaromads = mapAndFilterArray(biznesDaromads, ({ id, ...item }) => ({ 'type': 1, ...item }));
      const newBiznesXarajats = mapAndFilterArray(biznesXarajats, ({ id, ...item }) => ({ 'type': 1, ...item }));
      const newFamilyDaromad = mapAndFilterArray(familyDaromad, ({ id, ...item }) => item);
      const newFamilyXarajat = mapAndFilterArray(familyXarajat, ({ id, ...item }) => item);
      const newFamilyMalumot = mapAndFilterArray(familyMalumot, ({ id, ...item }) => item);
      const newLoans = mapAndFilterArray(familyMavjud, ({ id, ...item }) => item);

      let info = {
         user_id: userID,
         order_id: infoOrder?.id,
         client_id: infoClient?.id,
         doc_date: dataMalumot?.doc_date,
         mark_date: dataMalumot?.mark_date,
         family: familyMembers,
         property: mulkCopy,
         paths: path,
         geolocation: geoLocation,
         conversation_result: dataFirstQism?.conversation_result,
         living_condition: dataFirstQism?.living_condition,
         credit_impact: dataTable?.credit_impact,
         conclusion: dataTable?.conclusion,
         credit_history: historyKredit,
         table_conversation_result: dataTable?.table_conversation_result,
         table_meeting_result: dataTable?.table_meeting_result,
         table_financial_literacy: dataTable?.table_financial_literacy,
         table_personal_capital: dataTable?.table_personal_capital,
         table_income_source: dataTable?.table_income_source,
         table_work_stability: dataTable?.table_work_stability,
         table_expected_growth: dataTable?.table_expected_growth,
         status: dataTable?.status,
         activity: {
            type: dataFirstQism.type,
            address: dataFirstQism.address,
            owner: dataFirstQism.owner,
            duration: dataFirstQism.duration
         },
         other_incomes: newOtherIncomes,
         seasonal_incomes: newMavsumiyDaromads,
         seasonal_expenses: newMavsumiyXarajats,
         business_incomes: newBiznesDaromads,
         business_expenses: newBiznesXarajats,
         family_incomes: newFamilyDaromad,
         family_expenses: newFamilyXarajat,
         family_loans: newFamilyMalumot,
         loans: newLoans,
      }

      if (checkMavsumiy) {
         Object.assign(info, { monthly_income: monthDaromad, monthly_expense: monthXarajat })
      }

      https
         .post('/client-marks', info)
         .then(res => {
            console.log(info)
            console.log(res?.data)

            setTimeout(() => {
               alert("KL1 shakl qo'shildi", "success")
               setDisable(false)
            }, 500)
         })
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
               <div className='kl1_table_dark-bg'>Moliaviy ma'lumotlar va savodxonlik</div>
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
                  <p className={ProcentNumber() > 45 || ProcentNumber() < 0 ? 'kl1_table_red-bg' : 'kl1_table_green-bg'}>{ProcentNumber() ? ProcentNumber() : "..."}</p>
               </div>
               <div className='kl1_table_double kl1_table_noPadding'>
                  <p className={((sof / (kreditData?.interest + kreditData?.principal_debt)) * 100).toFixed(2) > 120 ? 'kl1_table_green-bg' : 'kl1_table_red-bg'}>{(((sof / (kreditData?.interest + kreditData?.principal_debt)) * 100).toFixed(2)) ? (((sof / (kreditData?.interest + kreditData?.principal_debt)) * 100).toFixed(2)) : "..."}%</p>
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
               <div className='kl1_table_yellow-bg'>{dataTable?.table_personal_capital ? (dataTable?.table_personal_capital / infoOrder?.sum)?.toLocaleString() : 0}%</div>
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
               <div>{SupplySum(infoOrder?.supply_info) ? typesSupply(infoOrder?.supply_info, infoOrder?.group?.id) : 'kafillik'}</div>
               <div>{SupplySum(infoOrder?.supply_info) ? SupplySum(infoOrder?.supply_info)?.toLocaleString(undefined, { minimumFractionDigits: 2 }) : infoOrder?.sum?.toLocaleString(undefined, { minimumFractionDigits: 2 })}</div>
               <div className='kl1_table_yellow-bg'>{SupplySum(infoOrder?.supply_info) ? (SupplySum(infoOrder?.supply_info) / infoOrder?.sum)?.toLocaleString(undefined, { minimumFractionDigits: 2 }) : 100}%</div>
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
               <p>Taqdim etilgan va toplangan ma'lumotlar hamda kredit byurosidan olingan kredit tarixiga asoslanib men tomonimdan otkazilgan organish va tahlillar asosida ushbu buyurtma boyicha quiydagi yakuniy xulosamni kredit komissiyasida korib chiqish uchun taqdim etaman</p>
               <Radio.Group
                  size='sm'
                  label=' '
                  value={dataTable?.status}
                  className='kl1_accepting_radio'
                  onChange={e => {
                     console.log(e)
                     let array = { ...dataTable }
                     array.status = e
                     setDataTable(array)
                  }}
               >
                  <div className='kl1_accept margin_bottom'>
                     <Radio color='success' className='radio_end' value={true}>Kredit ajratish</Radio>
                  </div>
                  <div className='kl1_accept'>
                     <Radio color='error' className='radio_end' value={false}>Rad etish</Radio>
                  </div>
               </Radio.Group>
            </div>

            <div className='step_buttons double_button'>
               <button type='button' onClick={() => { BackStep() }} className='previous_button'><AiOutlineDoubleLeft /><p>Oldingi</p></button>
               <button type='submit' disabled={disable} className={`step_next ${disable ? "disabled" : ""}`}><p>KL1 qo'shish</p></button>
            </div>

            <LoaderBackdrop disable={disable} />
         </form>
      </>
   )
}

export default Table