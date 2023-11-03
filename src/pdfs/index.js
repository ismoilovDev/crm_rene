import { Suspense, lazy } from "react";
import { Route, Routes } from "react-router";
import { PdfLoader } from "../components/Pdf/PdfLoader";
import './pdf.css';

const B1Form = lazy(() => import('./B1Form'));
const AV1Form = lazy(() => import('./AV1Form'));
const B3Form = lazy(() => import('./B3Form'));
const B4Form = lazy(() => import('./B4Form'));
const B5Form = lazy(() => import('./B5Form'));
const P1Form = lazy(() => import('./P1Form'));
const P2Form = lazy(() => import('./P2Form'));
const P3Form = lazy(() => import('./P3Form'));
const X1Form = lazy(() => import('./X1Form'));
const K1Form = lazy(() => import('./K1Form'));
const K2Form = lazy(() => import('./K2Form'));
const G1Form = lazy(() => import('./G1Form'));
const GS1Form = lazy(() => import('./GS1Form'));
const QDForm = lazy(() => import('./QDForm'));
const Namuna = lazy(() => import('./Namuna'));
const S1Form = lazy(() => import('./S1Form'));
const KD2Form = lazy(() => import('./KD2Form'));
const TDForm = lazy(() => import('./TDForm'));
const DLForm = lazy(() => import('./DLForm'));
const NIForm = lazy(() => import('./NIForm'));
const ContractPDF = lazy(() => import('./3xContract/ContractPDF'));
const KLPDF = lazy(() => import('./KLPDF'));

export default function PdfRouting() {

   return (
      <Suspense fallback={<PdfLoader />}>
         <Routes>
            <Route path='b1' element={<B1Form />} />
            <Route path='av1' element={<AV1Form />} />
            <Route path='b3' element={<B3Form />} />
            <Route path='b4' element={<B4Form />} />
            <Route path='b5' element={<B5Form />} />
            <Route path='p1' element={<P1Form />} />
            <Route path='p2' element={<P2Form />} />
            <Route path='p3' element={<P3Form />} />
            <Route path='x1' element={<X1Form />} />
            <Route path='k1' element={<K1Form />} />
            <Route path='k2' element={<K2Form />} />
            <Route path='g1' element={<G1Form />} />
            <Route path='gs1' element={<GS1Form />} />
            <Route path='qd' element={<QDForm />} />
            <Route path='namuna' element={<Namuna />} />
            <Route path='s1' element={<S1Form />} />
            <Route path='kd2' element={<KD2Form />} />
            <Route path='td' element={<TDForm />} />
            <Route path='contract' element={<ContractPDF />} />
            <Route path='dl' element={<DLForm />} />
            <Route path='ni' element={<NIForm />} />
            <Route path='client-marks' element={<KLPDF />} />
         </Routes>
      </Suspense>
   )
}
