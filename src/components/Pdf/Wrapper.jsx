import { memo, useEffect } from 'react';
import { PdfLoader } from './PdfLoader';

export const PdfWrapper = memo(({ children, indicator }) => {
   useEffect(() => {
      window.scroll(0, 0)
   }, [])

   return (
      <section className='pdf_wrapper'>
         <div className="pdf_container_view">
            {!indicator ? <PdfLoader /> : children}
         </div>
      </section>
   )
})
