import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { Input } from '@nextui-org/react';
import { useRef, useState } from 'react';
import { AiOutlineCloseCircle } from 'react-icons/ai';
import { NumericFormat } from 'react-number-format';
import https from '../../services/https';
import dateConvert from '../../utils/functions/dateConvert';
import './style.scss'
import '../Input/style.scss'

export const OpenContractModal = ({ is_active, setIsActive, clientInfo, setOpenContractID, open, setOpen }) => {
   const default_value = {
      sum: 0,
      start_date: "",
      end_date: ""
   }
   const modal = useRef(null)
   const { register, handleSubmit } = useForm();
   const [indicator, setIndicator] = useState(2);
   const [contracts, setContracts] = useState([])
   const [selectedContract, setSelectedContract] = useState(null)
   const [value, setValue] = useState(default_value)

   const closeModal = (e) => {
      if (e.target === modal.current) {
         setIsActive(false)
         document.body.style.overflowY = 'scroll'
      }
   }

   const addOpenContractHandle = async (data) => {
      const info = { ...value, client_id: clientInfo?.id };
      try {
         const response = await https.post('/open-contracts', info)
         console.log(response);
         const infos = response?.data;
         document.body.style.overflowY = 'auto';
         setOpen(false)
         setOpenContractID(infos?.id)
         getContracts()
         setValue(default_value)
      }
      catch (error) {
         console.log(error);
      }
   }

   const getContracts = async () => {
      try {
         const response = await https.get(`/clients/${clientInfo?.id}/open-contracts`)
         const { data } = response;
         setContracts(data)
      }
      catch (err) {
         console.log(err);
      }
   }

   const selectHavingContract = () => {
      setOpenContractID(selectedContract)
      document.body.style.overflowY = 'auto';
      setOpen(false)
   }

   useEffect(() => {
      getContracts()
   }, [])


   return (
      <article
         ref={modal}
         onClick={(e) => closeModal(e)}
         className={!is_active || !open ? 'open_contracts' : 'open_contracts active'}
      >
         <div className="open_contracts_container">

            <div className='buttons_container'>
               <button type='button' className={`${indicator === 1 ? "active" : ""}`}
                  onClick={() => {
                     setIndicator(1)
                  }}
               >
                  Mavjud Bosh kelishuvlar
               </button>
               <button type='button' className={`${indicator === 2 ? "active" : ""}`}
                  onClick={() => {
                     setIndicator(2)
                  }}
               >
                  Yangi Bosh kelishuv
               </button>
            </div>

            {
               indicator === 1 ?
                  <div className='having_contracts_wrapper'>
                     <div className='having_contracts'>
                        {
                           contracts?.map((item, index) => (
                              <button key={item?.id}
                                 className={`${selectedContract === item?.id ? "active" : ""}`}
                                 onClick={() => {
                                    setSelectedContract(item?.id)
                                 }}
                                 onDoubleClick={() => {
                                    setSelectedContract(null)
                                 }}
                              >
                                 {index + 1}. Bosh kelishuv  <span>({dateConvert(item?.start_date)} - {dateConvert(item?.end_date)})</span>
                              </button>
                           )
                           )
                        }
                     </div>
                     {
                        selectedContract ?
                           <button className='submit_btn' type='submit' onClick={() => { selectHavingContract() }}>Tanlash</button>
                           : <></>
                     }
                  </div> :
                  <form onSubmit={handleSubmit(addOpenContractHandle)}>
                     <div className="numeric_format_input width_100 border_radius_10">
                        <label>Bosh kelishuv summasi</label>
                        <NumericFormat
                           thousandSeparator={' '}
                           value={value?.sum}
                           onChange={(e) => {
                              const changed_number = Number((e.target.value).replace(/\s/g, ''))
                              const newObject = { ...value }
                              newObject.sum = changed_number
                              setValue(newObject)
                           }}
                        />
                     </div>
                     <Input
                        bordered
                        label="Bosh kelishuv boshlanish sanasi"
                        color="secondary"
                        type='date'
                        width='100%'
                        className="width_100 margin_bottom_20"
                        value={value?.start_date}
                        {...register("start_date", { required: true })}
                        onChange={(e) => {
                           const newObject = { ...value }
                           newObject.start_date = e.target.value
                           setValue(newObject)
                        }}
                     />
                     <Input
                        bordered
                        label="Bosh kelishuv tugash sanasi"
                        color="secondary"
                        type='date'
                        className="width_100 margin_bottom_20"
                        width='100%'
                        value={value?.end_date}
                        {...register("end_date", { required: true })}
                        onChange={(e) => {
                           const newObject = { ...value }
                           newObject.end_date = e.target.value
                           setValue(newObject)
                        }}
                     />
                     <div className="contracts_submit margin_top_15">
                        <button type='submit'>Kiritish</button>
                     </div>
                  </form>
            }
            <div
               className="close_btn"
               onClick={() => {
                  setIsActive(false)
                  document.body.style.overflowY = 'scroll'
               }}>
               <AiOutlineCloseCircle />
            </div>
         </div>
      </article>
   )
}
