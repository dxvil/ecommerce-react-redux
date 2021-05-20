import {addPurchase} from "../../firebase/Firebase";
import {createPurchase} from "../actions";

export const createPurchaseMiddleware = (path, name, info) => async (dispatch) => {
    await addPurchase(path, name, info);
    return dispatch(createPurchase(info))
}