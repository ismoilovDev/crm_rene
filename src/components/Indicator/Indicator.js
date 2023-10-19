import axios from 'axios';
import { useState, useEffect, memo } from 'react'
import { AiFillGolden } from 'react-icons/ai'
import { BsCurrencyDollar } from 'react-icons/bs'
import Select from 'react-select';

const goldProofs = [500, 583, 750, 800, 916, 950, 999]

const customStyles = {
   option: provided => ({
      ...provided,
      padding: 10,
      borderRadius: 5
   }),
   singleValue: (provided, state) => {
      const opacity = state.isDisabled ? 0.5 : 1;
      const transition = 'opacity 300ms';

      return { ...provided, opacity, transition };
   }
}

export const makeTheme = (theme) => ({
   ...theme,
   borderRadius: 10,
   colors: {
      ...theme.colors,
      primary25: 'orange',
      primary: 'orange',
   },
})

const IndicatorSelect = memo(({ options, setSelectedOption, selectedOption }) => {
   return (
      <div className='order-select'>
         <Select
            defaultValue={selectedOption}
            value={selectedOption}
            options={options}
            className='buyurtma_select_new product_selector'
            styles={customStyles}
            theme={makeTheme}
            onChange={(e)=>{
               setSelectedOption(e)
            }}
         />
      </div>
   )
})

const ChangeIndicatorBtn = memo(({ Icon, type_id, indicator, setIndicator, setSelectedOption, gold, currencies }) => {
   return (
      <button className={indicator === type_id ? "active" : ""} onClick={() => {
         if(type_id===1){
            setSelectedOption(currencies[0])
         }else{
            setSelectedOption(gold[0])
         }
         setIndicator(type_id)
      }}>
         <Icon className={type_id===1 ? 'currency_icon' : 'gold_icon'} />
      </button>
   )
})

function Indicator() {
   const [indicator, setIndicator] = useState(1)
   const [currencies, setCurrencies] = useState([])
   const [gold, setGold] = useState([])
   const [ selectedOption, setSelectedOption ] = useState({})

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
               label: `${item?.Ccy} = ${addSpacesToNumber(item?.Rate)}`,
               value: item?.id
            })
         })
         setCurrencies(newArr)
         setSelectedOption(newArr[0])

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
         goldProofs?.map((item, index) => {
            let num = data?.items[0]?.xauPrice / 31.103
            newArr.push({
               label: `${item}пр = ${((num / 999) * item * info[0]?.Rate)?.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`,
               value: index + 1
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
      <div className='indicator_wrapper'>
         <div className='content_container'>
            {
               indicator === 1 ? <IndicatorSelect options={currencies} setSelectedOption={setSelectedOption} selectedOption={selectedOption}/> : <IndicatorSelect options={gold} setSelectedOption={setSelectedOption} selectedOption={selectedOption}/>
            }
            <div className='switch'>
               <ChangeIndicatorBtn type_id={1} indicator={indicator} setIndicator={setIndicator} Icon={BsCurrencyDollar} setSelectedOption={setSelectedOption} gold={gold} currencies={currencies}/>
               <ChangeIndicatorBtn type_id={2} indicator={indicator} setIndicator={setIndicator} Icon={AiFillGolden} setSelectedOption={setSelectedOption} gold={gold} currencies={currencies}/>
            </div>
         </div>
      </div>
   )
}

export default Indicator