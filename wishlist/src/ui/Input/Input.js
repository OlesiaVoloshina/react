import React from 'react';
import classes from './Input.module.scss'

const input = React.forwardRef((props, ref) => {
    let value = props.value ? props.value : '';
    let cssClasses = [classes.Input];
    if (props.touched) {
        cssClasses.push(props.valid ? classes.Valid : classes.Invalid);
    }
    const css = cssClasses.join(' ');
    let error = props.errorMessage && props.touched ? <span className={classes.ErrorMessage}>{props.errorMessage}</span> : null;
    return (
        <div className={classes.FormGroup}>
            <span className={classes.Label}>{props.label}</span>
            <input ref={ref} type={props.type} onChange={props.onChange} className={css} value={value}/>
            {error}
        </div>
    );
});
export default input;