import { memo, useContext } from 'react';
import { useNavigate } from 'react-router';
import { OrderFilterContext } from '../../context/context';

const order_types = [
   { title: "Barchasi", type: 'all', id: 1 },
   { title: "Kutilmoqda", type: 'new', id: 2 },
   { title: "Tasdiqlangan", type: 'accepted', id: 3 },
   { title: "Rad etilgan", type: 'denied', id: 4 },
   { title: "Guruhli", type: 'grouped', id: 5 },
]

function OrderTabs({ setCurrentPage }) {
   const navigate = useNavigate()
   const { filters } = useContext(OrderFilterContext)
   const { setFilters } = useContext(OrderFilterContext)
   const { initialFilters } = useContext(OrderFilterContext)

   const changeOrderType = (type) => {
      setFilters({ ...initialFilters, order_by: type })
      setCurrentPage(1)
      navigate(`/orders/pages/1`)
   }

   return (
      <div className='sort_main'>
         <div className="sort_tabs">
            <ul>
               {
                  order_types.map(item => {
                     return (
                        <li key={item?.title + item?.id}>
                           <button
                              onClick={() => changeOrderType(item.type)}
                              className={filters?.order_by === item?.type ? 'sort_item active' : 'sort_item'}>
                              {item?.title}
                           </button>
                        </li>
                     )
                  })
               }
            </ul>
         </div>
      </div>
   )
}

export default memo(OrderTabs)