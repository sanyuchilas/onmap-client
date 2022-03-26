import { $authHost, $host } from "./http";
import jwt_decode from "jwt-decode"

export const registration = async (avatar, email, name, password) => {
  const {data} = await $host.post('api/user/registration', {email, password, name, avatar, role: 'USER'})
  
  return data
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
  const {data} = await $host.get('api/user/getFriends', {params: {id}})
  return data
}

export const putFriends = async (user, friend, event) => {
  const {data} = await $host.put('api/user/putFriends', {user, friend, event})
  return data
}

export const fetchOne = async id => {
  const {data} = await $host.get('api/user/getOne', {params: {id}})
  return data
}