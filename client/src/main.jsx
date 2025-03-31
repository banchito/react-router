import {StrictMode} from 'react';
import {createRoot} from 'react-dom/client';
import {RouterProvider} from 'react-router/dom';
import {createBrowserRouter} from 'react-router';
import {router} from './router';
import './styles.css';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={createBrowserRouter(router)} />
  </StrictMode>
);
