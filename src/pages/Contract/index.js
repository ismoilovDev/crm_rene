import { Route, Routes } from 'react-router'
import ContractSingle from './single/Single'
import ContractEdit from './edit/Edit'
import ContractForm from './add/Add'
import Contracts from './list/List'

function ContractRouting() {
   return (
      <Routes>
         <Route exact path='pages/:page' element={<Contracts />} />
         <Route path='add' element={<ContractForm />} />
         <Route path='edit/:id' element={<ContractEdit />} />
         <Route path='single/:id' element={<ContractSingle />} />
      </Routes>
  )
}

export default ContractRouting