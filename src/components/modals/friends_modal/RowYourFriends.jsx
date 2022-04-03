import { putFriends } from './../../../http/userAPI';
import React, { useContext } from 'react';
import classes from './RowsFriends.module.css'
import { observer } from 'mobx-react-lite';
import { Context } from './../../../index';
import removePalcemarks from './../../../yandex_map/removePlacemarks';

const RowYourFriends = observer(({name, id, ...props}) => {

  const {user} = useContext(Context)

  const remove = () => {

    user.friends = user.friends.filter(friend => friend.id !== id)

    putFriends({id: user.id, name: user.name}, {id, name}, 'delete').then(data => {
      console.log(data.message)
      removePalcemarks(data.idArr, global.placemarksFriendsCollection, global.myMap)
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