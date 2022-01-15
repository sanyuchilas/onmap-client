import React from 'react';

const RowYourFriends = ({name, ...props}) => {
  return (
    <div {...props}>
      <div className='row light-gray-background' style={{borderRadius: '.417rem', width: '100%'}}>
        <span style={{display: 'flex', alignItems: 'center', margin: '0 .6rem'}}>{name}</span>
        <button className='dark' style={{marginLeft: 'auto', fontSize: '1.2rem'}}>Удалить</button>
      </div>
      <button 
        className='light' 
        style={{whiteSpace: 'nowrap', marginLeft: '.5rem', height: '3rem'}}
        onClick={evetn => evetn.target.classList.toggle('active')}
      >
        Метки
      </button>
    </div>
  );
};

export default RowYourFriends;