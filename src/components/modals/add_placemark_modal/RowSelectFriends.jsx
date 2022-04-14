import React from 'react';
import classes from './RowSelectFriends.module.css'

const RowSelectFriends = ({id, name, setSelectFriendsId, selectFriendsId, ...props}) => {
  return (
    <div {...props}>
      <button 
        className={classes.row + ` light ${selectFriendsId.indexOf(id) !== -1 && 'active'}`}
        onClick={event => {
          event.target.classList.toggle('active')
          selectFriendsId.indexOf(id) === -1 ? setSelectFriendsId([id].concat(selectFriendsId)) : setSelectFriendsId(selectFriendsId.filter(friendId => friendId !== id)) 
          console.log(selectFriendsId)
        }}
      >
        {name}
      </button>
    </div>
  );
};

export default RowSelectFriends;