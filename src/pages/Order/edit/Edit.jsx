import { useState, useMemo } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useForm } from "react-hook-form";
import { AiOutlineClear, AiOutlineUserAdd, AiOutlineQuestionCircle } from 'react-icons/ai';
import { Input, Checkbox, Radio, Textarea, Tooltip } from '@nextui-org/react';
import { NumericFormat } from 'react-number-format';
import Select from 'react-select';
import { OpenContractModal } from '../../../components/OpenContract/OpenContractModal';
import { translateType, makeTheme } from '../../../components/Order/Functions';
import { alert } from '../../../components/Alert/alert';
import Prev from '../../../components/Prev/Prev';
import https from '../../../services/https';

const userName = window.localStorage.getItem('name')
const role = JSON.parse(window.localStorage.getItem('role'))

function OrderEdit() {
   const { id } = useParams()
   const navigate = useNavigate()
   const [disable, setDisable] = useState(false)
   const [order, setOrder] = useState({})
   const [backOrder, setBackOrder] = useState({})
   const [status, setStatus] = useState("")
   const [checked, setChecked] = useState(Boolean)
   const [client, setClient] = useState({})
   const [sectionOptions, setSectionOptions] = useState([])
   const [sectorOptions, setSectorOptions] = useState([])
   const [reasons, setReasons] = useState([])
   const [selectedReasons, setSelectedReasons] = useState([])
   const [voiceCommit, setVoiceCommit] = useState('')
   const [newData, setNewData] = useState({
      ssks: null,
      bank_name: '',
      bank_code: null
   })

   const [groups, setGroups] = useState([
      {
         label: "O'zi",
         value: null
      }
   ])
   const [selectedGroup, setSelectedGroup] = useState({})
   const [comments, setComments] = useState([])
   const [isOpenContractModal, setIsOpenContractModal] = useState(false)
   const [open, setOpen] = useState(false)
   const [openContractID, setOpenContractID] = useState(null)
   const [supplyInfo, setSupplyInfo] = useState([])
   const [selectedSupply, setSelectedSupply] = useState([])


   // Select Style
   const customStyles = {
      option: (provided) => ({
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

   // Sending Data to API
   const { register,
      handleSubmit,
      watch,
      formState: { errors, isValid }
   } = useForm();

   function dataSort(data) {
      if (data === "accepted") {
         return "tasdiqlangan"
      } else if (data === "denied") {
         return "rad etilgan"
      } else if (data === 'pending') {
         return "kutilmoqda"
      } else {
         return 'unknown'
      }
   }

   async function getData() {
      await https
         .get(`/orders/${id}`)
         .then(res => {
            console.log(res?.data);
            setOrder(res?.data)
            setClient(res?.data?.client)
            setBackOrder(res?.data)
            setStatus(res?.data?.status)
            setChecked(res?.data?.sign_committee)
            const dataInfo = {
               ssks: res?.data?.ssks,
               bank_code: res?.data?.bank_code,
               bank_name: res?.data?.bank_name
            }
            setNewData(dataInfo)
            setComments(res?.data?.order_results)
            if (res?.data?.open_contract) {
               setOpenContractID(res?.data?.open_contract?.id)
            }

            getGroups(res)
            getSupplyInfos(res?.data)

            if (res?.data?.group?.id) {
               setSelectedGroup(groups?.find(x => x?.value == res?.data?.group?.id))
            } else {
               setSelectedGroup(groups[0])
            }
         })
         .catch(err => {
            console.log(err);
         })
   }

   async function getGroups(res) {
      let groupArr = [];

      https
         .get(`/clients/${res?.data?.client?.id}`)
         .then(ress => {
            ress?.data?.group?.map(item => {
               if (!groupArr?.find(x => x?.value == item?.id)) {
                  groupArr.push({
                     label: item?.name,
                     value: item?.id
                  })
               }
            })
            const newArr = groups.concat(groupArr);
            setGroups([...newArr])
         })
   }

   async function getReasons() {
      await https
         .get(`/reasons`)
         .then(res => {
            setReasons(res?.data)
         })
         .catch(err => {
            console.log(err);
         })
   }

   async function fetchSection() {
      const ress = await https.get('/products')
      let selectSection = []
      ress?.data?.data?.map((item) => {
         selectSection.push(
            { value: item?.id, label: item?.name }
         )
      })
      setSectionOptions(selectSection)
   }

   async function fetchSector() {
      const ress = await https.get('/sectors')
      let sectors = []
      ress?.data?.map((item) => {
         sectors.push(
            { value: item?.id, label: item?.name }
         )
      })
      setSectorOptions(sectors)
   }

   async function getSupplyInfos(order) {
      try {
         const response = await https.get(`/clients/${order?.client?.id}/supply-infos`)
         const { data } = response;
         let arr = [{ label: 'transport guruhli', value: null }]
         data?.map(item => {
            arr = [...arr, {
               label: `${translateType(item?.type)}
               ${(item?.type === 'auto' || item?.type === 'gold') ?
                     ` ---- ${item?.sum?.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2, })}`
                     : ''
                  }
               `,
               value: item?.id
            }]
         })
         setSupplyInfo(arr)

         let selected = null;
         if (order?.supply_info?.[0]?.id) {
            selected = arr?.find(x => x?.value === order?.supply_info?.[0]?.id)
         } else { selected = arr[0] }
         setSelectedSupply(selected)
      }
      catch (err) {
         console.log(err);
      }
   }

   useMemo(() => {
      fetchSection()
      fetchSector()
      getData()
      getReasons()
   }, [id])

   function changeContractType(type) {
      document.body.style.overflowY = type ? 'hidden' : 'auto';
      if (!type) {
         setOpenContractID(null)
      }
      setIsOpenContractModal(type)
      setOpen(type)
   }

   function CheckboxFun() {
      if (status) {
         return (
            <Checkbox
               value="Kredit Qo'mitasi qorariga asosan"
               size='md'
               defaultSelected={checked}
               className='filial_input'
               color="secondary"
               onChange={(e) => {
                  let newOrder = { ...order }
                  newOrder.sign_committee = e
                  setOrder(newOrder)
                  setChecked(e)
               }}
            >
               Kredit Qo'mitasi qorariga asosan
            </Checkbox>
         )
      }
   }

   // Type card inputs
   function cashInputAppearence() {
      if (order?.type_credit === "card") {
         return (
            <>
               <Input
                  className='vall'
                  width='100%'
                  clearable
                  type='number'
                  onWheel={(e) => e.target.blur()}
                  label="SSKS / Hisobraqam"
                  value={newData?.ssks}
                  bordered
                  color="secondary"
                  onChange={(event) => {
                     setNewData({ ...newData, ssks: event.target.value })
                  }}
               />
               <Input
                  className='vall'
                  width='100%'
                  clearable
                  label="Bank nomi"
                  value={newData?.bank_name}
                  bordered
                  color="secondary"
                  onChange={(event) => {
                     setNewData({ ...newData, bank_name: event.target.value })
                  }}
               />
               <Input
                  className='vall'
                  width='100%'
                  clearable
                  type='number'
                  onWheel={(e) => e.target.blur()}
                  label="Bank MFOsi"
                  value={newData?.bank_code}
                  bordered
                  color="secondary"
                  onChange={(event) => {
                     setNewData({ ...newData, bank_code: event.target.value })
                  }}
               />
            </>
         )
      } else {
         return (
            <></>
         )
      }
   }

   // Back
   function BackFun() {
      setOrder(backOrder)
   }

   // Opening Form
   const [addForm, setAddForm] = useState('voice_container close')

   function openForm() {
      setAddForm('voice_container open')
   }
   function closeForm() {
      setAddForm('voice_container close')
   }

   const onSubmitVoice = (stat) => {
      let collectReasons = []
      reasons?.map(item => {
         if (selectedReasons?.includes(item?.message)) {
            collectReasons.push({
               id: item?.id,
               message: item?.message
            })
         }
      })

      let info = {
         comment: voiceCommit,
         order_id: order?.id,
         is_accepted: stat
      }
      if (!stat) {
         Object.assign(info, { reason: collectReasons })
      }

      if (info?.comment) {
         https
            .post(`/order-results-commissioned`, info)
            .then(res => {
               closeForm()
               getData()
            })
            .catch(err => {
               console.log(err)
               console.log(info)
            })
      } else {
         alert("Izoh yozing", 'error')
      }
   }

   function deleteVoice(id) {
      https
         .delete(`/order-results/${id}`)
         .then(res => {
            alert("Ovoz o'chirildi", 'success')
            let sortedComments = comments?.filter(item => item?.id !== id)
            setComments(sortedComments)
         })
         .catch(err => {
            console.log(err);
            alert(err?.response?.data?.message, 'error')
         })
   }

   const onSubmit = async () => {
      setDisable(true)

      let info = {
         client_id: order?.client?.id,
         order_date: order?.order_date,
         sign_committee: order?.sign_committee,
         sum: order?.sum,
         time: order?.time,
         aim: order?.aim,
         salary: order?.salary,
         code: order?.code,
         product_id: order?.product?.id,
         sector_id: order?.sector?.id,
         status: order?.status,
         type_credit: order?.type_credit,
         percent_year: order?.percent_year,
         daily_fine: order?.daily_fine,
         monthly_commission: order?.monthly_commission,
         type_repayment: order?.type_repayment,
         order_number: order?.order_number ? order?.order_number : null,
         group_id: order?.group?.id ? order?.group?.id : null,
         protocol_result_date: order?.protocol_result_date ? order?.protocol_result_date : null,
         protocol_number: order?.protocol?.code ? order?.protocol?.code : null,
         supply_info_id: supplyInfo?.length !== 0 ? selectedSupply?.value : null,
         open_contract_id: openContractID
      }

      if (order?.type_credit == 'card') {
         Object.assign(info, {
            ssks: newData?.ssks,
            bank_name: newData?.bank_name,
            bank_code: newData?.bank_code
         })
      }
      try {
         const { data } = await https.put(`/orders/${id}`, info);
         alert("Buyurtma o'zgartirildi", 'success')
         closeForm()
         getData()
         setDisable(false)
         navigate(`/orders/single/${data?.id}`, { replace: true });
      } catch (err) {
         const errorMessage = err?.response?.data?.message || 'An error occurred';
         alert(errorMessage, 'error');
         setDisable(false);
      }
   }

   return (
      <>
         {/* Modal */}
         <div className={addForm}>
            <div className='endRow'>
               <button onClick={() => { closeForm() }} className='close_icon'><i className='bx bx-x'></i></button>
            </div>
            <p>Ovoz berish</p>
            <Textarea
               rounded
               bordered
               color="secondary"
               width='100%'
               label="Izoh"
               value={voiceCommit}
               onChange={(e) => {
                  setVoiceCommit(e.target.value)
               }}
            />
            <br />
            <Checkbox.Group
               color="secondary"
               defaultValue={selectedReasons}
               value={selectedReasons}
               label="Sabablar"
               className='check_voice'
               onChange={e => {
                  setSelectedReasons(e)
                  console.log(e);
               }}
            >
               {
                  reasons?.map(item => {
                     return (
                        <Checkbox key={item?.id} size="sm" value={item?.message}>{item?.message}</Checkbox>
                     )
                  })
               }
            </Checkbox.Group>
            <div className='add_mahsulot_buttons'>
               <button onClick={() => { onSubmitVoice(false) }} type='button'>Rad etish</button>
               <button onClick={() => { onSubmitVoice(true) }} type='button'>Tasdiqlash</button>
            </div>
         </div>

         <section>
            <div className='filialform_header'>
               <Prev />
            </div>
            <form className='FilialEditTable single_buyurtma' onSubmit={handleSubmit(onSubmit)}>
               <h1 className='text_center filial_edit_text'>{client?.name}</h1>
               {
                  !(order?.group?.id) && order?.product?.id !== 4 ?
                     <div className="order_form_controls">
                        <div className="controls_item">
                           <Tooltip content="Shartnoma turi ochiq kredit linya asosida bo'lsa tanlab ketish." placement="topStart">
                              <label htmlFor='contract'>
                                 Shartnoma turi
                                 <AiOutlineQuestionCircle />
                              </label>
                           </Tooltip>
                           <Checkbox
                              size='md'
                              id='contract'
                              isSelected={openContractID ? true : false}
                              color="secondary"
                              onChange={changeContractType}
                           >
                              Ochiq kredit liniya
                           </Checkbox>
                        </div>
                     </div>
                     : <></>
               }
               <div className='shart-check margin_top_10'>
                  {
                     CheckboxFun()
                  }
               </div>
               <div className='order-select margin_btm_10'>
                  <p>Guruh</p>
                  <Select
                     value={order?.group?.id ? groups?.find(x => x?.value === order?.group?.id) : selectedGroup}
                     defaultValue={order?.group?.id ? groups?.find(x => x?.value === order?.group?.id) : selectedGroup}
                     options={groups}
                     className='buyurtma_select_new group_selector'
                     styles={customStyles}
                     theme={makeTheme}
                     onChange={(event) => {
                        let newOrder = { ...order }
                        if (newOrder?.group?.id) {
                           newOrder.group.id = event.value
                        } else {
                           let groupObj = {
                              group: { id: event.value }
                           }
                           newOrder = Object.assign(newOrder, groupObj);
                           console.log(newOrder);
                        }
                        setOrder(newOrder)
                        setSelectedGroup(event)
                     }}
                  />
               </div>
               <Input
                  width='100%'
                  bordered
                  label="Status"
                  readOnly
                  value={dataSort(order?.status)}
                  className='filial_input'
                  color="secondary"
               />
               <Input
                  width='100%'
                  bordered
                  label="Zayavka raqami:"
                  value={order?.order_number}
                  className='filial_input'
                  color="secondary"
                  onChange={(e) => {
                     let newOrder = { ...order }
                     newOrder.order_number = e.target.value
                     setOrder(newOrder)
                  }}
               />
               <Input
                  width='100%'
                  bordered
                  label="Buyurtma kodi"
                  value={order?.code}
                  className='filial_input'
                  color="secondary"
                  onChange={(e) => {
                     let newOrder = { ...order }
                     newOrder.code = e.target.value
                     setOrder(newOrder)
                  }}
               />
               <div className='shart-selector'>
                  <p>Kredit ajratish tartibi</p>
                  <div className='margin_top_10'>
                     <Radio.Group
                        orientation="horizontal"
                        size='sm'
                        label=' '
                        defaultValue={order?.type_credit}
                        value={order?.type_credit}
                        onChange={(e) => {
                           let newOrder = { ...order }
                           newOrder.type_credit = e
                           setOrder(newOrder)
                        }}
                     >
                        <Radio orientation="horizontal" value={"card"}>Plastik karta / Hisobraqam</Radio>
                        <Radio orientation="horizontal" value={"cash"}>Naqd pul ko'rinishida</Radio>
                     </Radio.Group>
                  </div>
               </div>
               <Input
                  width='100%'
                  bordered
                  label="Buyurtma sanasi"
                  value={order?.order_date}
                  className='filial_input'
                  color="secondary"
                  type='date'
                  onChange={(e) => {
                     let newOrder = { ...order }
                     newOrder.order_date = e.target.value
                     setOrder(newOrder)
                  }}
               />
               <div className={`numeric_format_input border_radius_10 width_100`}>
                  <label>So'ralayotgan qarz miqdori</label>
                  <NumericFormat
                     thousandSeparator={' '}
                     value={order?.sum}
                     onChange={(e) => {
                        const changed_number = Number((e.target.value).replace(/\s/g, ''))
                        let newOrder = { ...order }
                        newOrder.sum = changed_number
                        setOrder(newOrder)
                     }}
                  />
               </div>
               <Input
                  className='filial_input'
                  width='100%'
                  label="So'ralayotgan muddat (oy)"
                  value={order?.time}
                  bordered
                  color="secondary"
                  type='number'
                  onWheel={(e) => e.target.blur()}
                  onChange={(e) => {
                     let newOrder = { ...order }
                     newOrder.time = e.target.value
                     setOrder(newOrder)
                  }}
               />
               <div className='order-select'>
                  {
                     sectionOptions ?
                        <>
                           <p>Mahsulot</p>
                           <Select
                              defaultValue={sectionOptions.find(x => x.value === order?.product?.id)}
                              value={sectionOptions.find(x => x.value === order?.product?.id)}
                              options={sectionOptions}
                              className='buyurtma_select_new'
                              styles={customStyles}
                              theme={makeTheme}
                              onChange={(e) => {
                                 let newOrder = { ...order }
                                 newOrder.product.id = e.value
                                 setOrder(newOrder)
                              }}
                           />
                        </> : <></>
                  }
               </div>
               <div className='order-select margin_top_10 margin_btm_10'>
                  {
                     sectorOptions?.[0] ?
                        <>
                           <p>Sector</p>
                           <Select
                              defaultValue={sectorOptions.find(x => x.value === order?.sector?.id)}
                              value={sectorOptions.find(x => x.value === order?.sector?.id)}
                              options={sectorOptions}
                              className='buyurtma_select_new sector_selector'
                              styles={customStyles}
                              theme={makeTheme}
                              onChange={(e) => {
                                 let newOrder = { ...order }
                                 newOrder.sector.id = e.value
                                 setOrder(newOrder)
                              }}
                           />
                        </> :
                        <></>
                  }
               </div>
               <Input
                  width='100%'
                  bordered
                  label="Maqsadi"
                  value={order?.aim}
                  className='filial_input'
                  color="secondary"
                  onChange={(e) => {
                     let newOrder = { ...order }
                     newOrder.aim = e.target.value
                     setOrder(newOrder)
                  }}
               />
               <Input
                  className='filial_input'
                  width='100%'
                  clearable
                  type='number'
                  onWheel={(e) => e.target.blur()}
                  min="0"
                  step=".01"
                  label="Ustama foiz stavkasi, yillik"
                  value={order?.percent_year}
                  bordered
                  color="secondary"
                  onChange={(e) => {
                     let newOrder = { ...order }
                     newOrder.percent_year = e.target.value
                     setOrder(newOrder)
                  }}
               />
               <Input
                  className='filial_input'
                  width='100%'
                  clearable
                  type='number'
                  onWheel={(e) => e.target.blur()}
                  min="0"
                  step=".01"
                  label="Penya, kunlik"
                  value={order?.daily_fine}
                  bordered
                  color="secondary"
                  onChange={(e) => {
                     let newOrder = { ...order }
                     newOrder.daily_fine = e.target.value
                     setOrder(newOrder)
                  }}
               />
               <div className='shart-selector'>
                  <p>So'ndirish tartibi</p>
                  <div className='margin_top_10'>
                     <Radio.Group
                        size='sm'
                        defaultValue={order?.type_repayment == 1 ? 1 : 2}
                        value={order?.type_repayment == 1 ? 1 : 2}
                        className='shart-selector-group'
                        label=' '
                        onChange={(event) => {
                           let newOrder = { ...order }
                           newOrder.type_repayment = event
                           setOrder(newOrder)
                        }}
                     >
                        <Radio value={1}>Bir qil miqdor(Annuitet)</Radio>
                        <Radio value={2}>Kamayib boruvchi(differensial)</Radio>
                     </Radio.Group>
                  </div>
               </div>
               <div className={`numeric_format_input border_radius_10 width_100`}>
                  <label>Oylik o'rtacha daromad</label>
                  <NumericFormat
                     thousandSeparator={' '}
                     value={order?.salary}
                     onChange={(e) => {
                        const changed_number = Number((e.target.value).replace(/\s/g, ''))
                        let newOrder = { ...order }
                        newOrder.salary = changed_number
                        setOrder(newOrder)
                     }}
                  />
               </div>
               {
                  cashInputAppearence()
               }
               {
                  supplyInfo?.length !== 0 ?
                     <div className='order-select margin_btm_10'>
                        <p>Ta'minot</p>
                        <div className='sector_selector'>
                           <Select
                              value={selectedSupply}
                              defaultValue={selectedSupply}
                              options={supplyInfo}
                              className='buyurtma_select_new sector_selector'
                              styles={customStyles}
                              theme={makeTheme}
                              onChange={(event) => {
                                 setSelectedSupply(event)
                              }}
                           />
                        </div>
                     </div> :
                     <div className='order-select margin_btm_10'>
                        <p>Ta'minot</p>
                        <span className='supply_without_warning'>Ta'minot hali qo'shilmagan</span>
                     </div>
               }
               <Input
                  width='100%'
                  bordered
                  type='date'
                  label="Buyurtma protokol raqam sanasi"
                  className='filial_input'
                  value={order?.protocol_result_date}
                  color="secondary"
                  {...register("protocol_result_date", { required: false })}
                  onChange={(e) => {
                     let newOrder = { ...order }
                     newOrder.protocol_result_date = e.target.value
                     setOrder(newOrder)
                  }}
               />
               <Input
                  width='100%'
                  bordered
                  label="Buyurtma protokol raqami"
                  className='filial_input'
                  value={order?.protocol?.code && typeof order?.protocol === 'object' ? order?.protocol?.code : ''}
                  color="secondary"
                  {...register("protocol.code", { required: false })}
                  onChange={(e) => {
                     let newOrder = { ...order }
                     if (typeof order?.protocol === 'string') {
                        newOrder.protocol = { code: e.target.value }
                     } else {
                        newOrder.protocol.code = e.target.value
                     }
                     setOrder(newOrder)
                  }}
               />
               {
                  role?.includes('director') ?
                     <>
                        <p className='black_text margin_btm_10'>Ovozlar:</p>
                        <div>
                           {
                              comments?.map((item, index) => {
                                 if (item?.name == userName) {
                                    return (<></>)
                                 }
                                 return (
                                    <div className='voice_input_container' key={index}>
                                       <Input
                                          width={role?.includes('admin') ? '93%' : '100%'}
                                          bordered
                                          label={`${item?.user} ${item?.is_accepted == 1 ? 'tasdiqladi' : 'rad etdi'}, izoh:`}
                                          className='filial_input'
                                          value={item?.comment}
                                          color="secondary"
                                       />
                                       {
                                          role?.includes('admin') ?
                                             <button
                                                className='kl1_delete_button'
                                                type='button'
                                                onClick={() => deleteVoice(item?.id)}
                                             >
                                                <i className='bx bx-trash'></i>
                                             </button> : <></>
                                       }
                                    </div>
                                 )
                              })
                           }
                        </div>
                        {
                           order?.order_results?.find(x => x.user === userName) ?
                              <></> :
                              <div className='endRow'>
                                 <button onClick={() => { openForm() }} className='voice_button' type='button'>Ovoz berish</button>
                              </div>
                        }
                     </> : <></>
               }
               <div className='submit-buttons'>
                  <button type='reset' className='client_submit reset back_red' onClick={() => { BackFun() }}>
                     O'zgarishni bekor qilish
                     <AiOutlineClear />
                  </button>
                  <button type='submit' disabled={disable} className={`client_submit submit back_green ${disable ? "disabled" : ""}`}>
                     O'zgarishni kiritish
                     <AiOutlineUserAdd />
                  </button>
               </div>
            </form>
            {
               order?.client?.id ?
                  <OpenContractModal
                     is_active={isOpenContractModal}
                     setIsActive={setIsOpenContractModal}
                     clientInfo={order?.client}
                     setOpenContractID={setOpenContractID}
                     open={open}
                     setOpen={setOpen}
                  /> : <></>
            }
         </section>
      </>
   )
}

export default OrderEdit