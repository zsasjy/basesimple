import React, { useState } from 'react';
import { Form, Input, Button } from 'antd';
import { UserOutlined, LockOutlined, MobileOutlined, SafetyOutlined } from '@ant-design/icons';
import { Link } from 'react-router-dom';
import './index.less';

const { useForm } = Form;

export default function Register() {
    const [loading, setLoading] = useState(false);
    const [form] = useForm();
    const renderForm = () => {
        return (
            <Form form={form} className="register-info-form">
                <Form.Item
                    name="username"
                    className="field"
                    rules={[{ required: true, message: '请输入账号!' }]}
                >
                    <Input
                        size="large"
                        prefix={<UserOutlined className="form-item-icon" />}
                        placeholder="请输入账号"
                        allowClear
                        autoComplete="off"
                    />
                </Form.Item>
                <Form.Item name="password" rules={[{ required: true, message: '请输入密码!' }]}>
                    <Input
                        size="large"
                        prefix={<LockOutlined className="form-item-icon" />}
                        type="password"
                        placeholder="请输入密码"
                        allowClear
                        autoComplete="off"
                    />
                </Form.Item>
                <Form.Item name="confirm" rules={[{ required: true, message: '请再次输入密码!' }]}>
                    <Input
                        size="large"
                        prefix={<SafetyOutlined className="form-item-icon" />}
                        type="password"
                        placeholder="请再次输入密码"
                        allowClear
                        autoComplete="off"
                    />
                </Form.Item>
                <Form.Item name="phone" className="field">
                    <Input
                        size="large"
                        prefix={<MobileOutlined className="form-item-icon" />}
                        placeholder="请输入手机号"
                        allowClear
                        autoComplete="off"
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
                            className="register-input-captcha"
                            placeholder="请输入短信验证码"
                        />
                    </Form.Item>
                    <Button loading={loading} type="default" className="register-captcha-btn">
                        获取验证码
                    </Button>
                </Form.Item>
                <Form.Item>
                    <Button type="primary" htmlType="submit" className="register-form-button">
                        登录
                    </Button>
                </Form.Item>
            </Form>
        );
    };

    return (
        <div className="container">
            <div className="container-wrapper">
                <div className="register-wrapper">
                    <div className="register-header">
                        <div className="register-title">XXXX管理系统</div>
                        {/* <div className='login-description'>登录站酷网，与1400万+ 名设计创意人一起交流设计、分享快乐吧！</div> */}
                    </div>
                    <div className="register-content">
                        <div className="register-form">
                            <div className="register-form-label">
                                <div className="register-form-label-title">注册</div>
                                <div className="register-form-label-extra">
                                    <span>已有账号，</span>
                                    <Link to="/login">返回登录</Link>
                                </div>
                            </div>
                            <div className="register-info">{renderForm()}</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
