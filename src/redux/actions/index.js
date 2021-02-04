export const ADD_ITEM = 'ADD_ITEM'
export const REMOVE_ITEM = 'REMOVE_ITEM'
export const UPDATE_TOTAL_PRICE = 'UPDATE_TOTAL_PRICE'
export const INIT_STORE = 'INIT_STORE'
export const FILTER_SHOP_ALPHABET = 'FILTER_SHOP_ALPHABET'
export const FILTER_SHOP_REVERSE = 'FILTER_SHOP_REVERSE'
export const FILTER_SHOP_LOW_TO_HIGH = 'FILTER_SHOP_LOW_TO_HIGH'
export const FILTER_SHOP_HIGH_TO_LOW = 'FILTER_SHOP_HIGH_TO_LOW'

export function initStore(items) {
    return {
        type: INIT_STORE,
        payload: items,
    }
}

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

export function updateTotalPrice(item) {
    return {
        type: UPDATE_TOTAL_PRICE,
        payload: item.price.reduce((a, b) => a + b, 0),
    }
}

export function filterShopByAlphabet(flag) {
    return {
        type: FILTER_SHOP_ALPHABET,
        payload: flag,
    }
}

export function filterShopReverse(flag) {
    return {
        type: FILTER_SHOP_REVERSE,
        payload: flag,
    }
}

export function filterShopByLowPrice(flag) {
    return {
        type: FILTER_SHOP_LOW_TO_HIGH,
        payload: flag,
    }
}

export function filterShopByHighPrice(flag) {
    return {
        type: FILTER_SHOP_HIGH_TO_LOW,
        payload: flag,
    }
}
