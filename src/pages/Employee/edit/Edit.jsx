import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { AiOutlineUserAdd, AiOutlineClear } from 'react-icons/ai'
import { Input, Radio } from '@nextui-org/react'
import { alert } from '../../../components/Alert/alert';
import Select from 'react-select';
import ContainerEdit from '../../../components/ImageContainer/ContainerEdit';
import LoaderBackdrop from '../../../components/Loader/LoaderBackdrop';
import Prev from '../../../components/Prev/Prev';
import https from '../../../services/https';

const positions = [
   {
      value: 'chief_treasurer',
      label: "Bosh g'aznachi"
   },
   {
      value: 'head_of_credit',
      label: "Bosh kreditor"
   },
   {
      value: 'chief_accountant',
      label: "Bosh buxgalter"
   },
   {
      value: 'head_of_branch',
      label: "Boshqaruvchi"
   },
   {
      value: null,
      label: "Qo'mita azosi emas"
   }
]

const customStyles = {
   option: (provided) => ({
      ...provided,
      padding: 5,
      borderRadius: 5
   }),
   singleValue: (provided, state) => {
      const opacity = state.isDisabled ? 0.5 : 1;
      const transition = 'opacity 300ms';
      return { ...provided, opacity, transition };
   }
}

function EmployeeEdit() {
   const { id } = useParams()
   const [path, setPath] = useState([])
   const [xodim, setXodim] = useState({})
   const [disable, setDisable] = useState(false)
   const [backXodim, setBackXodim] = useState({})
   const [filialOptions, setFilialOptions] = useState([])
   const [sectionOptions, setSectionOptions] = useState([])

   useEffect(() => {
      https
         .get(`/employees/${id}`)
         .then(res => {
            setXodim(res?.data)
            let images = []
            images.push(res?.data?.photo)
            setPath(images)
            setBackXodim(res?.data)
         })
         .catch(err => {
            console.log(err);
         })

   }, [])

   async function fetchBranches() {
      const res = await https.get('/all/branches')
      let selectFilial = []
      res?.data?.map((item) => {
         selectFilial.push(
            { value: item?.id, label: item?.name }
         )
      })
      setFilialOptions(selectFilial)
   }

   async function fetchSection() {
      const ress = await https.get('/all/sections')
      let selectSection = []
      ress?.data?.map((item) => {
         selectSection.push(
            { value: item?.id, label: item?.name }
         )
      })
      setSectionOptions(selectSection)
   }

   useEffect(() => {
      fetchBranches()
      fetchSection()
   }, [])

   function backFun() {
      setXodim(backXodim)
   }

   function editEmployee() {
      setDisable(true)

      let info = {
         ...xodim,
         paths: path[0] ? path[0] : null
      }
      https
         .put(`/employees/${id}`, info)
         .then(res => {
            setDisable(false)
            alert("Xodim o`zgartirildi", 'success')
         })
         .catch(err => {
            setDisable(false)
            alert(err?.response?.data?.message, 'error')
            console.log(err)
            console.log(info)
         })
   }


   return (
      <section>
         <div className='filialform_header'>
            <Prev />
         </div>
         <div className='single_buyurtma'>
            <h1 className='text_center filial_edit_text'>{xodim?.name}</h1>
            <div className='pdf_margin_top_15'>
               <Input
                  width='100%'
                  bordered
                  label="Ismi"
                  value={xodim?.firstname}
                  className='filial_input'
                  color="secondary"
                  onChange={(e) => {
                     let newxodim = { ...xodim }
                     newxodim.firstname = e.target.value
                     setXodim(newxodim)
                  }}
               />
               <Input
                  width='100%'
                  bordered
                  label="Familiyasi"
                  value={xodim?.surname}
                  className='filial_input'
                  color="secondary"
                  onChange={(e) => {
                     let newxodim = { ...xodim }
                     newxodim.surname = e.target.value
                     setXodim(newxodim)
                  }}
               />
               <Input
                  width='100%'
                  bordered
                  label="Sharifi"
                  value={xodim?.lastname}
                  className='filial_input'
                  color="secondary"
                  onChange={(e) => {
                     let newxodim = { ...xodim }
                     newxodim.lastname = e.target.value
                     setXodim(newxodim)
                  }}
               />
               <Radio.Group
                  className='radio_group margin_bottom_15'
                  defaultValue={xodim?.gender}
                  value={xodim?.gender}
                  orientation="horizontal"
                  label="Jinsi:"
                  onChange={(e) => {
                     let newxodim = { ...xodim }
                     newxodim.gender = e
                     setXodim(newxodim)
                  }}
               >
                  <Radio value="male" color="secondary" size="sm">
                     Erkak
                  </Radio>
                  <Radio value="female" color="secondary" size="sm" className='radio_second'>
                     Ayol
                  </Radio>
               </Radio.Group>
               <Input
                  width='100%'
                  bordered
                  label="Pasport raqami"
                  value={xodim?.passport_data}
                  className='filial_input'
                  color="secondary"
                  onChange={(e) => {
                     if (e.target.value.trim().length <= 9) {
                        let newxodim = { ...xodim }
                        newxodim.passport_data = e.target.value.toUpperCase()
                        setXodim(newxodim)
                     }
                  }}
               />
               <Input
                  width='100%'
                  bordered
                  label="PINFL"
                  value={xodim?.pinfl}
                  className='filial_input'
                  color="secondary"
                  type='number'
                  onWheel={(e) => e.target.blur()}
                  onChange={(e) => {
                     if (e.target.value.trim().length <= 14) {
                        let newxodim = { ...xodim }
                        newxodim.pinfl = e.target.value
                        setXodim(newxodim)
                     }
                  }}
               />
               <Input
                  width='100%'
                  bordered
                  label="Tajriba"
                  value={xodim?.staj}
                  className='filial_input'
                  color="secondary"
                  type='number'
                  onWheel={(e) => e.target.blur()}
                  min="0"
                  step=".01"
                  onChange={(e) => {
                     let newxodim = { ...xodim }
                     newxodim.staj = e.target.value
                     setXodim(newxodim)
                  }}
               />
               <Input
                  width='100%'
                  bordered
                  label="Stavka"
                  value={xodim?.stavka}
                  className='filial_input'
                  color="secondary"
                  type='number'
                  onWheel={(e) => e.target.blur()}
                  min="0"
                  step=".01"
                  onChange={(e) => {
                     let newxodim = { ...xodim }
                     newxodim.stavka = e.target.value
                     setXodim(newxodim)
                  }}
               />
               <Radio.Group
                  className='radio_group margin_bottom_15'
                  defaultValue={xodim?.graduation}
                  value={xodim?.graduation}
                  orientation="horizontal"
                  label="Oliy ta'lim:"
                  onChange={(e) => {
                     let newxodim = { ...xodim }
                     newxodim.graduation = e
                     setXodim(newxodim)
                  }}
               >
                  <Radio value={true} color="secondary" size="sm">
                     Bor
                  </Radio>
                  <Radio value={false} color="secondary" size="sm" className='radio_second'>
                     Yok
                  </Radio>
               </Radio.Group>
               <Input
                  width='100%'
                  bordered
                  label="Shartnoma sanasi"
                  value={xodim?.contract_date}
                  type='date'
                  className='filial_input'
                  color="secondary"
                  onChange={(e) => {
                     let newxodim = { ...xodim }
                     newxodim.contract_date = e.target.value
                     setXodim(newxodim)
                  }}
               />
               <Input
                  width='100%'
                  bordered
                  label="Shartnoma turi"
                  value={xodim?.contract_type}
                  className='filial_input'
                  color="secondary"
                  onChange={(e) => {
                     let newxodim = { ...xodim }
                     newxodim.contract_type = e.target.value
                     setXodim(newxodim)
                  }}
               />
               <Input
                  width='100%'
                  bordered
                  label="Lavozim"
                  value={xodim?.job}
                  className='filial_input'
                  color="secondary"
                  onChange={(e) => {
                     let newxodim = { ...xodim }
                     newxodim.job = e.target.value
                     setXodim(newxodim)
                  }}
               />
               <Input
                  width='100%'
                  bordered
                  label="Kod"
                  value={xodim?.code}
                  className='filial_input'
                  color="secondary"
                  onChange={(e) => {
                     let newxodim = { ...xodim }
                     newxodim.code = e.target.value
                     setXodim(newxodim)
                  }}
               />
               <div className='xodim_selectform'>
                  <p>Filial</p>
                  <Select
                     width='100%'
                     maxMenuHeight="150px"
                     options={filialOptions}
                     defaultValue={filialOptions?.find(x => x.value == xodim.branch_id)}
                     value={filialOptions?.find(x => x.value == xodim.branch_id)}
                     className='xodim_select basic-multi-select'
                     classNamePrefix="select"
                     styles={customStyles}
                     theme={(theme) => ({
                        ...theme,
                        borderRadius: 12,
                        colors: {
                           ...theme.colors,
                           primary25: 'rgb(216,215,215)',
                           primary: '#7828c8',
                        },
                     })}
                     onChange={(event) => {
                        let newxodim = { ...xodim }
                        newxodim.branch_id = event.value
                        setXodim(newxodim)
                     }}
                  />
               </div>
               <div className='xodim_selectform'>
                  <p>Bo'lim</p>
                  <Select
                     width='100%'
                     maxMenuHeight="150px"
                     defaultValue={sectionOptions?.find(x => x.value == xodim.section_id)}
                     value={sectionOptions?.find(x => x.value == xodim.section_id)}
                     options={sectionOptions}
                     className='xodim_select basic-multi-select'
                     classNamePrefix="select"
                     styles={customStyles}
                     theme={(theme) => ({
                        ...theme,
                        borderRadius: 12,
                        colors: {
                           ...theme.colors,
                           primary25: 'rgb(216,215,215)',
                           primary: '#7828c8',
                        },
                     })}
                     onChange={(event) => {
                        let newxodim = { ...xodim }
                        newxodim.section_id = event.value
                        setXodim(newxodim)
                     }}
                  />
               </div>
               <div className='xodim_selectform'>
                  <p>Kommisiya</p>
                  <Select
                     width='100%'
                     defaultValue={positions?.find(x => x.value == xodim?.position)}
                     value={positions?.find(x => x.value == xodim?.position)}
                     options={positions}
                     className='xodim_select'
                     styles={customStyles}
                     theme={(theme) => ({
                        ...theme,
                        borderRadius: 12,
                        colors: {
                           ...theme.colors,
                           primary25: 'rgb(216,215,215)',
                           primary: '#7828c8',
                        },
                     })}
                     onChange={(event) => {
                        let newxodim = { ...xodim }
                        newxodim.position = event.value
                        setXodim(newxodim)
                     }}
                  />
               </div>

               <p className='margin_top_15'></p>
               <ContainerEdit path={path} setPath={setPath} />

               <div className='xodim_buttons'>
                  <button className='client_submit reset back_red' onClick={() => { backFun() }}>
                     O'zgarishni bekor qilish
                     <AiOutlineClear />
                  </button>
                  <button type='submit' className='client_submit submit back_green' onClick={() => { editEmployee() }}>
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

export default EmployeeEdit