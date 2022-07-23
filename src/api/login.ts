import { IMenuItem, UserInfo } from 'src/interface';
import { request, cookie } from 'src/utils/';
import URLS from 'src/api/urls';

const getUserInfo = (): Promise<UserInfo> => {
    return request.get<UserInfo>(URLS.USER_INFO_URL);
};

const getMenus = (): Promise<IMenuItem[]> => {
    return request.get<IMenuItem[]>(URLS.MENU_LIST);
};

let loginInfo = null as any;
export const login = (): Promise<{ userInfo: UserInfo; menuTreeList: IMenuItem[] }> => {
    const session_token = cookie.getCookie(cookie.SESSION_TOKEN);
    const remeber = cookie.getCookie(cookie.SESSION_REMEMBER);
    if (!session_token) {
        if (remeber) {
            cookie.setCookie(cookie.SESSION_TOKEN, remeber);
        } else {
            return Promise.resolve({
                userInfo: {
                    username: '',
                    authname: '',
                    staff_id: '',
                },
                menuTreeList: [],
            });
        }
    }
    if (!loginInfo) {
        loginInfo = Promise.all([getUserInfo(), getMenus()])
            .then(([userInfo, menuTreeList]) => {
                return {
                    userInfo,
                    menuTreeList,
                };
            })
            .catch(() => {
                return { userInfo: {}, menuTreeList: [] };
            });
    }
    return Promise.resolve(loginInfo);
};
