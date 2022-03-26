import createChipsLayout from './createChipsLayout'
import { PLACEMARK_ROUTE } from "./../utils/constants";

function addPlacemarks(ymaps, navigate, placemarks, placemarksPucblic, placemarksFriends) {
  const map = global.myMap

  let calculateSize = (zoom) => {
    return Math.min(Math.pow(zoom, 2) * 1.3 + 5.05, 50)
  }

  let calculateSizePublic = (zoom) => {
    return Math.min(Math.pow(zoom, 2) * 0.7 + 0.95, 50)
  }

  let calculateSizeFriends = (zoom) => {
    return Math.min(Math.pow(zoom, 2) + 3.27, 50)
  }

  



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





  //Инициализируем метки

  // global.mapCenter = map.getCenter()

  // let placemark = new ymaps.Placemark([51, -1], {
  //   // balloonContentHeader: 'Хедер балуна',
  //   // balloonContentBody: 'Боди балуна',
  //   // balloonContentFooter: 'Подвал балуна'
  // }, {
  //   iconLayout: createChipsLayout(calculateSize),
  //   // iconImageHref: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQj52HGina9b47yCTysh6pZ7rr0WswZbrAnzQ&usqp=CAU',
  //   // iconImageSize: [30, 30],
  //   // iconImageOffset: [-15, -15]
  // })

  // balloonContent: `

  //   <div class="balloon">
  //     <div class="balloon__address">UK</div>
  //     <div class="balloon__contacts">
  //       <a href="tel: +79999999999">+79999999999</a>
  //     </div>
  //   </div>

  // `
 
  let previewModal = document.querySelector('div[data-id="preview_modal"]')

  placemarksPucblic.forEach(data => {
    console.log(Object.entries(data))

    let placemark = new ymaps.Placemark(JSON.parse(data.coordinates), {}, {
      iconLayout: createChipsLayout(calculateSizePublic, ymaps, data.icon)
    })
    placemark.events.add('click', event => {
      // navigate(PLACEMARK_ROUTE + '/' + data.id)
      window.open(data.model, '_blank')
    }).add('mouseenter', () => {
      
    }).add('mouseleave', () => {
      
    })
    map.geoObjects.add(placemark)
  })
 
  placemarks.forEach(data => {
    console.log(Object.entries(data))

    let placemark = new ymaps.Placemark(JSON.parse(data.coordinates), {}, {
      iconLayout: createChipsLayout(calculateSize, ymaps, data.icon)
    })

    placemark.events.add('click', event => {
      navigate(PLACEMARK_ROUTE + '/' + data.id)
    }).add('mouseenter', () => {
    
    }).add('mouseleave', () => {
      
    })
    map.geoObjects.add(placemark)
  })

  placemarksFriends.forEach(data => {
    console.log(Object.entries(data))

    let mouseMove = event => {
      previewModal.style.left = event.clientX + 'px'
      previewModal.style.top = event.clientY + 'px'
    }

    let mouseDown = event => {
      document.body.addEventListener('mousemove', mouseMove)
    }

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
    map.geoObjects.add(placemark)
  })
}

export default addPlacemarks