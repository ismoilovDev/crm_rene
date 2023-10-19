import { Input } from "@nextui-org/react"

export function ClientInput({ label, value, client, setClient, type="text" }) {
   return (
      <Input
         width='100%'
         bordered
         label={label}
         value={client[value]}
         color="secondary"
         type={type}
         onChange={(e) => {
            const newClient = { ...client }
            newClient[value] = e.target.value
            setClient(newClient)
         }}
      />
   )
}

export function ClientPINFLInput({ label, value, client, setClient, type="text" }) {
   return (
      <Input
         width='100%'
         bordered
         label={label}
         value={client[value]}
         color="secondary"
         type={type}
         onChange={(e) => {
            const newClient = { ...client }
            if (e.target.value.trim().length < 15) {
               newClient[value] = e.target.value
               setClient(newClient)
            }
         }}
      />
   )
}