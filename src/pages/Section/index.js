import { Route, Routes } from 'react-router'
import Sections from './list/List'
import SectionEdit from './edit/Edit'

function SectionRouting() {
   return (
      <Routes>
         <Route exact path='pages/:page' element={<Sections />} />
         <Route path='edit/:id' element={<SectionEdit />} />
     </Routes>
  )
}

export default SectionRouting