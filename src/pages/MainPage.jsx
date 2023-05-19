import React from "react";
import '../style/App.css'
import { Outlet } from "react-router-dom";
import NavBar from "../components/navigation-bar/NavBar";

export const MainPage = () => {
    return (
        <div className="page">
            <header className="header">
                <NavBar />
            </header>
            <main className="main">
                <Outlet />
            </main>
            <footer className="footer">
                <div className="container">
                    Vadim Sergeev
                </div>
            </footer>
        </div>
    )
}
