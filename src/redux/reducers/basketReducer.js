import { ADD_ITEM, REMOVE_ITEM } from '../actions'

export let basketReducer = (state = [], { payload, type }) => {
    switch (type) {
        case ADD_ITEM:
            let existedItem = state.find((item) => item.id === payload.id)
            let item = payload
            let newState = state.filter((item) => item.id !== payload.id)

            if (existedItem) {
                item.quantity++

                return [...newState, item]
            } else {
                return [...state, payload]
            }

        case REMOVE_ITEM:
            switch (typeof payload) {
                case "number":
                    return state.filter((item) => item.id !== payload)
                default:
                    return state.filter((item) => item !== payload)
            }
        }
            return state
}
