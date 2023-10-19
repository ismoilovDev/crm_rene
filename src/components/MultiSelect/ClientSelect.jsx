import { useState, useEffect, memo } from 'react';
import { debounce } from 'lodash';
import Select from 'react-select';
import https from '../../services/https';

export const ClientScrollSelect = memo(({ setSelectedValue }) => {
   const [page, setPage] = useState(1)
   const [query, setQuery] = useState('')
   const [options, setOptions] = useState([])
   const [totalPage, setTotalPage] = useState(1)
   const [isLoading, setIsLoading] = useState(false)
   const [hasMoreOptions, setHasMoreOptions] = useState(true);

   const fetchOptions = async () => {
      try {
         const { data } = await https.get(`/clients-all?search=${query}&page=${page}`);
         const newOptions = data?.data?.map(item => ({
            label: item.name,
            value: item.code
         }));
         setTotalPage(data?.pagination?.total_pages)
         setOptions(newOptions)
         return newOptions
      } catch (error) {
         console.log(error);
      }
   }

   const loadMoreOptions = async () => {
      if (!hasMoreOptions || isLoading) return;

      setIsLoading(true);
      const newOptions = await fetchOptions();
      setIsLoading(false);

      if (newOptions.length === 0) {
         setHasMoreOptions(false);
      } else {
         setOptions([...options, ...newOptions]);
      }
   };

   useEffect(() => {
      loadMoreOptions();
   }, [page]);

   useEffect(() => {
      fetchOptions();
      setPage(1)
   }, [query]);

   const handleMenuScroll = (event) => {
      const target = event.target;
      if (target.scrollHeight - target.scrollTop === target.clientHeight) {
         if (page >= totalPage) {
            setPage(totalPage)
         } else {
            setPage(prev => prev + 1)
            loadMoreOptions();
         }
      }
   };

   const handleChange = debounce((e) => { setQuery(e) }, 450)

   return (
      <Select
         label="Mijozlar"
         options={options}
         isLoading={isLoading}
         placeholder='Mijozlar'
         className="multi_select"
         onChange={e => setSelectedValue(e.value)}
         onInputChange={handleChange}
         onMenuScrollToBottom={handleMenuScroll}
         isDisabled={!hasMoreOptions}
      />
   );
})

export const ClientsMultiSelect = memo(({ text, isClearable, selectedOptions, selectedClient }) => {
   const [page, setPage] = useState(1)
   const [query, setQuery] = useState('')
   const [options, setOptions] = useState([])
   const [totalPage, setTotalPage] = useState(1)
   const [isLoading, setIsLoading] = useState(false);
   const [hasMoreOptions, setHasMoreOptions] = useState(true);

   const fetchOptions = async () => {
      try {
         const { data } = await https.get(`/clients-all?search=${query}&page=${page}`);
         const newOptions = data?.data?.map(item => ({
            label: item.name,
            value: item.id
         }));
         setOptions(newOptions)
         setTotalPage(data?.pagination?.total_pages)
         return newOptions
      } catch (error) {
         console.log(error);
      }
   }

   const loadMoreOptions = async () => {
      if (!hasMoreOptions || isLoading) return;

      setIsLoading(true);
      const newOptions = await fetchOptions();
      setIsLoading(false);

      if (newOptions.length === 0) {
         setHasMoreOptions(false);
      } else {
         setOptions([...options, ...newOptions]);
      }
   };

   useEffect(() => {
      loadMoreOptions();
   }, [page]);

   useEffect(() => {
      fetchOptions();
      setPage(1)
   }, [query]);

   const handleMenuScroll = (event) => {
      const target = event.target;
      if (target.scrollHeight - target.scrollTop === target.clientHeight) {
         if (page >= totalPage) {
            setPage(totalPage)
         } else {
            setPage(prev => prev + 1)
            loadMoreOptions();
         }
      }
   };

   const handleChange = debounce((e) => { setQuery(e) }, 450)

   return (
      <>
         <label className='multi_select-label' htmlFor='clients_id'>
            {text ? "Mijozlar " : "Guruh a'zolari "}
         </label>
         <Select
            isMulti={true}
            id='clients_id'
            label="Mijozlar"
            options={options}
            isLoading={isLoading}
            placeholder='Mijozlar'
            value={selectedOptions}
            className="multi_select"
            isDisabled={!hasMoreOptions}
            isClearable={isClearable ? true : false}
            onInputChange={handleChange}
            onChange={(items) => selectedClient(items)}
            onMenuScrollToBottom={handleMenuScroll}
            loadingMessage={() => "Qidirilmoqda..."}
         />
      </>
   );
})