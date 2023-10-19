import { memo } from "react"

export const Address = memo(({info}) =>(
    <span>
        Yashash manzilim: {info?.city} {info?.district} {info?.address} {info?.temp_address ? info?.temp_address : null}.
    </span>
))

export const DocInfo = memo(({info}) =>(
    <span>
        Shaxsimni tasdiqlovchi hujjat ma'lumotlari: {info?.serial_num} raqamli {info?.doc_type}  {info?.issued_date} y. da {info?.issued_by} tomonidan berilgan.
    </span>
))