import addPlacemarks from './addPlacemarks'

function startYandexMap(ymaps, navigate, center, zoom, placemarks, placemarksPucblic) {
  
  // Инициализируем карту

  document.getElementById('map').innerHTML = ''
  
  let map = new ymaps.Map('map', {
    center,
    zoom
  }, {
    minZoom: 0.3,
    maxZoom: 24,
    avoidFractionalZoom: false
  })

  global.myMap = map

  map.controls.remove('geolocationControl') // удаляем геолокацию
  map.controls.remove('searchControl') // удаляем поиск
  map.controls.remove('trafficControl') // удаляем контроль трафика
  map.controls.remove('typeSelector') // удаляем тип
  map.controls.remove('fullscreenControl') // удаляем кнопку перехода в полноэкранный режим
  map.controls.remove('zoomControl') // удаляем контрол зуммирования
  map.controls.remove('rulerControl') // удаляем контрол правил
  map.controls.remove(['scrollZoom']) // отключаем скролл карты (опционально)

  map.controls.add('zoomControl', {
    size: 'small',
    float: 'left',
    position: {
      top: '160px',
      left: '10px'
    }
  })

  map.controls.add('typeSelector', {
    size: 'small',
    float: 'left',
    position: {
      top: '127px',
      left: '10px'
    }
  })
  
  addPlacemarks(ymaps, navigate, placemarks, placemarksPucblic)
}

export default startYandexMap