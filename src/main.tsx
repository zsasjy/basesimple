import React from 'react';
import ReactDOM from 'react-dom';
import './styles/common.less';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from 'src/store';
import 'antd/dist/antd.less';
import '@icon-park/react/styles/index.css';
import { setupProdMockServer } from 'src/mock';
import App from './App';

// if (process.env.NODE_ENV === 'development') {
// mock
setupProdMockServer();
// }

ReactDOM.render(
    <React.StrictMode>
        <Provider store={store}>
            <BrowserRouter basename={process.env.NODE_ENV === 'development' ? '/' : '/basesimple'}>
                <App />
            </BrowserRouter>
        </Provider>
    </React.StrictMode>,
    document.getElementById('root'),
);
