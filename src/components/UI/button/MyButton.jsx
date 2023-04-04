import React from "react";
import classstyle from "./MyButton.module.css"

const MyButton = ({ children, ...props }) => {

    return (
        <button {...props} className={classstyle.myButton}>
            {children}
        </button>
    )
}

export default MyButton;