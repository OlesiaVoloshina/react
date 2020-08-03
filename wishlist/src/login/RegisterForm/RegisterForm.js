import React, {Fragment} from 'react';
import {minLength, notEmpty} from "../../validations/validations";
import Button from "../../ui/Button/Button";
import {useForm} from "../../hooks/useForm";
import Input from "../../ui/Input/Input";
import {Redirect} from "react-router";
import {registerStartAction} from "../../actions/actions";
import {connect} from "react-redux";

const RegisterForm = (props) => {
    const registerForm = {login: "", password: "", name: "", birthdate: new Date(1984, 6, 28)};
    const {values, setValues, useInput, isValid} = useForm(registerForm);


    const onSubmit = (event) => {
        event.preventDefault();
        console.log("Register: " + values.login + ", " + values.password + ', ' + values.name + ", " + values.birthdate);
        props.onRegister(values.login, values.password, values.name, values.birthdate);
    };

    const validators = {
        login: [{name: "required", errorMessage: "Login is required", isValid: (value) => notEmpty(value)},
            {name: "minLength", errorMessage: "Login length should be > 3", isValid: (value) => minLength(value, 3)}],
        password: [{name: "required", errorMessage: "Password is required", isValid: (value) => notEmpty(value)},
            {
                name: "minLength",
                errorMessage: "Password length should be > 6",
                isValid: (value) => minLength(value, 6)
            }],
        name: [{name: "required", errorMessage: "Name is required", isValid: (value) => notEmpty(value)}],
        birthdate: [],
    };

    const redirect = props.loggedIn ? <Redirect to="/"/> : null;
    return (
        <Fragment>
            {redirect}
            <form onSubmit={onSubmit}>
                <div className="form-header">Create your account:</div>
                <div className="form">
                    <Input label="Login" type="text" {...useInput("login", validators.login)}/>
                    <Input label="Password" type="text" {...useInput("password", validators.password)}/>
                    <Input label="Name" type="text" {...useInput("name", validators.name)}/>
                    <Input label="Your birthdate" type="date" {...useInput("birthdate", validators.birthdate)}/>
                </div>
                <div className="form-footer"><Button title="Enter" onClick={onSubmit} disabled={!isValid}/></div>
            </form>
        </Fragment>
        );
};


const mapStateToProps = (state) => {
return {loggedIn: state.auth.loggedIn};
};


const dispatchActions = dispatch => {
    return {
    onRegister: (login, password, name, birthdate) => dispatch(registerStartAction(login, password, name, birthdate))
}
};

export default connect(mapStateToProps, dispatchActions)(RegisterForm);