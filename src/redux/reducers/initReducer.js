import {
    INIT_FIREBASE_STORE,
    INIT_STORE,
    initFirebaseStore,
    initStore,
} from '../actions'
import { products } from '../../firebase/items'
import { db } from '../../firebase/Firebase'

export const createInitMiddleware = (path) => (dispatch) => {
    products.forEach((item) => {
        db.collection(path)
            .add({
                item,
            })
            .then(function (docRef) {
                return docRef
            })
            .catch(function (error) {
                throw new Error(error)
            })
    })
    return dispatch(initFirebaseStore(true))
}

export const initMiddleware = (path) => (dispatch) => {
    return db
        .collection(path)
        .get()
        .then((items) => {
            let arr = []
            items.forEach((item) => {
                let transformVar = item.data()
                return arr.push(transformVar)
            })
            return arr
        })
        .then((data) => {
            dispatch(initStore(data))
        })
}

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
