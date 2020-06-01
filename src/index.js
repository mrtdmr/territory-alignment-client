import React from 'react';
import ReactDOM from 'react-dom';
import { Router } from 'react-router-dom';
import './Containers/Layout/styles.css';
import { createBrowserHistory } from 'history';
import App from './Containers/Layout/App';
import * as serviceWorker from './serviceWorker';
import productReducer from './store/reducers/product';
import teamReducer from './store/reducers/team';
import marketReducer from './store/reducers/market';
import planReducer from './store/reducers/plan';
import cityReducer from './store/reducers/city';
import modalReducer from './store/reducers/modal';
import departmentReducer from './store/reducers/department';
import { createStore, applyMiddleware, compose, combineReducers } from 'redux';
import thunk from 'redux-thunk';
import { Provider } from 'react-redux';
import { default as ScrollToTop } from './components/ui/scrollToTop/scrollToTop';
import 'react-toastify/dist/ReactToastify.min.css';

const composeEnhancers =
  process.env.NODE_ENV === 'development'
    ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
    : null || compose;

const rootReducer = combineReducers({
  product: productReducer,
  team: teamReducer,
  market: marketReducer,
  plan: planReducer,
  city: cityReducer,
  department: departmentReducer,
  modal: modalReducer,
});
const store = createStore(
  rootReducer,
  composeEnhancers(applyMiddleware(thunk))
);

export const history = createBrowserHistory();
const app = (
  <Provider store={store}>
    <Router history={history}>
      <ScrollToTop>
        <App />
      </ScrollToTop>
    </Router>
  </Provider>
);

ReactDOM.render(app, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
