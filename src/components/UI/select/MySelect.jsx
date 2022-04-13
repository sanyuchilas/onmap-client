import React from 'react';
import classes from './MySelect.module.css'
import ReactDOMServer from 'react-dom/server'

const MySelect = ({data, setIcon, active, ...props}) => {

  if (active) {
    
  }

  return (
    <div {...props}>
      <button 
        id = {classes.select_button}
        className={active ? classes.active + " row dark" : "row dark"}
        onClick={() => {
          document.getElementsByClassName(classes.childs)[0].classList.toggle(classes.open)
        }}
      >
        <span className={classes.title}>{data.title}</span>
        <span className={classes.selected_child}>
          {active && <img src={active} alt="" />}
        </span>
        <img src={data.img} className={classes.select_arrow}/>
      </button>
      <div className={classes.childs + ' col'}>
        {data.childs.map(child => 
          <span 
            key={child.id} 
            className={classes.child + ' light'}
            onClick={() => {
              document.getElementsByClassName(classes.selected_child)[0].innerHTML = ReactDOMServer.renderToString(child.content)
              setIcon(child.content.props.src)
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