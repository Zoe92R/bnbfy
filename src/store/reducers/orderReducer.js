const initialState = {
    orders: []
}

export function orderReducer(state = initialState, action) {
    switch (action.type) {
        case 'SET_ORDERS':
            return { ...state, orders: action.orders }
        case 'ADD_ORDER':
            console.log('action.saveOrder in reducer',action.saveOrder);
            return { ...state, orders: [action.saveOrder, ...state.orders] }
        case 'UPDATE_ORDER':
            return { ...state, orders: [action.saveOrder, ...state.orders.filter(order => action.order._id !== order._id)] }

        case 'REMOVE_ORDER':
            return { ...state, orders: state.orders.filter(order => order._id !== action.orderId) }

        case 'SET_STATUS':
            return { ...state, order: { ...state.order, status: action.status } }

        default:
            return state
    }
}
