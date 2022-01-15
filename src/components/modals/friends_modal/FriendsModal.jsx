import MyFooter from 'components/MyFooter';
import React from 'react';
import {Modal} from 'react-bootstrap'
import classes from './FriendsModal.module.css'
import RowRequestFriends from 'components/modals/friends_modal/RowRequestFriends';
import RowYourFriends from 'components/modals/friends_modal/RowYourFriends';
import RowAddFriends from 'components/modals/friends_modal/RowAddFriends';

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
        <div style={{padding: 0}} className="header row">
          <button 
            className="dark"
            style={{width: '100%', maxWidth: '10rem', padding: '0.5rem', height: '75%', marginRight: 'auto'}}
            onClick={onHide}
          >
            Назад
          </button>
          <span style={{padding: '0 1.3rem', whiteSpace: 'nowrap'}}>Ваш ID - 1</span>
        </div>
        <div className='main' style={{display: 'flex', flexDirection: 'column'}}>
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
            <div className="row" style={{alignItems: 'center', marginBottom: '.3rem', width: '100%'}}>
              <input 
                type="text" 
                placeholder='Введите ID...'
                style={{margin: 0, height: '3rem'}}
                onClick={event => {
                  event.target.classList.add('active')}
                }
              />
              <button 
                className='dark' 
                style={{height: '3rem', whiteSpace: 'nowrap', margin: '0 auto 0 .5rem', fontSize: '1.3rem'}}
              >Добавить друга</button>
            </div>
          </div>
        </div>
      </div>
    </Modal>
  );
};

export default FriendsModal;