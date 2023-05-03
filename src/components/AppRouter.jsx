import React, { useContext } from "react";
import { Navigate, RouterProvider, createHashRouter, } from "react-router-dom";
import Error from "../pages/Error";
import NavBar from "./navigation-bar/NavBar";
import Posts from "../pages/Posts";
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

    let publicRoute = [
        {
            path: 'login',
            element: <Login />
        },
        {
            index: true,
            element: <Navigate to='/login' replace />
        },
        {
            path: '*',
            element: <Navigate to='/login' replace />
        },
    ]

    if (isAuth) {
        publicRoute = [
            {
                path: 'home',
                element: <Index />,
            },
            {
                index: true,
                element: <Navigate to='/home' replace />
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
                path: '*',
                element: <Index />,
            },
        ];
    }

    // let router = createBrowserRouter([
    //     {
    //         path: '/',
    //         element: <NavBar />,
    //         children: [
    //             {
    //                 errorElement: <Error />,
    //                 children: [
    //                     ...publicRoute,
    //                 ],
    //             },
    //         ],
    //     }
    // ]);

    let router = createHashRouter([
        {
            path: '/',
            element: <NavBar />,
            children: [
                {
                    errorElement: <Error />,
                    children: [
                        ...publicRoute,
                    ],
                },
            ],
        },
    ]);

    return (
        <RouterProvider router={router} />
    );
}