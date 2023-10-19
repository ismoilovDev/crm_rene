import { memo, useEffect, useMemo, useState } from 'react';
import { useParams } from 'react-router';
import { ClientContext } from '../../../context/context';
import { ClientDetailsSkleton, TabPanelSkleton } from '../../../components/Skleton/ClientSkleton';
import { SingleClientHeader } from '../../../components/Client/SingleClientHeader';
import { ClientMainBox } from '../../../components/Client/ClientMainBox';
import { TabPanel } from '../../../components/Client/TabPanel';
import ClientRoutes from './Routes';
import https from '../../../services/https';

const ControllerContent = memo(({ id, loading }) => {
   return (
      <section className="client_main">
         {
            loading ?
               <>
                  <TabPanelSkleton />
                  <TabPanelSkleton type='btns' />
                  <div className='single_client'>
                     <ClientDetailsSkleton />
                  </div>
               </> :
               <>
                  <TabPanel id={id} />
                  <div className='single_client'>
                     <ClientMainBox id={id} />
                     <ClientRoutes id={id} />
                  </div>
               </>

         }
      </section>
   )
})

function ClientController() {
   const [currentClient, setCurrentClient] = useState({});
   const [loading, setLoading] = useState(true)
   const { id } = useParams()

   useEffect(() => {
      const abortController = new AbortController();
      getClientDetails();

      async function getClientDetails() {
         try {
            const response = await https.get(`/clients/${id}`);
            setCurrentClient(response?.data);
            setLoading(false);
         } catch (error) {
            console.log(error);
         }
      }
      return () => {
         abortController.abort();
      };
   }, [id])

   const client = useMemo(() => currentClient, [currentClient]);

   return (
      <>
         <SingleClientHeader />
         <ClientContext.Provider value={{ client, setCurrentClient }}>
            <ControllerContent id={id} loading={loading} />
         </ClientContext.Provider>
      </>
   )
}

export default ClientController