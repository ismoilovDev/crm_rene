import { useState } from 'react'
import { Routes, Route } from 'react-router'
import { ClientFilterContext } from '../../context/context'
import Clients from './list/List'
import ClientForm from './add/Add'
import ClientController from './single/Single'

const initialFilters = {
   region_id: '',
   district_id: '',
   from: '',
   to: '',
   gender: '',
   query: '',
}

function ClientRouting() {
   const [filters, setFilters] = useState({ ...initialFilters });

   return (
      <ClientFilterContext.Provider value={{ filters, setFilters, initialFilters }}>
         <Routes>
            <Route exact path='pages/:page' element={<Clients filters={filters} />} />
            <Route path='add' element={<ClientForm />} />
            <Route path=':id/*' element={<ClientController />} />
         </Routes>
      </ClientFilterContext.Provider>
   )
}

export default ClientRouting;