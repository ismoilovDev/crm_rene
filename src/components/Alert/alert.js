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
      text: "Buni qaytara olmaysiz!",
      icon: "warning",
      showDenyButton: true,
      showCancelButton: false,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Ha!",
      denyButtonText: `Yo'q`
    })
}