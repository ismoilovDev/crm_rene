import { useState, useEffect } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import { useForm } from "react-hook-form";
import { Input } from '@nextui-org/react'
import { AiOutlineFileAdd } from 'react-icons/ai';
import { NumericFormat } from 'react-number-format';
import Select from 'react-select';
import { CashInputAppearence, OpenContractsTooltip } from '../../../components/Order/AddOrderForm';
import { OpenContractModal } from '../../../components/OpenContract/OpenContractModal';
import { translateType, makeTheme } from '../../../components/Order/Functions';
import { alert } from '../../../components/Alert/alert';
import ErrorWarning from '../../../components/Warning/ErrorWarning';
import Prev from '../../../components/Prev/Prev';
import https from '../../../services/https';

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

const creditTypes = [
   { label: "Naqd pul ko'rinishida", value: 'cash' },
   { label: "Plastik karta / Hisobraqam", value: 'card' }
]

const paymentTypes = [
   { label: "Bir xil miqdor(annuitet)", value: 1 },
   { label: "Kamayib boruvchi(differеnsial)", value: 2 }
]

const BHM = 330_000;

const productsRate = [
   {
      id: 1,
      name: "Business",
      min_sum: 2_000_000,
      max_sum: 50_000_000,
      min_month: 3,
      max_month: 36,
      min_procent: 56,
      max_procent: 62
   },
   {
      id: 2,
      name: "Hamkor",
      min_sum: 2_000_000,
      max_sum: 50_000_000,
      min_month: 3,
      max_month: 36,
      min_procent: 54,
      max_procent: 60
   },
   {
      id: 3,
      name: "Hamkor Plus",
      min_sum: 2_000_000,
      max_sum: 50_000_000,
      min_month: 3,
      max_month: 36,
      min_procent: 52,
      max_procent: 58
   },
   {
      id: 4,
      name: "ReneIshonch",
      min_sum: 2_000_000,
      max_sum: 50 * BHM,
      min_month: 3,
      max_month: 12,
      min_procent: 56,
      max_procent: 62
   },
   {
      id: 5,
      name: "ReneConsumer",
      min_sum: 2_000_000,
      max_sum: 50_000_000,
      min_month: 3,
      max_month: 36,
      min_procent: 56,
      max_procent: 62
   }
]

