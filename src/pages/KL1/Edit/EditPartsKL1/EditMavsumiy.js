import { useContext, useEffect } from 'react'
import { AiOutlineDoubleRight, AiOutlineDoubleLeft } from 'react-icons/ai'
import { Input, createTheme } from '@nextui-org/react'
import { NumericFormat } from 'react-number-format';
import { useNavigate } from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid';
import { Context } from '../../../../context/context';

const months_uzb = ["Yanvar", "Fevral", "Mart", "Aprel", "May", "Iyun", "Iyul", "Avgust", "Sentabr", "Oktabr", "Noyabr", "Dekabr"];

function EditMavsumiy() {
   // Tab active
   const { activeTab, setActiveTab } = useContext(Context)
   const { biznesWindow, setBiznesWindow } = useContext(Context)
   const { mavsumiyDaromads, setMavsumiyDaromads } = useContext(Context)
   const { monthDaromad, setMonthDaromad } = useContext(Context)
   const { mavsumiyXarajats, setMavsumiyXarajats } = useContext(Context)
   const { monthXarajat, setMonthXarajat } = useContext(Context)
   const months = Object.keys(monthDaromad);

   useEffect(() => {
      setActiveTab(4)
   }, [])

   let navigate = useNavigate()


   function backStep() {
      navigate("/kl1/editkl1/boshqa", { replace: true });
   }

   const myDarkTheme = createTheme({
      type: 'dark',
      theme: {
         colors: {
            background: '#1d1d1d',
            text: '#fff',
            myDarkColor: 'black'
         },
         space: {},
         fonts: {}
      }
   })


   // Mavsumiy Daromads adding and deleting funtions
   function addMavsumiyDaromad() {
      let newMavsumiyDaromad = [{
         id: uuidv4(),
         name: '',
         income: 0
      }]
      setMavsumiyDaromads(mavsumiyDaromads.concat(newMavsumiyDaromad))
   }

   function deleteMavsumiyDaromad(id) {
      if (mavsumiyDaromads?.length > 1) {
         let newMavsumiyDaromads = mavsumiyDaromads?.filter((item, index) => index !== id)
         setMavsumiyDaromads(newMavsumiyDaromads)
      } else if (mavsumiyDaromads?.length === 1) {
         setMavsumiyDaromads([])
      }
   }

   const getDaromadSum = () => {
      const SumArr1 = []
      mavsumiyDaromads.map((item, index) => {
         SumArr1.push(Number(item.income))
      })
      let totalSum1 = SumArr1.reduce((prev, current) => prev + current, 0)
      return(totalSum1 ? totalSum1 : 0)
   }

   // MonthDaromad
   function monthsSum1() {
         let MonthArrSum1 = Object.values(monthDaromad);
         let totalMonth1 = 0;
         MonthArrSum1?.map(item=>{
            if(item){
               totalMonth1+=Number(item);
            }
         })

         return(totalMonth1 ? totalMonth1 : 0); 
   }

   // Mavsumiy Xarajats adding and deleting funtions
   function addMavsumiyXarajat() {
      let newMavsumiyXarajat = [{
         id: uuidv4(),
         name: '',
         expense: 0
      }]
      setMavsumiyXarajats(mavsumiyXarajats.concat(newMavsumiyXarajat))
   }

   function deleteMavsumiyXarajat(id) {
      if (mavsumiyXarajats?.length > 1) {
         let newMavsumiyXarajats = mavsumiyXarajats?.filter((item, index) => index !== id)
         setMavsumiyXarajats(newMavsumiyXarajats)
      } else if (mavsumiyXarajats?.length === 1) {
         setMavsumiyXarajats([])
      }
   }

   const getXarajatSum = () => {
      const SumArr2 = []
      mavsumiyXarajats.map((item, index) => {
         SumArr2.push(Number(item.expense))
      })
      let totalSum2 = SumArr2.reduce((prev, current) => prev + current, 0)
      return(totalSum2 ? totalSum2 : 0)
   }

   // MonthXarajat

   function monthsSum2() {
         let MonthArrSum2 = Object.values(monthXarajat);
         let totalMonth2 = 0;
         MonthArrSum2?.map(item=>{
            if(item){
               totalMonth2+=Number(item);
            }
         })
   
         return(totalMonth2 ? totalMonth2 : 0)
   }

   function nextStep() {
      if (biznesWindow == 'open') {
         navigate('/kl1/editkl1/biznes', { replace: true });
      } else {
         navigate('/kl1/editkl1/6_qism', { replace: true });
      }
   }

   function onSubmit() {
      setTimeout(() => {
         nextStep()
      }, 500)
   }

   return (
      <section>
         <p className='kl1_formtitle'>Mavsumiy daromad turi, manbasi va faoliyat joyi</p>
         {
            mavsumiyDaromads?.map((item, index) => {
               return (
                  <div className='kl1_products' key={item.id}>
                     <div className='kl1_product_title'>
                        Mavsumiy daromad {index + 1}
                        <button className='kl1_delete_button' onClick={() => { deleteMavsumiyDaromad(index) }}><i className='bx bx-trash'></i></button>
                     </div>
                     <div className='kl1_product'>
                        <Input
                           rounded
                           bordered
                           label='Daromad nomi'
                           color="secondary"
                           width='47%'
                           className='kl1_input'
                           value={mavsumiyDaromads.find(x => x.id === item.id).name}
                           onChange={(e) => {
                              const newArrayMavsumiyDaromads = [...mavsumiyDaromads]
                              newArrayMavsumiyDaromads[index].name = e.target.value
                              setMavsumiyDaromads(newArrayMavsumiyDaromads)
                           }}
                        />
                        <div className="numeric_format_input width_47">
                           <label>Yillik daromad hajmi</label>
                           <NumericFormat
                                 thousandSeparator={' '}
                                 value={mavsumiyDaromads.find(x => x.id === item.id).income}
                                 onChange={(e)=>{
                                    const changed_number = Number((e.target.value).replace(/\s/g, ''))
                                    const newArrayMavsumiyDaromads = [...mavsumiyDaromads]
                                    newArrayMavsumiyDaromads[index].income = changed_number
                                    setMavsumiyDaromads(newArrayMavsumiyDaromads)
                                 }}
                           />
                        </div>
                     </div>
                  </div>
               )
            })
         }
         <div className='kl1_product_footer'>
            <button className='kl1_add_button' onClick={() => { addMavsumiyDaromad() }}>
               Mavsumiy daromad qoshish
            </button>
            <p className='kl1_jami'>JAMI: {getDaromadSum()?.toLocaleString()} so`m</p>
         </div>
         <p className='kl1_formtitle'>Mavsumiy daromadlarning oylar bo'yicha taqsimlanishi</p>
         <div className='kl1_calendar'>
            {
               months?.map((item,index)=>{
                  return(
                        <div key={index} className="numeric_format_input width_23">
                           <label>{months_uzb[index]}</label>
                           <NumericFormat
                              thousandSeparator={' '}
                              value={monthDaromad[item]}
                              onChange={(e)=>{
                                    const changed_number = Number((e.target.value).replace(/\s/g, ''))
                                    const newMonths1 = {...monthDaromad}
                                    newMonths1[item] = changed_number
                                    setMonthDaromad(newMonths1)
                              }}
                           />
                        </div>
                  )
               })
            }
         </div>
         <div className='endRow'>
            <p className={(monthsSum1() != getDaromadSum()) ? 'text_black_18 red_text text_degree' : 'text_black_18 text_degree'}>Jami: {monthsSum1()?.toLocaleString()} so'm</p>
         </div>

         <p className='kl1_formtitle'>Mavsumiy xarajatlar</p>
         {
            mavsumiyXarajats?.map((item, index) => {
               return (
                  <div className='kl1_products' key={index}>
                     <div className='kl1_product_title'>
                        Mavsumiy xarajat {index + 1}
                        <button className='kl1_delete_button' onClick={() => { deleteMavsumiyXarajat(index) }}><i className='bx bx-trash'></i></button>
                     </div>
                     <div className='kl1_product'>
                        <Input
                           rounded
                           bordered
                           label='Xarajat nomi'
                           color="secondary"
                           width='47%'
                           className='kl1_input'
                           value={mavsumiyXarajats.find(x => x.id === item.id).name}
                           onChange={(e) => {
                              const newArrayMavsumiyXarajats = [...mavsumiyXarajats]
                              newArrayMavsumiyXarajats[index].name = e.target.value
                              setMavsumiyXarajats(newArrayMavsumiyXarajats)
                           }}
                        />
                        <div className="numeric_format_input width_47">
                           <label>Yillik xarajat hajmi</label>
                           <NumericFormat
                                 thousandSeparator={' '}
                                 value={mavsumiyXarajats.find(x => x.id === item.id).expense}
                                 onChange={(e)=>{
                                    const changed_number = Number((e.target.value).replace(/\s/g, ''))
                                    const newArrayMavsumiyXarajats = [...mavsumiyXarajats]
                                    newArrayMavsumiyXarajats[index].expense = changed_number
                                    setMavsumiyXarajats(newArrayMavsumiyXarajats)
                                 }}
                           />
                        </div>
                     </div>
                  </div>
               )
            })
         }
         <div className='kl1_product_footer'>
            <button className='kl1_add_button' onClick={() => { addMavsumiyXarajat() }}>
               Mavsumiy xarajat qoshish
            </button>
            <p className='kl1_jami'>JAMI: {getXarajatSum()?.toLocaleString()} so`m</p>
         </div>

         <p className='kl1_formtitle'>Mavsumiy xarajatlarning oylar bo'yicha taqsimlanishi</p>
         <div className='kl1_calendar'>
            {
               months?.map((item,index)=>{
                  return(
                        <div key={index} className="numeric_format_input width_23">
                           <label>{months_uzb[index]}</label>
                           <NumericFormat
                              thousandSeparator={' '}
                              value={monthXarajat[item]}
                              onChange={(e)=>{
                                    const changed_number = Number((e.target.value).replace(/\s/g, ''))
                                    const newMonths = {...monthXarajat}
                                    newMonths[item] = changed_number
                                    setMonthXarajat(newMonths)
                              }}
                           />
                        </div>
                  )
               })
            }
         </div>
         <div className='endRow'>
            <p className={(monthsSum2() != getXarajatSum()) ? 'text_black_18 red_text text_degree' : 'text_black_18 text_degree'}>Jami: {monthsSum2()?.toLocaleString()} so'm</p>
         </div>

         <p className='kl1_jami_main'>Jami o'rtacha oylik daromadlari: {(getDaromadSum()-getXarajatSum())?.toLocaleString()} so'm</p>

         <div className='step_buttons double_button'>
            <button type='button' onClick={() => { backStep() }} className='previous_button'><AiOutlineDoubleLeft /><p>Oldingi</p></button>
            <button type='submit' onClick={() => { onSubmit() }} className='step_next'><p>Keyingi</p> <AiOutlineDoubleRight /></button>
         </div>
      </section>
   )
}

export default EditMavsumiy