import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Home from './pages/Home';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Introduction from './pages/Introduction';
import PrivateRouteWrapper from './wrappers/PrivateRouteWrapper';
import PublicRouteWrapper from './wrappers/PublicRouteWrapper';
import { Toaster } from "./components/ui/sonner";

const router = createBrowserRouter([
  {
    path: '/',
    element: <Introduction />,
  },
  {
    path: '/login',
    element: 
      <PublicRouteWrapper>
        <Login />
      </PublicRouteWrapper>,
  },
  {
    path: '/signup',
    element: 
      <PublicRouteWrapper>
        <Signup />
      </PublicRouteWrapper>,
  },
  {
    path: '/home',
    element:
      <PrivateRouteWrapper> 
        <Home />
      </PrivateRouteWrapper>
  },
]);

function App() {
  return (
    <>
      <RouterProvider router={router} />
      <Toaster />
    </>
  );
}

export default App
