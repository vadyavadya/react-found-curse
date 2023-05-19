import React, { useContext } from "react";
import { RouterProvider, createHashRouter, } from "react-router-dom";
import Error from "../pages/Error";
import { AuthContext } from "../context";
import Loader from "./loader/Loader";
import { publicRoutes, privateRoutes } from "../router";
import { MainPage } from "../pages/MainPage";



export default function AppRouter() {
    const { isAuth, isLoading } = useContext(AuthContext);

    if (isLoading) {
        return <Loader />
    }

    let treeRoute = publicRoutes;

    if (isAuth) treeRoute = privateRoutes;

    let router = createHashRouter([
        {
            path: '/',
            element: <MainPage />,
            children: [
                {
                    errorElement: <Error />,
                    children: [
                        ...treeRoute,
                    ],
                },
            ],
        },
    ]);

    return (
        <RouterProvider router={router} />
    );
}