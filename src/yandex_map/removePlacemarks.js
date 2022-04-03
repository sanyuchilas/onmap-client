export default function removePalcemarks(idArr, collection, map) {
  map.geoObjects.remove(collection)

  collection.toArray().forEach(placemark => idArr.forEach(id => id === placemark.properties._data.id && collection.remove(placemark)))

  map.geoObjects.add(collection)
}