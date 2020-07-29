import React, {Fragment} from 'react';
import {minLength, notEmpty} from "../../validations/validations";
import Button from "../../ui/Button/Button";
import {useForm} from "../../hooks/useForm";
import Input from "../../ui/Input/Input";
import {loginStartAction} from "../../actions/actions";
import {connect} from "react-redux";
import {Redirect} from "react-router";

const LoginForm = (props) => {
    const loginForm = {login: "", password: ""};
    const {values, setValues, useInput, isValid} = useForm(loginForm);


    const onSubmit = (event) => {
        event.preventDefault();
        console.log("Login: " + values.login + ", " + values.password);
        props.onLogin(values.login, values.password);
    };

    const validators = {
        login: [{name: "required", errorMessage: "Login is required", isValid: (value) => notEmpty(value)},
            {name: "minLength", errorMessage: "Login length should be > 3", isValid: (value) => minLength(value, 3)}],
        password: [{name: "required", errorMessage: "Password is required", isValid: (value) => notEmpty(value)}]
    };

    const redirect = props.loggedIn ? <Redirect to="/"/> : null;
    return(
        <Fragment>
        {redirect}
        <form onSubmit={onSubmit}>
            <div className="form">
                <Input label="Login" type="text" {...useInput("login", validators.login)}/>
                <Input label="Password" type="password" {...useInput("password", validators.password)}/>
                <Button title="Enter" onClick={onSubmit} disabled={!isValid}/>
            </div>
        </form>
        </Fragment>);
};

const mapStateToProps = (state) => {
    return {loggedIn: state.auth.loggedIn};
};

const dispatchActions = dispatch => {
    return {
        onLogin: (login, password) => dispatch(loginStartAction(login, password))
    }
};

export default connect(mapStateToProps, dispatchActions)(LoginForm);