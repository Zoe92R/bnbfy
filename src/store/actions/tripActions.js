
export function updateTrip(trip) {
    return async dispatch => {
        try {
            dispatch({ type:'SET_TRIP', trip })
        } catch (err) {
            dispatch({ type:'SET_ERR', err })
            console.log('tripActions: err in trip stays', err)
        }
    }
}