import { useState, useEffect } from 'react'
import { useNavigate, Route, Routes, useLocation } from 'react-router-dom';
import { Context } from '../../context/context';
import Prev from '../../components/Prev/Prev';
import https from '../../services/https';
import Shaxshiy from './Parts/Malumot'
import Table from './Parts/Table'
import FirstKl1 from './Parts/Qism1'
import Boshqa from './Parts/Boshqa'
import Oilaviy from './Parts/Qism6'
import BuyurtmaOylik from './Parts/Qism7'
import Mavsumiy from './Parts/Mavsumiy'
import Biznes from './Parts/Biznes'


function StepperForm() {

   const defaultMembers = [
      {
         id: 1,
         name: "Dadasi",
         checked: false,
         counter: false,
      },
      {
         id: 2,
         name: "Onasi",
         checked: false,
         counter: false
      },
      {
         id: 3,
         name: "Eri",
         checked: false,
         counter: false
      },
      {
         id: 4,
         name: "Ayoli",
         checked: false,
         counter: false
      },
      {
         id: 5,
         name: "Farzandi",
         checked: false,
         counter: true,
         count: 1
      },
      {
         id: 6,
         name: "Nevarasi",
         checked: false,
         counter: true,
         count: 1
      }
   ]

   const defaultTotal = [
      {
         id: 1,
         name: "Maishiy texnika",
         checked: false,
         counter: false
      },
      {
         id: 2,
         name: "sotixli Hovli uy",
         checked: false,
         counter: true,
         count: 10
      },
      {
         id: 3,
         name: "xonali Dom",
         checked: false,
         counter: true,
         count: 2
      },
      {
         id: 4,
         name: "Oziq-ovqat do'koni",
         checked: false,
         counter: true,
         count: 1
      }
   ]

   const defaultCars = [
      {
         id: 1,
         name: "Damas",
         checked: false,
         counter: false
      },
      {
         id: 2,
         name: "Jiguli",
         checked: false,
         counter: false
      },
      {
         id: 3,
         name: "Lacetti",
         checked: false,
         counter: false
      },
      {
         id: 4,
         name: "Cobalt",
         checked: false,
         counter: false
      },
      {
         id: 5,
         name: "Nexia",
         checked: false,
         counter: false
      },
      {
         id: 6,
         name: "Matiz",
         checked: false,
         counter: false
      },
      {
         id: 7,
         name: "Spark",
         checked: false,
         counter: false
      }
   ]

   const defaultAnimals = [
      {
         id: 1,
         name: "Qo'y",
         checked: false,
         count: 15
      },
      {
         id: 2,
         name: "Tovuq",
         checked: false,
         count: 20
      },
      {
         id: 3,
         name: "Qoramol",
         checked: false,
         count: 10
      },
      {
         id: 4,
         name: "Parranda",
         checked: false,
         count: 10
      }
   ]

   const defaultMonths = {
      january: 0,
      february: 0,
      march: 0,
      april: 0,
      may: 0,
      june: 0,
      july: 0,
      august: 0,
      september: 0,
      october: 0,
      november: 0,
      december: 0
   }

   const [infoClient, setInfoClient] = useState({})
   const [infoOrder, setInfoOrder] = useState({})
   const location = useLocation()
   const orderId = location?.state?.id
   const navigate = useNavigate()

   const [activeTab, setActiveTab] = useState(1)

   // Mavsumiy Part
   const [mavsumiyWindow, setMavsumiyWindow] = useState('close')

   // Biznes Part
   const [biznesWindow, setBiznesWindow] = useState('close')

   //***** Information for all pages *****//
   // -------- Malumot
   const [dataMalumot, setDataMalumot] = useState({
      doc_date: '',
      mark_date: ''
   })
   // --------- 1 Qism -------- //
   // family
   const [familyMem, setFamilyMem] = useState([])
   const [familyMemCheck, setFamilyMemCheck] = useState(defaultMembers)
   // mulk
   const [propertyTotal, setPropertyTotal] = useState(defaultTotal)
   const [propertyCars, setPropertyCars] = useState(defaultCars)
   const [propertyAnimals, setPropertyAnimals] = useState(defaultAnimals)
   const [mulkItem, setMulkItem] = useState([])
   const [path, setPath] = useState([])

   // 1qism inputs
   const [dataFirstQism, setDataFirstQism] = useState({
      conversation_result: '',
      living_condition: "o'rtacha",
      type: '',
      address: "",
      owner: "boshqa",
      duration: ''
   })
   // -------- Boshqa -------- //
   const [myDaromads, setMyDaromads] = useState(
      [
         {
            id: 1,
            nomi: '',
            qiymati: '',
            birlikNarxi: 0,
            hajmi: 0,
            oylik: 0,
            izoh: ''
         }
      ])
   const [checkOthers, setCheckOthers] = useState(true)
   const [checkMavsumiy, setCheckMavsumiy] = useState(false)
   const [checkBiznes, setCheckBiznes] = useState(false)
   // -------- Mavsumiy -------- //
   // list of daromads
   const [mavsumiyDaromads, setMavsumiyDaromads] = useState([{
      id: 1,
      name: '',
      value: 0
   }])
   // monthly daromad
   const [monthDaromad, setMonthDaromad] = useState({ ...defaultMonths })
   // list of xarajat
   const [mavsumiyXarajats, setMavsumiyXarajats] = useState([{
      id: 1,
      name: '',
      value: 0
   }])
   // monthly xarajat
   const [monthXarajat, setMonthXarajat] = useState({ ...defaultMonths })
   // -------- Biznes -------- //
   // daromad    
   const [biznesDaromads, setBiznesDaromads] = useState([{
      id: 1,
      name: '',
      volume: 0,
      price: 0,
      percent: 0,
      plus: 0,
      commit: ''
   }])
   // xarajat
   const [biznesXarajats, setBiznesXarajats] = useState([{
      id: 1,
      name: '',
      volume: 0,
      price: 0,
      cost: 0,
      minus: 0,
      commit: ''
   }])
   // -------- 6 Qism -------- //
   // daromad
   const [familyDaromad, setFamilyDaromad] = useState([{
      id: 1,
      name: '',
      type: '',
      address: '',
      profit: 0,
      commit: ''
   }])
   // xarajat
   const [familyXarajat, setFamilyXarajat] = useState([{
      id: 1,
      name: '',
      minus: 0,
      commit: ''
   }])
   // malumot
   const [familyMalumot, setFamilyMalumot] = useState([{
      id: 1,
      name: '',
      rest: 0,
      pay: 0,
      commit: ''
   }])
   // -------- 7 Qism -------- //
   // datas
   const [familyMavjud, setFamilyMavjud] = useState([{
      id: 1,
      name: '',
      rest: 0,
      pay: 0,
      commit: ''
   }])
   // 5 input
   const [dataSeventhQism, setDataSeventhQism] = useState({
      main_debt: 0,
      procent: 0,
      month_pay: 0,
      main_procent: 0,
      credit_history: ''
   })
   // commit
   const [historyKredit, setHistoryKredit] = useState('')
   // -------- Table -------- //
   const [dataTable, setDataTable] = useState({
      credit_impact: '',
      conclusion: '',
      status: true,
      table_conversation_result: null,
      table_meeting_result: null,
      table_financial_literacy: null,
      table_personal_capital: null,
      table_income_source: null,
      table_work_stability: null,
      table_expected_growth: null
   })
   const [geoLocation, setGeoLocation] = useState({
      latitude: 0,
      longitude: 0
   })

   async function orderInfo() {
      await https
         .get(`/orders/${orderId}`)
         .then(res => {
            setInfoOrder(res?.data)

            https
               .get(`/clients/${res?.data?.client?.id}`)
               .then(res => {
                  setInfoClient(res?.data)
                  setDataFirstQism({ ...dataFirstQism, address: res?.data?.district?.name_uz })
               })
               .catch(err => {
                  console.log(err)
               })
         })
         .catch(err => {
            console.log(err)
         })
   }

   useEffect(() => {
      const handleBeforeUnload = (e) => {
         e.preventDefault();
         e.returnValue = '';
      };

      window.addEventListener('beforeunload', handleBeforeUnload);

      return () => {
         window.removeEventListener('beforeunload', handleBeforeUnload);
      };
   }, []);

   useEffect(() => {
      orderInfo()
   }, [])


   function showMavsumiy() {
      if (mavsumiyWindow == 'open') {
         return (
            <button className={activeTab == 4 ? 'stepper_tab active_tab' : 'stepper_tab'} onClick={() => { navigate("/client-marks/add/mavsumiy", { replace: true }) }}>Mavsumiy</button>
         )
      }
   }
   function showBiznes() {
      if (biznesWindow == 'open') {
         return (
            <button className={activeTab == 5 ? 'stepper_tab active_tab' : 'stepper_tab'} onClick={() => { navigate("/client-marks/add/biznes", { replace: true }) }}>Biznes</button>
         )
      }
   }

   return (
      <>
         <Prev />
         <section className='kl1'>
            <div className='kl1_title'>
               <h1>Kreditga layoqatilikni baholash varaqasi </h1>
            </div>
            <div className='stepper_table'>
               <button className={activeTab == 1 ? 'stepper_tab active_tab' : 'stepper_tab'} onClick={() => { navigate("/client-marks/add/", { replace: true }) }}>Ma'lumot</button>
               <button className={activeTab == 2 ? 'stepper_tab active_tab' : 'stepper_tab'} onClick={() => { navigate("/client-marks/add/1_qism", { replace: true }) }}>Sharoit</button>
               <button className={activeTab == 3 ? 'stepper_tab active_tab' : 'stepper_tab'} onClick={() => { navigate("/client-marks/add/boshqa", { replace: true }) }}>Boshqa</button>
               {showMavsumiy()}
               {showBiznes()}
               <button className={activeTab == 6 ? 'stepper_tab active_tab' : 'stepper_tab'} onClick={() => { navigate("/client-marks/add/6_qism", { replace: true }) }}>Oilaviy</button>
               <button className={activeTab == 7 ? 'stepper_tab active_tab' : 'stepper_tab'} onClick={() => { navigate("/client-marks/add/7_qism", { replace: true }) }}>Kredit</button>
               <button className={activeTab == 8 ? 'stepper_tab active_tab' : 'stepper_tab'} onClick={() => { navigate("/client-marks/add/table", { replace: true }) }}>Xulosa</button>
            </div>
            <div className='kl1_tabs_main'>
               <Context.Provider value={{
                  activeTab, setActiveTab,
                  mavsumiyWindow, setMavsumiyWindow,
                  biznesWindow, setBiznesWindow,
                  orderId,
                  infoClient,
                  infoOrder,
                  // Malumot
                  dataMalumot, setDataMalumot,
                  // 1-Qism
                  familyMem, setFamilyMem,
                  familyMemCheck, setFamilyMemCheck,
                  mulkItem, setMulkItem,
                  propertyTotal, setPropertyTotal,
                  propertyCars, setPropertyCars,
                  propertyAnimals, setPropertyAnimals,
                  dataFirstQism, setDataFirstQism,
                  path, setPath,
                  // Boshqa
                  myDaromads, setMyDaromads,
                  checkOthers, setCheckOthers,
                  checkMavsumiy, setCheckMavsumiy,
                  checkBiznes, setCheckBiznes,
                  // Mavsumiy
                  mavsumiyDaromads, setMavsumiyDaromads,
                  monthDaromad, setMonthDaromad,
                  mavsumiyXarajats, setMavsumiyXarajats,
                  monthXarajat, setMonthXarajat,
                  // Biznes
                  biznesDaromads, setBiznesDaromads,
                  biznesXarajats, setBiznesXarajats,
                  // 6-Qism
                  familyDaromad, setFamilyDaromad,
                  familyXarajat, setFamilyXarajat,
                  familyMalumot, setFamilyMalumot,
                  // 7-Qism
                  familyMavjud, setFamilyMavjud,
                  dataSeventhQism, setDataSeventhQism,
                  historyKredit, setHistoryKredit,
                  // Table
                  dataTable, setDataTable,
                  geoLocation, setGeoLocation
               }}>
                  <Routes>
                     <Route path='/' element={<Shaxshiy />} />
                     <Route path='/1_qism' element={<FirstKl1 />} />
                     <Route path='/boshqa' element={<Boshqa />} />
                     <Route path='/mavsumiy' element={<Mavsumiy />} />
                     <Route path='/biznes' element={<Biznes />} />
                     <Route path='/6_qism' element={<Oilaviy />} />
                     <Route path='/7_qism' element={<BuyurtmaOylik />} />
                     <Route path='/table' element={<Table />} />
                  </Routes>
               </Context.Provider>
            </div>
         </section>
      </>
   )
}

export default StepperForm