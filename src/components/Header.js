import React from "react";

const Header = (props) => {

    const {
        title = '',
        subtitle = '',
        className = ""
    } = props;

    return (
        <div className={`header ${className}`}>
            <h2>{title}</h2>
            <h3>{subtitle}</h3>
        </div>
    );
};

export default Header;
