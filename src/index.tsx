import { createRoot } from 'react-dom/client';
import { Link, RouterProvider, createBrowserRouter } from 'react-router-dom';
import FlagChangeDemo from './demos/FlagChangeDemo';
import SuspenseDemo from './demos/SuspenseDemo';
import './index.css';
import reportWebVitals from './reportWebVitals';
import { CONTEXT_CHANGE_DEMO_NAME, FLAG_CHANGE_DEMO_NAME, SUSPENSE_DEMO_NAME } from './constants';
import ContextChangeDemo from './demos/ContextChangeDemo';


const router = createBrowserRouter([
  {
    path: '/',
    element: (
      <div className='menu'><h1>React Demos</h1>
      <nav>
        <Link title='Demo for suspending until the provider is ready.' to={SUSPENSE_DEMO_NAME}>Suspense</Link>
        <Link title='Demo for automatic updates when flag values change' to={FLAG_CHANGE_DEMO_NAME}>Flag change</Link>
        <Link title='Demo for re-render when context changes' to={CONTEXT_CHANGE_DEMO_NAME}>Context change</Link>
      </nav></div>
      
    ),
  },
  {
    path: SUSPENSE_DEMO_NAME,
    element: <SuspenseDemo />,
  },
  {
    path: FLAG_CHANGE_DEMO_NAME,
    element: <FlagChangeDemo />,
  },
  {
    path: CONTEXT_CHANGE_DEMO_NAME,
    element: <ContextChangeDemo />,
  },
]);

createRoot(document.getElementById('root')!).render(
  <RouterProvider router={router} />
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
