import { $authHost, $host } from "./http";

export const createOne = async (coordinates, icon, shortDescription, fullDescription, files, userId, selectFriendsId) => {

  const {data} = await $authHost.post('/api/placemark/createOne', {coordinates, icon, shortDescription, fullDescription, files, userId, selectFriendsId})

  return data.placemark
}

export const getAllPrivate = async (userId) => {
  const {data} = await $authHost.get('/api/placemark/getAllPrivate', {params: {userId}})

  return data
}

export const getAllPublic = async () => {
  const {data} = await $authHost.get('/api/placemark/getAllPublic')

  return data
}

export const getFriendsPlacemarks = async (userId) => {
  const {data} = await $authHost.get('/api/placemark/getFriendsPlacemarks', {params: {userId}})

  return data
}