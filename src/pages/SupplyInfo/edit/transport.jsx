import { useState } from 'react'
import { useMemo } from 'react';
import { useNavigate, useParams } from 'react-router-dom'
import { Input } from '@nextui-org/react'
import { AiOutlineClear, AiOutlineUserAdd } from 'react-icons/ai'
import { useForm } from "react-hook-form";
import { v4 as uuidv4 } from 'uuid';
import { Radio } from "@nextui-org/react";
import { List } from 'react-content-loader'
import { NumericFormat } from "react-number-format";
import { EditAutoOwner, EditAutoTrustOwner } from '../../../components/SupplyInfo/EditAutoOwner';
import { IndependentAutoEditSupply } from '../../../components/SupplyInfo/SupplyInfo';
import { AutoEditTable } from '../../../components/SupplyInfo/AutoTable';
import { alert } from '../../../components/Alert/alert'
import ContainerEdit from '../../../components/ImageContainer/ContainerEdit';
import LoaderBackdrop from '../../../components/Loader/LoaderBackdrop';
import Prev from '../../../components/Prev/Prev';
import https from '../../../services/https';
import { SinglePage } from '../../../utils/functions/supplySinglePage';

const options = [
   { value: '1', label: "O'zR fuqarosining ID kartasi" },
   { value: '2', label: "O'zR Fuqarosining biometrik pasporti" },
   { value: '3', label: "Harbiy xizmatchi guvohnomasi" },
   { value: '4', label: "Xizmat guvohnomasi" },
   { value: '5', label: "Xorijiy fuqaro pasporti" },
   { value: '6', label: "Yashash guvohnomasi" },
   { value: '7', label: "O'zR Fuqarosining pasporti" },
   { value: '8', label: "Tug'ulganlik haqidagi guvohnoma" },
   { value: '9', label: "O'zR fuqarosining yangi namunadagi haydovchilik guvohnomasi" },
   { value: '10', label: "Boshqa" }
];

const company_details = {
   id: 0,
   name: "",
   license: "",
   doc_code: "",
   valuer_name: "",
};

const owner_details = {
   fio: "",
   doc_type: "",
   serial_num: "",
   issued_by: "",
   issued_date: "",
   address: "",
   pinfl: "",
   phone: "",
};

const trust_owner_detail = {
   fio: "",
   doc_type: "",
   serial_num: "",
   issued_by: "",
   issued_date: "",
   address: "",
   pinfl: "",
   date: "",
   proxy_number: "",
};

