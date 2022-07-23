import { createProdMockServer } from 'vite-plugin-mock/es/createProdMockServer';
import loginMock from './source/login';

export function setupProdMockServer() {
    createProdMockServer([...loginMock]);
}
