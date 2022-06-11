import React, { ReactNode, FC } from 'react';
import { IMenuItem } from 'src/interface';
import { NavigateFunction } from 'react-router-dom';
import routerConfig, { IRouterItem } from './router.config';
import * as IconPark from '@ant-design/icons';

interface IconProps {
    name: string;
}

const Icon: FC<IconProps> = props => {
    const { name } = props;
    const IconEL = (IconPark as any)[name];
    if (IconEL) return <IconEL className="layout-menu-icon" size="16" />;
    if (name.startsWith('http')) {
        return <img src={name} className="layout-menu-icon" />;
    }
    return <div dangerouslySetInnerHTML={{ __html: name }} className="layout-menu-icon"></div>;
};

const transformMenuList = (list: IRouterItem[], navigator: NavigateFunction) => {
    const menuList = [] as IMenuItem[];
    for (const route of list) {
        if (route.hidden || route.index) continue;
        let menuItem = null;
        if (route.children) {
            const childRoute = route.children.find(v => v.index === true);
            menuItem = createMenu({ ...route, ...childRoute, isClick: true }, navigator);
            menuItem = [menuItem, ...transformMenuList(route.children, navigator)];
        } else {
            // menuItem = createMenu({...route})
            const [pIcon, cIcon] = splitPath(route.icon || '');
            const [pPath] = splitPath(route.path || '');
            const [pLabel, cLabel] = splitPath(route.label);
            // 存在cIcon、cLabel 代表存在children
            menuItem =
                menuList.length > 0
                    ? menuList[0]
                    : createMenu({ label: pLabel, icon: pIcon, path: pPath }, navigator);
            if (cIcon && cLabel) {
                const c = createMenu(
                    { icon: cIcon, label: cLabel, path: route.path, isClick: true },
                    navigator,
                );
                menuItem.children =
                    menuItem.children && menuItem.children.length > 0
                        ? [...menuItem.children, c]
                        : [c];
            }
        }
        if (Array.isArray(menuItem)) {
            const list = [] as IMenuItem[];
            for (const item of menuItem) {
                if (list.length === 0 || !list.some(i => i.label === item.label)) {
                    list.push(item);
                }
            }
            menuList.push(...list);
        } else {
            menuList.push(menuItem);
        }
    }
    return menuList;
};

// 切割path /a/b => ['a','b']
const splitPath = (path: string): string[] => {
    if (path.length === 1) return [path];
    path = path[0] === '/' ? path.slice(1) : path;
    return path.split('/');
};

const createMenu = (
    route: IRouterItem & { isClick?: boolean },
    navigator: NavigateFunction,
): IMenuItem => {
    const menuItem: IMenuItem = {
        label: route.label,
        key: route.path,
        path: route.path,
        icon: <Icon name={`${route.icon}`} />,
    };
    route.isClick &&
        (menuItem.onClick = () => {
            navigator(route.path || '/');
        });
    return menuItem;
    // return {
    //     label:route.label,
    //     key: route.path,
    //     path: route.path,
    //     icon: <Icon name={`${route.icon}`}/>,
    //     onClick: () => {navigator( route.path || '/')}
    // }
};

export const initMenuItem = (navigator: NavigateFunction, menuList?: IMenuItem[]) => {
    if (menuList && menuList.length > 0) {
        return menuList.map(item => ({
            ...item,
            onClick: () => navigator(item.path || '/'),
        }));
    }
    return transformMenuList(routerConfig, navigator);
};

export default [
    {
        label: '首页',
        key: '/',
        path: '/',
        icon: 'HomeOutlined',
    },
    {
        label: '文章操作',
        key: '/articles',
        icon: 'ContainerOutlined',
        children: [
            {
                label: '文章列表',
                key: '/articles/list',
                path: '/articles/list',
                icon: 'FileTextOutlined',
            },
        ],
    },
];
