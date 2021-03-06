import React from 'react';
import './App.scss';
import LoginForm from "./login/LoginForm/LoginForm";
import Loader from "./ui/Loader/Loader";
import Error from "./ui/Error/Error";
import RegisterForm from "./login/RegisterForm/RegisterForm";
import Layout from "./Layout/Layout";
import {connect} from "react-redux";
import {Redirect, Route, Switch} from "react-router";
import {logoutStartAction} from "./actions/actions";
import HelloUser from "./ui/HelloUser/HelloUser";
import Friends from "./friends/Friends";
import Wishes from "./wishes/Wishes";

const icon = "./assets/menuIcon.png";

function App(props) {
    const menuItems = [];
    const routes = [];

    if(props.loggedIn) {
        menuItems.push({id: "friends", name: "Friends", path: "/friends"});
        menuItems.push({id: "wishes", name: "Wishes", path: "/wishes"});
        menuItems.push({id: "logout", name: "Logout", clickHandler: props.onLogout});

        routes.push(<Route key="friends" path='/friends' component={Friends}/>);
        routes.push(<Route key="friendsWishes" path='/wishes/:friendId' component={Wishes}/>);
        routes.push(<Route key="wishes" path='/wishes' component={Wishes}/>);
        routes.push(<Redirect key="home" from="/" to="/wishes"/>);
    } else {
        menuItems.push({id: "login", name: "Login", path: "/login"});
        menuItems.push({id: "register", name: "Register", path: "/register"});
        routes.push(<Route key="login" path='/login' component={LoginForm}/>);
        routes.push(<Route key="register" path='/register' component={RegisterForm}/>);
        routes.push(<Redirect key="home" from="/" to="/login"/>);
    }

  return (
    <div className="App">
        <Layout menuItems={menuItems} title="My Wishes" icon={icon}>
            <HelloUser user={props.user}/>
            <Loader/>
            <Error/>
            <Switch>
                {routes}
            </Switch>
        </Layout>
    </div>
  );
}


const mapStateToProps = (state) => {
    return {
        loggedIn: state.auth.loggedIn,
        user: state.auth.user
    };
};

const dispatchActions = dispatch => {
    return {
        onLogout: () => dispatch(logoutStartAction())
    }
};

export default connect(mapStateToProps, dispatchActions)(App);
