export const INIT_FIREBASE_STORE = 'INIT_FIREBASE_STORE'
export const INIT_STORE = 'INIT_STORE'
export const ADD_ITEM = 'ADD_ITEM'
export const REMOVE_ITEM = 'REMOVE_ITEM'
export const UPDATE_TOTAL_PRICE = 'UPDATE_TOTAL_PRICE'
export const FILTER_SHOP_ALPHABET = 'FILTER_SHOP_ALPHABET'
export const FILTER_SHOP_REVERSE = 'FILTER_SHOP_REVERSE'
export const FILTER_SHOP_LOW_TO_HIGH = 'FILTER_SHOP_LOW_TO_HIGH'
export const FILTER_SHOP_HIGH_TO_LOW = 'FILTER_SHOP_HIGH_TO_LOW'
export const CREATE_USER_ACCOUNT = 'CREATE_USER_ACCOUNT'
export const SET_USER_NAME = 'SET_USER_NAME'
export const LOGIN = 'LOGIN';
export const CREATE_PURCHASE = 'CREATE_PURCHASE';

export function initFirebaseStore(boolean) {
    return {
        type: INIT_FIREBASE_STORE,
        payload: boolean,
    }
}

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

export function createUserAccount(payload) {
    return {
        type: CREATE_USER_ACCOUNT,
        payload: payload,
    }
}

export function login(payload) {
return {
    type: LOGIN,
    payload
}
}

export function setUserName(name) {
    return {
        type: SET_USER_NAME,
        payload: name,
    }
}

export function createPurchase(info) {
    return {
        type: CREATE_PURCHASE,
        payload: info
    }
}