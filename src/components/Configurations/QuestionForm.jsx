import { memo, useRef } from "react"
import { useForm } from "react-hook-form"

function QuestionFrom({closeFormHandle, children }) {
   const wrapElement = useRef(null)

   const toggleHandle = (e) => {
      if (e.target === wrapElement.current) {
         closeFormHandle()
      }
      return
   }

   return (
      <article ref={wrapElement} className="question_wrapper" onClick={(e) => toggleHandle(e)}>
         {children}
      </article>
   )
}

export default memo(QuestionFrom)