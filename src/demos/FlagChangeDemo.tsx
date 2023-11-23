import {
  InMemoryProvider,
  OpenFeature,
  OpenFeatureProvider,
  useBooleanFlagDetails
} from '@openfeature/react-sdk';
import { useEffect } from 'react';
import { FLAG_CHANGE_DEMO_NAME } from '../constants';
import logo from '../logo.svg';
import './Demo.css';

const PROVIDER_NAME = FLAG_CHANGE_DEMO_NAME;
const newMessageName = 'new-message';

/**
 * A component associated with a provider whose flags change every 2 seconds.
 * It demonstrates the React SDKs ability to dynamically react to flag changes from the provider.
 */
function FlagChangeDemo() {

  const flagConfig = {
    [newMessageName]: {
      disabled: false,
      variants: {
        on: true,
        off: false,
      },
      defaultVariant: 'on',
    },
  };
  const provider = new InMemoryProvider();

  // Set our provider, give it a name matching the scope of our OpenFeatureProvider below
  OpenFeature.setProvider(PROVIDER_NAME, provider);

  // Start an interval to change the flag vales every 2s.
  const interval = window.setInterval(() => {
    flagConfig[newMessageName].defaultVariant = flagConfig[newMessageName].defaultVariant === 'on' ? 'off' : 'on';
    provider.putConfiguration(flagConfig);
  }, 2000);

  useEffect(() => {
    return () => {
      window.clearInterval(interval);
    }
  });

  return (
    // This page is scoped to the "flag-change" provider.
    <OpenFeatureProvider clientName={PROVIDER_NAME}>
      <Content />
    </OpenFeatureProvider>
  );
}

function Content() {
  return (
    <div className='Demo'>
      <header className='Demo-header'>
        <img src={logo} className='Demo-logo' alt='logo' />
          {/* The Message component evaluates a feature flag.
          The component markup will be update dynamically when the provider emits a flag-change event. */}
          <Message />
      </header>
    </div>
  );
}

function Message() {
  const { value: showNewMessage } = useBooleanFlagDetails(newMessageName, true);

  return (
    <>
      {showNewMessage ? (
        <p>Welcome to this new, exciting React app!</p>
      ) : (
        <p>Welcome to this boring React app.</p>
      )}
    </>
  );
}

export default FlagChangeDemo;
