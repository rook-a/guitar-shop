import { lazy, Suspense } from 'react';

import { Routes, Route } from 'react-router-dom';

import { AppRoute } from '../../utils/const';

const Catalog = lazy(() => import('../../pages/catalog/catalog'));
const Product = lazy(() => import('../../pages/product/product'));
const Card = lazy(() => import('../../pages/card/card'));

function App(): JSX.Element {
  return (
    <Suspense>
      <Routes>
        <Route path={AppRoute.Catalog} element={<Catalog />} />
        <Route path={`${AppRoute.Guitars}/:id`} element={<Product />} />
        <Route path={AppRoute.Card} element={<Card />} />
        <Route path={AppRoute.NotFound} element={<p> 404. Not Found</p>} />
      </Routes>
    </Suspense>
  );
}

export default App;
