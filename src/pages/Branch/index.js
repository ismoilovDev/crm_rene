import { Route, Routes } from 'react-router'
import Branches from './list/List'
import BranchForm from './add/Add'
import BranchEdit from './edit/Edit'
import BranchSingle from './single/Single'

function BranchRouting() {
   return (
      <Routes>
         <Route exact path='pages/:page' element={<Branches />} />
         <Route path='add' element={<BranchForm />} />
         <Route path='edit/:id' element={<BranchEdit />} />
         <Route path='single/:id' element={<BranchSingle />} />
      </Routes>
   )
}

export default BranchRouting