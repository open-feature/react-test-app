import { InMemoryProvider, OpenFeature, OpenFeatureProvider, useFeatureFlag } from "@openfeature/react-sdk";
import "./App.css";
import logo from "./logo.svg";

OpenFeature.setProvider(new InMemoryProvider({
  'new-message': {
    disabled: false,
    variants: {
      'on': true,
      'off': false,
    },
    defaultVariant: 'on'
  },
}));

function App() {
  return (
    <OpenFeatureProvider>
      <Page></Page>
    </OpenFeatureProvider>
  );
}

function Page() {
  const { value: showNewMessage } = useFeatureFlag("new-message", true);
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        {showNewMessage ? (
          <p>Welcome to this OpenFeature-enabled React app!</p>
        ) : (
          <p>Welcome to this React app.</p>
        )}
      </header>
    </div>
  );
}

export default App;
