import { $authHost, $host } from "./http";

export const createOne = async (coordinates, icon, short_description, full_description, files, userId) => {

  const {data} = await $authHost.post('/api/placemark/createOne', {coordinates, icon, short_description, full_description, files, userId})

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