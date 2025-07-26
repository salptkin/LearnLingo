import { Suspense, lazy } from 'react';
import { Route, Routes } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import { Loader } from './components/Loader/Loader';
import PrivateRoutes from "./components/PrivateRoutes/PrivateRoutes"

const PageLayout = lazy(() => import('./components/PageLayout/PageLayout'));
const Home = lazy(() => import('./pages/HomePage/HomePage'));
const Teachers = lazy(() => import('./pages/TeachersPage/TeachersPage'));
const Favorite = lazy(() => import('./pages/FavoritesPage/FavoritesPage'));
const NotFoundPage = lazy(() => import('./pages/NotFoundPage/NotFoundPage'));

function App() {
  return (
    <>
      <Suspense fallback={<Loader />}>
        <Routes>
          <Route path="/" element={<PageLayout />}>
            <Route index element={<Home />} />
            <Route path="teachers" element={<Teachers />} />
            <Route
              path="favorite"
              element={
                <PrivateRoutes>
                  <Favorite />
                </PrivateRoutes>
              }
            />
            <Route path="*" element={<NotFoundPage />} />
          </Route>
        </Routes>
      </Suspense>
      <ToastContainer />
    </>
  );
}

export default App;