function EditAuto() {
   const [trustOwner, setTrustOwner] = useState(trust_owner_detail)
   const [currentautoData, setCurrentAutoData] = useState({})
   const [company, setCompany] = useState(company_details)
   const [owner, setOwner] = useState(owner_details)
   const [disable, setDisable] = useState(false)
   const [loading, setLoading] = useState(true)
   const [autoInfo, setAutoInfo] = useState({})
   const [cars, setCars] = useState([])
   const [path, setPath] = useState([])
   const [giveSum, setGiveSum] = useState(0)
   const { handleSubmit } = useForm();
   const { id } = useParams()
   const navigate = useNavigate()

   async function getData() {
      await https
         .get(`/supply-info/${id}`)
         .then(({ data }) => {
            console.log(data);
            setAutoInfo(data)
            setPath(data?.images)
            setCurrentAutoData(data)
            if (data?.valued_by == 2) {
               setCompany(data?.company)
            }
            if (data?.possessor === "owner" || data?.possessor === "trust_owner") {
               setOwner(data?.owner)
            }
            if (data?.possessor === "trust_owner") {
               setTrustOwner(data?.trust_owner)
            }
            setCars(data?.auto)
            setLoading(false)
         })
         .catch(err => {
            console.log(err)
         })
   }

   useMemo(() => {
      getData()
   }, [id])

   function addNewCar() {
      let newCar = {
         id: uuidv4(),
         name: '',
         year: '',
         number: '',
         type_of_auto: '',
         engine_number: '',
         body_code: '',
         chassis: '',
         registrated_by: '',
         registration_date: '',
         sum: 0
      }
      setCars([...cars, newCar])
   }

   function deleteCar(id) {
      if (cars.length > 1) {
         let carItems = cars.filter(x => x.id !== id)
         setCars(carItems)
      }
   }

   function totalSum() {
      const total = (cars || []).reduce((acc, car) => Number(acc) + (Number(car?.sum) || 0), 0);
      return total;
   }

   function backFun() {
      setAutoInfo(currentautoData)
   }

   function radioColl() {
      if (autoInfo?.valued_by) {
         return (
            <Radio.Group label=' ' color='secondary' orientation="horizontal" defaultValue={autoInfo?.valued_by == 2 ? 2 : 1} size='sm' className='taminot_ratio'
               onChange={(event) => {
                  const newArray = { ...autoInfo }
                  newArray.valued_by = event
                  setAutoInfo(newArray)
               }}
            >
               <Radio value={2}>Mustaqil Baholash Asosida</Radio>
               <Radio value={1}>O'zaro kelishuvga asosan</Radio>
            </Radio.Group>
         )
      } else {
         <></>
      }
   }

   function radioThree() {
      if (autoInfo?.possessor) {
         return (
            <div className='transport_garov'>
               <p>Garov mulkining egasi</p>
               <div className="radio_inputs">
                  <Radio.Group label=' ' orientation="horizontal" color='secondary' defaultValue={autoInfo?.possessor} size='sm' className='transport_garov_radioGroup' onChange={(e) => {
                     const newArray = { ...autoInfo }
                     newArray.possessor = e
                     setAutoInfo(newArray)
                  }}>
                     <Radio value={'client'} className='transport_garov_radio'>Mijozning o'zi</Radio>
                     <Radio value={'owner'} className='transport_garov_radio'>Uchinchi shaxs</Radio>
                     <Radio value={'trust_owner'} className='transport_garov_radio'>Ishonchnoma asosida</Radio>
                  </Radio.Group>
               </div>
            </div>
         )
      }
   }

   async function pushingData(data) {
      try {
         const response = await https.post('/autos', data);
         alert("Ta'minot o'zgartirildi", 'success');
         navigate(`/taminot/singleavto/${id}`);
      } catch (err) {
         const errorMessage = err?.response?.data?.message || "Xatolik";
         alert(errorMessage, 'error');
      } finally {
         setDisable(false);
      }
   }

   const mainRequest = async (post_data) => {
      const { data } = await https.patch(`/supply-info/${id}`, post_data);
      return data.id
   }

   const onSubmit = async () => {
      const total = totalSum()
      const transports = cars?.map(({ id, ...item }) => item);
      
      if(((autoInfo?.sum / totalSum()) * 100) > 100) return alert("Qabul qilish qiymati 100% dan ortiq", 'error');
      setDisable(true);

      const main_data = {
         client_id: currentautoData?.client_id,
         type: 'auto',
         possessor: autoInfo?.possessor,
         valued_by: autoInfo?.valued_by,
         sum: giveSum === 0 ? autoInfo?.sum : giveSum,
         date: autoInfo?.date,
         percent: ((giveSum === 0 || totalSum() === 0) ? 0 : ((giveSum / totalSum()) * 100).toFixed(1)) === 0 ? autoInfo?.percent : ((giveSum === 0 || totalSum() === 0) ? 0 : ((giveSum / totalSum()) * 100).toFixed(1)),
         paths: path,
         auto: transports
      }

      if(+autoInfo?.valued_by === 2){
         const companyWithoutId = { ...company };
         delete companyWithoutId.id
         Object.assign(main_data, {company: companyWithoutId})
      }

      if(autoInfo?.possessor === 'owner' || autoInfo?.possessor === 'trust_owner'){
         Object.assign(main_data, {owner: { ...owner, is_guarrantor: false }})
      }

      if(autoInfo?.possessor === 'trust_owner'){
         Object.assign(main_data, {trust_owner: { ...trustOwner }})
      }


      try {
         const res = await mainRequest(main_data)
         alert("Ta'minot o'zgartirildi", 'success');
         // SinglePage('auto', id)
      } catch (err) {
         console.log(err)
         const errorMessage = err?.response?.data?.message || "Xatolik";
         alert(errorMessage, 'error');
      } finally {
         setDisable(false)
      }
   };

   return (
      <>
         <section>
            <div className='filialform_header'>
               <Prev />
            </div>
            <div className='single_buyurtma'>
               {
                  loading ? (
                     <div className='margin_top_30'>
                        <List />
                     </div>
                  ) : (
                     <>
                        <h1 className='text_center filial_edit_text'>{autoInfo?.client_name}</h1>
                        <div className='pdf_margin_top_15'>
                           <form onSubmit={handleSubmit(onSubmit)} className='single_buyurtma_info'>
                              <>
                                 {
                                    radioThree()
                                 }
                                 <div className='taminot_ratio_parent taminot_tilla_radio'>
                                    {
                                       radioColl()
                                    }
                                 </div>
                              </>
                              <IndependentAutoEditSupply
                                 autoInfo={autoInfo}
                                 company={company}
                                 setCompany={setCompany}
                              />
                              <div className='transport_mainInputs'>
                                 <Input
                                    label='Baholovchi hujjat sanasi'
                                    width='100%'
                                    color="secondary"
                                    bordered
                                    required
                                    type='date'
                                    className='transport_mainInputs_input'
                                    value={autoInfo?.date}
                                    onChange={(e) => {
                                       const newArray = { ...autoInfo }
                                       newArray.date = e.target.value
                                       setAutoInfo(newArray)
                                    }}
                                 >
                                 </Input>
                                 <Input
                                    label='Baholangan qiymati'
                                    value={totalSum()?.toLocaleString(undefined, { minimumFractionDigits: 2 })}
                                    readOnly
                                    width='100%'
                                    color="secondary"
                                    bordered
                                    className='transport_mainInputs_input'
                                 >
                                 </Input>
                              </div>
                              <AutoEditTable
                                 cars={cars}
                                 setCars={setCars}
                                 autoInfo={autoInfo}
                                 setAutoInfo={setAutoInfo}
                                 addNewCar={addNewCar}
                                 deleteCar={deleteCar}
                                 totalSum={totalSum}
                              />

                              <div className='transport_endMainInputs'>
                                 <Input
                                    label='Qabul qilish qiymati, %da'
                                    width='100%'
                                    color="secondary"
                                    className='transport_endMainInputs_input margin_btn_15'
                                    bordered
                                    value={(autoInfo?.sum == 0 || totalSum() == 0) ? 0 : ((autoInfo?.sum / totalSum()) * 100).toFixed(1)}
                                    readOnly
                                 >
                                 </Input>
                                 <div className={`numeric_format_input border_radius_10 width_100`}>
                                    <label>Qabul qilish qiymati, so'mda</label>
                                    <NumericFormat
                                       thousandSeparator={' '}
                                       value={autoInfo?.sum}
                                       onChange={(e) => {
                                          const changed_number = Number((e.target.value).replace(/\s/g, ''))
                                          const newArray = { ...autoInfo }
                                          newArray.sum = changed_number
                                          newArray.percent = (changed_number == 0 || totalSum() == 0) ? 0 : ((changed_number / totalSum()) * 100).toFixed(1)
                                          setAutoInfo(newArray)
                                          setGiveSum(changed_number)
                                       }}
                                    />
                                 </div>
                              </div>
                              <p className='margin_top_15'></p>
                              <ContainerEdit path={path} setPath={setPath} />
                              {
                                 autoInfo?.possessor == 'trust_owner' || autoInfo?.possessor == 'owner' ?
                                    <EditAutoOwner
                                       autoInfo={autoInfo}
                                       owner={owner}
                                       setOwner={setOwner}
                                       options={options}
                                    />
                                    : null
                              }
                              {
                                 autoInfo?.possessor == 'trust_owner' ?
                                    <EditAutoTrustOwner
                                       autoInfo={autoInfo}
                                       trustOwner={trustOwner}
                                       setTrustOwner={setTrustOwner}
                                       options={options}
                                    />
                                    : null
                              }
                              <div className='xodim_buttons'>
                                 <button type='button' className='client_submit reset back_red' onClick={() => { backFun() }}>
                                    O'zgarishni bekor qilish
                                    <AiOutlineClear />
                                 </button>
                                 <button type='submit' className='client_submit submit back_green'>
                                    O'zgarishni kiritish
                                    <AiOutlineUserAdd />
                                 </button>
                              </div>
                           </form>
                        </div>
                     </>)
               }
            </div>
         </section>
         <LoaderBackdrop disable={disable} />
      </>
   )
}

export default EditAuto