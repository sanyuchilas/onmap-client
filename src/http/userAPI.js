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

export const fetchComradesAndAddFriends = async (id) => {
  const {data} = await $authHost.post('api/user/comradesAndAddFriends', {id})
  return data
}

export const friends = async (id ,friendId) => {
  const {data} = await $authHost.put('api/user/comradesAndAddFriends', {id})
}