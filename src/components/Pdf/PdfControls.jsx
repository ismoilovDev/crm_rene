import { memo } from "react"
import { PrintButton } from "./Print"
import Prev from "../Prev/Prev"

export const PdfControls = memo(() => (
   <div className='pdf_header'>
      <Prev />
      <PrintButton />
   </div>
))