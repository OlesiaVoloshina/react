import {LOADING_START, LOADING_FINISH, HIDE_ERROR} from "../actions/actionTypes";

export default function loading(state = {loading: false, error: null}, action) {
    let newState;
    switch (action.type) {
        case LOADING_START:
            newState = {loading: true, error: null};
            return newState;
        case LOADING_FINISH:
            newState = {loading: false, error: action.error};
            return newState;
        case HIDE_ERROR:
            newState = {...state, error: null};
            return newState;
        default:
            return state;
    }
}