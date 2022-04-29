import { lazy, Suspense } from 'react';

import { Routes, Route, Navigate } from 'react-router-dom';

import { AppRoute } from '../../utils/const';
import Loader from '../loader/loader';
import MainOutlet from '../main-outlet/main-outlet';

const Catalog = lazy(() => import('../../pages/catalog/catalog'));
const Product = lazy(() => import('../../pages/product/product'));
const Card = lazy(() => import('../../pages/card/card'));
const NotFound = lazy(() => import('../../pages/not-found/not-found'));

function App(): JSX.Element {
  return (
    <Suspense fallback={<Loader />}>
      <Routes>
        <Route path={AppRoute.Root} element={<MainOutlet />}>
          <Route index element={<Navigate to={`${AppRoute.Main}/page_1`} replace />} />
          <Route path={`${AppRoute.Catalog}/page_:number`} element={<Catalog />} />
          <Route path={`${AppRoute.Product}/:id`} element={<Product />} />
          <Route path={AppRoute.Card} element={<Card />} />
          <Route path={AppRoute.NotFound} element={<NotFound />} />
        </Route>
      </Routes>
    </Suspense>
  );
}

export default App;
