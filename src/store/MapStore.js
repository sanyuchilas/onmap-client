import { makeAutoObservable } from "mobx"

export default class MapStore {
  constructor() {
    this._center = [55.42449385862713,38.00976220345276]
    this._zoom = 4
    makeAutoObservable(this)
  }

  setCenter(arr) {
    this._center = arr
  }

  setZoom(zoom) {
    this._zoom = zoom
  }

  get center() {
    return this._center
  }

  get zoom() {
    return this._zoom
  }
}