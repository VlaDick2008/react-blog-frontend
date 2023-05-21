import { Outlet } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';

import Header from './Header';

const Layout = () => {
  return (
    <main className="max-w-7xl m-auto p-5">
      <Toaster />
      <Header />
      <Outlet />
    </main>
  );
};

export default Layout;
