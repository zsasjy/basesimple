import React, { CSSProperties, lazy, LazyExoticComponent, Suspense } from 'react';
import { RouteObject } from 'react-router-dom';
import { Spin } from 'antd';

const initStyle = {
    minHeight: 'calc(100vh - 156px)',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
};

const lazyLoad = (Comp: LazyExoticComponent<() => JSX.Element>, style: CSSProperties = {}) => (
    <Suspense
        fallback={
            <div style={{ ...style, ...initStyle }}>
                <Spin tip="Loading..." />
            </div>
        }
    >
        <Comp />
    </Suspense>
);

export interface IRouterItem extends RouteObject {
    label: string;
    icon?: string;
    children?: IRouterItem[];
    hidden?: boolean;
}

// Layout 内容区router
const containerRouter = () => [
    {
        index: true,
        label: '首页',
        icon: 'HomeOutlined',
        element: lazyLoad(lazy(() => import('../components/Home'))),
    },
    {
        path: '/articles/list',
        label: '文章操作/文章列表',
        icon: 'ContainerOutlined/FileTextOutlined',
        element: lazyLoad(lazy(() => import('../components/Articles'))),
    },
];

// 外层router
const baseRouter = (style?: CSSProperties) => [
    {
        path: '/',
        element: lazyLoad(
            lazy(() => import('../components/Layout')),
            style,
        ),
        children: [...containerRouter()],
    },
    {
        path: '/login',
        element: lazyLoad(
            lazy(() => import('../components/Login')),
            style,
        ),
        hidden: true,
    },
    { path: '*', element: lazyLoad(lazy(() => import('../components/NotFound'))), hidden: true },
];

const routerConfig = (style?: CSSProperties) => baseRouter(style) as IRouterItem[];

export default routerConfig({ height: '100vh' });
