import { memo, useMemo, useState } from 'react'
import { RiAddLine } from 'react-icons/ri'
import { OpenContractForm } from '../../../components/OpenContract/OpenContractForm'
import { OpenContractEdit } from '../../../components/OpenContract/OpenContractEdit'
import DeleteWarning from '../../../components/Warning/DeleteWarning'
import SkeletonBox from "../../../components/Loader/Skeleton"
import dateConvert from '../../../utils/functions/dateConvert'
import https from '../../../services/https'

const role = JSON.parse(window.localStorage.getItem('role'))

const ClientOpenContractsTable = memo(({ loading, openContracts, deleteFun, editFunction }) => {
  return (
    <div className="client_contacts">
      <div className='shartnamaTablePart table_root'>
        <div className='shartTable responsive_table'>
          <div className='tableHeader table_header'>
            <p className='headerTable-title_shartnoma'>Boshlanish sanasi</p>
            <p className='headerTable-title_shartnoma'>Tugash sanasi</p>
            <p className='headerTable-title_shartnoma'>Summasi</p>
          </div>
          {
            loading ? (
              <SkeletonBox />
            ) :
              <ul className='tableInfo table_body'>
                {
                  openContracts?.length > 0 ? (
                    openContracts?.map((item) => (
                      <li className='client_row' key={item?.id}>
                        <p className='liName li_shartnoma'>
                          {dateConvert(item?.start_date)}
                        </p>
                        <p className='li_shartnoma'>
                          {dateConvert(item?.end_date)}
                        </p>
                        <p className='li_shartnoma'>
                          {item?.sum?.toLocaleString()}
                        </p>
                        <div className='userButtons_shartnoma'>
                          <button hidden>
                            <i className='bx bx-user white'></i>
                          </button>
                          {role?.includes('admin') || role.includes('monitoring') ? (
                            <>
                              <button onClick={() => editFunction(item)}>
                                <i className='bx bx-edit-alt'></i>
                              </button>
                            </>
                          ) : null}
                          {role?.includes('admin') ? (
                            <>
                              <button onClick={() => deleteFun(item?.id)}>
                                <i className='bx bx-trash'></i>
                              </button>
                            </>
                          ) : null}
                        </div>
                      </li>
                    )
                    )) : <pre className="empty_table">Ochiq kredit liniyalari mavjud emas</pre>
                }
              </ul>
          }
        </div>
      </div>
    </div>
  )
})

const ClientOpenContract = memo(({ id }) => {
  const [openContracts, setOpenContracts] = useState([])
  const [loading, setLoading] = useState(true)
  const [deleteID, setDeleteID] = useState(null)
  const [deleteModal, setDeleteModal] = useState('close')
  const [openAdd, setOpenAdd] = useState(false)
  const [openEdit, setOpenEdit] = useState(false)
  const [editContract, setEditContract] = useState({})

  async function getOpenContracts() {
    if (id) {
      try {
        const res = await https.get(`/clients/${id}/open-contracts`);
        const { data } = res;
        setOpenContracts([...data])
        setLoading(false)
      }
      catch (err) {
        console.log(err);
      }
    }
  }

  function deleteFun(id) {
    setDeleteModal('open')
    setDeleteID(id)
  }

  function editFunction(item) {
    setEditContract(item)
    setOpenEdit(true)
  }

  useMemo(() => {
    getOpenContracts()
  }, [id])


  return (
    <div className="single_client_content_list">
      <h3>Ochiq kredit liniyalar</h3>
      <div className="order_control_btns">
        <button onClick={() => setOpenAdd(true)}>
          <RiAddLine />
        </button>
      </div>
      <ClientOpenContractsTable
        loading={loading}
        openContracts={openContracts}
        deleteFun={deleteFun}
        editFunction={editFunction}
      />
      <OpenContractForm
        clientID={id}
        open={openAdd}
        setOpen={setOpenAdd}
        contracts={openContracts}
        setContracts={setOpenContracts}
      />
      <OpenContractEdit
        clientID={id}
        open={openEdit}
        setOpen={setOpenEdit}
        editContract={editContract}
        contracts={openContracts}
        setContracts={setOpenContracts}
      />
      <DeleteWarning
        id={deleteID}
        path={'open-contracts'}
        list={openContracts}
        setList={setOpenContracts}
        successText={"Ochiq kredit o'chirildi"}
        openClose={deleteModal}
        setOpenClose={setDeleteModal}
      />
    </div>
  )
})

export default ClientOpenContract;