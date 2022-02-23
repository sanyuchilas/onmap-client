import React from 'react';
import {Modal} from 'react-bootstrap'
import classes from './FriendsModal.module.css'
import RowRequestFriends from './RowRequestFriends';
import RowYourFriends from './RowYourFriends';
import RowAddFriends from './RowAddFriends';

const FriendsModal = ({show, onHide}) => {
  return (
    <Modal
      show={show}
      onHide={onHide}
      centered
    >
      <div className="container" onClick={event => {
        if (event.target.className !== 'active')
          Array.from(document.querySelectorAll('input')).map(input => input.classList.remove('active'))
      }}>
        <div className={classes.header + " header row"}>
          <button className={classes.back + " dark"} onClick={onHide}>
            Назад
          </button>
          <span id={classes.user_id}>Ваш ID - 1</span>
        </div>
        <div className={classes.main + ' main col'}>
          <div className={classes.col + ' col'}>
            <div className={classes.row_subtitle + " row"}>Ваши друзья</div>
            <RowYourFriends className={classes.row_content + ' row'} name={'sanyuchilas'}/>
            <RowYourFriends className={classes.row_content + ' row'} name={'kolyanchik'}/>
          </div>
          <div className={classes.col + ' col'}>
            <div className={classes.row_subtitle + " row"}>Запросы в друзья</div>
            <RowRequestFriends className={classes.row_content + ' row'} name={'losharik'}/>
            <RowRequestFriends className={classes.row_content + ' row'} name={'krutoichelik'}/>
          </div>
          <div className={classes.col + ' col'}>
            <div className={classes.row_subtitle + " row"}>Добавить в друзья</div>
            <RowAddFriends className={classes.row_content + ' row'} name={'valera'}/>
            <div className={classes.row_input + " row"}>
              <input 
                type="text" 
                placeholder='ID друга...'
                id={classes.input}
                onClick={event => {
                  event.target.classList.add('active')}
                }
              />
              <button id={classes.add_friend} className='dark'>Добавить друга</button>
            </div>
          </div>
        </div>
      </div>
    </Modal>
  );
};

export default FriendsModal;