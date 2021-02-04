import { combineReducers } from 'redux'
import { productsInitialization } from './initReducer'
import { purchaseReducer } from './purchaseReducer'
import { filterShopReducer } from './filterShopReducer'

export default combineReducers({
    init: productsInitialization,
    products: purchaseReducer,
    filters: filterShopReducer,
})
