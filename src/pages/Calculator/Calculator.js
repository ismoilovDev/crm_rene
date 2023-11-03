import { useState } from 'react'
import { useForm } from "react-hook-form";
import { Input, Radio } from '@nextui-org/react';
import { AiOutlineFileAdd, AiOutlineClear } from 'react-icons/ai';
import { NumericFormat } from "react-number-format";
import Logo from '../../assets/images/Logo';
import https from '../../services/https';
import { PdfWrapper } from '../../components/Pdf/Wrapper';
import '../../pdfs/pdf.css'

function Calculator() {
   const [creditData, setCreditData] = useState({})
   const [type, setType] = useState('annuitet')
   const [percent, setPercent] = useState(58)
   const [sum, setSum] = useState(0)
   const [date, setDate] = useState(null)
   const { register, handleSubmit } = useForm()


   function getSummaText(arr, section) {
      let array = []
      arr?.map(item => {
         array.push(item[section])
      })
      let total = array.reduce((prev, current) => prev + current, 0)
      return total?.toLocaleString(undefined, { minimumFractionDigits: 2 })
   }

   function getSumma(arr, section) {
      let array = []
      arr?.map(item => {
         array.push(item[section])
      })
      let total = array.reduce((prev, current) => prev + current, 0)
      return total
   }

   function onSubmit(data) {
      let info = { ...data, type: type, percent: percent, sum: sum }
      https
         .post('/namuna', info)
         .then(res => {
            setCreditData(res?.data)
         })
         .catch(err => {
            console.log(err)
         })
   }

   return (
      <section className='page_container'>
         <div className='page_title text_center'>
            <p>Kalkulyator</p>
            <button className='print_button' onClick={() => window.print()}>Print</button>
         </div>
         <div className='calculator_container'>
            <div className='shart-selector'>
               <p>So'ndirish tartibi</p>
               <div className='margin_top_10'>
                  <Radio.Group
                     orientation="horizontal"
                     label="  "
                     size='sm'
                     defaultValue={type}
                     value={type}
                     className='shart-selector-group'
                     onChange={(event) => setType(event)}
                  >
                     <Radio value={'annuitet'}>Bir xil miqdor(Annuitet)</Radio>
                     <Radio value={'differential'}>Kamayib boruvchi(differensial)</Radio>
                  </Radio.Group>
               </div>
            </div>
            <form onSubmit={handleSubmit(onSubmit)}>
               <div className='form_inputs'>
                  <Input
                     label="Kredit sanasi"
                     className='input_field'
                     bordered
                     type='date'
                     color="secondary"
                     {...register("given_date", { required: true })}
                     onChange={(e) => {
                        setDate(e.target.value)
                     }}
                  />
                  <div className="numeric_format_input width_100 border_radius_10 without_margin taminot_tableform_input">
                     <label>So'ralayotgan qarz miqdor</label>
                     <NumericFormat
                        thousandSeparator={' '}
                        value={sum}
                        onChange={(e)=>{
                           const changed_number = Number((e.target.value).replace(/\s/g, ''))
                           setSum(changed_number)
                        }}
                     />
                  </div>
                  <Input
                     clearable
                     label="So'ralayotgan muddat (oy)"
                     className='input_field'
                     onWheel={(e) => e.target.blur()}
                     bordered
                     type='number'
                     color="secondary"
                     {...register("time", { required: true })}
                  />
                  <Input
                     clearable
                     label="Ustama foiz stavkasi, yillik"
                     className='input_field'
                     type='number'
                     onWheel={(e) => e.target.blur()}
                     value={percent}
                     bordered
                     color="secondary"
                     onChange={(e) => {
                        setPercent(e.target.value)
                     }}
                  />
                  <Input
                     label="Birinchi tolov sanasi"
                     className='input_field'
                     bordered
                     type='date'
                     color="secondary"
                     {...register("first_repayment_date", { required: true })}
                  />
               </div>
               <div className='submit-buttons'>
                  <button type='reset' className='client_submit reset' onClick={() => setCreditData([])}>
                     Formani tiklash
                     <AiOutlineClear />
                  </button>
                  <button type='submit' className='client_submit submit'>
                     Hisoblash
                     <AiOutlineFileAdd />
                  </button>
               </div>
            </form>

         </div>
         {
            creditData?.[0] ?
               <PdfWrapper indicator={creditData}>
                  <div className='b1_img'>
                     <Logo width={200} />
                  </div>
                  <p className='text_black_18 text_center margin_top_15'>Qarz to‘lovlarini qoplash jadvali</p>
                  <p className='text_black_18 text_center pdf_margin_top_5'>NAMUNASI</p>
                  <p className='main_date_texts text_center pdf_margin_top_20'>
                     <span>Kredit miqdori:</span>
                     <span>{Number(sum)?.toLocaleString(undefined, { minimumFractionDigits: 2 })} so‘m</span>
                  </p>
                  <p className='main_date_texts text_center'>
                     <span>Kredit ajratilgan sana:</span>
                     <span>{new Date(date).toLocaleDateString()}</span>
                  </p>
                  <p className='main_date_texts text_center'>
                     <span>Kreditning so'ndiirish sanasi:</span>
                     <span>{creditData?.[creditData?.length - 1]?.date_of_payment}</span>
                  </p>
                  <div className='pdf_g1_table_second pdf_margin_top_30'>
                     <div className='g1_table2_header'>
                        <p>t/r</p>
                        <p>So‘ndirish sanasi</p>
                        <p>Asosiy qarz qoldig‘i</p>
                        <p>Asosiy qarz miqdori</p>
                        <p>Foiz miqdori</p>
                        <p>Jami</p>
                     </div>
                     {
                        creditData?.map((item, index) => {
                           return (
                              <div className='g1_table2_header' key={item?.['#']}>
                                 <p>{index + 1}</p>
                                 <p>{item?.date_of_payment}</p>
                                 <p>{item?.principal_debt_left?.toLocaleString(undefined, { minimumFractionDigits: 2 })} so'm</p>
                                 <p>{item?.principal_debt?.toLocaleString(undefined, { minimumFractionDigits: 2 })} so'm</p>
                                 <p>{item?.interest?.toLocaleString(undefined, { minimumFractionDigits: 2 })} so'm</p>
                                 <p>{(item?.monthly_payment)?.toLocaleString(undefined, { minimumFractionDigits: 2 })} so'm</p>
                              </div>
                           )
                        })
                     }
                     <div className='g1_table2_header'>
                        <p></p>
                        <p className='black_text'>Jami:</p>
                        <p></p>
                        <p className='black_text'>{getSummaText(creditData, 'principal_debt')} so'm</p>
                        <p className='black_text'>{(getSumma(creditData, 'monthly_payment') - getSumma(creditData, 'principal_debt'))?.toLocaleString(undefined, { minimumFractionDigits: 2 })} so'm</p>
                        <p className='black_text'>{getSummaText(creditData, 'monthly_payment')} so'm</p>
                     </div>
                  </div>
               </PdfWrapper>
               : <></>
         }
      </section>
   )
}

export default Calculator