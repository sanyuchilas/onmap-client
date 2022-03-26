const { makeAutoObservable } = require("mobx")

class MapStore {
  constructor() {
    this._placemarks = []
    this._placemarksPublic = []
    this._placemarksFriends = []
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

  set placemarksFriends(placemarksFriends) {
    this._placemarksFriends = placemarksFriends
  }

  get placemarksFriends() {
    return this._placemarksFriends
  }
}

export default MapStore