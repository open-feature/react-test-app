import {
  EvaluationContext,
  InMemoryProvider,
  OpenFeature,
  OpenFeatureProvider,
  useBooleanFlagDetails
} from "@openfeature/react-sdk";
import { CONTEXT_CHANGE_DEMO_NAME } from "../constants";
import logo from "../logo.svg";
import "./Demo.css";

const PROVIDER_NAME = CONTEXT_CHANGE_DEMO_NAME;

/**
 * A component associated with a provider that becomes ready after a few seconds.
 * It demonstrates the "Suspense" support of the React SDK.
 */
function ContextChangeDemo() {
  const goFastName = "go-fast";
  const flagConfig = {
    [goFastName]: {
      disabled: false,
      variants: {
        on: true,
        off: false,
      },
      defaultVariant: "on",
      contextEvaluator: (context: EvaluationContext) => {
        if (context.silly) {
          return 'on';
        }
        return 'off'
      }
    },
  };

  const provider = new InMemoryProvider(flagConfig) ;

  // Set our provider, give it a name matching the scope of our OpenFeatureProvider below
  OpenFeature.setProvider(PROVIDER_NAME, provider);

  return (
    // This page is scoped to the "suspense" provider.
    <OpenFeatureProvider clientName={PROVIDER_NAME}>
      <Content />
    </OpenFeatureProvider>
  );
}

function Content() {
  return (
    <div className="Demo">
      <header className="Demo-header">
        <ContextChangeButton/>
        <Spinner />
      </header>
    </div>
  );
}

function ContextChangeButton() {
  return (
    <span>
      <span>Click </span>
      <button onClick={() => {
        OpenFeature.setContext(PROVIDER_NAME, { silly: !OpenFeature.getContext(PROVIDER_NAME).silly })
      }}>here</button>
      <span> to modify the evaluation context</span>
    </span>
  );
}

function Spinner() {
  const { value: goFast } = useBooleanFlagDetails("go-fast", true);

  return (
    <>
      <img
        src={logo}
        className="Demo-logo"
        style={{
          animation: goFast ? "Demo-logo-spin infinite 1s linear" : "",
        }}
        alt="logo"
      />
      {goFast ? (
        <p>Welcome to this silly React app!</p>
      ) : (
        <p>Welcome to this React app.</p>
      )}
    </>
  );
}

export default ContextChangeDemo;
