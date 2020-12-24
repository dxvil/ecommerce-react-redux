import { combineReducers } from 'redux'
import { ADD_ITEM, REMOVE_ITEM, UPDATE_TOTAL_PRICE } from '../actions'

let purchaseReducer = (state = [], action) => {
    switch (action.type) {
        case ADD_ITEM:
            if (state.includes(action.payload)) {
                state.filter((item) => {
                    if (item === action.payload) {
                        return (item.quantity += 1)
                    } else {
                        return null
                    }
                })
                return state
            }
            return [...state, action.payload]
        case REMOVE_ITEM:
            return {
                ...state,
                items: state.items.filter(
                    (item, index) => index !== action.payload
                ),
            }
        default:
            return state
    }
}

export default combineReducers({
    products: purchaseReducer,
})
