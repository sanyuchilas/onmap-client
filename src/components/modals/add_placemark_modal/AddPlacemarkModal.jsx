import MyFileInput from './../../UI/file_input/MyFileInput';
import MySelect from './../../UI/select/MySelect';
import React from 'react';
import { Modal } from 'react-bootstrap';
import selectArrow from './../../../assets/img/selectArrow.svg'
import classes from './AddPlacemarkModal.module.css'
import RowSelectFriends from './RowSelectFriends';

const AddPlacemarkModal = ({show, onHide}) => {
  let placmemrakSelect = {
    img: selectArrow, 
    childs: [
      {
        content: <img src="https://image.flaticon.com/icons/png/512/8/8168.png" alt="" />,
        id: 1
      },
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
            <MySelect data={placmemrakSelect} className={classes.select}/>
          </div>

          <div className={classes.col + " col"}>
            <div className={classes.row_subtitle + " col"}>
              <span>Кртакое описание</span>
              <span className={classes.sub_subtitle + ' tr-white-color'}>
                (появляется после клика на метке)
              </span>
            </div>
            <div className={classes.row_content + " row"}>
              <textarea
                id='short_area' 
                maxLength={75} 
                placeholder='Краткое описание...'
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
            <RowSelectFriends className={classes.row_content + ' row'} name={'sanyuchilas'}/>
            <RowSelectFriends className={classes.row_content + ' row'} name={'kolyanchik'}/>
          </div>

          <div className={classes.col + " col"} id={classes.col_end}>
            <button 
              className={classes.add_placemark + ' dark'}
              id="add_placemark" 
              onClick={onHide}
            >
              Добавить метку
            </button>
          </div>

        </div>
      </div>
    </Modal>
  );
};

export default AddPlacemarkModal;