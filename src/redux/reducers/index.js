import { combineReducers } from 'redux'
import { initReducer } from './initReducer'
import { purchaseReducer } from './purchaseReducer'
import { filterShopReducer } from './filterShopReducer'
import { reducer as formReducer } from 'redux-form'

export default combineReducers({
    createdDB: initReducer,
    products: purchaseReducer,
    filters: filterShopReducer,
    form: formReducer,
})
