import { createStore } from 'redux';
import reducer from './components/orderBook/redusers/reducer';

const store = createStore(reducer);

export default store;