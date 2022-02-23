import React from 'react';
import { Modal } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { LOGIN_ROUTE } from './../../utils/constants';
import classes from "./AlertModal.module.css"

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
        <div className={classes.header + " header row"}>
          <button className={classes.back + " dark"} onClick={onHide}>
            Назад
          </button>
        </div>
        <div className='main'>
          <div id={classes.info} className='col light-gray-background'>
            {name}
            <button className={classes.login_btn + " dark"} onClick={() => navigate(LOGIN_ROUTE)}
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