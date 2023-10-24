import dateConvert from "../../utils/functions/dateConvert"

export const Address = ({info}) =>(
    <span>
        Yashash manzilim: {info?.city} {info?.district?.name_uz  ? info?.district?.name_uz : info?.district} {info?.address} {info?.temp_address ? info?.temp_address : null}.
    </span>
)

export const DocInfo = ({info}) =>(
    <span>
        Shaxsimni tasdiqlovchi hujjat ma'lumotlari: {info?.serial_num} raqamli {info?.doc_type}  {dateConvert(info?.issued_date)} y. da {info?.issued_by} tomonidan berilgan.
    </span>
)

export const CardInfo = ({info})=>(
    <ul>
        <li>SSKS : {info?.ssks}</li>
        <li>Bank : {info?.bank_name}</li>
        <li>MFO : {info?.bank_code}</li>
    </ul>
)