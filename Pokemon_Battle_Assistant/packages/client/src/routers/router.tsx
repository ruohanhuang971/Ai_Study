import { createBrowserRouter } from 'react-router';
import type { RouteObject } from 'react-router-dom';
import App from '../App';
import Home from '../pages/home/Home';

const routes: RouteObject[] = [
    {
        path: '/',
        element: <App />, // entry point
        children: [
            {
                path: '/',
                element: <Home />,
            },
        ],
    },
];

// Create the router
const router = createBrowserRouter(routes);

export default router;
