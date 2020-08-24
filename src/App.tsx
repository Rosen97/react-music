import React from 'react';
import {Provider} from 'react-redux';
import store from './store/index';
import RouterMaps from './routes/index';
import {renderRoutes} from 'react-router-config';
import {HashRouter} from 'react-router-dom';
import './styles/index.scss';

function App() {
  return (
    <Provider store={store}>
      <HashRouter>
        {renderRoutes(RouterMaps)}
      </HashRouter>
    </Provider>
  );
}

export default App;
