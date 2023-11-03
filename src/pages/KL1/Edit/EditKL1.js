import { useState, useEffect } from 'react'
import { Route, Routes, useLocation, useNavigate } from 'react-router-dom'
import { Context } from '../../../context/context'
import EditMalumot from './EditPartsKL1/EditMalumot'
import EditTable from './EditPartsKL1/EditTable'
import EditPart1 from './EditPartsKL1/EditPart1'
import EditBoshqa from './EditPartsKL1/EditBoshqa'
import EditPart6 from './EditPartsKL1/EditPart6'
import EditPart7 from './EditPartsKL1/EditPart7'
import EditMavsumiy from './EditPartsKL1/EditMavsumiy'
import EditBiznes from './EditPartsKL1/EditBiznes'
import Prev from '../../../components/Prev/Prev'
import https from '../../../services/https'

const defaultMonthly = {
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

function EditKL1() {

   const location = useLocation()
   const markId = location?.state?.id
   let navigate = useNavigate()

   const [mainInfo, setMainInfo] = useState({})
   const [infoOrder, setInfoOrder] = useState({})
   const [infoClient, setInfoClient] = useState({})
   const [contract, setContract] = useState({})

   //***** Information for all pages *****//
   // -------- Malumot
   const [dataMalumot, setDataMalumot] = useState({})
   // --------- 1 Qism -------- //
   // family
   const [familyMem, setFamilyMem] = useState([])
   // mulk
   const [mulkItem, setMulkItem] = useState([])
   const [path, setPath] = useState([])
   // 1qism inputs
   const [dataFirstQism, setDataFirstQism] = useState()
   // -------- Boshqa -------- //
   const [myDaromads, setMyDaromads] = useState([])
   const [checkOthers, setCheckOthers] = useState(true)
   const [checkMavsumiy, setCheckMavsumiy] = useState(false)
   const [checkBiznes, setCheckBiznes] = useState(false)
   // -------- Mavsumiy -------- //
   // list of daromads
   const [mavsumiyDaromads, setMavsumiyDaromads] = useState([{}])
   // monthly daromad
   const [monthDaromad, setMonthDaromad] = useState({})
   // list of xarajat
   const [mavsumiyXarajats, setMavsumiyXarajats] = useState([{}])
   // monthly xarajat
   const [monthXarajat, setMonthXarajat] = useState({})
   // -------- Biznes -------- //
   // daromad    
   const [biznesDaromads, setBiznesDaromads] = useState([{}])
   // xarajat
   const [biznesXarajats, setBiznesXarajats] = useState([{}])
   // -------- 6 Qism -------- //
   // daromad
   const [familyDaromad, setFamilyDaromad] = useState([{}])
   // xarajat
   const [familyXarajat, setFamilyXarajat] = useState([{}])
   // malumot
   const [familyMalumot, setFamilyMalumot] = useState([{}])
   // -------- 7 Qism -------- //
   // datas
   const [clientLoans, setClientLoans] = useState([{}])
   // 5 input
   const [dataSeventhQism, setDataSeventhQism] = useState({})
   // commit
   const [historyKredit, setHistoryKredit] = useState('')
   // -------- Table -------- //
   const [dataTable, setDataTable] = useState({})
   const [geoLocation, setGeoLocation] = useState({})

   // Active Tab
   const [activeTab, setActiveTab] = useState(1)

   // Mavsumiy Part
   const [mavsumiyWindow, setMavsumiyWindow] = useState('close')

   // Biznes Part
   const [biznesWindow, setBiznesWindow] = useState('close')



   async function getMainInfo() {
      await https
         .get(`/client-marks/${markId}`)
         .then(res => {
            setMainInfo(res?.data)
            console.log(res?.data)

            setInfoClient(res?.data?.client)
            setInfoOrder(res?.data?.order)

            // malumot
            setDataMalumot({
               doc_date: res?.data?.doc_date,
               mark_date: res?.data?.mark_date
            })
            // 1 Qism
            setPath(res?.data?.images)
            setFamilyMem(res?.data?.family)
            setMulkItem(res?.data?.property)
            setDataFirstQism({
               conversation_result: res?.data?.conversation_result,
               living_condition: res?.data?.living_condition,
               type: res?.data?.activity?.type,
               address: res?.data?.activity?.address,
               owner: res?.data?.activity?.owner,
               duration: res?.data?.activity?.duration
            })
            // Boshqa
            setMyDaromads(res?.data?.other_income)
            // Mavsumiy;
            setMavsumiyDaromads(res?.data?.seasonal_income)
            setMavsumiyXarajats(res?.data?.seasonal_expense)
            
            if(res?.data?.monthly_income){
               setMonthDaromad(res?.data?.monthly_income)
            }else{
               setMonthDaromad(defaultMonthly)
            }

            if(res?.data?.monthly_expense){
               setMonthXarajat(res?.data?.monthly_expense)
            }else{
               setMonthXarajat(defaultMonthly)
            }
            // Biznes
            setBiznesDaromads(res?.data?.business_incomes)
            setBiznesXarajats(res?.data?.business_expenses)
            // 6 Qism
            setFamilyDaromad(res?.data?.family_incomes)
            setFamilyXarajat(res?.data?.family_expenses)
            setFamilyMalumot(res?.data?.family_loans)
            // 7-Qism
            setClientLoans(res?.data?.loans)
            setHistoryKredit(res?.data?.credit_history)
            setContract(res?.data?.contract)
            // Table
            setDataTable({
               credit_impact: res?.data?.credit_impact,
               conclusion: res?.data?.conclusion,
               status: res?.data?.status,
               table_conversation_result: res?.data?.table_conversation_result ? res?.data?.table_conversation_result : null,
               table_meeting_result: res?.data?.table_meeting_result ? res?.data?.table_meeting_result : null,
               table_financial_literacy: res?.data?.table_financial_literacy ? res?.data?.table_financial_literacy : null,
               table_personal_capital: res?.data?.table_personal_capital ? res?.data?.table_personal_capital : null,
               table_income_source: res?.data?.table_income_source ? res?.data?.table_income_source : null,
               table_work_stability: res?.data?.table_work_stability ? res?.data?.table_work_stability : null,
               table_expected_growth: res?.data?.table_expected_growth ? res?.data?.table_expected_growth : null
            })
            setGeoLocation(res?.data?.geolocation)
            // Show Tabs
            if (res?.data?.other_income?.[0]) {
               setCheckOthers(true)
            }
            if (res?.data?.seasonal_income?.[0]) {
               setMavsumiyWindow('open')
               setCheckMavsumiy(true)
            }
            if (res?.data?.business_incomes?.[0]) {
               setBiznesWindow('open')
               setCheckBiznes(true)
            }
         })
         .catch(err => {
            console.log(err)
         })
   }

   useEffect(() => {
      getMainInfo()
   }, [])

   function showMavsumiy() {
      if (mavsumiyWindow == 'open') {
         return (
            <button className={activeTab == 4 ? 'stepper_tab active_tab' : 'stepper_tab'} onClick={() => { navigate("/client-marks/edit/mavsumiy", { replace: true }) }}>Mavsumiy</button>
         )
      }
   }
   function showBiznes() {
      if (biznesWindow == 'open') {
         return (
            <button className={activeTab == 5 ? 'stepper_tab active_tab' : 'stepper_tab'} onClick={() => { navigate("/client-marks/edit/biznes", { replace: true }) }}>Biznes</button>
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
            <div className='stepper_table edit_stepper'>
               <button className={activeTab == 1 ? 'stepper_tab active_tab' : 'stepper_tab'} onClick={() => { navigate("/client-marks/edit/", { replace: true }) }}>Ma'lumot</button>
               <button className={activeTab == 2 ? 'stepper_tab active_tab' : 'stepper_tab'} onClick={() => { navigate("/client-marks/edit/1_qism", { replace: true }) }}>Sharoit</button>
               <button className={activeTab == 3 ? 'stepper_tab active_tab' : 'stepper_tab'} onClick={() => { navigate("/client-marks/edit/boshqa", { replace: true }) }}>Boshqa</button>
               {showMavsumiy()}
               {showBiznes()}
               <button className={activeTab == 6 ? 'stepper_tab active_tab' : 'stepper_tab'} onClick={() => { navigate("/client-marks/edit/6_qism", { replace: true }) }}>Oilaviy</button>
               <button className={activeTab == 7 ? 'stepper_tab active_tab' : 'stepper_tab'} onClick={() => { navigate("/client-marks/edit/7_qism", { replace: true }) }}>Kredit</button>
               <button className={activeTab == 8 ? 'stepper_tab active_tab' : 'stepper_tab'} onClick={() => { navigate("/client-marks/edit/table", { replace: true }) }}>Xulosa</button>
            </div>
            <div className='kl1_tabs_main'>
               <Context.Provider value={{
                  activeTab, setActiveTab,
                  mavsumiyWindow, setMavsumiyWindow,
                  biznesWindow, setBiznesWindow,
                  mainInfo,
                  infoClient,
                  infoOrder,
                  // Malumot
                  dataMalumot, setDataMalumot,
                  // 1-Qism
                  familyMem, setFamilyMem,
                  mulkItem, setMulkItem,
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
                  clientLoans, setClientLoans,
                  dataSeventhQism, setDataSeventhQism,
                  historyKredit, setHistoryKredit,
                  contract, setContract,
                  // Table
                  dataTable, setDataTable,
                  geoLocation, setGeoLocation
               }}>
                  <Routes>
                     <Route path='/' element={<EditMalumot />} />
                     <Route path='/1_qism' element={<EditPart1 />} />
                     <Route path='/boshqa' element={<EditBoshqa />} />
                     <Route path='/mavsumiy' element={<EditMavsumiy />} />
                     <Route path='/biznes' element={<EditBiznes />} />
                     <Route path='/6_qism' element={<EditPart6 />} />
                     <Route path='/7_qism' element={<EditPart7 />} />
                     <Route path='/table' element={<EditTable />} />
                  </Routes>
               </Context.Provider>
            </div>
         </section>
      </>
   )
}

export default EditKL1