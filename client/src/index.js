import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './component/App';
import * as serviceWorker from './serviceWorker';
import { BrowserRouter} from 'react-router-dom';
import {createStore,applyMiddleware} from 'redux';
import {Provider} from 'react-redux';
import promiseMiddleware from 'redux-promise';
import reduxThunk from 'redux-thunk';
import Reducers from './reducers';
import './bootstrap/css/bootstrap.min.css';
import './bootstrap/css/bootstrap.css';
//import 'bootstrap/dist/css/bootstrap-theme.css';
const createStoreWithMiddleware = applyMiddleware(promiseMiddleware,reduxThunk)(createStore);


ReactDOM.render(
  <Provider store={createStoreWithMiddleware(Reducers)}>
<BrowserRouter>
<App />
</BrowserRouter>
 </Provider>
,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
