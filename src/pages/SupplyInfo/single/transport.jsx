import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { List } from 'react-content-loader'
import ContainerView from '../../../components/ImageContainer/ContainerView';
import Prev from '../../../components/Prev/Prev';
import https from '../../../services/https';

function SingleAuto() {
	const { id } = useParams()
	const [loading, setLoading] = useState(true)
	const [avtoInfo, setAvtoInfo] = useState({})
	const [path, setPath] = useState([])

	useEffect(() => {
		https
			.get(`/supply-info/${id}`)
			.then(res => {
				console.log(res?.data)
				setAvtoInfo(res?.data)
				setPath(res?.data?.images)
				setLoading(false)
			})
			.catch(err => {
				console.log(err)
			})
	}, [])


	function totalSum() {
		let sum = []
		avtoInfo?.auto?.map(item => {
			sum.push(item?.sum)
		})

		let total = sum.reduce((prev, current) => prev + current, 0)
		return total?.toLocaleString(undefined, { minimumFractionDigits: 2 })
	}


	return (
		<section>
			<div className='filialform_header'>
				<Prev />
			</div>
			<div className='single_buyurtma'>
				{
					loading ? (
						<div className='margin_top_30'>
							<List />
						</div>
					) : (
						<>
							<h1 className='text_center filial_edit_text'>{avtoInfo?.order?.client?.name}</h1>
							<div className='pdf_margin_top_15'>
								<div className='single_buyurtma_info'>
									<div className='single_buyurtma_inputs'>
										<p>Ta'minot turi:</p>
										<p>Transport Vositasi Garovi</p>
									</div>
									<div className='single_buyurtma_inputs'>
										<p>Garov mulkining egasi</p>
										<p>{
											avtoInfo?.possessor === 'trust_owner' ? 'Ishonchnoma asosida' : (avtoInfo?.possessor === 'owner' ? 'Uchinchi shaxs' : "Mijozning o'zi")
										}</p>
									</div>
									<div className='single_buyurtma_inputs'>
										<p></p>
										<p>{avtoInfo?.valued_by == 1 ? "O'zaro kelishuvga asosan" : "Mustaqil Baholash Asosida"}</p>
									</div>
									<div className='single_buyurtma_inputs'>
										<p>Baholovchi hujjat sanasi</p>
										<p>{avtoInfo?.date}</p>
									</div>
									<div className='single_buyurtma_inputs'>
										<p>Qabul qilish qiymati, %da</p>
										<p>{avtoInfo?.percent}</p>
									</div>
									<div className='single_buyurtma_inputs'>
										<p>Qabul qilish qiymati, so'mda</p>
										<p>{avtoInfo?.sum?.toLocaleString(undefined, { minimumFractionDigits: 2 })}</p>
									</div>
									{/* Company */}
									<div className={avtoInfo?.company ? 'margin_top_30' : 'close'}>
										<div className='single_buyurtma_inputs'>
											<p>Tilla buyumlarni baholovchi tashkilot:</p>
											<p>{avtoInfo?.company?.name}</p>
										</div>
										<div className='single_buyurtma_inputs'>
											<p>Litsenziya:</p>
											<p>{avtoInfo?.company?.license}</p>
										</div>
										<div className='single_buyurtma_inputs'>
											<p>Baholovchining ismi sharifi:</p>
											<p>{avtoInfo?.company?.valuer_name}</p>
										</div>
										<div className='single_buyurtma_inputs'>
											<p>Baholash hujjati raqami:</p>
											<p>{avtoInfo?.company?.doc_code}</p>
										</div>
									</div>
									{/* Owner */}
									<div className={avtoInfo?.owner ? 'margin_top_30' : 'close'}>
										<p className='kl1_jami text_center'>Garov mulki egasining ma'lumotlari</p>
										<div className='single_buyurtma_inputs margin_top_10'>
											<p>Garov mulki egasining F.I.Sh.:</p>
											<p>{avtoInfo?.owner?.fio}</p>
										</div>
										<div className='single_buyurtma_inputs'>
											<p>Shaxsini tasdiqlovchi xujjat turi:</p>
											<p>{avtoInfo?.owner?.doc_type}</p>
										</div>
										<div className='single_buyurtma_inputs'>
											<p>Seriyasi va raqami:</p>
											<p>{avtoInfo?.owner?.serial_num}</p>
										</div>
										<div className='single_buyurtma_inputs'>
											<p>Kim tomonidan berilgan:</p>
											<p>{avtoInfo?.owner?.issued_by}</p>
										</div>
										<div className='single_buyurtma_inputs'>
											<p>Berilgan sana:</p>
											<p>{avtoInfo?.owner?.issued_date}</p>
										</div>
										<div className='single_buyurtma_inputs'>
											<p>Ro'yxat bo'yicha yashash manzili:</p>
											<p>{avtoInfo?.owner?.address}</p>
										</div>
										<div className='single_buyurtma_inputs'>
											<p>Identifikatsiya raqami (JShShIR) :</p>
											<p>{avtoInfo?.owner?.pinfl}</p>
										</div>
									</div>
									<div className={avtoInfo?.trust_owner ? 'margin_top_30' : 'close'}>
										<p className='kl1_jami text_center'>Ishonchnoma berilgan shaxs ma'lumotlari</p>
										<div className='single_buyurtma_inputs margin_top_10'>
											<p>F.I.Sh.:</p>
											<p>{avtoInfo?.trust_owner?.fio}</p>
										</div>
										<div className='single_buyurtma_inputs'>
											<p>Shaxsini tasdiqlovchi hujjat turi:</p>
											<p>{avtoInfo?.trust_owner?.doc_type}</p>
										</div>
										<div className='single_buyurtma_inputs'>
											<p>Seriyasi va raqami:</p>
											<p>{avtoInfo?.trust_owner?.serial_num}</p>
										</div>
										<div className='single_buyurtma_inputs'>
											<p>Kim tomonidan berilgan:</p>
											<p>{avtoInfo?.trust_owner?.issued_by}</p>
										</div>
										<div className='single_buyurtma_inputs'>
											<p>Berilgan sana:</p>
											<p>{avtoInfo?.trust_owner?.issued_date}</p>
										</div>
										<div className='single_buyurtma_inputs'>
											<p>Ro'yxat bo'yicha yashash manzili:</p>
											<p>{avtoInfo?.trust_owner?.address}</p>
										</div>
										<div className='single_buyurtma_inputs'>
											<p>Ishonchnoma raqami:</p>
											<p>{avtoInfo?.trust_owner?.proxy_number}</p>
										</div>
										<div className='single_buyurtma_inputs'>
											<p>Ishonchnoma berilgan sana:</p>
											<p>{avtoInfo?.trust_owner?.date}</p>
										</div>
										<div className='single_buyurtma_inputs'>
											<p>Identifikatsiya raqami (JShShIR):</p>
											<p>{avtoInfo?.trust_owner?.pinfl}</p>
										</div>
									</div>
									{/* Table */}
									<div className='margin_top_30'>
										<div className='table_root'>
											<table className='single_table_pdf responsive_table'>
												<tbody>
													<tr>
														<td>№</td>
														<td>Nomi</td>
														<td>Ishlab chiqarilgan yil</td>
														<td>Davlat raqam belgisi</td>
														<td>Transport vositasi turi</td>
														<td>Qayd etish guvohnomasi</td>
														<td>Dvigatel raqami</td>
														<td>Kuzov raqami</td>
														<td>Shassi №</td>
														<td>Baholangan qiymati, so'm</td>
													</tr>
													{
														avtoInfo?.auto?.map((item, index) => {
															return (
																<tr key={item?.name + index}>
																	<td>{index + 1}</td>
																	<td>{item?.name}</td>
																	<td>{item?.year}</td>
																	<td>{item?.number}</td>
																	<td>{item?.type_of_auto}</td>
																	<td>{item?.registration_cert}</td>
																	<td>{item?.engine_number}</td>
																	<td>{item?.body_code}</td>
																	<td>{item?.chassis}</td>
																	<td>{item?.sum?.toLocaleString(undefined, { minimumFractionDigits: 2 })}</td>
																</tr>
															)
														})
													}

												</tbody>
											</table>
										</div>
										<p className='margin_top_15'></p>
										{
											avtoInfo?.auto?.map((item, index) => {
												return (
													<>
														<div className='single_buyurtma_inputs'>
															<p>Kim tomonidan berilgan:</p>
															<p>{item?.registrated_by}</p>
														</div>
														<div className='single_buyurtma_inputs'>
															<p>Berilgan sanasi:</p>
															<p>{item?.registration_date}</p>
														</div>
													</>
												)
											})
										}
										<div className='endRow margin_top_20'>
											<p className='kl1_jami'>JAMI: {totalSum()} so`m</p>
										</div>
										<p className='margin_top_15'></p>
										<ContainerView paths={path} />
									</div>
								</div>
							</div>
						</>
					)
				}
			</div>
		</section>
	)
}

export default SingleAuto