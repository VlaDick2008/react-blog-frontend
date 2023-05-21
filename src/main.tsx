import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import ReactDOM from 'react-dom/client';
import './styles/index.css';
import { UserContextProvider } from './context/UserContext.tsx';

import LoginPage from './components/pages/LoginPage.tsx';
import RegisterPage from './components/pages/RegisterPage.tsx';
import Layout from './components/Layout.tsx';
import App from './App.tsx';
import CreatePostPage from './components/pages/CreatePostPage.tsx';
import PostPage from './components/pages/PostPage.tsx';
import EditPostPage from './components/pages/EditPostPage.tsx';
import DeletePostPage from './components/pages/DeletePostPage.tsx';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    children: [
      {
        path: '/',
        element: <App />,
      },
      {
        path: '/login',
        element: <LoginPage />,
      },
      {
        path: '/register',
        element: <RegisterPage />,
      },
      {
        path: '/create',
        element: <CreatePostPage />,
      },
      {
        path: '/post/:id',
        element: <PostPage />,
      },
      {
        path: '/post/:id/edit',
        element: <EditPostPage />,
      },
      {
        path: '/post/:id/delete',
        element: <DeletePostPage />,
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <UserContextProvider>
    <RouterProvider router={router} />
  </UserContextProvider>,
);
