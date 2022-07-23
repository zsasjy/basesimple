import { r as e, j as r, e as a, F as s, I as l, B as i } from './antd.19220ac7.js';
import { c as t, U as c, L as m } from './index.440a5692.js';
import { S as o, M as n } from './SafetyOutlined.57d004cf.js';
import './axios.58752079.js';
const { useForm: d } = s;
function p() {
    const [p, f] = e.exports.useState(!1),
        [h] = d();
    return r('div', {
        className: 'container',
        children: r('div', {
            className: 'container-wrapper',
            children: a('div', {
                className: 'register-wrapper',
                children: [
                    r('div', {
                        className: 'register-header',
                        children: r('div', {
                            className: 'register-title',
                            children: 'XXXX管理系统',
                        }),
                    }),
                    r('div', {
                        className: 'register-content',
                        children: a('div', {
                            className: 'register-form',
                            children: [
                                a('div', {
                                    className: 'register-form-label',
                                    children: [
                                        r('div', {
                                            className: 'register-form-label-title',
                                            children: '注册',
                                        }),
                                        a('div', {
                                            className: 'register-form-label-extra',
                                            children: [
                                                r('span', { children: '已有账号，' }),
                                                r(t, { to: '/login', children: '返回登录' }),
                                            ],
                                        }),
                                    ],
                                }),
                                r('div', {
                                    className: 'register-info',
                                    children: a(s, {
                                        form: h,
                                        className: 'register-info-form',
                                        children: [
                                            r(s.Item, {
                                                name: 'username',
                                                className: 'field',
                                                rules: [{ required: !0, message: '请输入账号!' }],
                                                children: r(l, {
                                                    size: 'large',
                                                    prefix: r(c, { className: 'form-item-icon' }),
                                                    placeholder: '请输入账号',
                                                    allowClear: !0,
                                                    autoComplete: 'off',
                                                }),
                                            }),
                                            r(s.Item, {
                                                name: 'password',
                                                rules: [{ required: !0, message: '请输入密码!' }],
                                                children: r(l, {
                                                    size: 'large',
                                                    prefix: r(m, { className: 'form-item-icon' }),
                                                    type: 'password',
                                                    placeholder: '请输入密码',
                                                    allowClear: !0,
                                                    autoComplete: 'off',
                                                }),
                                            }),
                                            r(s.Item, {
                                                name: 'confirm',
                                                rules: [
                                                    { required: !0, message: '请再次输入密码!' },
                                                ],
                                                children: r(l, {
                                                    size: 'large',
                                                    prefix: r(o, { className: 'form-item-icon' }),
                                                    type: 'password',
                                                    placeholder: '请再次输入密码',
                                                    allowClear: !0,
                                                    autoComplete: 'off',
                                                }),
                                            }),
                                            r(s.Item, {
                                                name: 'phone',
                                                className: 'field',
                                                children: r(l, {
                                                    size: 'large',
                                                    prefix: r(n, { className: 'form-item-icon' }),
                                                    placeholder: '请输入手机号',
                                                    allowClear: !0,
                                                    autoComplete: 'off',
                                                }),
                                            }),
                                            a(s.Item, {
                                                children: [
                                                    r(s.Item, {
                                                        name: 'captcha',
                                                        rules: [
                                                            {
                                                                required: !0,
                                                                message: '请输入短信验证码!',
                                                            },
                                                        ],
                                                        noStyle: !0,
                                                        children: r(l, {
                                                            size: 'large',
                                                            className: 'register-input-captcha',
                                                            placeholder: '请输入短信验证码',
                                                        }),
                                                    }),
                                                    r(i, {
                                                        loading: p,
                                                        type: 'default',
                                                        className: 'register-captcha-btn',
                                                        children: '获取验证码',
                                                    }),
                                                ],
                                            }),
                                            r(s.Item, {
                                                children: r(i, {
                                                    type: 'primary',
                                                    htmlType: 'submit',
                                                    className: 'register-form-button',
                                                    children: '登录',
                                                }),
                                            }),
                                        ],
                                    }),
                                }),
                            ],
                        }),
                    }),
                ],
            }),
        }),
    });
}
export { p as default };
