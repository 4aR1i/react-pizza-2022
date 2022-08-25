import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { store } from './redux/store';
import { Provider } from 'react-redux';

import './scss/index.scss';

import App from './App';

const elemRoot = document.getElementById('root');

if (elemRoot) {
  const root = ReactDOM.createRoot(elemRoot);
  root.render(
    <Provider store={store}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </Provider>,
  );
}
