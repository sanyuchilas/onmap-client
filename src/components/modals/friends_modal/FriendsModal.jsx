import React, { useEffect, useState } from 'react';
import {Modal} from 'react-bootstrap'
import classes from './FriendsModal.module.css'
import RowRequestFriends from './RowRequestFriends';
import RowYourFriends from './RowYourFriends';
import RowAddFriends from './RowAddFriends';
import { observer } from 'mobx-react-lite';
import { useContext } from 'react';
import { Context } from './../../../index.js';
import { fetchOne, putFriends } from './../../../http/userAPI';

const FriendsModal = observer(({show, onHide}) => {
  const {user} = useContext(Context)

  let friends = user.friends || []
  let comrades = user.comrades || []
  let addFriends = user.addFriends || []

  const addFriend = async () => {
    try {
      let friendId = Number(newFriendId)

      if (user.friends.find(friend => friend.id === friendId)) {
        throw 'Данный пользователь уже ваш друг!'
      }

      if (user.id === friendId) {
        throw 'Даже не пытайтесь...'
      }
      
      const {name} = await fetchOne(friendId)

      user.addFriends = [{id: friendId, name}].concat(user.addFriends)

      putFriends({id: user.id, name: user.name}, {id: friendId, name}, 'addFriend').then(data => console.log(data.message))
      setNewFriendId('')
      
    } catch(e) {
      setNewFriendId('')
      !e.response ? alert(e) : alert(e.response.data.message)
    }
  }

  const [newFriendId, setNewFriendId] = useState('')

  const [addDirty, setAddDirty] = useState(false)
  const [addError, setAddError] = useState('ID должен быть числом!')
  const [addValid, setAddValid] = useState(false)

  const addHandler = event => {
    setNewFriendId(event.target.value)
    if (event.target.value > 2147483647) {
      setAddError('Слишком большой ID!')
    } else {
      setAddError('')
      if (!event.target.value || !Number(event.target.value)) {
        setAddError('ID должен быть числом!')
      }
    }
  }

  const blurHandler = event => {
    setAddDirty(true)
  }

  useEffect(() => {
    addError ? setAddValid(false) : setAddValid(true)
  }, [addError])

  const close = () => {
    !newFriendId && setAddDirty(false)
    onHide()
  }

  return (
    <Modal
      show={show}
      onHide={close}
      centered
    >
      <div className="container" onClick={event => {
        if (event.target.className !== 'active')
          Array.from(document.querySelectorAll('input')).map(input => input.classList.remove('active'))
      }}>
        <div className={classes.header + " header row"}>
          <button className={classes.back + " dark"} onClick={close}>
            Назад
          </button>
          <span id={classes.user_id}>Ваш ID - {user.id}</span>
        </div>
        <div className={classes.main + ' main col'}>
          <div className={classes.col + ' col'}>
            <div className={classes.row_subtitle + " row"}>Ваши друзья</div>
            {friends.map(({id, name}) => 
              <RowYourFriends key={id} id={id} className={classes.row_content + ' row'} name={name}/>
            )}
          </div>
          <div className={classes.col + ' col'}>
            <div className={classes.row_subtitle + " row"}>Запросы в друзья</div>
            {comrades.map(({id, name}) => 
              <RowRequestFriends key={id} id={id} className={classes.row_content + ' row'} name={name}/>
            )}
          </div>
          <div className={classes.col + ' col'}>
            <div className={classes.row_subtitle + " row"}>Добавить в друзья</div>
            {addFriends.map(({id, name}) => 
              <RowAddFriends key={id} id={id} className={classes.row_content + ' row'} name={name}/>
            )}
            {(addDirty && addError) && <div className={classes.error + ' valid_error'}>{addError}</div>}
            <div className={classes.row_input + " row"}>
              <input 
                type="text" 
                placeholder='ID друга...'
                id={classes.input}
                value={newFriendId}
                onChange={addHandler}
                onBlur={blurHandler}
                maxLength={11}
                onClick={event => {
                  event.target.classList.add('active')}
                }
              />
              <button 
                id={classes.add_friend} 
                className={!addValid ? 'btn_dark_disabled' : 'dark'}
                onClick={addFriend}
                disabled={!addValid}
              >Добавить друга</button>
            </div>
          </div>
        </div>
      </div>
    </Modal>
  );
});

export default FriendsModal;