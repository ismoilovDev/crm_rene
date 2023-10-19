import { useEffect, useState } from 'react';
import Main from './pages/Main/Layout';
import Login from './pages/Login/Login';
import https from './services/https';

function App() {
  const [name, setName] = useState(window.localStorage.getItem('name'))
  const [token, setToken] = useState(window.localStorage.getItem('token'))
  const [photo, setPhoto] = useState(window.localStorage.getItem('photo'))
  const [role, setRole] = useState(JSON.parse(window.localStorage.getItem('role')))
  const [loginTime, setLoginTime] = useState(window.localStorage.getItem('loginTime'))

  async function logOut() {
    await https
      .post('/logout')
      .then(_ => {
        clearStorage()
      })
      .catch(err => {
        console.log(err);
      })
  }

  function clearStorage() {
    window.localStorage.clear()
    setToken(undefined)
    setRole(undefined)
  }

  useEffect(() => {
    const currentTime = new Date().getTime();
    const timeDiff = currentTime - loginTime;
    const oneDay = 24 * 60 * 60 * 1000;
    if (timeDiff > oneDay) {
      logOut();
    }
  }, []);

  return (
    (token && role) ?
      <Main
        token={token}
        role={role}
        name={name}
        photo={photo}
        logOutHendle={clearStorage}
      />
      :
      <Login
        token={token}
        setToken={setToken}
        setRole={setRole}
        setName={setName}
        setPhoto={setPhoto}
        setLoginTime={setLoginTime}
      />
  )
}

export default App;