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
         newBiznesDaromad.push(item.plus)
      })
      let totalDaromad = newBiznesDaromad.reduce((prev, current) => Number(prev) + Number(current), 0)
      return (totalDaromad ? totalDaromad : 0)
   }

   function GetSumXarajatBiznes() {
      let newBiznesXarajat = []
      biznesXarajats.map((item, index) => {
         newBiznesXarajat.push(item.minus)
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
            alert('Joylashun aniqlanmadi', 'error')
         }
      );
   }

   // Get total price of Daromad
   const getTotalSumBoshqa = () => {
      const newSumArray = []
      myDaromads.map((item, index) => {
         newSumArray.push(item.oylik)
      })
      let totalPrices = newSumArray.reduce((prev, current) => prev + current, 0)
      return (totalPrices ? totalPrices : 0)
   }

   const GetDaromadSumMavsumiy = () => {
      const SumArr1 = []
      mavsumiyDaromads?.map((item, index) => {
         SumArr1.push(Number(item.value))
      })
      let totalSum1 = SumArr1.reduce((prev, current) => prev + current, 0)
      return (totalSum1 ? totalSum1 : 0)
   }

   const GetXarajatSumMavsumiy = () => {
      const SumArr2 = []
      mavsumiyXarajats?.map((item, index) => {
         SumArr2.push(Number(item.value))
      })
      let totalSum2 = SumArr2.reduce((prev, current) => prev + current, 0)
      return (totalSum2 ? totalSum2 : 0)
   }

   function GetSumXarajatQism6() {
      let xarajat = []
      familyXarajat?.map(item => {
         xarajat.push(item.minus)
      })
      let totalXarajatSum = xarajat.reduce((prev, current) => Number(prev) + Number(current), 0)
      return (totalXarajatSum ? totalXarajatSum : 0)
   }
   function GetMalumotPayQism6() {
      let malumotPay = []
      familyMalumot?.map(item => {
         malumotPay.push(item.pay)
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
         given_date: infoOrder?.contract ? infoOrder?.contract?.contract_issue_date : infoOrder?.order_date,
         first_repayment_date: infoOrder?.contract ? infoOrder?.contract?.first_repayment_date : nextMonth(infoOrder?.order_date)
      }

      namunaRequest(data)
   }, [])

   function ProcentNumber() {
      let pay = []
      familyMavjud?.map(item => {
         pay.push(item.pay)
      })
      let totalPay = pay.reduce((prev, current) => Number(prev) + Number(current), 0)

      return ((((kreditData?.interest + kreditData?.principal_debt + totalPay) / sof) * 100).toFixed(2))
   }

   let navigate = useNavigate()
   function FinishStep() {
      navigate('/kl1', { replace: true });
   }
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

   async function PostFirst(dataBase) {
      await https
         .post('/activities', dataBase)
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
         .post('/other-income', firstItem)
         .then(res => {
            console.log(firstItem);
            console.log(res);
         })
         .catch(err => {
            console.log(firstItem);
            console.log(err)
            return (alert(err?.response?.data?.message, 'error'))
         })
   }

   async function PostBiznes(biznesPlusItem) {
      await https
         .post('/business-incomes', biznesPlusItem)
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
         .post('/business-expenses', biznesMinusItem)
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
         .post('/family-incomes', familyPlusItem)
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
         .post('/family-expenses', familyMinusItem)
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
         .post('/family-loans', familyKreditItem)
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
         .post('/loans', clientKreditItem)
         .then(res => {
            console.log(res)
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

   const onSubmit = async(data) => {
      if (dataTable?.status) {
         if (ProcentNumber() > 45) {
            const result = await warning("Foiz 45%dan oshib ketdi. Bari bir KLni qo'shmoqchimisiz?")
            if(result.isDenied){
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
      // Boshqa
      let newOtherIncomes = []
      myDaromads?.map(item => {
         let firstItem = {
            name: item?.nomi,
            volume: item?.hajmi,
            unit_price: item?.birlikNarxi,
            worth: item?.qiymati,
            comment: item?.izoh
         }
         newOtherIncomes.push(firstItem)
      })
      // Mavsumiy
      let newMavsumiyDaromads = []
      mavsumiyDaromads?.map(item => {
         let productItem = {
            name: item?.name,
            income: item?.value
         }
         newMavsumiyDaromads.push(productItem)
      })
      let newMavsumiyXarajats = []
      mavsumiyXarajats?.map(item => {
         let productItem = {
            name: item?.name,
            expense: item?.value
         }
         newMavsumiyXarajats.push(productItem)
      })
      // Biznes
      let newBiznesDaromads = []
      biznesDaromads?.map(item => {
         let biznesPlusItem = {
            "name": item?.name,
            "monthly_volume": item?.volume,
            "unit_price": item?.price,
            "average_price": item?.percent,
            "monthly_income": item?.plus,
            "comment": item?.commit,
            "type": 1
         }
         newBiznesDaromads.push(biznesPlusItem)
      })
      let newBiznesXarajats = []
      biznesXarajats?.map(item => {
         let biznesMinusItem = {
            "name": item?.name,
            "volume": item?.volume,
            "price": item?.price,
            "value": item?.cost,
            "average_monthly_expense": item?.minus,
            "comment": item?.commit,
            "type": 1
         }
         newBiznesXarajats.push(biznesMinusItem)
      })
      // 6-Qism
      let newFamilyDaromad = []
      familyDaromad?.map(item => {
         let familyPlusItem = {
            "name": item?.name,
            "activity_type": item?.type,
            "activity_address": item?.address,
            "monthly_income": item?.profit,
            "comment": item?.commit
         }
         newFamilyDaromad.push(familyPlusItem)
      })
      let newFamilyXarajat = []
      familyXarajat?.map(item => {
         let familyMinusItem = {
            "name": item?.name,
            "expense": item?.minus,
            "comment": item?.commit
         }
         newFamilyXarajat.push(familyMinusItem)
      })
      let newFamilyMalumot = []
      familyMalumot?.map(item => {
         let familyKreditItem = {
            "name": item?.name,
            "main": item?.rest,
            "monthly": item?.pay,
            "comment": item?.commit
         }
         newFamilyMalumot.push(familyKreditItem)
      })
      // 7-Qism
      let newLoans = []
      familyMavjud?.map(item => {
         let clientKreditItem = {
            "name": item?.name,
            "main": item?.rest,
            "monthly": item?.pay,
            "comment": item?.commit
         }
         newLoans.push(clientKreditItem)
      })

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
         // 1 Qism
         activity: {
            type: dataFirstQism.type,
            address: dataFirstQism.address,
            owner: dataFirstQism.owner,
            duration: dataFirstQism.duration
         },
         // Boshqa
         other_incomes: newOtherIncomes,
         // Mavsumiy
         seasonal_incomes: newMavsumiyDaromads,
         seasonal_expenses: newMavsumiyXarajats,
         // Biznes
         business_incomes: newBiznesDaromads,
         business_expenses: newBiznesXarajats,
         // 6-Qism
         family_incomes: newFamilyDaromad,
         family_expenses: newFamilyXarajat,
         family_loans: newFamilyMalumot,
         // 7-Qism
         loans: newLoans
      }

      if (checkMavsumiy) {
         Object.assign(info, { monthly_income: monthDaromad, monthly_expense: monthXarajat })
      }

      https
         .post('/client-marks', info)
         .then(res => {
            console.log(info)
            console.log(res?.data)

            // if (res?.data) {
               // // 1 Qism
               // let dataBase = {
               //    type: dataFirstQism.type,
               //    address: dataFirstQism.address,
               //    owner: dataFirstQism.owner,
               //    duration: dataFirstQism.duration,
               //    client_mark_id: res?.data?.id
               // }
               // console.log(dataBase);
               // PostFirst(dataBase)

               // // Boshqa
               // if (checkOthers) {
               //    let newArray = []
               //    myDaromads?.map(item => {
               //       let firstItem = {
               //          name: item?.nomi,
               //          volume: item?.hajmi,
               //          unit_price: item?.birlikNarxi,
               //          worth: item?.qiymati,
               //          comment: item?.izoh
               //       }
               //       newArray.push(firstItem)
               //    })
               //    let newObject = {
               //       client_mark_id: res?.data?.id,
               //       other_income: newArray
               //    }
               //    console.log(newObject);
               //    PostBoshqa(newObject)
               // }

               // Mavsumiy
               // if (checkMavsumiy) {
               //    let newArray = []
               //    mavsumiyDaromads?.map(item => {
               //       let productItem = {
               //          name: item?.name,
               //          income: item?.value
               //       }
               //       newArray.push(productItem)
               //    })
               //    let newObject = {
               //       client_mark_id: res?.data?.id,
               //       seasonal_income: newArray
               //    }
               //    console.log(newObject);
               //    PostMavsumiyDaromad(newObject)
               //    // \\
               //    let newArray2 = []
               //    mavsumiyXarajats?.map(item => {
               //       let productItem = {
               //          name: item?.name,
               //          expense: item?.value
               //       }
               //       newArray2.push(productItem)
               //    })
               //    let newObject2 = {
               //       client_mark_id: res?.data?.id,
               //       seasonal_expense: newArray2
               //    }
               //    console.log(newObject2);
               //    PostMavsumiyXarajat(newObject2)
               // }

               // Biznes
               // if (checkBiznes) {
               //    let newArray = []
               //    biznesDaromads?.map(item => {
               //       let biznesPlusItem = {
               //          "name": item?.name,
               //          "monthly_volume": item?.volume,
               //          "unit_price": item?.price,
               //          "average_price": item?.percent,
               //          "monthly_income": item?.plus,
               //          "comment": item?.commit,
               //          "type": 1
               //       }
               //       newArray.push(biznesPlusItem)
               //    })
               //    let newObject = {
               //       client_mark_id: res?.data?.id,
               //       business_income: newArray
               //    }
               //    console.log(newObject);
               //    PostBiznes(newObject)
               //    // \\
               //    let newArray2 = []
               //    biznesXarajats?.map(item => {
               //       let biznesMinusItem = {
               //          "name": item?.name,
               //          "volume": item?.volume,
               //          "price": item?.price,
               //          "value": item?.cost,
               //          "average_monthly_expense": item?.minus,
               //          "comment": item?.commit,
               //          "type": 1
               //       }
               //       newArray2.push(biznesMinusItem)
               //    })
               //    let newObject2 = {
               //       client_mark_id: res?.data?.id,
               //       business_expense: newArray2
               //    }
               //    console.log(newObject2);
               //    PostBiznesMinus(newObject2)
               // }

               // 6 Qism
               // if (familyDaromad[0].profit != 0) {
               //    let newArray = []
               //    familyDaromad.map(item => {
               //       let familyPlusItem = {
               //          "name": item?.name,
               //          "activity_type": item?.type,
               //          "activity_address": item?.address,
               //          "monthly_income": item?.profit,
               //          "comment": item?.commit
               //       }
               //       newArray.push(familyPlusItem)
               //    })
               //    let newObject = {
               //       client_mark_id: res?.data?.id,
               //       family_income: newArray
               //    }
               //    console.log(newObject);
               //    PostFamily(newObject)
               // }

               // if (familyXarajat[0].minus != 0) {
               //    let newArray = []
               //    familyXarajat.map(item => {
               //       let familyMinusItem = {
               //          "name": item?.name,
               //          "expense": item?.minus,
               //          "comment": item?.commit
               //       }
               //       newArray.push(familyMinusItem)
               //    })
               //    let newObject = {
               //       client_mark_id: res?.data?.id,
               //       family_expense: newArray
               //    }
               //    console.log(newObject);
               //    PostFamilyMinus(newObject)
               // }

               // if (familyMalumot[0].pay != 0) {
               //    let newArray = []
               //    familyMalumot.map(item => {
               //       let familyKreditItem = {
               //          "name": item?.name,
               //          "main": item?.rest,
               //          "monthly": item?.pay,
               //          "comment": item?.commit
               //       }
               //       newArray.push(familyKreditItem)
               //    })
               //    let newObject = {
               //       client_mark_id: res?.data?.id,
               //       family_loans: newArray
               //    }
               //    PostFamilyKredit(newObject)
               // }

               // if (familyMavjud[0].pay != 0) {
               //    let newArray = []
               //    familyMavjud.map(item => {
               //       let clientKreditItem = {
               //          "name": item?.name,
               //          "main": item?.rest,
               //          "monthly": item?.pay,
               //          "comment": item?.commit
               //       }
               //       newArray.push(clientKreditItem)
               //    })
               //    let newObject = {
               //       client_mark_id: res?.data?.id,
               //       loans: newArray
               //    }
               //    PostClientKredit(newObject)
               // }
               // }

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