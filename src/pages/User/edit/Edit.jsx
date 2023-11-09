import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { Checkbox, Input, Tooltip } from '@nextui-org/react'
import { AiOutlineClear, AiOutlineQuestionCircle, AiOutlineUserAdd } from 'react-icons/ai'
import { makeTheme, customStyles } from '../../../components/Order/Functions';
import { alert } from '../../../components/Alert/alert';
import Select from 'react-select';
import Prev from '../../../components/Prev/Prev'
import https from '../../../services/https';

const userID = window.localStorage.getItem('user_id')

function UserEdit() {
   let { id } = useParams()
   const [user, setUser] = useState({})
   const [roles, setRoles] = useState([])
   const [backUser, setBackUser] = useState({})
   const [filialOptions, setFilialOptions] = useState([])

   async function fetchRoles() {
      try {
         const res = await https.get('/roles')
         let selectRoles = []
         res?.data?.map((item) => {
            selectRoles.push(
               { value: item?.id, label: item?.name }
            )
         })
         setRoles(selectRoles)
      }
      catch (err) {
         console.log(err);
      }
   }


   async function fetchBranches() {
      try {
         const res = await https.get('/all/branches')
         let selectFilial = []
         res?.data?.map((item) => {
            selectFilial.push(
               { value: item?.id, label: item?.name }
            )
         })
         setFilialOptions(selectFilial)
      }
      catch (err) {
         console.log(err);
      }
   }

   async function getData() {
      try {
         const res = await https.get(`/users/${id}`)
         const { data } = res
         setUser(data)
         setBackUser(data)
      }
      catch (err) {
         console.log(err);
      }
   }
   
   function backFun() {
      setUser(backUser)
   }

   function findRoles() {
      let rolesArr = []
      user?.role?.map(item => {
         rolesArr.push(roles?.find(x => x.value == item?.id))
      })
      return (rolesArr)
   }

   useEffect(() => {
      fetchBranches()
      fetchRoles()
      getData()
   }, [])

   function onSubmit() {
      let roless = []
      user?.role?.map(item => {
         roless.push(roles?.find(x => x?.value == item?.id)?.label)
      })

      const data = {
         firstname: user?.firstname,
         surname: user?.surname,
         lastname: user?.lastname,
         email: user?.email,
         password: user?.password,
         password_confirmation: user?.password,
         is_active: user?.is_active,
         employee_id: user?.employee?.id,
         branch_id: user?.branch?.id,
         role: roless
      }
      https
         .patch(`/update/users/${id}`, data)
         .then(_ => {
            alert("User o'zgartirildi", 'success')
            if (user?.id === userID) {
               let roless = []
               user?.role?.map(item => {
                  roless.push(item?.id)
               })
               window.localStorage.removeItem('name')
               window.localStorage.setItem('name', user?.name)
               window.localStorage.removeItem('role')
               window.localStorage.setItem('role', JSON.stringify(roless))
            }
            console.log(data)
         })
         .catch(err => {
            alert(err?.response?.data?.message, 'error')
            console.log(err);
            console.log(data);
         })
   }

   return (
      <section>
         <div className='filialform_header'>
            <Prev />
         </div>
         <div className='FilialEditTable single_buyurtma'>
            <h1 className='text_center filial_edit_text'>{user?.name}</h1>
            <div className="controls_item">
               <Tooltip content="Foydalanuvchini aktiv yoki passiv qilish." placement="topStart">
                  <label htmlFor='contract'>
                     Foydalanuvchining holati
                     <AiOutlineQuestionCircle />
                  </label>
               </Tooltip>
               <Checkbox
                  size='md'
                  id='contract'
                  color="secondary"
                  isSelected={user?.is_active}
                  onChange={_ => {
                     let newUser = { ...user }
                     newUser.is_active = !user?.is_active
                     setUser(newUser)
                  }}
               >
                  Foydalanuvchi aktiv
               </Checkbox>
            </div>
            <Input
               width='100%'
               bordered
               label="Ismi"
               value={user?.firstname}
               className='filial_input'
               color="secondary"
               onChange={(e) => {
                  let newUser = { ...user }
                  newUser.firstname = e.target.value
                  setUser(newUser)
               }}
            />
            <Input
               width='100%'
               bordered
               label="Familiyasi"
               value={user?.surname}
               className='filial_input'
               color="secondary"
               onChange={(e) => {
                  let newUser = { ...user }
                  newUser.surname = e.target.value
                  setUser(newUser)
               }}
            />
            <Input
               width='100%'
               bordered
               label="Sharifi"
               value={user?.lastname}
               className='filial_input'
               color="secondary"
               onChange={(e) => {
                  let newUser = { ...user }
                  newUser.lastname = e.target.value
                  setUser(newUser)
               }}
            />
            <Input
               width='100%'
               bordered
               label="Email"
               type='email'
               value={user?.email}
               className='filial_input'
               color="secondary"
               onChange={(e) => {
                  let newUser = { ...user }
                  newUser.email = e.target.value
                  setUser(newUser)
               }}
            />
            <Input
               width='100%'
               bordered
               label="Parol"
               value={user?.password}
               className='filial_input'
               color="secondary"
               onChange={(e) => {
                  let newUser = { ...user }
                  newUser.password = e.target.value
                  setUser(newUser)
               }}
            />

            <div className='order-select'>
               <p>Roli</p>
               <Select
                  width='10%'
                  defaultValue={findRoles()}
                  value={findRoles()}
                  isMulti
                  options={roles}
                  className='xodim_select basic-multi-select'
                  classNamePrefix="select"
                  styles={customStyles}
                  theme={makeTheme}
                  onChange={(event) => {
                     let arr = []
                     event?.map(item => {
                        arr.push({
                           id: item.value
                        })
                     })
                     let newUser = { ...user }
                     newUser.role = arr
                     setUser(newUser)
                  }}
               />
            </div>
            {
               <div className='order-select margin_top_15'>
                  <p>Filial</p>
                  <Select
                     width='100%'
                     maxMenuHeight="150px"
                     options={filialOptions}
                     defaultValue={filialOptions?.find(x => x.value == user.branch?.id)}
                     value={filialOptions?.find(x => x.value == user.branch?.id)}
                     className='xodim_select basic-multi-select'
                     classNamePrefix="select"
                     styles={customStyles}
                     theme={makeTheme}
                     onChange={(event) => {
                        let newUser = { ...user }
                        newUser.branch.id = event.value
                        setUser(newUser)
                     }}
                  />
               </div>
            }
            <div className='xodim_buttons'>
               <button type='reset' className='client_submit reset back_red' onClick={() => { backFun() }}>
                  O'zgarishni bekor qilish
                  <AiOutlineClear />
               </button>
               <button type='submit' className='client_submit submit back_green' onClick={() => { onSubmit() }}>
                  O'zgarishni kiritish
                  <AiOutlineUserAdd />
               </button>
            </div>
         </div>
      </section>
   )
}

export default UserEdit;