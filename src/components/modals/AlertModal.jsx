import React from 'react';
import { Modal } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { LOGIN_ROUTE } from 'utils/constants';

const AlertModal = ({show, onHide, name}) => {
  const navigate = useNavigate()
  return (
    <Modal
      size='sm'
      show={show}
      onHide={onHide}
      centered
    >
      <div className="container">
        <div style={{padding: 0}} className="header row">
          <button 
            className="dark"
            style={{width: '100%', padding: '0.5rem', height: '75%'}}
            onClick={onHide}
          >
            Назад
          </button>
        </div>
        <div className='main'>
          <div 
            className='col light-gray-background' 
            style={{
              borderRadius: '.417rem',
              height: '100%',
              textAlign: 'center',
              padding: '.5rem',
              fontSize: '1.3rem'
            }}
          >
            {name}
            <button 
              className="dark"
              style={{width: '100%', padding: '0.5rem', height: '75%', margin: 0, marginTop: '.5rem'}}
              onClick={() => navigate(LOGIN_ROUTE)}
            >
              Войти
            </button>
          </div>
        </div>
      </div>
    </Modal>
  );
};

export default AlertModal;

//Для доступа к друзьям необходимо войти в аккаунт
//Для добавления метки необходимо войти в аккаунт