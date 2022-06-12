import React, { useMemo } from 'react';
import { Avatar, Menu, Dropdown } from 'antd';
import { UserOutlined, SettingOutlined, LogoutOutlined } from '@ant-design/icons';
import { UserInfo } from 'src/interface';
import { Link, useNavigate } from 'react-router-dom';
import { cookie } from 'src/utils';
import './index.less';

interface IProps {
    info: UserInfo;
}

export default function HeaderContainer(props: IProps) {
    const { info } = props;

    const onLogout = () => {
        cookie.removeCookie(cookie.SESSION_REMEMBER);
        cookie.removeCookie(cookie.SESSION_TOKEN);
        window.location.href = '/login';
    };
    const menus = useMemo(
        () => [
            {
                key: 'personal',
                label: (
                    <Link to="/">
                        <UserOutlined className="header-menu-icon" />
                        个人中心
                    </Link>
                ),
            },
            {
                key: 'setting',
                label: (
                    <Link to="/">
                        <SettingOutlined className="header-menu-icon" />
                        设置
                    </Link>
                ),
            },
            {
                key: 'quit',
                label: (
                    <a onClick={onLogout}>
                        <LogoutOutlined className="header-menu-icon" />
                        退出
                    </a>
                ),
            },
        ],
        [],
    );

    return (
        <div className="header-container">
            <div className="header-wrapper"></div>
            <div className="header-personal">
                <Dropdown
                    trigger={['click']}
                    placement="bottomRight"
                    overlay={<Menu items={menus} />}
                >
                    <div className="header-dropdown">
                        <div className="header-avatar">
                            <Avatar size="large" src={info.avatar} icon={<UserOutlined />} />
                        </div>
                        <div className="header-name">{info.username}</div>
                    </div>
                </Dropdown>
            </div>
        </div>
    );
}
