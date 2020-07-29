import {
    AUTH_SUCCESS,
    AUTH_ERROR,
    USER_LOADED, LOGOUT_SUCCESS
} from "../actions/actionTypes";

export default function auth(state = {uid: null, token: null, user: null}, action) {
    let newState;
    switch (action.type) {
        case LOGOUT_SUCCESS:
            newState = {loggedIn: false, uid: null, token: null, user: null};
            return newState;
        case AUTH_SUCCESS:
            newState = {...state, loggedIn: true, uid: action.uid, token: action.token};
            return newState;
        case AUTH_ERROR:
            newState = {...state, loggedIn: false, uid: null, token: null};
            return newState;

        case USER_LOADED:
            newState = {...state, user: action.user};
            return newState;
        default:
            return state;
    }
}