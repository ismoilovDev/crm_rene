import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { AiOutlineClear, AiOutlineUserAdd } from 'react-icons/ai'
import { Input } from '@nextui-org/react'
import { alert } from '../../../components/Alert/alert'
import LoaderBackdrop from '../../../components/Loader/LoaderBackdrop'
import Prev from '../../../components/Prev/Prev'
import https from '../../../services/https'


function ProductEdit() {
   let { id } = useParams()
   const [product, setProduct] = useState({})
   const [backProduct, setBackProduct] = useState({})
   const [disable, setDisable] = useState(false)

   function backFun() {
      setProduct(backProduct)
   }

   useEffect(() => {
      https
         .get(`/products/${id}`)
         .then(res => {
            setProduct(res?.data)
            setBackProduct(res?.data)
         })
         .catch(err => {
            alert(err.responce)
         })
   }, [])

   function onSubmit() {
      setDisable(true)

      let data = JSON.parse(JSON.stringify(product))
      delete data.id
      https
         .put(`/products/${id}`, data)
         .then(res => {
            setDisable(false)
            if (res.request.status === 200 || res.request.status === 201) {
               alert("Mahsulot o'zgartirildi", 'success')
            }
         })
         .catch(err => {
            setDisable(false)
            alert(err?.response?.data?.message, 'error')
            console.log(err);
         })
   }

   return (
      <section>
         <div className='filialform_header'>
            <Prev />
         </div>
         <div className='single_buyurtma'>
            <h1 className='text_center filial_edit_text'>{product?.name}</h1>
            <div className='pdf_margin_top_15'>
               <Input
                  width='100%'
                  bordered
                  label="Nomi"
                  value={product?.name}
                  className='filial_input'
                  color="secondary"
                  onChange={(e) => {
                     let newproduct = { ...product }
                     newproduct.name = e.target.value
                     setProduct(newproduct)
                  }}
               />
               <Input
                  width='100%'
                  bordered
                  label="Kod"
                  value={product?.code}
                  className='filial_input'
                  color="secondary"
                  onChange={(e) => {
                     let newproduct = { ...product }
                     newproduct.code = e.target.value
                     setProduct(newproduct)
                  }}
               />
               <div className='xodim_buttons'>
                  <button className='client_submit reset back_red' onClick={() => { backFun() }}>
                     O'zgarishni bekor qilish
                     <AiOutlineClear />
                  </button>
                  <button type='submit' className='client_submit submit back_green' onClick={() => { onSubmit() }}>
                     O'zgarishni kiritish
                     <AiOutlineUserAdd />
                  </button>
               </div>

               <LoaderBackdrop disable={disable} />
            </div>
         </div>
      </section>
   )
}

export default ProductEdit