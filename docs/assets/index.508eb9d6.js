import { E as t } from './index.508733db.js';
import { j as i } from './antd.19220ac7.js';
import './axios.58752079.js';
function o() {
    return i(t, {
        icon: '/basesimple/assets/loading_failed.8386b999.svg',
        title: '页面不存在',
        description: '查询页面不存在，请跳转首页',
        extraBtnText: '跳转首页',
        onExtraClick: () => (window.location.href = '/'),
        fullHeight: !0,
    });
}
export { o as default };