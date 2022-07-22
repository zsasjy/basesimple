var e,
    t = { exports: {} },
    n = function (e, t) {
        return function () {
            for (var n = new Array(arguments.length), r = 0; r < n.length; r++) n[r] = arguments[r];
            return e.apply(t, n);
        };
    },
    r = n,
    o = Object.prototype.toString,
    i =
        ((e = Object.create(null)),
        function (t) {
            var n = o.call(t);
            return e[n] || (e[n] = n.slice(8, -1).toLowerCase());
        });
function s(e) {
    return (
        (e = e.toLowerCase()),
        function (t) {
            return i(t) === e;
        }
    );
}
function a(e) {
    return Array.isArray(e);
}
function u(e) {
    return void 0 === e;
}
var c = s('ArrayBuffer');
function f(e) {
    return null !== e && 'object' == typeof e;
}
function l(e) {
    if ('object' !== i(e)) return !1;
    var t = Object.getPrototypeOf(e);
    return null === t || t === Object.prototype;
}
var p = s('Date'),
    d = s('File'),
    h = s('Blob'),
    m = s('FileList');
function v(e) {
    return '[object Function]' === o.call(e);
}
var y = s('URLSearchParams');
function g(e, t) {
    if (null != e)
        if (('object' != typeof e && (e = [e]), a(e)))
            for (var n = 0, r = e.length; n < r; n++) t.call(null, e[n], n, e);
        else
            for (var o in e) Object.prototype.hasOwnProperty.call(e, o) && t.call(null, e[o], o, e);
}
var E,
    b =
        ((E = 'undefined' != typeof Uint8Array && Object.getPrototypeOf(Uint8Array)),
        function (e) {
            return E && e instanceof E;
        }),
    O = {
        isArray: a,
        isArrayBuffer: c,
        isBuffer: function (e) {
            return (
                null !== e &&
                !u(e) &&
                null !== e.constructor &&
                !u(e.constructor) &&
                'function' == typeof e.constructor.isBuffer &&
                e.constructor.isBuffer(e)
            );
        },
        isFormData: function (e) {
            var t = '[object FormData]';
            return (
                e &&
                (('function' == typeof FormData && e instanceof FormData) ||
                    o.call(e) === t ||
                    (v(e.toString) && e.toString() === t))
            );
        },
        isArrayBufferView: function (e) {
            return 'undefined' != typeof ArrayBuffer && ArrayBuffer.isView
                ? ArrayBuffer.isView(e)
                : e && e.buffer && c(e.buffer);
        },
        isString: function (e) {
            return 'string' == typeof e;
        },
        isNumber: function (e) {
            return 'number' == typeof e;
        },
        isObject: f,
        isPlainObject: l,
        isUndefined: u,
        isDate: p,
        isFile: d,
        isBlob: h,
        isFunction: v,
        isStream: function (e) {
            return f(e) && v(e.pipe);
        },
        isURLSearchParams: y,
        isStandardBrowserEnv: function () {
            return (
                ('undefined' == typeof navigator ||
                    ('ReactNative' !== navigator.product &&
                        'NativeScript' !== navigator.product &&
                        'NS' !== navigator.product)) &&
                'undefined' != typeof window &&
                'undefined' != typeof document
            );
        },
        forEach: g,
        merge: function e() {
            var t = {};
            function n(n, r) {
                l(t[r]) && l(n)
                    ? (t[r] = e(t[r], n))
                    : l(n)
                    ? (t[r] = e({}, n))
                    : a(n)
                    ? (t[r] = n.slice())
                    : (t[r] = n);
            }
            for (var r = 0, o = arguments.length; r < o; r++) g(arguments[r], n);
            return t;
        },
        extend: function (e, t, n) {
            return (
                g(t, function (t, o) {
                    e[o] = n && 'function' == typeof t ? r(t, n) : t;
                }),
                e
            );
        },
        trim: function (e) {
            return e.trim ? e.trim() : e.replace(/^\s+|\s+$/g, '');
        },
        stripBOM: function (e) {
            return 65279 === e.charCodeAt(0) && (e = e.slice(1)), e;
        },
        inherits: function (e, t, n, r) {
            (e.prototype = Object.create(t.prototype, r)),
                (e.prototype.constructor = e),
                n && Object.assign(e.prototype, n);
        },
        toFlatObject: function (e, t, n) {
            var r,
                o,
                i,
                s = {};
            t = t || {};
            do {
                for (o = (r = Object.getOwnPropertyNames(e)).length; o-- > 0; )
                    s[(i = r[o])] || ((t[i] = e[i]), (s[i] = !0));
                e = Object.getPrototypeOf(e);
            } while (e && (!n || n(e, t)) && e !== Object.prototype);
            return t;
        },
        kindOf: i,
        kindOfTest: s,
        endsWith: function (e, t, n) {
            (e = String(e)), (void 0 === n || n > e.length) && (n = e.length), (n -= t.length);
            var r = e.indexOf(t, n);
            return -1 !== r && r === n;
        },
        toArray: function (e) {
            if (!e) return null;
            var t = e.length;
            if (u(t)) return null;
            for (var n = new Array(t); t-- > 0; ) n[t] = e[t];
            return n;
        },
        isTypedArray: b,
        isFileList: m,
    },
    w = O;
