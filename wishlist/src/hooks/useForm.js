import {useCallback, useEffect, useState} from "react";
import {useFormField} from "./useFormField";

export function useForm (defaultValues) {
    const [values, setValues] = useState(defaultValues);
    const [mounted, setMounted] = useState(false);
    const [errorFields, setErrorFields] = useState([]);

    const handleError = useCallback((fieldName, isValid) => {
        const index = errorFields.findIndex(error => error === fieldName);
        // change error state for field
        if (!isValid) {
            if (index < 0) errorFields.push(fieldName);
        } else {
            if (index > -1) errorFields.splice(index, 1);
        }
        setErrorFields(errorFields);
    }, [errorFields]);

    useEffect(() => {
        setMounted(true);
    }, []);

    const useInput = (name, validation) => useFormField({
        name: name,
        validations: validation,
        formData: values,
        setFormData: setValues,
        handleError: handleError
    });

    return {
        values,
        setValues,
        useInput,
        isValid: mounted && !errorFields.length
    };
}