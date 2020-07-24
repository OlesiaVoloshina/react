import {useCallback, useEffect, useState} from "react";

function validate(value, validators) {
    // no validators - field is always valid
    if(!validators) {
        return null;
    }
    // validator: isValid func + config
    let failedValidator = validators.find(validator => !validator.isValid(value));
    if(failedValidator) {
        return failedValidator.errorMessage;
    }
    return null;
}

export function useFormField ({name, validations = [], formData, setFormData, handleError}) {
    const formValue = formData[name];
    const [value, setValue] = useState();
    const [isValid, setIsValid] = useState(true);
    const [errorMessage, setErrorMessage] = useState(null);
    const [isTouched, setIsTouched] = useState(false);
    const [validators] = useState(validations);

    // handle field validation
    const handleValidation = useCallback(() => {
        const errorMessage = validate(value, validators);
        const isValid = errorMessage == null;
        setIsValid(isValid);
        setErrorMessage(errorMessage);
        handleError(name, isValid);
    }, [setIsValid, validators, name, value, handleError]);

    // watch for external parent data changes
    useEffect(() => {
        if (value !== formValue) {
            setValue(formValue);
            setIsTouched(false);
        }
    }, [formValue, value, setValue, setIsTouched]);

    // validate on value change
    useEffect(() => {
        handleValidation();
    }, [handleValidation, name]);

    // rewrite self and parent's value
    const handleChange = useCallback(({ target }) => {
        const newValue = target.value;
        let data = { ...formData, [name]: newValue };
        setValue(newValue);
        setFormData(data);
        setIsTouched(true);
    }, [setValue, formData, setFormData, name]);

    return {
        name: name,
        value: value,
        valid: isValid,
        touched: isTouched,
        errorMessage: errorMessage,
        onChange: handleChange,
    };
}