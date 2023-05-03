import React, { useContext } from "react";
import { Link, Outlet } from "react-router-dom";
import cls from "./NavBar.module.css"
import MyButton from "../UI/button/MyButton";
import { AuthContext } from "../../context";

export default function NavBar() {
  const { isAuth, setAuth } = useContext(AuthContext);
  function exit(e) {
    e.preventDefault();
    setAuth(false);
    localStorage.removeItem('auth');
  }


  return (
    <>
      <div className={cls.container}>
        <nav className={cls.panel} >
          <ul className={cls.list}>
            <li>
              <Link className={cls.item} to={'/home'}>Главная</Link>
            </li>
            <li>
              <Link className={cls.item} to={'/posts'}>Посты</Link>
            </li>
            {
              isAuth
              && (<li>
                <MyButton onClick={exit}>Выйти</MyButton>
              </li>)
            }
          </ul>
        </nav>
        <Outlet />
      </div>
    </>
  )
}