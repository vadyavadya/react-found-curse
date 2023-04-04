import React from "react";
import cl from "./Loader.module.css"

const Loader = () => {

    return (
        <div className={cl.Loader}>
            <div className={cl.Loader__body}></div>
        </div>
    )
}

export default Loader;