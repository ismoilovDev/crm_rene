import { useNavigate } from 'react-router-dom';
import { AiOutlineRollback } from 'react-icons/ai'

function Prev() {
   const navigate = useNavigate()
   return (
      <button
         onClick={() => navigate(-1)}
         className='clientform_back'
      >
         <AiOutlineRollback />
         Ortga
      </button>
   )
}

export default Prev;