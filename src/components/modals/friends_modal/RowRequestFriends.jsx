import React, { useContext } from 'react';
import { Context } from './../../../index';
import classes from './RowsFriends.module.css'
import { putFriends } from './../../../http/userAPI';

const RowRequestFriends = ({name, id, ...props}) => {
  const {user} = useContext(Context)

  const accept = () => {
    let friends = {}
            
    user.friends = [id].concat(user.friends)

    friends.comrades = user.comrades.filter(friendId => friendId !== id)
    friends.friends = user.friends
    friends.newFriendId = id

    user.comrades = friends.comrades

    putFriends(user.id, friends, 'accept').then(data => {
      console.log(data.message)
    })
  }

  const decline = () => {
    let friends = {}

    user.comrades = user.comrades.filter(friendId => friendId !== id)

    friends.comrades = user.comrades
    friends.newFriendId = id

    putFriends(user.id, friends, 'decline').then(data => {
      console.log(data.message)
    })
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
};

export default RowRequestFriends;