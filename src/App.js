import AppRouter from './components/AppRouter';
import { check } from './http/userAPI';
import { Context } from './index';
import React, { useContext, useEffect, useState } from 'react'
import {HashRouter} from 'react-router-dom'

function App() {
  const {user} = useContext(Context)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    check().then(data => {
      user.setIsAuth(true)
    }).finally(() => setLoading(false))
  }, [])

  if (loading) {
    return null
  }

  return (
    <HashRouter>
      <AppRouter/>
    </HashRouter>
  );
}

export default App;
