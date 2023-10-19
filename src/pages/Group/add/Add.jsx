import { useRef, useState } from 'react'
import { useNavigate } from 'react-router';
import { Input } from '@nextui-org/react';
import { AiOutlineUsergroupAdd } from 'react-icons/ai';
import { ClientsMultiSelect } from '../../../components/MultiSelect/ClientSelect';
import { alert } from '../../../components/Alert/alert';
import Prev from '../../../components/Prev/Prev';
import https from '../../../services/https';

function GroupForm() {
   const navigate = useNavigate()
   const groupNameInput = useRef(null)
   const groupCodeInput = useRef(null)
   const [selected, setSelected] = useState([])
   const [disable, setDisable] = useState(false)
   const [selectedOptions, setSelectedOptions] = useState([])

   function selectedClient(items) {
      if (items && items.length <= 5) {
         let selectedId = items.map(item => {
            return item.value
         })
         setSelected([...selectedId])
         setSelectedOptions([...items]);
      } else if (items.length > 5) {
         alert("Guruh a'zolari ko'p", 'error')
         const truncatedSelection = items.slice(0, 5)
         setSelectedOptions(truncatedSelection)
      }
   }

   function addGroup(e) {
      e.preventDefault()
      setDisable(true)

      const data = {
         name: groupNameInput.current.value,
         code: groupCodeInput.current.value,
         clients: selected
      }
      if (selected.length >= 2 && selected.length <= 5) {
         console.log(data)
         https.post('/groups', data)
            .then(_ => {
               alert('Guruh qoshildi', 'success')
               navigate(-1)
               groupCodeInput.current = ""
               groupNameInput.current = ""
               setSelected([])
               setDisable(false)
            })
            .catch(err => {
               alert(err?.response?.data?.message, 'error')
               setDisable(false)
            })
      } else {
         alert("Guruh a'zolari kam", 'error')
         setDisable(false)
      }
   }

   return (
      <>
         <div className='back-but'>
            <Prev />
         </div>
         <form onSubmit={addGroup}>
            <div className="client_form">
               <div className='clientform_title'>Yangi Guruh qo'shish</div>
               <div className='clientform_form margin_top_20'>
                  <Input
                     width='100%'
                     clearable
                     label="Guruh nomi"
                     placeholder='Tinchlik'
                     className='vall'
                     bordered
                     color="secondary"
                     ref={groupNameInput}
                     required='required'
                  />
                  <Input
                     required
                     width='100%'
                     clearable
                     label="Guruh Kodi"
                     placeholder='58498'
                     bordered
                     className='vall'
                     ref={groupCodeInput}
                     color="secondary"
                  />
                  <ClientsMultiSelect
                     isMulti={true}
                     selectedClient={selectedClient}
                     selectedOptions={selectedOptions}
                  />
               </div>
            </div>
            <div className='flex_row_end'>
               <button disabled={disable} className={`client_submit submit ${disable ? "disabled" : ""}`} type='submit'>
                  Guruhni qo'shish
                  <AiOutlineUsergroupAdd />
               </button>
            </div>
         </form>
      </>

   )
}
export default GroupForm