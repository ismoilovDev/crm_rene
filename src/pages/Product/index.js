import { Route, Routes } from 'react-router'
import Products from './list/List'
import ProductEdit from './edit/Edit'

function ProductRouting() {
   return (
      <Routes>
         <Route exact path='pages/:page' element={<Products />} />
         <Route path='edit/:id' element={<ProductEdit />} />
      </Routes>
   )
}

export default ProductRouting