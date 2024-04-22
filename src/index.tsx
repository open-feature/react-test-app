import { createRoot } from "react-dom/client";
import { Link, RouterProvider, createBrowserRouter } from "react-router-dom";
import FlagChangeDemo from "./demos/FlagChangeDemo";
import SuspenseDemo from "./demos/SuspenseDemo";
import "./index.css";
import reportWebVitals from "./reportWebVitals";
import {
  CONTEXT_CHANGE_DEMO_NAME,
  CONTEXT_CHANGE_DEMO_DESCRIPTION,
  FLAG_CHANGE_DEMO_NAME,
  FLAG_CHANGE_DEMO_DESCRIPTION,
  SUSPENSE_DEMO_NAME,
  SUSPENSE_DEMO_DESCRIPTION,
} from "./constants";
import ContextChangeDemo from "./demos/ContextChangeDemo";

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <div className="menu">
        <h1>React Demos</h1>
        <p className="small-text bounded-text">
          The{" "}
          <a href="https://www.npmjs.com/package/@openfeature/react-sdk">
            @openfeature/react-sdk
          </a>{" "}
          is built on the{" "}
          <a href="https://www.npmjs.com/package/@openfeature/web-sdk">
            @openfeature/web-sdk
          </a>
          , and adds additional react-specific APIs and features. The{" "}
          <a href="https://openfeature.dev/specification/sections/flag-evaluation">
            evaluation API
          </a>{" "}
          is exposed through the "useFlag" hooks. The hooks automatically
          re-render when flags change, and feature optional{" "}
          <a href="https://react.dev/reference/react/Suspense">suspense</a>
          -support while flags are not ready to be evaluated.
        </p>
        <nav>
          <Link
            title={SUSPENSE_DEMO_DESCRIPTION}
            to={{
              pathname: SUSPENSE_DEMO_NAME,
              search: "delay=2000",
            }}
          >
            Suspense<div>{SUSPENSE_DEMO_DESCRIPTION}</div>
          </Link>
          <Link
            title={FLAG_CHANGE_DEMO_DESCRIPTION}
            to={{
              pathname: FLAG_CHANGE_DEMO_NAME,
              search: "delay=1000",
            }}
          >
            Flag change<div>{FLAG_CHANGE_DEMO_DESCRIPTION}</div>
          </Link>
          <Link
            title={CONTEXT_CHANGE_DEMO_DESCRIPTION}
            to={{
              pathname: CONTEXT_CHANGE_DEMO_NAME,
              search: "delay=0",
            }}
          >
            Context change <div>{CONTEXT_CHANGE_DEMO_DESCRIPTION}</div>
          </Link>
        </nav>
      </div>
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

createRoot(document.getElementById("root")!).render(
  <RouterProvider router={router} />
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
