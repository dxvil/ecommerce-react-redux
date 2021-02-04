import { ADD_ITEM, REMOVE_ITEM } from '../actions'

export let purchaseReducer = (state = [], { payload, type }) => {
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
