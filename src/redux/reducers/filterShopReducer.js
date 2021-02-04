import {
    FILTER_SHOP_ALPHABET,
    FILTER_SHOP_HIGH_TO_LOW,
    FILTER_SHOP_LOW_TO_HIGH,
    FILTER_SHOP_REVERSE,
} from '../actions'

const initialState = {
    alphabetical: false,
    reverse: false,
    lowToHigh: false,
    highToLow: false,
}

export const filterShopReducer = (state = initialState, { type, payload }) => {
    switch (type) {
        case FILTER_SHOP_ALPHABET:
            return { ...state, alphabetical: payload, reverse: false }
        case FILTER_SHOP_REVERSE:
            return { ...state, reverse: payload, alphabetical: false }
        case FILTER_SHOP_LOW_TO_HIGH:
            return { ...state, lowToHigh: payload, highToLow: false }
        case FILTER_SHOP_HIGH_TO_LOW:
            return { ...state, highToLow: payload, lowToHigh: false }
        default:
            return state
    }
}
