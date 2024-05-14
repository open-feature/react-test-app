import {
  InMemoryProvider,
  OpenFeature,
  OpenFeatureProvider,
  useBooleanFlagDetails,
} from "@openfeature/react-sdk";
import { useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import {
  FLAG_CHANGE_DEMO_EXPLANATION,
  FLAG_CHANGE_DEMO_NAME
} from "../constants";
import logo from "../logo.svg";
import "./Demo.css";

const PROVIDER_NAME = FLAG_CHANGE_DEMO_NAME;
const newMessageName = "new-message";

/**
 * This component is associated with a provider whose flags change every 2 seconds.
 * It demonstrates the React SDKs ability to dynamically react to flag changes from the provider.
 */
function FlagChangeDemo() {
  const [searchParams] = useSearchParams();

  const flagConfig = {
    [newMessageName]: {
      disabled: false,
      variants: {
        on: true,
        off: false,
      },
      defaultVariant: "off",
    },
  };
  const provider = new InMemoryProvider(flagConfig);

  // set our provider, give it a name matching the scope of our OpenFeatureProvider below
  OpenFeature.setProvider(PROVIDER_NAME, provider);

  // start an interval to change the flag vales every 2s for demo purposes
  const interval = window.setInterval(() => {
    flagConfig[newMessageName].defaultVariant =
      flagConfig[newMessageName].defaultVariant === "on" ? "off" : "on";
    provider.putConfiguration(flagConfig);
  }, Number.parseInt(searchParams.get("delay") || "2000"));

  useEffect(() => {
    return () => {
      window.clearInterval(interval);
    };
  });

  return (
    // this page is scoped to the "flag-change" provider.
    <OpenFeatureProvider domain={PROVIDER_NAME}>
      <Content />
    </OpenFeatureProvider>
  );
}

function Content() {
  return (
    <div className="Demo">
      <header className="Demo-header">
        <p className="Demo-description small-text bounded-text">{FLAG_CHANGE_DEMO_EXPLANATION}</p>
        <Spinner />
      </header>
    </div>
  );
}

function Spinner() {
  // evaluate flag with detailed API
  const { value: showNewMessage } = useBooleanFlagDetails(newMessageName, false);

  return (
    <>
      <img
        src={logo}
        className={showNewMessage ? "Demo-logo Demo-spin" : "Demo-logo"}
        alt="logo"
      />
      {showNewMessage ? (
        <p>Welcome to this OpenFeature-enabled React app!</p>
      ) : (
        <p>Welcome to this React app.</p>
      )}
    </>
  );
}

export default FlagChangeDemo;