function OrderForm() {
   const navigate = useNavigate()
   const location = useLocation()
   const [sum, setSum] = useState(0)
   const [month, setMonth] = useState(0)
   const [open, setOpen] = useState(false)
   const [daily, setDaily] = useState(0.4)
   const [sector, setSector] = useState([])
   const [newData, setNewData] = useState({})
   const [salary, setSalary] = useState(null)
   const [procent, setProcent] = useState(58)
   const [section, setSection] = useState([])
   const [filters, setFilters] = useState({})
   const [disable, setDisable] = useState(false)
   const [supplyInfo, setSupplyInfo] = useState([])
   const [cash, setCash] = useState(creditTypes[0])
   const [type, setType] = useState(paymentTypes[0])
   const [sectionRole, setSectionRole] = useState([])
   const [clientInfo, setClientInfo] = useState(null)
   const [selectedGroup, setSelectedGroup] = useState({})
   const [sectionOptions, setSectionOptions] = useState([])
   const [selectesSector, setSelectedSector] = useState({})
   const [selectedSupply, setSelectedSupply] = useState([])
   const [openContractID, setOpenContractID] = useState(null)
   const [isOpenContractModal, setIsOpenContractModal] = useState(false)
   const [currentDate, setCurrentDate] = useState(formatDate(new Date()))
   const [groups, setGroups] = useState([{ label: "O'zi", value: null }])
   const { register, handleSubmit } = useForm()
   const clientId = location?.state?.id
   const groupList = location?.state?.groups

   useEffect(() => {
      const getClientsDetails = async () => {
         try {
            const clientRes = await https.get(`/clients/${clientId}`);
            setClientInfo(clientRes?.data);
            const groupArr = groupList?.map(item => ({
               label: item?.name,
               value: item?.id
            }));
            setGroups(groups.concat(groupArr))
            setSelectedGroup(groups[0]);
         } catch (error) {
            console.error('Error fetching client info and groups:', error);
         }
      };
      getClientsDetails();
   }, [clientId, groupList])

   function formatDate(date) {
      const year = date.getFullYear();
      const month = String(date.getMonth() + 1).padStart(2, '0');
      const day = String(date.getDate()).padStart(2, '0');
      return `${year}-${month}-${day}`;
   }

   async function fetchSection() {
      const { data } = await https.get('/products')
      let sections = []
      data?.data?.map((item) => {
         sections.push(
            { value: item?.id, label: item?.name }
         )
      })
      setSectionOptions(sections)
      setSection(sections[0])
      setSectionRole(sections[0].value)

      const product = productsRate?.find(x => x?.name === sections[0]?.label)
      setFilters(product)
   }

   async function getSector() {
      await https
         .get('/sectors')
         .then(res => {
            let sectors = []
            res?.data?.map(item => {
               sectors?.push({
                  value: item?.id,
                  label: item?.name
               })
            })
            setSector(sectors)
            setSelectedSector(sectors[0])
         })
   }

   async function getSupplyInfos() {
      try {
         const response = await https.get(`/clients/${clientId}/supply-infos`)
         const { data } = response;
         let arr = [{ label: 'transport guruhli', value: null }]
         data?.map(item => {
            arr = [...arr, {
               label: `${translateType(item?.type)}
               ${(item?.type === 'auto' || item?.type === 'gold' || item?.type === 'insurance') ?
                     ` ---- ${item?.sum?.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2, })}`
                     : ''
                  }
               `,
               value: item?.id
            }]
         })
         setSupplyInfo(arr)
         setSelectedSupply(arr[0])
      }
      catch (err) {
         console.log(err);
      }
   }

   useEffect(() => {
      fetchSection()
      getSector()
      getSupplyInfos()
   }, [])

   function changeContractType(type) {
      document.body.style.overflowY = type ? 'hidden' : 'auto';
      setIsOpenContractModal(type)
      setOpen(type)
   }

   function checkingData(info) {
      if (cash.value === "card") {
         return ({ ...info, ...newData, type_repayment: type?.value, type_credit: cash?.value })
      } else {
         return ({ ...info, type_repayment: type?.value, type_credit: cash?.value })
      }
   }

   const onSubmit = async (data) => {
      setDisable(true)
      if (data?.sum < 2000000) {
         setDisable(false)
         return ErrorWarning("Minimal kredit miqdori 2mln");
      }

      let newData = {
         ...data,
         sum: sum,
         end_date: '',
         salary: salary,
         daily_fine: daily,
         percent_year: procent,
         order_date: currentDate,
         product_id: sectionRole,
         monthly_commission: 0.4,
         client_id: clientInfo?.id,
         group_id: selectedGroup?.value,
         sector_id: selectesSector?.value,
         sign_committee: data?.sum > 50000000 && true,
         supply_info_id: supplyInfo?.length !== 0 ? selectedSupply?.value : null
      }

      if (isOpenContractModal) {
         newData = { ...newData, open_contract_id: openContractID }
      }

      try {
         const { data } = await https.post('orders', checkingData(newData));
         alert("Buyurtma qoshildi", 'success');
         setDisable(false);
         navigate(`/orders/single/${data.id}`, { replace: true });
      } catch (err) {
         const errorMessage = err?.response?.data?.message || 'An error occurred';
         alert(errorMessage, 'error');
         setDisable(false);
      }
   }

   return (
      <>
         <Prev />
         <div className='shart_nama'>
            <form className='order_form_main' onSubmit={handleSubmit(onSubmit)}>
               <div className='order_form_main_forma'>
                  {
                     selectedGroup?.value === null && section?.label !== "ReneIshonch" ?
                        <OpenContractsTooltip changeContractType={changeContractType} isOpenContractModal={isOpenContractModal} />
                        : null
                  }
                  <div className="tab_content_list">
                     <Input
                        bordered
                        readOnly
                        label="Mijoz kodi"
                        color="secondary"
                        value={clientInfo?.code}
                     />
                     <div className='order-select'>
                        <p>Guruh</p>
                        <Select
                           value={selectedGroup}
                           defaultValue={groups}
                           options={groups}
                           className='buyurtma_select_new group_selector'
                           styles={customStyles}
                           theme={makeTheme}
                           onChange={(event) => {
                              setSelectedGroup(event)
                           }}
                        />
                     </div>
                     <div className='order-select'>
                        <p>Kredit ajratish tartibi</p>
                        <Select
                           value={cash}
                           defaultValue={cash}
                           options={creditTypes}
                           className='buyurtma_select_new group_selector'
                           styles={customStyles}
                           theme={makeTheme}
                           onChange={(event) => setCash(event)}
                        />
                     </div>
                     <Input
                        bordered
                        label="Buyurtma sanasi"
                        color="secondary"
                        type='date'
                        value={currentDate}
                        readOnly
                        {...register("order_date", { required: false })}
                     />
                     <div className={`numeric_format_input border_radius_10 without_margin width_100 ${((sum < filters?.min_sum || sum > filters?.max_sum) && sum !== 0) ? 'error' : ""}`}>
                        <label>So'ralayotgan qarz miqdori</label>
                        <NumericFormat
                           thousandSeparator={' '}
                           value={sum}
                           onChange={(e) => {
                              const changed_number = Number((e.target.value).replace(/\s/g, ''))
                              setSum(changed_number)
                           }}
                        />
                     </div>
                     <Input
                        bordered
                        status={((month < filters?.min_month || month > filters?.max_month) && month !== 0) ? 'error' : "default"}
                        label="So'ralayotgan muddat (oy)"
                        color="secondary"
                        type='number'
                        {...register("time", { required: true })}
                        onChange={(e) => {
                           setMonth(e.target.value)
                        }}
                        min="0"
                     />
                     <div className='order-select'>
                        <p>Mahsulot</p>
                        <Select
                           value={section}
                           defaultValue={section}
                           options={sectionOptions}
                           className='buyurtma_select_new product_selector'
                           styles={customStyles}
                           theme={makeTheme}
                           onChange={(event) => {
                              setSection(event)
                              setSectionRole(event.value)
                              const product = productsRate?.find(x => x?.name === event?.label)
                              setFilters(product)
                           }}
                        />
                     </div>
                     <div className='order-select'>
                        <p>Sector</p>
                        <Select
                           value={selectesSector}
                           defaultValue={selectesSector}
                           options={sector}
                           className='buyurtma_select_new sector_selector'
                           styles={customStyles}
                           theme={makeTheme}
                           onChange={event => {
                              setSelectedSector(event)
                           }}
                        />
                     </div>
                     <Input
                        bordered
                        label="Maqsadi"
                        color="secondary"
                        {...register("aim", { required: true })}
                     />
                     <Input
                        bordered
                        label="Ustama foiz stavkasi, yillik"
                        color="secondary"
                        type='number'
                        step={0.01}
                        min={0.01}
                        value={procent}
                        status={(procent < filters?.min_procent || procent > filters?.max_procent) ? 'error' : "default"}
                        {...register("percent_year", { required: false })}
                        onChange={e => setProcent(e.target.value)}
                     />
                     <Input
                        bordered
                        label="Penya, kunlik"
                        type='number'
                        color="secondary"
                        step={0.01}
                        min={0.01}
                        value={daily}
                        {...register("daily_fine", { required: false })}
                        onChange={e => setDaily(e.target.value)}
                     />
                     <div className='order-select'>
                        <p>So'ndirish tartibi</p>
                        <div className='product_selector'>
                           <Select
                              value={type}
                              defaultValue={paymentTypes[0]}
                              options={paymentTypes}
                              className='buyurtma_select_new sector_selector'
                              styles={customStyles}
                              theme={makeTheme}
                              onChange={event => {
                                 setType(event)
                              }}
                           />
                        </div>
                     </div>
                     <div className='numeric_format_input without_margin width_100 border_radius_10'>
                        <label>Oylik o'rtacha daromad</label>
                        <NumericFormat
                           thousandSeparator={' '}
                           value={salary}
                           onChange={(e) => {
                              const changed_number = Number((e.target.value).replace(/\s/g, ''))
                              setSalary(changed_number)
                           }}
                        />
                     </div>
                     {
                        supplyInfo?.length !== 0 ?
                           <div className='order-select'>
                              <p>Ta'minot</p>
                              <Select
                                 value={selectedSupply}
                                 defaultValue={selectedSupply}
                                 options={supplyInfo}
                                 className='buyurtma_select_new order_supply_select'
                                 styles={customStyles}
                                 theme={makeTheme}
                                 onChange={(event) => {
                                    setSelectedSupply(event)
                                 }}
                              />
                           </div> :
                           (<div className='order-select'>
                              <p>Ta'minot</p>
                              <span className='supply_without_warning'>Ta'minot hali qo'shilmagan</span>
                           </div>)
                     }
                     {
                        cash.value === "card" ? <CashInputAppearence newData={newData} setNewData={setNewData} /> : null
                     }
                  </div>
               </div>
               <div className='submit-buttons order_btn'>
                  <button type='submit' disabled={disable} className={`client_submit submit ${disable ? "disabled" : ""}`}>
                     Buyurtmani qo'shish
                     <AiOutlineFileAdd />
                  </button>
               </div>
            </form>
         </div>
         {
            clientInfo ?
               <OpenContractModal
                  is_active={isOpenContractModal}
                  setIsActive={setIsOpenContractModal}
                  clientInfo={clientInfo}
                  setOpenContractID={setOpenContractID}
                  open={open}
                  setOpen={setOpen}
               /> : null
         }
      </>
   )
}

export default OrderForm