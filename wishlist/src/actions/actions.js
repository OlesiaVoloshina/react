import {
    LOGIN_START,
    REGISTER_START,
    AUTH_SUCCESS,
    AUTH_ERROR,
    LOADING_FINISH,
    LOADING_START,
    HIDE_ERROR,
    USER_LOADED
} from "./actionTypes";

export const loginStartAction = (login, password) => { return  {type: LOGIN_START, login: login, password: password}};
export const registerStartAction = (login, password, name, birthdate) => { return  {type: REGISTER_START, login: login, password: password, name: name, birthdate: birthdate}};
export const authSuccessAction = (uid, idToken) => { return  {type: AUTH_SUCCESS, userId: uid, token: idToken}};
export const authErrorAction = (error) => { return  {type: AUTH_ERROR, error: error}};


export const userLoadedAction = (user) => { return  {type: USER_LOADED, user: user}};

export const loadingStartedAction = () => { return  {type: LOADING_START}};
export const loadingFinishedAction = (error) => { return  {type: LOADING_FINISH, error: error}};
export const hideErrorAction = () => { return  {type: HIDE_ERROR}};