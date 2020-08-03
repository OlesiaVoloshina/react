import React from 'react';
import {greaterThan, notEmpty} from "../validations/validations";
import Button from "../ui/Button/Button";
import {useForm} from "../hooks/useForm";
import Input from "../ui/Input/Input";

const WishForm = (props) => {
    const wishForm = {title: "", price: 0, description: "", imageUrl: ""};
    const {values, setValues, useInput, isValid} = useForm(wishForm);

    const onSubmit = (event) => {
        event.preventDefault();
        props.onWish(values);
    };

    const validators = {
        title: [{name: "required", errorMessage: "Title is required", isValid: (value) => notEmpty(value)}],
        price: [{name: "positive", errorMessage: "Price should be > 0", isValid: (value) => greaterThan(value, 0)}],
        imageUrl: [],
        description: []
    };

    return(
        <form onSubmit={onSubmit}>
            <div className="form-header">Make a wish:</div>
            <div className="form">
                <Input label="Title" type="text" {...useInput("title", validators.title)}/>
                <Input label="Image URL" type="text" {...useInput("imageUrl", validators.imageUrl)}/>
                <Input label="Price" type="number" {...useInput("price", validators.price)}/>
                <Input label="Description" type="text" {...useInput("description", validators.description)}/>
            </div>
            <div className="form-footer">
                <Button title="Submit" onClick={onSubmit} disabled={!isValid}/>
            </div>
        </form>);
};

export default WishForm;