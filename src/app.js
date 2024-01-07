import { useCallback, useContext, useEffect, useState } from 'react';
import { AuthContext } from './context/context';
import { login, logout } from './services/auth';
import Login from './pages/Login/Login';
import Main from './pages/Main/Layout';

const loginTime = window.localStorage.getItem('loginTime')

function App() {
  const { token, setToken } = useContext(AuthContext)
  const [isActiveLoader, setIsActiveLoader] = useState(false)

  const handleLogin = async (data) => {
    try {
      setIsActiveLoader(true)
      await login(data, setToken);
    } catch (error) {
      console.log(error)
    } finally {
      setIsActiveLoader(false)
    }
  };

  const handleLogout = useCallback(async () => {
    await logout(setToken);
  }, [setToken]);

  useEffect(() => {
    const currentTime = new Date().getTime();
    const timeDiff = currentTime - loginTime;
    const oneDay = 24 * 60 * 60 * 1000;
    if (timeDiff > oneDay) {
      handleLogout();
    }
  }, [handleLogout]);

  return token ?
    <Main logOutHendle={handleLogout} /> :
    <Login
      setToken={setToken}
      onLogin={handleLogin}
      isActiveLoader={isActiveLoader}
    />
}

export default App;