import { combineReducers } from 'redux'
import { initReducer } from './initReducer'
import { basketReducer } from './basketReducer'
import { filterShopReducer } from './filterShopReducer'
import { reducer as formReducer } from 'redux-form'
import { loginReducer } from './loginReducer'
import {purchaseReducer} from "./purchaseReducer";

export default combineReducers({
    createdDB: initReducer,
    products: basketReducer,
    purchases: purchaseReducer,
    filters: filterShopReducer,
    form: formReducer,
    login: loginReducer,
})
