import {loginAccount} from "../../firebase/Firebase";
import {login} from "../actions";

export const loginAcc = (em, pass, name) => (dispatch) => {
    loginAccount(em, pass)
    return dispatch(login(em))
}