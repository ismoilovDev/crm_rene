import { useState, useEffect } from 'react'
import { useParams, Link, useNavigate } from 'react-router-dom';
import { AiOutlineClear, AiOutlineUserAdd } from 'react-icons/ai'
import { Input } from '@nextui-org/react';
import { alert } from '../../../components/Alert/alert';
import { ClientsMultiSelect } from '../../../components/MultiSelect/ClientSelect';
import Prev from '../../../components/Prev/Prev';
import https from '../../../services/https';


function EditGroup() {
   const { id } = useParams()
   const navigate = useNavigate()
   const [group, setGroup] = useState({})
   const [groupClients, setGroupClients] = useState([])
   const [clients, setClients] = useState([])
   const [selected, setSelected] = useState([])
   const [options, setOptions] = useState([])
   const [value, setValue] = useState([])
   const [disable, setDisable] = useState(false)
   const [addForm, setAddForm] = useState('add_mahsulot_main close')

   useEffect(() => {
      getGroup()
      allClients()
   }, [id])

   useEffect(() => {
      allOptions()
   }, [clients, groupClients]);

   async function getGroup() {
      await https
         .get(`/groups/${id}`)
         .then(res => {
            setGroup(res.data)
            setGroupClients(res?.data?.clients)
         })
         .catch(err => console.log(err))
   }

   async function allClients() {
      await https.get('/clients-all?page=1')
         .then(({ data }) => {
            setClients(data.data)
         })
         .catch(err => console.log(err))
   }

   // Add Clients with local ------>
   function allOptions() {
      const newOptions = clients?.filter((itemAClient) => !groupClients?.some((itemG) => itemG.id === itemAClient.id)).map(item => {
         return {
            label: item.name,
            value: item.id
         }
      });
      setOptions(newOptions)
   }

   function selectedClient(items) {
      if ((items.length + groupClients?.length) <= 5) {
         let selectedId = items.map(item => {
            return item.value
         })
         setSelected([...selectedId])
         setValue([...items])
      }
      if (items.length + groupClients?.length > 5) {
         alert("A'zolar ko'p", 'error')
      }
   }

   function addGroupClient(e) {
      e.preventDefault()
      const data = {
         clients: selected
      }
      https.post(`/attach/clients/${id}`, data)
         .then(res => {
            if (res.statusText === "Created" || res.status === 200) {
               alert("Klient qo'shildi", 'success',)
               getGroup()
               setValue([])
               setAddForm('add_mahsulot_main close')
            }
         })
         .catch(err => {
            alert(err?.response?.data?.message, 'error')
         })
   }

   // Add Clients with new ------>
   function addClientGroup() {
      navigate('/groups/add-client-group', { state: { id: id } })
   }

   function deleteClient(index) {
      console.log('del')
      const data = {
         clients: [groupClients.filter(item => Number(item.id) === Number(index))[0]?.id]
      }
      https.post(`/detach/clients/${id}`, data)
         .then(res => {
            if (res.request.status === 200) {
               const newGroupClients = groupClients.filter(item => item.id !== index)
               setGroupClients([...newGroupClients])
               alert("Klient o'chirildi", 'success',)
            }
         })
         .catch(err => {
            alert(err?.response?.data?.message, 'error')
         })
   }

   function notActive() {
      https
         .get(`/makeinactive/${id}`)
         .then(_ => {
            alert("Faoliyat bekor qilindi", 'success')
         })
         .catch(_ => {
            alert("Xato", 'error')
         })

   }

   function editGroupHendler() {
      setDisable(true)

      let data = {
         name: group?.name,
         code: group?.code
      }
      https
         .put(`/groups/${id}`, data)
         .then(res => {
            alert("Guruh o'zgartirildi", 'success')
            setDisable(false)
         })
         .catch(err => {
            alert(err?.response?.data?.message, 'error')
            console.log(err);
            setDisable(false)
         })
   }

   return (
      <>
         {/* Modal */}
         <form className={addForm} onSubmit={addGroupClient}>
            <p>Mijozlar qo'shish</p>
            <ClientsMultiSelect
               isMulti={true}
               isClearable={true}
               selectedOptions={value}
               selectedClient={selectedClient}
            />
            <div className='add_mahsulot_buttons'>
               <button onClick={() => setAddForm('add_mahsulot_main close')} type="button">Orqaga</button>
               <button type='submit'>Qo'shish</button>
            </div>
         </form>


         <section>
            <div className='filialform_header'>
               <Prev />
            </div>
            <div className='single_buyurtma'>
               <h1 className='text_center filial_edit_text'>{group?.name}</h1>
               <Input
                  width='100%'
                  bordered
                  label="Guruh nomi"
                  value={group?.name}
                  placeholder='name'
                  className='filial_input'
                  color="secondary"
                  onChange={(e) => {
                     let newGroup = { ...group }
                     newGroup.name = e.target.value
                     setGroup(newGroup)
                  }}
               />
               <Input
                  width='100%'
                  bordered
                  label="Guruh kodi"
                  value={group?.code}
                  placeholder='code'
                  className='filial_input'
                  color="secondary"
                  onChange={(e) => {
                     let newGroup = { ...group }
                     newGroup.code = e.target.value
                     setGroup(newGroup)
                  }}
               />
               <div className='pdf_margin_top_15 addGroup_client_title'>
                  <p className='title'>Mijozlar:</p>
                  <div className="edit_group_btns">
                     {
                        groupClients?.length < 5 ? (
                           <>
                              <button onClick={() => setAddForm('add_mahsulot_main open')} className='addGroup_client'>Mijoz qo'shish</button>
                              <button onClick={addClientGroup} className='addGroup_client'>Yangi mijoz qo'shish</button>
                           </>
                        ) : null
                     }
                  </div>
               </div>
               <div className='group_single_table pdf_margin_top_15 table_root'>
                  <div className="responsive_table">
                     <div className='group_single_table_header table_header'>
                        <p>Ism</p>
                        <p>Telefon raqam</p>
                        <p>Manzil</p>
                     </div>
                     <div className="table_body">
                        {
                           groupClients?.map((item, index) => {
                              return (
                                 <div className='group_single_table_header' key={item?.id + item?.name}>
                                    <p>{index + 1}. {item?.name}</p>
                                    <p>{item?.phone?.[0]}</p>
                                    <p>{item?.address}</p>
                                    <div className='group_edit_table_buttons'>
                                       <button><Link to={`/clients/${item?.id}/`} className='center_center'><i className='bx bx-user'></i></Link></button>
                                       <button><Link to={`/clients/${item?.id}/`} className='center_center'><i className='bx bx-edit-alt'></i></Link></button>
                                       <button onDoubleClick={() => { deleteClient(item?.id) }}><i className='bx bx-trash'></i></button>
                                    </div>
                                 </div>
                              )
                           })
                        }
                     </div>
                  </div>
               </div>
               <div className='pdf_margin_top_40'>
                  <div className='submit-buttons'>
                     <button type='button' className='client_submit reset back_red' onClick={() => { notActive() }}>
                        Buyurtmalarini passive qilish
                        <AiOutlineClear />
                     </button>
                     <button type='submit' disabled={disable} className={`client_submit submit back_green ${disable ? "disabled" : ""}`} onClick={editGroupHendler}>
                        O'zgarishni kiritish
                        <AiOutlineUserAdd />
                     </button>
                  </div>
               </div>
            </div>
         </section>
      </>
   )
}

export default EditGroup