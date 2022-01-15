import React from 'react';

const RowSelectFriends = ({name, ...props}) => {
  return (
    <div {...props}>
      <button 
        className='light'
        onClick={event => event.target.classList.toggle('active')}
        style={{
          width: '100%',
          padding: '.5rem',
          height:  'auto',
          fontSize: '1.2rem'
        }}
      >
        {name}
      </button>
    </div>
  );
};

export default RowSelectFriends;