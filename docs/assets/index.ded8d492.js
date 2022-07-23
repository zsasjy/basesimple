import { r as t, e as n, j as o, B as s } from './antd.19220ac7.js';
import { R as r, u as e, a, A as c } from './index.440a5692.js';
import './axios.58752079.js';
function i(n = r) {
    const o = n === r ? e : () => t.exports.useContext(n);
    return function () {
        const { store: t } = o();
        return t;
    };
}
const u = i();
function d(t = r) {
    const n = t === r ? u : i(t);
    return function () {
        return n().dispatch;
    };
}
const p = d();
function l() {
    const r = p(),
        e = a(t => t.home),
        i = t.exports.useCallback(() => {
            r({ type: c.updateState, payload: e.count + 1 });
        }, [r, e.count]);
    return n('div', {
        children: [
            o('div', { children: '首页内容' }),
            n('p', { children: [' ', e.count, ' '] }),
            o(s, { onClick: i, children: '加一' }),
        ],
    });
}
export { l as default };
