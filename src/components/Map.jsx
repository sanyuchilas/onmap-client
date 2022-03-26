import { observer } from 'mobx-react-lite';
import React, { useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {addPlacemarks, addPlacemarksFriends, addPlacemarksPublic} from './../yandex_map/addPlacemarks';
import startYandexMap from '../yandex_map/startYandexMap'
import { Context } from './../index'
import { getAllPrivate, getAllPublic, getFriendsPlacemarks } from './../http/placemarkAPI';

const Map = observer(() => {
  const navigate = useNavigate()
  const {user} = useContext(Context)
  const ymaps = global.ymaps

  useEffect(() => {
    ymaps.ready(() => startYandexMap(ymaps, global.mapCenter || [55.42449385862713,38.00976220345276], global.mapZoom || 4))

    getAllPublic().then(info => {
      ymaps.ready(() => setTimeout(() => addPlacemarksPublic(ymaps, navigate, info), 10))
    })

  }, [])

  if (user.isAuth) {
    getAllPrivate(user.id).then(info => {
      ymaps.ready(() => setTimeout(() => addPlacemarks(ymaps, navigate, info), 10))
    })

    getFriendsPlacemarks(user.id).then(info => {
      ymaps.ready(() => setTimeout(() => addPlacemarksFriends(ymaps, navigate, info), 10))
    })
  }

  return (
    <div id="map" className="map">Загрузка карты...</div>
  );
});

export default Map;