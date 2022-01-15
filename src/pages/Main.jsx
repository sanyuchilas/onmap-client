import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { LOGIN_ROUTE } from "utils/constants";
import Map from '../components/Map'
import horizontallScroll from "utils/horizontallScroll";
import classes from '../styles/pages_modules/Main.module.css'
import FriendsModal from "components/modals/friends_modal/FriendsModal";
import AlertModal from "components/modals/AlertModal";
import AddPlacemarkModal from "components/modals/add_placemark_modal/AddPlacemarkModal";
import placemark_preview from './../assets/img/placemark_preview.png'
import { Context } from "index";
import { observer } from "mobx-react-lite";

const Main = observer(() => {
  const [friendsVisible, setFriendsVisible] = useState(false)
  const [addPlacemarkVisible, setAddPlacemarkVisible] = useState(false)
  const [alertVisible, setAlertVisible] = useState(false)
  const [alertName, setAlertName] = useState('')

  const [firstClick, setFirstClick] = useState(false)

  const {user} = useContext(Context)

  let navigate = useNavigate()
  
  let placemarkPreview = () => {
    let addMarkPreview = document.getElementById(classes.add_mark_preview)
    if (firstClick) {
      return new Promise((res, rej) => {
        setFirstClick(false)
        addMarkPreview.style.display = 'none'
        res({coordinates: global.mapCenter})
      })
    } else {
      addMarkPreview.style.display = 'block'
      return new Promise((res, rej) => {
        if (document.body.classList.contains('touch')) {
          let touchListener = event => {
            if (event.target.id === classes.add_mark_preview) {
              addMarkPreview.style.display = 'none'
              setFirstClick(false)
              res({touchListener, coordinates: global.mapCenter})
            }
          }

          document.body.addEventListener('touchend', touchListener)

        } else {
          let clickListener = event => {
            if (event.target.id === classes.add_mark_preview) {
              addMarkPreview.style.display = 'none'
              setFirstClick(false)
              res({clickListener, coordinates: global.mapCenter})
            }
          }

          document.body.addEventListener('click', clickListener)

        }
      })
    }
  }

  return (
    <div className="container">
    
      {!user.isAuth && 
        <div className="header row">
          <span style={{marginBottom: '-0.4rem'}}>
            <span style={{marginRight: '0.4rem'}}>Войдите в аккаунт, чтобы оставить на карте свою частичку!</span>
            <button 
              className="dark"
              style={{marginLeft: '0.15rem'}}
              onClick={() => navigate(LOGIN_ROUTE)}
            >
              Войти
            </button>
          </span>
        </div>
      }

      <div className="main col">
        <div id={classes.options} 
          className="row" 
          onMouseOver={() => {
            if (!document.body.className)
              document.body.style.overflowY = 'hidden'
          }}
          onMouseOut={() => {
            document.body.style.overflowY = 'auto'
          }}
          onWheel={() => horizontallScroll('options')}
        >
          <button 
            id="sight" 
            className="light" 
            onClick={(event) => {
              event.target.classList.toggle('active')
            }}
          >
            Достопримечательности
          </button>
          <button 
            id="hotels" 
            className="light"
            style={{margin: '0 0.57rem', whiteSpace: 'nowrap'}} 
            onClick={(event) => {
              event.target.classList.toggle('active')
            }}
          >
            Гостиницы
          </button>
          <button 
            className="light"
            onClick = {() => {
              user.setIsAuth(false)
              localStorage.removeItem('token')
            }}
            style={{
              marginLeft: 'auto',
              display: user.isAuth ? 'block' : 'none'
          }}
          >
              Выйти
          </button>
        </div>
        <div id={classes.options_auth} className="row" onWheel={() => horizontallScroll('options_auth')}>
          <button 
            className="light"
            onClick={() => {
              if (user.isAuth) {
                setFriendsVisible(true)
              } else {
                setAlertName('Для доступа к друзьям необходимо войти в аккаунт')
                setAlertVisible(true)
              }
            }}
          >
            Друзья
          </button>
          <button 
            data-id="add_placemark"
            className="light" 
            style={{marginLeft: '.5rem'}}
            onClick={() => {
              if (user.isAuth) {
                setFirstClick(true)
                placemarkPreview().then((data) => {
                  console.log(data.coordinates)
                  document.body.removeEventListener('touchend', data.touchListener || data.clickListener)
                  setAddPlacemarkVisible(true)
                })
              } else {
                setAlertName('Для добавления метки необходимо войти в аккаунт')
                setAlertVisible(true)
              }
            }}
          >
            {window.innerWidth < 207 ? 'Метка' : 'Добавить метку'}
          </button>
        </div>
      </div>
      <img id={classes.add_mark_preview} src={placemark_preview}/>

      <Map/>
      <AlertModal show={alertVisible} onHide={() => setAlertVisible(false)} name={alertName}/>
      <FriendsModal show={friendsVisible} onHide={() => setFriendsVisible(false)}/>
      <AddPlacemarkModal show={addPlacemarkVisible} onHide={() => setAddPlacemarkVisible(false)}/>
    </div>
  );
});

export default Main;