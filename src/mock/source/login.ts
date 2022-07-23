import { MockMethod } from 'vite-plugin-mock';
import { v4 } from 'uuid';
import URLS from '../../api/urls';

export default [
    {
        url: URLS.USER_INFO_URL, // 注意，这里只能是string格式
        method: 'get',
        response: () => {
            return {
                data: {
                    username: 'test',
                    authname: 'test',
                    staff_id: '12138',
                    avater: 'https://gw.alipayobjects.com/zos/antfincdn/XAosXuNZyF/BiazfanxmamNRoxxVxka.png',
                },
                status: 0,
            };
        },
    },
    {
        url: URLS.MENU_LIST,
        method: 'get',
        response: () => {
            return {
                data: [],
                status: 0,
            };
        },
    },
    {
        url: URLS.LOGIN,
        method: 'post',
        response: () => {
            return {
                data: v4(),
                status: 0,
            };
        },
    },
] as MockMethod[];
