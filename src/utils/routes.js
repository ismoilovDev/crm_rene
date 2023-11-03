import { lazy } from 'react';
import Home from '../pages/Home/Home';
const ClientRouting = lazy(() => import('../pages/Client/index'));
const ContractRouting = lazy(() => import('../pages/Contract/index'));
const OrderRouting = lazy(() => import('../pages/Order'));
const SupplyRouting = lazy(() => import('../pages/SupplyInfo/index'));
const BranchRouting = lazy(() => import('../pages/Branch'));
const EmployeesRouting = lazy(() => import('../pages/Employee'));
const ProductRouting = lazy(() => import('../pages/Product'));
const SectionRouting = lazy(() => import('../pages/Section'));
const UserRouting = lazy(() => import('../pages/User'));
const GroupRouting = lazy(() => import('../pages/Group/index'));
const ClientMarksRouting = lazy(() => import('../pages/KL1Form'));
const PdfRouting = lazy(() => import('../pdfs/index'));
const Calculator = lazy(() => import('../pages/Calculator/Calculator'));
const CalendarSet = lazy(() => import('../pages/Calendar/CalendarSet'));


export const routes = [
   {
      path: "/",
      children: [
         {
            path: "/",
            element: Home,
         },
         {
            path: "calculator",
            element: Calculator
         },
         {
            path: "calendar",
            element: CalendarSet
         }
      ]
   },
   {
      path: "/clients",
      children: [
         {
            path: "*",
            element: ClientRouting,
         },
      ]
   },
   {
      path: "/groups",
      children: [
         {
            path: "*",
            element: GroupRouting,
         },
      ]
   },
   {
      path: "/contracts",
      children: [
         {
            path: "*",
            element: ContractRouting
         },
      ]
   },
   {
      path: "/orders",
      children: [
         {
            path: "*",
            element: OrderRouting
         }
      ]
   },
   {
      path: "/supplies",
      children: [
         {
            path: "*",
            element: SupplyRouting
         }
      ]
   },
   {
      path: "/branches",
      children: [
         {
            path: "*",
            element: BranchRouting
         },
      ]
   },
   {
      path: "/client-marks",
      children: [
         {
            path: "*",
            element: ClientMarksRouting
         }
      ]
   },
   {
      path: "/employees",
      children: [
         {
            path: "*",
            element: EmployeesRouting
         },
      ]
   },
   {
      path: "/sections",
      children: [
         {
            path: "*",
            element: SectionRouting
         }
      ]
   },
   {
      path: "/products",
      children: [
         {
            path: "*",
            element: ProductRouting
         }
      ]
   },
   {
      path: "/users",
      children: [
         {
            path: "*",
            element: UserRouting
         }
      ]
   },
   {
      path: "/pdf",
      children: [
         {
            path: "*",
            element: PdfRouting
         }
      ]
   }
]


