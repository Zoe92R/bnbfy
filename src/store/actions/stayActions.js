import { stayService } from "../../services/stayService.js"


export function loadStays() {
    return async dispatch => {
        try {
            dispatch({ type: 'LOADING_START' })
            const stays = await stayService.query()
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
            const stay = await stayService.getStayById(stayId) // get by id in the service
            // console.log( 'stay in load stay action',stay)
            dispatch({ type: 'SET_STAY', stay })
        } catch (err) {
            console.log('stayActions: err in load stay', err)
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

// export function addReview(stayId, review) {
//     // console.log('save stay in stay.action')
//     const type = 'ADD_REVIEW'
//     return async dispatch => {
//         try {
//             // const stayReview = await stayService.addReview(stayId,review)
//             // dispatch({ type, stayReview })
//         } catch (err) {
//             console.log('stayActions: err in add review stays', err)
//         }
//     }
// }

// export function onLogin() {
//     return 'hellllllooooooo'
// }