import MyFileInput from './../../UI/file_input/MyFileInput';
import MySelect from './../../UI/select/MySelect';
import React, { useEffect, useState } from 'react';
import { Modal } from 'react-bootstrap';
import classes from './AddPlacemarkModal.module.css'
import RowSelectFriends from './RowSelectFriends';
import { observer } from 'mobx-react-lite';
import { useContext } from 'react';
import { Context } from './../../../index.js';
import { createOne } from './../../../http/placemarkAPI';
import {addPlacemarks} from './../../../yandex_map/addPlacemarks'
import { useNavigate } from 'react-router-dom';
import placemarkSelect from './../../../utils/placemarkSelectIcon'

const AddPlacemarkModal = observer(({show, onHide}) => {
  
  const {user} = useContext(Context)

  const [icon, setIcon] = useState('')
  const [shortDescription, setShortDescription] = useState('')
  const [fullDescription, setFullDescription] = useState('')
  const [files, setFiles] = useState([])
  const [selectFriendsId, setSelectFriendsId] = useState([])
  const [shortActive, setShortActive] = useState(false)
  const [longActive, setLongActive] = useState(false)
  const [addValid, setAddValid] = useState(true)

  const navigate = useNavigate()

  const addPlacemark = async () => {
    const formData = new FormData()
    
    files.forEach(file => {
      formData.append('files' , file)
    })
    formData.append('coordinates', JSON.stringify(global.clickCoords || global.mapCenter))
    formData.append('icon', icon)
    formData.append('shortDescription', shortDescription)
    formData.append('fullDescription', fullDescription)
    formData.append('userId', user.id)
    formData.append('selectFriendsId', JSON.stringify(selectFriendsId))

    onHide()

    let placemark = await createOne(formData)
    
    addPlacemarks(global.ymaps, navigate, [placemark])

    global.mapCenter = global.myMap.getCenter()
    global.mapZoom = global.myMap.getZoom()
    
    setIcon(null)
    setSelectFriendsId([])
  }

  const removeActiveTextarea = event => {
    if (event.target.className !== 'active') {
      setShortActive(false)
      setLongActive(false)
      Array.from(document.querySelectorAll('textarea')).map(textArea => textArea.classList.remove('active'))
    }
  }

  useEffect(() => {
    files.length > 50 ? setAddValid(false) :  setAddValid(true)
    for (let file of files) {
      if (file.error) {
        setAddValid(false)
        break
      }
    }
  }, [files])

  return (
    <Modal
      show={show}
      onHide={onHide}
      centered
    >
      <div className="container" onClick={removeActiveTextarea}>
        <div className={classes.header + " header row"}>
          <button 
            className={classes.back + " dark"}
            onClick={onHide}
          >
            Назад
          </button>
        </div>

        <div className={classes.main + " main col"}>

          <div className={classes.col + " col"}>
            <MySelect data={placemarkSelect} className={classes.select} active='' setIcon={setIcon}/>
          </div>

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
          
          <div className={classes.col + " col"}>
            <div className={classes.row_subtitle + " col"}>
              <span>Полное описание</span>
              <span className={classes.sub_subtitle + ' tr-white-color'}>
                (доступно при просмотре метки)
              </span>
            </div>
            <div className={classes.row_content + " row"}>
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
            </div>
            <div className={classes.counter + ` ${longActive ? "dark" : "light"}-gray-color`}>{fullDescription.length}/1023</div>
            <div className={classes.row_content + " row"}>
              <MyFileInput className={classes.file_input} setFiles={setFiles} files={files}/>
            </div>
          </div>

          <div className={classes.col + " col"}>
            <div className={classes.row_subtitle + " row"}>
              Выберите друзей, которые смогут видеть вашу метку
            </div>
            {user.friends.map(friend => <RowSelectFriends key={friend.id} className={classes.row_content + ' row'} id={friend.id} name={friend.name} setSelectFriendsId={setSelectFriendsId} selectFriendsId={selectFriendsId}/>)}
          </div>

          <div className={classes.col + " col"} id={classes.col_end}>
            <button 
              className={classes.add_placemark + ` dark${!addValid ? ' btn_dark_disabled' : ''}`}
              id="add_placemark" 
              onClick={addPlacemark}
              disabled={!addValid}
            >
              Добавить метку
            </button>
          </div>

        </div>
      </div>
    </Modal>
  );
});

export default AddPlacemarkModal;