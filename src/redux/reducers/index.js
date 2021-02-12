import { combineReducers } from 'redux'
import { initReducer } from './initReducer'
import { purchaseReducer } from './purchaseReducer'
import { filterShopReducer } from './filterShopReducer'

export default combineReducers({
    createdDB: initReducer,
    products: purchaseReducer,
    filters: filterShopReducer,
})
