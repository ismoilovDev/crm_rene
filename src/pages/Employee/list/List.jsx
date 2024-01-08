import { useEffect, useRef, useState } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import CustumPagination from '../../../components/Pagination/CustumPagination';
import DeleteWarning from '../../../components/Warning/DeleteWarning';
import SearchForm from '../../../components/Search/SearchForm';
import SkeletonBox from '../../../components/Loader/Skeleton';
import https from '../../../services/https';

const role = JSON.parse(window.localStorage.getItem('role'))

function Employees() {
	const { page } = useParams()
	const navigate = useNavigate()
	const searchInput = useRef(null)
	const [count, setCount] = useState('')
	const [xodimlar, setXodimlar] = useState([])
	const [loading, setLoading] = useState(true)
	const [deleteID, setDeleteID] = useState(null)
	const [currentPage, setCurrentPage] = useState(page)
	const [deleteModal, setDeleteModal] = useState('close')
	const [isPaginateActive, setIsPaginateActive] = useState(false)

	async function getUrl() {
		setLoading(true)
		await https
			.get(`/employees?page=${page}`)
			.then(({ data }) => {
				setXodimlar(data.data)
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

	function searchContents(e) {
		e.preventDefault();
		e.stopPropagation();
		setLoading(true);
		let formdata = new FormData();
		formdata.append('search', searchInput.current.value)
		https
			.post(`/search/employees`, formdata)
			.then(({ data }) => {
				setLoading(false)
				setIsPaginateActive(false)
				setXodimlar([...data?.data])
			})
			.catch(err => {
				searchInput.current.value == "" ? (
					getUrl()
				) : console.log("Xato")
			})
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

	return (
		<section className='xodim'>
			<h1 className='filial_title'>Xodimlar</h1>
			<div className='filial_header'>
				<Link to='/employees/add'>
					Xodim Qo'shish
					<i className='bx bx-plus-circle'></i>
				</Link>
				<SearchForm
					searchContents={searchContents}
					checkSearch={checkSearch}
					searchInput={searchInput}
					placeholder="Xodim..."
				/>
			</div>
			<div className='xodim_table_block table_root'>
				<div className='xodim_table responsive_table'>
					<li className='xodim_table_header table_header'>
						<p>Fillial</p>
						<p>Bo'lim</p>
						<p>Ismi</p>
						<p>Kodi</p>
						<p></p>
					</li>
					{
						loading ? (
							<SkeletonBox />
						) :
							<ul className="tabel_body">
								{
									xodimlar?.length > 0 ? (
										xodimlar?.map((item, index) => {
											return <li key={index} className='xodim_table_product client_row'>
												<div className='' onDoubleClick={() => { navigate(`/employees/single/${item?.id}`) }}>{item?.branch_name}</div>
												<div className='' onDoubleClick={() => { navigate(`/employees/single/${item?.id}`) }}>{item?.section_name}</div>
												<div className='' onDoubleClick={() => { navigate(`/employees/single/${item?.id}`) }}>{item?.name}</div>
												<div className='' onDoubleClick={() => { navigate(`/employees/single/${item?.id}`) }}>{item?.code}</div>
												<div className=''>
													<button><Link to={`/employees/single/${item?.id}`}><i className='bx bx-user white'></i></Link></button>
													{role.includes('admin') ? (
														<>
															<button><Link to={`/employees/edit/${item?.id}`}><i className='bx bx-edit-alt white'></i></Link></button>
															<button onClick={() => deleteFun(item.id)}><i className='bx bx-trash'></i></button>
														</>
													) : <></>}
												</div>
											</li>
										})
									) : <pre className="empty_table">Xodim topilmadi</pre>
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
								baseURL="employees"
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
				path={'employees'}
				list={xodimlar}
				setList={setXodimlar}
				successText={"Xodim o'chirildi"}
				openClose={deleteModal}
				setOpenClose={setDeleteModal}
			/>
		</section>
	)
}

export default Employees