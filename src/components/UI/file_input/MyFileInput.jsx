import React, { useEffect, useState } from 'react';
import classes from './MyFileInput.module.css'
import crossImg from './../../../assets/img/cross.svg'
import { FILE_SPLITTER } from './../../../utils/constants';

const MyFileInput = ({setFiles, files, ...props}) => {
  
  let valid = false
  files.map(file => {
    if (file.name && file.name.length > 50) {
      file.error = true
      if (!valid) valid = true
    }
  })

  return (
    <div {...props}>
      <input type="file" id={classes.input_file} multiple onChange={() => {
        const newFiles = document.getElementById(classes.input_file).files
        setFiles([...files, ...newFiles])
      }}/>
      <label htmlFor={classes.input_file} style={{width: '100%'}}>
        <span id='file_button' className={classes.file_button} style={files.length ?{background: '#fff', borderColor: '#fff', color: '#d8c8c8'} : null}>
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
      
      {valid || files.length > 50 ? <div className={'valid_error ' + classes.error}>{files.length > 50 ?  'Нельзя прикрепить больше 50 файлов. Чтобы прикрепить больше, заархивируйте файлы и прикрепите их в виде архива!' : 'Количество символов в имени файла не  может превышать 50!'}</div> : null} 

      <div id={classes.add_files} style={{display: files.length ? 'flex' : 'none'}} className='col'>
        {files.map((file, index) =>
          <div 
            key={index}
            className={classes.one_add_file + `${file.error ? ' ' + classes.one_add_file_error : ''}`}
          >
            <span style={{marginRight: '1rem'}}>
              {!file.name
              ?
                <a href={process.env.REACT_APP_API_URL + '/users-files/' + file} className={classes.file_href} target="_blank">{index + 1}. {file.split(FILE_SPLITTER)[1]}</a>
              :
                `${index + 1}. ${file.name}`
              }
            </span>
            <span className={classes.delete_file}>
              <img 
                src={crossImg}
                className={classes.cross_img} 
                onClick={() => {
                  setFiles(files.filter((element, i) => i !== index))
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