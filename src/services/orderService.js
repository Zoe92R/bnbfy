// import { storageService } from './asyncStorageService'
import { httpService } from './http.service'
// const gOrders = require('../data/order.json')
// const STORAGE_KEY = 'ORDER_KEY'
export const orderService = {
  query,
  getOrderById,
  remove,
  save,
  getOrderByHost,
  setStatus
}

async function query() {
  // return await storageService.query(STORAGE_KEY, gOrders)
  try {
    return await httpService.get('order')
    // await storageService.query(STORAGE_KEY, test)
  } catch (err) {
    console.log('error in query', err);
    throw err
  }
}

async function getOrderById(orderId) {
  // const res = await storageService.get(STORAGE_KEY, orderId)
  const res = await httpService.get(`order/${orderId}`)
  return await res
}

async function getOrderByHost(hostId) {
  const res = await query()
  const filteredOrders = res.filter(order => {
    return order.hostId === hostId
  })
  return filteredOrders
}

async function remove(orderId) {
  // await storageService.remove(STORAGE_KEY, orderId)
  return await httpService.delete(`order/${orderId}`)

  // return Promise.resolve()
}


async function save(order) {
  if (order._id) {
    return await httpService.put(`order/${order._id}`, order)
  }
  else {
    const res = await httpService.post('order', order)
    return res
  }
  // const res = await storageService.put(STORAGE_KEY, stay)
  // return res
}


async function setStatus(order) {
  // const res = await storageService.put(STORAGE_KEY, order)
  const res = await httpService.put(`order/${order._id}`, order)
  return res
}