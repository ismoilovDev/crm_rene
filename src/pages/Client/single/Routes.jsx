import { Suspense, lazy, memo } from 'react'
import { Route, Routes } from 'react-router'
import ClientKlList from '../tabs/ClientKlList';

const AboutClient = lazy(() => import('../tabs/AboutClient'));
const ClientOrders = lazy(() => import('../tabs/ClientOrders'));
const ClientSupplyInfos = lazy(() => import('../tabs/ClientSupplyInfos'));
const ClientContracts = lazy(() => import('../tabs/ClientContracts'));
const ClientOpenContract = lazy(() => import('../tabs/ClientOpenContract'));
const NotFound = lazy(() => import('../tabs/NotFound'));

function ClientRoutes({ id }) {
   return (
      <Suspense fallback={<span></span>}>
         <Routes>
            <Route exact path='/' element={<AboutClient id={id} />} />
            <Route path='/orders-tab' element={<ClientOrders id={id}/>} />
            <Route path='/supply-info-tab' element={<ClientSupplyInfos id={id}/>} />
            <Route path='/contracts-tab' element={<ClientContracts id={id} />} />
            <Route path='/open-contract-tab' element={<ClientOpenContract id={id} />} />
            <Route path='/monitoring-tab' element={<ClientKlList id={id} />} />
            <Route path='/*' element={<NotFound />} />
         </Routes>
      </Suspense>
   )
}

export default memo(ClientRoutes)