import {combineReducers} from "redux";
import {ADD_ITEM, REMOVE_ITEM, UPDATE_TOTAL_PRICE} from "../actions";
import {products} from "../../components/App/App";

let purchaseReducer = (state = [], action) => {
    switch (action.type) {
        case ADD_ITEM:
            return [...state, action.payload];
        case REMOVE_ITEM:
            return {
                ...state,
                items: state.items.filter((item, index) => index !== action.payload)
            }
        default:
            return state
    }
};

export default combineReducers({
    products: purchaseReducer
});