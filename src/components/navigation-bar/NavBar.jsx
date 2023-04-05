import React from "react";
import { Link, Outlet } from "react-router-dom";
import cls from "./NavBar.module.css"

export default function NavBar() {

    return (
        <>
            <div className={cls.container}>
                <nav className={cls.panel} >
                    <ul className={cls.list}>
                        <Link className={cls.item} to={'/posts'}>Посты</Link>
                        <Link className={cls.item} to={'/about'}>О нас</Link>
                    </ul>
                </nav>

                <Outlet />
            </div>

        </>


    )
}