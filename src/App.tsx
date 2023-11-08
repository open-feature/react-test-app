import { OpenFeatureProvider, useFeatureFlag } from "@openfeature/react-sdk";
import "./App.css";
import logo from "./logo.svg";

function App() {
  return (
    <OpenFeatureProvider>
      <Page></Page>
    </OpenFeatureProvider>
  );
}

function Page() {
  const { value: showNewMessage } = useFeatureFlag("thing", true);
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
