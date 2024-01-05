import { useState, useEffect, useRef } from 'react'
import { Link, useNavigate, useParams } from "react-router-dom";
import { Input } from '@nextui-org/react'
import { alert } from '../../../components/Alert/alert'
import CustumPagination from '../../../components/Pagination/CustumPagination';
import LoaderBackdrop from '../../../components/Loader/LoaderBackdrop';
import DeleteWarning from '../../../components/Warning/DeleteWarning';
import SkeletonBox from '../../../components/Loader/Skeleton';
import SearchForm from '../../../components/Search/SearchForm'
import dateConvert from '../../../utils/functions/dateConvert'
import https from '../../../services/https';


const role = JSON.parse(window.localStorage.getItem('role'))

function Contracts() {
	const { page } = useParams()
	const navigate = useNavigate()
	const searchInput = useRef(null)
	const [count, setCount] = useState('')
	const [loading, setLoading] = useState(true)
	const [shartnamalar, setShartnamalar] = useState([])
	const [currentPage, setCurrentPage] = useState(page)
	const [isPaginateActive, setIsPaginateActive] = useState(false)
	const [modalkaOrder, setModalkaOrder] = useState('shartnoma_modal close');
	const [modalkaGroup, setModalkaGroup] = useState('shartnoma_modal close');
	const [modalCodeOrder, setModalCodeOrder] = useState('');
	const [modalCodeGroup, setModalCodeGroup] = useState('');
	const [deleteModal, setDeleteModal] = useState('close')
	const [deleteID, setDeleteID] = useState(null)
	const [disable, setDisable] = useState(false)


	function navigateAddOrder(idOrder) {
		if (!idOrder) {
			return alert("Kodni kiriting", 'error')
		}

		const dataId = { code: idOrder }

		setDisable(true)

		https
			.post('/check/order/code', dataId)
			.then(res => {
				setDisable(false)

				https
					.get(`/orders/${res?.data?.order_id}`)
					.then(responsive => {
						if (responsive?.data?.status !== 'accepted') {
							return (alert("Buyurtma tasdiqlanmagan", 'error'))
						}
						navigate("/contracts/add", { state: { id: res?.data?.order_id, code: dataId?.code, order: true } })
					})
			})
			.catch(err => {
				setDisable(false)

				if (err?.request?.status === 404 || err?.request?.status === 422) {
					return alert(err?.response?.data?.message, 'error')
				}
				console.log(err);
			})
	}

	function navigateAddGroup(idGroup) {
		if (!idGroup) {
			return alert("Kodni kiriting", 'error')
		}

		let dataId = {
			code: idGroup
		}

		setDisable(true)

		https
			.post('/check/group/code', dataId)
			.then(res => {
				setDisable(false)

				https
					.get(`/groups/${res?.data?.group_id}`)
					.then(responsive => {
						for (let i = 0; i < responsive?.data?.clients?.length; i++) {
							if (responsive?.data?.activeOrders?.[i]?.status !== 'accepted') {
								return (alert("Buyurtmalar tasdiqlanmagan", 'error'))
							}
						}
						navigate("/contracts/add", { state: { id: res?.data?.group_id, code: dataId?.code, order: false } })
					})
					.catch(error => {
						console.log(error);;
					})
			})
			.catch(err => {
				setDisable(false)

				if (err?.request?.status === 404 || err?.request?.status === 422) {
					alert(err?.response?.data?.message, 'error')
				}
				console.log(err);
			})

	}

	async function getUrl() {
		setLoading(true)
		await https
			.get(`/contracts?page=${page}`)
			.then(({ data }) => {
				setShartnamalar(data?.data)
				setCount(data?.meta?.last_page)
				setLoading(false)
				setIsPaginateActive(true)
			})
			.catch(err => {
				console.log(err)
			})
	}

	useEffect(() => {
		getUrl()
	}, [currentPage]);

	async function searchContents(e) {
		e.preventDefault();
		e.stopPropagation();
		setLoading(true);
		let formdata = new FormData();
		formdata.append('search', searchInput.current.value)

		try{
			const res = await https.post(`/search/contracts`, formdata)
			const { data } = res;
			setLoading(false)
			setIsPaginateActive(false)
			setShartnamalar([...data.data])
		}
		catch (err) {
			console.log('catch');
			if (searchInput.current.value === "") {
				getUrl();
			} else {
				console.log("Xato");
			}
		}
	}

	function checkSearch(text) {
		if (text === "") {
			getUrl()
		}
	}

	function deleteFun(id) {
		setDeleteModal('open')
		setDeleteID(id)
	}

	const handleOnExcel = () =>{
		let data = []
		shartnamalar?.map(item =>{
			const info = {
				"F.I.Sh": item?.order?.id ? item?.order?.client?.name : item?.group?.name, 
				kod: item?.contract_num, 
				tuzilgan_sana: dateConvert(item?.contract_issue_date) || "---"
			}
			data = [...data, info]
		})

		return data;
	}

	return (
		<>
			{/* Modalka */}
			<div className={modalkaOrder}>
				<p className="modal_title">Buyurtma kodi</p>
				<Input
					rounded
					bordered
					width='90%'
					color='secondary'
					label='  '
					placeholder='123..'
					clearable
					onChange={(e) => setModalCodeOrder(e.target.value)}
				></Input>
				<div className="add_taminot_buttons">
					<button
						onClick={() => { navigateAddOrder(modalCodeOrder) }}
						className='shartnoma_modal_button'>Qo'shish</button>
					<button onClick={() => setModalkaOrder('shartnoma_modal close')} className='shartnoma_modal_button'>Ortga</button>
				</div>
			</div>

			<div className={modalkaGroup}>
				<p className="modal_title">Guruh kodi</p>
				<Input
					rounded
					bordered
					width='90%'
					color='secondary'
					label='  '
					placeholder='123..'
					clearable
					onChange={(e) => setModalCodeGroup(e.target.value)}
				></Input>
				<div className="add_taminot_buttons">
					<button
						onClick={() => { navigateAddGroup(modalCodeGroup) }}
						className='shartnoma_modal_button'>Qo'shish</button>
					<button onClick={() => setModalkaGroup('shartnoma_modal close')} className='shartnoma_modal_button'>Ortga</button>
				</div>
			</div>

			<div className='shart_nama'>
				<div className='shartnamaMain'>
					<div className='shartnamaHeader'>
						<p className='shartnamaTitle'>Shartnoma</p>
					</div>
					<div className='shartnamaSearch'>
						<div className="add_contract_btns">
							<button onClick={() => setModalkaOrder('shartnoma_modal open')} className='shartnamaLink'>Shartnoma(mijoz)<i className='bx bx-plus-circle'></i></button>
							<button onClick={() => setModalkaGroup('shartnoma_modal open')} className='shartnamaLink'>Shartnoma(guruh)<i className='bx bx-plus-circle'></i></button>
						</div>
						<SearchForm
							searchContents={searchContents}
							checkSearch={checkSearch}
							searchInput={searchInput}
							placeholder="Shartnoma..."
						/>
					</div>
					
					<div className='shartnamaTablePart table_root margin_top_15'>
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
											shartnamalar?.length > 0 ? (
												shartnamalar?.map((item) => {
													return <li className='client_row' key={item?.id}>
														<p className='liName li_shartnoma' onDoubleClick={() => { navigate(`/contracts/single/${item?.id}`) }}>{item?.order?.id ? item?.order?.client?.name : item?.group?.name}</p>
														<p className='li_shartnoma' onDoubleClick={() => { navigate(`/contracts/single/${item?.id}`) }}>{item?.contract_num}</p>
														<p className='li_shartnoma' onDoubleClick={() => { navigate(`/contracts/single/${item?.id}`) }}>{dateConvert(item?.contract_issue_date) || "topilmadi"}</p>
														<div className='userButtons_shartnoma'>
															<button> <Link to={`/contracts/single/${item?.id}`}><i className='bx bx-user white'></i></Link></button>
															{role.includes('admin') || role.includes('monitoring') ? (
																<>
																	<button><Link to={`/contracts/edit/${item?.id}`}><i className='bx bx-edit-alt'></i></Link></button>
																</>
															) : <></>}
															{role.includes('admin') ? (
																<>
																	<button onClick={() => deleteFun(item?.id)}><i className='bx bx-trash'></i></button>
																</>
															) : <></>}
														</div>
													</li>
												})
											) : <pre className="empty_table">Shartnoma topilmadi</pre>
										}
									</ul>
							}
						</div>
					</div>
					{
						isPaginateActive ? (
							<div className='pagination_block_wrapper'>
								<div className='pagination_block'>
									<CustumPagination
										count={count}
										baseURL="contracts"
										currentPage={+page}
										setCurrentPage={setCurrentPage}
									/>
								</div>
							</div>
						) : null
					}
				</div>
			</div>
			<LoaderBackdrop disable={disable} />
			{/* Delete */}
			<DeleteWarning
				id={deleteID}
				path={'contracts'}
				list={shartnamalar}
				setList={setShartnamalar}
				successText={"Shartnoma o'chirildi"}
				openClose={deleteModal}
				setOpenClose={setDeleteModal}
			>
			</DeleteWarning>
		</>
	)
}

export default Contracts;