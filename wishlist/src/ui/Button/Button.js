import React from 'react';
import classes from './Button.module.scss'
const button = (props) => {
    return (
        <button className={classes.Button} disabled={props.disabled}  onClick={props.onClick}>{props.title}</button>
    )
};
export default button;