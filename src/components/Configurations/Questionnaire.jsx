import { memo, useCallback, useEffect, useState } from "react"
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

const THead = memo(() => {
   return (
      <thead>
         {
            head_columns.map(column => (
               <tr key={column?.id}>{column?.title}</tr>
            ))
         }
      </thead>
   )
})

const TBody = memo(({ columns }) => {
   return (
      <thead>
         {
            columns.map(column => (
               <tr key={column?.id}>{column?.title}</tr>
            ))
         }
      </thead>
   )
})

export const Questionnaire = memo(() => {
   const [questionnaires, setQuestionnaires] = useState([])

   const getQuestionnaires = useCallback(async () => {
      try {
         const { data } = await https.get('/sources?search=')
         console.log(data)
      } catch (error) {
         console.log(error)
      }
   }, [])

   useEffect(() => {
      getQuestionnaires()
   }, [getQuestionnaires])

   return (
      <div className="client_questionnaire">
         <table>
            <THead />
            <TBody columns={questionnaires} />
         </table>
      </div>
   )
})