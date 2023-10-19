import { memo } from 'react';
import Swal from 'sweetalert2';

function ErrorWarning(text) {
  return (
    Swal.fire({
      title: text,
      icon: 'error',
      confirmButtonText: 'Ok'
    })
  )
}

export default memo(ErrorWarning)