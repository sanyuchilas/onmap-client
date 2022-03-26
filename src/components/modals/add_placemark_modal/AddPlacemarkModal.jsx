import MyFileInput from './../../UI/file_input/MyFileInput';
import MySelect from './../../UI/select/MySelect';
import React, { useState } from 'react';
import { Modal } from 'react-bootstrap';
import selectArrow from './../../../assets/img/selectArrow.svg'
import classes from './AddPlacemarkModal.module.css'
import RowSelectFriends from './RowSelectFriends';
import { observer } from 'mobx-react-lite';
import { useContext } from 'react';
import { Context } from './../../../index.js';
import { createOne } from './../../../http/placemarkAPI';
import {addPlacemarks} from './../../../yandex_map/addPlacemarks'
import { useNavigate } from 'react-router-dom';

const AddPlacemarkModal = observer(({show, onHide}) => {

  const {user} = useContext(Context)

  const [icon, setIcon] = useState(null)
  const [shortDescription, setShortDescription] = useState('')
  const [fullDescription, setFullDescription] = useState('')
  const [files, setFiles] = useState('')
  const [selectFriendsId, setSelectFriendsId] = useState([])

  const navigate = useNavigate()

  const addPlacemark = async () => {
    
    onHide()

    let placemark = await createOne(global.clickCoords || global.mapCenter, icon, shortDescription, fullDescription, files, user.id, selectFriendsId)
    
    addPlacemarks(global.ymaps, navigate, [placemark])

    global.mapCenter = global.myMap.getCenter()
    global.mapZoom = global.myMap.getZoom()
    
    setIcon(null)
    setSelectFriendsId([])
  }

  let placmemrakSelect = {
    img: selectArrow, 
    childs: [
      {
        content: <img src="https://img.icons8.com/ios-glyphs/344/nfc-round-tag.png" alt="" />,
        id: 2
      },
      {
        content: <img src="https://img.icons8.com/ios/2x/sound-recording-copyright.png" alt="" />,
        id: 3
      },
      {
        content: <img src="https://img.icons8.com/ios-filled/2x/nfc-square-tag.png" alt="" />,
        id: 4
      },
    ], 
    title: 'Выберите иконку метки'
  }
  
  return (
    <Modal
      show={show}
      onHide={onHide}
      centered
    >
      <div className="container" onClick={event => {
        if (event.target.className !== 'active')
          Array.from(document.querySelectorAll('textarea')).map(textArea => textArea.classList.remove('active'))
      }}>
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
            <MySelect data={placmemrakSelect} className={classes.select} setIcon={setIcon}/>
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
                maxLength={75} 
                placeholder='Краткое описание...'
                value={shortDescription}
                onChange={event => setShortDescription(event.target.value)}
                onClick={event => {
                  event.target.classList.add('active')
                  document.getElementById('long_area').classList.remove('active')
                }}
              ></textarea>
            </div>
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
                placeholder='Полное описание...'
                value={fullDescription}
                onChange={event => setFullDescription(event.target.value)}
                onClick={event => {
                  event.target.classList.add('active')
                  document.getElementById('short_area').classList.remove('active')
                }}
              ></textarea>
            </div>
            <div className={classes.row_content + " row"}>
              <MyFileInput className={classes.file_input}/>
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
              className={classes.add_placemark + ' dark'}
              id="add_placemark" 
              onClick={addPlacemark}
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