import { observer } from 'mobx-react-lite';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import {startYandexMap} from '../yandex_map/map'

const Map = observer(() => {
  const navigate = useNavigate()

  //Подключаем яндекс API

  startYandexMap(navigate, global.mapCenter || [55.42449385862713,38.00976220345276], global.mapZoom || 4)

  return (
    <div id="map" className="map">Загрузка карты...</div>
  );
});

export default Map;