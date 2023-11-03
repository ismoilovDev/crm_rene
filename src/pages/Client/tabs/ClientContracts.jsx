import { memo, useContext, useEffect, useState } from "react"
import { useNavigate } from "react-router"
import { Link } from "react-router-dom"
import { RiAddLine } from 'react-icons/ri'
import { alert } from "../../../components/Alert/alert"
import { ClientContext } from "../../../context/context"
import Select from 'react-select';
import DeleteWarning from "../../../components/Warning/DeleteWarning"
import dateConvert from "../../../utils/functions/dateConvert"
import SkeletonBox from "../../../components/Loader/Skeleton"
import https from "../../../services/https"

const role = JSON.parse(window.localStorage.getItem('role'))

const ClientContractsTable = memo(({ loading, contracts, deleteFun }) => {
  const navigate = useNavigate()

  return (
    <div className="client_contacts">
      <div className='shartnamaTablePart table_root'>
        <div className='shartTable responsive_table'>
          <div className='tableHeader table_header'>
            <p className='headerTable-title_shartnoma'>F.I.Sh</p>
            <p className='headerTable-title_shartnoma'>Shartnoma kodi</p>
            <p className='headerTable-title_shartnoma'>Tuzilgan sana</p>
          </div>
          {
            loading ? (
              <SkeletonBox />
            ) :
              <ul className='tableInfo table_body'>
                {
                  contracts?.length > 0 ? (
                    contracts?.map((item) => {
                      return <li className='client_row' key={item?.id}>
                        <p className='liName li_shartnoma' onDoubleClick={() => { navigate(`/contracts/single/${item?.id}`) }}>
                          {item?.order?.id ? item?.order?.client?.name : item?.group?.name}
                        </p>
                        <p className='li_shartnoma' onDoubleClick={() => { navigate(`/contracts/single/${item?.id}`) }}>
                          {item?.contract_num}
                        </p>
                        <p className='li_shartnoma' onDoubleClick={() => { navigate(`/contracts/single/${item?.id}`) }}>
                          {dateConvert(item?.contract_issue_date) || "topilmadi"}
                        </p>
                        <div className='userButtons_shartnoma'>
                          <button>
                            <Link to={`/contracts/single/${item?.id}`}>
                              <i className='bx bx-user white'></i>
                            </Link>
                          </button>
                          {role.includes('admin') || role.includes('monitoring') ? (
                            <>
                              <button>
                                <Link to={`/contracts/edit/${item?.id}`}>
                                  <i className='bx bx-edit-alt'></i>
                                </Link>
                              </button>
                            </>
                          ) : null}
                          {role.includes('admin') ? (
                            <>
                              <button onClick={() => deleteFun(item?.id)}>
                                <i className='bx bx-trash'></i>
                              </button>
                            </>
                          ) : null}
                        </div>
                      </li>
                    })
                  ) : <pre className="empty_table">Mijoz shartnomalari mavjud emas</pre>
                }
              </ul>
          }
        </div>
      </div>
    </div>
  )
})

const AddContractModal = memo(({ options, navigateAddOrder, modalkaOrder, setModalkaOrder, setSelectedOrderCode }) => {
  return (
    <div className={modalkaOrder}>
      <p className="modal_title">Buyurtmalari</p>
      <Select
        width={100}
        label="Buyurtmalar"
        options={options}
        placeholder='Buyurtmalar'
        className="multi_select"
        onChange={(e) => setSelectedOrderCode(e.value)}
      />
      <div className="add_taminot_buttons">
        <button onClick={navigateAddOrder} className='shartnoma_modal_button'>
          Qo'shish
        </button>
        <button onClick={() => setModalkaOrder('shartnoma_modal close')} className='shartnoma_modal_button'>
          Ortga
        </button>
      </div>
    </div>
  )
})

const ClientContracts = memo(({ id }) => {
  const navigate = useNavigate()
  const { client } = useContext(ClientContext)
  const [loading, setLoading] = useState(true)
  const [contracts, setContracts] = useState([])
  const [orders, setOrders] = useState([])
  const [selectedOrderCode, setSelectedOrderCode] = useState('')
  const [deleteID, setDeleteID] = useState(null)
  const [deleteModal, setDeleteModal] = useState('close')
  const [modalkaOrder, setModalkaOrder] = useState('shartnoma_modal close');

  useEffect(() => {
    getClientSupplyInfos()
    getOrders()
  }, [id])

  async function getClientSupplyInfos() {
    if (id) {
      try {
        const res = await https.get(`/clients/${id}/contracts`);
        if (res.status === 200) {
          setLoading(false)
          setContracts([...res.data])
        }
      } catch (err) {
        console.log(err)
      }
    }
  }

  async function getOrders() {
    const acceptedOrders = client?.orders?.filter(x => x?.status === 'accepted');

    const options = await acceptedOrders?.map(item => (
      {
        label: item?.group ?
          `${item.order_date} sanadagi ${item.group.name} guruhli buyurtmasi`
          : `${item.order_date} sanadagi guruhsiz buyurtmasi`,
        value: item?.code
      }
    ));

    setOrders([...options]);
  }


  function navigateAddOrder() {
    if (!selectedOrderCode) {
      return alert("Kodni kiriting", 'error')
    }

    let dataId = {
      code: selectedOrderCode
    }

    https
      .post('/check/order/code', dataId)
      .then(res => {
        https
          .get(`/orders/${res?.data?.order_id}`)
          .then(responsive => {
            if (responsive?.data?.status == 'accepted') {
							navigate("/contracts/add", { state: { id: res?.data?.order_id, code: dataId?.code, order: true } })
            } else {
              return (alert("Buyurtma tasdiqlanmagan", 'error'))
            }
          })
      })
      .catch(err => {
        if (err?.request?.status === 404) {
          return (
            alert("Bunday buyurtma yo'q", 'error')
          )
        } else {
          console.log(err);
        }
      })
  }

  function deleteFun(id) {
    setDeleteModal('open')
    setDeleteID(id)
  }

  return (
    <div className="single_client_content_list">
      <h3>Shartnomalar</h3>
      <div className="order_control_btns">
        <button onClick={() => setModalkaOrder('shartnoma_modal open')}>
          <RiAddLine />
        </button>
      </div>
      <ClientContractsTable
        loading={loading}
        contracts={contracts}
        deleteFun={deleteFun}
      />
      <AddContractModal
        options={orders}
        modalkaOrder={modalkaOrder}
        setModalkaOrder={setModalkaOrder}
        navigateAddOrder={navigateAddOrder}
        setSelectedOrderCode={setSelectedOrderCode}
      />
      <DeleteWarning
        id={deleteID}
        path={'contracts'}
        list={contracts}
        setList={setContracts}
        successText={"Shartnoma o'chirildi"}
        openClose={deleteModal}
        setOpenClose={setDeleteModal}
      />
    </div>
  )
})

export default ClientContracts