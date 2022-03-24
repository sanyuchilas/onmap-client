let createChipsLayout = function (calculateSize, ymaps, icon) {
  // Создадим макет метки.
  let Chips = ymaps.templateLayoutFactory.createClass(
    `<div class="placemark" style="background: url(${icon || 'https://st2.depositphotos.com/2659027/5664/v/950/depositphotos_56640799-stock-illustration-map-pin-location-mark-icon.jpg'}) no-repeat; background-size: cover; border-radius: 50%;"></div>`,
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

export default createChipsLayout