import { memo } from "react";
import { NumericFormat } from 'react-number-format';

export const NumericSumInput = memo(({ label, inputValue, setInputValue }) => {
   const handleInputChange = (e) => {
      const changed_number = Number((e.target.value).replace(/\s/g, ''))
      setInputValue(changed_number)
   };

   return (
      <div className="numeric_format_input">
         <label>{label}</label>
         <NumericFormat
            thousandSeparator={' '}
            value={inputValue}
            onChange={handleInputChange}
         />
      </div>
   )
})