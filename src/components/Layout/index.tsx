import React, { useState, useEffect, useContext } from 'react';
import { Breadcrumb, Layout, Menu, message } from 'antd';
import { initMenuItem } from 'src/config/menus.config';
import { useNavigate, Outlet } from 'react-router-dom';
import { hasUrlSearchParams } from 'src/utils';
import { ProjectInfoContext } from 'src/App';
import HeaderContainer from './components/Header';
import './index.less';

const { Header, Content, Footer, Sider } = Layout;

export default function LayoutContainer() {
    const [collapsed, setCollapsed] = useState(false);
    const hideNav = hasUrlSearchParams('hideNav');
    const navigate = useNavigate();
    const { userInfo, menuList } = useContext(ProjectInfoContext);
    const menusList = initMenuItem(navigate);
    const [selectedKeys, setSelectedKeys] = useState<string[]>([]);

    useEffect(() => {
        if (!userInfo.username) {
            message.warning('当前未登录，请登录后访问');
            navigate(
                `/login?direction=${encodeURI(
                    window.location.pathname + window.location.search + window.location.hash,
                )}`,
            );
        }
    }, [userInfo]);

    useEffect(() => {
        console.log('menuList : ', menuList);
        console.log(location.pathname);
        setSelectedKeys([`${location.pathname}`]);
    }, [location.pathname, menuList]);

    return (
        <Layout style={{ minHeight: '100vh' }}>
            {!hideNav && (
                <Sider
                    collapsible
                    collapsed={collapsed}
                    onCollapse={(value: boolean) => setCollapsed(value)}
                >
                    <div className="layout-logo" />
                    <Menu
                        theme="dark"
                        defaultOpenKeys={[`/${location.pathname.split('/')[1]}`]}
                        mode="inline"
                        items={menusList as any}
                        selectedKeys={selectedKeys}
                    />
                </Sider>
            )}
            <Layout className="layout-wrapper">
                <Header className="layout-header" style={{ padding: 0 }}>
                    <HeaderContainer info={userInfo} />
                </Header>
                <Content style={{ margin: '0 16px' }}>
                    <Breadcrumb style={{ margin: '12px 0' }}>
                        <Breadcrumb.Item>首页</Breadcrumb.Item>
                    </Breadcrumb>
                    <div className="layout-container" style={{ padding: 24, minHeight: 360 }}>
                        <Outlet />
                    </div>
                </Content>
                <Footer className="layout-footer">Ant Design ©2022 Created by zsasjy</Footer>
            </Layout>
        </Layout>
    );
}
