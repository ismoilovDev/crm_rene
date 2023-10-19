import { Suspense } from 'react'
import { Route, Routes } from 'react-router'
import { routes } from '../../utils/routes'
import { FallBackCompo } from '../../components/Loader/FallBackCompo'

function Router() {
   return (

      <div className='content'>
         <Suspense fallback={<FallBackCompo />}>
            <Routes>
               {routes.map((route, index) => (
                  <Route key={index} path={route.path}>
                     {route.children && (
                        <>
                           {route.children.map((childRoute, childIndex) => (
                              <Route
                                 key={childIndex}
                                 path={childRoute.path}
                                 element={<childRoute.element />}
                              />
                           ))}
                        </>
                     )}
                  </Route>
               ))}
            </Routes>
         </Suspense>
      </div>
   )
}

export default Router