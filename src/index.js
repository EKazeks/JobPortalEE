import React from 'react';
import ReactDOM from 'react-dom';
import { Router } from 'react-router-dom';
import history from './history';

import './styles/index.css';
import './utils/i18n';
import RootComponent from './root';

ReactDOM.render(
  // In order to use useLocation hook in metaInfo component for canonical url.
  // Hint:: You can't use any of the hooks from within the same component that puts the Router into the tree. You need to move your BrowserRouter out of that component. It can go in the ReactDOM.render() call, for instance.
  <Router history={history}>
    <RootComponent />
  </Router>,
  document.getElementById('root'),
);
