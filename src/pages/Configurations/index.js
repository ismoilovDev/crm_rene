import { Route, Routes } from "react-router"
import ConfigList from "./list/List"

function Configurations() {
   return (
      <Routes>
         <Route path="/" element={<ConfigList />} />
      </Routes>
   )
}
export default Configurations