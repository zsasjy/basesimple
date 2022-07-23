declare module 'src/store' {
    interface IState {
        home: State;
    }
}

export const initStates = {
    count: 1,
};

export type State = typeof initStates;
