import React, { useContext } from 'react';
import { observer } from 'mobx-react-lite';
import { Context } from './../../../index';
import classes from './RowsFriends.module.css'
import { putFriends } from './../../../http/userAPI';

const RowAddFriends = observer(({name, id, ...props}) => {

  const {user} = useContext(Context)

  const cancel = () => {
    let friends = {}

    user.addFriends = user.addFriends.filter(friendId => friendId !== id)

    friends.addFriends = user.addFriends
    friends.newFriendId = id

    putFriends(user.id, friends, 'cancel').then(data => console.log(data.message))
  }

  return (
    <div {...props}>
      <div className={classes.wrapper + ' row light-gray-background'}>
        <span className={classes.user_name}>{name}</span>
        <button 
          className={classes.btn + ' dark'}
          onClick={cancel}
        >Отменить</button>
      </div>
    </div>
  );
});

export default RowAddFriends;