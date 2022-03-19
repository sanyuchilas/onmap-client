import AppRouter from './components/AppRouter';
import { check, fetchComradesAndAddFriends } from './http/userAPI';
import { Context } from './index';
import React, { useContext, useEffect, useState } from 'react'
import {HashRouter} from 'react-router-dom'

function App() {
  const {user} = useContext(Context)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    check().then(data => {
      user.setIsAuth(true)
      fetchComradesAndAddFriends(data.id).then(info => {
        data.comradeId = info.comradeId
        data.addFriends = info.friendId
        data.friends = JSON.parse(data.friends)
        user.setUser(data)
      })
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
