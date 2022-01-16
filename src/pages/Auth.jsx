import { Context } from './../index';
import { observer } from 'mobx-react-lite';
import React, { useContext, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { LOGIN_ROUTE, MAIN_ROUTE, REGISTRATION_ROUTE } from './../utils/constants';
import { login, registration } from './../http/userAPI';
import classes from './../styles/pages_modules/Auth.module.css'

const Auth = observer(() => {
  const {user} = useContext(Context)

  const navigate = useNavigate()
  const {pathname} = useLocation()

  const [email, setEmail] = useState('')
  const [name, setName] = useState('')
  const [password, setPassword] = useState('')

  let isLogin = pathname === LOGIN_ROUTE

  const changeActive = event => {
    let inputs = document.querySelectorAll('input')
    Array.from(inputs).map(input => input.classList.contains('active') && input.classList.remove('active'))
    event.target.classList.add('active')
  }

  const click = async () => {
    try {
      let data
      if (isLogin) {
        data = await login(email, password)
        console.log(data)
        navigate(MAIN_ROUTE)
      } else {
        data = await registration(null, email, name, password)
        navigate(LOGIN_ROUTE)
      }
      user.setUser(data)
      user.setIsAuth(true)
    } catch (e) {
      alert(e.response.data.message)
    }
  }
  
  return (
    <div className='container' onClick={event => {
      if (event.target.className !== 'active')
        Array.from(document.querySelectorAll('input')).map(input => input.classList.remove('active'))
    }}>
      <div style={{padding: 0}} className="header row">
        <button 
          className="dark"
          style={{width: '100%', maxWidth: '10rem', padding: '0.5rem', height: '75%'}}
          onClick={() => navigate(MAIN_ROUTE)}
        >
          Назад
        </button>
        <button 
          className="dark"
          style={{width: '100%', 
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  padding: '0.5rem',
                  maxWidth: '18rem', 
                  height: '75%',
                  marginLeft: 'auto'
          }}
        >
          Поддержать автора
        </button>
      </div>

      <div id="animate_main_auth" className={classes.main + " main col"}>
        <div className="col" style={{width: '100%'}}>
          <div 
            className='dark-gray-color'
            style={{
              fontSize: '2rem'
            }}
          >
            {pathname === '/login' ? 'Вход' : 'Регистрация'}
          </div>
          {!isLogin && 
            <input
              value = {name} 
              type="text"
              style={{
                marginBottom: '.3rem'
              }} 
              placeholder='Введите имя...'
              onChange={event => setName(event.target.value)}
              onClick = {event => {
                changeActive(event)
              }}
            />
          }
          <input
            value={email} 
            type="text" 
            placeholder='Введите email...'
            onChange={event => setEmail(event.target.value)}
            onClick={event => {
              changeActive(event)
            }}
          />
          <input
            value={password}
            type="password" 
            placeholder='Введите пароль...'
            style={{
              marginTop: '0.3rem'
            }}
            onChange={event => setPassword(event.target.value)}
            onClick={event => {
              changeActive(event)
            }}
          />
        </div>
        <div
          className="row light-gray-color"
          style={{
            width: '90%',
            maxWidth: '30rem',
            justifyContent: 'left',
            fontSize: '1.2rem',
          }}
        >
          {isLogin
          ? <div>
              Нет аккаунта?
              <Link 
                to={REGISTRATION_ROUTE} 
                style={{marginLeft: '0.2rem'}} 
                onClick={() => {
                  document.getElementById('animate_main_auth').classList.add(classes.animate_auth)
                  setTimeout(() => document.getElementById('animate_main_auth').classList.remove(classes.animate_auth), 200)
                }}
              >
                Зарегистрируйтесь!
              </Link>
            </div>
          : <div>
              Есть аккаунт?
              <Link 
                to={LOGIN_ROUTE} 
                style={{marginLeft: '0.2rem'}} 
                onClick={() => {
                  document.getElementById('animate_main_auth').classList.add(classes.animate_auth)
                  setTimeout(() => document.getElementById('animate_main_auth').classList.remove(classes.animate_auth), 200)
                }}
                >
                  Войдите!
              </Link>
            </div>} 
        </div>
        <div
          className="row"
          style={{
            width: '90%',
            maxWidth: '30rem',
            justifyContent: 'left',
            marginTop: '.6rem'
          }}
        >
          <button 
            className='light'
            onClick={() => {
              click()
            }}
            style={{
              width: '100%',
              padding: '.47rem',
              height: '100%',
              fontSize: '1.4rem'
            }}
          >
            {isLogin
            ? 'Войти'
            : 'Зарегистрироваться'
            }
          </button>
        </div>
          
      </div>

    </div>
  );
});

export default Auth;