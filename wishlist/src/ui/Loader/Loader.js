import React from 'react';
import classes from './Loader.module.scss'
import {connect} from "react-redux";
const loader = (props) => {
    return (
        props.visible ?
        <div className={classes.LoaderBackground}>
            <div className={classes.Loader}>
                ...LOADING...
            </div>
        </div> : null
    )
};

const mapStateToProps = (state) => {
    return {visible: state.loading.loading};
};

export default connect(mapStateToProps, null)(loader);