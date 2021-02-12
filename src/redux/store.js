import { applyMiddleware, createStore, compose } from 'redux'
import reducers from './reducers'
import thunk from 'redux-thunk'

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose

const store = createStore(reducers, composeEnhancers(applyMiddleware(thunk)))

function saveToLocalStorage(state) {
    try {
        const serialisedState = JSON.stringify(state)
        localStorage.setItem('persistantState', serialisedState)
    } catch (e) {
        console.warn(e)
    }
}

export function loadFromLocalStorage() {
    try {
        const serialisedState = localStorage.getItem('persistantState')
        if (serialisedState === null) return undefined
        const state = JSON.parse(serialisedState)
        const stateArray = Object.entries(state)
        return stateArray
    } catch (e) {
        console.warn(e)
        return undefined
    }
}

store.subscribe(() => saveToLocalStorage(store.getState()))

export default store
