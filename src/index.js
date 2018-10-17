//import 'bootstrap/dist/css/bootstrap.min.css';

import React from 'react';
import ReactDOM from "react-dom";
import App from "./js/components/App";
import { createStore,applyMiddleware  } from 'redux';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk'
import rootReducer from './js/reducers/rootReducer';
import './index.css';
// import 'bootstrap/dist/css/bootstrap.min.css';
const store = createStore(rootReducer,applyMiddleware(thunk));

ReactDOM.render(
  <Provider store={store}>
<App />
</Provider>,

  document.getElementById('root')
);
