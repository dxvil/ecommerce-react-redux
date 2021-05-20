import {CREATE_PURCHASE} from "../actions";

export const purchaseReducer = (state = [], {payload, type}) => {
    if(type === CREATE_PURCHASE) {
        return [...state,
            {info: payload, date: 'today' }
        ]
    }
    return state;
}