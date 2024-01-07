import { useState, useEffect } from 'react'
import { IoIosArrowDropdown, IoIosArrowDropup } from 'react-icons/io'
import axios from 'axios'

const goldProofs = [500, 583, 750, 800, 916, 950, 999];

function IndicatorMobile() {
   const [currencies, setCurrencies] = useState([])
   const [indicator, setIndicator] = useState(1)
   const [status, setStatus] = useState(false)
   const [gold, setGold] = useState([])

   const [windowWidth, setWindowWidth] = useState(window.innerWidth);
   useEffect(() => {
      const handleWindowResize = () => {
         setWindowWidth(window.innerWidth);
      };
      window.addEventListener('resize', handleWindowResize);
      return () => {
         window.removeEventListener('resize', handleWindowResize);
      };
   });

   const addSpacesToNumber = (numberString) => {
      return numberString.replace(/\B(?=(\d{3})+(?!\d))/g, ' ');
   };

   async function getCurrency() {
      try {
         const { data } = await axios.get('https://cbu.uz/uz/arkhiv-kursov-valyut/json/');
         return data
      } catch (err) {
         console.log(err)
      }
   }

   async function renderCurrency() {
      try {
         const data = await getCurrency()
         const countries_1 = data.splice(0, 3);
         const countries_2 = data.splice(34, 1);

         const newArr = []
         const arr = [...countries_1, ...countries_2]
         arr?.map(item => {
            newArr.push({
               label: item?.Ccy,
               value: addSpacesToNumber(item?.Rate)
            })
         })
         setCurrencies(newArr)

      } catch (error) {
         console.log(error);
      }
   }

   async function getGold() {
      try {
         const info = await getCurrency()
         const response = await axios.get('https://data-asg.goldprice.org/dbXRates/USD');
         const { data } = response;
         const newArr = []
         goldProofs?.map(item => {
            let num = data?.items[0]?.xauPrice / 31.103
            newArr.push({
               label: `${item} проба`,
               value: ((num / 999) * item * info[0]?.Rate)?.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })
            })
         })

         setGold(newArr)
      }
      catch (err) {
         console.log(err);
      }
   }

   useEffect(() => {
      renderCurrency()
      getGold()
   }, [])

   return (
      <div className='indicator_mobile_wrapper'>
         <p className='main_text' onClick={() => setStatus(!status)}>
            <span className="main_text_indi">KURS</span>
            <span>{windowWidth > 600 ? (status ? <IoIosArrowDropup /> : <IoIosArrowDropdown />) : <></>}</span>
         </p>
         <div className={status ? 'indicator_content' : ''}>
            {
               status ?
                  <div className='wrapper'>
                     <div className='switch'>
                        <button
                           className={indicator === 1 ? "active" : ""}
                           onClick={() => setIndicator(1)}
                        >
                           Valyuta
                        </button>
                        <button
                           className={indicator === 2 ? "active" : ""}
                           onClick={() => setIndicator(2)}
                        >
                           Oltin
                        </button>
                     </div>
                     {
                        indicator === 1 ?
                           currencies?.map(item => <p key={item?.label}>{item?.label} <span>{item?.value}</span></p>) :
                           gold?.map(item => <p key={item?.label}>{item?.label} <span>{item?.value}</span></p>)
                     }
                  </div>
                  : null
            }
         </div>
      </div>
   )
}

export default IndicatorMobile