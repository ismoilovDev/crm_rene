import Swal from "sweetalert2";

export function alert(message, type, timer) {
   Swal.fire({
      title: message,
      icon: type,
      confirmButtonText: 'Ok',
      timer: timer ? timer : false
   })
}

export const warning = (title) => {
   return Swal.fire({
      title: title,
      showDenyButton: true,
      showCancelButton: false,
      confirmButtonText: "Ha",
      denyButtonText: `Yo'q`
   })
}