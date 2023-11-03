import { memo, useContext, useEffect, useState } from "react"
import { useNavigate } from "react-router"
import { ClientContext } from "../../../context/context"
import { RiAddLine } from "react-icons/ri";
import DeleteWarning from "../../../components/Warning/DeleteWarning";
import ShartNomaTable from "../../../components/ShartnomaTable/ShartNomaTable"
import https from "../../../services/https";

const role = JSON.parse(window.localStorage.getItem('role'))

function ClientOrders({ id }) {
   const { client } = useContext(ClientContext)
   const [orders, setOrders] = useState([])
   const [deleteModal, setDeleteModal] = useState('close')
   const [deleteID, setDeleteID] = useState(null)
   const [loading, setLoading] = useState(true)
   const navigate = useNavigate()

   useEffect(() => {
      setOrders(client?.orders)
      setLoading(false)
   }, [id])

   function deleteFun(id) {
      setDeleteModal('open')
      setDeleteID(id)
   }

   async function toCreateOrder() {
      try {
         const dataId = {
            code: client?.code
         }

         const res = await https.post('/check/client/code', dataId);
         navigate("/orders/add", {
            state: {
               id: res?.data?.id,
               groups: res?.data?.group
            }
         });
      } catch (err) {
         console.log(err);
      }
   }

   return (
      <div className='single_client_content_list'>
         <h3>Buyurtmalar</h3>
         <div className="order_control_btns">
            <button onClick={toCreateOrder}>
               <RiAddLine />
            </button>
         </div>
         <div className="orders_table">
            <ShartNomaTable
               loading={loading}
               orders={orders}
               role={role}
               deleteOrder={deleteFun}
               isSingleClients={true}
            />
         </div>
         <DeleteWarning
            id={deleteID}
            path={'orders'}
            list={orders}
            setList={setOrders}
            successText={"Buyurtma o'chirildi"}
            openClose={deleteModal}
            setOpenClose={setDeleteModal}
         />
      </div>
   )
}

export default memo(ClientOrders)