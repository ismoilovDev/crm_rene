import { useState, useEffect, useRef } from 'react'
import { Link, useParams, useNavigate } from 'react-router-dom'
import { Tooltip } from '@nextui-org/react'
import DeleteWarning from '../../../components/Warning/DeleteWarning';
import CustumPagination from '../../../components/Pagination/CustumPagination';
import SkeletonBox from '../../../components/Loader/Skeleton';
import SearchForm from '../../../components/Search/SearchForm';
import nameLengthCheck from '../../../utils/functions/nameLengthCheck'
import https from '../../../services/https';

const role = JSON.parse(window.localStorage.getItem('role'))

function Users() {
	const { page } = useParams()
	const navigate = useNavigate()
	const searchInput = useRef(null)
	const [count, setCount] = useState('')
	const [users, setUsers] = useState([])
	const [loading, setLoading] = useState(true)
	const [deleteID, setDeleteID] = useState(null)
	const [currentPage, setCurrentPage] = useState(page)
	const [isPaginateActive, setIsPaginateActive] = useState(false)
	const [deleteModal, setDeleteModal] = useState('close')

	async function getUrl() {
		setLoading(true)
		await https
			.get(`/users?page=${page}`)
			.then(({ data }) => {
				setUsers(data?.data)
				setCount(data?.meta?.last_page)
				setLoading(false)
				setIsPaginateActive(true)
			})
			.catch(err => {
				console.log(err);
			})
	}

	useEffect(() => {
		getUrl()
	}, [currentPage]);

	function RoleList(array) {
		let arrRole = []
		array?.map(item => {
			arrRole.push(item?.name)
		})
		return arrRole.join(',')
	}

	function searchContents(e) {
		e.preventDefault();
		e.stopPropagation();
		setLoading(true);
		let formdata = new FormData();
		formdata.append('search', searchInput.current.value)
		https
			.post(`/search/users`, formdata)
			.then(({ data }) => {
				setLoading(false)
				setIsPaginateActive(false)
				setUsers([...data])
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
		<section className='foydalan_main'>
			<h1 className='filial_title'>Foydalanuvchilar</h1>
			<div className='filial_header'>
				<Link to='/users/add'>
					Foydalanuvchi Qo'shish
					<i className='bx bx-plus-circle'></i>
				</Link>
				<SearchForm
					searchContents={searchContents}
					checkSearch={checkSearch}
					searchInput={searchInput}
					placeholder="Filial..."
				/>
			</div>

			<div className='foydalan_table table_root'>
				<div className="responsive_table">
					<div className='foydalan_table_headers table_header'>
						<p>F.I.Sh</p>
						<p>Email</p>
						<p>Role</p>
					</div>
					{
						loading ? (
							<SkeletonBox />
						) :
							<div className='foydalan_table_products table_body'>
								{
									users?.length > 0 ? (
										users?.map((item, index) => {
											return (
												<div key={index} className='foydalan_table_product client_row'>
													<p className='foydalan_table_product_title' onDoubleClick={() => { navigate(`/users/single/${item.id}`) }}>
														<Tooltip content={item?.is_online ? "Online" : "Offline"} placement="topStart">
															{nameLengthCheck(item?.name)}
															<span className={item?.is_online ? 'kl_status green' : 'kl_status red'}></span>
														</Tooltip>
													</p>
													<p className='foydalan_table_product_title' onDoubleClick={() => { navigate(`/users/single/${item.id}`) }}>{item?.email}</p>
													<p className='foydalan_table_product_title' onDoubleClick={() => { navigate(`/users/single/${item.id}`) }}>{item?.role?.length > 2 ? `${item?.role?.[0]?.name}, ${item?.role?.[1]?.name} ...` : RoleList(item?.role)}</p>
													<p className='foydalan_table_product_title' onDoubleClick={() => { navigate(`/users/single/${item.id}`) }}>{item?.status}</p>
													<div className='foydalan_product_buttons'>
														<button><Link to={`/users/single/${item.id}`}><i className='bx bx-user'></i></Link></button>
														{role.includes('admin') ? (
															<>
																<button><Link to={`/users/edit/${item.id}`}><i className='bx bx-edit-alt'></i></Link></button>
																<button onClick={() => deleteFun(item.id)}><i className='bx bx-trash'></i></button>
															</>
														) : <></>}
													</div>
												</div>
											)
										})
									) : <pre className="empty_table">Foydalanuvchi topilmadi</pre>
								}
							</div>
					}
				</div>
			</div>
			{
				isPaginateActive ? (
					<div className='pagination_block_wrapper'>
						<div className='pagination_block'>
							<CustumPagination
								count={count}
								baseURL="users"
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
				path={'delete/users'}
				list={users}
				setList={setUsers}
				successText={"Foydalanuvchi o'chirildi"}
				openClose={deleteModal}
				setOpenClose={setDeleteModal}
			>
			</DeleteWarning>
		</section>
	)
}

export default Users;