import Cookies, { CookieAttributes } from 'js-cookie';

const getCookie = (name: string) => {
    return Cookies.get(name);
};

const setCookie = (name: string, value: any, options?: CookieAttributes) => {
    Cookies.set(name, `${value}`, { expires: 1, ...options });
};

const removeCookie = (name: string, options?: CookieAttributes) => {
    Cookies.remove(name, options);
};

export default {
    getCookie,
    setCookie,
    removeCookie,
    SESSION_TOKEN: 'session_token',
    SESSION_REMEMBER: 'remember',
};
