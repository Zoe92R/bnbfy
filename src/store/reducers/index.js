import { combineReducers } from 'redux'
import { systemReducer } from './systemReducer'
import { userReducer } from './userReducer'
import { stayReducer } from './stayReducer'
import { orderReducer } from './orderReducer'
import { tripReducer } from './tripReducer'

export const rootReducer = combineReducers({
    systemModule: systemReducer,
    userModule: userReducer,
    stayModule: stayReducer,
    orderModule: orderReducer,
    tripModule: tripReducer,
})
