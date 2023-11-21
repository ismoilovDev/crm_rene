import React, { memo, useCallback, useEffect, useState } from "react"
import { Input, Tooltip } from "@nextui-org/react";
import { useForm } from "react-hook-form";
import { alert, warning } from "../Alert/alert";
import SkeletonBox from '../Loader/Skeleton';
import QuestionWrapper from './QuestionForm'
import https from "../../services/https"

const head_columns = [
   {
      id: 1,
      title: '№'
   },
   {
      id: 2,
      title: 'Matni'
   },
   {
      id: 3,
      title: 'Operatsiyalar'
   }
]

const EmptyOptions = memo(() => (
   <div className="empty_box">
      <pre>Mavjud emas</pre>
      <button>Qo'shish</button>
   </div>
))

const AddingForm = memo(() => {
   const { register } = useForm()
   return (
      <React.Fragment>
         <Input
            bordered
            required
            size="md"
            label="Matn"
            color="secondary"
            className="textarea"
            labelPlacement="outside"
            {...register("title", { required: true })}
            placeholder="Statistika uchun variant matnini kiriting..."
         />
         <button type="submit">Kiritish</button>
      </React.Fragment>
   )
})

const EditingForm = memo(({ value, setValue }) => {
   const [editingText, setEditingText] = useState('')
   return (
      <input
         bordered
         value={value}
         onChange={(e) => {
            setValue(e.target.value)
         }}
      />
   )
})

const Table = memo(({ columns, editingHandle, deleteHandle }) => {

   return (
      <table>
         <thead>
            <tr key="thead_tr">
               {
                  head_columns.map(column => (
                     <th key={column?.id}>{column?.title}</th>
                  ))
               }
            </tr>
         </thead>
         <tbody>
            {
               columns.map((column, index) => (
                  <tr key={column?.id}>
                     <td>{index + 1}</td>
                     <td>{column?.title}</td>
                     <td>
                        {
                           <React.Fragment>
                              <Tooltip content="O'zgartirish" placement="topStart">
                                 <button onClick={_ => editingHandle(index)}>
                                    <i className='bx bx-edit-alt'></i>
                                 </button>
                              </Tooltip>
                              <Tooltip content="O'chirish" placement="topStart">
                                 <button onClick={_ => deleteHandle(column?.id)}>
                                    <i className='bx bx-trash'></i>
                                 </button>
                              </Tooltip>
                           </React.Fragment>
                        }
                     </td>
                  </tr>
               ))
            }
         </tbody>
      </table>
   )
})

export const ClientQuestionnaire = memo(() => {
   const [loading, setLoading] = useState(true)
   const [isVisable, setIsVisable] = useState(false)
   const [editingText, setEditingText] = useState('')
   const [questionnaires, setQuestionnaires] = useState([])
   const [isEditing, setIsEditing] = useState({ editing: false, selected: null })

   const getQuestionnaires = useCallback(async () => {
      try {
         const { data } = await https.get('/sources?search=')
         setQuestionnaires([...data])
      } catch (error) {
         console.log(error)
      } finally {
         setLoading(false)
      }
   }, [])

   useEffect(() => {
      getQuestionnaires()
   }, [getQuestionnaires])

   const resetHandle = () => {
      setIsEditing({ editing: false, selected: null })
   }

   const openFormHandle = () => {
      document.body.style.overflow = 'hidden'
      setIsVisable(true)
   }

   const closeFormHandle = () => {
      document.body.style.overflow = 'visible'
      setIsVisable(false)
   }

   const editingHandle = (index) => {
      
      setIsEditing({ ...isEditing, editing: true, selected: index })
   }

   const updateHandle = async (id) => {
      warning("O'zgarishni saqlamoqchimisiz?").then(async (result) => {
         if (result.isConfirmed) {
            try {
               const updated_data = { title: editingText }
               const res = await https.patch(`/sources/${id}`, updated_data)
               if (res.statusText !== 'OK') {
                  throw new Error('Request failed with status: ' + res.status);
               }
               const { data } = res
               const newOptions = questionnaires?.map(option => {
                  if (option?.id === id) {
                     let new_option = { ...option }
                     new_option.title = data?.title
                     return new_option
                  } else {
                     return option
                  }
               })
               setQuestionnaires([...newOptions])
               alert("O'zgartirildi", 'success')
               resetHandle()
            } catch (error) {
               const message = error?.response?.data?.message
               alert(message, 'error')
            }

         }
      })

   }

   const deleteHandle = async (id) => {
      warning("O'chirmoqchimisiz").then(async (result) => {
         if (result.isConfirmed) {
            try {
               const res = await https.delete(`/sources/${id}`)
               if (res.statusText !== 'OK') {
                  throw new Error('Request failed with status: ' + res.status);
               }
               const { data } = res
               const newOptions = questionnaires?.filter(option => option?.id !== data?.data?.id)
               setQuestionnaires([...newOptions])
               alert("O'chirildi", 'success')
            } catch (error) {
               const message = error?.response?.data?.message
               alert(message, 'error')
            }
         }
      });
   }

   return (
      <div className="client_questionnaire">
         <button className="add_wrap" onClick={openFormHandle}>Qo'shish</button>
         {
            isVisable ?
               <QuestionWrapper questionnaires={questionnaires} setQuestionnaires={setQuestionnaires} closeFormHandle={closeFormHandle} /> : null
         }
         {
            loading > 0 ?
               <SkeletonBox /> :
               questionnaires?.length <= 0 ?
                  <EmptyOptions /> :
                  <Table
                     value={editingText}
                     isEditing={isEditing}
                     columns={questionnaires}
                     setValue={setEditingText}
                     resetHandle={resetHandle}
                     updateHandle={updateHandle}
                     deleteHandle={deleteHandle}
                     editingHandle={editingHandle}
                  />
         }
      </div>
   )
})