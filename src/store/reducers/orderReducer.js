const initialState = {
    orders: []
}

export function orderReducer(state = initialState, action) {
    switch (action.type) {
        case 'SET_ORDERS':
            return { ...state, orders: action.orders }
        case 'ADD_ORDER':
            return { ...state, orders: [action.saveOrder, ...state.orders] }
        case 'UPDATE_ORDER':
            // return { ...state, orders: [action.saveOrder, ...state.orders.filter(order => action.order._id !== order._id)] }
            return {
                ...state, orders: state.orders.map(order => (order._id === action.saveOrder._id) ? action.saveOrder : order)
            }

        case 'REMOVE_ORDER':
            return { ...state, orders: state.orders.filter(order => order._id !== action.orderId) }

        case 'SET_STATUS':
            return { ...state, order: { ...state.order, status: action.status } }

        default:
            return state
    }
}
