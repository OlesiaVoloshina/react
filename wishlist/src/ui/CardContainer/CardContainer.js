import React from 'react';
import classes from './CardContainer.module.css'

const cardContainerComponent = (props) => {
    const className = props.layout === 'column' ? classes.ColumnCardContainer : classes.FlexCardContainer;
    return (
        <div className={className}>{props.children.length > 0 ? props.children : "No records found"}</div>
    )
};

export default cardContainerComponent;