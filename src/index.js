import 'babel-polyfill';
import React from 'react';
import ReactDOM from 'react-dom';
import ReactGA from 'react-ga';

import App from './components/App';

import './styles.css';

ReactGA.initialize('UA-191786186-1');
ReactGA.pageview(window.location.pathname + window.location.search);

ReactDOM.render(<App />, document.getElementById('root'));
