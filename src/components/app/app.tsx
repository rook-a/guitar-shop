import { lazy, Suspense } from 'react';

import { Routes, Route } from 'react-router-dom';

import { AppRoute } from '../../utils/const';

const Main = lazy(() => import('../../pages/main/main'));
const Product = lazy(() => import('../../pages/product/product'));
const Card = lazy(() => import('../../pages/card/card'));

function App(): JSX.Element {
  return (
    <Suspense>
      <Routes>
        <Route index element={<Main />} />
        <Route path={`${AppRoute.Product}:id`} element={<Product />} />
        <Route path={AppRoute.Card} element={<Card />} />
        <Route path={AppRoute.NotFound} element={<p> 404. Not Found</p>} />
      </Routes>
    </Suspense>
  );
}

export default App;
