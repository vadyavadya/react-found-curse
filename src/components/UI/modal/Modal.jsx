import React from "react";
import cls from "./Modal.module.css";

const MyModal = ({ children, visible, setVisible }) => {



    const classis = [cls.myModal];

    if (visible) {
        classis.push(cls.myModal_active)
    }

    return (
        <div className={classis.join(' ')} onClick={() => setVisible(false)}>
            <div className={cls.myModal__box} onClick={e => e.stopPropagation()} >
                {children}
            </div>
        </div>
    )
}

export default MyModal;