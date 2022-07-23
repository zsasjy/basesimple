import { addActionPrefix } from 'src/store/tools';

const prefix = 'home/';
export const Actions = {
    updateState: 'updateState',
};

addActionPrefix(prefix, Actions);
