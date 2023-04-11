import React, { useContext, useEffect } from "react";
import MyInput from "../components/input/MyInput";
import MyButton from "../components/UI/button/MyButton";
import { AuthContext } from "../context";



export default function Login() {
    const { isAuth, setAuth } = useContext(AuthContext);


    function login(e) {
        e.preventDefault();
        setAuth(true);
        localStorage.setItem('auth', 'true');
    }

    

    return (
        <form onSubmit={login}>
            <MyInput type='text' placeholder='Логин'></MyInput>
            <MyInput type='password' placeholder='Пароль'></MyInput>
            <MyButton>Войти</MyButton>
        </form>
    )
}