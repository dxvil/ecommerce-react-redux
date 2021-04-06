import { createAccount } from '../../firebase/Firebase'
import { setUserName } from '../actions'

export const createUserMiddleware = (em, pass, login) => (dispatch) => {
    createAccount(em, pass)
        .then(() => {
            return dispatch(setUserName(login))
        })
        .catch((error) => {
            if (error) throw new Error(error)
        })
}
