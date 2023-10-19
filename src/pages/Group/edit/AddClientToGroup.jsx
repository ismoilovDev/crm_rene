import { useState, useEffect, } from 'react';
import { useLocation } from 'react-router-dom';
import { AiOutlineUserAdd } from 'react-icons/ai';
import { Input, Radio } from '@nextui-org/react';
import { useForm } from "react-hook-form";
import { v4 as uuidv4 } from 'uuid';
import Select from 'react-select';
import { useRegions } from '../../../hooks/useRegions';
import { alert } from '../../../components/Alert/alert';
import { useCountries } from '../../../hooks/useCountries';
import { useDistricts } from '../../../hooks/useDistricts';
import Prev from '../../../components/Prev/Prev';
import https from '../../../services/https';

const sectionOptions = [
   { value: '1', label: "O'zR fuqarosining ID kartasi" },
   { value: '2', label: "O'zR Fuqarosining pasporti" },
   { value: '3', label: "Harbiy xizmatchi guvohnomasi" },
   { value: '4', label: "Xizmat guvohnomasi" },
   { value: '5', label: "Xorijiy fuqaro pasporti" },
   { value: '6', label: "Yashash guvohnomasi" },
   { value: '7', label: "O'zR Fuqarosining biometrik pasporti" },
   { value: '8', label: "Tug'ulganlik haqidagi guvohnoma" },
   { value: '9', label: "O'zR fuqarosining yangi namunadagi haydovchilik guvohnomasi" },
   { value: '10', label: "Boshqa" }
]

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

const theme = theme => ({
   ...theme,
   borderRadius: 12,
   colors: {
      ...theme.colors,
      primary25: '#7828c8',
      primary: '#7828c8',
   },
})

