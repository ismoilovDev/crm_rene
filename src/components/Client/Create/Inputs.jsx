import { Input } from "@nextui-org/react"
import { useForm } from "react-hook-form"

export function ClientInput({ label, stateName, type = "text" }) {
   const { register } = useForm()
   return (
      <Input
         width='100%'
         label={label}
         bordered
         className='vall'
         type={type}
         color="secondary"
         required
         {...register(stateName, { required: true })}
      />
   )
}

export function CustomHandlerInput({ label, stateName, value, limit, hendle }) {
   const { register } = useForm()
   return (
      <Input
         width='100%'
         clearable
         label={label}
         labelLeft='99'
         className='vall'
         bordered
         value={value}
         color="secondary"
         {...register(stateName, limit ? { required: true, minLength: limit, maxLength: limit } : { required: true })}
         onChange={hendle}
      />
   )
}