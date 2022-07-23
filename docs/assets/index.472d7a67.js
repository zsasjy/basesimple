import { r as t, e as n, j as o, B as s } from './antd.19220ac7.js';
import { R as e, u as r, a as c, A as a } from './index.e0d24b2f.js';
import './axios.58752079.js';
function i(n = e) {
    const o = n === e ? r : () => t.exports.useContext(n);
    return function () {
        const { store: t } = o();
        return t;
    };
}
const u = i();
function d(t = e) {
    const n = t === e ? u : i(t);
    return function () {
        return n().dispatch;
    };
}
const p = d();
function f() {
    const e = p(),
        r = c(t => t.home),
        i = t.exports.useCallback(() => {
            e({ type: a.updateState, payload: r.count + 1 });
        }, [e, r.count]);
    return n('div', {
        children: [
            o('div', { children: '首页内容' }),
            n('p', { children: [' ', r.count, ' '] }),
            o(s, { onClick: i, children: '加一' }),
        ],
    });
}
export { f as default };
