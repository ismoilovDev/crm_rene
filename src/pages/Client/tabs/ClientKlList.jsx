import React, { memo, useMemo, useState, useContext } from 'react'
import { Link } from 'react-router-dom'
import { useNavigate } from 'react-router'
import { RiAddLine } from 'react-icons/ri'
import Select from 'react-select';
import https from '../../../services/https';
import { ClientContext } from "../../../context/context"
import SkeletonBox from "../../../components/Loader/Skeleton"
import dateConvert from '../../../utils/functions/dateConvert';
import DeleteWarning from '../../../components/Warning/DeleteWarning'

const role = JSON.parse(window.localStorage.getItem('role'))

const ClientListTable = memo(({ loading, monitoring, deleteFun, navigateEditPage }) => {
    return (
        <div className="client_contacts">
            <div className='shartnamaTablePart table_root'>
                <div className='shartTable responsive_table'>
                    <div className='tableHeader table_header'>
                        <p className='headerTable-title_client_mark'>F.I.Sh</p>
                        <p className='headerTable-title_client_mark'>Mijoz kodi</p>
                        <p className='headerTable-title_client_mark'>Buyurtma kodi</p>
                        <p className='headerTable-title_client_mark'>Tuzilgan sana</p>
                    </div>
                {
                    loading ? (
                    <SkeletonBox />
                    ) :
                    <ul className='tableInfo table_body'>
                        {
                        monitoring?.length !== 0 ? (
                            monitoring?.map((item) => (
                            <li className='client_row' key={item?.id}>
                                <p className='liName td_client_marks'>
                                    {item?.client?.name}
                                </p>
                                <p className='td_client_marks'>
                                    {item?.client?.code}
                                </p>
                                <p className='td_client_marks'>
                                    {item?.order_code}
                                </p>
                                <p className='td_client_marks'>
                                    {dateConvert(item?.mark_date)}
                                </p>
                                <div className='userButtons_shartnoma'>
                                    <button>
                                        <Link to={`/kl1/singlekl1/${item?.id}`}><i className='bx bx-user white'></i></Link> 
                                    </button>
                                    {role?.includes('admin') || role.includes('monitoring') ? (
                                        <>
                                        <button onClick={()=>{navigateEditPage(item?.id)}}>
                                            <i className='bx bx-edit-alt'></i>
                                        </button>
                                        </>
                                    ) : null}
                                    {role?.includes('admin') || role.includes('monitoring') ? (
                                        <>
                                        <button onClick={() => deleteFun(item?.id)}>
                                            <i className='bx bx-trash'></i>
                                        </button>
                                        </>
                                    ) : null}
                                </div>
                            </li>
                            )
                            )) : <pre className="empty_table">Monitoringlari mavjud emas</pre>
                        }
                    </ul>
                }
                </div>
            </div>
        </div>
    )
})

const AddContractModal = memo(({ options, navigateTo, modalkaOrder, setModalkaOrder, selectedOrderID, setSelectedOrderID }) => {
    return (
      <div className={modalkaOrder}>
        <p className="modal_title">Buyurtmalari</p>
        {
            options?.length !==0 ?
            <Select
                width={100}
                label="Buyurtmalar"
                options={options}
                placeholder='Buyurtmalar'
                className="multi_select"
                onChange={(e) => setSelectedOrderID(e.value)}
            /> : <h4 className='text-center'>Tasdiqlangan buyurtmalar yo'q!!!</h4>
        }
        <div className="add_taminot_buttons">
            {
                selectedOrderID ? 
                <button onClick={navigateTo} className='shartnoma_modal_button'>
                    Qo'shish
                </button> : <></>
            }
            <button onClick={() => setModalkaOrder('shartnoma_modal close')} className='shartnoma_modal_button'>
                Ortga
            </button>
        </div>
      </div>
    )
})


const ClientKlList = memo(({ id }) => {

    const [orders, setOrders] = useState([])
    const { client } = useContext(ClientContext)
    const [loading, setLoading] = useState(true)
    const [deleteID, setDeleteID] = useState(null)
    const [monitoring, setMonitoring] = useState([])
    const [deleteModal, setDeleteModal] = useState('close')
    const [selectedOrderID, setSelectedOrderID] = useState(null)
    const [modalkaOrder, setModalkaOrder] = useState('shartnoma_modal close')
    const navigate = useNavigate()

    const getData = async() =>{
        try{
            const res = await https.get(`/clients/${id}/client-marks`)
            const { data } = res;
            setMonitoring(data)
            setLoading(false)
            console.log(data);
        }
        catch(err){
            console.log(err)
        }
    }

    const getOrders = async() =>{
        const acceptedOrders = client?.orders?.filter(x => x?.status === 'accepted');
    
        const options = await acceptedOrders?.map(item => (
          {
            label: item?.group ?
              `${item.order_date} sanadagi ${item.group.name} guruhli buyurtmasi`
              : `${item.order_date} sanadagi guruhsiz buyurtmasi`,
            value: item?.id
          }
        ));
    
        setOrders([...options]);
    }

    function navigateEditPage(id) {
		navigate("/kl1/editkl1", { state: { id: id } })
	}

    function navigateTo(){
        if(selectedOrderID){
            navigate("/client-marks/add", { state: { id: selectedOrderID } })
        }else{
            alert('Buyurtma tanlang', 'error')
        }
    }

    function deleteFun(id) {
        setDeleteModal('open')
        setDeleteID(id)
    }

    useMemo(()=>{
        getData()
        getOrders()
    }, [id])


    return (
        <div className='single_client_content_list'>
            <h3>Monitoringlar</h3>
            <div className="order_control_btns">
                <button onClick={()=> setModalkaOrder('shartnoma_modal open')}>
                    <RiAddLine />
                </button>
            </div>
            <ClientListTable
                loading={loading}
                deleteFun={deleteFun}
                monitoring={monitoring}
                navigateEditPage={navigateEditPage}
            />
            <AddContractModal
                options={orders}
                navigateTo={navigateTo}
                modalkaOrder={modalkaOrder}
                setModalkaOrder={setModalkaOrder}
                selectedOrderID={selectedOrderID}
                setSelectedOrderID={setSelectedOrderID}
            />
            <DeleteWarning
                id={deleteID}
                list={monitoring}
                path={'client-marks'}
                setList={setMonitoring}
                openClose={deleteModal}
                successText={"KL o'chirildi"}
                setOpenClose={setDeleteModal}
            />
        </div>
      )
})

export default ClientKlList