import {
  EvaluationContext,
  InMemoryProvider,
  OpenFeature,
  OpenFeatureProvider,
  useBooleanFlagValue
} from "@openfeature/react-sdk";
import { Suspense } from "react";
import { useSearchParams } from "react-router-dom";
import { SUSPENSE_DEMO_EXPLANATION, SUSPENSE_DEMO_NAME } from "../constants";
import hourglass from "../hourglass.svg";
import logo from "../logo.svg";
import "./Demo.css";

const PROVIDER_NAME = SUSPENSE_DEMO_NAME;

/**
 * This component is associated with a provider that becomes ready after a few seconds.
 * It demonstrates the "Suspense" support of the React SDK.
 */
function SuspenseDemo() {
  const [searchParams] = useSearchParams();

  OpenFeature.setProvider(
    PROVIDER_NAME,
    new DelayedInMemoryProvider(
      {
        "new-message": {
          disabled: false,
          variants: {
            on: true,
            off: false,
          },
          defaultVariant: "on",
        },
      },
      Number.parseInt(searchParams.get("delay") || "3000")
    )
  );

  return (
    // This page is scoped to the "suspense" provider.
    // Enable suspense for this context (can be overridden in hooks).
    <OpenFeatureProvider domain={PROVIDER_NAME} suspend={true}>
      <Content />
    </OpenFeatureProvider>
  );
}

function Content() {
  return (
    <div className="Demo">
      <header className="Demo-header">
        <p className="Demo-description small-text bounded-text">{SUSPENSE_DEMO_EXPLANATION}</p>
        <Suspense fallback={<Fallback />}>
          <Spinner />
        </Suspense>
      </header>
    </div>
  );
}

function Spinner() {
  // evaluate flag with basic API
  const showNewMessage = useBooleanFlagValue("new-message", false);

  return (
    <>
      <img src={logo} className="Demo-logo Demo-spin" alt="logo" />
      {showNewMessage ? (
        <p>Welcome to this OpenFeature-enabled React app!</p>
      ) : (
        <p>Welcome to this React app.</p>
      )}
    </>
  );
}

function Fallback() {
  return (
    <>
      <img src={hourglass} className="Demo-logo Fallback-img" alt="hourglass" />
      <p>Waiting for provider to be ready...</p>
    </>
  );
}

/**
 * A provider who's initialize is delayed for 'delay' seconds to demonstrate the React SDK's Suspense features.
 */
class DelayedInMemoryProvider extends InMemoryProvider {
  constructor(
    flagConfiguration: ConstructorParameters<typeof InMemoryProvider>[0],
    private delay: number
  ) {
    super(flagConfiguration);
  }

  // artificially delay our init (delaying PROVIDER_READY event)
  async initialize(context?: EvaluationContext | undefined): Promise<void> {
    await new Promise((resolve) => setTimeout(resolve, this.delay));
    return super.initialize(context);
  }
}

export default SuspenseDemo;
