import React from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter} from 'react-router-dom';
import './index.scss';
import App from './App';
import * as serviceWorker from './serviceWorker';
import createSagaMiddleware from 'redux-saga'
import {applyMiddleware, combineReducers, compose, createStore} from "redux";
import authReducer from "./reducers/authReducer";
import loadingReducer from "./reducers/loadReducer";
import {Provider} from "react-redux";
import {checkAuth, watchAuth} from "./sagas/userAuthSagas";

const sagaMiddleware = createSagaMiddleware();
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const enhancer = composeEnhancers(applyMiddleware(sagaMiddleware));
const store = createStore(combineReducers({loading: loadingReducer, auth: authReducer}), enhancer);

sagaMiddleware.run(watchAuth);
sagaMiddleware.run(checkAuth);

ReactDOM.render(
    <React.StrictMode>
        <Provider store={store}>
            <BrowserRouter>
                <App/>
            </BrowserRouter>
        </Provider>
    </React.StrictMode>,
    document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
