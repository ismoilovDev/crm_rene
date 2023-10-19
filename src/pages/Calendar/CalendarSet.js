import { useEffect, useState } from 'react'
import { Calendar } from "react-multi-date-picker"
import { alert } from '../../components/Alert/alert';
import https from '../../services/https';

const format = "MM/DD/YYYY";
const weekDays = ["DU", "SE", "CH", "PA", "JU", "SH", "YA"]
const months = ["Yanvar", "Fevral", "Mart", "Aprel", "May", "Iyun", "Iyul", "Avgust", "Sentyabr", "Octyabr", "Noyabr", "Dekabr"]

function CalendarSet() {
   const [values, setValues] = useState([])

   useEffect(() => {
      https
         .get('/holidays')
         .then(res => {
            setValues(res?.data[0]?.date)
         })
         .catch(err => {
            console.log(err)
         })
   }, [])

   function submitData() {
      let date = []
      values?.map(item => {
         date.push(item.toLocaleString().replace(".", "-").replace(".", "-"))
      })
      const info = { id: 1, date: date }
      https
         .post('/holidays', info)
         .then(_ => {
            alert("Ma'lumotlar qoshildi", 'success')
         })
         .catch(err => {
            console.log(err)
            alert("Xato", 'error')
         })
   }

   return (
      <section className='calendar' >
         <Calendar
            fullYear
            weekDays={weekDays}
            months={months}
            value={values}
            onChange={setValues}
            format="YYYY.MM.DD"
         />
         <div className='submit-buttons endRow'>
            <button type='button' onClick={submitData} className='client_submit submit'>
               Ma'lumontlarni qo'shish
            </button>
         </div>
      </section>
   )
}

export default CalendarSet