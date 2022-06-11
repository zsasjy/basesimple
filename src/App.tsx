import React, { createContext } from 'react';
import ErrorBoundary from 'src/components/ErrorBoundary';
import { useRoutes } from 'react-router-dom';
import routeConfig from 'src/config/router.config';
import { USERINFO } from 'common/const';
import { useLogin } from 'src/hooks/useLogin';
import { IMenuItem } from './interface';
import Loading from 'common/components/Loading';
// declare global {
//     interface Window {

//     }
// }

export const ProjectInfoContext = createContext({
    userInfo: USERINFO,
    menuList: [] as IMenuItem[],
});

function App() {
    const { isLogging, userInfo, menuList } = useLogin();
    const element = useRoutes(routeConfig);
    return (
        <div className="App">
            {isLogging ? (
                <Loading tip="加载中..." />
            ) : (
                <ProjectInfoContext.Provider value={{ userInfo, menuList }}>
                    <ErrorBoundary>{element}</ErrorBoundary>
                </ProjectInfoContext.Provider>
            )}
        </div>
    );
}

export default App;
