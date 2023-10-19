import React from 'react'
import { Route, Routes } from 'react-router'
import Employees from './list/List'
import EmployeeForm from './add/Add'
import EmployeeEdit from './edit/Edit'
import EmployeeSingle from './single/Single'

function EmployeesRouting() {
   return (
      <Routes>
         <Route exact path='pages/:page' element={<Employees />} />
         <Route path='add' element={<EmployeeForm />} />
         <Route path='edit/:id' element={<EmployeeEdit />} />
         <Route path='single/:id' element={<EmployeeSingle />} />
      </Routes>
   )
}

export default EmployeesRouting