import { memo, useCallback, useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useParams } from 'react-router';
import CustumPagination from '../../../components/Pagination/CustumPagination';
import DeleteWarning from '../../../components/Warning/DeleteWarning';
import SkeletonBox from '../../../components/Loader/Skeleton';
import https from '../../../services/https';
import Filters from '../filters';
import { ExcelButton } from '../../../components/Buttons/ExcelBtn';

const role = JSON.parse(window.localStorage.getItem('role'))
const branch_id = +window.localStorage.getItem('branch_id')

function Groups({ filters }) {
	const { page } = useParams()
	const navigate = useNavigate()
	const [count, setCount] = useState(0)
	const [groups, setGroups] = useState([])
	const [loading, setLoading] = useState(true)
	const [deleteID, setDeleteID] = useState(null)
	const [currentPage, setCurrentPage] = useState(page)
	const [deleteModal, setDeleteModal] = useState('close')
	const [isPaginateActive, setIsPaginateActive] = useState(false)

	const getUrl = useCallback(async () => {
		setLoading(true)
		const url = `/groups?page=${currentPage}&branch_id=${filters?.branch_id}&search=${filters?.query}`
		try {
			const { data } = await https.get(url)
			setGroups(data?.data)
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

	function deleteFun(id) {
		setDeleteModal('open')
		setDeleteID(id)
	}

	const handleOnExcel = () =>{
		let data = []
		groups?.map(item =>{
		   const info = {
			  "Nomi": item?.name, 
			  kod: item?.code
		   }
		   data = [...data, info]
		})
  
		return data;
	}

	return (
		<section className='client'>
			<div className='client_title'>
				<p>Guruhlar</p>
			</div>
			<div className='client_addition'>
				<div>
					<Link className='client_button gradient-border' to='/groups/add'>
						<p>Guruh Qo'shish</p> <i className='bx bx-plus-circle'></i>
					</Link>
				</div>
				<ExcelButton data={handleOnExcel()} name={'Guruh'}/>
			</div>

			<Filters branch_id={branch_id} />

			<div className='mahsulot_table table_root'>
				<div className="responsive_table">
					<div className='mahsulot_table_headers table_header'>
						<p className='clientheaderTable-title'>Nomi</p>
						<p className='clientheaderTable-title'>Kod</p>
					</div>
					{
						loading ? (
							<SkeletonBox />
						) :
							<div className='mahsulot_table_products table_body'>
								{
									groups?.length > 0 ? (
										groups?.map(item => {
											return (
												<div className='mahsulot_table_product client_row' key={item?.id} >
													<p onDoubleClick={() => { navigate(`/groups/single/${item?.id}`) }}>{item?.name}</p>
													<p onDoubleClick={() => { navigate(`/groups/single/${item?.id}`) }}>{item?.code}</p>
													<div className='clientuserButtons group_buttons'>
														<button><Link to={`/groups/single/${item?.id}`}><i className='bx bx-user'></i></Link></button>
														{role.includes('admin') || role.includes('monitoring') ? (
															<>
																<button>
																	<Link to={`/groups/edit/${item?.id}`}>
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
												</div>
											)
										})
									) : <pre className="empty_table">Guruh topilmadi</pre>
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
								baseURL="groups"
								currentPage={+currentPage}
								setCurrentPage={setCurrentPage}
							/>
						</div>
					</div>
				) : null
			}
			{/* Delete */}
			<DeleteWarning
				id={deleteID}
				path={'groups'}
				list={groups}
				setList={setGroups}
				successText={"Guruh o'chirildi"}
				openClose={deleteModal}
				setOpenClose={setDeleteModal}
			/>
		</section>
	)
}

export default memo(Groups)