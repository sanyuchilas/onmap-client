const { makeAutoObservable } = require("mobx")

class UserStore {
  constructor() {
    this._isAuth = false
    this._friends = []
    this._comrades = []
    this._addFriends = []
    this._id = -1
    this._avatar = null
    this._name = ''
    this._role = 'USER'
    this._email = ''
    makeAutoObservable(this)
  }

  set friends(friends) {
    this._friends = friends
  }

  get friends() {
    return this._friends
  }

  set comrades(comrades) {
    this._comrades = comrades
  }

  get comrades() {
    return this._comrades
  }

  set addFriends(addFriends) {
    this._addFriends = addFriends
  }

  get addFriends() {
    return this._addFriends
  }

  set id(id) {
    this._id = id
  }

  get id() {
    return this._id
  }

  set email(email) {
    this._email = email
  }

  get email() {
    return this._email
  }

  set name(name) {
    this._name = name
  }

  get name() {
    return this._name
  }

  set role(role) {
    this._role = role
  }

  get role() {
    return this._role
  }

  set avatar(avatar) {
    this._avatar = avatar
  }

  get avatar() {
    return this._avatar
  }

  set isAuth(bool) {
    this._isAuth = bool
  }

  get isAuth() {
    return this._isAuth
  }
}

export default UserStore