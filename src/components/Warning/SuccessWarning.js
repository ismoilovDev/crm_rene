import { memo } from 'react';
import Swal from 'sweetalert2';

function SuccessWarning(text) {
  return (
    Swal.fire({
        title: text,
        icon: 'success',
        confirmButtonText: 'Ok'
    })
  )
}

export default memo(SuccessWarning)