import {
  EvaluationContext,
  InMemoryProvider,
  OpenFeature,
  OpenFeatureProvider,
  useBooleanFlagDetails,
  useFlag,
} from "@openfeature/react-sdk";
import { Suspense } from "react";
import { useSearchParams } from "react-router-dom";
import {
  CONTEXT_CHANGE_DEMO_EXPLANATION,
  CONTEXT_CHANGE_DEMO_NAME,
} from "../constants";
import hourglass from "../hourglass.svg";
import logo from "../logo.svg";
import "./Demo.css";

const PROVIDER_NAME = CONTEXT_CHANGE_DEMO_NAME;

/**
 * A component associated with a provider that becomes ready after a few seconds.
 * It demonstrates the "Suspense" support of the React SDK.
 */
function ContextChangeDemo() {
  const [searchParams] = useSearchParams();

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
          return "on";
        }
        return "off";
      },
    },
  };

  const provider = new DelayedContextUpdateProvider(
    flagConfig,
    Number.parseInt(searchParams.get("delay") || "0")
  );

  // Set our provider, give it a name matching the scope of our OpenFeatureProvider below
  OpenFeature.setProvider(PROVIDER_NAME, provider);

  return (
    // This page is scoped to the "suspense" provider.
    <OpenFeatureProvider domain={PROVIDER_NAME} suspend={true}>
      <Content />
    </OpenFeatureProvider>
  );
}

function Content() {
  return (
    <div className="Demo">
      <header className="Demo-header">
        <p className="Demo-description small-text bounded-text">{CONTEXT_CHANGE_DEMO_EXPLANATION}</p>
        <ContextChangeButton />
        <Suspense fallback={<Fallback />}>
          <Spinner />
        </Suspense>
      </header>
    </div>
  );
}

function ContextChangeButton() {
  return (
    <span>
      <span>Click </span>
      <button
        onClick={() => {
          OpenFeature.setContext(PROVIDER_NAME, {
            silly: !OpenFeature.getContext(PROVIDER_NAME).silly,
          });
        }}
      >
        here
      </button>
      <span> to modify the evaluation context</span>
    </span>
  );
}

function Spinner() {
  // evaluate flag with react-query style API
  const { value: goFast } = useFlag("go-fast", false);

  return (
    <>
      <img
        src={logo}
        className="Demo-logo Demo-spin"
        style={{
          padding: 20,
          animation: goFast ? "spin infinite 1s linear" : "",
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

/**
 * A provider who's onContextChange is delayed for 'delay' seconds to demonstrate the React SDK's Suspense features.
 */
class DelayedContextUpdateProvider extends InMemoryProvider {
  constructor(
    flagConfiguration: ConstructorParameters<typeof InMemoryProvider>[0],
    private delay: number
  ) {
    super(flagConfiguration);
  }

  // override to artificially delay our context change for demo purposes
  async onContextChange(
    oldContext: EvaluationContext,
    newContext: EvaluationContext
  ): Promise<void> {
      await new Promise((resolve) => setTimeout(resolve, this.delay)).then(() => {
    });
  }
}

function Fallback() {
  return (
    <>
      <img src={hourglass} className="Demo-logo Fallback-img" alt="hourglass" />
      <p>Waiting for provider context-update...</p>
    </>
  );
}

export default ContextChangeDemo;
