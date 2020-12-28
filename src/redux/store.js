import { createStore } from 'redux'
import reducers from './reducers'

const store = createStore(reducers)

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
        const smth = Object.values(state[0])
        console.log(smth)
        return state
    } catch (e) {
        console.warn(e)
        return undefined
    }
}

store.subscribe(() => saveToLocalStorage(store.getState()))

export default store
