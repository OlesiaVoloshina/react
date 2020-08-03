import React, {useCallback, useRef, useState} from 'react';
import Input from "../ui/Input/Input";

const SearchForm = (props) => {
    const delay = 500;
    let timer = 0;
    const inputRef = useRef();
    const handleSearchInput = useCallback((event) => {
        props.setValue(event.target.value);
        if(!timer) {
            timer = setTimeout(() => {
                props.onChange(inputRef.current.value);
                timer = 0;
            }, delay);
        }
    }, []);

    return <Input ref={inputRef} value={props.value} type="text" label={props.label} onChange={handleSearchInput}/>;
};
export default SearchForm;