import { default as reducer } from './reducers';
import { initStates } from './initState';
export type { State } from './initState';

export default {
    namespace: 'home',
    initStates,
    reducer,
};

export * from './actions';
