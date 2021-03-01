import { CREATE_USER_ACCOUNT, SET_USER_NAME } from '../actions'

export const loginReducer = (state = {}, { payload, type }) => {
    switch (type) {
        case CREATE_USER_ACCOUNT:
            return (state = {
                ...state,
                email: payload.email,
                password: payload.password,
            })
        case SET_USER_NAME:
            return (state = {
                ...state,
                login: payload,
            })
        default:
            return state
    }
}
