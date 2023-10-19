import { Route, Routes } from 'react-router'
import UserSingle from './single/Single'
import UserEdit from './edit/Edit'
import UserForm from './add/Add'
import Users from './list/List'

function UserRouting() {
   return (
      <Routes>
         <Route exact path='pages/:page' element={<Users />} />
         <Route path='add' element={<UserForm />} />
         <Route path='edit/:id' element={<UserEdit />} />
         <Route path='single/:id' element={<UserSingle />} />
      </Routes>
   )
}

export default UserRouting