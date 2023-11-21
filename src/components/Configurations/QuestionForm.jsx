import { memo, useRef } from "react"
import { Input } from "@nextui-org/react"
import { useForm } from "react-hook-form"
import { alert } from "../Alert/alert"
import https from "../../services/https"

const QuestionForm = memo(({ onSubmit, children }) => {
   const { handleSubmit } = useForm()
   return (
      <form onSubmit={handleSubmit(onSubmit)}>
         {children}
      </form>
   )
})

function QuestionWrapper({ questionnaires, setQuestionnaires, closeFormHandle }) {
   const wrapElement = useRef(null)

   const toggleHandle = (e) => {
      if (e.target === wrapElement.current) {
         closeFormHandle()
      }
      return
   }

   const addQuestionHandle = async (data) => {
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

   return (
      <article ref={wrapElement} className="question_wrapper" onClick={(e) => toggleHandle(e)}>
         <QuestionForm
            onSubmit={addQuestionHandle}
         />
      </article>
   )
}

export default memo(QuestionWrapper)