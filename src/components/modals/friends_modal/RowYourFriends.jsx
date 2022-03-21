import { putFriends } from './../../../http/userAPI';
import React, { useContext } from 'react';
import classes from './RowsFriends.module.css'
import { observer } from 'mobx-react-lite';
import { Context } from './../../../index';

const RowYourFriends = observer(({name, id, ...props}) => {

  const {user} = useContext(Context)

  const remove = () => {
    let friends = {}

    user.friends = user.friends.filter(friend => friend.id !== id)

    friends.friends = user.friends
    friends.newFriendId = id

    putFriends({id: user.id, name: user.name}, friends, 'delete').then(data => {
      console.log(data.message)
    })

    if (user.id === id) alert('Перестать быть своим другом - тоже очень важный шаг в жизни!')
  }

  return (
    <div {...props}>
      <div className={classes.wrapper + ' row light-gray-background'}>
        <span className={classes.user_name}>{name}</span>
        <button
          className={classes.btn + ' dark'}
          onClick={remove}
        >Удалить</button>
      </div>
      <button 
        className={classes.placemarks + ' light'} 
        onClick={event => event.target.classList.toggle('active')}
      >
        Метки
      </button>
    </div>
  );
});

export default RowYourFriends;