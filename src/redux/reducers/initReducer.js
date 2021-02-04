import { INIT_STORE } from '../actions'

export let productsInitialization = (state = [], payload) => {
    if (payload.type === INIT_STORE) {
        return [...state, payload]
    }
    return state
}
