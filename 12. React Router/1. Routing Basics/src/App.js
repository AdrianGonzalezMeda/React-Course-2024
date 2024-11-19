import { createBrowserRouter, RouterProvider, createRoutesFromElements, Route } from 'react-router-dom';
import HomePage from './pages/Home';
import ProductsPage from './pages/Products';
import RootLayout from './pages/Root';
import ErrorPage from './pages/Error';
import ProductDetailPage from './pages/ProductDetail';

/*
This is the old way to define routes
const routeDefinitions = createRoutesFromElements(
    <Route>
        <Route path='/' element={<HomePage />} />
        <Route path='/products' element={<Products />} />
    </Route>
);

const router = createBrowserRouter(routeDefinitions);
*/

// Even HomePage its in a "routes" folder, its like the components folder, but the name change for organization porpouses
// This is how we create routes in the latest version
const router = createBrowserRouter([
    {
        path: '/', // The path int children element can be absolut, using /. Or relative, without / (relative to the parent route). Its the same with Link and NavLink
        element: <RootLayout />,
        errorElement: <ErrorPage />,
        children: [
            { index: true, element: <HomePage /> }, // index: true its like path: '/'||path: '', its to define the displayed element when match the exact parent route
            { path: '/products', element: <ProductsPage /> },
            { path: '/products/:productId', element: <ProductDetailPage /> } //Dynamic urls
        ]
    }
]);

function App() {
    return <RouterProvider router={router} />;
}

export default App;
