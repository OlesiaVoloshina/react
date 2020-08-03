import React from 'react';
import classes from './Button.module.scss'
const button = (props) => {
    const classNames = [classes.Button];
    if(props.disabled) {
        classNames.push(classes.Inactive);
    }

    return (
        <button {...props} className={classNames.join(" ")} disabled={props.disabled}  onClick={props.onClick}>{props.title}</button>
    )
};
export default button;