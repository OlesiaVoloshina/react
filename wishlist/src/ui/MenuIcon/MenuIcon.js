import React from 'react';
import './MenuIcon.scss'

const menuIconComponent = (props) => {
    const className = props.open ? "menu-icon open" : "menu-icon";
    return (
        <div className={className} onClick={props.onClick}>
            <span></span>
            <span></span>
            <span></span>
        </div>
    )
};

export default menuIconComponent;