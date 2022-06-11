export { default as request } from './request';
export { default as cookie } from './cookieStorage';

export const hasUrlSearchParams = (key: string) => {
    const searchParams = new URLSearchParams(window.location.search);
    return searchParams.has(key);
};
export const getUrlSearchParams = (key: string) => {
    const searchParams = new URLSearchParams(window.location.search);
    return searchParams.get(key);
};
