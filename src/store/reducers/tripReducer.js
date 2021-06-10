const initialState = {
    trip: null,
    error: ''
}

export function tripReducer(state = initialState, action = {}) {

    switch (action.type) {
        case 'SET_TRIP':
            return { ...state, trip: { ...action.trip } }
        case 'SET_ERR':
            return { ...state, err: { ...action.err } }
        default:
            return state
    }
}