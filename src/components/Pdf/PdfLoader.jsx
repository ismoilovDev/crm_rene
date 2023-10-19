import { memo } from "react";
import { Loading } from "@nextui-org/react";

export const PdfLoader = memo(() => {
   return (
      <div className='loader_container'>
         <Loading size="lg" type="spinner" />
      </div>
   )
})
