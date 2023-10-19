export function translateType(type) {
   if (type === 'auto') {
      return ("transport")
   } else if (type === 'gold') {
      return ("tilla buyumlar")
   } else if (type === 'guarrantor') {
      return ("3 shaxs")
   } else if (type === 'insurance') {
      return ("sug'urta")
   } else {
      return ("ishonch asosida")
   }
}

export const makeTheme = (theme) => ({
   ...theme,
   borderRadius: 12,
   colors: {
      ...theme.colors,
      primary25: '#7828c8',
      primary: '#7828c8',
   },
})

export const customStyles = {
   option: (provided, state) => ({
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