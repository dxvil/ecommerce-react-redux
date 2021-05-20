import {CREATE_USER_ACCOUNT, LOGIN, SET_USER_NAME} from '../actions'
const initialState = {}
export const loginReducer = (state = initialState, { payload, type }) => {
    switch (type) {
        case CREATE_USER_ACCOUNT:
            return {
                ...state,
                userEmail: payload.email,
                userPassword: payload.password,
            }
        case SET_USER_NAME:
            return {
                ...state,
                login: payload,
                isLog: true,
            }
        case LOGIN:
            return {
                ...state,
                login: payload
            }
        default:
            return state
    }
}
