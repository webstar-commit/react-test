import {createStore, applyMiddleware} from 'redux';
import reducer from './reducers';

const middleWare = [];
const createStoreWithMiddleware = applyMiddleware(...middleWare)(createStore);

export default createStoreWithMiddleware(reducer);
