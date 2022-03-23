import AppRouter from './components/AppRouter';
import { check, fetchFriends } from './http/userAPI';
import { Context } from './index';
import React, { useContext, useEffect, useState } from 'react'
import {HashRouter} from 'react-router-dom'
import { getAllPrivate, getAllPublic } from './http/placemarkAPI';

function App() {
  const {user} = useContext(Context)
  const {map} = useContext(Context)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    
    getAllPublic().then(info => {
      map.placemarksPublic = info
    })
    
    check().then(data => {
      user.isAuth = true
      fetchFriends(data.id).then(info => {
        user.comrades = info.comrades
        user.addFriends = info.addFriends
        user.friends = info.friends
        user.id = data.id
        user.email = data.email
        user.name = data.name
        user.role = data.role
        user.avatar = data.avatar
      })
      getAllPrivate(data.id).then(info => {
        map.placemarks = info
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
