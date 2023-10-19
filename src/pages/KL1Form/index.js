import { useState } from "react"
import { Route, Routes } from "react-router"
import { ClientMarksFilterContext } from "../../context/context"
import EditKL1 from "../KL1/Edit/EditKL1"
import StepperForm from "../KL1/Stepper"
import SingleKL1 from "./single/Single"
import ClientMarks from "./list/List"

const initialFilters = {
   branch_id: '',
   query: '',
   from: '',
   to: ''
}

function ClientMarksRouting() {
   const [filters, setFilters] = useState({ ...initialFilters });

   return (
      <ClientMarksFilterContext.Provider value={{ filters, setFilters, initialFilters }}>
         <Routes>
            <Route exact path='pages/:page' element={<ClientMarks filters={filters} />} />
            <Route path='single/:id' element={<SingleKL1 />} />
            <Route path='add/*' element={<StepperForm />} />
            <Route path='edit/*' element={<EditKL1 />} />
         </Routes>
      </ClientMarksFilterContext.Provider>
   )
}
export default ClientMarksRouting