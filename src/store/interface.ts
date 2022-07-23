import { Action, AnyAction } from 'redux';

// T 为传递类型，K 为索引
export declare interface IAction<T = any, K = string> extends Action {
    type: string | symbol;
    payload?: T;
    error?: boolean;
    key?: K;
    subKey?: K;
    meta?: any;
}

export declare type Reducer<S = any, A extends Action = AnyAction> = (state: S, action: A) => S;

export declare type NamespacedReducer<S = any, A extends Action = AnyAction> = (
    state: S,
    action: A,
    totalState: any,
) => S;

export declare interface ModuleStore {
    namespace: string;
    reducer: Reducer<any, IAction>;
    initStates?: Record<string, any>;
}

export {};
