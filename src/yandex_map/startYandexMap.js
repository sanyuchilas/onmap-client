import addPlacemarks from './addPlacemarks'

function startYandexMap(ymaps, center, zoom) {
  
  
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


  //Слушатели клика для добавления метки

  let addPlacmeMarkBtn = document.querySelector('button[data-id="add_placemark"]')
  let placemarkIconPreview = document.querySelector('img[data-id="add_placemark_preview"]')

  placemarkIconPreview.addEventListener('touchend', () => {
    global.mapZoom = map.getZoom()
    global.mapCenter = map.getCenter()
  })

  addPlacmeMarkBtn.addEventListener('click', () => {
    global.clickCoords = false
    map.setCenter(map.getCenter())
    global.mapZoom = map.getZoom()
    global.mapCenter = map.getCenter()
    let clickCoords = event => {
      global.clickCoords = event.get('coords')
      map.events.remove('click', clickCoords)
    }
    map.events.add('click', clickCoords)
  })
}

export default startYandexMap