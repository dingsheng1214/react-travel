import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import {actionLog} from './middlewares/actionLog';

import languageReducer from './language/languageReducer'
import productReducer from './product/productReducer'

const rootReducer = combineReducers({
    language: languageReducer,
    product: productReducer
});
export const RootStore = createStore(rootReducer, applyMiddleware(thunk, actionLog));

// 获取一个函数的返回值类型
export type RootState = ReturnType<typeof RootStore.getState>;
