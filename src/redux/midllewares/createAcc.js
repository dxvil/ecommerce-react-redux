import { createAccount } from '../../firebase/Firebase'
import { createUserAccount, setUserName } from '../actions'

export const createUserMiddleware = (em, pass, login) => (dispatch) => {
    createAccount(em, pass)
        .then((data) => {
            dispatch(createUserAccount(data))
        })
        .then(() => {
            dispatch(setUserName(login))
        })
        .catch((error) => {
            if (error) throw new Error(error)
        })
}
