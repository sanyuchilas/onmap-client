import App from './App';
import './styles/App.css'
import React, { createContext } from 'react';
import ReactDOM from 'react-dom';
import UserStore from './store/UserStore';
import { script } from './yandex_map/map';

document.cookie = "Set-Cookie: cross-site-cookie=whatever; SameSite=None; Secure"

export const Context = createContext(null)

script('https://api-maps.yandex.ru/2.1/?lang=ru_RU').then(() => startApp())

function startApp() {
  ReactDOM.render(
    <Context.Provider value={{
      user: new UserStore()
    }}>
      <App />
    </Context.Provider>,
    document.getElementById('root')
  );

  if ('ontouchstart' in window) {
    document.body.classList.add('touch')
  }

  const correct = () => {
    document.body.style.height = window.innerHeight + 'px'
    document.body.style.width = '100vw'
  }

  correct()

  window.addEventListener('resize', correct)
}