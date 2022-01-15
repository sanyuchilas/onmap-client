import { PLACEMARK_ROUTE } from "utils/constants";

export function script(url) {
  if (Array.isArray(url)) {
    let self = this;
    let prom = [];
    url.forEach(function (item) {
      prom.push(self.script(item));
    });
    return Promise.all(prom);
  }

  return new Promise(function (resolve, reject) {
    let r = false;
    let t = document.getElementsByTagName('script')[0];
    let s = document.createElement('script');

    s.type = 'text/javascript';
    s.src = url;
    s.async = true;
    s.onload = s.onreadystatechange = function () {
      if (!r && (!this.readyState || this.readyState === 'complete')) {
        r = true;
        resolve(this);
      }
    };
    s.onerror = s.onabort = reject;
    t.parentNode.insertBefore(s, t);
  });
}

export function startYandexMap(navigate, center, zoom) {
  const ymaps = global.ymaps;

  let calculateSize = (zoom) => {
    return Math.min(Math.pow(zoom, 2) * 0.4, 50)
  }

  let createChipsLayout = function (calculateSize) {
    // Создадим макет метки.
    let Chips = ymaps.templateLayoutFactory.createClass(
      `<div class="placemark" style="background: url(https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQj52HGina9b47yCTysh6pZ7rr0WswZbrAnzQ&usqp=CAU) no-repeat; background-size: cover; border-radius: 50%;"></div>`,
      {
        build: function () {
          Chips.superclass.build.call(this)
          let map = this.getData().geoObject.getMap()
          if (!this.inited) {
            this.inited = true
            // Получим текущий уровень зума.
            let zoom = map.getZoom()
            // Подпишемся на событие изменения области просмотра карты.
            map.events.add('boundschange', function () {
              // Запустим перестраивание макета при изменении уровня зума.
              let currentZoom = map.getZoom()
              if (currentZoom != zoom) {
                zoom = currentZoom
                this.rebuild()
              }
            }, this)
          }
          let options = this.getData().options
          // Получим размер метки в зависимости от уровня зума.
          let size = calculateSize(map.getZoom())
          let element = this.getParentElement().getElementsByClassName('placemark')[0]
          // По умолчанию при задании своего HTML макета фигура активной области не задается,
          // и её нужно задать самостоятельно.
          // Создадим фигуру активной области "Круг".
          let circleShape = {type: 'Circle', coordinates: [0, 0], radius: size / 2}
          // Зададим высоту и ширину метки.
          element.style.width = element.style.height = size * 0.06 + 'rem'
          // Зададим смещение.
          element.style.marginLeft = element.style.marginTop = -size * 0.06 / 2 + 'rem'
          // Зададим фигуру активной области.
          options.set('shape', circleShape)
        }
      }
    )

    return Chips
  }

  function init() {
    document.getElementById('map').innerHTML = ''
    let map = new ymaps.Map('map', {
      center,
      zoom
    }, {
      minZoom: 0.3,
      maxZoom: 24,
      avoidFractionalZoom: false
      // restrictMapArea: [[-85, 1000], [85, 179.9]]
    })

  let addPlacmeMarkBtn = document.querySelector('button[data-id="add_placemark"]')

  addPlacmeMarkBtn.addEventListener('click', () => {
    map.setCenter(map.getCenter())
    global.mapZoom = map.getZoom()
    global.mapCenter = map.getCenter()
  })

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

    let placemark1 = new ymaps.Placemark([51.17885736098834,-1.8261605410343302], {
      // balloonContent: `

      //   <div class="balloon">
      //     <div class="balloon__address">UK</div>
      //     <div class="balloon__contacts">
      //       <a href="tel: +79999999999">+79999999999</a>
      //     </div>
      //   </div>

      // `
    }, {
      iconLayout: createChipsLayout(calculateSize)
    })

    map.controls.remove('geolocationControl') // удаляем геолокацию
    map.controls.remove('searchControl') // удаляем поиск
    map.controls.remove('trafficControl') // удаляем контроль трафика
    map.controls.remove('typeSelector') // удаляем тип
    map.controls.remove('fullscreenControl') // удаляем кнопку перехода в полноэкранный режим
    map.controls.remove('zoomControl') // удаляем контрол зуммирования
    map.controls.remove('rulerControl') // удаляем контрол правил
    map.controls.remove(['scrollZoom']) // отключаем скролл карты (опционально)

    // map.geoObjects.add(placemark)
    map.geoObjects.add(placemark1)
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

    placemark1.events.add('dblclick', event => {
      navigate(PLACEMARK_ROUTE + '/' + '1')
    }).add('mouseenter', () => {
      console.log('hover')
    }).add('mouseleave', () => {
      console.log('leave')
    })
    // placemark1.balloon.open()
  }

  ymaps.ready(init)
}