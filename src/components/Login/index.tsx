import React, { useContext, useState, useMemo, useEffect } from 'react';
import { login } from './api';
import { Form, Tabs, Tooltip, Button, Checkbox, Input, message } from 'antd';
import { LockOutlined, UserOutlined } from '@ant-design/icons';
import LocalhostQRCode from 'src/assets/LocalhostQrCode.png';
import PcLoginSvg from 'src/assets/pc-bg.svg';
import QRCodeSvg from 'src/assets/qr-code.svg';
import Captcha from 'src/assets/captcha.png';
import { cookie, getUrlSearchParams } from 'src/utils';
import './index.less';
import { useNavigate, Link } from 'react-router-dom';
import { ProjectInfoContext } from 'src/App';
import { useLogin } from 'src/hooks/useLogin';

const { TabPane } = Tabs;

enum Type {
    QRCODE,
    ACCOUNT,
}
export interface IFormInfo {
    username?: string;
    password?: string;
    captcha: string;
    phone?: string;
}

const TypeImageTip = ['微信扫码登录更方便', '切换账号密码登录'];

export default function Login() {
    const { userInfo } = useContext(ProjectInfoContext);
    const [loading, setLoading] = useState(false);
    const sourceUrl = getUrlSearchParams('direction') ?? '/';
    // const navigate = useNavigate();
    const [form] = Form.useForm<IFormInfo>();
    const [loginType, setLoginType] = useState<Type>(Type.QRCODE);
    useEffect(() => {
        if (userInfo.username) {
            message.info('当前用户已登录，请勿重复登录');
            window.location.href = '/';
        }
    }, [userInfo]);

    const changeLoginType = () => {
        setLoginType(loginType === Type.QRCODE ? Type.ACCOUNT : Type.QRCODE);
    };

    const onSubmitLogin = (values: IFormInfo & { remember?: boolean }) => {
        const { username, password, phone, captcha, remember } = values;
        const data: IFormInfo = { captcha };
        phone
            ? (data['phone'] = phone)
            : ((data['username'] = username), (data['password'] = password));
        setLoading(true);
        login(data)
            .then(res => {
                cookie.setCookie(cookie.SESSION_TOKEN, res);
                remember && cookie.setCookie(cookie.SESSION_REMEMBER, res, { expires: 15 });
                setLoading(false);
                window.location.href = sourceUrl;
            })
            .catch(err => {
                setLoading(false);
                message.error(`登录异常，${err.message}`);
            });
    };

    const renderShortMessage = () => {
        return (
            <>
                <Form.Item
                    name="username"
                    className="field"
                    rules={[{ required: true, message: '请输入账号!' }]}
                >
                    <Input
                        size="large"
                        prefix={<UserOutlined className="form-item-icon" />}
                        placeholder="请输入账号或手机号"
                    />
                </Form.Item>
                <Form.Item name="password" rules={[{ required: true, message: '请输入密码!' }]}>
                    <Input
                        size="large"
                        prefix={<LockOutlined className="form-item-icon" />}
                        type="password"
                        placeholder="请输入密码"
                    />
                </Form.Item>
                <Form.Item>
                    <Form.Item
                        noStyle
                        name="captcha"
                        rules={[{ required: true, message: '请输入验证码!' }]}
                    >
                        <Input
                            size="large"
                            className="login-input-captcha"
                            placeholder="请输入验证码"
                        />
                    </Form.Item>
                    <div className="login-captcha">
                        <img src={Captcha} alt="验证码" />
                    </div>
                </Form.Item>
            </>
        );
    };

    const renderPassWord = () => {
        return (
            <>
                <Form.Item
                    name="phone"
                    className="field"
                    rules={[{ required: true, message: '请输入手机号!' }]}
                >
                    <Input
                        size="large"
                        prefix={<UserOutlined className="form-item-icon" />}
                        placeholder="请输入手机号"
                    />
                </Form.Item>
                <Form.Item>
                    <Form.Item
                        name="captcha"
                        rules={[{ required: true, message: '请输入短信验证码!' }]}
                        noStyle
                    >
                        <Input
                            size="large"
                            className="login-input-captcha"
                            placeholder="请输入短信验证码"
                        />
                    </Form.Item>
                    <Button loading={loading} type="default" className="login-captcha-btn">
                        获取验证码
                    </Button>
                </Form.Item>
            </>
        );
    };

    const renderLoginMode = useMemo(() => {
        if (loginType === Type.QRCODE) {
            return (
                <Form
                    form={form}
                    className="login-info-form"
                    initialValues={{ remember: true, username: 'test', password: 'test123' }}
                    onFinish={onSubmitLogin}
                >
                    <Tabs
                        defaultActiveKey="1"
                        onChange={() => {
                            form.resetFields();
                        }}
                    >
                        <TabPane tab={<div className="login-tabs">密码登录</div>} key="1">
                            {renderShortMessage()}
                        </TabPane>
                        <TabPane tab={<div className="login-tabs">短信登录</div>} key="2">
                            {renderPassWord()}
                        </TabPane>
                    </Tabs>
                    <Form.Item>
                        <Form.Item name="remember" valuePropName="checked" noStyle>
                            <Checkbox>保存账号</Checkbox>
                        </Form.Item>
                        <div style={{ float: 'right' }}>
                            <a onClick={() => message.info('你真蠢！！！')}>忘记密码</a>
                            <i style={{ margin: '0px 12px' }}>|</i>
                            <Link to="/register">注册</Link>
                        </div>
                    </Form.Item>
                    <Form.Item>
                        <Button type="primary" htmlType="submit" className="login-form-button">
                            登录
                        </Button>
                    </Form.Item>
                </Form>
            );
        }
        if (loginType === Type.ACCOUNT) {
            return (
                <>
                    <div className="login-form-label"> 微信二维码登录 </div>
                    <div className="login-info">
                        <div className="login-qrcode">
                            <img src={LocalhostQRCode} alt="二维码登录" />
                        </div>
                        <div className="login-qrcode-desc">使用微信扫一扫登录</div>
                    </div>
                </>
            );
        }
        return null;
    }, [loginType]);

    return (
        <div className="container">
            <div className="container-wrapper">
                <div className="login-wrapper">
                    <div className="login-header">
                        <div className="login-title">XXXX管理系统</div>
                        {/* <div className='login-description'>登录站酷网，与1400万+ 名设计创意人一起交流设计、分享快乐吧！</div> */}
                    </div>
                    <div className="login-content">
                        <Tooltip placement="right" title={TypeImageTip[loginType]}>
                            <div className="login-type" onClick={changeLoginType}>
                                <img
                                    className="login-icon"
                                    src={loginType === Type.ACCOUNT ? QRCodeSvg : PcLoginSvg}
                                />
                            </div>
                        </Tooltip>
                        <div className="login-form">{renderLoginMode}</div>
                    </div>
                </div>
            </div>
        </div>
    );
}
