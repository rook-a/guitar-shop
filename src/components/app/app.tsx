import { lazy, Suspense } from 'react';

import { Routes, Route, Navigate } from 'react-router-dom';

import { AppRoute } from '../../utils/const';
import MainOutlet from '../main-outlet/main-outlet';

const Catalog = lazy(() => import('../../pages/catalog/catalog'));
const Product = lazy(() => import('../../pages/product/product'));
const Card = lazy(() => import('../../pages/card/card'));

function App(): JSX.Element {
  return (
    <Suspense
      fallback={
        <div>
          <p>Loading...</p>
        </div>
      }>
      <Routes>
        <Route path={AppRoute.Root} element={<MainOutlet />}>
          <Route index element={<Navigate to={AppRoute.Main} />} />
          <Route path={AppRoute.Catalog} element={<Catalog />} />
          <Route path={`${AppRoute.Product}/:id`} element={<Product />} />
          <Route path={AppRoute.Card} element={<Card />} />
          <Route path={AppRoute.NotFound} element={<p> 404. Not Found</p>} />
        </Route>
      </Routes>
    </Suspense>
  );
}

export default App;
