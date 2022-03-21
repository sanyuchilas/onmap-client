import React, { useContext } from 'react';
import { Context } from './../../../index';
import classes from './RowsFriends.module.css'
import { putFriends } from './../../../http/userAPI';
import { observer } from 'mobx-react-lite';

const RowRequestFriends = observer(({name, id, ...props}) => {
  const {user} = useContext(Context)

  const accept = () => {
    let friends = {}
            
    user.friends = [{id, name}].concat(user.friends)

    friends.comrades = user.comrades.filter(friend => friend.id !== id)
    friends.friends = user.friends
    friends.newFriendId = id

    user.comrades = friends.comrades

    putFriends({id: user.id, name: user.name}, friends, 'accept').then(data => {
      console.log(data.message)
    })

    if (user.id === id) alert('Сам свой запрос не примешь - никто не примет!')
  }

  const decline = () => {
    let friends = {}

    user.comrades = user.comrades.filter(friend => friend.id !== id)

    friends.comrades = user.comrades
    friends.newFriendId = id

    putFriends({id: user.id, name: user.name}, friends, 'decline').then(data => {
      console.log(data.message)
    })

    if (user.id === id) alert('Сам свой запрос не отклонишь - никто не отклонит!')
  }

  return (
    <div {...props}>
      <div className={classes.wrapper + ' row light-gray-background'}>
        <span className={classes.user_name}>{name}</span>
        <button 
          className={classes.btn + ' dark'}
          onClick={accept}
        >Принять</button>
        <button 
          className={classes.btn_2 + ' dark'}
          onClick={decline}
        >Отклонить</button>
      </div>
    </div>
  );
});

export default RowRequestFriends;