import { h } from 'preact';
import { Router } from 'preact-router';

// Code-splitting is automated for `routes` directory
import NetworkGraph from './network-graph';

const App = () => (
  <div id="app">
    <Router>
      <NetworkGraph path="/" />
    </Router>
  </div>
);

export default App;
