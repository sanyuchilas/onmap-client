const { makeAutoObservable } = require("mobx")

class MapStore {
  constructor() {
    this._placemarks = []
    makeAutoObservable(this)
  }

  set placemarks(placemarks) {
    this._placemarks = placemarks
  }

  get placemarks() {
    return this._placemarks
  }
}

export default MapStore