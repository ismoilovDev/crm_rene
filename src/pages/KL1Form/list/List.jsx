import { useState, useEffect, useCallback } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { Input } from '@nextui-org/react';
import Filters from '../filters'
import https from '../../../services/https'
import { alert } from '../../../components/Alert/alert'
import SkeletonBox from '../../../components/Loader/Skeleton'
import dateConvert from '../../../utils/functions/dateConvert'
import { ExcelButton } from '../../../components/Buttons/ExcelBtn'
import DeleteWarning from '../../../components/Warning/DeleteWarning'
import CustumPagination from '../../../components/Pagination/CustumPagination'

const role = JSON.parse(window.localStorage.getItem('role'))
const branch_id = +window.localStorage.getItem('branch_id')

function ClientMarks({ filters }) {
	const { page } = useParams()
	const navigate = useNavigate()
	const [count, setCount] = useState(0)
	const [forms, setForms] = useState([])
	const [loading, setLoading] = useState(true)
	const [modalCode, setModalCode] = useState('')
	const [deleteID, setDeleteID] = useState(null)
	const [currentPage, setCurrentPage] = useState(page)
	const [deleteModal, setDeleteModal] = useState('close')
	const [isPaginateActive, setIsPaginateActive] = useState(false)
	const [modalka, setModalka] = useState('shartnoma_modal close')

	const getUrl = useCallback(async () => {
		setLoading(true)
		const url = `/client-marks?page=${currentPage}&branch_id=${filters?.branch_id}&status&from=${filters?.from}&to=${filters?.to}&search=${filters?.query}`
		try {
			const { data } = await https.get(url)
			setForms(data?.data)
			setCount(data?.meta?.last_page)
			setIsPaginateActive(true)
			setLoading(false)
		}
		catch (err) {
			console.log(err)
		}
	}, [currentPage, filters])

	useEffect(() => {
		getUrl()
	}, [getUrl]);

	function navigateAdd(id) {
		if (!id) {
			alert("Kodni kiriting", 'error')
		}
		const dataId = { code: id }
		https
			.post('/check/order/code', dataId)
			.then(res => {
				navigate("/client-marks/add", { state: { id: res?.data?.order_id } })
			})
			.catch(err => {
				if (err?.request?.status === 404) {
					alert("Bunday buyurtma yo'q", 'error')
				}
				console.log(err);
			})
	}

	function navigateEditPage(id) {
		navigate("/client-marks/edit", { state: { id } })
	}

	function deleteFun(id) {
		setDeleteModal('open')
		setDeleteID(id)
	}

	const handleOnExcel = () =>{
		let data = []
		forms?.map(item =>{
			const info = {
				"F.I.Sh": item?.client?.name, 
				mijoz_kodi: item?.client?.code, 
				buyurtma_kodi: item?.order_code,
				tuzilgan_sana: dateConvert(item?.mark_date || item?.doc_date)
			}
			data = [...data, info]
		})

		return data;
	}

	return (
		<>
			<div className={modalka}>
				<Input
					rounded
					bordered
					width='90%'
					color='secondary'
					label='Buyurtma kodi'
					placeholder='123..'
					clearable
					onChange={(e) => setModalCode(e.target.value)}
				></Input>
				<div className="add_taminot_buttons">
					<button onClick={() => { navigateAdd(modalCode) }} className='shartnoma_modal_button'>
						Qo'shish
					</button>
					<button onClick={() => setModalka('shartnoma_modal close')} className='shartnoma_modal_button'>
						Orqaga
					</button>
				</div>
			</div>
			<section className='foydalan_main'>
				<h1 className='filial_title'>KL1 Shakl</h1>
				<div className='filial_header'>
					<button onClick={() => setModalka('shartnoma_modal open')} className='shartnamaLink'>
						KL1 Shakl Qo'shish
						<i className='bx bx-plus-circle'></i>
					</button>
					<ExcelButton data={handleOnExcel()} name={'KL'} />
				</div>
				<Filters branch_id={branch_id} />
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
										forms?.length > 0 ? (
											forms?.map(item => {
												return (
													<li className='client_row' key={item?.id}>
														<p className='liName td_client_marks' onDoubleClick={() => { navigate(`/kl1/singlekl1/${item?.id}`) }}>{item?.client?.name}</p>
														<p className='td_client_marks' onDoubleClick={() => { navigate(`/client-marks/single/${item?.id}`) }}>{item?.client?.code}</p>
														<p className='td_client_marks' onDoubleClick={() => { navigate(`/client-marks/single/${item?.id}`) }}>{item?.order_code}</p>
														<p className='td_client_marks' onDoubleClick={() => { navigate(`/client-marks/single/${item?.id}`) }}>{dateConvert(item?.mark_date) || dateConvert(item?.doc_date)}</p>
														<div className='userButtons_shartnoma'>
															<button><Link to={`/client-marks/single/${item?.id}`}><i className='bx bx-user white'></i></Link></button>
															{role.includes('admin') || role.includes('monitoring') ? (
																<>
																	<button onClick={() => { navigateEditPage(item?.id) }}>
																		<i className='bx bx-edit-alt white'></i>
																	</button>
																</>
															) : <></>}
															{role.includes('admin') ? (
																<>
																	<button onClick={() => deleteFun(item?.id)}><i className='bx bx-trash'></i></button>
																</>
															) : <></>}
														</div>
													</li>
												)
											})
										) : <pre className="empty_table">KL1 Shakl topilmadi</pre>
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
									baseURL="client-marks"
									currentPage={+page}
									setCurrentPage={setCurrentPage}
								/>
							</div>
						</div>
					) : null
				}
				{/* Delete */}
				<DeleteWarning
					id={deleteID}
					path={'client-marks'}
					list={forms}
					setList={setForms}
					successText={"Shakl o'chirildi"}
					openClose={deleteModal}
					setOpenClose={setDeleteModal}
				>
				</DeleteWarning>
			</section>
		</>

	)
}

export default ClientMarks