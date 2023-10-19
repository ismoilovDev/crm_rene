import React, { useEffect, useState } from 'react'
import { useForm } from "react-hook-form";
import { Input } from '@nextui-org/react'
import { AiOutlineClear, AiOutlineUserAdd } from 'react-icons/ai'
import { makeTheme } from '../../../components/Order/Functions';
import { alert } from '../../../components/Alert/alert';
import Select from 'react-select';
import Prev from '../../../components/Prev/Prev'
import https from '../../../services/https';

const customStyles = {
   option: (provided, state) => ({
      ...provided,
      padding: 5,
      borderRadius: 5
   }),
   singleValue: (provided, state) => {
      const opacity = state.isDisabled ? 0.5 : 1;
      const transition = 'opacity 300ms';
      return { ...provided, opacity, transition };
   }
}

function UserForm() {
   // UseForm
   const { register,
      handleSubmit,
      watch,
      formState: { errors, isValid }
   } = useForm();

   // Filial Section
   const [workerOptions, setWorkerOptions] = useState({})
   const [worker, setWorker] = useState([])

   async function fetchWorkers() {
      const res = await https.get('/employees-all')
      let selectWorkers = []
      res?.data?.map((item) => {
         selectWorkers.push(
            { value: item?.id, label: item?.name }
         )
      })
      setWorkerOptions(selectWorkers)
      setWorker(selectWorkers[0])
   }

   const [roles, setRoles] = useState([])

   async function fetchRoles() {
      const res = await https.get('/roles')
      let selectRoles = []
      res?.data?.map((item) => {
         selectRoles.push(
            { value: item?.id, label: item?.name }
         )
      })
      setRoles(selectRoles)
   }

   const [filialOptions, setFilialOptions] = useState([])
   const [filial, setFilial] = useState()

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
   }

   useEffect(() => {
      fetchWorkers()
      fetchRoles()
      fetchBranches() 
   }, [])

   const [role, setRole] = useState([roles[0]])
   // WARNING MODALKA
   const [resetWarning, setResetWarning] = useState('warning_reset_main close')

   function openReset(e) {
      e.preventDefault()
      setResetWarning('warning_reset_main open')
   }
   function closeReset(e) {
      e.preventDefault()
      setResetWarning('warning_reset_main close')
   }

   const onSubmit = (data) => {
      let info = { ...data, 
         role: role, 
         employee_id: worker?.value,
         branch_id:filial?.value
      }
      
      if (info?.password !== info?.password_confirmation) {
         alert("Parollar mos kelmayapti", 'error')
      } else {
         https
            .post('/register', info)
            .then(res => {
               alert("Foydalanuvchi qoshildi", 'success')
               console.log(info);
            })
            .catch(err => {
               alert(err?.response?.data?.message, 'error')
               console.log(info);
            })
      }
   }

   return (
      <>
         {/* Reset Warning */}
         <div className={resetWarning}>
            <p>Haqiqatan ham ma'lumontlarni qayta tiklamoqchimisiz?</p>
            <div >
               <button onClick={closeReset}>Ha</button>
               <button onClick={closeReset}>Yoq</button>
            </div>
         </div>

         <section className='filialform'>
            <div className='filialform_header'>
               <Prev />
            </div>
            <form className='filialform_form' onSubmit={handleSubmit(onSubmit)}>
               <h1 className='filialform_title'>Shakllarni To'ldiring:</h1>
               <Input
                  width='100%'
                  clearable
                  bordered
                  label="Ismi"
                  className='filial_input'
                  color="secondary"
                  {...register("firstname", { required: true })}
               />
               <Input
                  width='100%'
                  clearable
                  bordered
                  label="Familiyasi"
                  className='filial_input'
                  color="secondary"
                  {...register("surname", { required: true })}
               />
               <Input
                  width='100%'
                  clearable
                  bordered
                  label="Sharifi"
                  className='filial_input'
                  color="secondary"
                  {...register("lastname", { required: true })}
               />
               <Input
                  width='100%'
                  clearable
                  bordered
                  label="Email"
                  className='filial_input'
                  color="secondary"
                  {...register("email", { required: true })}
               />
               <Input
                  width='100%'
                  clearable
                  bordered
                  label="Parol"
                  className='filial_input'
                  color="secondary"
                  {...register("password", { required: true })}
               />
               <Input
                  width='100%'
                  clearable
                  bordered
                  label="Parolni tasdiqlash"
                  className='filial_input'
                  color="secondary"
                  {...register("password_confirmation", { required: true })}
               />
               <div className='order-select'>
                  <p>Xodim</p>
                  <Select
                     width='100%'
                     defaultValue={worker}
                     value={worker}
                     options={workerOptions}
                     className='xodim_select basic-multi-select'
                     classNamePrefix="select"
                     styles={customStyles}
                     theme={makeTheme}
                     onChange={(event) => { setWorker(event) }}
                  />
               </div>
               <div className='order-select margin_top_15'>
                  <p>Roli</p>
                  <Select
                     width='100%'
                     defaultValue={[roles[0]]}
                     isMulti
                     options={roles}
                     className='xodim_select basic-multi-select'
                     classNamePrefix="select"
                     styles={customStyles}
                     theme={makeTheme}
                     onChange={(event) => {
                        let arr = []
                        event?.map(item => {
                           arr.push(item.value)
                        })
                        setRole(arr)
                     }}
                  />
               </div>
               <div className='order-select margin_top_15'>
                  <p>Filiali</p>
                  <Select
                     width='100%'
                     defaultValue={filial}
                     value={filial}
                     options={filialOptions}
                     className='xodim_select'
                     styles={customStyles}
                     theme={makeTheme}
                     onChange={(event) => {
                        setFilial(event)
                     }}
                  />
               </div>
               <div className='filial_buttons'>
                  <button type='button' className='client_submit reset' onClick={openReset}>
                     Formani tiklash
                     <AiOutlineClear />
                  </button>
                  <button type='submit' className='client_submit submit'>
                     Foydalanuvchini qo'shish
                     <AiOutlineUserAdd />
                  </button>
               </div>
            </form>
         </section>
      </>
   )
}

export default UserForm;