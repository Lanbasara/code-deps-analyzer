import { h } from 'preact';
import { Router } from 'preact-router';

// Code-splitting is automated for `routes` directory
import Home from '../routes/home';
import NetworkGraph from './network-graph';

const App = () => (
  <div id="app">
    <Router>
      <NetworkGraph path="/" />
    </Router>
  </div>
);

export default App;
