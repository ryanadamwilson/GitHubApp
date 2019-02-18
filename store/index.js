import { createStore, applyMiddleware } from 'redux';
import thunkMiddleware from 'redux-thunk';
import { createLogger } from 'redux-logger';
import reducers from './reducers';

const middlewares = [thunkMiddleware];
const loggerMiddleware = createLogger();
middlewares.push(loggerMiddleware);

export default createStore(reducers, applyMiddleware(...middlewares));
