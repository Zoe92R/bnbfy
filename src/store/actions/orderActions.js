import { orderService } from "../../services/orderService.js"

export function loadOrders() {
    return async dispatch => {
        try {
            const orders = await orderService.query()
            // console.log('lodaorders in action',orders)
            dispatch({ type: 'SET_ORDERS', orders })
        } catch (err) {
            console.log('stayActions: err in load actions', err)
        }
    }
}
// export function loadOrdersByHost(hostId) {
//     return async dispatch => {
//         try {
//             const orders = await orderService.getOrderByHost(hostId)
//             dispatch({ type: 'SET_HOST_ORDERS', orders })
//         } catch (err) {
//             console.log('stayActions: err in load actions', err)
//         }
//     }
// }

export function removeOrder(orderId) {
    return async dispatch => {
        try {
            await orderService.remove(orderId)
            dispatch({ type: 'REMOVE_ORDER', orderId })
        } catch (err) {
            console.log('orderActions: err in removeOrder', err)
        }
    }
}

export function saveOrder(order) {
    return async dispatch => {
        try {
            console.log('order in action',order);
            const saveOrder = await orderService.save(order)
            const type = order._id ? 'UPDATE_ORDER' : 'ADD_ORDER'
            dispatch({ type, saveOrder })
        } catch (err) {
            console.log('orderActions: err in save order', err)
        }
    }
}

export function setOrderStatus(orderobj) {
    const type = 'SET_STATUS'
    return async dispatch => {
        try {
            const order = await orderService.setStatus(orderobj)
            dispatch({ type, order })
        } catch (err) {
            console.log('orderActions: err in set status', err)
        }
    }
}