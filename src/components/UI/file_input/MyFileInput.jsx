import React, { useState } from 'react';
import classes from './MyFileInput.module.css'
import crossImg from './../../../assets/img/cross.svg'

const MyFileInput = (props) => {
  const [someFiles, setSomeFiles] = useState([])
  return (
    <div {...props}>
      <input type="file" id={classes.input_file} multiple onChange={() => {
        const newFiles = document.getElementById(classes.input_file).files
        setSomeFiles([...someFiles, ...newFiles])
      }}/>
      <label htmlFor={classes.input_file} style={{width: '100%'}}>
        <span id='file_button' className={classes.file_button} style={someFiles.length ?{background: '#fff', borderColor: '#fff', color: '#d8c8c8'} : null}>
          <span>Файлы</span>
          <span
            className='tr-white-color'
            style={{
              textAlign: 'center',
              fontSize: '1.1rem',
            }}
          >
            (прикрепите любые файлы)
          </span>
        </span>
      </label>
      <div id={classes.add_files} style={{display: someFiles.length ? 'flex' : 'none'}} className={'col'}>
        {someFiles.map((file, index) => 
          <div 
            key={index}
            className={classes.one_add_file}
          >
            <span style={{marginRight: '1rem'}}>
              {index + 1}. {file.name}
            </span>
            <span className={classes.delete_file}>
              <img 
                src={crossImg}
                className={classes.cross_img} 
                onClick={() => {
                  setSomeFiles(someFiles.filter((element, i) => i !== index))
                }}
                alt="" />
            </span>
          </div>
        )}
      </div>
    </div>
  );
};

export default MyFileInput;