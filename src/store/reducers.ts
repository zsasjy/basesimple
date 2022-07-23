import { globalReducer } from './tools';

declare module './index' {
    interface IState {
        test: number;
    }
}

export const test = globalReducer('testGlobal', 1)((state, action) => state + 1);
