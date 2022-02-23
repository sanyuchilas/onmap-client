import React from 'react';
import classes from './RowsFriends.module.css'

const RowYourFriends = ({name, ...props}) => {
  return (
    <div {...props}>
      <div className={classes.wrapper + ' row light-gray-background'}>
        <span className={classes.user_name}>{name}</span>
        <button className={classes.btn + ' dark'}>Удалить</button>
      </div>
      <button 
        className={classes.placemarks + ' light'} 
        onClick={evetn => evetn.target.classList.toggle('active')}
      >
        Метки
      </button>
    </div>
  );
};

export default RowYourFriends;