function AddClientToGroup() {
   const regions = useRegions()
   const location = useLocation()
   const countries = useCountries()
   const districts = useDistricts()
   const groupId = location?.state?.id
   const [pinfl, setPinfl] = useState()
   const [gender, setGender] = useState('male')
   const [document, setDocument] = useState('')
   const [disable, setDisable] = useState(false)
   const [groupName, setGroupName] = useState('')
   const [selectedRegion, setSelectedRegion] = useState({})
   const [section, setSection] = useState(sectionOptions[0])
   const [selectedCountry, setSelectedCountry] = useState({})
   const [selectedDistrict, setSelectedDistrict] = useState({})
   const [phoneArray, setPhoneArray] = useState([{ id: 1, phone: "", }])
   const [sectionRole, setSectionRole] = useState(sectionOptions[0].label)
   const { register, handleSubmit } = useForm()

   useEffect(() => {
      getGroupDetails()
      setSelectedCountry(countries[238])
      setSelectedRegion(regions[0])
      setSelectedDistrict(districts[0])
   }, [])

   async function getGroupDetails() {
      try {
         const { data } = await https.get(`/groups/${groupId}`)
         setGroupName(data?.name)
      } catch (err) {
         console.log(err)
      }
   }

   function addPhoneNumber() {
      let newNumber = [{
         id: uuidv4(),
         phone: ""
      }]
      setPhoneArray(phoneArray.concat(newNumber))
   }

   function deletePhoneNumber(id) {
      if (phoneArray.length > 1) {
         let sortedArray = phoneArray.filter(item => item?.id !== id)
         setPhoneArray(sortedArray)
      }
   }

   const handleChange = event => {
      const result = event.target.value.toUpperCase();
      setDocument(result)
   }

   const onSubmit = (data) => {
      setDisable(true)
      let now = new Date()
      if (new Date(data.birth_date) > new Date(now.getFullYear(), now.getMonth(), now.getDate())) {
         return alert("Tug'ilgan sana noto'g'ri", 'error')
      }
      if (new Date(data.doc_end) < new Date(now.getFullYear(), now.getMonth(), now.getDate())) {
         return alert('Hujjat muddati tugagan', 'error')
      }
      let newData = JSON.parse(JSON.stringify(data))
      let numberArray = []
      phoneArray.map(item => {
         numberArray.push(`+998${item?.phone}`)
      })

      let info = {
         ...newData, doc_type: sectionRole,
         city: selectedRegion.label,
         district: selectedDistrict.label,
         citizenship: selectedCountry.label,
         phone: numberArray,
         gender: gender
      }
      info.code = `99${info?.code}`

      https
         .post('/clients', info)
         .then(res => {
            https
               .post(`/client/${res?.data?.client_id}/group/${groupId}`)
               .then(_ => {
                  alert("Klient qoshildi",)
                  setDisable(false)
               })
               .catch(err => {
                  alert(err?.response?.data?.message, 'error')
                  setDisable(false)
               })
         })
         .catch(err => {
            alert(err?.response?.data?.message, 'error')
            setDisable(false)
         })
   }

   return (
      <>
         <Prev />
         <div className='client_form'>
            <div className='clientform_head'>
               <div className='clientform_title_container'>
                  <div className='clientform_title'><p>Yangi guruh a'zosi</p></div>
               </div>
            </div>

            <form className='clientform_form margin_top_20' onSubmit={handleSubmit(onSubmit)} >
               <Input
                  width='100%'
                  readOnly
                  label="Guruh nomi"
                  value={groupName}
                  className='vall'
                  bordered
                  color="secondary"
               />
               <Input
                  width='100%'
                  clearable
                  label="Klient kodi"
                  placeholder='1234'
                  labelLeft='99'
                  className='vall'
                  bordered
                  color="secondary"
                  type='number'
                  {...register("code", { required: true, minLength: 6, maxLength: 6 })}
               />
               <Input
                  width='100%'
                  clearable
                  label="F.I.SH."
                  placeholder='Jane'
                  bordered
                  className='vall'
                  color="secondary"
                  required
                  {...register("name", { required: true })}
               />
               <Input
                  width='100%'
                  label="Tug'ilgan sana"
                  bordered
                  className='vall'
                  type='date'
                  color="secondary"
                  required
                  {...register("birth_date", { required: true })}
               />
               <Input
                  width='100%'
                  clearable
                  label="Doimi manzil"
                  bordered
                  className='vall'
                  placeholder='2nd Boulevar'
                  color="secondary"
                  required
                  {...register("address", { required: true })}
               />
               <div className='clientForm_selector'>
                  <p>Shahar</p>
                  <Select
                     defaultValue={selectedRegion}
                     value={selectedRegion}
                     options={regions}
                     className={"buyurtma_select_new region_select"}
                     styles={customStyles}
                     theme={theme}
                     onChange={(event) => {
                        setSelectedRegion(event)
                     }}
                  />
               </div>
               <div className='clientForm_selector margin_top_15 margin_btn_15'>
                  <p>Tuman</p>
                  <Select
                     defaultValue={selectedDistrict}
                     value={selectedDistrict}
                     options={districts}
                     className='buyurtma_select_new ditrict_select'
                     styles={customStyles}
                     theme={theme}
                     onChange={(event) => {
                        setSelectedDistrict(event)
                     }}
                  />
               </div>
               <Input
                  width='100%'
                  clearable
                  label="Vaqtinchalik yashash joyi"
                  bordered
                  className='vall'
                  placeholder='2nd Boulevar'
                  color="secondary"
                  {...register("temp_address", { required: null })}
               />
               <Radio.Group orientation="horizontal" label="Jinsi:" defaultValue="male" className='radio_group'
                  onChange={e => {
                     setGender(e)
                  }}
               >
                  <Radio value="male" color="secondary" size="sm">
                     Erkak
                  </Radio>
                  <Radio value="female" color="secondary" size="sm" className='radio_second'>
                     Ayol
                  </Radio>
               </Radio.Group>

               <div className='clientForm_selector margin_btn_15'>
                  <p>Fuqarolik</p>
                  <Select
                     defaultValue={selectedCountry}
                     value={selectedCountry}
                     options={countries}
                     className='buyurtma_select_new country_select'
                     styles={customStyles}
                     theme={theme}
                     onChange={(event) => {
                        setSelectedCountry(event)
                     }}
                  />
               </div>
               <Input
                  width='100%'
                  clearable
                  label="Millat"
                  bordered
                  className='vall'
                  placeholder='Uzbek'
                  color="secondary"
                  required
                  {...register("nationality", { required: true })}
               />
               <Input
                  width='100%'
                  clearable
                  label="PINFL"
                  bordered
                  className='vall'
                  value={pinfl}
                  color="secondary"
                  required
                  type='number'
                  {...register("pinfl", { required: true, minLength: 14, maxLength: 14 })}
                  onChange={(e) => {
                     if (e.target.value.trim().length < 15) {
                        setPinfl(e.target.value)
                     }
                  }}
               />
               {
                  phoneArray?.map((item, index) => {
                     return (
                        <div className='kl1_product' key={item?.id}>
                           <Input
                              width='93%'
                              clearable
                              label={`Telefon raqami (${index + 1})`}
                              bordered
                              className='vall'
                              pattern='[0-9]'
                              labelLeft='+998'
                              placeholder='991235678'
                              type="number"
                              color="secondary"
                              required
                              value={phoneArray?.find(x => x.id == item?.id).phone}
                              onChange={(e) => {
                                 let array = [...phoneArray]
                                 array[index].phone = e.target.value
                                 setPhoneArray(array)
                              }}
                           />
                           <button
                              className='kl1_delete_button'
                              type='button'
                              onClick={() => deletePhoneNumber(item?.id)}
                           >
                              <i className='bx bx-trash'></i>
                           </button>
                        </div>
                     )
                  })
               }
               <div className='margin_bottom20'>
                  <button
                     className='kl1_add_button'
                     type='button'
                     onClick={() => { addPhoneNumber() }}
                  >
                     Telefon raqam qo'shish
                  </button>
               </div>
               <div className='clientForm_selector margin_btn_15'>
                  <p>Shaxsini tasdiqlovchi hujjat</p>
                  <Select
                     defaultValue={section}
                     value={section}
                     options={sectionOptions}
                     className='buyurtma_select_new'
                     styles={customStyles}
                     theme={theme}
                     onChange={(event) => {
                        setSectionRole(event.label)
                        setSection(event)
                     }}
                  />
               </div>
               <Input
                  width='100%'
                  clearable
                  label="Hujjat seriya raqami"
                  bordered
                  value={document}
                  className='vall bigLetter'
                  placeholder='AD123456789'
                  color="secondary"
                  required
                  {...register("serial_num", { required: true })}
                  onChange={(e) => { handleChange(e) }}
               />
               <Input
                  width='100%'
                  clearable
                  label="Kim tomondan berildi"
                  bordered
                  placeholder='Mamedov Kamal'
                  className='vall'
                  color="secondary"
                  required
                  {...register("issued_by", { required: true })}
               />
               <Input
                  width='100%'
                  label="Hujjat berilgan sana"
                  bordered
                  className='vall'
                  type='date'
                  color="secondary"
                  required
                  {...register("issued_date", { required: true })}
               />
               <Input
                  width='100%'
                  label="Hujjat tugash sana"
                  bordered
                  className='vall'
                  type='date'
                  color="secondary"
                  required
                  {...register("doc_end", { required: true })}
               />
               <Input
                  width='100%'
                  label="Ish lavozmi"
                  placeholder='Web-Developer'
                  bordered
                  className='vall'
                  color="secondary"
                  required
                  {...register("job", { required: true })}
               />
               <div className='submit-buttons'>
                  <button type='submit' disabled={disable} className={`client_submit ${disable ? "disabled" : ""} submit`}>
                     Guruhga klientni qo'shish
                     <AiOutlineUserAdd />
                  </button>
               </div>
            </form>
         </div>
      </>
   )
}

export default AddClientToGroup;