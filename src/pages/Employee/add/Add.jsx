import { useState, useEffect } from 'react';
import { useForm } from "react-hook-form";
import { AiOutlineClear, AiOutlineUserAdd } from 'react-icons/ai'
import { Input, Radio } from '@nextui-org/react';
import { alert } from '../../../components/Alert/alert';
import Select from 'react-select';
import LoaderBackdrop from '../../../components/Loader/LoaderBackdrop';
import Container from '../../../components/ImageContainer/Container';
import Prev from '../../../components/Prev/Prev';
import https from '../../../services/https';

const positions = [
   {
      value: 'chief_treasurer',
      label: "Bosh g'aznachi"
   },
   {
      value: 'head_of_credit',
      label: "Bosh kreditor"
   },
   {
      value: 'chief_accountant',
      label: "Bosh buxgalter"
   },
   {
      value: 'head_of_branch',
      label: "Boshqaruvchi"
   },
   {
      value: null,
      label: "Qo'mita azosi emas"
   }
]

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

function EmployeeForm() {
   const [path, setPath] = useState([])
   const [pinfl, setPinfl] = useState()
   const [filial, setFilial] = useState()
   const [section, setSection] = useState()
   const [gender, setGender] = useState('male')
   const [disable, setDisable] = useState(false)
   const [filialRole, setFilialRole] = useState()
   const [passport, setPassport] = useState(null)
   const [sectionRole, setSectionRole] = useState()
   const [graduation, setGraduation] = useState(true)
   const [filialOptions, setFilialOptions] = useState([])
   const [sectionOptions, setSectionOptions] = useState([])
   const [selectedPosition, setSelectedPosition] = useState(positions[0]?.value)

   async function fetchBranches() {
      const res = await https.get('/all/branches')
      let selectFilial = []
      res?.data?.map((item) => {
         selectFilial.push(
            { value: item?.id, label: item?.name }
         )
      })
      setFilialOptions(selectFilial)
      setFilial(selectFilial[0])
      setFilialRole(selectFilial[0].value)
   }

   async function fetchSection() {
      const ress = await https.get('/all/sections')
      let selectSection = []
      ress?.data?.map((item) => {
         selectSection.push(
            { value: item?.id, label: item?.name }
         )
      })
      setSectionOptions(selectSection)
      setSection(selectSection[0])
      setSectionRole(selectSection[0]?.value)
   }

   useEffect(() => {
      fetchBranches()
      fetchSection()
   }, [])

   // UseForm
   const { register,
      handleSubmit,
      watch,
      formState: { errors, isValid }
   } = useForm();

   const onSubmit = (data) => {
      setDisable(true);

      const newData = {
         ...data,
         branch_id: filialRole,
         section_id: sectionRole,
         position: selectedPosition,
         gender: gender,
         graduation: graduation,
         paths: path[0] ? path[0] : null
      }

      https
         .post('/employees', newData)
         .then(res => {
            if (res.status == 200) {
               setDisable(false);
               alert("Xodim qoshildi", 'success')
               console.log(newData);
            }
         })
         .catch(err => {
            setDisable(false);
            alert(err?.response?.data?.message, 'error')
            console.log(err);
            console.log(newData);
         })
   }

   return (
      <>
         <section className='xodimform'>
            <div className='xodimform_header'>
               <Prev />
            </div>
            <form className='xodimform_form' onSubmit={handleSubmit(onSubmit)}>
               <h1 className='xodimform_title'>Shakllarni To'ldiring:</h1>
               <div className='xodim_selectform'>
                  <p>Filiali</p>
                  <Select
                     width='100%'
                     defaultValue={filial}
                     value={filial}
                     options={filialOptions}
                     className='xodim_select'
                     styles={customStyles}
                     theme={(theme) => ({
                        ...theme,
                        borderRadius: 12,
                        colors: {
                           ...theme.colors,
                           primary25: 'rgb(216,215,215)',
                           primary: '#7828c8',
                        },
                     })}
                     onChange={(event) => {
                        setFilialRole(event.value)
                        setFilial(event)
                     }}
                  />
               </div>
               <div className='xodim_selectform'>
                  <p>Bo'limi</p>
                  <Select
                     width='100%'
                     defaultValue={section}
                     value={section}
                     options={sectionOptions}
                     className='xodim_select'
                     styles={customStyles}
                     theme={(theme) => ({
                        ...theme,
                        borderRadius: 12,
                        colors: {
                           ...theme.colors,
                           primary25: 'rgb(216,215,215)',
                           primary: '#7828c8',
                        },
                     })}
                     onChange={(event) => {
                        setSectionRole(event.value)
                        setSection(event)
                     }}
                  />
               </div>
               <Input
                  width='100%'
                  clearable
                  bordered
                  label="Ismi"
                  className='xodim_input'
                  color="secondary"
                  {...register("firstname", { required: true })}
               />
               <Input
                  width='100%'
                  clearable
                  bordered
                  label="Familiyasi"
                  className='xodim_input'
                  color="secondary"
                  {...register("surname", { required: true })}
               />
               <Input
                  width='100%'
                  clearable
                  bordered
                  label="Sharifi"
                  className='xodim_input'
                  color="secondary"
                  {...register("lastname", { required: true })}
               />
               <Radio.Group orientation="horizontal" label="Jinsi:" defaultValue="male" className='radio_group margin_bottom_15'
                  onChange={(e) => {
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
               <Input
                  width='100%'
                  clearable
                  bordered
                  label="Pasport raqami"
                  className='xodim_input'
                  color="secondary"
                  value={passport}
                  {...register("passport_data", { required: true })}
                  onChange={(e) => {
                     if (e.target.value.trim().length <= 9) {
                        setPassport(e.target.value.toUpperCase())
                     }
                  }}
               />
               <Input
                  width='100%'
                  clearable
                  bordered
                  label="PINFL"
                  className='xodim_input'
                  color="secondary"
                  type='number'
                  onWheel={(e) => e.target.blur()}
                  value={pinfl}
                  {...register("pinfl", { required: true })}
                  onChange={(e) => {
                     if (e.target.value.trim().length <= 14) {
                        setPinfl(e.target.value)
                     }
                  }}
               />
               <Input
                  width='100%'
                  clearable
                  bordered
                  label="Tajriba"
                  className='xodim_input'
                  color="secondary"
                  type='number'
                  onWheel={(e) => e.target.blur()}
                  min="0"
                  step=".01"
                  {...register("staj", { required: true })}
               />
               <Input
                  width='100%'
                  clearable
                  bordered
                  label="Stavka"
                  className='xodim_input'
                  color="secondary"
                  type='number'
                  onWheel={(e) => e.target.blur()}
                  min="0"
                  step=".01"
                  {...register("stavka", { required: true })}
               />
               <Radio.Group orientation="horizontal" label="Oliy ta'lim:" defaultValue={graduation} value={graduation} className='radio_group margin_bottom_15'
                  onChange={(e) => {
                     setGraduation(e)
                  }}
               >
                  <Radio value={true} color="secondary" size="sm">
                     Bor
                  </Radio>
                  <Radio value={false} color="secondary" size="sm" className='radio_second'>
                     Yo'q
                  </Radio>
               </Radio.Group>
               <Input
                  width='100%'
                  bordered
                  label="Shartnoma sanasi"
                  className='xodim_input'
                  color="secondary"
                  type='date'
                  {...register("contract_date", { required: true })}
               />
               <Input
                  width='100%'
                  clearable
                  bordered
                  label="Shartnoma turi"
                  className='xodim_input'
                  color="secondary"
                  {...register("contract_type", { required: true })}
               />
               <Input
                  width='100%'
                  clearable
                  bordered
                  label="Lavozim"
                  className='xodim_input'
                  color="secondary"
                  {...register("job", { required: true })}
               />
               <Input
                  width='100%'
                  clearable
                  bordered
                  label="Kod"
                  type='number'
                  onWheel={(e) => e.target.blur()}
                  className='xodim_input'
                  color="secondary"
                  {...register("code", { required: true })}
               />
               <div className='xodim_selectform'>
                  <p>Kommisiya</p>
                  <Select
                     width='100%'
                     defaultValue={positions?.find(x => x.value == selectedPosition)}
                     value={positions?.find(x => x.value == selectedPosition)}
                     options={positions}
                     className='xodim_select'
                     styles={customStyles}
                     theme={(theme) => ({
                        ...theme,
                        borderRadius: 12,
                        colors: {
                           ...theme.colors,
                           primary25: 'rgb(216,215,215)',
                           primary: '#7828c8',
                        },
                     })}
                     onChange={(event) => {
                        setSelectedPosition(event.value)
                     }}
                  />
               </div>

               <p className='margin_top_15'></p>
               <Container path={path} setPath={setPath} />

               <div className='xodim_buttons'>
                  <button type='reset' className='client_submit reset' onClick={() => { console.log(filial, section) }}>
                     Formani tiklash
                     <AiOutlineClear />
                  </button>
                  <button className='client_submit submit'>
                     Xodimni qo'shish
                     <AiOutlineUserAdd />
                  </button>
               </div>
            </form>
            <LoaderBackdrop disable={disable} />
         </section>
      </>
   )
}

export default EmployeeForm