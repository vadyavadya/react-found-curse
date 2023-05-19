import { Navigate } from "react-router-dom";
import Login from "../pages/Login";
import Posts from "../pages/Posts";
import OpenPost from "../pages/OpenPost";
import Index from "../pages/Index";

export const publicRoutes = [
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

export const privateRoutes = [
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