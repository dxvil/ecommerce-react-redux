import { initStore } from '../actions'
import { bindingData } from '../../firebase/Firebase'

export const bindDB = (path) => (dispatch) => {
    let dataStore = []
    bindingData(path)
        .then((data) => {
            return (dataStore = [...data])
        })
        .then((data) => {
            dispatch(initStore(data))
        })
        .catch((error) => {
            if (error) throw new Error(error)
        })
}
