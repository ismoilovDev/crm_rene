import Prev from "../../Components/Buttons/Prev"
import { PrintButton } from "./print"

export const HeaderButtons = () =>(
    <div className='pdf_header'>
        <Prev/>
        <PrintButton/>
    </div>
)