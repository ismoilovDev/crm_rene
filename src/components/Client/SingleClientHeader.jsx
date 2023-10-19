import { memo } from 'react';
import { useNavigate } from 'react-router-dom';
import { AiOutlineRollback } from 'react-icons/ai'

export const SingleClientHeader = memo(({ id }) => {
   const navigate = useNavigate()
   return (
      <div className='filialform_header'>
         <button
            onClick={() => navigate(-1, { replace: false })}
            className='clientform_back'
         >
            <AiOutlineRollback />
            Ortga
         </button>
      </div>
   )
})
