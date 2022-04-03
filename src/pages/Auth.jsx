import { Context } from './../index';
import { observer } from 'mobx-react-lite';
import React, { useContext, useEffect, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { LOGIN_ROUTE, MAIN_ROUTE, REGISTRATION_ROUTE } from './../utils/constants';
import { fetchFriends, login, registration } from './../http/userAPI';
import classes from './Auth.module.css'

const Auth = observer(() => {
  const {user} = useContext(Context)

  const navigate = useNavigate()
  const {pathname} = useLocation()

  let isLogin = pathname === LOGIN_ROUTE

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [name, setName] = useState('')
  const [emailDirty, setEmailDirty] = useState(false)
  const [passwordDirty, setPasswordDirty] = useState(false)
  const [nameDirty, setNameDirty] = useState(false)
  const [emailError, setEmailError] = useState('Email не может быть пустым!')
  const [passwordError, setPasswordError] = useState('Пароль не может быть пустым!')
  const [nameError, setNameError] = useState('Имя не может быть пустым!')

  const [formValid, setFormValid] = useState(false)

  useEffect(() => {
    if (!isLogin) {
      emailError || passwordError || nameError ? setFormValid(false) : setFormValid(true)
    } else {
      emailError || passwordError ? setFormValid(false) : setFormValid(true)
    }
  }, [emailError, passwordError, nameError, isLogin])

  const blurHandler = event => {
    switch (event.target.name) {
      case 'email':
        setEmailDirty(true)
        break
      case 'password':
        setPasswordDirty(true)
        break
      case 'name':
        setNameDirty(true)
        break
    }
  }

  const emailHandler = event => {
    setEmail(event.target.value)
    if (!String(event.target.value)
    .toLowerCase()
    .match(
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    )) {
      setEmailError('Некорректный email!')
      if (!event.target.value) {
        setEmailError('Email не может быть пустым!')
      }
    } else {
      setEmailError('')
    }
  }

  const passwordHandler = event => {
    setPassword(event.target.value)
    if (event.target.value.length > 32) {
      setPasswordError('Пароль должен быть короче 33 символов!')
    } else {
      setPasswordError('')
      if (!event.target.value) {
        setPasswordError('Пароль не может быть пустым!')
      }
    }
  }

  const nameHandler = event => {
    setName(event.target.value)
    if (event.target.value.length > 64) {
      setNameError('Имя должно быть короче 65 символов!')
    } else {
      setNameError('')
      if (!event.target.value) {
        setNameError('Имя не может быть пустым!')
      }
    }
  }

  const changeActive = event => {
    let inputs = document.querySelectorAll('input')
    Array.from(inputs).map(input => input.classList.contains('active') && input.classList.remove('active'))
    event.target.classList.add('active')
  }

  const toRegistration = () => {
    document.getElementById('animate_main_auth').classList.add(classes.animate_auth)
    setTimeout(() => document.getElementById('animate_main_auth').classList.remove(classes.animate_auth), 200)
    setFormValid(false)
  }

  const toLogin = () => {
    document.getElementById('animate_main_auth').classList.add(classes.animate_auth)
    setTimeout(() => document.getElementById('animate_main_auth').classList.remove(classes.animate_auth), 200)
  }

  const removeActiveInputs = event => {
    if (!event.target.classList.contains('active'))
      Array.from(document.querySelectorAll('input')).map(input => input.classList.remove('active'))
  }

  const click = async () => {
    try {

      let data

      if (isLogin) {

        data = await login(email, password)
        navigate(MAIN_ROUTE)

        user.id = data.id
        user.email = data.email
        user.name = data.name
        user.role = data.role
        user.avatar = data.avatar
        user.isAuth = true

        fetchFriends(data.id).then(info => {
          user.comrades = info.comrades
          user.addFriends = info.addFriends
          user.friends = info.friends
        })

      } else {

        data = await registration(null, email, name, password)

        console.log(data.message)

        navigate(LOGIN_ROUTE)

      }
      
    } catch (e) {
      alert(e.response.data.message)
    }
  }
  
  return (
    <div className='container' onClick={removeActiveInputs}>
      <div id={classes.header} className="header row">
        <button 
          className="dark"
          id={classes.back}
          onClick={() => navigate(MAIN_ROUTE)}
        >
          Назад
        </button>
        <button 
          className="dark"
          id={classes.support}
        >
          Поддержать автора
        </button>
      </div>

      <div id="animate_main_auth" className={classes.main + " main col"}>
        <div className={classes.inputs + " col"}>
          <div className='dark-gray-color' id={classes.title}>
            {pathname === '/login' ? 'Вход' : 'Регистрация'}
          </div>
          {(!isLogin && nameDirty && nameError) && <div className='valid_error'>{nameError}</div>}
          {!isLogin &&
            <input
              value = {name} 
              type="text"
              name = "name"
              className={classes.input_mb}
              placeholder='Введите имя...'
              maxLength={65}
              onBlur={blurHandler}
              onChange={nameHandler}
              onClick = {event => {
                changeActive(event)
              }}
            />
          }
          {(emailDirty && emailError) && <div className='valid_error'>{emailError}</div>}
          <input
            value={email} 
            type="text"
            name = "email"
            className={classes.input_mb}
            placeholder='Введите email...'
            maxLength={64}
            onBlur={blurHandler}
            onChange={emailHandler}
            onClick={event => {
              changeActive(event)
            }}
          />
          {(passwordDirty && passwordError) && <div className='valid_error'>{passwordError}</div>}
          <input
            value={password}
            type="password"
            name = "password"
            placeholder='Введите пароль...'
            maxLength={33}
            onBlur={blurHandler}
            onChange={passwordHandler}
            onClick={event => {
              changeActive(event)
            }}
          />
        </div>
        <div className="row light-gray-color" id={classes.log_reg}>
          {isLogin
          ? <div>
              Нет аккаунта?
              <Link 
                to={REGISTRATION_ROUTE} 
                className={classes.account} 
                onClick={toRegistration}
              >
                Зарегистрируйтесь!
              </Link>
            </div>
          : <div>
              Есть аккаунт?
              <Link 
                to={LOGIN_ROUTE} 
                className={classes.account} 
                onClick={toLogin}
                >
                  Войдите!
              </Link>
            </div>} 
        </div>
        <div className="row" id={classes.btn_wrapper}>
          <button 
            id={classes.log_reg_btn}
            className={!formValid ? 'light btn_light_disabled' : 'light'}
            onClick={() => {
              click()
            }}
            disabled={!formValid}
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