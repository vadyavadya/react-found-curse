import React, { useContext, useEffect } from "react";
import { Navigate, RouterProvider, createBrowserRouter, redirect } from "react-router-dom";
import Error from "../pages/Error";
import NavBar from "./navigation-bar/NavBar";
import Posts from "../pages/Posts";
import About from "../pages/About";
import OpenPost from "../pages/OpenPost";
import Index from "../pages/Index";
import Login from "../pages/Login";
import { AuthContext } from "../context";
import Loader from "./loader/Loader";

export default function AppRouter() {

    const { isAuth, isLoading } = useContext(AuthContext);

    if (isLoading) {
        return <Loader />
    }

    let router = createBrowserRouter([
        {
            path: '/',
            element: <NavBar />,
            errorElement: <Error />,
            children: [
                {
                    errorElement: <Error />,
                    children: [
                        {
                            path: 'login',
                            element: <Login />
                        },
                        {
                            path: 'about',
                            element: <About />,
                        },
                        {
                            path: '*',
                            element: <Navigate to='/login' replace />
                        }
                    ],
                },

            ],
        },
        {
        },
    ]);

    if (isAuth) {
        router = createBrowserRouter([
            {
                path: '/',
                element: <NavBar />,
                errorElement: <Error />,
                children: [
                    {
                        errorElement: <Error />,
                        children: [
                            {
                                path: 'index',
                                element: <Index />
                            },
                            {
                                path: 'posts',
                                element: <Posts />,
                            },
                            {
                                path: 'post/:id',
                                element: <OpenPost />,
                            },
                            {
                                path: 'about',
                                element: <About />,
                            },
                            {
                                path: '*',
                                element: <Navigate to='/index' replace />
                            }
                        ],
                    },

                ],
            },
            {
            },
        ]);
    }

    return (
        <RouterProvider router={router} />
    );
}