import {LOADING_START, LOADING_FINISH, HIDE_ERROR} from "../actions/actionTypes";

export default function loading(state = {loading: false, loaderCounter: 0, error: null}, action) {
    let newState;
    let loaderCounter = state.loaderCounter;
    switch (action.type) {
        case LOADING_START:
            loaderCounter ++;
            newState = {loaderCounter: loaderCounter, loading: loaderCounter > 0, error: null};
            return newState;
        case LOADING_FINISH:
            loaderCounter --;
            newState = {loaderCounter: loaderCounter, loading: loaderCounter > 0, error: action.error};
            return newState;
        case HIDE_ERROR:
            newState = {...state, error: null};
            return newState;
        default:
            return state;
    }
}