import { lazy, Suspense } from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

//import BlogPage, { loader as postsLoader } from './pages/Blog';
import HomePage from './pages/Home';
//import PostPage, { loader as postLoader } from './pages/Post';
import RootLayout from './pages/Root';

// LazyLoad for components. The import functions returns a promise, so its needed to use lazy function too
const BlogPage = lazy(() => import('./pages/Blog'));
const PostPage = lazy(() => import('./pages/Post'));

const router = createBrowserRouter([
    {
        path: '/',
        element: <RootLayout />,
        children: [
            {
                index: true,
                element: <HomePage />,
            },
            {
                path: 'posts',
                children: [
                    {
                        index: true,
                        element: <Suspense fallback={<p>Loading...</p>}>
                            <BlogPage />
                        </Suspense>,  // Suspense is needed to wait for content to be loaded
                        loader: () => { // Lazyloading
                            return import('./pages/Blog').then(module => module.loader());
                        }
                    },
                    {
                        path: ':id',
                        element: <Suspense fallback={<p>Loading...</p>}>
                            <PostPage />
                        </Suspense>,
                        loader: ({ request, params }) => {
                            return import('./pages/Post').then(module => module.loader({ request, params }));
                        }
                    },
                ],
            },
        ],
    },
]);

function App() {
    return <RouterProvider router={router} />;
}

export default App;
