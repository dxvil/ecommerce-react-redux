import { createStore } from 'redux'
import reducers from './reducers'

const store = createStore(
    reducers,
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
)

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
