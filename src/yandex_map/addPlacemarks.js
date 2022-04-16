import createChipsLayout from './createChipsLayout'
import { PLACEMARK_ROUTE } from "./../utils/constants";
import { getOnePrivate, getOnePublic } from './../http/placemarkAPI';



function addPlacemarks(ymaps, navigate, placemarks) {
  let placemarksCollection = global.placemarksCollection

  const map = global.myMap

  let previewModal = document.querySelector('div[data-id="preview_modal"]')

  let calculateSize = (zoom) => {
    return Math.min(Math.pow(zoom, 2) * 1.3 + 5.05, 50)
  }

  let mouseMove = event => {
    previewModal.style.left = event.clientX + 'px'
    previewModal.style.top = event.clientY + 'px'
  }

  let mouseDown = event => {
    document.body.addEventListener('mousemove', mouseMove)
  }

  placemarks.forEach(data => {

    let placemark = new ymaps.Placemark(JSON.parse(data.coordinates), {}, {
      iconLayout: createChipsLayout(calculateSize, ymaps, data.icon)
    })

    placemark.events.add('click', event => {
      global.mapZoom = map.getZoom()
      global.mapCenter = map.getCenter()
      navigate(PLACEMARK_ROUTE + '/private' + '/' + data.id)
    }).add('mouseenter', async () => {
      const {shortDescription} = await getOnePrivate(data.id)
      previewModal.firstChild.innerHTML = 'Ваша метка'
      previewModal.lastChild.innerHTML = shortDescription || 'У данной метки отсутствует краткое описание...'
    }).add('mouseleave', () => {

      previewModal.style.display = 'none'
      document.body.removeEventListener('mousemove', mouseMove)
      placemark.events.remove('mousedown')

      previewModal.firstChild.innerHTML = ''
      previewModal.lastChild.innerHTML = ''

    }).add('mousemove', event => {
      
      let cursor = event.originalEvent.domEvent.originalEvent

      previewModal.style.left = cursor.clientX + 'px'
      previewModal.style.top = cursor.clientY + 'px'
      if (!document.body.classList.contains('touch'))
        previewModal.style.display = 'block'

      placemark.events.add('mousedown', mouseDown)

    })

    placemarksCollection.add(placemark)
  })

  map.geoObjects.remove(placemarksCollection)
  map.geoObjects.add(placemarksCollection)
}



function addPlacemarksPublic(ymaps, navigate, placemarks) {
  const map = global.myMap

  let previewModal = document.querySelector('div[data-id="preview_modal"]')

  let calculateSizePublic = (zoom) => {
    return Math.min(Math.pow(zoom, 2) * 0.7 + 0.95, 50)
  }

  let mouseMove = event => {
    previewModal.style.left = event.clientX + 'px'
    previewModal.style.top = event.clientY + 'px'
  }

  let mouseDown = event => {
    document.body.addEventListener('mousemove', mouseMove)
  } 

  placemarks.forEach(data => {

    let placemark = new ymaps.Placemark(JSON.parse(data.coordinates), {}, {
      iconLayout: createChipsLayout(calculateSizePublic, ymaps, data.icon)
    })
    placemark.events.add('click', event => {
      // navigate(PLACEMARK_ROUTE + '/' + data.id)
      global.mapZoom = map.getZoom()
      global.mapCenter = map.getCenter()
      window.open(data.model, '_blank')
    }).add('mouseenter', async () => {

      const {title, shortDescription} = await getOnePublic(data.id)
      previewModal.firstChild.innerHTML = title
      previewModal.lastChild.innerHTML = shortDescription || 'У данной метки отсутствует краткое описание...'

    }).add('mouseleave', () => {

      previewModal.style.display = 'none'
      document.body.removeEventListener('mousemove', mouseMove)
      placemark.events.remove('mousedown')

      previewModal.firstChild.innerHTML = ''
      previewModal.lastChild.innerHTML = ''

    }).add('mousemove', event => {
      
      let cursor = event.originalEvent.domEvent.originalEvent

      previewModal.style.left = cursor.clientX + 'px'
      previewModal.style.top = cursor.clientY + 'px'
      if (!document.body.classList.contains('touch'))
        previewModal.style.display = 'block'

      placemark.events.add('mousedown', mouseDown)

    })

    map.geoObjects.add(placemark)
  })
}



function addPlacemarksFriends(ymaps, navigate, placemarks) {
  let placemarksFriendsCollection = global.placemarksFriendsCollection

  const map = global.myMap

  let previewModal = document.querySelector('div[data-id="preview_modal"]')

  let calculateSizeFriends = (zoom) => {
    return Math.min(Math.pow(zoom, 2) + 3.27, 50)
  }

  let mouseMove = event => {
    previewModal.style.left = event.clientX + 'px'
    previewModal.style.top = event.clientY + 'px'
  }

  let mouseDown = event => {
    document.body.addEventListener('mousemove', mouseMove)
  }

  placemarks.forEach(data => {
  
    let placemark = new ymaps.Placemark(JSON.parse(data.coordinates), {id: data.id}, {
      iconLayout: createChipsLayout(calculateSizeFriends, ymaps, data.icon),
    })
  
    placemark.events.add('click', event => {
      global.mapZoom = map.getZoom()
      global.mapCenter = map.getCenter()
      navigate(PLACEMARK_ROUTE + '/friend' + '/' + data.id)
    }).add('mouseenter', async event => {
      const {shortDescription} = await getOnePrivate(data.id)
      previewModal.firstChild.innerHTML = 'Метка ' + data.friendName
      previewModal.lastChild.innerHTML = shortDescription || 'У данной метки отсутствует краткое описание...'

    }).add('mouseleave', () => {

      previewModal.style.display = 'none'
      document.body.removeEventListener('mousemove', mouseMove)
      placemark.events.remove('mousedown')

      previewModal.firstChild.innerHTML = ''
      previewModal.lastChild.innerHTML = ''

    }).add('mousemove', event => {
      
      let cursor = event.originalEvent.domEvent.originalEvent

      previewModal.style.left = cursor.clientX + 'px'
      previewModal.style.top = cursor.clientY + 'px'
      if (!document.body.classList.contains('touch'))
        previewModal.style.display = 'block'

      placemark.events.add('mousedown', mouseDown)

    })

    placemarksFriendsCollection.add(placemark)

  })

  map.geoObjects.remove(placemarksFriendsCollection)
  map.geoObjects.add(placemarksFriendsCollection)
}

export {addPlacemarks, addPlacemarksFriends, addPlacemarksPublic}