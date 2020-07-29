import React from 'react';
import classes from './HelloUser.module.scss'

const helloUser = (props) => {
    return (
            props.user ?
            <div className={classes.Info}>
                Hello, {props.user.name}!
            </div> : null
    )
};

export default helloUser;