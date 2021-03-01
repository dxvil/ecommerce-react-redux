import { products } from '../../firebase/items'
import { initFirebaseStore } from '../actions'

export const createDBMiddleware = (callbackFirebase, path) => (dispatch) => {
    products.forEach((item) => {
        callbackFirebase(path, item)
    })
    return dispatch(initFirebaseStore(true))
}
