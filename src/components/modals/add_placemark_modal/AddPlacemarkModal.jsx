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

const AddPlacemarkModal = observer(({show, onHide}) => {
  const {user} = useContext(Context)
  const {map} = useContext(Context)
  const [icon, setIcon] = useState(null)
  const [short_description, setShrot_description] = useState('')
  const [full_description, setFull_description] = useState('')
  const [files, setFiles] = useState('')

  const addPlacemark = async () => {
    let placemark = await createOne(global.clickCoords || global.mapCenter, icon, short_description, full_description, files, user.id)
    
    map.placemarks = [placemark].concat(map.placemarks)
    console.log(placemark)
    global.mapCenter = global.myMap.getCenter()
    global.mapZoom = global.myMap.getZoom()

    onHide()
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
                (появляется после клика на метке)
              </span>
            </div>
            <div className={classes.row_content + " row"}>
              <textarea
                id='short_area' 
                maxLength={75} 
                placeholder='Краткое описание...'
                value={short_description}
                onChange={event => setShrot_description(event.target.value)}
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
                (появляется после двойного клика на метке)
              </span>
            </div>
            <div className={classes.row_content + " row"}>
              <textarea
                id='long_area'
                placeholder='Полное описание...'
                value={full_description}
                onChange={event => setFull_description(event.target.value)}
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
            {user.friends.map(friend => <RowSelectFriends key={friend.id} className={classes.row_content + ' row'} name={friend.name}/>)}
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