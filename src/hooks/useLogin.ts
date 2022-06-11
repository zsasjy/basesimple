import { useEffect, useState } from 'react';
import { IMenuItem, UserInfo } from 'src/interface';
import { login } from 'src/api/login';
import { USERINFO } from 'src/common/const';

export function useLogin() {
    const [isLoading, setIsLoading] = useState(true);
    const [userInfo, setUserInfo] = useState<UserInfo>(USERINFO);
    const [menuList, setMenuList] = useState<IMenuItem[]>([]);

    useEffect(() => {
        login()
            .then(({ userInfo, menuTreeList }) => {
                setMenuList(menuTreeList);
                setUserInfo(userInfo);
            })
            .catch(error => {
                console.log(error);
            })
            .finally(() => {
                setIsLoading(false);
            });
    }, []);
    return {
        isLogging: isLoading,
        userInfo,
        menuList,
    };
}
