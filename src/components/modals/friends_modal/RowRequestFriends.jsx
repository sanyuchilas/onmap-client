import React from 'react';
import classes from './RowsFriends.module.css'

const RowRequestFriends = ({name, ...props}) => {
  return (
    <div {...props}>
      <div className={classes.wrapper + ' row light-gray-background'}>
        <span className={classes.user_name}>{name}</span>
        <button className={classes.btn + ' dark'}>Принять</button>
        <button className={classes.btn_2 + ' dark'}>Отклонить</button>
      </div>
    </div>
  );
};

export default RowRequestFriends;