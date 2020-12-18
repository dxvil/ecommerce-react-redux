const ADD_ITEM = 'ADD_ITEM';
const REMOVE_ITEM = 'REMOVE_ITEM';
const UPDATE_TOTAL_PRICE = 'UPDATE_TOTAL_PRICE';

export function addItem(item) {
    return {
        type: ADD_ITEM,
        payload: {title: item.title, price: item.price}
    }
}

export function removeItem(item) {
    return {
        type: REMOVE_ITEM,
        payload: {title: item.title, price: item.price}
    }
}

export function updateTotalPrice(...items) {
    return {
        type: UPDATE_TOTAL_PRICE,
        payload: items.reduce((a, b) => a + b, 0)
    }
}
