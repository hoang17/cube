import 'react-hot-loader/patch';
import React from 'react';
import ReactDOM from 'react-dom';

import { AppContainer } from 'react-hot-loader';
import App from './App';

// import './index.css';
// import Bootstrap from 'bootstrap/dist/css/bootstrap.css';

// ReactDOM.render(
//   <App />,
//   document.getElementById('root')
// );

const render = Component => {
  ReactDOM.render(
    <AppContainer>
      <Component />
    </AppContainer>,
    document.getElementById('root')
  );
}

render(App);

if (module.hot) {
  module.hot.accept('./App', () => { render(App) });
}
