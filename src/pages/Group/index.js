import { memo, useState } from 'react'
import { Routes, Route } from 'react-router'
import { GroupFilterContext } from '../../context/context'
import AddClientToGroup from './edit/AddClientToGroup'
import SingleGroup from './single/Single'
import EditGroup from './edit/Edit'
import GroupForm from './add/Add'
import Groups from './list/List'

const initialFilters = {
   branch_id: '',
   query: '',
}

function GroupRouting() {
   const [filters, setFilters] = useState({ ...initialFilters });

   return (
      <GroupFilterContext.Provider value={{ filters, setFilters, initialFilters }}>
         <Routes>
            <Route exact path='pages/:page' element={<Groups filters={filters} />} />
            <Route path='add' element={<GroupForm />} />
            <Route path='edit/:id' element={<EditGroup />} />
            <Route path='single/:id' element={<SingleGroup />} />
            <Route path='add-client-group' element={<AddClientToGroup />} />
         </Routes>
      </GroupFilterContext.Provider>
   )
}

export default memo(GroupRouting)