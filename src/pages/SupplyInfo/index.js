import { Route, Routes } from 'react-router'
import SupplyList from './list/List'
import SingleInsurance from './single/insurance'
import EditInsurance from './edit/insurance'
import SingleAuto from './single/transport'
import SingleOwner from './single/owner'
import SupplyInfoForm from './add/main'
import EditAuto from './edit/transport'
import SingleGold from './single/gold'
import EditOwner from './edit/owner'
import EditGold from './edit/gold';

function SupplyRouting() {
   return (
      <Routes>
         <Route exact path='pages/:page' element={<SupplyList />} />
         <Route path='add' element={<SupplyInfoForm />} />
         <Route path='edit-auto/:id' element={<EditAuto />} />
         <Route path='edit-gold/:id' element={<EditGold />} />
         <Route path='edit-insurance/:id' element={<EditInsurance />} />
         <Route path='edit-owner/:id' element={<EditOwner />} />
         <Route path='single-auto/:id' element={<SingleAuto />} />
         <Route path='single-gold/:id' element={<SingleGold />} />
         <Route path='single-insurance/:id' element={<SingleInsurance />} />
         <Route path='single-owner/:id' element={<SingleOwner />} />
      </Routes>
   )
}

export default SupplyRouting