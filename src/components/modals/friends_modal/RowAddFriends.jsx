import React, { useContext } from 'react';
import { observer } from 'mobx-react-lite';
import { Context } from './../../../index';
import classes from './RowsFriends.module.css'
import { putFriends } from './../../../http/userAPI';

const RowAddFriends = observer(({name, id, ...props}) => {

  const {user} = useContext(Context)

  const cancel = () => {

    user.addFriends = user.addFriends.filter(friend => friend.id !== id)

    putFriends({id: user.id, name: user.name}, {id, name}, 'cancel').then(data => console.log(data.message))
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