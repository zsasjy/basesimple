import { applyMiddleware, legacy_createStore, combineReducers, compose } from 'redux';
import thunk from 'redux-thunk';
import * as globalReducers from './reducers';
import HomeStore from 'src/components/Home/store';
// 添加子模块
const _modules: any[] = [HomeStore];

// 配置全局reducers
const _global = {
    ...globalReducers,
};

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export declare interface IState {}

// 获取子store的reducers
const moduleReducers = _modules.reduce((total, curr) => {
    if (curr.namespace) {
        return { ...total, [curr.namespace]: curr.reducer };
    } else {
        console.log('namespace is required in module');
    }
    return total;
}, {});

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
const composeEnhancers = window._REDUX_DEVTOOLS_EXTENSION_COMPOSE_ || compose;

export default legacy_createStore(
    combineReducers({
        ..._global,
        ...moduleReducers,
    }),
    composeEnhancers(applyMiddleware(thunk)),
);

export * from './interface';
