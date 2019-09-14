import React from 'react';
import ReactDOM from 'react-dom';
import Amplify, { Storage } from 'aws-amplify';

import 'semantic-ui-css/semantic.min.css';

import Routes from './routes';
import './animations.css';
import './global.css';
import * as serviceWorker from './serviceWorker';
import AWS_EXPORTS from './aws-exports';

Amplify.configure(AWS_EXPORTS);
Storage.configure({ level: 'public' });

ReactDOM.render(<Routes />, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
