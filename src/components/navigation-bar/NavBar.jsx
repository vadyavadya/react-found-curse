import React, { useContext } from "react";
import { NavLink } from "react-router-dom";
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
    <div className="container">
      <nav className={cls.panel} >
        <ul className={cls.list}>
          <li>
            <NavLink
              className={({ isActive }) =>
                isActive ? cls.item + ' ' + cls.active : cls.item
              }
              to={'/home'} >
              Главная
            </NavLink>
          </li>
          <li>
            <NavLink
              className={({ isActive }) =>
                isActive ? cls.item + ' ' + cls.active : cls.item
              }
              to={'/posts'} >
              Посты
            </NavLink>
          </li>
        </ul>
        {
          isAuth
          && (
            <MyButton onClick={exit}>Выйти</MyButton>
          )
        }
      </nav>
    </div >
  )
}