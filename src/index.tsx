import React from 'react';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';

import { store } from './store/store';
import HistoryRouter from './components/history-router/history-router';
import { browserHistory } from './browser-history';

import App from './components/app/app';
import { fetchGuitarsAction } from './store/guitars-slice/guitars-slice';
import { START_PAGE_NUMBER } from './utils/const';

const container = document.getElementById('root') as HTMLElement;
const root = createRoot(container);

store.dispatch(fetchGuitarsAction(START_PAGE_NUMBER));

root.render(
  <React.StrictMode>
    <Provider store={store}>
      <HistoryRouter history={browserHistory}>
        <App />
      </HistoryRouter>
    </Provider>
  </React.StrictMode>,
);