function R(e) {
    return encodeURIComponent(e)
        .replace(/%3A/gi, ':')
        .replace(/%24/g, '$')
        .replace(/%2C/gi, ',')
        .replace(/%20/g, '+')
        .replace(/%5B/gi, '[')
        .replace(/%5D/gi, ']');
}
var A = function (e, t, n) {
        if (!t) return e;
        var r;
        if (n) r = n(t);
        else if (w.isURLSearchParams(t)) r = t.toString();
        else {
            var o = [];
            w.forEach(t, function (e, t) {
                null != e &&
                    (w.isArray(e) ? (t += '[]') : (e = [e]),
                    w.forEach(e, function (e) {
                        w.isDate(e)
                            ? (e = e.toISOString())
                            : w.isObject(e) && (e = JSON.stringify(e)),
                            o.push(R(t) + '=' + R(e));
                    }));
            }),
                (r = o.join('&'));
        }
        if (r) {
            var i = e.indexOf('#');
            -1 !== i && (e = e.slice(0, i)), (e += (-1 === e.indexOf('?') ? '?' : '&') + r);
        }
        return e;
    },
    S = O;
function T() {
    this.handlers = [];
}
(T.prototype.use = function (e, t, n) {
    return (
        this.handlers.push({
            fulfilled: e,
            rejected: t,
            synchronous: !!n && n.synchronous,
            runWhen: n ? n.runWhen : null,
        }),
        this.handlers.length - 1
    );
}),
    (T.prototype.eject = function (e) {
        this.handlers[e] && (this.handlers[e] = null);
    }),
    (T.prototype.forEach = function (e) {
        S.forEach(this.handlers, function (t) {
            null !== t && e(t);
        });
    });
var N = T,
    j = O,
    C = O;
function x(e, t, n, r, o) {
    Error.call(this),
        (this.message = e),
        (this.name = 'AxiosError'),
        t && (this.code = t),
        n && (this.config = n),
        r && (this.request = r),
        o && (this.response = o);
}
C.inherits(x, Error, {
    toJSON: function () {
        return {
            message: this.message,
            name: this.name,
            description: this.description,
            number: this.number,
            fileName: this.fileName,
            lineNumber: this.lineNumber,
            columnNumber: this.columnNumber,
            stack: this.stack,
            config: this.config,
            code: this.code,
            status: this.response && this.response.status ? this.response.status : null,
        };
    },
});
var _ = x.prototype,
    P = {};
