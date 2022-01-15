import React from 'react';
import classes from './MySelect.module.css'
import ReactDOMServer from 'react-dom/server'

const MySelect = ({data, ...props}) => {
  return (
    <div {...props}>
      <button 
        id = {classes.select_button}
        className={"row dark"}
        style={{height: 'auto', alignItems: 'center', margin: '0 0 .5rem 0', width: '100%', padding: '.5rem'}}
        onClick={() => {
          document.getElementsByClassName(classes.childs)[0].classList.toggle(classes.open)
        }}
      >
        <span style={{textAlign: 'left', marginRight: '.5rem'}}>{data.title}</span>
        <span className={classes.selected_child}></span>
        <img src={data.img} style={{marginRight: '.5rem'}}/>
      </button>
      <div className={classes.childs + ' col'}>
        {data.childs.map(child => 
          <span 
            key={child.id} 
            className={classes.child + ' light'}
            onClick={() => {
              document.getElementsByClassName(classes.selected_child)[0].innerHTML = ReactDOMServer.renderToString(child.content)
              document.querySelector('#' + classes.select_button).classList.add(classes.active)
              document.getElementsByClassName(classes.childs)[0].classList.remove(classes.open)
            }}
          >{child.content}</span>
        )}
      </div>
    </div>
  );
};

export default MySelect;