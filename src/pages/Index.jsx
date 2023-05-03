import React from "react";
import Game from "../components/game/Game";

export default function Index() {

    return (
        <div>
            <p style={{ textAlign: 'center' }}>
                Вы попали на главную страницу можете поиграть в крестики нолики
            </p>
            <Game />
        </div>
    )
}