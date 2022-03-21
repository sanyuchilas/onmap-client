import { $authHost, $host } from "./http";
import jwt_decode from "jwt-decode"

export const registration = async (avatar, email, name, password) => {
  const {data} = await $host.post('api/user/registration', {email, password, name, avatar, role: 'USER'})
  localStorage.setItem('token', data.token)
  return jwt_decode(data.token)
}

export const login = async (email, password) => {
  const {data} = await $host.post('api/user/login', {email, password})
  localStorage.setItem('token', data.token)
  return jwt_decode(data.token)
}

export const check = async () => {
  const {data} = await $authHost.get('api/user/auth')
  localStorage.setItem('token', data.token)
  return jwt_decode(data.token)
}

export const fetchFriends = async id => {
  const {data} = await $authHost.post('api/user/getFriends', {id})
  return data
}

export const putFriends = async (friend, friends, event) => {
  const {data} = await $authHost.put('api/user/putFriends', {friend, friends, event})
  return data
}

export const fetchOne = async id => {
  const {data} = await $authHost.get('api/user/getOne', {params: {id}})
  return data
}