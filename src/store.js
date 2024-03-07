import { applyMiddleware, combineReducers, compose, createStore } from 'redux';
import accountReducer from './features/accounts/accountSlice';
import customerReducer from './features/customers/customerSlice';
import { thunk } from 'redux-thunk';
import { composeWithDevTools } from '@redux-devtools/extension/';

const rootReducer = combineReducers({
  account: accountReducer,
  customer: customerReducer,
});

//Appling thunk
const store = createStore(
  rootReducer,
  composeWithDevTools(applyMiddleware(thunk))
);

export default store;
