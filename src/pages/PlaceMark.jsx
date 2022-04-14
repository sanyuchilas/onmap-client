import MyFileInput from './../components/UI/file_input/MyFileInput';
import MySelect from './../components/UI/select/MySelect';
import React, { useEffect, useState } from 'react';
import selectArrow from './../assets/img/selectArrow.svg'
import classes from './PlaceMark.module.css'
import { useContext } from 'react';
import { Context } from './../index.js';
import { useNavigate } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import { MAIN_ROUTE } from './../utils/constants';
import { deleteOnePlacemark, getOnePrivate, putOnePlacemark } from './../http/placemarkAPI';
import RowSelectFriends from './../components/modals/add_placemark_modal/RowSelectFriends';
import { fetchOne } from './../http/userAPI';

const PlaceMark = () => {
  const params = useParams()

  const {user} = useContext(Context)

  const [icon, setIcon] = useState(null)
  const [shortDescription, setShortDescription] = useState('')
  const [fullDescription, setFullDescription] = useState('')
  const [selectFriendsId, setSelectFriendsId] = useState([])
  const [files, setFiles] = useState('')
  const [coordinates, setCoordinates] = useState('')
  const [shortActive, setShortActive] = useState(false)
  const [longActive, setLongActive] = useState(false)
  const [friendsName, setFriendsName] = useState('друга')

  useEffect(() => {
    getOnePrivate(params.id).then(data => {
      setShortDescription(data.shortDescription)
      setFullDescription(data.fullDescription)
      setIcon(data.icon)
      setSelectFriendsId(data.selectFriends)
      setCoordinates(data.coordinates)
      params.type !== 'private' && fetchOne(data.userId).then(({name}) => {
        setFriendsName(name)
      })
    })
  }, [])

  const navigate = useNavigate()

  const changePlacemark = async () => {
    putOnePlacemark(params.id, coordinates, icon, shortDescription, fullDescription, files, user.id, selectFriendsId).then(data => console.log(data.message))
  }

  const deletePlacemark = () => {
    deleteOnePlacemark(params.id).then(data => {
      console.log(data.message)
      navigate(MAIN_ROUTE)
    })
  }

  let placmemrakSelect = {
    img: selectArrow, 
    childs: [
      {
        content: <img src="https://img.icons8.com/ios-glyphs/344/nfc-round-tag.png" alt="" />,
        id: 1
      },
      {
        content: <img src="https://img.icons8.com/ios/2x/sound-recording-copyright.png" alt="" />,
        id: 2
      },
      {
        content: <img src="https://img.icons8.com/ios-filled/2x/nfc-square-tag.png" alt="" />,
        id: 3
      },
    ], 
    title: 'Выберите иконку метки'
  }

  const removeActiveTextarea = event => {
    if (event.target.className !== 'active') {
      setShortActive(false)
      setLongActive(false)
      Array.from(document.querySelectorAll('textarea')).map(textArea => textArea.classList.remove('active'))
    }
  }
  
  return (
    <div className="container" onClick={removeActiveTextarea}>
        <div className={classes.header + " header row"}>
          <button 
            className={classes.back + " dark"}
            onClick={() => navigate(MAIN_ROUTE)}
          >
            Назад
          </button>
          <div className={classes.rigth_info}>
            {params.type === 'private' ? 'Ваша метка' : `Метка ${friendsName}`}
          </div>
        </div>

        <div className={classes.main + " main col"}>
          {/* {params.type === 'private' &&
            <div className={classes.row_content}>
              <button className={'dark ' + classes.change_btn}>Измените координаты метки</button>
            </div>
          } */}

          {params.type === 'private' &&
            <div className={classes.col + " col"}>
            <MySelect data={placmemrakSelect} className={classes.select} active={icon || 'https://st2.depositphotos.com/2659027/5664/v/950/depositphotos_56640799-stock-illustration-map-pin-location-mark-icon.jpg'} setIcon={setIcon}/>
          </div>
          }

          {params.type === 'private' &&
            <div className={classes.col + " col"}>
              <div className={classes.row_subtitle + " col"}>
                <span>Краткое описание</span>
                <span className={classes.sub_subtitle + ' tr-white-color'}>
                  (появляется при предпросмотре метки)
                </span>
              </div>
              <div className={classes.row_content + " row"}>
                <textarea
                  id='short_area' 
                  maxLength={255} 
                  placeholder='Краткое описание...'
                  value={shortDescription}
                  onChange={event => setShortDescription(event.target.value)}
                  onClick={event => {
                    setShortActive(true)
                    setLongActive(false)
                    event.target.classList.add('active')
                    document.getElementById('long_area').classList.remove('active')
                  }}
                ></textarea>
              </div>
              <div className={classes.counter + ` ${shortActive ? "dark" : "light"}-gray-color`}>{shortDescription.length}/255</div>
            </div>
          }
          
          <div className={classes.col + " col"}>
            {params.type === 'private' &&
              <div className={classes.row_subtitle + " col"}>
                <span>Полное описание</span>
                <span className={classes.sub_subtitle + ' tr-white-color'}>
                  (доступно при просмотре метки)
                </span>
              </div>
            }
            <div className={classes.row_content + " row"}>
              {params.type === 'private' &&
                <textarea
                  id='long_area'
                  maxLength={1023} 
                  placeholder='Полное описание...'
                  value={fullDescription}
                  onChange={event => setFullDescription(event.target.value)}
                  onClick={event => {
                    setLongActive(true)
                    setShortActive(false)
                    event.target.classList.add('active')
                    document.getElementById('short_area').classList.remove('active')
                  }}
                ></textarea>
              }
              {params.type !== 'private' &&  
                <button className={'light ' + classes.friend_full_description}>
                  {fullDescription}
                </button>
              }
            </div>
            {params.type === 'private' &&
              <div className={classes.counter + ` ${longActive ? "dark" : "light"}-gray-color`}>{fullDescription.length}/1023</div>
            }
            {params.type === 'private' &&
              <div className={classes.row_content + " row"}>
                <MyFileInput className={classes.file_input}/>
              </div>
            }
          </div>
          
          {params.type === 'private' &&
            <div className={classes.col + " col"}>
              <div className={classes.row_subtitle + " row"}>
                Выберите друзей, которые смогут видеть вашу метку
              </div>
              {user.friends.map(friend => <RowSelectFriends key={friend.id} className={classes.row_content + ' row'} id={friend.id} name={friend.name} setSelectFriendsId={setSelectFriendsId} selectFriendsId={selectFriendsId}/>)}
            </div>
          }

          {params.type === 'private' && 
            <div className={classes.col + " col"} id={classes.col_end}>
              <div className={classes.row_content + " row"}>
                <button 
                  className={classes.change_placemark + ' dark'}
                  id="change_placemark" 
                  onClick={changePlacemark}
                >
                  Применить изменения
                </button>
                <button 
                  className={classes.remove_placemark + ' dark'}
                  id="remove_placemark" 
                  onClick={deletePlacemark}
                >
                  Удалить метку
                </button>
              </div>
            </div>
          }

        </div>
      </div>
  );
};

export default PlaceMark;