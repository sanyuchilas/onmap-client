import { observer } from 'mobx-react-lite';
import React, { useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import addPlacemarks from './../yandex_map/addPlacemarks';
import startYandexMap from '../yandex_map/startYandexMap'
import { Context } from './../index'

const Map = observer(() => {
  const navigate = useNavigate()
  const {map} = useContext(Context)
  const ymaps = global.ymaps

  //Подключаем яндекс API
  let placemarks = map.placemarks
  let placemarksPublic = [{
    id: 1,
    coordinates: [51.17885736098834,-1.8261605410343302]
  }]
  
  // useEffect(() => {
    ymaps.ready(() => startYandexMap(ymaps, navigate, global.mapCenter || [55.42449385862713,38.00976220345276], global.mapZoom || 4, placemarks, placemarksPublic))
  // }, [])

  // if (global.myMap) {
  //   console.log('rerender')
  //   addPlacemarks(ymaps, navigate, placemarks, placemarksPublic)
  // }

  return (
    <div id="map" className="map">Загрузка карты...</div>
  );
});

export default Map;