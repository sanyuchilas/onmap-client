import React, { useContext } from 'react';
import { Context } from './../../../index';
import classes from './RowsFriends.module.css'
import { putFriends } from './../../../http/userAPI';
import { observer } from 'mobx-react-lite';

const RowRequestFriends = observer(({name, id, ...props}) => {
  const {user} = useContext(Context)

  const accept = () => {
            
    user.friends = [{id, name}].concat(user.friends)
    user.comrades = user.comrades.filter(friend => friend.id !== id)

    putFriends({id: user.id, name: user.name}, {id, name}, 'accept').then(data => {
      console.log(data.message)
    })
  }

  const decline = () => {

    user.comrades = user.comrades.filter(friend => friend.id !== id)

    putFriends({id: user.id, name: user.name}, {id, name}, 'decline').then(data => {
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
});

export default RowRequestFriends;