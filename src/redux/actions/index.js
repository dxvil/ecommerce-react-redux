export const ADD_ITEM = 'ADD_ITEM'
export const REMOVE_ITEM = 'REMOVE_ITEM'
export const UPDATE_TOTAL_PRICE = 'UPDATE_TOTAL_PRICE'
export const UPDATE_AFTER_RELOAD = 'UPDATE_AFTER_RELOAD'

export function addItem(item) {
    return {
        type: ADD_ITEM,
        payload: item,
    }
}

export function removeItem(item) {
    return {
        type: REMOVE_ITEM,
        payload: item,
    }
}
export function updateAfterReload(item) {
    return {
        type: UPDATE_AFTER_RELOAD,
        payload: item,
    }
}
export function updateTotalPrice(item) {
    return {
        type: UPDATE_TOTAL_PRICE,
        payload: item.price.reduce((a, b) => a + b, 0),
    }
}
