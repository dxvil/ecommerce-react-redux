import { combineReducers } from 'redux'
import { ADD_ITEM, INIT_STORE, REMOVE_ITEM } from '../actions'

let purchaseReducer = (state = [], { payload, type }) => {
    switch (type) {
        case ADD_ITEM:
            if (state.includes(payload)) {
                state.filter((item) => {
                    if (item === payload) {
                        return [...state, (payload.quantity += 1)]
                    } else {
                        return null
                    }
                })
                return state
            } else {
                return [...state, payload]
            }
        case REMOVE_ITEM:
            return state.filter((item) => item.id !== payload)

        default:
            return state
    }
}

let productsInitialization = (state = [], payload) => {
    if (payload.type === INIT_STORE) {
        return [...state, payload]
    }
    return state
}

export default combineReducers({
    init: productsInitialization,
    products: purchaseReducer,
})
