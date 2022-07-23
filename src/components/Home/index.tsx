import React, { useCallback } from 'react';
import { Dispatch } from 'redux';
import { IAction, IState } from 'src/store';
import { Actions } from './store';
import { Button } from 'antd';
import { useDispatch, useSelector } from 'react-redux';

export default function Home() {
    const dispatch = useDispatch<Dispatch<IAction>>();
    const state = useSelector((state: IState) => state.home);

    const addHandler = useCallback(() => {
        dispatch({
            type: Actions.updateState,
            payload: state.count + 1,
        });
    }, [dispatch, state.count]);
    return (
        <div>
            <div>首页内容</div>
            <p> {state.count} </p>
            <Button onClick={addHandler}>加一</Button>
        </div>
    );
}
