const { makeAutoObservable } = require("mobx")

class MapStore {
  constructor() {
    this._placemarks = []
    this._placemarksPublic = []
    makeAutoObservable(this)
  }

  set placemarks(placemarks) {
    this._placemarks = placemarks
  }

  get placemarks() {
    return this._placemarks
  }

  set placemarksPublic(placemarksPublic) {
    this._placemarksPublic = placemarksPublic
  }

  get placemarksPublic() {
    return this._placemarksPublic
  }
}

export default MapStore