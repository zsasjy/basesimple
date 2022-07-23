import { Action } from 'redux';
import { IAction, Reducer } from './interface';

type IReducersMapObject<S = any, A extends Action = IAction> = {
    [key: string]: Reducer<S, A>;
};

export function moduleReducer<S = any, A extends Action = IAction<any>>(
    reducers: IReducersMapObject<S, A>,
    initStates: S,
): Reducer<S, A> {
    return (state = initStates, action: A) => {
        if (Object.keys(reducers).includes(action.type)) {
            const reducer = reducers[action.type];
            const value = reducer(state, action);
            if (value) return value;
            return state;
        } else {
            return state;
        }
    };
}

export function globalReducer<T>(
    actionType: string,
    initState: T,
): (reducer: Reducer<T, IAction>) => Reducer<any, IAction> {
    return reducer =>
        (state = initState, action) => {
            if (actionType === action.type) {
                return reducer(state, action);
            }
            return state;
        };
}

export function addActionPrefix(prefix: string, actions: { [key: string]: string }) {
    for (const key in actions) {
        actions[key] = prefix + actions[key];
    }
}
