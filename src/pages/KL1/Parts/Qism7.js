import { useState, useContext, useEffect } from 'react'
import { v4 as uuidv4 } from 'uuid'
import { useForm } from "react-hook-form";
import { Input, Textarea } from '@nextui-org/react'
import { AiOutlineDoubleRight, AiOutlineDoubleLeft } from 'react-icons/ai'
import { useNavigate } from 'react-router-dom';
import { NumericFormat } from 'react-number-format';
import { Context } from '../../../context/context';
import https from './../../../services/https';


function BuyurtmaOylik() {

   // Tab active
   const { activeTab, setActiveTab } = useContext(Context)
   const { familyMavjud, setFamilyMavjud } = useContext(Context)
   const { dataSeventhQism, setDataSeventhQism } = useContext(Context)
   const { historyKredit, setHistoryKredit } = useContext(Context)
   const [kreditData, setKreditData] = useState({})
   const [sof, setSof] = useState(1)
   const orderIdGet = window.localStorage.getItem('order_id')

   // Components
   const {
      // Boshqa
      myDaromads,
      // Mavsumiy
      mavsumiyDaromads, mavsumiyXarajats,
      // Biznes
      biznesDaromads, biznesXarajats,
   } = useContext(Context)

   function getSumDaromadBiznes() {
      let newBiznesDaromad = []
      biznesDaromads.map((item, index) => {
         newBiznesDaromad.push(item.plus)
      })
      let totalDaromad = newBiznesDaromad.reduce((prev, current) => Number(prev) + Number(current), 0)
      return totalDaromad
   }

   function getSumXarajatBiznes() {
      let newBiznesXarajat = []
      biznesXarajats.map((item, index) => {
         newBiznesXarajat.push(item.minus)
      })
      let totalXarajat = newBiznesXarajat.reduce((prev, current) => Number(prev) + Number(current), 0)
      return totalXarajat
   }

   // get total price of Daromad
   const getTotalSumBoshqa = () => {
      const newSumArray = []
      myDaromads.map((item, index) => {
         newSumArray.push(item.oylik)
      })
      let totalPrices = newSumArray.reduce((prev, current) => prev + current, 0)
      return totalPrices
   }

   const getDaromadSumMavsumiy = () => {
      const SumArr1 = []
      mavsumiyDaromads.map((item, index) => {
         SumArr1.push(Number(item.value))
      })
      let totalSum1 = SumArr1.reduce((prev, current) => prev + current, 0)
      return totalSum1
   }

   const getXarajatSumMavsumiy = () => {
      const SumArr2 = []
      mavsumiyXarajats.map((item, index) => {
         SumArr2.push(Number(item.value))
      })
      let totalSum2 = SumArr2.reduce((prev, current) => prev + current, 0)
      return totalSum2
   }



   // UseForm
   const { register,
      handleSubmit,
      watch,
      formState: { errors, isValid }
   } = useForm();


   useEffect(() => {

      setSof(getSumDaromadBiznes() + getTotalSumBoshqa() + (getDaromadSumMavsumiy()) / 12 - getSumXarajatBiznes() - (getXarajatSumMavsumiy()) / 12)

      let Data = new Date();
      let Year = Data.getFullYear();
      let Month = Data.getMonth() + 1;
      let Day = Data.getDate();
      let today = `${Year}-${Month}-${Day}`

      setActiveTab(7)

      https
         .get(`/orders/${orderIdGet}`)
         .then(res => {
            let data = {
               type: 'annuitet',
               sum: res?.data?.sum,
               time: res?.data?.time,
               percent: 58,
               given_date: today,
               first_repayment_date: today
            }

            if (data?.time && data?.sum && data?.type && data?.percent) {
               https
                  .post('/namuna', data)
                  .then(responsive => {
                     setKreditData(responsive?.data?.['0'])
                  })
                  .catch(error => {
                     console.log(error)
                  })
            }
         })
         .catch(error => {
            console.log(error)
            console.log(orderIdGet)
         })
   }, [])

   let navigate = useNavigate()

   function nextStep() {
      navigate('/kl1/addkl1/table', { replace: true });
   }
   function backStep() {
      navigate("/kl1/addkl1/6_qism", { replace: true });
   }


   // Family Mavjuds Adding and Deleting Functions
   function addfamMavjud() {
      let newfamilyMavjud = [{
         id: uuidv4(),
         name: '',
         rest: 0,
         pay: 0,
         commit: ''
      }]
      setFamilyMavjud(familyMavjud.concat(newfamilyMavjud))

   }
   function deletefamMavjud(id) {
      if (familyMavjud.length > 1) {
         let newfamilyMavjuds = familyMavjud.filter((famMavjud, famMavjudId) => famMavjudId !== (id))
         setFamilyMavjud(newfamilyMavjuds)
      }
   }

   function mavjudRest() {
      let rest = []
      familyMavjud?.map(item => {
         rest.push(item.rest)
      })
      let totalRest = rest.reduce((prev, current) => Number(prev) + Number(current), 0)
      return totalRest.toLocaleString()
   }

   function mavjudPay() {
      let pay = []
      familyMavjud?.map(item => {
         pay.push(item.pay)
      })
      let totalPay = pay.reduce((prev, current) => Number(prev) + Number(current), 0)

      return totalPay.toLocaleString()
   }

   function procentNumberBefore() {
      let pay = []
      familyMavjud?.map(item => {
         pay.push(item.pay)
      })
      let totalPay = pay.reduce((prev, current) => Number(prev) + Number(current), 0)

      return (((totalPay / sof) * 100).toFixed(2))
   }

   function procentNumber() {
      let pay = []
      familyMavjud?.map(item => {
         pay.push(item.pay)
      })
      let totalPay = pay.reduce((prev, current) => Number(prev) + Number(current), 0)
      return ((((kreditData?.interest + kreditData?.principal_debt + totalPay) / sof) * 100).toFixed(2))
   }



   const onSubmit = (data) => {
      setTimeout(() => {
         nextStep()
      }, 500)
   }


   return (
      <section>
         <h2 className='kl1_subtitle'>Buyurtmachining mavjud kredit va qarz majburiyatlari</h2>
         <form onSubmit={handleSubmit(onSubmit)} className='qism_7'>
            {
               familyMavjud?.map((item, index) => (
                  <div className='kl1_products' key={item.id}>
                     <div className='kl1_product_title'>
                        Mavjud malumot {index + 1}
                        <button
                           type='button'
                           className='kl1_delete_button'
                           onClick={() => deletefamMavjud(index)}
                        >
                           <i className='bx bx-trash'></i>
                        </button>
                     </div>
                     <div className='kl1_product'>
                        <Input
                           rounded
                           bordered
                           label='Mavjud kredit va qarzlar'
                           color="secondary"
                           width='31%'
                           className='kl1_input'
                           value={familyMavjud?.find(x => x.id === item.id).name}
                           onChange={(e) => {
                              let newFamilyMavjud = [...familyMavjud]
                              newFamilyMavjud[index].name = e.target.value
                              setFamilyMavjud(newFamilyMavjud)
                           }}
                        />
                        <div className="numeric_format_input width_31">
                           <label>Asosiy qarz qoldigi</label>
                           <NumericFormat
                              thousandSeparator={' '}
                              value={familyMavjud?.find(x => x.id === item.id).rest}
                              onChange={(e)=>{
                                 const changed_number = Number((e.target.value).replace(/\s/g, ''))
                                 const newFamilyMavjud = [...familyMavjud]
                                 newFamilyMavjud[index].rest = changed_number
                                 setFamilyMavjud(newFamilyMavjud)
                              }}
                           />
                        </div>
                        <div className="numeric_format_input width_31">
                           <label>Oylik tolov miqdori</label>
                           <NumericFormat
                              thousandSeparator={' '}
                              value={familyMavjud?.find(x => x.id === item.id).pay}
                              onChange={(e)=>{
                                 const changed_number = Number((e.target.value).replace(/\s/g, ''))
                                 let newFamilyMavjud = [...familyMavjud]
                                 newFamilyMavjud[index].pay = changed_number
                                 setFamilyMavjud(newFamilyMavjud)
                              }}
                           />
                        </div>
                        <Textarea
                           width='100%'
                           bordered
                           rounded
                           color="secondary"
                           className='kl1_input'
                           label='Izoh'
                           value={familyMavjud?.find(x => x.id === item.id).commit}
                           onChange={(e) => {
                              let newFamilyMavjud = [...familyMavjud]
                              newFamilyMavjud[index].commit = e.target.value
                              setFamilyMavjud(newFamilyMavjud)
                           }}
                        />
                     </div>
                  </div>
               ))
            }
            <div className='kl1_product_footer'>
               <button
                  type='button'
                  className='kl1_add_button'
                  onClick={() => { addfamMavjud() }}
               >
                  Mavjud kredit va qarz qoshish
               </button>
               <div className='flex_column'>
                  <p className='kl1_jami margin_bottom'>Jami asosiy qarz qoldigi: {mavjudRest()} so`m</p>
                  <p className='kl1_jami margin_bottom'>Jami oylik tolov miqdori: {mavjudPay()} so`m</p>
                  <p className='kl1_jami '>Joiriy kreditlar boyicha qarz yuki korsatkichi: {procentNumberBefore()}%</p>
               </div>
            </div>

            <h2 className='kl1_subtitle'>Oylik kredit tolovi ( eng katta tolov miqdori )</h2>
            {
               kreditData?.principal_debt ?
                  <div className='flex-row procent_inputs'>
                     <div className='single_buyurtma_inputs pdf_margin_top_15'>
                        <p>Asosiy qarz:</p>
                        <p>{(kreditData?.principal_debt)?.toLocaleString()}</p>
                     </div>
                     <div className='single_buyurtma_inputs pdf_margin_top_15'>
                        <p>Foizlar:</p>
                        <p>{(kreditData?.interest)?.toLocaleString()}</p>
                     </div>
                     <div className='single_buyurtma_inputs pdf_margin_top_15'>
                        <p>Jami oylik tolov:</p>
                        <p>{(kreditData?.interest + kreditData?.principal_debt)?.toLocaleString()}</p>
                     </div>
                     <div className={procentNumber() > 50 || procentNumber() < 0 ? 'single_buyurtma_inputs pdf_margin_top_15 red_text' : 'single_buyurtma_inputs pdf_margin_top_15 green_text'}>
                        <p>{`Soralayotgan kredit hisobi qarzi yoki korsatkichi (<50%)`}:</p>
                        <p>{procentNumber()}</p>
                     </div>
                  </div> :
                  <></>
            }
            <Textarea
               width='100%'
               bordered
               rounded
               color="secondary"
               className='kl1_input'
               label='Kredit tarixi'
               value={historyKredit}
               {...register("credit_history", { required: false })}
               onChange={(e) => {
                  setHistoryKredit(e.target.value)
               }}
            />
            <div className='step_buttons double_button'>
               <button type='button' onClick={() => { backStep() }} className='previous_button'><AiOutlineDoubleLeft /><p>Oldingi</p></button>
               <button type='submit' className='step_next'><p>Keyingi</p> <AiOutlineDoubleRight /></button>
            </div>
         </form>
      </section>
   )
}

export default BuyurtmaOylik