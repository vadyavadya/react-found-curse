import React from "react";
import { Link } from "react-router-dom";

export default function Error() {

    return (
        <div>
            <h1 style={{ color: 'red' }}>
                Вы пришли на не существующую страницу
            </h1>
            <Link to='/'>Home </Link>
        </div>
    )
}
