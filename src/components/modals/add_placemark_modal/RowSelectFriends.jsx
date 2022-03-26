import React from 'react';
import classes from './RowSelectFriends.module.css'

const RowSelectFriends = ({id, name, setSelectFriendsId, selectFriendsId, ...props}) => {
  return (
    <div {...props}>
      <button 
        className={classes.row + ' light'}
        onClick={event => {
          event.target.classList.toggle('active')
          selectFriendsId.indexOf(id) === -1 && setSelectFriendsId([id].concat(selectFriendsId))
        }}
      >
        {name}
      </button>
    </div>
  );
};

export default RowSelectFriends;