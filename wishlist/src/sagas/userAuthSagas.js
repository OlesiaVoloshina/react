import {authAxios, apiKey} from '../axios/authConfig';
import apiAxios from "../axios/apiConfig";
import {
    loadingFinishedAction, loadingStartedAction,
    authErrorAction, authSuccessAction,
    userLoadedAction, logoutSuccessAction
} from "../actions/actions";
import {LOGIN_START, LOGOUT_START, REGISTER_START} from "../actions/actionTypes";
import {takeEvery, put} from "redux-saga/effects";
import {readObject} from "../utils";


export function* loginSaga(action) {
    try {
        yield put(loadingStartedAction());
        const response = yield authAxios.post('/accounts:signInWithPassword?key=' + apiKey, {
            email: action.login,
            password: action.password
        });
        yield handleAuthData(response);
        yield put(loadingFinishedAction());
    } catch (error) {
        const errorMessage = error.response ? error.response.data.error.message : "unknown error";
        yield put(loadingFinishedAction(errorMessage));
        yield put(authErrorAction(errorMessage));
    }
}

export function* registerSaga(action) {
    try {
        yield put(loadingStartedAction());
        // create credentials
        const response = yield authAxios.post('/accounts:signUp?key=' + apiKey, {
            email: action.login,
            password: action.password
        });
        // create user data
        const userData = yield {uid: response.data.localId, name: action.name, birthdate: action.birthdate};
        yield apiAxios.post('/users.json', userData);

        yield handleAuthData(response);
        yield put(loadingFinishedAction());
    } catch (error) {
        const errorMessage = error.response ? error.response.data.error.message : "unknown error";
        yield put(loadingFinishedAction(errorMessage));
        yield put(authErrorAction(errorMessage));
    }
}


export function* logoutSaga(action) {
    yield localStorage.removeItem("token");
    yield localStorage.removeItem("localId");
    yield localStorage.removeItem("uid");
    yield put(logoutSuccessAction());

}

function* handleAuthData(response) {
    yield localStorage.setItem("token", response.data.idToken);
    yield localStorage.setItem("localId", response.data.localId);
    yield put(authSuccessAction(response.data.localId, response.data.idToken));
    yield loadUser(response.data.localId);
}

export function* checkAuth() {
    const token = yield localStorage.getItem("token");
    const localId = yield localStorage.getItem("localId");
    if(token && localId) {
        yield put(authSuccessAction(localId, token));
        yield loadUser(localId);
    }
}

function* loadUser(localId) {
    const response = yield apiAxios.get('/users.json?orderBy="uid"&equalTo="' + localId + '"');
    const user = readObject(response.data);
    yield localStorage.setItem("uid", user.id);
    yield put(userLoadedAction(user));
}

export function* watchAuth() {
    yield takeEvery(LOGIN_START, loginSaga);
    yield takeEvery(REGISTER_START, registerSaga);
    yield takeEvery(LOGOUT_START, logoutSaga);
}