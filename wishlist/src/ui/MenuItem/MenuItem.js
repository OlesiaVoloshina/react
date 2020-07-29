import React from 'react';
import classes from './MenuItem.module.scss'
import {withRouter} from "react-router";
import {NavLink} from "react-router-dom";

const menuItemComponent = (props) => {
    const className = props.selected ? classes.MenuItem + " " + classes.selected : classes.MenuItem;
    return (
        props.path ?
            <NavLink key={props.key}
                     className={classes.MenuItem}
                     activeClassName={classes.MenuItem + " " + classes.selected}
                     to={props.path}
                     onClick={props.onClick}>
                {props.children}
            </NavLink> :
            <div key={props.key} className={className} onClick={props.onClick}>{props.children}</div>
    )
};

export default withRouter(menuItemComponent);