import Select from 'react-select';

const customStyles = {
   option: provided => ({
      ...provided,
      padding: 10,
      borderRadius: 5
   }),
   singleValue: (provided, state) => {
      const opacity = state.isDisabled ? 0.5 : 1;
      const transition = 'opacity 300ms';

      return { ...provided, opacity, transition };
   }
}

export function ClientSelect({ label, client, setClient, options, selectClassName, changeHendle = null }) {

   const value = label === "Tuman" ? options?.find(x => x?.value == client?.district?.id) : label === "Viloyat/Respublika" ? options?.find(x => x?.value == client?.region?.id) : label === "Fuqarolik" ? options?.find(x => x.label == client?.citizenship) : label === "Jinsi" ? options?.find(x => x.value == client?.gender) : options?.find(x => x.label == client?.doc_type)

   function onChangeHendle(event) {
      const newClient = { ...client }
      if (label === "Tuman") {
         newClient.district.id = event.value
         newClient.district.name_uz = event.label
         setClient(newClient)
      } else if (label === "Viloyat/Respublika") {
         newClient.region.id = event.value
         newClient.region.name_uz = event.label
         setClient(newClient)
         changeHendle(event.value)
      } else if (label === "Fuqarolik") {
         newClient.citizenship = event.label
         setClient(newClient)
      } else if (label === "Jinsi") {
         newClient.gender = event.value
         setClient(newClient)
      } else {
         newClient.doc_type = event.label
         setClient(newClient)

      }
   }

   return (
      <div className='clientForm_selector'>
         <p>{label}</p>
         <Select
            defaultValue={value}
            value={value}
            options={options}
            className={`buyurtma_select_new ${selectClassName}`}
            styles={customStyles}
            theme={(theme) => ({
               ...theme,
               borderRadius: 12,
               colors: {
                  ...theme.colors,
                  primary25: '#7828c8',
                  primary: '#7828c8',
               },
            })}
            onChange={(event) => onChangeHendle(event)}
         />
      </div>
   )
}