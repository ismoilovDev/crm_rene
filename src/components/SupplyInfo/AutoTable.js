import { memo } from 'react'
import { Input } from '@nextui-org/react'
import { NumericFormat } from "react-number-format";

export const AutoTable = memo(({ transportProducts, setTransportProducts, deleteTransportProduct, addNewTransportProduct }) => {
   return (
      <div className='transport_table'>
         <div className='transport_table_title_part'>
            <p className='transport_table_title'>Baholash natijalari</p>
         </div>
         {
            transportProducts?.map((item, index) => {
               return (
                  <div className='transport_table_product' key={item?.id}>
                     <div className='transport_table_product_title'>
                        <p>Mahsulot {index + 1}</p>
                        <button type='button' onClick={() => deleteTransportProduct(item?.id)}><i className='bx bxs-trash'></i></button>
                     </div>
                     <div className='transport_table_things'>
                        <Input
                           label='Nomi'
                           placeholder='Damas'
                           clearable
                           color="secondary"
                           bordered
                           className='transport_tableProduct_input'
                           value={transportProducts?.find(x => x.id === item.id).name}
                           onChange={(e) => {
                              const newArray = [...transportProducts]
                              newArray[index].name = e.target.value
                              setTransportProducts(newArray)
                           }}
                        />
                        <Input
                           label='Ishlab chiqarilgan yil'
                           placeholder='2009'
                           clearable
                           color="secondary"
                           type='number'
                           onWheel={(e) => e.target.blur()}
                           bordered
                           className='transport_tableProduct_input'
                           value={transportProducts?.find(x => x.id === item.id).year}
                           onChange={(e) => {
                              const newArray = [...transportProducts]
                              newArray[index].year = e.target.value
                              setTransportProducts(newArray)
                           }}
                        />
                        <Input
                           label='Davlat raqam belgisi'
                           placeholder='FR 447 RJ'
                           clearable
                           color="secondary"
                           bordered
                           className='transport_tableProduct_input'
                           value={transportProducts?.find(x => x.id === item.id).number}
                           onChange={(e) => {
                              const newArray = [...transportProducts]
                              newArray[index].number = e.target.value.toUpperCase()
                              setTransportProducts(newArray)
                           }}
                        />
                        <Input
                           label='Transport vositasi turi'
                           placeholder='yengil sedan'
                           clearable
                           color="secondary"
                           bordered
                           className='transport_tableProduct_input'
                           value={transportProducts?.find(x => x.id === item.id).type_of_auto}
                           onChange={(e) => {
                              const newArray = [...transportProducts]
                              newArray[index].type_of_auto = e.target.value
                              setTransportProducts(newArray)
                           }}
                        />
                        <Input
                           label='Qayd etish guvohnomasi'
                           placeholder='FDS92452'
                           clearable
                           color="secondary"
                           bordered
                           className='transport_tableProduct_input'
                           value={transportProducts?.find(x => x.id === item.id).registration_cert}
                           onChange={(e) => {
                              const newArray = [...transportProducts]
                              newArray[index].registration_cert = e.target.value
                              setTransportProducts(newArray)
                           }}
                        />
                        <Input
                           label='Dvigatel raqami'
                           placeholder='447 118'
                           clearable
                           color="secondary"
                           bordered
                           className='transport_tableProduct_input'
                           value={transportProducts?.find(x => x.id === item.id).engine_number}
                           onChange={(e) => {
                              const newArray = [...transportProducts]
                              newArray[index].engine_number = e.target.value
                              setTransportProducts(newArray)
                           }}
                        />
                        <Input
                           label='Kuzov raqami'
                           placeholder='JF92JJFLDKSF9034J'
                           clearable
                           color="secondary"
                           bordered
                           className='transport_tableProduct_input'
                           value={transportProducts?.find(x => x.id === item.id).body_code}
                           onChange={(e) => {
                              const newArray = [...transportProducts]
                              newArray[index].body_code = e.target.value
                              setTransportProducts(newArray)
                           }}
                        />
                        <Input
                           label='Shassi №'
                           placeholder='Raqamsiz'
                           clearable
                           color="secondary"
                           bordered
                           className='transport_tableProduct_input'
                           value={transportProducts?.find(x => x.id === item.id).chassis}
                           onChange={(e) => {
                              const newArray = [...transportProducts]
                              newArray[index].chassis = e.target.value
                              setTransportProducts(newArray)
                           }}
                        />
                        <Input
                           label='Kim tomonidan berilgan'
                           clearable
                           color="secondary"
                           bordered
                           className='transport_tableProduct_input'
                           value={transportProducts?.find(x => x.id === item.id)?.registrated_by}
                           onChange={(e) => {
                              const newArray = [...transportProducts]
                              newArray[index].registrated_by = e.target.value
                              setTransportProducts(newArray)
                           }}
                        />
                        <Input
                           label='Berilgan sanasi'
                           type='date'
                           color="secondary"
                           bordered
                           className='transport_tableProduct_input'
                           value={transportProducts?.find(x => x.id === item.id)?.registration_date}
                           onChange={(e) => {
                              const newArray = [...transportProducts]
                              newArray[index].registration_date = e.target.value
                              setTransportProducts(newArray)
                           }}
                        />
                        <div className="numeric_format_input without_margin width_100 border_radius_10 taminot_tableform_input">
                           <label>Baholangan qiymati, so'm</label>
                           <NumericFormat
                              thousandSeparator={' '}
                              value={transportProducts?.find(x => x.id === item.id)?.sum}
                              onChange={(e) => {
                                 const changed_number = Number((e.target.value).replace(/\s/g, ''))
                                 const newArray = [...transportProducts]
                                 newArray[index].sum = changed_number
                                 setTransportProducts(newArray)
                              }}
                           />
                        </div>
                     </div>
                  </div>
               )
            })
         }
         <div className='transport_product_addPlace'>
            <button className='transport_product_addButton' type='button' onClick={addNewTransportProduct}>
               <i className='bx bx-plus-circle'></i>
            </button>
         </div>
      </div>
   )
})


