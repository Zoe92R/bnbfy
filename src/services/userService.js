// import { storageService } from './asyncStorageService'
import { httpService } from './http.service.js'
const gUsers = require('../data/users.json')
const STORAGE_KEY = 'USER_KEY'

export const userService = {
    login,
    logout,
    signup,
    getUsers,
    getById,
    remove,
    update,
    getLoggedinUser,
}

window.userService = userService
// Note: due to async, must run one by one...
// userService.signup({fullname: 'Puki Norma', username: 'user1', password:'123',score: 100, isAdmin: false})
// userService.signup({fullname: 'Master Adminov', username: 'admin', password:'123', score: 100, isAdmin: true})

function getUsers() {
    console.log('in get users');
    // return storageService.query(STORAGE_KEY,gUsers)
    return httpService.get(`user`)
}

function getById(userId) {
    // return storageService.get(STORAGE_KEY, userId)
    return httpService.get(`user/${userId}`)
}
function remove(userId) {
    // return storageService.remove(STORAGE_KEY, userId)
    return httpService.delete(`user/${userId}`)
}

async function update(user) {
    // return storageService.put(STORAGE_KEY, user)
    user = await httpService.put(`user/${user._id}`, user)
    // Handle case in which admin updates other user's details
    // if (getLoggedinUser()._id === user._id) _saveLocalUser(user)
}

// async function increaseScore(by = SCORE_FOR_REVIEW) {
//     const user = getLoggedinUser()
//     user.score = user.score + by || by
//     await update(user)
//     return user.score
// }

async function login(userCred) {
    // const users = await storageService.query(STORAGE_KEY)
    // const user = users.find(user => user.username === userCred.username)
    // return _saveLocalUser(user)

    const user = await httpService.post('auth/login', userCred)
    if (user) return _saveLocalUser(user)
}
async function signup(userCred) {
    // const user = await storageService.post(STORAGE_KEY, userCred)
    const user = await httpService.post('auth/signup', userCred)
    return _saveLocalUser(user)
}
async function logout() {
    // console.log('in service');
    sessionStorage.clear()
    return await httpService.post('auth/logout')
}
function _saveLocalUser(user) {
    sessionStorage.setItem('loggedinUser', JSON.stringify(user))
    return user
}

function getLoggedinUser() {
    return JSON.parse(sessionStorage.getItem('loggedinUser'))
}

