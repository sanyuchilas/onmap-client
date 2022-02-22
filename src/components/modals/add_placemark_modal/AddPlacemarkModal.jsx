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
          {/* <button 
            className="dark"
            onClick={() => {
              document.getElementById('add_placemark').classList.add(`${classes.animate}`)
              setTimeout(() => {document.getElementById('add_placemark') && document.getElementById('add_placemark').classList.remove(`${classes.animate}`)}, 5000)
            }}
            style={{
              width: '100%', 
              // display: 'none',
              alignItems: 'center',
              justifyContent: 'center',
              padding: '0.5rem',
              maxWidth: '17rem', 
              height: '75%',
            }}
          >
            <a href='#add_placemark' className='white-color'>Добавить метку</a>
          </button> */}
        </div>

        <div className={classes.main + " main col"}>

          <div className={classes.col + " col"}>
            <MySelect data={placmemrakSelect} style={{width: '100%', display: 'flex', flexDirection: 'column'}}/>
          </div>

          <div className={classes.col + " col"}>
            <div className={classes.row_subtitle + " col"} style={{paddingBottom: '.8rem'}}>
              <span>Кртакое описание</span>
              <span className='tr-white-color' style={{fontSize: '1.1rem', textAlign: 'center'}}>
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
            <div className={classes.row_subtitle + " col"} style={{paddingBottom: '.8rem'}}>
              <span>Полное описание</span>
              <span className='tr-white-color' style={{fontSize: '1.1rem', textAlign: 'center'}}>
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
            <div className={classes.row_content + " row"} style={{height: 'auto'}}>
              <MyFileInput style={{width: '100%'}}/>
            </div>
          </div>

          <div className={classes.col + " col"}>
            <div className={classes.row_subtitle + " row"} style={{textAlign: 'center'}}>
              Выберите друзей, которые смогут видеть вашу метку
            </div>
            <RowSelectFriends className={classes.row_content + ' row'} name={'sanyuchilas'}/>
            <RowSelectFriends className={classes.row_content + ' row'} name={'kolyanchik'}/>
          </div>

          <div className={classes.col + " col"} style={{justifyContent: 'flex-end',
          flexGrow: 0}}>
            <button 
              className='dark' 
              id="add_placemark" 
              style={{margin: '0', padding: '.5rem', height: 'auto', width: '100%', marginBottom: '.15rem'}}
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