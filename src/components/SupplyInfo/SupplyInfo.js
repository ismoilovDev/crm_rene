import { Input } from "@nextui-org/react"
import { memo } from "react"

export const IndependentSupply = memo(({ class_name, register, valuedStatus }) => {
   return (
      <div className={class_name}>
         <Input
            label='Transport vositasini baholovchi tashkilot'
            placeholder='Vosiq Mirzo'
            width='100%'
            color="secondary"
            bordered
            className='transport_fourInputs_input'
            clearable
            {...register(`company.name`, { required: valuedStatus })}
         >
         </Input>
         <Input
            label='Litsenziya'
            placeholder='Litsenziya BL001, RR0118, 19.02.2014 y. berilgan'
            width='100%'
            color="secondary"
            bordered
            className='transport_fourInputs_input'
            clearable
            {...register(`company.license`, { required: valuedStatus })}
         >
         </Input>
         <Input
            label='Baholovchining ismi sharifi'
            placeholder='B.Asomov'
            width='100%'
            color="secondary"
            bordered
            className='transport_fourInputs_input'
            clearable
            {...register(`company.valuer_name`, { required: valuedStatus })}
         >
         </Input>
         <Input
            label='Baholash hujjati raqami'
            placeholder='06/002'
            width='100%'
            color="secondary"
            bordered
            className='transport_fourInputs_input'
            clearable
            {...register(`company.doc_code`, { required: valuedStatus })}
         >
         </Input>
      </div>
   )
})

export const IndependentGoldSupply = memo(({ bahoType, addStatus, register }) => {
   return (
      <div className='taminot_grid_inputs'>
         <div className={bahoType === 2 ? 'taminot_bahoType' : 'close'}>
            <Input
               bordered
               label='Tilla buyumlarni baholovchi tashkilot'
               className='taminot_tableform_input'
               width='100%'
               clearable
               placeholder="Voziq Mirzo"
               color="secondary"
               {...register(`company.name`, { required: addStatus })}
            />
            <Input
               bordered
               label='Litsenziya'
               className='taminot_tableform_input'
               width='100%'
               clearable
               placeholder=" Litsenziya BL001, RR0118, 19.02.2014 y. berilgan"
               color="secondary"
               {...register(`company.license`, { required: addStatus })}
            />
            <Input
               bordered
               label='Baholovchining ismi sharifi'
               className='taminot_tableform_input'
               width='100%'
               clearable
               placeholder="B.Asomov"
               color="secondary"
               {...register(`company.valuer_name`, { required: addStatus })}
            />
            <Input
               bordered
               label='Baholash hujjati raqami'
               className='taminot_tableform_input'
               width='100%'
               clearable
               placeholder="06/002"
               color="secondary"
               {...register(`company.doc_code`, { required: addStatus })}
            />
         </div>
      </div>
   )
})

export const IndependentAutoEditSupply = memo(({ autoInfo, company, setCompany }) => {
   return (
      <div className={Number(autoInfo?.valued_by) === 2 ? 'taminot_bahoType' : 'close'}>
         <Input
            bordered
            label='Transport vositasini baholovchi tashkilot'
            className='vall'
            width='100%'
            clearable
            color="secondary"
            value={company?.name}
            onChange={(e) => {
               const newCompany = { ...company }
               newCompany.name = e.target.value
               setCompany(newCompany)
            }}
         />
         <Input
            bordered
            label='Litsenziya'
            className='vall'
            width='100%'
            clearable
            color="secondary"
            value={company?.license}
            onChange={(e) => {
               const newCompany = { ...company }
               newCompany.license = e.target.value
               setCompany(newCompany)
            }}
         />
         <Input
            bordered
            label='Baholovchining ismi sharifi'
            className='vall'
            width='100%'
            clearable
            color="secondary"
            value={company?.valuer_name}
            onChange={(e) => {
               const newCompany = { ...company }
               newCompany.valuer_name = e.target.value
               setCompany(newCompany)
            }}
         />
         <Input
            bordered
            label='Baholash hujjati raqami'
            width='100%'
            clearable
            className='vall'
            color="secondary"
            value={company?.doc_code}
            onChange={(e) => {
               const newCompany = { ...company }
               newCompany.doc_code = e.target.value
               setCompany(newCompany)
            }}
         />
      </div>
   )
})