import { stayService } from "../../services/stayService.js"


export function loadStays(filterBy) {
    return async dispatch => {
        try {
            dispatch({ type: 'LOADING_START' })
            const stays = await stayService.query(filterBy)
            dispatch({ type: 'SET_STAYS', stays })
        } catch (err) {
            console.log('stayActions: err in load stays', err)
        } finally {
            dispatch({ type: 'LOADING_DONE' })
        }
    }
}



export function loadStay(stayId) {
    return async dispatch => {
        try {
            dispatch({ type: 'LOADING_START' })
            const stay = await stayService.getStayById(stayId) // get by id in the service
            dispatch({ type: 'SET_STAY', stay })
        } catch (err) {
            console.log('stayActions: err in load stay', err)
        } finally {
            dispatch({ type: 'LOADING_DONE' })
        }
    }
}

export function removeStay(stayId) {
    return async dispatch => {
        try {
            await stayService.remove(stayId)
            dispatch({ type: 'REMOVE_STAY', stayId })
        } catch (err) {
            console.log('stayActions: err in removeStay', err)
        }
    }
}

export function saveStay(stay) {
    // console.log('save stay in stay.action')
    const type = stay._id ? 'UPDATE_STAY' : 'ADD_STAY'
    return async dispatch => {
        try {
            await stayService.save(stay)
            dispatch({ type, stay })
        } catch (err) {
            console.log('stayActions: err in save stays', err)
        }
    }
}

