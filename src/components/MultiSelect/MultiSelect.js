import { memo, useEffect, useRef, useState } from 'react';
import { debounce } from 'lodash';
import AsyncSelect from 'react-select/async';
import makeAnimated from "react-select/animated";
import https from '../../services/https';

const animatedComponents = makeAnimated();

const MultiSelect = ({ text, isMulti, selectedOptions, selectedClient, isClearable }) => {
   const selectRef = useRef(null)
   const [query, setQuery] = useState('')
   const [options, setOptions] = useState([])

   useEffect(() => {
      async function fetchClients() {
         try {
            const { data } = await https.get(`/clients?search=${query}`);
            console.log(data)
            const newOptions = data?.data?.map(item => ({
               label: item.name,
               value: item.id
            }));
            setOptions(newOptions);
         } catch (error) {
            console.log(error);
         }
      }

      fetchClients();
   }, [query]);


   const promiseOptions = (inputValue) => {
      console.log(inputValue)
      if (selectRef?.current?.inputRef?.value?.length > 3) {
         debounce(_ => { setQuery(inputValue) }, 350)
      }
   }

   return (
      <>
         <label className='multi_select-label' htmlFor='clients_id'>
            {text ? "Mijoz kodi " : "Guruh a'zolari "} <span>(eng kamida 4 ta {text ? "belgi" : "harf "} yozing)</span>`
         </label>
         <AsyncSelect
            isMulti={isMulti ? true : false}
            cacheOptions
            defaultOptions
            options={options}
            value={selectedOptions}
            loadOptions={promiseOptions}
            onChange={(items) => selectedClient(items)}
            components={animatedComponents}
            ref={selectRef}
            isClearable={isClearable ? true : false}
            placeholder='Mijozlar'
            noOptionsMessage={() => "Mijoz topilmadi"}
            loadingMessage={() => "Qidirilmoqda..."}
            className="multi_select"
         />
      </>
   );
};

export default memo(MultiSelect);
