import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { LOGIN_ROUTE } from "./../utils/constants";
import Map from './../components/Map'
import horizontallScroll from "./../utils/horizontallScroll";
import classes from './Main.module.css'
import FriendsModal from "./../components/modals/friends_modal/FriendsModal";
import AlertModal from "./../components/modals/AlertModal";
import AddPlacemarkModal from "./../components/modals/add_placemark_modal/AddPlacemarkModal";
import placemark_preview from './../assets/img/placemark_preview.png'
import { Context } from "./../index";
import { observer } from "mobx-react-lite";

const Main = observer(() => {
  const [friendsVisible, setFriendsVisible] = useState(false)
  const [addPlacemarkVisible, setAddPlacemarkVisible] = useState(false)
  const [alertVisible, setAlertVisible] = useState(false)
  const [alertName, setAlertName] = useState('')

  const [firstClick, setFirstClick] = useState(false)

  const {user} = useContext(Context)
  const {map} = useContext(Context)

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
          document.body.onmousemove = event => {
            addMarkPreview.style.top = event.clientY - 4 + 'px'
            addMarkPreview.style.left = event.clientX + 'px'
          }
          let clickListener = event => {
            if (global.clickCoords) {
              addMarkPreview.style.display = 'none'
              setFirstClick(false)
              res({clickListener, coordinates: global.clickCoords})
            }
          }

          document.body.addEventListener('click', clickListener)

        }
      })
    }
  }

  let friendsClick = () => {
    if (user.isAuth) {
      setFriendsVisible(true)
    } else {
      setAlertName('Для доступа к друзьям необходимо войти в аккаунт')
      setAlertVisible(true)
    }
  }

  let addPlacemarkClick = () => {
    if (user.isAuth) {
      setFirstClick(true)
      placemarkPreview().then((data) => {
        document.body.removeEventListener('touchend', data.touchListener)
        document.body.removeEventListener('click', data.clickListener)
        setAddPlacemarkVisible(true)
      })
    } else {
      setAlertName('Для добавления метки необходимо войти в аккаунт')
      setAlertVisible(true)
    }
  }

  let setOptionActive = (event) => {
    event.target.classList.toggle('active')
  }

  let logoutClick = () => {
    user.isAuth = false
    map.placemarks = []
    map.placemarksFriends = []
    global.mapCenter = global.myMap.getCenter()
    global.mapZoom = global.myMap.getZoom()
    localStorage.removeItem('token')
  }

  let logoutStyle = {display: user.isAuth ? 'block' : 'none'}

  return (
    <div className="container">
    
      {!user.isAuth && 
        <div className="header row">
          <span className={classes.span_1}>
            <span className={classes.span_2}>Войдите в аккаунт, чтобы оставить на карте свою частичку!</span>
            <button 
              className={classes.login_button + " dark"}
              onClick={() => navigate(LOGIN_ROUTE)}
            >
              Войти
            </button>
          </span>
        </div>
      }

      <div className="main col">
        <div className={classes.row}>
          <div id={classes.options} 
            className="row" 
            onMouseOver={() => {
              if (!document.body.className)
                document.body.style.overflowY = 'hidden'
            }}
            onMouseOut={() => {
              document.body.style.overflowY = 'auto'
            }}
            onWheel={() => horizontallScroll(classes.options)}
          >
            <button 
              id="sight" 
              className={classes.select_type + " light"} 
              onClick={setOptionActive}
            >
              Достопримечательности
            </button>
            <button 
              id="hotels" 
              className={"light"}
              onClick={setOptionActive}
            >
              Гостиницы
            </button>
          </div>
          <button 
              className="light"
              id={classes.logout_btn}
              onClick = {logoutClick}
              style={logoutStyle}
            >
                Выйти
          </button>
        </div>
        <div id={classes.options_auth} className="row" onWheel={() => horizontallScroll(classes.options_auth)}>
          <button 
            className="light"
            onClick={friendsClick}
          >
            Друзья
          </button>
          <button 
            data-id="add_placemark"
            className="light"
            id={classes.add_placemark}
            onClick={addPlacemarkClick}
          >
            Добавить метку
          </button>
        </div>
      </div>

      <img data-id="add_placemark_preview" id={classes.add_mark_preview} src={placemark_preview}/>
      
      <div data-id="preview_modal" className={classes.preview_modal}></div>

      <Map/>
      <AlertModal show={alertVisible} onHide={() => setAlertVisible(false)} name={alertName}/>
      <FriendsModal show={friendsVisible} onHide={() => setFriendsVisible(false)}/>
      <AddPlacemarkModal show={addPlacemarkVisible} onHide={() => setAddPlacemarkVisible(false)}/>
    </div>
  );
});

export default Main;