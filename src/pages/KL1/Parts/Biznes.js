import { useContext, useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import { Input, Textarea } from '@nextui-org/react'
import { v4 as uuidv4 } from 'uuid';
import { AiOutlineDoubleRight, AiOutlineDoubleLeft } from 'react-icons/ai'
import { NumericFormat } from 'react-number-format';
import { Context } from '../../../context/context';



function Biznes() {

   // Tab active
   const { setActiveTab } = useContext(Context)
   const { mavsumiyWindow } = useContext(Context)
   const { biznesDaromads, setBiznesDaromads } = useContext(Context)
   const { biznesXarajats, setBiznesXarajats } = useContext(Context)

   useEffect(() => {
      setActiveTab(5)
   }, [])

   let navigate = useNavigate()

   function backStep() {
      if (mavsumiyWindow === 'open') {
         navigate("/kl1/addkl1/mavsumiy", { replace: true })
      } else {
         navigate("/kl1/addkl1/boshqa", { replace: true })
      }
   }

   // Biznes Daromads adding and deleting functions
   function addBiznesDaromad() {
      let newBiznesDaromad = [{
         id: uuidv4(),
         name: '',
         volume: 0,
         price: 0,
         percent: 0,
         plus: 0,
         commit: ''
      }]
      setBiznesDaromads(biznesDaromads.concat(newBiznesDaromad))
   }
   function deleteBiznesDaromad(id) {
      if (biznesDaromads.length > 1) {
         let newBiznesDaromads = biznesDaromads.filter((item, index) => index !== id)
         setBiznesDaromads(newBiznesDaromads)
      }
   }

   function getSumDaromad() {
      let newBiznesDaromad = []
      biznesDaromads.map((item, index) => {
         newBiznesDaromad.push(item.plus)
      })
      let totalDaromad = newBiznesDaromad.reduce((prev, current) => Number(prev) + Number(current), 0)
      return totalDaromad
   }


   // Biznes Xarajats adding and deleting functions
   function addBiznesXarajat() {
      let newBiznesXarajat = [{
         id: uuidv4(),
         name: '',
         volume: 0,
         price: 0,
         cost: 0,
         minus: 0,
         commit: ''
      }]
      setBiznesXarajats(biznesXarajats.concat(newBiznesXarajat))
   }
   function deleteBiznesXarajat(id) {
      if (biznesXarajats.length > 1) {
         let newBiznesXarajats = biznesXarajats.filter((item, index) => index !== id)
         setBiznesXarajats(newBiznesXarajats)
      }
   }

   function getSumXarajat() {
      let newBiznesXarajat = []
      biznesXarajats.map((item, index) => {
         newBiznesXarajat.push(item.minus)
      })
      let totalXarajat = newBiznesXarajat.reduce((prev, current) => Number(prev) + Number(current), 0)
      return totalXarajat
   }

   function nextStep() {
      navigate('/kl1/addkl1/6_qism', { replace: true });
   }

   function biznesData() {
      setTimeout(() => {
         nextStep()
      }, 500)
   }

   return (
      <section>
         <div>
            <p className='kl1_formtitle'>Biznes daromadlar turi</p>

            {
               biznesDaromads?.map((item, index) => {
                  return (
                     <div className='kl1_products' key={item?.id}>
                        <div className='kl1_product_title'>
                           Biznes daromad {index + 1}
                           <button className='kl1_delete_button' onClick={() => { deleteBiznesDaromad(index) }}><i className='bx bx-trash'></i></button>
                        </div>
                        <div className='kl1_product'>
                           <Input
                              rounded
                              bordered
                              label='Daromad nomi'
                              color="secondary"
                              width='100%'
                              className='kl1_input'
                              value={biznesDaromads.find(x => x.id === item.id).name}
                              onChange={(e) => {
                                 let newBiznesDaromadArr = [...biznesDaromads]
                                 newBiznesDaromadArr[index].name = e.target.value
                                 setBiznesDaromads(newBiznesDaromadArr)
                              }}
                           />
                           <div className="numeric_format_input width_47">
                              <label>Oylik hajm</label>
                              <NumericFormat
                                 thousandSeparator={' '}
                                 value={biznesDaromads.find(x => x.id === item.id).volume}
                                 onChange={(e) => {
                                    const changed_number = Number((e.target.value).replace(/\s/g, ''))
                                    const newBiznesDaromadArr = [...biznesDaromads]
                                    newBiznesDaromadArr[index].volume = changed_number
                                    newBiznesDaromadArr[index].plus = (changed_number) * ((newBiznesDaromadArr[index].percent) / 100) * (newBiznesDaromadArr[index].price)
                                    setBiznesDaromads(newBiznesDaromadArr)
                                 }}
                              />
                           </div>
                           <div className="numeric_format_input width_47">
                              <label>1 birlikning o'rtacha sotish naxri</label>
                              <NumericFormat
                                 thousandSeparator={' '}
                                 value={biznesDaromads.find(x => x.id === item.id).price}
                                 onChange={(e) => {
                                    const changed_number = Number((e.target.value).replace(/\s/g, ''))
                                    const newBiznesDaromadArr = [...biznesDaromads]
                                    newBiznesDaromadArr[index].price = changed_number
                                    newBiznesDaromadArr[index].plus = (changed_number) * ((newBiznesDaromadArr[index].percent) / 100) * (newBiznesDaromadArr[index].volume)
                                    setBiznesDaromads(newBiznesDaromadArr)
                                 }}
                              />
                           </div>
                           <Input
                              rounded
                              bordered
                              label="O'rtacha ustamasi % da"
                              color="secondary"
                              width='47%'
                              type='number'
                              onWheel={(e) => e.target.blur()}
                              className='kl1_input'
                              value={biznesDaromads.find(x => x.id === item.id).percent}
                              onChange={(e) => {
                                 let newBiznesDaromadArr = [...biznesDaromads]
                                 newBiznesDaromadArr[index].percent = e.target.value
                                 newBiznesDaromadArr[index].plus = (newBiznesDaromadArr[index].volume) * ((e.target.value) / 100) * (newBiznesDaromadArr[index].price)
                                 setBiznesDaromads(newBiznesDaromadArr)
                              }}
                           />
                           <div className="numeric_format_input width_47">
                              <label>Bir oylik daromad</label>
                              <NumericFormat
                                 thousandSeparator={' '}
                                 value={biznesDaromads.find(x => x.id === item.id).plus}
                                 onChange={(e) => {
                                    const changed_number = Number((e.target.value).replace(/\s/g, ''))
                                    const newBiznesDaromadArr = [...biznesDaromads]
                                    newBiznesDaromadArr[index].plus = changed_number
                                    setBiznesDaromads(newBiznesDaromadArr)
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
                              value={biznesDaromads.find(x => x.id === item.id).commit}
                              onChange={(e) => {
                                 let newBiznesDaromadArr = [...biznesDaromads]
                                 newBiznesDaromadArr[index].commit = e.target.value
                                 setBiznesDaromads(newBiznesDaromadArr)
                              }}
                           />
                        </div>
                     </div>
                  )
               })
            }
            <div className='kl1_product_footer'>
               <button className='kl1_add_button' onClick={() => { addBiznesDaromad() }}>
                  Biznes daromad qoshish
               </button>
               <p className='kl1_jami'>JAMI: {getSumDaromad()?.toLocaleString()} so'm</p>
            </div>
         </div>

         <div>
            <p className='kl1_formtitle'>Biznes uchun xarajatlar</p>

            {
               biznesXarajats?.map((item, index) => {
                  return (
                     <div className='kl1_products' key={index}>
                        <div className='kl1_product_title'>
                           Biznes xarajat {index + 1}
                           <button className='kl1_delete_button' onClick={() => { deleteBiznesXarajat(index) }}><i className='bx bx-trash'></i></button>
                        </div>
                        <div className='kl1_product'>
                           <Input
                              rounded
                              bordered
                              label='Xarajat nomi'
                              color="secondary"
                              width='100%'
                              className='kl1_input'
                              value={biznesXarajats.find(x => x.id === item.id).name}
                              onChange={(e) => {
                                 let newBiznesXarajatArr = [...biznesXarajats]
                                 newBiznesXarajatArr[index].name = e.target.value
                                 setBiznesXarajats(newBiznesXarajatArr)
                              }}
                           />
                           <div className="numeric_format_input width_47">
                              <label>Hajm</label>
                              <NumericFormat
                                 thousandSeparator={' '}
                                 value={biznesXarajats.find(x => x.id === item.id).volume}
                                 onChange={(e) => {
                                    const changed_number = Number((e.target.value).replace(/\s/g, ''))
                                    const newBiznesXarajatArr = [...biznesXarajats]
                                    newBiznesXarajatArr[index].volume = changed_number
                                    newBiznesXarajatArr[index].minus = (changed_number) * (newBiznesXarajatArr[index].price)
                                    setBiznesXarajats(newBiznesXarajatArr)
                                 }}
                              />
                           </div>
                           <div className="numeric_format_input width_47">
                              <label>Naxri</label>
                              <NumericFormat
                                 thousandSeparator={' '}
                                 value={biznesXarajats.find(x => x.id === item.id).price}
                                 onChange={(e) => {
                                    const changed_number = Number((e.target.value).replace(/\s/g, ''))
                                    const newBiznesXarajatArr = [...biznesXarajats]
                                    newBiznesXarajatArr[index].price = changed_number
                                    newBiznesXarajatArr[index].minus = (changed_number) * (newBiznesXarajatArr[index].volume)
                                    setBiznesXarajats(newBiznesXarajatArr)
                                 }}
                              />
                           </div>
                           <div className="numeric_format_input width_47">
                              <label>Qiymati</label>
                              <NumericFormat
                                 thousandSeparator={' '}
                                 value={biznesXarajats.find(x => x.id === item.id).cost}
                                 onChange={(e) => {
                                    const changed_number = Number((e.target.value).replace(/\s/g, ''))
                                    const newBiznesXarajatArr = [...biznesXarajats]
                                    newBiznesXarajatArr[index].cost = changed_number
                                    setBiznesXarajats(newBiznesXarajatArr)
                                 }}
                              />
                           </div>
                           <div className="numeric_format_input width_47">
                              <label>O'rtacha oylik xarajat</label>
                              <NumericFormat
                                 thousandSeparator={' '}
                                 value={biznesXarajats.find(x => x.id === item.id).minus}
                                 onChange={(e) => {
                                    const changed_number = Number((e.target.value).replace(/\s/g, ''))
                                    const newBiznesXarajatArr = [...biznesXarajats]
                                    newBiznesXarajatArr[index].minus = changed_number
                                    setBiznesXarajats(newBiznesXarajatArr)
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
                              value={biznesXarajats.find(x => x.id === item.id).commit}
                              onChange={(e) => {
                                 let newBiznesXarajatArr = [...biznesXarajats]
                                 newBiznesXarajatArr[index].commit = e.target.value
                                 setBiznesXarajats(newBiznesXarajatArr)
                              }}
                           />
                        </div>
                     </div>
                  )
               })
            }
            <div className='kl1_product_footer'>
               <button className='kl1_add_button' onClick={() => { addBiznesXarajat() }}>
                  Biznes xarajat qoshish
               </button>
               <p className='kl1_jami'>JAMI: {getSumXarajat()?.toLocaleString()} so'm</p>
            </div>
         </div>

         <p className='kl1_jami_main'>Jami o'rtacha oylik daromadlari: {(getSumDaromad() - getSumXarajat())?.toLocaleString()} so'm</p>

         <div className='step_buttons double_button'>
            <button type='button' onClick={() => { backStep() }} className='previous_button'><AiOutlineDoubleLeft /><p>Oldingi</p></button>
            <button type='submit' onClick={() => { biznesData() }} className='step_next'><p>Keyingi</p> <AiOutlineDoubleRight /></button>
         </div>
      </section>
   )
}

export default Biznes