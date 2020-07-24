import { authAxios, apiKey } from '../axios/authConfig';
import apiAxios from "../axios/apiConfig";
import {
    loadingFinishedAction, loadingStartedAction,
    authErrorAction, authSuccessAction,
    userLoadedAction
} from "../actions/actions";
import {LOGIN_START, REGISTER_START} from "../actions/actionTypes";
import {takeEvery, put} from "redux-saga/effects";


export function* loginSaga(action) {
    try {
        yield put(loadingStartedAction());
        const response = yield authAxios.post('/accounts:signInWithPassword?key=' + apiKey, {email: action.login, password: action.password});
        yield handleAuthData(response);
        yield put(loadingFinishedAction());
    } catch(error) {
        const errorMessage = error.response ? error.response.data.error.message : "unknown error";
        yield put(loadingFinishedAction(errorMessage));
        yield put(authErrorAction(errorMessage));
    }
}

export function* registerSaga(action) {
    try {
        yield put(loadingStartedAction());
        // create credentials
        const response = yield authAxios.post('/accounts:signUp?key=' + apiKey, {email: action.login, password: action.password});
        // create user data
        const userData = yield {uid: response.data.localId, name: action.name, birthdate: action.birthdate};
        yield apiAxios.post('/users.json', userData);

        yield handleAuthData(response);
        yield put(loadingFinishedAction());
    } catch(error) {
        const errorMessage = error.response ? error.response.data.error.message : "unknown error";
        yield put(loadingFinishedAction(errorMessage));
        yield put(authErrorAction(errorMessage));
    }
}

function* handleAuthData(response) {
    yield localStorage.setItem("token", response.data.idToken);
    yield localStorage.setItem("localId", response.data.localId);
    yield put(authSuccessAction(response.data.localId, response.data.idToken));
    yield loadUser(response.data.localId);
}


function* loadUser(localId) {
    const response = yield apiAxios.get('/users.json?orderBy="uid"&equalTo="'+localId+'"');
    let uid = Object.keys(response.data)[0];
    yield localStorage.setItem("uid", uid);
    console.log(uid);
    let user = {... response.data[uid], uid: uid};
    console.log(user);
    yield put(userLoadedAction(user));
}

export function* watchAuth() {
    yield takeEvery(LOGIN_START, loginSaga);
    yield takeEvery(REGISTER_START, registerSaga);
}