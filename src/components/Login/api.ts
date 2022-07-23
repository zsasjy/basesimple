import URLS from 'src/api/urls';
import { request } from 'src/utils';
import { IFormInfo } from './index';
// 登录操作
export const login = (data: IFormInfo): Promise<string> => {
    return request.post<string>(URLS.LOGIN, data);
};
