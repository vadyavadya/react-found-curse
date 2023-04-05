import React from "react";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Error from "../pages/Error";
import NavBar from "./navigation-bar/NavBar";
import Posts from "../pages/Posts";
import About from "../pages/About";

export default function AppRouter() {
    
    const router = createBrowserRouter([
        {
            path: '/',
            element: <NavBar />,
            errorElement: <Error />,
            children: [
                {
                    path: '/posts',
                    element: <Posts />,
                },
                {
                    path: '/about',
                    element: <About />,
                },
            ],
        },
    ]);

    return (
        <RouterProvider router={router} />
    );
}