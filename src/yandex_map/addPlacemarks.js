import createChipsLayout from './createChipsLayout'
import { PLACEMARK_ROUTE } from "./../utils/constants";

function addPlacemarks(ymaps, navigate, placemarks) {
  const map = global.myMap

  let previewModal = document.querySelector('div[data-id="preview_modal"]')

  let placemarksCollection = new ymaps.GeoObjectCollection()

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
    console.log(Object.entries(data))

    let placemark = new ymaps.Placemark(JSON.parse(data.coordinates), {}, {
      iconLayout: createChipsLayout(calculateSize, ymaps, data.icon)
    })

    placemark.events.add('click', event => {
      navigate(PLACEMARK_ROUTE + '/' + data.id)
    }).add('mouseenter', () => {
    
    }).add('mouseleave', () => {

      previewModal.style.display = 'none'
      document.body.removeEventListener('mousemove', mouseMove)
      placemark.events.remove('mousedown')

    }).add('mousemove', event => {
      
      let cursor = event.originalEvent.domEvent.originalEvent

      previewModal.style.left = cursor.clientX + 'px'
      previewModal.style.top = cursor.clientY + 'px'
      previewModal.style.display = 'block'

      placemark.events.add('mousedown', mouseDown)

    })

    placemarksCollection.add(placemark)
  })

  map.geoObjects.add(placemarksCollection)

  global.placemarksCollection = placemarksCollection
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
    console.log(Object.entries(data))

    let placemark = new ymaps.Placemark(JSON.parse(data.coordinates), {}, {
      iconLayout: createChipsLayout(calculateSizePublic, ymaps, data.icon)
    })
    placemark.events.add('click', event => {
      // navigate(PLACEMARK_ROUTE + '/' + data.id)
      window.open(data.model, '_blank')
    }).add('mouseenter', () => {
      
    }).add('mouseleave', () => {

      previewModal.style.display = 'none'
      document.body.removeEventListener('mousemove', mouseMove)
      placemark.events.remove('mousedown')

    }).add('mousemove', event => {
      
      let cursor = event.originalEvent.domEvent.originalEvent

      previewModal.style.left = cursor.clientX + 'px'
      previewModal.style.top = cursor.clientY + 'px'
      previewModal.style.display = 'block'

      placemark.events.add('mousedown', mouseDown)

    })

    map.geoObjects.add(placemark)
  })
}

function addPlacemarksFriends(ymaps, navigate, placemarks) {
  const map = global.myMap

  let previewModal = document.querySelector('div[data-id="preview_modal"]')

  let placemarksFriendsCollection = new ymaps.GeoObjectCollection()

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
    console.log(Object.entries(data))

    let placemark = new ymaps.Placemark(JSON.parse(data.coordinates), {}, {
      iconLayout: createChipsLayout(calculateSizeFriends, ymaps, data.icon)
    })

    placemark.events.add('click', event => {
      navigate(PLACEMARK_ROUTE + '/' + data.id)
    }).add('mouseenter', event => {

    }).add('mouseleave', () => {

      previewModal.style.display = 'none'
      document.body.removeEventListener('mousemove', mouseMove)
      placemark.events.remove('mousedown')

    }).add('mousemove', event => {
      
      let cursor = event.originalEvent.domEvent.originalEvent

      previewModal.style.left = cursor.clientX + 'px'
      previewModal.style.top = cursor.clientY + 'px'
      previewModal.style.display = 'block'

      placemark.events.add('mousedown', mouseDown)

    })

    map.geoObjects.add(placemarksFriendsCollection)

    global.placemarksFriendsCollection = placemarksFriendsCollection
  })
}

export {addPlacemarks, addPlacemarksFriends, addPlacemarksPublic}