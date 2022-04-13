import { $host } from "./http";

export const createOne = async (coordinates, icon, shortDescription, fullDescription, files, userId, selectFriendsId) => {

  const {data} = await $host.post('/api/placemark/createOne', {coordinates, icon, shortDescription, fullDescription, files, userId, selectFriendsId})

  return data.placemark
}

export const getAllPrivate = async (userId) => {
  const {data} = await $host.get('/api/placemark/getAllPrivate', {params: {userId}})

  return data
}

export const getAllPublic = async () => {
  const {data} = await $host.get('/api/placemark/getAllPublic')

  return data
}

export const getFriendsPlacemarks = async (userId) => {
  const {data} = await $host.get('/api/placemark/getFriendsPlacemarks', {params: {userId}})

  return data
}

export const getOnePublic = async (id) => {
  const {data} = await $host.get('/api/placemark/getOnePublic', {params: {id}})
  
  return data
}

export const getOnePrivate = async (id) => {
  const {data} = await $host.get('/api/placemark/getOnePrivate', {params: {id}})

  return data
}

export const putOnePlacemark = async (coordinates, icon, shortDescription, fullDescription, files, userId, selectFriendsId) => {
  const {data} = await $host.put('/api/placemark/putOne', {coordinates, icon, shortDescription, fullDescription, files, userId, selectFriendsId})

  return data
}