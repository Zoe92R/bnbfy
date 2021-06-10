import { storageService } from './asyncStorageService'
import { httpService } from './http.service'

const gStays = require('../data/stay.json')
const STORAGE_KEY = 'STAY_KEY'
export const stayService = {
  query,
  getStayById,
  remove,
  save
}


async function query(filterBy = {}) {
  // return await storageService.query(STORAGE_KEY, gStays)
  try {
    return await httpService.get('stay')
    // await storageService.query(STORAGE_KEY, test)
  } catch (err) {
    throw err
    // }
  }
}

async function getStayById(stayId) {
  return await httpService.get(`stay/${stayId}`)

  // const res = await storageService.get(STORAGE_KEY, stayId)
  // console.log('get stay by id in service',res,stayId);
  // return res
}

async function remove(stayId) {
  return await httpService.delete(`stay/${stayId}`)
  // await storageService.remove(STORAGE_KEY, stayId)
  // return Promise.resolve()
}
async function save(stay) {
  if(stay._id) {
   return await httpService.put(`stay/${stay._id}`,stay)
  }
  else {
  return await httpService.post('stay',stay)
  }
  // const res = await storageService.put(STORAGE_KEY, stay)
  // return res
}