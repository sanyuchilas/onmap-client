import React from 'react';
import classes from './RowSelectFriends.module.css'

const RowSelectFriends = ({name, ...props}) => {
  return (
    <div {...props}>
      <button 
        className={classes.row + ' light'}
        onClick={event => event.target.classList.toggle('active')}
      >
        {name}
      </button>
    </div>
  );
};

export default RowSelectFriends;