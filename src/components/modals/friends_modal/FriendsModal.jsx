import React, { useState } from 'react';
import {Modal} from 'react-bootstrap'
import classes from './FriendsModal.module.css'
import RowRequestFriends from './RowRequestFriends';
import RowYourFriends from './RowYourFriends';
import RowAddFriends from './RowAddFriends';
import { observer } from 'mobx-react-lite';
import { useContext } from 'react';
import { Context } from './../../../index.js';
import { putFriends } from './../../../http/userAPI';

const FriendsModal = observer(({show, onHide}) => {
  const {user} = useContext(Context)

  let friends = user.friends || []
  let comrades = user.comrades || []
  let addFriends = user.addFriends || []

  let [newFriendId, setNewFriendId] = useState('')

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
          <span id={classes.user_id}>Ваш ID - {user.id}</span>
        </div>
        <div className={classes.main + ' main col'}>
          <div className={classes.col + ' col'}>
            <div className={classes.row_subtitle + " row"}>Ваши друзья</div>
            {friends.map((id) => 
              <RowYourFriends key={id} id={id} className={classes.row_content + ' row'} name={id}/>
            )}
          </div>
          <div className={classes.col + ' col'}>
            <div className={classes.row_subtitle + " row"}>Запросы в друзья</div>
            {comrades.map((id) => 
              <RowRequestFriends key={id} id={id} className={classes.row_content + ' row'} name={id}/>
            )}
          </div>
          <div className={classes.col + ' col'}>
            <div className={classes.row_subtitle + " row"}>Добавить в друзья</div>
            {addFriends.map((id) => 
              <RowAddFriends key={id} id={id} className={classes.row_content + ' row'} name={id}/>
            )}
            <div className={classes.row_input + " row"}>
              <input 
                type="text" 
                placeholder='ID друга...'
                id={classes.input}
                value={newFriendId}
                onChange={event => {
                  setNewFriendId(event.target.value)
                }}
                onClick={event => {
                  event.target.classList.add('active')}
                }
              />
              <button 
                id={classes.add_friend} 
                className='dark'
                onClick={() => {
                  let friends = {}
                  let friendId = Number(newFriendId)
                  user.addFriends = [friendId].concat(user.addFriends)
                  friends.friends = user.addFriends
                  friends.newFriendId = friendId
                  putFriends(user.id, friends, 'addFriend').then(data => console.log(data.message))
                  setNewFriendId('')
                }}
              >Добавить друга</button>
            </div>
          </div>
        </div>
      </div>
    </Modal>
  );
});

export default FriendsModal;