import { Navigate } from "react-router-dom";
import About from "../pages/About";
import Login from "../pages/Login";
import Posts from "../pages/Posts";
import OpenPost from "../pages/OpenPost";

export const publicRoutes = [{
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
}]

export const privateRoutes = [
    {
        path: 'posts',
        element: <Posts />,
    },
    {
        path: 'post/:id',
        element: <OpenPost />,
    },
]