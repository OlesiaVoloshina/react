import React from 'react';
import classes from './Error.module.scss'
import {connect} from "react-redux";
import {hideErrorAction} from "../../actions/actions";
const error = (props) => {
    return (
        props.error ?
            <div className={classes.Error}>
                {props.error}
                <button className={classes.Close} onClick={props.onHide}>Hide</button>
            </div> : null
    )
};

const mapStateToProps = (state) => {
    return {error: state.loading.error};
};


const dispatchActions = dispatch => {
    return {
        onHide: () => dispatch(hideErrorAction())
    }
};

export default connect(mapStateToProps, dispatchActions)(error);