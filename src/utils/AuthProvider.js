import { useState } from "react"
import { AuthContext } from "../context/context"
 
const AuthProvider = ({ children }) => {
   const [token, setToken] = useState(window.localStorage.getItem('token'))

   return (
      <AuthContext.Provider value={{token, setToken}}>
         {children}
      </AuthContext.Provider>
   )
}

export default AuthProvider