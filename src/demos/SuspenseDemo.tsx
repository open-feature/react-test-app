import {
  EvaluationContext,
  InMemoryProvider,
  OpenFeature,
  OpenFeatureProvider,
  useBooleanFlagValue,
} from '@openfeature/react-sdk';
import { Suspense } from 'react';
import { useSearchParams } from 'react-router-dom';
import { SUSPENSE_DEMO_NAME } from '../constants';
import logo from '../logo.svg';
import './Demo.css';

const PROVIDER_NAME = SUSPENSE_DEMO_NAME;

/**
 * A component associated with a provider that becomes ready after a few seconds.
 * It demonstrates the "Suspense" support of the React SDK.
 */
function SuspenseDemo() {
  const [searchParams] = useSearchParams();

  // Set our "delayed" provider, give it a name matching the scope of our OpenFeatureProvider below
  OpenFeature.setProvider(
    PROVIDER_NAME,
    new DelayedInMemoryProvider(
      {
        'new-message': {
          disabled: false,
          variants: {
            on: true,
            off: false,
          },
          defaultVariant: 'on',
        },
      },
      Number.parseInt(searchParams.get('delay') || '3000')
    )
  );

  return (
    // This page is scoped to the "suspense" provider.
    <OpenFeatureProvider domain={PROVIDER_NAME}>
      <Content />
    </OpenFeatureProvider>
  );
}

function Content() {
  return (
    <div className='Demo'>
      <header className='Demo-header'>
        <img src={logo} className='Demo-logo' alt='logo' />
        {/* Components within this element will cause the "fallback" to be displayed 
        if they use feature flags and the provider is not ready */}
        <Suspense fallback={<Fallback />}>
          <Message />
        </Suspense>
      </header>
    </div>
  );
}

function Message() {
  const showNewMessage = useBooleanFlagValue('new-message', false);

  return (
    <>
      {showNewMessage ? (
        <p>Welcome to this OpenFeature-enabled React app!</p>
      ) : (
        <p><br/></p>
      )}
    </>
  );
}

function Fallback() {
  return <p>Waiting for provider to be ready...</p>;
}

/**
 * A provider that is intentionally delayed for 'delay' seconds to demonstrate the React SDK's Suspense features.
 */
class DelayedInMemoryProvider extends InMemoryProvider {
  constructor(
    private flagConfiguration: ConstructorParameters<typeof InMemoryProvider>[0],
    private delay: number
  ) {
    super({});
  }

  async initialize(context?: EvaluationContext | undefined): Promise<void> {
    await new Promise((resolve) => setTimeout(resolve, this.delay));
    this.putConfiguration(this.flagConfiguration!);
    return super.initialize(context);
  }
}

export default SuspenseDemo;
