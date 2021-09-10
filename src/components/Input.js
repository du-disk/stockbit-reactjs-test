import React from "react";

const Input = (props) => {

    const {
        onChange = () => { },
        name,
        type = "text",
        value = "",
        className = "",
        placeholder = ""
    } = props;

    return (
        <input
            type={type}
            name={name}
            onChange={onChange}
            placeholder={placeholder}
            className={`input ${className}`}
            {...value}
        />
    );
};

export default Input;
