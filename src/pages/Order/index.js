import { useState } from 'react'
import { Route, Routes } from 'react-router'
import { OrderFilterContext } from '../../context/context'
import OrderSingle from './single/Single'
import OrderEdit from './edit/Edit'
import OrderForm from './add/Add'
import Orders from './list/List'

const initialFilters = {
   branch_id: '',
   sector_id: '',
   product_id: '',
   client_mark: '',
   from: '',
   to: '',
   lifetime: '',
   order_by: 'all',
   query: '',
}

function OrderRouting() {
   const [filters, setFilters] = useState({ ...initialFilters });

   return (
      <OrderFilterContext.Provider value={{ filters, setFilters, initialFilters }}>
         <Routes>
            <Route exact path='pages/:page' element={<Orders filters={filters} />} />
            <Route path='add' element={<OrderForm />} />
            <Route path='edit/:id' element={<OrderEdit />} />
            <Route path='single/:id' element={<OrderSingle />} />
         </Routes>
      </OrderFilterContext.Provider>
   )
}

export default OrderRouting