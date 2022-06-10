export const getUrlSearchParams = (key: string) => {
    const searchParams = new URLSearchParams(window.location.search);
    return searchParams.has(key);
};
