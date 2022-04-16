import MyFileInput from './../components/UI/file_input/MyFileInput';
import MySelect from './../components/UI/select/MySelect';
import React, { useEffect, useState } from 'react';
import classes from './PlaceMark.module.css'
import { useContext } from 'react';
import { Context } from './../index.js';
import { useNavigate } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import { FILE_SPLITTER, MAIN_ROUTE } from './../utils/constants';
import { deleteOnePlacemark, getOnePrivate, putOnePlacemark } from './../http/placemarkAPI';
import RowSelectFriends from './../components/modals/add_placemark_modal/RowSelectFriends';
import { fetchOne } from './../http/userAPI';
import { observer } from 'mobx-react-lite';
import placemarkSelect from './../utils/placemarkSelectIcon'

let firstShortDescription = ''
let firstFullDescription = ''
let firstIcon = ''
let firstCoordinates = ''
let firstFiles = []
let firstSelectFriendsId = []

const PlaceMark = observer(() => {
  const params = useParams()

  const {user} = useContext(Context)

  const [icon, setIcon] = useState('')
  const [shortDescription, setShortDescription] = useState('')
  const [fullDescription, setFullDescription] = useState('')
  const [selectFriendsId, setSelectFriendsId] = useState([])
  const [files, setFiles] = useState([])
  const [shortActive, setShortActive] = useState(false)
  const [coordinates, setCoordinates] = useState('')
  const [longActive, setLongActive] = useState(false)
  const [friendName, setFriendName] = useState('друга')
  const [isLoading, setIsLoading] = useState(true)
  const [changeValid, setChangeValid] = useState(false)

  useEffect(() => {
    getOnePrivate(params.id).then(data => {
      setShortDescription(data.shortDescription)
      firstShortDescription = data.shortDescription

      setFullDescription(data.fullDescription)
      firstFullDescription = data.fullDescription

      setIcon(data.icon)
      firstIcon = data.icon

      setCoordinates(data.coordinates)
      firstCoordinates = data.coordinates

      JSON.parse(data.files).length && setFiles(JSON.parse(data.files))
      firstFiles = JSON.parse(data.files)

      setSelectFriendsId(data.selectFriends)
      firstSelectFriendsId = data.selectFriends

      params.type !== 'private' && fetchOne(data.userId).then(({name}) => {
        setFriendName(name)
      })

      setIsLoading(false)
    })
  }, [])

  useEffect(() => {
    if (shortDescription !== firstShortDescription 
    || fullDescription !== firstFullDescription 
    || selectFriendsId.join() !== firstSelectFriendsId.join()
    || icon !== firstIcon 
    || files.join() !== firstFiles.join() 
    || coordinates !== firstCoordinates && !isLoading) {
      setChangeValid(true)
    } else {
      setChangeValid(false)
    }
  }, [shortDescription, fullDescription, selectFriendsId, icon, files, coordinates])

  useEffect(() => {
    files.length > 50 ? setChangeValid(false) : setChangeValid(true)
    for (let file of files) {
      if (file.error) {
        setChangeValid(false)
        break
      }
    }
  }, [files])

  const navigate = useNavigate()

  const changePlacemark = () => {
    setChangeValid(false)

    firstShortDescription = shortDescription
    firstFullDescription = fullDescription
    firstIcon = icon
    firstCoordinates = coordinates
    firstFiles = files
    firstSelectFriendsId = selectFriendsId

    const formData = new FormData()
    let deleteFiles = []

    files.forEach(file => {
      file.name ? formData.append('files' , file) : deleteFiles.push(file)
    })
    formData.append('deleteFiles', JSON.stringify(deleteFiles))
    formData.append('coordinates', coordinates)
    formData.append('icon', icon)
    formData.append('shortDescription', shortDescription)
    formData.append('fullDescription', fullDescription)
    formData.append('userId', user.id)
    formData.append('selectFriendsId', JSON.stringify(selectFriendsId))
    formData.append('id', params.id)

    putOnePlacemark(formData).then(data => console.log(data.message))
  }

  const deletePlacemark = () => {
    deleteOnePlacemark(params.id).then(data => {
      console.log(data.message)
      navigate(MAIN_ROUTE)
    })
  }

  const removeActiveTextarea = event => {
    if (event.target.className !== 'active') {
      setShortActive(false)
      setLongActive(false)
      Array.from(document.querySelectorAll('textarea')).map(textArea => textArea.classList.remove('active'))
    }
  }
  
  return (!isLoading ?
    <div className="container" onClick={removeActiveTextarea}>
        <div className={classes.header + " header row"}>
          <button 
            className={classes.back + " dark"}
            onClick={() => navigate(MAIN_ROUTE)}
          >
            Назад
          </button>
          <div className={classes.rigth_info}>
            {params.type === 'private' ? 'Ваша метка' : `Метка ${friendName}`}
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
            <MySelect data={placemarkSelect} className={classes.select} active={icon || 'https://st2.depositphotos.com/2659027/5664/v/950/depositphotos_56640799-stock-illustration-map-pin-location-mark-icon.jpg'} setIcon={setIcon}/>
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
                  {fullDescription || 'У данной метки отсутствует полное описание...'}
                </button>
              }
            </div>
            {params.type === 'private' &&
              <div className={classes.counter + ` ${longActive ? "dark" : "light"}-gray-color`}>{fullDescription.length}/1023</div>
            }
            {params.type === 'private' &&
              <div className={classes.row_content + " row"}>
                <MyFileInput className={classes.file_input} setFiles={setFiles} files={files}/>
              </div>
            }
            {params.type !== 'private' &&
              <div className={classes.row_content}>
                  <div className={"light-gray-background border-radius-main box-shadow-gray row " + classes.files_for_friends}>
                  {files.length ? files.map(name => 
                    <a key={name} href={process.env.REACT_APP_API_URL + '/users-files/' + name} target="_blank">
                      <button className={"dark row " + classes.files_for_friends_btn}>
                        {name.split(FILE_SPLITTER)[1]}
                      </button>
                    </a>
                  ) : 'У данной метки отсутствуют прикреплённые файлы...'}
                  </div>
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
                  className={classes.change_placemark + ` dark${!changeValid ? ' btn_dark_disabled' : ''}`}
                  id="change_placemark"
                  disabled={!changeValid}
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
      </div> : null
  );
});

export default PlaceMark;