import React, { memo, useCallback, useEffect, useState } from "react"
import { Input, Tooltip } from "@nextui-org/react";
import { useForm } from "react-hook-form";
import { alert, warning } from "../Alert/alert";
import SkeletonBox from '../Loader/Skeleton';
import QuestionFrom from './QuestionForm'
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

const AddingForm = memo(({ onSubmitHandle }) => {
   const { register, handleSubmit } = useForm()
   return (
      <form onSubmit={handleSubmit(onSubmitHandle)}>
         <Input
            bordered
            required
            size="md"
            label="Matn"
            color="secondary"
            className="textarea"
            labelplacement="outside"
            {...register("title", { required: true })}
            placeholder="Statistika uchun variant matnini kiriting..."
         />
         <button type="submit">Kiritish</button>
      </form>
   )
})

const EditingForm = memo(({ value, setValue, onSubmitHandle }) => {
   const { register, handleSubmit } = useForm()
   return (
      <form onSubmit={handleSubmit(onSubmitHandle)}>
         <Input
            bordered
            required
            size="md"
            label="Matn"
            value={value}
            color="secondary"
            className="textarea"
            labelplacement="outside"
            {...register("title", { required: true })}
            onChange={e => {
               const text = e.target.value
               setValue(text)
            }}
            placeholder="Statistika uchun variant matnini kiriting..."
         />
         <button type="submit">O'zgartirish</button>
      </form>
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
                                 <button onClick={_ => editingHandle(column)}>
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
   const [isEditing, setIsEditing] = useState({ editing: false, id: null })

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

   const openFormHandle = () => {
      document.body.style.overflow = 'hidden'
      setIsVisable(true)
   }

   const closeFormHandle = () => {
      document.body.style.overflow = 'visible'
      setIsVisable(false)
      setIsEditing({ ...isEditing, editing: false, value: '' })
   }

   const addingHandle = async (data) => {
      try {
         const res = await https.post('/sources', data)
         if (res?.statusText === "Created") {
            setQuestionnaires([...questionnaires, res?.data])
            alert('Variant kiritildi', 'success', 1500)
         }
      } catch (error) {
         const message = error?.response?.data?.message
         alert(message, 'error', 1500)
      } finally {
         closeFormHandle()
      }
   }

   const editingHandle = (value) => {
      openFormHandle()
      setEditingText(value?.title)
      setIsEditing({ ...isEditing, editing: true, id: value?.id })
   }

   const updatingHandle = async (updated_data) => {
      try {
         const res = await https.patch(`/sources/${isEditing.id}`, updated_data)
         if (res.statusText !== 'OK') {
            throw new Error('Request failed with status: ' + res.status);
         }
         const { data } = res
         const newOptions = questionnaires?.map(option => {
            if (option?.id === isEditing.id) {
               let new_option = { ...option }
               new_option.title = data?.title
               return new_option
            } else {
               return option
            }
         })
         setQuestionnaires([...newOptions])
         closeFormHandle()
         alert("O'zgartirildi", 'success')
      } catch (error) {
         const message = error?.response?.data?.message
         alert(message, 'error')
      }
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
            isVisable &&
            <QuestionFrom
               questionnaires={questionnaires}
               setQuestionnaires={setQuestionnaires}
               closeFormHandle={closeFormHandle}
            >
               {
                  isEditing.editing ?
                     <EditingForm
                        value={editingText}
                        setValue={setEditingText}
                        onSubmitHandle={updatingHandle}
                     /> :
                     <AddingForm
                        onSubmitHandle={addingHandle}
                     />
               }
            </QuestionFrom>
         }
         {
            loading > 0 ?
               <SkeletonBox /> :
               questionnaires?.length <= 0 ?
                  <EmptyOptions /> :
                  <Table
                     columns={questionnaires}
                     deleteHandle={deleteHandle}
                     editingHandle={editingHandle}
                  />
         }
      </div>
   )
})