export const AutoEditTable = memo(({ cars, setCars, autoInfo, setAutoInfo, addNewCar, deleteCar, totalSum }) => {
   return (
      <div className='transport_table'>
         <div className='transport_table_title_part'>
            <p className='transport_table_title'>Baholash natijalari</p>
         </div>
         {
            cars?.map((item, index) => {
               return (
                  <div className='transport_table_product' key={item?.id}>
                     <div className='transport_table_product_title'>
                        <p>Mahsulot {index + 1}</p>
                        <button type='button' onClick={() => deleteCar(item?.id)}>
                           <i className='bx bxs-trash'></i>
                        </button>
                     </div>
                     <div className='transport_table_things'>
                        <Input
                           label='Nomi'
                           clearable
                           color="secondary"
                           bordered
                           className='transport_tableProduct_input'
                           value={cars?.find(x => x.id === item.id).name}
                           onChange={(e) => {
                              const newArray = [...cars]
                              newArray[index].name = e.target.value
                              setCars(newArray)
                           }}
                        />
                        <Input
                           label='Ishlab chiqarilgan yil'
                           clearable
                           color="secondary"
                           type='number'
                           onWheel={(e) => e.target.blur()}
                           bordered
                           className='transport_tableProduct_input'
                           value={cars?.find(x => x.id === item.id).year}
                           onChange={(e) => {
                              const newArray = [...cars]
                              newArray[index].year = e.target.value
                              setCars(newArray)
                           }}
                        />
                        <Input
                           label='Davlat raqam belgisi'
                           clearable
                           color="secondary"
                           bordered
                           className='transport_tableProduct_input'
                           value={cars?.find(x => x.id === item.id).number}
                           onChange={(e) => {
                              const newArray = [...cars]
                              newArray[index].number = e.target.value.toUpperCase()
                              setCars(newArray)
                           }}
                        />
                        <Input
                           label='Transport vositasi turi'
                           clearable
                           color="secondary"
                           bordered
                           className='transport_tableProduct_input'
                           value={cars?.find(x => x.id === item.id).type_of_auto}
                           onChange={(e) => {
                              const newArray = [...cars]
                              newArray[index].type_of_auto = e.target.value
                              setCars(newArray)
                           }}
                        />
                        <Input
                           label='Qayd etish guvohnomasi'
                           color="secondary"
                           bordered
                           className='transport_tableProduct_input'
                           clearable
                           value={cars?.find(x => x.id === item.id).registration_cert}
                           onChange={(e) => {
                              const newArray = [...cars]
                              newArray[index].registration_cert = e.target.value
                              setCars(newArray)
                           }}
                        />
                        <Input
                           label='Dvigatel raqami'
                           clearable
                           color="secondary"
                           bordered
                           className='transport_tableProduct_input'
                           value={cars?.find(x => x.id === item.id).engine_number}
                           onChange={(e) => {
                              const newArray = [...cars]
                              newArray[index].engine_number = e.target.value
                              setCars(newArray)
                           }}
                        />
                        <Input
                           label='Kuzov raqami'
                           clearable
                           color="secondary"
                           bordered
                           className='transport_tableProduct_input'
                           value={cars?.find(x => x.id === item.id).body_code}
                           onChange={(e) => {
                              const newArray = [...cars]
                              newArray[index].body_code = e.target.value
                              setCars(newArray)
                           }}
                        />
                        <Input
                           label='Shassi №'
                           clearable
                           color="secondary"
                           bordered
                           className='transport_tableProduct_input'
                           value={cars?.find(x => x.id === item.id).chassis}
                           onChange={(e) => {
                              const newArray = [...cars]
                              newArray[index].chassis = e.target.value
                              setCars(newArray)
                           }}
                        />
                        <Input
                           label='Kim tomonidan berilgan'
                           clearable
                           color="secondary"
                           bordered
                           className='transport_tableProduct_input'
                           value={cars?.find(x => x.id === item.id).registrated_by}
                           onChange={(e) => {
                              const newArray = [...cars]
                              newArray[index].registrated_by = e.target.value
                              setCars(newArray)
                           }}
                        />
                        <Input
                           label='Berilgan sanasi'
                           type='date'
                           color="secondary"
                           bordered
                           className='transport_tableProduct_input'
                           value={cars?.find(x => x.id === item.id).registration_date}
                           onChange={(e) => {
                              const newArray = [...cars]
                              newArray[index].registration_date = e.target.value
                              setCars(newArray)
                           }}
                        />
                        <div className={`numeric_format_input border_radius_10 without_margin width_100`}>
                           <label>Baholangan qiymati, so'm</label>
                           <NumericFormat
                              thousandSeparator={' '}
                              value={cars?.find(x => x.id === item.id)?.sum}
                              onChange={(e) => {
                                 const changed_number = Number((e.target.value).replace(/\s/g, ''))
                                 const newArray = [...cars]
                                 const newArr = { ...autoInfo }
                                 newArray[index].sum = changed_number
                                 newArr.percent = (newArr.sum == 0 || totalSum() == 0) ? 0 : ((newArr.sum / totalSum()) * 100).toFixed(1)
                                 setCars(newArray)
                                 setAutoInfo(newArr)
                              }}
                           />
                        </div>
                     </div>
                  </div>
               )
            })
         }
         <div className='transport_product_addPlace'>
            <button className='transport_product_addButton' type='button' onClick={addNewCar}>
               <i className='bx bx-plus-circle'></i>
            </button>
         </div>
      </div>
   )
})