[
    'ERR_BAD_OPTION_VALUE',
    'ERR_BAD_OPTION',
    'ECONNABORTED',
    'ETIMEDOUT',
    'ERR_NETWORK',
    'ERR_FR_TOO_MANY_REDIRECTS',
    'ERR_DEPRECATED',
    'ERR_BAD_RESPONSE',
    'ERR_BAD_REQUEST',
    'ERR_CANCELED',
].forEach(function (e) {
    P[e] = { value: e };
}),
    Object.defineProperties(x, P),
    Object.defineProperty(_, 'isAxiosError', { value: !0 }),
    (x.from = function (e, t, n, r, o, i) {
        var s = Object.create(_);
        return (
            C.toFlatObject(e, s, function (e) {
                return e !== Error.prototype;
            }),
            x.call(s, e.message, t, n, r, o),
            (s.name = e.name),
            i && Object.assign(s, i),
            s
        );
    });
var U = x,
    B = { silentJSONParsing: !0, forcedJSONParsing: !0, clarifyTimeoutError: !1 },
    D = O;
var L = function (e, t) {
        t = t || new FormData();
        var n = [];
        function r(e) {
            return null === e
                ? ''
                : D.isDate(e)
                ? e.toISOString()
                : D.isArrayBuffer(e) || D.isTypedArray(e)
                ? 'function' == typeof Blob
                    ? new Blob([e])
                    : Buffer.from(e)
                : e;
        }
        return (
            (function e(o, i) {
                if (D.isPlainObject(o) || D.isArray(o)) {
                    if (-1 !== n.indexOf(o)) throw Error('Circular reference detected in ' + i);
                    n.push(o),
                        D.forEach(o, function (n, o) {
                            if (!D.isUndefined(n)) {
                                var s,
                                    a = i ? i + '.' + o : o;
                                if (n && !i && 'object' == typeof n)
                                    if (D.endsWith(o, '{}')) n = JSON.stringify(n);
                                    else if (D.endsWith(o, '[]') && (s = D.toArray(n)))
                                        return void s.forEach(function (e) {
                                            !D.isUndefined(e) && t.append(a, r(e));
                                        });
                                e(n, a);
                            }
                        }),
                        n.pop();
                } else t.append(i, r(o));
            })(e),
            t
        );
    },
    k = U,
    F = O,
    q = F.isStandardBrowserEnv()
        ? {
              write: function (e, t, n, r, o, i) {
                  var s = [];
                  s.push(e + '=' + encodeURIComponent(t)),
                      F.isNumber(n) && s.push('expires=' + new Date(n).toGMTString()),
                      F.isString(r) && s.push('path=' + r),
                      F.isString(o) && s.push('domain=' + o),
                      !0 === i && s.push('secure'),
                      (document.cookie = s.join('; '));
              },
              read: function (e) {
                  var t = document.cookie.match(new RegExp('(^|;\\s*)(' + e + ')=([^;]*)'));
                  return t ? decodeURIComponent(t[3]) : null;
              },
              remove: function (e) {
                  this.write(e, '', Date.now() - 864e5);
              },
          }
        : {
              write: function () {},
              read: function () {
                  return null;
              },
              remove: function () {},
          },
    I = function (e) {
        return /^([a-z][a-z\d+\-.]*:)?\/\//i.test(e);
    },
    J = function (e, t) {
        return t ? e.replace(/\/+$/, '') + '/' + t.replace(/^\/+/, '') : e;
    },
    M = function (e, t) {
        return e && !I(t) ? J(e, t) : t;
    },
    H = O,
    W = [
        'age',
        'authorization',
        'content-length',
        'content-type',
        'etag',
        'expires',
        'from',
        'host',
        'if-modified-since',
        'if-unmodified-since',
        'last-modified',
        'location',
        'max-forwards',
        'proxy-authorization',
        'referer',
        'retry-after',
        'user-agent',
    ],
    z = O,
    V = z.isStandardBrowserEnv()
        ? (function () {
              var e,
                  t = /(msie|trident)/i.test(navigator.userAgent),
                  n = document.createElement('a');
              function r(e) {
                  var r = e;
                  return (
                      t && (n.setAttribute('href', r), (r = n.href)),
                      n.setAttribute('href', r),
                      {
                          href: n.href,
                          protocol: n.protocol ? n.protocol.replace(/:$/, '') : '',
                          host: n.host,
                          search: n.search ? n.search.replace(/^\?/, '') : '',
                          hash: n.hash ? n.hash.replace(/^#/, '') : '',
                          hostname: n.hostname,
                          port: n.port,
                          pathname: '/' === n.pathname.charAt(0) ? n.pathname : '/' + n.pathname,
                      }
                  );
              }
              return (
                  (e = r(window.location.href)),
                  function (t) {
                      var n = z.isString(t) ? r(t) : t;
                      return n.protocol === e.protocol && n.host === e.host;
                  }
              );
          })()
        : function () {
              return !0;
          },
    X = U;
function K(e) {
    X.call(this, null == e ? 'canceled' : e, X.ERR_CANCELED), (this.name = 'CanceledError');
}
O.inherits(K, X, { __CANCEL__: !0 });
var $ = K,
    Q = O,
    G = function (e, t, n) {
        var r = n.config.validateStatus;
        n.status && r && !r(n.status)
            ? t(
                  new k(
                      'Request failed with status code ' + n.status,
                      [k.ERR_BAD_REQUEST, k.ERR_BAD_RESPONSE][Math.floor(n.status / 100) - 4],
                      n.config,
                      n.request,
                      n,
                  ),
              )
            : e(n);
    },
    Y = q,
    Z = A,
    ee = M,
    te = function (e) {
        var t,
            n,
            r,
            o = {};
        return e
            ? (H.forEach(e.split('\n'), function (e) {
                  if (
                      ((r = e.indexOf(':')),
                      (t = H.trim(e.substr(0, r)).toLowerCase()),
                      (n = H.trim(e.substr(r + 1))),
                      t)
                  ) {
                      if (o[t] && W.indexOf(t) >= 0) return;
                      o[t] =
                          'set-cookie' === t
                              ? (o[t] ? o[t] : []).concat([n])
                              : o[t]
                              ? o[t] + ', ' + n
                              : n;
                  }
              }),
              o)
            : o;
    },
    ne = V,
    re = B,
    oe = U,
    ie = $,
    se = function (e) {
        var t = /^([-+\w]{1,25})(:?\/\/|:)/.exec(e);
        return (t && t[1]) || '';
    },
    ae = function (e) {
        return new Promise(function (t, n) {
            var r,
                o = e.data,
                i = e.headers,
                s = e.responseType;
            function a() {
                e.cancelToken && e.cancelToken.unsubscribe(r),
                    e.signal && e.signal.removeEventListener('abort', r);
            }
            Q.isFormData(o) && Q.isStandardBrowserEnv() && delete i['Content-Type'];
            var u = new XMLHttpRequest();
            if (e.auth) {
                var c = e.auth.username || '',
                    f = e.auth.password ? unescape(encodeURIComponent(e.auth.password)) : '';
                i.Authorization = 'Basic ' + btoa(c + ':' + f);
            }
            var l = ee(e.baseURL, e.url);
            function p() {
                if (u) {
                    var r = 'getAllResponseHeaders' in u ? te(u.getAllResponseHeaders()) : null,
                        o = {
                            data: s && 'text' !== s && 'json' !== s ? u.response : u.responseText,
                            status: u.status,
                            statusText: u.statusText,
                            headers: r,
                            config: e,
                            request: u,
                        };
                    G(
                        function (e) {
                            t(e), a();
                        },
                        function (e) {
                            n(e), a();
                        },
                        o,
                    ),
                        (u = null);
                }
            }
            if (
                (u.open(e.method.toUpperCase(), Z(l, e.params, e.paramsSerializer), !0),
                (u.timeout = e.timeout),
                'onloadend' in u
                    ? (u.onloadend = p)
                    : (u.onreadystatechange = function () {
                          u &&
                              4 === u.readyState &&
                              (0 !== u.status ||
                                  (u.responseURL && 0 === u.responseURL.indexOf('file:'))) &&
                              setTimeout(p);
                      }),
                (u.onabort = function () {
                    u && (n(new oe('Request aborted', oe.ECONNABORTED, e, u)), (u = null));
                }),
                (u.onerror = function () {
                    n(new oe('Network Error', oe.ERR_NETWORK, e, u, u)), (u = null);
                }),
                (u.ontimeout = function () {
                    var t = e.timeout
                            ? 'timeout of ' + e.timeout + 'ms exceeded'
                            : 'timeout exceeded',
                        r = e.transitional || re;
                    e.timeoutErrorMessage && (t = e.timeoutErrorMessage),
                        n(new oe(t, r.clarifyTimeoutError ? oe.ETIMEDOUT : oe.ECONNABORTED, e, u)),
                        (u = null);
                }),
                Q.isStandardBrowserEnv())
            ) {
                var d =
                    (e.withCredentials || ne(l)) && e.xsrfCookieName
                        ? Y.read(e.xsrfCookieName)
                        : void 0;
                d && (i[e.xsrfHeaderName] = d);
            }
            'setRequestHeader' in u &&
                Q.forEach(i, function (e, t) {
                    void 0 === o && 'content-type' === t.toLowerCase()
                        ? delete i[t]
                        : u.setRequestHeader(t, e);
                }),
                Q.isUndefined(e.withCredentials) || (u.withCredentials = !!e.withCredentials),
                s && 'json' !== s && (u.responseType = e.responseType),
                'function' == typeof e.onDownloadProgress &&
                    u.addEventListener('progress', e.onDownloadProgress),
                'function' == typeof e.onUploadProgress &&
                    u.upload &&
                    u.upload.addEventListener('progress', e.onUploadProgress),
                (e.cancelToken || e.signal) &&
                    ((r = function (e) {
                        u && (n(!e || (e && e.type) ? new ie() : e), u.abort(), (u = null));
                    }),
                    e.cancelToken && e.cancelToken.subscribe(r),
                    e.signal && (e.signal.aborted ? r() : e.signal.addEventListener('abort', r))),
                o || (o = null);
            var h = se(l);
            h && -1 === ['http', 'https', 'file'].indexOf(h)
                ? n(new oe('Unsupported protocol ' + h + ':', oe.ERR_BAD_REQUEST, e))
                : u.send(o);
        });
    },
    ue = O,
    ce = function (e, t) {
        j.forEach(e, function (n, r) {
            r !== t && r.toUpperCase() === t.toUpperCase() && ((e[t] = n), delete e[r]);
        });
    },
    fe = U,
    le = L,
    pe = { 'Content-Type': 'application/x-www-form-urlencoded' };
function de(e, t) {
    !ue.isUndefined(e) && ue.isUndefined(e['Content-Type']) && (e['Content-Type'] = t);
}
var he,
    me = {
        transitional: B,
        adapter:
            (('undefined' != typeof XMLHttpRequest ||
                ('undefined' != typeof process &&
                    '[object process]' === Object.prototype.toString.call(process))) &&
                (he = ae),
            he),
        transformRequest: [
            function (e, t) {
                if (
                    (ce(t, 'Accept'),
                    ce(t, 'Content-Type'),
                    ue.isFormData(e) ||
                        ue.isArrayBuffer(e) ||
                        ue.isBuffer(e) ||
                        ue.isStream(e) ||
                        ue.isFile(e) ||
                        ue.isBlob(e))
                )
                    return e;
                if (ue.isArrayBufferView(e)) return e.buffer;
                if (ue.isURLSearchParams(e))
                    return de(t, 'application/x-www-form-urlencoded;charset=utf-8'), e.toString();
                var n,
                    r = ue.isObject(e),
                    o = t && t['Content-Type'];
                if ((n = ue.isFileList(e)) || (r && 'multipart/form-data' === o)) {
                    var i = this.env && this.env.FormData;
                    return le(n ? { 'files[]': e } : e, i && new i());
                }
                return r || 'application/json' === o
                    ? (de(t, 'application/json'),
                      (function (e, t, n) {
                          if (ue.isString(e))
                              try {
                                  return (t || JSON.parse)(e), ue.trim(e);
                              } catch (r) {
                                  if ('SyntaxError' !== r.name) throw r;
                              }
                          return (n || JSON.stringify)(e);
                      })(e))
                    : e;
            },
        ],
        transformResponse: [
            function (e) {
                var t = this.transitional || me.transitional,
                    n = t && t.silentJSONParsing,
                    r = t && t.forcedJSONParsing,
                    o = !n && 'json' === this.responseType;
                if (o || (r && ue.isString(e) && e.length))
                    try {
                        return JSON.parse(e);
                    } catch (i) {
                        if (o) {
                            if ('SyntaxError' === i.name)
                                throw fe.from(i, fe.ERR_BAD_RESPONSE, this, null, this.response);
                            throw i;
                        }
                    }
                return e;
            },
        ],
        timeout: 0,
        xsrfCookieName: 'XSRF-TOKEN',
        xsrfHeaderName: 'X-XSRF-TOKEN',
        maxContentLength: -1,
        maxBodyLength: -1,
        env: { FormData: null },
        validateStatus: function (e) {
            return e >= 200 && e < 300;
        },
        headers: { common: { Accept: 'application/json, text/plain, */*' } },
    };
ue.forEach(['delete', 'get', 'head'], function (e) {
    me.headers[e] = {};
}),
    ue.forEach(['post', 'put', 'patch'], function (e) {
        me.headers[e] = ue.merge(pe);
    });
var ve = me,
    ye = O,
    ge = ve,
    Ee = function (e) {
        return !(!e || !e.__CANCEL__);
    },
    be = O,
    Oe = function (e, t, n) {
        var r = this || ge;
        return (
            ye.forEach(n, function (n) {
                e = n.call(r, e, t);
            }),
            e
        );
    },
    we = Ee,
    Re = ve,
    Ae = $;
function Se(e) {
    if ((e.cancelToken && e.cancelToken.throwIfRequested(), e.signal && e.signal.aborted))
        throw new Ae();
}
var Te = O,
    Ne = function (e, t) {
        t = t || {};
        var n = {};
        function r(e, t) {
            return Te.isPlainObject(e) && Te.isPlainObject(t)
                ? Te.merge(e, t)
                : Te.isPlainObject(t)
                ? Te.merge({}, t)
                : Te.isArray(t)
                ? t.slice()
                : t;
        }
        function o(n) {
            return Te.isUndefined(t[n])
                ? Te.isUndefined(e[n])
                    ? void 0
                    : r(void 0, e[n])
                : r(e[n], t[n]);
        }
        function i(e) {
            if (!Te.isUndefined(t[e])) return r(void 0, t[e]);
        }
        function s(n) {
            return Te.isUndefined(t[n])
                ? Te.isUndefined(e[n])
                    ? void 0
                    : r(void 0, e[n])
                : r(void 0, t[n]);
        }
        function a(n) {
            return n in t ? r(e[n], t[n]) : n in e ? r(void 0, e[n]) : void 0;
        }
        var u = {
            url: i,
            method: i,
            data: i,
            baseURL: s,
            transformRequest: s,
            transformResponse: s,
            paramsSerializer: s,
            timeout: s,
            timeoutMessage: s,
            withCredentials: s,
            adapter: s,
            responseType: s,
            xsrfCookieName: s,
            xsrfHeaderName: s,
            onUploadProgress: s,
            onDownloadProgress: s,
            decompress: s,
            maxContentLength: s,
            maxBodyLength: s,
            beforeRedirect: s,
            transport: s,
            httpAgent: s,
            httpsAgent: s,
            cancelToken: s,
            socketPath: s,
            responseEncoding: s,
            validateStatus: a,
        };
        return (
            Te.forEach(Object.keys(e).concat(Object.keys(t)), function (e) {
                var t = u[e] || o,
                    r = t(e);
                (Te.isUndefined(r) && t !== a) || (n[e] = r);
            }),
            n
        );
    },
    je = '0.27.2',
    Ce = je,
    xe = U,
    _e = {};
['object', 'boolean', 'number', 'function', 'string', 'symbol'].forEach(function (e, t) {
    _e[e] = function (n) {
        return typeof n === e || 'a' + (t < 1 ? 'n ' : ' ') + e;
    };
});
var Pe = {};
_e.transitional = function (e, t, n) {
    function r(e, t) {
        return '[Axios v' + Ce + "] Transitional option '" + e + "'" + t + (n ? '. ' + n : '');
    }
    return function (n, o, i) {
        if (!1 === e)
            throw new xe(r(o, ' has been removed' + (t ? ' in ' + t : '')), xe.ERR_DEPRECATED);
        return (
            t &&
                !Pe[o] &&
                ((Pe[o] = !0),
                console.warn(
                    r(
                        o,
                        ' has been deprecated since v' +
                            t +
                            ' and will be removed in the near future',
                    ),
                )),
            !e || e(n, o, i)
        );
    };
};
var Ue = O,
    Be = A,
    De = N,
    Le = function (e) {
        return (
            Se(e),
            (e.headers = e.headers || {}),
            (e.data = Oe.call(e, e.data, e.headers, e.transformRequest)),
            (e.headers = be.merge(e.headers.common || {}, e.headers[e.method] || {}, e.headers)),
            be.forEach(['delete', 'get', 'head', 'post', 'put', 'patch', 'common'], function (t) {
                delete e.headers[t];
            }),
            (e.adapter || Re.adapter)(e).then(
                function (t) {
                    return Se(e), (t.data = Oe.call(e, t.data, t.headers, e.transformResponse)), t;
                },
                function (t) {
                    return (
                        we(t) ||
                            (Se(e),
                            t &&
                                t.response &&
                                (t.response.data = Oe.call(
                                    e,
                                    t.response.data,
                                    t.response.headers,
                                    e.transformResponse,
                                ))),
                        Promise.reject(t)
                    );
                },
            )
        );
    },
    ke = Ne,
    Fe = M,
    qe = {
        assertOptions: function (e, t, n) {
            if ('object' != typeof e)
                throw new xe('options must be an object', xe.ERR_BAD_OPTION_VALUE);
            for (var r = Object.keys(e), o = r.length; o-- > 0; ) {
                var i = r[o],
                    s = t[i];
                if (s) {
                    var a = e[i],
                        u = void 0 === a || s(a, i, e);
                    if (!0 !== u)
                        throw new xe('option ' + i + ' must be ' + u, xe.ERR_BAD_OPTION_VALUE);
                } else if (!0 !== n) throw new xe('Unknown option ' + i, xe.ERR_BAD_OPTION);
            }
        },
        validators: _e,
    },
    Ie = qe.validators;
function Je(e) {
    (this.defaults = e), (this.interceptors = { request: new De(), response: new De() });
}
(Je.prototype.request = function (e, t) {
    'string' == typeof e ? ((t = t || {}).url = e) : (t = e || {}),
        (t = ke(this.defaults, t)).method
            ? (t.method = t.method.toLowerCase())
            : this.defaults.method
            ? (t.method = this.defaults.method.toLowerCase())
            : (t.method = 'get');
    var n = t.transitional;
    void 0 !== n &&
        qe.assertOptions(
            n,
            {
                silentJSONParsing: Ie.transitional(Ie.boolean),
                forcedJSONParsing: Ie.transitional(Ie.boolean),
                clarifyTimeoutError: Ie.transitional(Ie.boolean),
            },
            !1,
        );
    var r = [],
        o = !0;
    this.interceptors.request.forEach(function (e) {
        ('function' == typeof e.runWhen && !1 === e.runWhen(t)) ||
            ((o = o && e.synchronous), r.unshift(e.fulfilled, e.rejected));
    });
    var i,
        s = [];
    if (
        (this.interceptors.response.forEach(function (e) {
            s.push(e.fulfilled, e.rejected);
        }),
        !o)
    ) {
        var a = [Le, void 0];
        for (
            Array.prototype.unshift.apply(a, r), a = a.concat(s), i = Promise.resolve(t);
            a.length;

        )
            i = i.then(a.shift(), a.shift());
        return i;
    }
    for (var u = t; r.length; ) {
        var c = r.shift(),
            f = r.shift();
        try {
            u = c(u);
        } catch (l) {
            f(l);
            break;
        }
    }
    try {
        i = Le(u);
    } catch (l) {
        return Promise.reject(l);
    }
    for (; s.length; ) i = i.then(s.shift(), s.shift());
    return i;
}),
    (Je.prototype.getUri = function (e) {
        e = ke(this.defaults, e);
        var t = Fe(e.baseURL, e.url);
        return Be(t, e.params, e.paramsSerializer);
    }),
    Ue.forEach(['delete', 'get', 'head', 'options'], function (e) {
        Je.prototype[e] = function (t, n) {
            return this.request(ke(n || {}, { method: e, url: t, data: (n || {}).data }));
        };
    }),
    Ue.forEach(['post', 'put', 'patch'], function (e) {
        function t(t) {
            return function (n, r, o) {
                return this.request(
                    ke(o || {}, {
                        method: e,
                        headers: t ? { 'Content-Type': 'multipart/form-data' } : {},
                        url: n,
                        data: r,
                    }),
                );
            };
        }
        (Je.prototype[e] = t()), (Je.prototype[e + 'Form'] = t(!0));
    });
var Me = Je,
    He = $;
function We(e) {
    if ('function' != typeof e) throw new TypeError('executor must be a function.');
    var t;
    this.promise = new Promise(function (e) {
        t = e;
    });
    var n = this;
    this.promise.then(function (e) {
        if (n._listeners) {
            var t,
                r = n._listeners.length;
            for (t = 0; t < r; t++) n._listeners[t](e);
            n._listeners = null;
        }
    }),
        (this.promise.then = function (e) {
            var t,
                r = new Promise(function (e) {
                    n.subscribe(e), (t = e);
                }).then(e);
            return (
                (r.cancel = function () {
                    n.unsubscribe(t);
                }),
                r
            );
        }),
        e(function (e) {
            n.reason || ((n.reason = new He(e)), t(n.reason));
        });
}
(We.prototype.throwIfRequested = function () {
    if (this.reason) throw this.reason;
}),
    (We.prototype.subscribe = function (e) {
        this.reason
            ? e(this.reason)
            : this._listeners
            ? this._listeners.push(e)
            : (this._listeners = [e]);
    }),
    (We.prototype.unsubscribe = function (e) {
        if (this._listeners) {
            var t = this._listeners.indexOf(e);
            -1 !== t && this._listeners.splice(t, 1);
        }
    }),
    (We.source = function () {
        var e;
        return {
            token: new We(function (t) {
                e = t;
            }),
            cancel: e,
        };
    });
var ze = We,
    Ve = O,
    Xe = O,
    Ke = n,
    $e = Me,
    Qe = Ne;
var Ge = (function e(t) {
    var n = new $e(t),
        r = Ke($e.prototype.request, n);
    return (
        Xe.extend(r, $e.prototype, n),
        Xe.extend(r, n),
        (r.create = function (n) {
            return e(Qe(t, n));
        }),
        r
    );
})(ve);
(Ge.Axios = $e),
    (Ge.CanceledError = $),
    (Ge.CancelToken = ze),
    (Ge.isCancel = Ee),
    (Ge.VERSION = je),
    (Ge.toFormData = L),
    (Ge.AxiosError = U),
    (Ge.Cancel = Ge.CanceledError),
    (Ge.all = function (e) {
        return Promise.all(e);
    }),
    (Ge.spread = function (e) {
        return function (t) {
            return e.apply(null, t);
        };
    }),
    (Ge.isAxiosError = function (e) {
        return Ve.isObject(e) && !0 === e.isAxiosError;
    }),
    (t.exports = Ge),
    (t.exports.default = Ge);
var Ye = t.exports;
export { Ye as a };
