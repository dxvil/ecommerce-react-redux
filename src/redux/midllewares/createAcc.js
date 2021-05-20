import { createAccount } from '../../firebase/Firebase'
import {createUserAccount, setUserName} from '../actions'

export const createUserMiddleware = (em, pass, login) => (dispatch) => {
    return createAccount(em, pass)
        .then(() => {
            return dispatch(createUserAccount(
                {email: em, password: pass}
            ))
        })
        .then(() => {
            return dispatch(setUserName(login))
        })
        .catch((error) => {
            if (error) throw new Error(error)
        })
}
