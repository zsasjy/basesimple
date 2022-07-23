import React from 'react';
import { IState } from 'src/store';
import { useSelector } from 'react-redux';
export default function Articles() {
    const state = useSelector((state: IState) => state.home);
    return <div>文章列表 + {state.count}</div>;
}
