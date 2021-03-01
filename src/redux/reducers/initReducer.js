import { INIT_FIREBASE_STORE, INIT_STORE } from '../actions'

const initialState = {
    createdDB: false,
    storeItems: [],
}

export const initReducer = (state = initialState, { type, payload }) => {
    switch (type) {
        case INIT_FIREBASE_STORE:
            return {
                ...state,
                createdDB: payload,
            }
        case INIT_STORE:
            const items = [...state.storeItems, payload]
            return {
                ...state,
                storeItems: [...payload],
            }
        default:
            return state
    }
}
