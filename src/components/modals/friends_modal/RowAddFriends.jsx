import React from 'react';
import classes from './RowsFriends.module.css'

const RowAddFriends = ({name, ...props}) => {
  return (
    <div {...props}>
      <div className={classes.wrapper + ' row light-gray-background'}>
        <span className={classes.user_name}>{name}</span>
        <button className={classes.btn + ' dark'}>Отменить</button>
      </div>
    </div>
  );
};

export default RowAddFriends;