import React from "react";
import NavBar from "../components/navigation-bar/NavBar";

export default function Error() {

    return (
        <div>
            <NavBar />
            <h1 style={{ color: 'red' }}>
                Вы пришли на не существующую страницу
            </h1>
        </div>
    )
}
