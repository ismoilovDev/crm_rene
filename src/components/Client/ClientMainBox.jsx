import { memo } from 'react';
import { ClientDetails } from './ClientDetails';
import Control from './Control';


export const ClientMainBox = memo(({ id }) => {
   return (
      <>
         <Control id={id} />
         <ClientDetails />
      </>
   )
})
