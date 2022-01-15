import React from 'react';

const RowAddFriends = ({name, ...props}) => {
  return (
    <div {...props}>
      <div className='row light-gray-background' style={{borderRadius: '.417rem', width: '100%'}}>
        <span style={{display: 'flex', alignItems: 'center', margin: '0 .6rem'}}>{name}</span>
        <button className='dark' style={{marginLeft: 'auto', fontSize: '1.2rem'}}>Отменить</button>
      </div>
    </div>
  );
};

export default RowAddFriends;