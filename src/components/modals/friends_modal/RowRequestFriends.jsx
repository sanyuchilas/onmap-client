import React from 'react';

const RowRequestFriends = ({name, ...props}) => {
  return (
    <div {...props}>
      <div className='row light-gray-background' style={{borderRadius: '.417rem', width: '100%'}}>
        <span style={{display: 'flex', alignItems: 'center', margin: '0 .6rem'}}>{name}</span>
        <button className='dark' style={{marginLeft: 'auto', fontSize: '1.2rem'}}>Принять</button>
        <button className='dark' style={{marginLeft: '0rem', fontSize: '1.2rem'}}>Отклонить</button>
      </div>
    </div>
  );
};

export default RowRequestFriends;