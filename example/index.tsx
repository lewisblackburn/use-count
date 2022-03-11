import 'react-app-polyfill/ie11';
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { useCount } from '../.';

const App = () => {
  const { value: hits } = useCount('namespace', 'key');

  return <p>{hits}</p>;
};

ReactDOM.render(<App />, document.getElementById('root'));
